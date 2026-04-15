import { findDeepNestedInput } from './utils.js';

/**
 * Determine the element type using a 4-level detection hierarchy.
 */
export function getElementType(element: HTMLElement): string {
  try {
    // LEVEL 1: HTML5 standards (100% reliable)
    const nativeType = checkNativeInputTypes(element);
    if (nativeType) {return nativeType;}

    // LEVEL 2: Functional signatures (universal)
    const functionalType = analyzeFunctionalSignatures(element);
    if (functionalType) {return functionalType;}

    // LEVEL 3: Structural patterns (framework-agnostic)
    const structuralType = analyzeStructuralSignatures(element);
    if (structuralType) {return structuralType;}

    // LEVEL 4: Behavioral analysis (runtime)
    const behavioralType = analyzeBehavioralSignatures(element);
    if (behavioralType) {return behavioralType;}

    // FALLBACK: Basic types for remaining elements
    return getBasicElementType(element);
  } catch (_e) {
    return 'text'; // Safe fallback
  }
}

/** Get native type from a single element (not recursive). */
function getNativeType(el: HTMLElement): string | null {
  if (el instanceof HTMLInputElement) { return el.type || 'text'; }
  if (el instanceof HTMLSelectElement) { return el.multiple ? 'select-multiple' : 'select-one'; }
  if (el instanceof HTMLTextAreaElement) { return 'textarea'; }
  return null;
}

/**
 * LEVEL 1: Check native HTML5 input types
 */
export function checkNativeInputTypes(element: HTMLElement): string | null {
  const deepInput = findDeepNestedInput(element);
  if (deepInput) {
    const deepType = getNativeType(deepInput);
    if (deepType) { return deepType; }
  }
  return getNativeType(element);
}

type ConstraintMap = { step?: string; min?: string; max?: string; pattern?: string };

const CONSTRAINT_KEYS = ['step', 'min', 'max', 'pattern'] as const;

/** Read constraints from an HTMLInputElement's properties. */
function readInputConstraints(input: HTMLInputElement): ConstraintMap {
  const c: ConstraintMap = {};
  if (input.step) { c.step = input.step; }
  if (input.min) { c.min = input.min; }
  if (input.max) { c.max = input.max; }
  if (input.pattern) { c.pattern = input.pattern; }
  return c;
}

/** Read constraints from element attributes. */
function readAttrConstraints(el: HTMLElement): ConstraintMap {
  const c: ConstraintMap = {};
  for (const key of CONSTRAINT_KEYS) {
    const val = el.getAttribute(key);
    if (val) { c[key] = val; }
  }
  return c;
}

/**
 * Extract constraint attributes for intelligent value processing
 */
export function extractConstraints(element: HTMLElement): ConstraintMap {
  const fromProps = (element instanceof HTMLInputElement) ? readInputConstraints(element) : {};
  const fromAttrs = readAttrConstraints(element);
  const merged: ConstraintMap = { ...fromProps, ...fromAttrs };

  const deepInput = findDeepNestedInput(element);
  if (deepInput && deepInput instanceof HTMLInputElement) {
    const deepC = readInputConstraints(deepInput);
    for (const key of CONSTRAINT_KEYS) {
      if (deepC[key] && !merged[key]) { merged[key] = deepC[key]; }
    }
  }

  return merged;
}

/**
 * LEVEL 2: Analyze functional signatures
 */
export function analyzeFunctionalSignatures(element: HTMLElement): string | null {
  // 1. Standardized attributes
  const standardAttrs = [
    'type', 'inputmode', 'pattern', 'min', 'max', 'step'
  ];

  for (const attr of standardAttrs) {
    const value = element.getAttribute(attr);
    if (value) {
      // Analyze the attribute value, not its name
      if (isDateTimeAttributeValue(value)) {
        return classifyDateTimeType(value);
      }
    }
  }

  // 2. ARIA standards (W3C)
  const ariaType = analyzeAriaSignatures(element);
  if (ariaType) {return ariaType;}

  // 3. HTML5 data attributes (semantic)
  const dataType = analyzeDataAttributes(element);
  if (dataType) {return dataType;}

  return null;
}

/**
 * LEVEL 3: Analyze structural patterns
 */
export function analyzeStructuralSignatures(element: HTMLElement): string | null {
  try {
    // 1. Framework-agnostic CSS analysis
    const cssType = analyzeCSSStructure(element);
    if (cssType) {return cssType;}

    // 2. DOM structure
    const domType = analyzeDOMStructure(element);
    if (domType) {return domType;}
  } catch (_e) {
    // Silently handle errors
  }

  return null;
}

