import type { FieldDescriptor } from './types.js';
import { isTranslationKey, collectStructuralMeta, isElementHidden } from './utils.js';
import { getElementType, extractConstraints } from './element-type-detector.js';
import { getElementName, getExplicitKey, makeCompositeKey } from './element-name-resolver.js';
import { extractValue } from './value-extractor.js';
import { findLabelText, findGroupLabelElement } from './label-finder.js';
import { isInteractiveElement, isInternalFieldOfCompositeComponent } from './interactive-checker.js';
import { detectSectionHeading } from './section-detector.js';

export class FormScanner {
  private form: HTMLFormElement;

  constructor(form: HTMLFormElement) {
    this.form = form;
  }

  // --- Main scanning methods ---

  // ── Helper: Collect all potential form elements ──
  private collectPotentialElements(): HTMLElement[] {
    const universalSelectors = [
      'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="image"]):not([type="reset"])',
      'select', 'textarea',
      '[role="textbox"]', '[role="combobox"]', '[role="searchbox"]', '[role="spinbutton"]',
      '[contenteditable="true"]',
      '[data-input]', '[data-form-field]', '[data-field]',
      '[ng-model]', '[v-model]', '[formcontrolname]', '[data-bind]'
    ];

    const customElementSelectors = [
      '*[class*="input"]:not(input):not([type="hidden"])',
      '*[class*="select"]:not(select)',
      '*[class*="textarea"]:not(textarea)',
      '*[class*="dropdown"]:not(select)',
      '*[class*="datepicker"]:not(input)',
      '*[class*="field"]:not(fieldset)'
    ];

    const allPotentialElements = [
      ...Array.from(this.form.querySelectorAll(universalSelectors.join(', '))),
      ...Array.from(this.form.querySelectorAll(customElementSelectors.join(', '))),
      ...Array.from(this.form.querySelectorAll('*')).filter(el => {
        const tagName = el.tagName.toLowerCase();
        return (tagName.includes('input') || tagName.includes('select') ||
                tagName.includes('textarea') || tagName.includes('dropdown') ||
                tagName.includes('picker') || tagName.includes('search') ||
                tagName.includes('field')) &&
                !['fieldset', 'input', 'select', 'textarea'].includes(tagName);
      })
    ];

    return Array.from(new Set(allPotentialElements)) as HTMLElement[];
  }

