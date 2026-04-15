import type { FieldDescriptor } from './form-scanner/index.js';

/** Check if a control should be skipped (private or password) */
function shouldSkipControl(
  control: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  name: string,
  fieldsMetadata?: FieldDescriptor[]
): boolean {
  if (control instanceof HTMLElement && control.dataset.aiPrivate === 'true') {
    return true;
  }
  if (fieldsMetadata) {
    const fieldMeta = fieldsMetadata.find(f => f.name === name);
    if (fieldMeta?.isPrivate) {return true;}
  }
  if (control instanceof HTMLInputElement && control.type === 'password') {
    return true;
  }
  return false;
}

/** Apply value to a specific control based on its type */
function applyToControl(
  control: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string,
  name: string,
  form: HTMLFormElement
): void {
  if (control instanceof HTMLInputElement && control.type === 'radio') {
    const radioToSelect = Array.from(form.elements)
      .filter(el => el instanceof HTMLInputElement && el.type === 'radio' && el.name === name && el.value === value)
      .pop() as HTMLInputElement | undefined;
    if (radioToSelect) {
      radioToSelect.checked = true;
    }
  } else if (control instanceof HTMLInputElement && control.type === 'checkbox') {
    if (typeof value === 'string') {
      control.checked = true;
    }
  } else if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement || control instanceof HTMLSelectElement) {
    control.value = value;
  }

  control.dispatchEvent(new Event('input', { bubbles: true }));
  control.dispatchEvent(new Event('change', { bubbles: true }));
}

export function applyValues(
  mapping: Record<string, string>,
  form: HTMLFormElement,
  fieldsMetadata?: FieldDescriptor[]
): void {
  Object.entries(mapping).forEach(([name, value]) => {
    const control = form.elements.namedItem(name) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | null;
    if (!control) {return;}
    if (shouldSkipControl(control, name, fieldsMetadata)) {return;}
    applyToControl(control, value, name, form);
  });
}

/** Check if element is private or metadata says private */
function isGlobalFieldPrivate(
  element: Element | RadioNodeList,
  name: string,
  formIndex: number,
  fieldsMeta: FieldDescriptor[]
): boolean {
  if (element instanceof HTMLElement && element.dataset.aiPrivate === 'true') {return true;}
  const fieldMeta = fieldsMeta.find(f => f.name === name && f.formIndex === formIndex);
  return !!fieldMeta?.isPrivate;
}

/** Apply value to a RadioNodeList; returns true if applied */
function applyToRadioNodeList(
  nodeList: RadioNodeList,
  value: string | number | boolean | string[] | undefined
): boolean {
  let applied = false;
  Array.from(nodeList).forEach(radioElement => {
    if (!(radioElement instanceof HTMLInputElement) || radioElement.type !== 'radio') {return;}
    if (Array.isArray(value)) {
      radioElement.checked = value.includes(radioElement.value);
    } else if (typeof value === 'string') {
      radioElement.checked = radioElement.value === value;
    }
    if (radioElement.checked) {
      applied = true;
      radioElement.dispatchEvent(new Event('input', { bubbles: true }));
      radioElement.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  return applied;
}

/** Apply value to a checkbox element */
function applyToCheckbox(
  element: HTMLInputElement,
  value: string | number | boolean | string[] | undefined
): void {
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

/** Dispatch value to the right element type. Returns true if applied. */
function applyGlobalElement(
  element: Element | RadioNodeList,
  value: string | number | boolean | string[] | undefined
): boolean {
  if (element instanceof RadioNodeList) {
    return applyToRadioNodeList(element, value);
  }
  if (element instanceof HTMLInputElement && element.type === 'checkbox') {
    applyToCheckbox(element, value);
    return true;
  }
  if (element instanceof HTMLElement && (typeof value === 'string' || typeof value === 'number')) {
    (element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value = String(value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }
  return false;
}

/** Apply a single value to the first matching form element across all forms. Returns true if applied. */
function applyGlobalValue(
  name: string,
  value: string | number | boolean | string[] | undefined,
  forms: HTMLFormElement[],
  fieldsMeta: FieldDescriptor[]
): void {
  for (const form of forms) {
    const element = form.elements.namedItem(name);
    if (!element) {continue;}
    if (isGlobalFieldPrivate(element, name, forms.indexOf(form), fieldsMeta)) {break;}

    const applied = applyGlobalElement(element, value);
    if (applied) {break;}
  }
}

// Новая глобальная функция, адаптированная для работы с checkboxgroup (массив значений)
export const applyValuesGlobal = (values: { [key: string]: string | number | boolean | string[] | undefined }, fieldsMeta: FieldDescriptor[] = []) => {
  const forms = Array.from(document.forms);
  Object.entries(values).forEach(([name, value]) => {
    applyGlobalValue(name, value, forms, fieldsMeta);
  });
}; 