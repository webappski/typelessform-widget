import { findDeepNestedInput } from './utils.js';

/** Extract value from a native form element. */
function extractNativeValue(el: HTMLElement): string | string[] | boolean | undefined | null {
  if (el instanceof HTMLInputElement) {
    if (el.type === 'checkbox') {
      return el.checked ? (el.value || 'on') : undefined;
    }
    return el.value;
  }
  if (el instanceof HTMLSelectElement) { return el.value; }
  if (el instanceof HTMLTextAreaElement) { return el.value; }
  return null; // null = not a native element
}

/** Extract value from contenteditable or nested native input. */
function extractNonNativeValue(element: HTMLElement): string | string[] | boolean | undefined | null {
  if (element.getAttribute('contenteditable') === 'true') {
    return element.textContent?.trim() || '';
  }
  const nestedInput = element.querySelector('input, select, textarea') as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
  if (nestedInput) {
    return extractNativeValue(nestedInput) ?? nestedInput.value;
  }
  return null; // null = not handled
}

/** Extract value from attributes or framework bindings. */
function extractAttrValue(element: HTMLElement): string | undefined {
  if (element.hasAttribute('value')) {
    return element.getAttribute('value') || '';
  }
  if (element.getAttribute('ng-model') || element.getAttribute('v-model')) {
    return element.getAttribute('data-value') || element.textContent?.trim() || '';
  }
  const ariaValue = element.getAttribute('aria-valuenow');
  if (ariaValue) { return ariaValue; }
  return undefined;
}

/**
 * Extract the current value from a form element (native, contenteditable, or custom component).
 */
export function extractValue(element: HTMLElement): string | string[] | boolean | undefined {
  const deepInput = findDeepNestedInput(element);
  if (deepInput) { element = deepInput; }

  const nativeVal = extractNativeValue(element);
  if (nativeVal !== null) { return nativeVal; }

  const nonNativeVal = extractNonNativeValue(element);
  if (nonNativeVal !== null) { return nonNativeVal; }

  const attrVal = extractAttrValue(element);
  if (attrVal !== undefined) { return attrVal; }

  return element.textContent?.trim() || '';
}
