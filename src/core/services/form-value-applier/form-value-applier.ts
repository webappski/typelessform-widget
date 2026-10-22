/** FormValueApplier Service — applies AI-generated values to form fields. */

import type { FieldDescriptor } from '../../../form-scanner/index.js';
import type { PrivacyChecker } from '../privacy-checker.js';
import type { IStabilizerSession } from '../universal-value-stabilizer.js';
import { createStabilizerSession } from '../universal-value-stabilizer.js';
import { FillLedger } from '../fill-ledger.js';
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
import { chooseChoicesJsOption } from '../../../form-scanner/choices-js.js';
import { findOption, chosenBoxes, checkboxAnswer, selectOptionValue } from './choice-answer.js';
import { isElementHidden } from '../../../form-scanner/utils.js';
import { isMarkedPrivate } from '../../../lib/private-marker.js';
import { setCheckedLikeAPerson } from '../../../lib/set-checked.js';
import { asWidgetWrite } from '../../../lib/widget-write.js';

/** Union of all value types that the LLM can produce for a single field */
type FieldValue = string | number | boolean | string[] | MultiFormatValue | undefined;

export interface FormValueApplierConfig {
  safeFieldNames: string[];
  fieldElementsMap: Map<string, HTMLElement>;
  scannedFields?: FieldDescriptor[];
  privacyChecker?: PrivacyChecker;
}

/**
 * Every radio or checkbox of the form that shares `name`, when there are several.
 * A group is one field to the model and many inputs in the DOM; resolved through the
 * element map it came back as ONE input (whichever the last scan stored), so a checkbox
 * group got at most one box ticked and a radio group only its stored option compared.
 */
function findChoiceGroup(form: HTMLFormElement, name: string): HTMLInputElement[] | null {
  const inputs = Array.from(form.querySelectorAll<HTMLInputElement>(`input[name="${CSS.escape(name)}"]`))
    .filter(i => i.type === 'checkbox' || i.type === 'radio');
  return inputs.length > 1 ? inputs : null;
}

/**
 * Past the exact name, the resolver matches loosely — part of a name or id, the first
 * field of the same type. The scan leaves fields a person cannot see out; a loose match
 * must not land in one either (a hidden spam trap filled = a lost submission). A native
 * <select> is exempt: bootstrap-select, Chosen and Selectize hide it with display:none
 * on purpose, draw their own button and follow its change event.
 */
function isHiddenWriteTarget(element: Element | RadioNodeList): boolean {
  return element instanceof HTMLElement && !(element instanceof HTMLSelectElement) && isElementHidden(element);
}

export class FormValueApplier {
  private sessions = new WeakMap<HTMLFormElement, IStabilizerSession>();
  private activeForms = new Set<HTMLFormElement>();
  private _activeForm: HTMLFormElement | null = null;
  private _blockScanDurationMs = 100;
  private _blockScanUntilTime = 0;
  /** What may still be written since the last fill — shared by every session and every value check. */
  private ledger = new FillLedger();
  /** True while reapplyValues() writes: each write then spends a rewrite of the fill ledger. */
  private writingAgain = false;
  /** True while reapplyValues() restores the form after a new route: a field mounted anew gets a rewrite of its own. */
  private afterNewRoute = false;

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
      s = createStabilizerSession(form, undefined, this.ledger);
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
    this.ledger.stop();
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

  /**
   * Fill a form: the visitor's fill. Every field may be written, and every field gets its
   * rewrites again (fill-ledger.ts). Only the fill itself comes here; a value check that
   * writes the answer again after it goes through reapplyValues().
   */
  applyValues(values: { [key: string]: FieldValue }, form: HTMLFormElement): void {
    this.ledger.begin();
    asWidgetWrite(() => this.writeValues(values, form));
  }

  /** The page went to a new route (pushState, back or forward): every field has its rewrites again. */
  newRoute(): void {
    this.ledger.newRoute();
  }

  /**
   * Write the answer of the last fill again where the form no longer shows it — the value
   * checks after a fill (a scroll, a change of the form's structure, the window closing, an
   * in-page navigation). A field already showing its answer is not touched; a field the
   * visitor has changed since the fill, or whose rewrites are spent, is left as it is.
   * `afterNewRoute`: the passes after a new route, where a field the route mounted anew has
   * a rewrite of its own (fill-ledger.ts).
   */
  reapplyValues(values: { [key: string]: FieldValue }, form: HTMLFormElement, { afterNewRoute = false } = {}): void {
    this.writingAgain = true;
    this.afterNewRoute = afterNewRoute;
    try {
      asWidgetWrite(() => this.writeValues(values, form));
    } finally {
      this.writingAgain = false;
      this.afterNewRoute = false;
    }
  }

  /** Whether a field that needs a write may get it: always in a fill, while the ledger allows after it. */
  private mayWrite(el: Element, fieldName?: string): boolean {
    return !this.writingAgain || this.ledger.takeRewrite(el, fieldName, this.afterNewRoute);
  }

