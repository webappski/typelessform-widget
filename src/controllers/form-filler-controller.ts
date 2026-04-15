/**
 * FormFillerController — Reactive Controller for form filling, value application, and stabilizer orchestration.
 *
 * Absorbs: controller/autofill-orchestrator.ts, form/apply-values.ts
 *
 * Phase 4F
 */

import type { ReactiveController } from 'lit';
import type { TypelessFormHost } from '../types/widget-host.js';
import type { MultiFormatValue } from '../llm-client.js';
import { buildFieldElementsMap } from '../form/postprocess.js';

export class FormFillerController implements ReactiveController {
  #host: TypelessFormHost;

  constructor(host: TypelessFormHost) {
    this.#host = host;
    host.addController(this);
  }

  hostConnected(): void { /* placeholder */ }
  hostDisconnected(): void { /* placeholder */ }

  // ── Handle fill form (from controller/autofill-orchestrator.ts) ─────

  handleFillForm(): void {
    this.#host.scanAllForms();
    this.#host.isApplyingValues = true;

    try {
      const activeForm = this.#host.selectActiveForm();
      this.#host.formValueApplier?.setActiveForm(activeForm);
      this.#rebuildFieldElementsMap(activeForm);

      const autofillData = this.#host.lastLLMResponse?.autofill;
      if (!autofillData || Object.keys(autofillData).length === 0) { return; }

      if (!activeForm) {
        this.#host.errorMessage = 'Не найдена активная форма для заполнения';
        this.#host.currentStep = 'error';
        return;
      }

      this.#applyWithApplierOrFallback(autofillData, activeForm);
      this.#waitForStabilizer();
    } finally {
      this.#host.isApplyingValues = false;
    }
  }

  // ── Apply values to single form (from form/apply-values.ts) ─────────

