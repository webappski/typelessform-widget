import type { FieldDescriptor } from './types.js';
import { findDeepNestedInput, isElementHidden } from './utils.js';
import { getElementType } from './element-type-detector.js';
import { getElementName } from './element-name-resolver.js';
import { extractValue } from './value-extractor.js';
import { findLabelText } from './label-finder.js';
import { isInteractiveElement, isLikelyDisplayOnlyField } from './interactive-checker.js';
import { detectSectionHeadingFromBoundary } from './section-detector.js';
import { FormScanner } from './form-scanner.js';

/** Check if element is hidden, disabled, or readonly. */
function isInactiveElement(el: HTMLElement): boolean {
  if (!isInteractiveElement(el)) { return true; }
  if (isElementHidden(el)) { return true; }
  return el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true' ||
    el.hasAttribute('readonly') || el.getAttribute('aria-readonly') === 'true';
}

/** Check if name/value pair looks like a numeric-only grid cell. */
function isNumericGridCell(name: string, value: string | string[] | boolean | undefined, el: HTMLElement): boolean {
  if ((name === '0' || /^\d+$/.test(name)) &&
      (value === '0' || value === '' || (typeof value === 'string' && /^\d+$/.test(value)))) {
    return true;
  }
  return value === '0' && !!el.closest('table');
}

// ── Helper: Check if a standalone element should be skipped ──
function shouldSkipStandaloneElement(el: HTMLElement, name: string, value: string | string[] | boolean | undefined): boolean {
  if (isInactiveElement(el)) { return true; }
  return isNumericGridCell(name, value, el);
}

/** Check if element has any placeholder attribute. */
function elementHasPlaceholder(el: HTMLElement): boolean {
  if (el.getAttribute('placeholder')) { return true; }
  if (el instanceof HTMLInputElement && el.placeholder) { return true; }
  const deepInput = findDeepNestedInput(el);
  return !!deepInput?.getAttribute('placeholder');
}

/** Extract placeholder string from element. */
function getPlaceholder(el: HTMLElement): string | undefined {
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    return el.placeholder;
  }
  return el.getAttribute('placeholder') ||
    el.getAttribute('aria-placeholder') ||
    el.getAttribute('ng-reflect-placeholder') ||
    undefined;
}

/** Compute field flags (required, private, labels). */
function getFieldFlags(el: HTMLElement, type: string) {
  return {
    required: el.hasAttribute('required') || el.getAttribute('aria-required') === 'true',
    isPrivate: el.dataset.aiPrivate !== undefined || el.getAttribute('data-private') === 'true' || type === 'password',
    explicitLabel: el.dataset.aiLabel || el.getAttribute('data-ai-label') || undefined,
    ariaLabel: el.getAttribute('aria-label') || undefined,
  };
}

// ── Helper: Build standalone field descriptor ──
function buildStandaloneFieldDescriptor(el: HTMLElement, dummyForm: HTMLFormElement): FieldDescriptor | null {
  const name = getElementName(el, dummyForm);
  if (!name) { return null; }

  const type = getElementType(el);
  const label = findLabelText(el, dummyForm) || undefined;
  const value = extractValue(el);

  if (shouldSkipStandaloneElement(el, name, value)) { return null; }
  if (!elementHasPlaceholder(el) && isLikelyDisplayOnlyField(el, value, label || '')) { return null; }

  const flags = getFieldFlags(el, type);
  const group = detectSectionHeadingFromBoundary(el, el.closest('form')) || undefined;

  return {
    name, label, type, value, formIndex: -1, element: el, group,
    placeholder: getPlaceholder(el), ...flags,
  };
}

export function scanAllFormsOnPage(): FieldDescriptor[] {
  const fields: FieldDescriptor[] = [];
  const processedElements = new Set<HTMLElement>();

  // Scan traditional forms first (if they exist)
  Array.from(document.forms).forEach((form, index) => {
    const formFields = new FormScanner(form).scan().map(field => ({ ...field, formIndex: index }));
    fields.push(...formFields);

    formFields.forEach(field => {
      if (field.element) {processedElements.add(field.element);}
    });
  });

  // Scan for ALL interactive elements on the page
  const interactiveSelectors = [
    'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="image"]):not([type="reset"])',
    'select', 'textarea',
    '[role="textbox"]', '[role="combobox"]', '[role="searchbox"]', '[role="spinbutton"]',
    '[contenteditable="true"]',
    '[formcontrolname]', '[ng-model]', '[v-model]',
    'gc-input', 'gc-select', 'gc-textarea', 'gc-search-input', 'app-input', 'custom-input',
    '*[class*="input"]:not(input)', '*[class*="select"]:not(select)',
    '*[class*="search"]:not(input)', '*[class*="field"]:not(fieldset)',
    '*[class*="form-control"]', '*[class*="form-input"]',
    '[data-testid*="field"]', '[data-testid*="input"]',
    '[data-cy*="field"]', '[data-cy*="input"]',
    '[data-field]', '[aria-labelledby]',
    '.input-wrapper input', '.field-wrapper input', '.form-field input', '.form-control input'
  ];

  const allInteractiveElements = document.querySelectorAll(interactiveSelectors.join(', '));
  const standaloneFieldsMap = new Map<string, FieldDescriptor>();
  const dummyForm = document.createElement('form');

  allInteractiveElements.forEach(element => {
    if (!element || processedElements.has(element as HTMLElement)) { return; }

    const el = element as HTMLElement;
    const fieldDescriptor = buildStandaloneFieldDescriptor(el, dummyForm);
    if (!fieldDescriptor) { return; }

    const dedupeKey = fieldDescriptor.group ? `${fieldDescriptor.name}|${fieldDescriptor.group}` : fieldDescriptor.name;
    if (!standaloneFieldsMap.has(dedupeKey)) {
      standaloneFieldsMap.set(dedupeKey, fieldDescriptor);
    }

    processedElements.add(el);
  });

  fields.push(...Array.from(standaloneFieldsMap.values()));
  return fields;
}