  private writeValues(values: { [key: string]: FieldValue }, form: HTMLFormElement): void {
    const session = this.getSession(form);
    Object.entries(values).forEach(([name, value]) => {
      if (!this.config.safeFieldNames.includes(name)) {return;}
      const group = findChoiceGroup(form, name);
      if (group) {
        if (group.some(i => isMarkedPrivate(i)) || this.isScannedPrivate(name)) {return;}
        this.applyValueToChoiceGroup(group, value, session, name);
        return;
      }
      const element = findFormElement(form, name, this.config);
      if (!element) {return;}
      if (isMarkedPrivate(element) || this.isScannedPrivate(name)) {return;}
      if (isHiddenWriteTarget(element)) {return;}
      this.applyValueToElement(element, value, name, session);
    });
  }

  /** The scan's own verdict: a field it marked private is not written, whatever the element in hand says. */
  private isScannedPrivate(name: string): boolean {
    return !!this.config.scannedFields?.some(f => f.name === name && f.isPrivate);
  }

  /** Apply value to a specific element — dispatcher by element type */
  private applyValueToElement(element: Element | RadioNodeList, value: FieldValue, fieldName: string, session: IStabilizerSession): void {
    try {
      if (element instanceof RadioNodeList) {
        this.applyValueToChoiceGroup(Array.from(element), value, session, fieldName);
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

  private applyValueToChoiceGroup(inputs: Node[], value: FieldValue, session: IStabilizerSession, fieldName?: string): void {
    const controls = inputs.filter((node): node is HTMLInputElement => node instanceof HTMLInputElement);
    const radios = controls.filter(input => input.type === 'radio');
    // A checkbox group shares one name, so form.elements hands it over as a list too.
    const boxes = controls.filter(input => input.type === 'checkbox');
    if (radios.length > 0) {this.applyRadioGroup(radios, value, session, fieldName);}
    if (boxes.length > 0) {this.applyCheckboxGroup(boxes, value, session, fieldName);}
  }

  /**
   * Choose the option the answer names; choosing it clears the others, as for a person.
   * An answer that names none leaves the group alone — it used to clear the visitor's choice.
   */
  private applyRadioGroup(radios: HTMLInputElement[], value: FieldValue, session: IStabilizerSession, fieldName?: string): void {
    if (typeof value !== 'string' && typeof value !== 'number') {return;}
    const option = findOption(radios, String(value));
    if (!option || option.checked || !this.mayWrite(option, fieldName)) {return;}
    if (setCheckedLikeAPerson(option, true)) {session.enqueue(option, true, fieldName);}
  }

  /** Tick the boxes the answer names and untick the rest; an answer that names none leaves the group alone. */
  private applyCheckboxGroup(boxes: HTMLInputElement[], value: FieldValue, session: IStabilizerSession, fieldName?: string): void {
    const chosen = chosenBoxes(boxes, value);
    if (!chosen) {return;}
    boxes.forEach(box => {
      const checked = chosen.has(box);
      if (box.checked === checked || !this.mayWrite(box, fieldName)) {return;}
      if (setCheckedLikeAPerson(box, checked)) {session.enqueue(box, checked, fieldName);}
    });
  }

  private applyValueToTextarea(textarea: HTMLTextAreaElement, value: FieldValue, session: IStabilizerSession, fieldName?: string): boolean {
    const stringValue = normText(value);
    if (String(textarea.value ?? '') === stringValue || !this.mayWrite(textarea, fieldName)) {return false;}
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
    if (finalValue === undefined) {return;}
    if (this.writingAgain && (element as unknown as HTMLInputElement).value === finalValue) {return;}
    if (!this.mayWrite(element, fieldName)) {return;}
    (element as unknown as HTMLInputElement).value = finalValue;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    session.enqueue(element as HTMLInputElement, finalValue, fieldName);
  }

  /** Apply checkbox value. @returns true if changed */
  private applyCheckbox(input: HTMLInputElement, value: FieldValue, session: IStabilizerSession, fieldName?: string): boolean {
    const checked = checkboxAnswer(input, value);
    if (checked === null || input.checked === checked || !this.mayWrite(input, fieldName)) {return false;}
    if (!setCheckedLikeAPerson(input, checked)) {return false;}
    session.enqueue(input, checked, fieldName);
    return true;
  }

  /** Apply radio value. @returns true if changed */
  private applyRadio(input: HTMLInputElement, value: FieldValue, session: IStabilizerSession, fieldName?: string): boolean {
    if (!findOption([input], String(value)) || input.checked || !this.mayWrite(input, fieldName)) {return false;}
    if (!setCheckedLikeAPerson(input, true)) {return false;}
    session.enqueue(input, true, fieldName);
    return true;
  }

  /** Apply a normalized string to a date/time input. @returns true if changed */
  private applyNormalized(input: HTMLInputElement, normalized: string, session: IStabilizerSession, fieldName?: string): boolean {
    if (String(input.value ?? '') === normalized || !this.mayWrite(input, fieldName)) {return false;}
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
    if (String(input.value ?? '') === finalValue || !this.mayWrite(input, fieldName)) {return false;}
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
    if (this.writingAgain) {
      const target = selectOptionValue(select, String(value));
      if (target === null || select.value === target || !this.mayWrite(select, fieldName)) {return;}
    }
    if (chooseChoicesJsOption(select, String(value))) {
      session.enqueue(select, select.value, fieldName);
      return;
    }
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