  // ── Helper: Check if parent custom component was already processed ──
  private hasProcessedParent(el: HTMLElement, processedElements: Set<HTMLElement>): boolean {
    let parent = el.parentElement;
    while (parent && parent !== this.form) {
      const parentTag = parent.tagName.toLowerCase();
      if ((parentTag.includes('input') || parentTag.includes('select') ||
           parentTag.includes('textarea') || parentTag.includes('field')) &&
          processedElements.has(parent)) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }

  /** Check if element should be filtered out (already processed, hidden, disabled, etc.). */
  private shouldFilterOut(el: HTMLElement, processedElements: Set<HTMLElement>): boolean {
    if (processedElements.has(el)) { return true; }
    const hasProcessedChild = Array.from(processedElements).some(processed =>
      el.contains(processed) && el !== processed
    );
    if (hasProcessedChild) { return true; }
    if (this.hasProcessedParent(el, processedElements)) { return true; }
    if (isElementHidden(el)) { return true; }
    if (el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true') { return true; }
    return !isInteractiveElement(el);
  }

  /** Check if element is a custom component (non-native tag with input-like name). */
  private static isCustomComponent(el: HTMLElement): boolean {
    const tagName = el.tagName.toLowerCase();
    if (tagName.includes('-') || el.hasAttribute('formcontrolname')) { return true; }
    const isInputLikeTag = tagName.includes('input') || tagName.includes('select') ||
      tagName.includes('textarea') || tagName.includes('picker') || tagName.includes('dropdown');
    return isInputLikeTag && !['input', 'select', 'textarea'].includes(tagName);
  }

  // ── Helper: Filter unique elements to interactive, visible, non-duplicate ──
  private filterInteractiveElements(uniqueElements: HTMLElement[]): HTMLElement[] {
    const processedElements = new Set<HTMLElement>();

    return uniqueElements.filter((el) => {
      if (this.shouldFilterOut(el, processedElements)) { return false; }

      if (FormScanner.isCustomComponent(el)) {
        const nestedNativeInput = el.querySelector('input, select, textarea')
          || el.shadowRoot?.querySelector('input, select, textarea');
        if (nestedNativeInput) { processedElements.add(nestedNativeInput as HTMLElement); }
      }

      processedElements.add(el);
      return true;
    });
  }

  /** Extract placeholder from element (native or attribute). */
  private static getPlaceholder(element: HTMLElement): string | undefined {
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      return element.placeholder;
    }
    return (element.getAttribute('placeholder') || element.getAttribute('aria-placeholder') || undefined) as string | undefined;
  }

  /** Types that should not have explicit label. */
  private static readonly NO_EXPLICIT_LABEL_TYPES = new Set(['radio', 'checkbox', 'select', 'select-one', 'select-multiple']);

  // ── Helper: Extract common field metadata ──
  private extractFieldMeta(element: HTMLElement, type: string): {
    required: boolean; isPrivate: boolean; placeholder: string | undefined;
    computedLabel: string | undefined; ariaLabel: string | undefined; explicitLabel: string | undefined;
  } {
    const required = element.hasAttribute('required') || element.getAttribute('aria-required') === 'true';
    const isPrivate = element.dataset.aiPrivate !== undefined ||
      element.getAttribute('data-private') === 'true' || type === 'password';
    const placeholder = FormScanner.getPlaceholder(element);
    const computedLabel = findLabelText(element, this.form) || undefined;
    const ariaLabel = (element.getAttribute('aria-label') || undefined) as string | undefined;
    const explicitLabel = FormScanner.NO_EXPLICIT_LABEL_TYPES.has(type)
      ? undefined
      : ((element.dataset.aiLabel || element.getAttribute('data-ai-label') || undefined) as string | undefined);

    return { required, isPrivate, placeholder, computedLabel, ariaLabel, explicitLabel };
  }

  // ── Helper: Build radio group descriptor ──
  private buildRadioDescriptor(
    baseNameOrId: string, element: HTMLElement, elements: HTMLElement[],
    ariaLabel: string | undefined
  ): FieldDescriptor | null {
    const radioGroup = elements.filter(
      el => el instanceof HTMLInputElement && el.type === 'radio' && (el as HTMLInputElement).name === baseNameOrId
    ) as HTMLInputElement[];

    if (radioGroup.length === 0) { return null; }

    let groupLabel = baseNameOrId;
    const groupLabelEl = findGroupLabelElement(radioGroup[0], this.form);
    if (groupLabelEl && groupLabelEl.textContent) {
      const groupLabelText = groupLabelEl.textContent.trim();
      if (!isTranslationKey(groupLabelText)) {
        groupLabel = groupLabelText.replace(/\*$/, '').trim();
      }
    }

    const options = radioGroup.map(rb => ({
      value: rb.value,
      label: findLabelText(rb, this.form) || rb.value,
      name: rb.name
    }));

    return {
      name: baseNameOrId,
      label: groupLabel,
      ariaLabel,
      type: 'radio',
      required: radioGroup.some(rb => rb.required),
      options,
      value: radioGroup.find(rb => rb.checked)?.value,
      element: element,
      tagName: element.tagName.toLowerCase(),
      ...extractConstraints(element)
    };
  }

  // ── Helper: Build checkbox group descriptor ──
  private buildCheckboxGroupDescriptor(
    baseNameOrId: string, element: HTMLElement, checkboxGroupContainer: Element,
    ariaLabel: string | undefined
  ): FieldDescriptor | null {
    const checkboxGroup = Array.from(checkboxGroupContainer.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][name="${baseNameOrId}"]`));
    if (checkboxGroup.length === 0) { return null; }

    let groupLabel = baseNameOrId;
    const groupLabelEl = findGroupLabelElement(checkboxGroup[0], this.form, checkboxGroupContainer);
    if (groupLabelEl && groupLabelEl.textContent) {
      const groupLabelText = groupLabelEl.textContent.trim();
      if (!isTranslationKey(groupLabelText)) {
        groupLabel = groupLabelText.replace(/\*$/, '').trim();
      }
    }

    const options = checkboxGroup.map(cb => ({
      value: cb.value || 'on',
      label: findLabelText(cb, this.form) || cb.value || 'on',
      name: cb.name
    }));

    return {
      name: baseNameOrId,
      label: groupLabel,
      ariaLabel,
      type: 'checkboxgroup',
      required: checkboxGroup.some(cb => cb.required),
      options,
      value: checkboxGroup.filter(cb => cb.checked).map(cb => cb.value || 'on'),
      element: element,
      tagName: element.tagName.toLowerCase(),
      ...extractConstraints(element)
    };
  }

  /** Check if an explicit key has already been processed (non-radio/checkbox). */
  private static isExplicitDuplicate(explicitKey: string | null, type: string, processedNames: Set<string>): boolean {
    if (!explicitKey) { return false; }
    return processedNames.has(`explicit:${explicitKey}`) && type !== 'radio' && type !== 'checkbox';
  }

  /** Scan context shared across handler methods. */
  private ctx!: {
    elements: HTMLElement[];
    encounteredNames: Set<string>;
    processedNames: Set<string>;
    fieldDescriptors: FieldDescriptor[];
  };

  /** Check and track composite key duplicates for non-radio/checkbox fields. */
  private checkCompositeKeyDuplicate(
    opts: { baseNameOrId: string; type: string; element: HTMLElement; explicitKey: string | null }
  ): boolean {
    if (opts.type === 'radio' || opts.type === 'checkbox') { return false; }
    const tempLabel = findLabelText(opts.element, this.form) || undefined;
    const compositeKey = makeCompositeKey(opts.baseNameOrId, tempLabel, opts.element);
    if (!opts.explicitKey && this.ctx.encounteredNames.has(compositeKey)) { return true; }
    if (!opts.explicitKey) { this.ctx.encounteredNames.add(compositeKey); }
    return false;
  }

  // ── Helper: Check deduplication for a field ──
  private shouldSkipDuplicate(
    options: { baseNameOrId: string; type: string; element: HTMLElement; explicitKey: string | null }
  ): boolean {
    const { type, explicitKey } = options;
    if (FormScanner.isExplicitDuplicate(explicitKey, type, this.ctx.processedNames)) { return true; }
    if (this.checkCompositeKeyDuplicate(options)) { return true; }
    if (explicitKey) { this.ctx.processedNames.add(`explicit:${explicitKey}`); }
    return false;
  }

  /** Handle radio type fields. */
  private handleRadio(baseNameOrId: string, element: HTMLElement, ariaLabel: string | undefined): void {
    const desc = this.buildRadioDescriptor(baseNameOrId, element, this.ctx.elements, ariaLabel);
    if (desc && !this.ctx.encounteredNames.has(baseNameOrId)) {
      this.ctx.fieldDescriptors.push(desc);
      this.ctx.encounteredNames.add(baseNameOrId);
    }
  }

  /** Handle checkbox type fields. */
  private handleCheckbox(baseNameOrId: string, element: HTMLElement, meta: ReturnType<FormScanner['extractFieldMeta']>): void {
    if (this.ctx.encounteredNames.has(baseNameOrId)) { return; }
    const groupContainer = element.closest('.feature-options, .choice-options');
    if (groupContainer && baseNameOrId) {
      const desc = this.buildCheckboxGroupDescriptor(baseNameOrId, element, groupContainer, meta.ariaLabel);
      if (desc) { this.ctx.fieldDescriptors.push(desc); this.ctx.encounteredNames.add(baseNameOrId); }
    } else if (!groupContainer) {
      this.ctx.fieldDescriptors.push({
        name: baseNameOrId, label: meta.computedLabel, ariaLabel: meta.ariaLabel,
        type: 'checkbox', required: meta.required, value: extractValue(element),
        element, tagName: element.tagName.toLowerCase(), ...extractConstraints(element)
      });
      this.ctx.encounteredNames.add(baseNameOrId);
    }
  }

  /** Handle select type fields. */
  private handleSelect(baseNameOrId: string, element: HTMLElement, meta: ReturnType<FormScanner['extractFieldMeta']>): void {
    const selectElement = element as HTMLSelectElement;
    const options = Array.from(selectElement.options).map(opt => ({
      value: opt.value,
      label: isTranslationKey(opt.text) ? opt.value : opt.text.trim()
    }));
    this.ctx.fieldDescriptors.push({
      name: baseNameOrId, label: meta.computedLabel, ariaLabel: meta.ariaLabel,
      type: selectElement.type, required: meta.required, placeholder: meta.placeholder,
      options, value: selectElement.value, element, tagName: element.tagName.toLowerCase(),
      ...extractConstraints(element)
    });
    this.ctx.encounteredNames.add(baseNameOrId);
  }

  /** Enrich descriptors with structural metadata. */
  private enrichDescriptors(fieldDescriptors: FieldDescriptor[]): FieldDescriptor[] {
    return fieldDescriptors.map(desc => {
      if (!desc.element) { return desc; }
      const meta = collectStructuralMeta(desc.element);
      return {
        ...desc,
        group: detectSectionHeading(desc.element, this.form) || undefined,
        classList: meta.classList, role: meta.role,
        ariaHaspopup: meta.ariaHaspopup, ariaControls: meta.ariaControls,
        hasDatalist: meta.hasDatalist, listId: meta.listId,
      };
    });
  }

  /** Check if an element should be skipped during the scan loop. */
  private shouldSkipElement(element: HTMLElement): boolean {
    const baseNameOrId = getElementName(element, this.form);
    if (!baseNameOrId || isInternalFieldOfCompositeComponent(element)) { return true; }
    return false;
  }

  /** Check if a radio/checkbox name was already encountered. */
  private isAlreadyEncounteredGroupType(baseNameOrId: string, type: string, element: HTMLElement): boolean {
    if (!this.ctx.encounteredNames.has(baseNameOrId)) { return false; }
    return type === 'radio' || (type === 'checkbox' && !element.closest('.feature-options,.choice-options'));
  }

  /** Dispatch element to the appropriate type handler. */
  private dispatchElement(baseNameOrId: string, element: HTMLElement, type: string, meta: ReturnType<FormScanner['extractFieldMeta']>): void {
    if (type === 'radio') { this.handleRadio(baseNameOrId, element, meta.ariaLabel); }
    else if (type === 'checkbox') { this.handleCheckbox(baseNameOrId, element, meta); }
    else if (element.tagName.toLowerCase() === 'select') { this.handleSelect(baseNameOrId, element, meta); }
    else {
      this.ctx.fieldDescriptors.push({
        name: baseNameOrId, label: meta.computedLabel, ariaLabel: meta.ariaLabel, type,
        placeholder: meta.placeholder, required: meta.required, isPrivate: meta.isPrivate,
        explicitLabel: meta.explicitLabel, value: extractValue(element), element,
        tagName: element.tagName.toLowerCase(), ...extractConstraints(element)
      });
    }
  }

  public scan(): FieldDescriptor[] {
    const collected = this.collectPotentialElements();
    const filtered = this.filterInteractiveElements(collected);

    this.ctx = {
      elements: filtered,
      encounteredNames: new Set<string>(),
      processedNames: new Set<string>(),
      fieldDescriptors: [],
    };

    for (const element of this.ctx.elements) {
      if (this.shouldSkipElement(element)) { continue; }
      const baseNameOrId = getElementName(element, this.form);
      const type = getElementType(element);
      const explicitKey = getExplicitKey(element);
      if (this.shouldSkipDuplicate({ baseNameOrId, type, element, explicitKey })) { continue; }
      if (this.isAlreadyEncounteredGroupType(baseNameOrId, type, element)) { continue; }
      this.dispatchElement(baseNameOrId, element, type, this.extractFieldMeta(element, type));
    }

    return this.enrichDescriptors(this.ctx.fieldDescriptors);
  }

}