  applyValuesToSingleForm(values: { [key: string]: string | number | boolean | string[] | MultiFormatValue | undefined }, form: HTMLFormElement): void {
    Object.entries(values).forEach(([name, value]) => {
      if (!this.#host.safeFieldNames.includes(name)) { return; }

      const element = this.#findElement(name, form);
      if (!element) { return; }
      if (this.#shouldSkipElement(element, name)) { return; }

      this.#applyValueToElement(element, value);
    });
  }

  // ── Date/time format selection ──────────────────────────────────────

  selectBestDateTimeFormat(element: HTMLElement, multiFormatValue: MultiFormatValue): string {
    const elementType = (element as HTMLInputElement).type;
    const tagName = element.tagName.toLowerCase();
    const formats = multiFormatValue.formats;

    const ionResult = FormFillerController.#tryIonFormat(tagName, formats);
    if (ionResult !== null) { return ionResult; }

    const typeResult = FormFillerController.#tryInputTypeFormat(elementType, formats, multiFormatValue);
    if (typeResult !== null) { return typeResult; }

    const tagResult = FormFillerController.#tryTagNameFormat(tagName, elementType, formats);
    if (tagResult !== null) { return tagResult; }

    return formats.display || formats.iso || multiFormatValue.originalText;
  }

  // ── Private helpers ─────────────────────────────────────────────────

  #rebuildFieldElementsMap(activeForm: HTMLFormElement | null): void {
    if (this.#host.scannedFields.length === 0) { return; }
    const tag = activeForm?.tagName?.toUpperCase();
    const shouldFilter = tag === 'FORM';
    buildFieldElementsMap(
      this.#host.scannedFields,
      this.#host.fieldElementsMap,
      shouldFilter ? activeForm ?? undefined : undefined
    );
  }

  #applyWithApplierOrFallback(autofillData: { [key: string]: string | number | boolean | string[] | MultiFormatValue | undefined }, activeForm: HTMLFormElement): void {
    if (this.#host.formValueApplier) {
      this.#applyWithApplier(autofillData, activeForm);
    } else {
      this.applyValuesToSingleForm(autofillData, activeForm);
    }
  }

  #applyWithApplier(autofillData: { [key: string]: string | number | boolean | string[] | MultiFormatValue | undefined }, activeForm: HTMLFormElement): void {
    this.#host.formValueApplier!.updateConfig({
      safeFieldNames: this.#host.safeFieldNames,
      fieldElementsMap: this.#host.fieldElementsMap,
      scannedFields: this.#host.scannedFields
    });
    this.#host.formValueApplier!.applyValues(autofillData, activeForm);
    this.#host.lastApplyTimestamp = performance.now();
    this.#host.userIsEditingFields = false;

    this.#attachUserEditListener(activeForm);

    if (this.#host.startProactiveValueCheck) {
      this.#host.startProactiveValueCheck(5000);
    }
  }

  #attachUserEditListener(activeForm: HTMLFormElement): void {
    const inputListener = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        this.#host.userIsEditingFields = true;
        activeForm.removeEventListener('input', inputListener, true);
      }
    };
    activeForm.addEventListener('input', inputListener, { capture: true });
    this.#host.userEditListener = inputListener;
    this.#host.userEditListenerForm = activeForm;
  }

  #findElement(name: string, form: HTMLFormElement): Element | RadioNodeList | null {
    let element = form.elements.namedItem(name);
    if (element) { return element; }

    element = form.querySelector(`[data-copilot-key="${name}"]`) as HTMLElement;
    if (element) { return element; }

    if (this.#host.fieldElementsMap.has(name)) {
      return this.#host.fieldElementsMap.get(name)!;
    }

    return this.#findElementByFallback(name, form);
  }

  #findElementByFallback(name: string, form: HTMLFormElement): Element | null {
    try {
      if (/^[a-zA-Z_-]/.test(name)) {
        const byId = form.querySelector(`#${name}`) as HTMLElement;
        if (byId) { return byId; }
      }
    } catch (_e) { /* noop */ }

    if (name.startsWith('time') && /^time\d+$/.test(name)) {
      const timePattern = name.substring(4).replace(/(\d{2})(\d{2})/, '$1:$2');
      const byPlaceholder = form.querySelector(`[placeholder="${timePattern}"]`) as HTMLElement;
      if (byPlaceholder) { return byPlaceholder; }
    }

    const selectors = [
      `[formcontrolname="${name}"]`,
      `[data-testid="${name}"], [data-cy="${name}"], [data-field="${name}"]`,
      `[aria-labelledby="${name}"]`,
    ];
    for (const sel of selectors) {
      const found = form.querySelector(sel) as HTMLElement;
      if (found) { return found; }
    }

    const nameLower = name.toLowerCase();
    return form.querySelector(`[name*="${nameLower}"], [id*="${nameLower}"]`) as HTMLElement;
  }

  #shouldSkipElement(element: Element | RadioNodeList, name: string): boolean {
    if (element instanceof HTMLElement && element.dataset.aiPrivate === 'true') { return true; }
    const fieldMeta = this.#host.scannedFields.find((f) => f.name === name);
    if (fieldMeta?.isPrivate) { return true; }
    if (element instanceof HTMLInputElement && element.type === 'password') { return true; }
    return false;
  }

  #applyValueToElement(element: Element | RadioNodeList, value: string | number | boolean | string[] | MultiFormatValue | undefined): void {
    if (element instanceof RadioNodeList) {
      this.#applyRadioValue(element, value);
    } else if (element instanceof HTMLInputElement && element.type === 'checkbox') {
      this.#applyCheckboxValue(element, value);
    } else if (element instanceof HTMLElement) {
      this.#applyGenericValue(element, value);
    }
  }

  #applyRadioValue(nodeList: RadioNodeList, value: unknown): void {
    if (typeof value !== 'string') { return; }
    Array.from(nodeList).forEach(radioElement => {
      if (radioElement instanceof HTMLInputElement && radioElement.type === 'radio') {
        radioElement.checked = radioElement.value === value;
        if (radioElement.checked) {
          radioElement.dispatchEvent(new Event('input', { bubbles: true }));
          radioElement.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
  }

  #applyCheckboxValue(element: HTMLInputElement, value: unknown): void {
    if (typeof value === 'boolean') {
      element.checked = value;
    } else if (typeof value === 'string') {
      element.checked = element.value === value || (value === 'on' && element.value === 'on');
    } else if (Array.isArray(value)) {
      element.checked = value.includes(element.value);
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }

  #applyGenericValue(element: HTMLElement, value: unknown): void {
    if (typeof value === 'string' || typeof value === 'number') {
      const finalValue = this.#resolveScalarValue(element, value);
      (element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value = finalValue;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (value && typeof value === 'object' && 'formats' in value) {
      const finalValue = this.selectBestDateTimeFormat(element, value as MultiFormatValue);
      (element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value = finalValue;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  #resolveScalarValue(element: HTMLElement, value: string | number): string {
    const elementType = (element as HTMLInputElement).type;
    if (elementType === 'date') { return FormFillerController.#normalizeDateValue(value); }
    if (elementType === 'time') { return FormFillerController.#normalizeTimeValue(value); }
    return String(value);
  }

  static #tryIonFormat(tagName: string, formats: MultiFormatValue['formats']): string | null {
    if (tagName === 'ion-datetime' || tagName.includes('ion-')) {
      if (formats.iso) { return formats.iso; }
    }
    return null;
  }

  static #tryInputTypeFormat(elementType: string, formats: MultiFormatValue['formats'], mfv: MultiFormatValue): string | null {
    if (elementType === 'date' && formats.iso) { return formats.iso.split('T')[0]; }
    if (elementType === 'datetime-local' && formats.iso) { return formats.iso; }
    if (elementType === 'time') { return FormFillerController.#resolveTimeFormat(formats, mfv); }
    return null;
  }

  static #resolveTimeFormat(formats: MultiFormatValue['formats'], mfv: MultiFormatValue): string {
    if (mfv.originalText && /^\d{1,2}:\d{2}$/.test(mfv.originalText)) { return mfv.originalText.trim(); }
    if (formats.iso) {
      const match = String(formats.iso).match(/T(\d{2}:\d{2})/);
      if (match) { return match[1]; }
    }
    return '';
  }

  static #tryTagNameFormat(tagName: string, elementType: string, formats: MultiFormatValue['formats']): string | null {
    if ((tagName.includes('timestamp') || tagName.includes('epoch')) && formats.timestamp) {
      return String(formats.timestamp);
    }
    if ((elementType === 'number' || tagName.includes('numeric')) && formats.numeric) {
      return formats.numeric;
    }
    return null;
  }

  #waitForStabilizer(): void {
    const check = (): void => {
      const busy = this.#host.formValueApplier?.hasActiveWork();

      if (busy) {
        setTimeout(check, 100);
        return;
      }

      this.#host.closeModal();

      // POST-COMMIT check: Ensure VALUE-CHECK runs after React remount
      if (!this.#host.__commitSyncScheduled) {
        this.#host.__commitSyncScheduled = true;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.#host.__commitSyncScheduled = false;
            const stillBusy = this.#host.formValueApplier?.hasActiveWork();
            if (!this.#host.showModal && !stillBusy) {
              this.#host.checkAndReapplyIfNeeded();
            }
          });
        });
      }
    };

    setTimeout(check, 100);
  }

  static #normalizeDateValue(value: string | number): string {
    if (!value) { return ''; }
    try {
      if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
      }
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    } catch (_e) { /* ignore */ }
    return String(value);
  }

  static #normalizeTimeValue(value: string | number): string {
    if (!value) { return ''; }
    if (typeof value === 'string' && /^\d{1,2}:\d{2}$/.test(value)) {
      return value.trim();
    }
    if (typeof value === 'string' && value.includes('T')) {
      const match = value.match(/T(\d{2}:\d{2})/);
      if (match) { return match[1]; }
    }
    return String(value);
  }
}