/**
 * LEVEL 4: Behavioral analysis
 */
export function analyzeBehavioralSignatures(element: HTMLElement): string | null {
  // 1. Check for popup/overlay behavior
  const popupBehavior = hasPopupBehavior(element);
  if (popupBehavior) {return 'date';}

  // 2. Check for date validation behavior
  const dateValidation = hasDateValidation(element);
  if (dateValidation) {return 'date';}

  return null;
}

/**
 * FALLBACK: Basic element types
 */
export function getBasicElementType(element: HTMLElement): string {
  // Check role attribute
  const role = element.getAttribute('role');
  if (role) {
    const roleToType: Record<string, string> = {
      'textbox': 'text',
      'combobox': 'select-one',
      'searchbox': 'search',
      'spinbutton': 'number'
    };
    if (roleToType[role]) {
      return roleToType[role];
    }
  }

  // Check data attributes
  const dataType = element.getAttribute('data-type') || element.getAttribute('data-input-type');
  if (dataType) {
    return dataType;
  }

  // Check tag name for basic hints
  const tagName = element.tagName.toLowerCase();
  if (tagName.includes('search')) {return 'search';}
  if (tagName.includes('email')) {return 'email';}
  if (tagName.includes('password')) {return 'password';}
  if (tagName.includes('select')) {return 'select-one';}
  if (tagName.includes('textarea')) {return 'textarea';}

  // Default to text
  return 'text';
}

/**
 * Check if a value looks like a date/time format
 */
export function isDateTimeAttributeValue(value: string): boolean {
  // Analyze the STRUCTURE of the value, not specific words
  const v = value.toLowerCase();

  // Patterns for various datetime attribute types
  const patterns = [
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/, // ISO datetime
    /^\d{4}-\d{2}-\d{2}$/, // ISO date
    /^\d{2}:\d{2}/, // Time
    /^(19|20)\d{2}$/, // Year
    /\d{1,2}\/\d{1,2}\/\d{4}/, // Date patterns
    /\d{1,2}\.\d{1,2}\.\d{4}/, // European date
    /\d{1,2}-\d{1,2}-\d{4}/, // Dash date
  ];

  return patterns.some(pattern => pattern.test(v));
}

/**
 * Classify the datetime type based on value
 */
export function classifyDateTimeType(value: string): string {
  if (/T\d{2}:\d{2}/.test(value)) {return 'datetime-local';}
  if (/^\d{2}:\d{2}/.test(value)) {return 'time';}
  return 'date';
}

/**
 * Analyze ARIA attributes for date/time signatures
 */
export function analyzeAriaSignatures(element: HTMLElement): string | null {
  // W3C ARIA standards for datetime
  const ariaRoles = element.getAttribute('role');
  const ariaLabel = element.getAttribute('aria-label');
  const ariaDescribedBy = element.getAttribute('aria-describedby');

  // Standardized ARIA roles
  const dateRoles = ['datepicker', 'gridcell', 'grid'];
  if (ariaRoles && dateRoles.includes(ariaRoles)) {
    return 'date';
  }

  // Analyze accessibility descriptions via STRUCTURE
  if (ariaLabel || ariaDescribedBy) {
    const hasDateStructure = hasDateTimeStructure(ariaLabel, ariaDescribedBy);
    if (hasDateStructure) {return 'date';}
  }

  return null;
}

/**
 * Check for datetime structure in text
 */
export function hasDateTimeStructure(ariaLabel: string | null, ariaDescribedBy: string | null): boolean {
  const combinedText = `${ariaLabel || ''} ${ariaDescribedBy || ''}`;

  // Look for STRUCTURAL indicators, not specific words
  const structuralIndicators = [
    /\b\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}\b/, // Date examples in text
    /\b(19|20)\d{2}\b/, // Years
    /\b[0-3]?\d\b.*\b[0-3]?\d\b/, // Numbers as in dates
    /\b\d{2}:\d{2}\b/, // Time
    /\b(select|choose|pick|enter|input).*\b/i, // Selection actions
  ];

  return structuralIndicators.some(pattern => pattern.test(combinedText));
}

/**
 * Analyze data-* attributes for date/time indicators
 */
export function analyzeDataAttributes(element: HTMLElement): string | null {
  // Analyze ALL data-* attributes
  const dataAttrs = Array.from(element.attributes)
    .filter(attr => attr.name.startsWith('data-'))
    .map(attr => ({ name: attr.name, value: attr.value }));

  for (const attr of dataAttrs) {
    // Analyze STRUCTURE of attribute name
    if (isDateTimeAttributeName(attr.name)) {
      return 'date';
    }

    // Analyze STRUCTURE of attribute value
    if (isDateTimeAttributeValue(attr.value)) {
      return 'date';
    }
  }

  return null;
}

