import { findDeepNestedInput, isTranslationKey } from './utils.js';
import { findLabelText } from './label-finder.js';

/** List of framework binding attributes checked in priority order. */
const FRAMEWORK_ATTRS = [
  'formcontrolname', 'ng-model', 'v-model',
  'data-field-name', 'data-name', 'data-testid',
  'data-cy', 'data-field', 'aria-labelledby'
] as const;

/** Try standard name, id, or framework bindings. */
function getDirectName(element: HTMLElement): string | null {
  const name = element.getAttribute('name');
  if (name) { return name; }
  if (element.id) { return element.id; }
  for (const attr of FRAMEWORK_ATTRS) {
    const val = element.getAttribute(attr);
    if (val) { return val; }
  }
  return null;
}

/** Convert text to camelCase suitable for a field name. */
function textToCamelCase(text: string): string {
  let baseName = text.toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  if (/^\d/.test(baseName)) {
    baseName = `field${baseName}`;
  }
  return baseName;
}

/** Try to generate a name from the element's visual label. */
function getNameFromLabel(element: HTMLElement, form: HTMLFormElement): string | null {
  const labelText = findLabelText(element, form);
  if (!labelText || isTranslationKey(labelText)) { return null; }
  const baseName = textToCamelCase(labelText);
  return (baseName && baseName.length > 0) ? baseName : null;
}

/** Generate a name from placeholder text (weakest signal). */
function getNameFromPlaceholder(element: HTMLElement, deepInput: HTMLElement | null): string | null {
  const ph = element.getAttribute('placeholder') || deepInput?.getAttribute('placeholder');
  if (!ph) { return null; }
  if (/^\d{1,2}:\d{2}$/.test(ph.trim())) {
    return `time${ph.replace(/[^0-9]/g, '')}`;
  }
  return textToCamelCase(ph);
}

/**
 * Get the element's name from standard attributes, framework bindings,
 * nested inputs, label text, or placeholder as a last resort.
 */
export function getElementName(element: HTMLElement, form: HTMLFormElement): string {
  const direct = getDirectName(element);
  if (direct) { return direct; }

  const deepInput = findDeepNestedInput(element);
  if (deepInput) {
    const deepName = deepInput.getAttribute('name') || deepInput.id;
    if (deepName) { return deepName; }
  }

  const labelName = getNameFromLabel(element, form);
  if (labelName) { return labelName; }

  return getNameFromPlaceholder(element, deepInput) || '';
}

/**
 * Returns explicit name/id/binding, or null if name is generated.
 * Used to distinguish "real" identifiers from synthetic ones (placeholder/label-based).
 */
export function getExplicitKey(element: HTMLElement): string | null {
  if (element.getAttribute('name')) { return element.getAttribute('name'); }
  if (element.id) { return element.id; }
  for (const attr of FRAMEWORK_ATTRS) {
    const val = element.getAttribute(attr);
    if (val) { return val; }
  }
  return null;
}

/**
 * Create composite key for non-explicit-name fields.
 * Uses label, type, and tagName to ensure uniqueness.
 * Does NOT use placeholder (too unstable).
 * Example: "width|text|input" vs "height|text|input"
 */
export function makeCompositeKey(baseNameOrId: string, computedLabel: string | undefined, element: HTMLElement): string {
  const tag = element.tagName.toLowerCase();
  const type = (element as HTMLInputElement).type || tag;
  // Use label as primary key, fallback to baseNameOrId, avoid placeholder
  const keyBase = (computedLabel || baseNameOrId || '').trim();
  return `${keyBase}|${type}|${tag}`;
}

/** Try explicit label attributes (data-ai-label, aria-label). */
function getExplicitLabelAttr(element: HTMLElement): string | null {
  const aiLabel = element.getAttribute('data-ai-label');
  if (aiLabel && !isTranslationKey(aiLabel)) { return aiLabel.trim(); }
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel && !isTranslationKey(ariaLabel)) { return ariaLabel.trim(); }
  return null;
}

/** Return a non-translation-key string trimmed, or null. */
function validLabel(text: string | null | undefined): string | null {
  if (!text || isTranslationKey(text)) { return null; }
  return text.trim() || null;
}

/** Try placeholder from the element's nested input. */
function getDeepInputPlaceholder(element: HTMLElement): string | null {
  const deepInput = findDeepNestedInput(element);
  if (!deepInput) { return null; }
  if (deepInput instanceof HTMLInputElement || deepInput instanceof HTMLTextAreaElement) {
    return validLabel(deepInput.placeholder);
  }
  return null;
}

/** Try placeholder from the element or its nested input. */
function getPlaceholderLabel(element: HTMLElement): string | null {
  const deepPh = getDeepInputPlaceholder(element);
  if (deepPh) { return deepPh; }
  const ph = (element as HTMLInputElement | HTMLTextAreaElement).placeholder ||
    element.getAttribute('placeholder') ||
    element.getAttribute('aria-placeholder') ||
    element.getAttribute('ng-reflect-placeholder');
  return validLabel(ph);
}

/** Convert a code-style name to human-readable format. */
function nameToReadable(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/^\w/, c => c.toUpperCase());
}

/**
 * Get a human-readable label for display purposes.
 */
export function getHumanReadableLabel(element: HTMLElement, baseNameOrId: string, form: HTMLFormElement): string {
  const explicit = getExplicitLabelAttr(element);
  if (explicit) { return explicit; }

  const ph = getPlaceholderLabel(element);
  if (ph) { return ph; }

  const labelTextFromDOM = findLabelText(element, form);
  if (labelTextFromDOM && !isTranslationKey(labelTextFromDOM)) {
    return labelTextFromDOM.trim().replace(/\*$/, '').trim();
  }

  if (baseNameOrId && !baseNameOrId.startsWith('field_')) {
    return nameToReadable(baseNameOrId);
  }

  return baseNameOrId.trim();
}
