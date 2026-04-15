/**
 * Field Resolver
 *
 * Functions for finding form elements by name using multiple strategies.
 * Extracted from FormValueApplier for modularity.
 */

import type { FieldDescriptor } from '../../../form-scanner/index.js';

/**
 * Configuration subset needed by the field resolver functions.
 */
export interface FieldResolverConfig {
  fieldElementsMap: Map<string, HTMLElement>;
  scannedFields?: FieldDescriptor[];
}

/** Tags that are actual form controls (not wrappers) */
const FORM_CONTROL_TAGS = new Set(['INPUT', 'SELECT', 'TEXTAREA']);

/** Try to find element from fieldElementsMap — skip non-control elements (DIV wrappers from SSR) */
function findFromMap(form: HTMLFormElement, name: string, config: FieldResolverConfig): Element | null {
  if (!config.fieldElementsMap.has(name)) {return null;}
  const mapped = config.fieldElementsMap.get(name)!;
  if (!form.contains(mapped)) {return null;}
  if (!FORM_CONTROL_TAGS.has(mapped.tagName)) {return null;}
  return mapped;
}

/** Try primary strategies: form.elements, name attr, fieldElementsMap fallback */
function findByPrimaryStrategies(form: HTMLFormElement, name: string, config: FieldResolverConfig): Element | RadioNodeList | null {
  if (form.elements) {
    const byElements = form.elements.namedItem(name);
    if (byElements) {return byElements;}
  }
  const byName = form.querySelector(`[name="${CSS.escape(name)}"]`) as HTMLElement;
  if (byName) {return byName;}

  // React/Vue fallback: search by position in fieldElementsMap
  if (config.fieldElementsMap.size > 0) {
    const allEntries = Array.from(config.fieldElementsMap.entries());
    const fieldIndex = allEntries.findIndex(([key]) => key === name);
    if (fieldIndex >= 0 && config.scannedFields?.[fieldIndex]) {
      const match = findElementByFieldMetadata(form, config.scannedFields[fieldIndex]);
      if (match) {return match;}
    }
  }
  return null;
}

/** Try secondary strategies: simple name, textarea scan, data attrs, id */
function findBySecondaryStrategies(form: HTMLFormElement, name: string): Element | null {
  if (/^[a-zA-Z0-9_-]+$/.test(name)) {
    const el = form.querySelector(`[name="${name}"]`) as HTMLElement;
    if (el) {return el;}
  }
  for (const ta of Array.from(form.querySelectorAll('textarea'))) {
    if (ta.getAttribute('name') === name) {return ta;}
  }
  const byKey = form.querySelector(`[data-copilot-key="${name}"]`) as HTMLElement;
  if (byKey) {return byKey;}
  try {
    if (/^[a-zA-Z_-]/.test(name)) {
      const byId = form.querySelector(`#${name}`) as HTMLElement;
      if (byId) {return byId;}
    }
  } catch { /* noop */ }
  return null;
}

/** Try tertiary strategies: time placeholder, Angular, test attrs, partial match */
function findByTertiaryStrategies(form: HTMLFormElement, name: string): Element | null {
  if (name.startsWith('time') && /^time\d+$/.test(name)) {
    const timePattern = name.substring(4).replace(/(\d{2})(\d{2})/, '$1:$2');
    const el = form.querySelector(`[placeholder="${timePattern}"]`) as HTMLElement;
    if (el) {return el;}
  }
  const byCtrl = form.querySelector(`[formcontrolname="${name}"]`) as HTMLElement;
  if (byCtrl) {return byCtrl;}
  const byData = form.querySelector(`[data-testid="${name}"], [data-cy="${name}"], [data-field="${name}"]`) as HTMLElement;
  if (byData) {return byData;}
  const byAria = form.querySelector(`[aria-labelledby="${name}"]`) as HTMLElement;
  if (byAria) {return byAria;}
  const nameLower = name.toLowerCase();
  const byPartial = form.querySelector(`[name*="${nameLower}"], [id*="${nameLower}"]`) as HTMLElement;
  if (byPartial) {return byPartial;}
  const ta = Array.from(form.querySelectorAll('textarea')).find((t: HTMLTextAreaElement) => t.name === name || t.getAttribute('name') === name || t.id === name);
  return (ta as Element) || null;
}

/**
 * Find form element by name using multiple strategies
 */
export function findFormElement(
  form: HTMLFormElement,
  name: string,
  config: FieldResolverConfig,
): Element | RadioNodeList | null {
  const fromMap = findFromMap(form, name, config);
  if (fromMap) {return fromMap;}
  const primary = findByPrimaryStrategies(form, name, config);
  if (primary) {return primary;}
  const secondary = findBySecondaryStrategies(form, name);
  if (secondary) {return secondary;}
  return findByTertiaryStrategies(form, name);
}

/**
 * Find element by field metadata (type, placeholder, etc.) - for React/Vue without name/id
 */
/** Match an input element against field metadata criteria */
function matchesFieldCriteria(el: Element, field: FieldDescriptor, mode: 'type+placeholder' | 'type' | 'placeholder'): boolean {
  if (mode === 'type+placeholder') {
    return el.getAttribute('type') === field.type && el.getAttribute('placeholder') === field.placeholder;
  }
  if (mode === 'type') {
    return el.getAttribute('type') === field.type || (el.tagName.toLowerCase() === 'textarea' && field.type === 'textarea');
  }
  return el.getAttribute('placeholder') === field.placeholder;
}

/** Build ordered list of match strategies applicable to a field */
function getMatchStrategies(field: FieldDescriptor): ('type+placeholder' | 'type' | 'placeholder')[] {
  const strategies: ('type+placeholder' | 'type' | 'placeholder')[] = [];
  if (field.type && field.placeholder) {strategies.push('type+placeholder');}
  if (field.type) {strategies.push('type');}
  if (field.placeholder) {strategies.push('placeholder');}
  return strategies;
}

/** Check if field describes a textarea element */
function isTextareaField(field: FieldDescriptor): boolean {
  return field.type === 'textarea' || field.tagName === 'textarea';
}

export function findElementByFieldMetadata(form: HTMLElement, field: FieldDescriptor): Element | null {
  if (!field) {return null;}
  const allInputs = Array.from(form.querySelectorAll('input, textarea, select'));

  for (const strategy of getMatchStrategies(field)) {
    const m = allInputs.find(el => matchesFieldCriteria(el, field, strategy));
    if (m) {return m;}
  }
  return isTextareaField(field) ? form.querySelector('textarea') : null;
}