/**
 * Check if a data-attribute name indicates a datetime field
 */
export function isDateTimeAttributeName(attrName: string): boolean {
  // Patterns for attribute names (structural analysis)
  const patterns = [
    /^data-.*date.*$/i,
    /^data-.*time.*$/i,
    /^data-.*calendar.*$/i,
    /^data-.*picker.*$/i,
    /^data-.*datetime.*$/i,
    /^data-.*min.*date.*$/i,
    /^data-.*max.*date.*$/i,
  ];

  return patterns.some(pattern => pattern.test(attrName));
}

/**
 * Analyze CSS structure for date/time patterns
 */
export function analyzeCSSStructure(element: HTMLElement): string | null {
  // Analyze CSS classes via PATTERNS, not specific names
  // Safely handle className - may not be a string in some frameworks
  let classNames = '';
  try {
    const cn = element.className;
    const cnType = typeof cn;

    if (cnType === 'string') {
      classNames = cn.toLowerCase();
    } else if (cn && typeof (cn as unknown as { toString?: () => string }).toString === 'function') {
      classNames = String(cn).toLowerCase();
    }
  } catch (_e) {
    // Silently handle any getter errors
    classNames = '';
  }

  // Structural patterns for CSS classes
  const patterns = [
    /\b\w*date\w*\b/,
    /\b\w*time\w*\b/,
    /\b\w*calendar\w*\b/,
    /\b\w*picker\w*\b/,
    /\b\w*datetime\w*\b/,
    // Compound patterns
    /\b\w+-date-\w+\b/,
    /\b\w+-time-\w+\b/,
    /\bdate-\w+\b/,
    /\btime-\w+\b/,
  ];

  if (patterns.some(pattern => pattern.test(classNames))) {
    return 'date';
  }

  return null;
}

/**
 * Analyze DOM structure for date/time indicators
 */
export function analyzeDOMStructure(element: HTMLElement): string | null {
  // Analyze DOM STRUCTURE, not specific elements

  // 1. Deep search for nested input elements
  const deepInputs = element.querySelectorAll('input, select, textarea');

  for (const input of deepInputs) {
    if (input instanceof HTMLInputElement) {
      if (['date', 'datetime-local', 'time', 'month', 'week'].includes(input.type)) {
        return input.type;
      }

      // Analyze value for datetime structure
      if (input.value && isDateTimeAttributeValue(input.value)) {
        return 'date';
      }
    }
  }

  // 2. Search for related elements via ID/aria-*
  const relatedElements = findRelatedElements(element);

  for (const related of relatedElements) {
    // If related element has datetime structure
    if (hasDateTimeStructure(related.textContent, related.getAttribute('aria-label'))) {
      return 'date';
    }
  }

  return null;
}

/**
 * Find elements related to the given element
 */
export function findRelatedElements(element: HTMLElement): HTMLElement[] {
  const related: HTMLElement[] = [];

  // 1. Elements with aria-controls
  const ariaControls = element.getAttribute('aria-controls');
  if (ariaControls) {
    const controlled = document.getElementById(ariaControls);
    if (controlled) {related.push(controlled);}
  }

  // 2. Previous/next siblings
  const siblings = [element.previousElementSibling, element.nextElementSibling];
  siblings.forEach(sibling => {
    if (sibling instanceof HTMLElement) {related.push(sibling);}
  });

  // 3. Child elements
  related.push(...Array.from(element.children) as HTMLElement[]);

  return related;
}

/**
 * Check for popup behavior (aria-controls, aria-owns, data-target, etc.)
 */
export function hasPopupBehavior(element: HTMLElement): boolean {
  // Check connections via aria-controls, aria-owns, data-target
  const connectionAttrs = ['aria-controls', 'aria-owns', 'data-target', 'data-toggle'];

  return connectionAttrs.some(attr => {
    const targetId = element.getAttribute(attr);
    return targetId && document.getElementById(targetId);
  });
}

/**
 * Check for date validation attributes with datetime structure
 */
export function hasDateValidation(element: HTMLElement): boolean {
  // Check validation attributes with date structure
  const validationAttrs = ['pattern', 'min', 'max', 'step'];

  return validationAttrs.some(attr => {
    const value = element.getAttribute(attr);
    return value && isDateTimeAttributeValue(value);
  });
}
