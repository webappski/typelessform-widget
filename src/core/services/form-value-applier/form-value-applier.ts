/** FormValueApplier Service — applies AI-generated values to form fields. */

import type { FieldDescriptor } from '../../../form-scanner/index.js';
import type { PrivacyChecker } from '../privacy-checker.js';
import type { IStabilizerSession } from '../universal-value-stabilizer.js';
import { createStabilizerSession } from '../universal-value-stabilizer.js';
import type { MultiFormatValue } from '../../../llm-client.js';
import { selectBestDateTimeFormat } from '../../../utils/date-utils.js';
import {
  setReactValue,
  fireInputChange,
  normText,
  normDate,
  normTime,
  normDateTime,
} from './value-normalizers.js';
import { findFormElement } from './field-resolver.js';

/** Union of all value types that the LLM can produce for a single field */
type FieldValue = string | number | boolean | string[] | MultiFormatValue | undefined;

export interface FormValueApplierConfig {
  safeFieldNames: string[];
  fieldElementsMap: Map<string, HTMLElement>;
  scannedFields?: FieldDescriptor[];
  privacyChecker?: PrivacyChecker;
}

export class FormValueApplier {
  private sessions = new WeakMap<HTMLFormElement, IStabilizerSession>();
  private activeForms = new Set<HTMLFormElement>();
  private _activeForm: HTMLFormElement | null = null;
  private _blockScanDurationMs = 100;
  private _blockScanUntilTime = 0;

  constructor(private config: FormValueApplierConfig) {}

  /** Set parametrized block scan duration (ms). Controls how long rescans are blocked after form switch. */
  setBlockScanDuration(ms: number): void {
    this._blockScanDurationMs = Math.max(0, ms);
  }

  /** Set active form and block rescans. Automatically destroys previous form's session. */
  setActiveForm(form: HTMLFormElement | null): void {
    if (form === this._activeForm) {return;}
    if (this._activeForm) {
      const s = this.sessions.get(this._activeForm);
      if (s) {s.destroy();}
      this.sessions.delete(this._activeForm);
      this.activeForms.delete(this._activeForm);
    }
    this._activeForm = form;
    this._blockScanUntilTime = form ? (performance.now() + this._blockScanDurationMs) : 0;
  }

  /** Get currently active form */
  getActiveForm(): HTMLFormElement | null {
    return this._activeForm;
  }

  /** Check if form switching just happened or active form has pending work (blocks rescans). */
  hasActiveWork(): boolean {
    if (performance.now() < this._blockScanUntilTime) {return true;}
    if (!this._activeForm) {return false;}
    return !!this.sessions.get(this._activeForm)?.hasPendingWork();
  }

  /** Get or create stabilizer session for a form (per-form isolation) */
  getSession(form: HTMLFormElement): IStabilizerSession {
    let s = this.sessions.get(form);
    if (!s && form?.isConnected) {
      s = createStabilizerSession(form);
      s.attach();
      this.sessions.set(form, s);
      this.activeForms.add(form);
    }
    return s!;
  }

  /** Check if any session has pending work (used as guard in lifecycle) */
  hasActiveSessions(): boolean {
    for (const form of this.activeForms) {
      const s = this.sessions.get(form);
      if (s && s.hasPendingWork()) {
        return true;
      }
    }
    return false;
  }

  /** Cleanup all sessions (call on widget destroy/disconnected) */
  destroyAll(): void {
    for (const form of this.activeForms) {
      const s = this.sessions.get(form);
      if (s) {s.destroy();}
    }
    this.activeForms.clear();
    this.sessions = new WeakMap();
  }

  /** Detach a specific form's session */
  detach(form: HTMLFormElement): void {
    const s = this.sessions.get(form);
    if (s) {
      s.detach();
      this.sessions.delete(form);
      this.activeForms.delete(form);
    }
  }

  /** Apply values to a single form */
  applyValues(values: { [key: string]: FieldValue }, form: HTMLFormElement): void {
    const session = this.getSession(form);
    Object.entries(values).forEach(([name, value]) => {
      if (!this.config.safeFieldNames.includes(name)) {return;}
      const element = findFormElement(form, name, this.config);
      if (!element) {return;}
      if (element instanceof HTMLElement && element.dataset.aiPrivate === 'true') {return;}
      this.applyValueToElement(element, value, name, session);
    });
  }

  /** Apply value to a specific element — dispatcher by element type */
  private applyValueToElement(element: Element | RadioNodeList, value: FieldValue, fieldName: string, session: IStabilizerSession): void {
    try {
      if (element instanceof RadioNodeList) {
        this.applyValueToRadioNodeList(element, value, session, fieldName);
      } else if (element instanceof HTMLInputElement) {
        this.applyValueToInput(element, value, session, fieldName);
      } else if (element instanceof HTMLSelectElement) {
        this.applyValueToSelect(element, value, session, fieldName);
      } else if (element instanceof HTMLTextAreaElement) {
        this.applyValueToTextarea(element, value, session, fieldName);
      } else if (element instanceof HTMLElement) {
        this.applyValueToGenericElement(element, value, session, fieldName);
      }
    } catch (error) {
      console.error(`[FormValueApplier] Error applying value to field "${fieldName}"`, error);
    }
  }

  private applyValueToRadioNodeList(nodeList: RadioNodeList, value: FieldValue, session: IStabilizerSession, fieldName?: string): void {
    Array.from(nodeList).forEach(element => {
      if (element instanceof HTMLInputElement && element.type === 'radio') {
        if (typeof value === 'string') {
          element.checked = element.value === value;
          if (element.checked) {
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
            session.enqueue(element, true, fieldName);
          }
        }
      }
    });
  }

  private applyValueToTextarea(textarea: HTMLTextAreaElement, value: FieldValue, session: IStabilizerSession, fieldName?: string): boolean {
    const stringValue = normText(value);
    if (String(textarea.value ?? '') === stringValue) {return false;}
    setReactValue(textarea, stringValue);
    fireInputChange(textarea);
    session.enqueue(textarea, stringValue, fieldName);
    return true;
  }

  private applyValueToGenericElement(element: HTMLElement, value: FieldValue, session: IStabilizerSession, fieldName?: string): void {
    let finalValue: string | undefined;
    if (typeof value === 'string' || typeof value === 'number') {
      finalValue = String(value);
    } else if (value && typeof value === 'object' && 'formats' in value) {
      finalValue = selectBestDateTimeFormat(element, value as MultiFormatValue);
    }
    if (finalValue !== undefined) {
      (element as unknown as HTMLInputElement).value = finalValue;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      session.enqueue(element as HTMLInputElement, finalValue, fieldName);
    }
  }

  /** Apply checkbox value. @returns true if changed */
  private applyCheckbox(input: HTMLInputElement, value: FieldValue, session: IStabilizerSession, fieldName?: string): boolean {
    const oldChecked = input.checked;
    if (typeof value === 'boolean') {input.checked = value;}
    else if (typeof value === 'string') {input.checked = input.value === value || (value === 'on' && input.value === 'on');}
    else if (Array.isArray(value)) {input.checked = value.includes(input.value);}
    if (input.checked === oldChecked) {return false;}
    fireInputChange(input);
    session.enqueue(input, input.checked, fieldName);
    return true;
  }

  /** Apply radio value. @returns true if changed */
  private applyRadio(input: HTMLInputElement, value: FieldValue, session: IStabilizerSession, fieldName?: string): boolean {
    if (String(input.value).toLowerCase() !== String(value).toLowerCase()) {return false;}
    if (input.checked) {return false;}
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    session.enqueue(input, true, fieldName);
    return true;
  }

  /** Apply a normalized string to a date/time input. @returns true if changed */
  private applyNormalized(input: HTMLInputElement, normalized: string, session: IStabilizerSession, fieldName?: string): boolean {
    if (String(input.value ?? '') === normalized) {return false;}
    setReactValue(input, normalized);
    fireInputChange(input);
    session.enqueue(input, input.value, fieldName);
    return true;
  }

  /** Resolve final string value from FieldValue (MultiFormat or text) */
  private resolveTextValue(input: HTMLInputElement, value: FieldValue): string {
    if (value && typeof value === 'object' && 'formats' in value) {
      return selectBestDateTimeFormat(input, value as MultiFormatValue);
    }
    return normText(value);
  }

  /** Apply default text value with React focus/blur handling */
  private applyDefaultText(input: HTMLInputElement, value: FieldValue, session: IStabilizerSession, fieldName?: string): boolean {
    const finalValue = this.resolveTextValue(input, value);
    if (String(input.value ?? '') === finalValue) {return false;}
    const FOCUS_BLUR_TYPES = new Set(['text', 'email', 'tel']);
    const needsFocusBlur = FOCUS_BLUR_TYPES.has(input.type);
    if (needsFocusBlur && document.activeElement !== input) {input.focus();}
    setReactValue(input, finalValue);
    fireInputChange(input);
    if (needsFocusBlur && document.activeElement === input) {input.blur();}
    session.enqueue(input, input.value, fieldName);
    return true;
  }

  /** Apply value to input element based on its type. @returns true if changed, false if NOOP */
  private applyValueToInput(input: HTMLInputElement, value: FieldValue, session: IStabilizerSession, fieldName?: string): boolean {
    switch (input.type) {
      case 'checkbox': return this.applyCheckbox(input, value, session, fieldName);
      case 'radio': return this.applyRadio(input, value, session, fieldName);
      case 'date': return this.applyNormalized(input, normDate(value), session, fieldName);
      case 'time': return this.applyNormalized(input, normTime(value), session, fieldName);
      case 'datetime-local': return this.applyNormalized(input, normDateTime(value), session, fieldName);
      default: return this.applyDefaultText(input, value, session, fieldName);
    }
  }

  private applyValueToSelect(select: HTMLSelectElement, value: FieldValue, session: IStabilizerSession, fieldName?: string): void {
    const nv = String(value).toLowerCase();
    const option = Array.from(select.options).find(o => o.value.toLowerCase() === nv || o.text.toLowerCase() === nv);
    if (option) {
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      session.enqueue(select, option.value, fieldName);
    }
  }

  /** Update configuration (for dynamic updates) */
  updateConfig(config: Partial<FormValueApplierConfig>): void {
    Object.assign(this.config, config);
  }
}
