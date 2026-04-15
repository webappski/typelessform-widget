/** Check if a native form element is interactive (not read-only). */
function isNativeFormInteractive(element: HTMLElement): boolean | null {
  if (element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement) {
    return !(element.hasAttribute('readonly') ||
        element.getAttribute('aria-readonly') === 'true');
  }
  return null; // null = not a native element
}

/** Check ARIA role or contenteditable. */
function hasInteractiveRole(element: HTMLElement): boolean {
  const role = element.getAttribute('role');
  if (role && ['textbox', 'combobox', 'searchbox', 'spinbutton'].includes(role)) {
    return true;
  }
  return element.getAttribute('contenteditable') === 'true';
}

/** Check if element is in a table cell without form bindings. */
function isTableCellDisplayOnly(element: HTMLElement): boolean {
  if (!element.closest('td, th')) { return false; }
  return !element.hasAttribute('formcontrolname') &&
    !element.hasAttribute('ng-model') &&
    !element.hasAttribute('v-model');
}

/** Check for framework bindings or nested inputs (including Shadow DOM). */
function hasFrameworkOrNestedInput(element: HTMLElement): boolean {
  if (element.querySelector('input:not([readonly]), select:not([readonly]), textarea:not([readonly])')) {
    return true;
  }
  // Check Shadow DOM for nested inputs (Ionic, Material, Stencil, etc.)
  if (element.shadowRoot?.querySelector('input:not([readonly]), select:not([readonly]), textarea:not([readonly])')) {
    return true;
  }
  return element.hasAttribute('ng-model') ||
    element.hasAttribute('v-model') ||
    element.hasAttribute('formcontrolname') ||
    element.hasAttribute('data-bind');
}

/** Check tabindex-based interactivity. */
function isTabindexInteractive(element: HTMLElement): boolean {
  const tabIndex = element.getAttribute('tabindex');
  if (!tabIndex || parseInt(tabIndex) < 0) { return false; }
  return !(element.closest('table') || element.getAttribute('aria-readonly') === 'true');
}

/**
 * Check if an element is interactive (i.e., a form input that can be filled).
 */
export function isInteractiveElement(element: HTMLElement): boolean {
  const nativeResult = isNativeFormInteractive(element);
  if (nativeResult !== null) { return nativeResult; }
  if (hasInteractiveRole(element)) { return true; }
  if (isTableCellDisplayOnly(element)) { return false; }
  if (hasFrameworkOrNestedInput(element)) { return true; }
  return isTabindexInteractive(element);
}

/** Check if element is in a data table (many similar siblings). */
function isInDataTable(element: HTMLElement): boolean {
  const table = element.closest('table');
  if (!table) { return false; }
  return table.querySelectorAll(element.tagName).length > 5;
}

/** Check if element appears to be in a display grid (short numeric value, many siblings). */
function isInDisplayGrid(element: HTMLElement, value: unknown): boolean {
  if (value === '' || typeof value !== 'string') { return false; }
  if (!/^\d+$/.test(value) || value.length > 2) { return false; }
  const parent = element.parentElement?.parentElement;
  return !!parent && parent.querySelectorAll(element.tagName).length > 3;
}

/** Check if CSS class name suggests a display-only element. */
function hasDisplayOnlyClassName(element: HTMLElement): boolean {
  const cn = (typeof element.className === 'string' ? element.className : '').toLowerCase();
  if (cn.includes('readonly') || cn.includes('display') || cn.includes('static')) { return true; }
  if (cn.includes('label') || cn.includes('view')) { return true; }
  return cn.includes('text') && !cn.includes('textbox') && !cn.includes('textarea');
}

/** Check if it's a custom element without input indicators. */
function isCustomElementWithoutInputIndicators(element: HTMLElement): boolean {
  const tagName = element.tagName.toLowerCase();
  if (!tagName.includes('field') && !tagName.includes('input') && !tagName.includes('search')) { return false; }
  return !element.querySelector('input, select, textarea') &&
    !element.shadowRoot?.querySelector('input, select, textarea') &&
    !element.hasAttribute('contenteditable') &&
    !element.hasAttribute('ng-model') &&
    !element.hasAttribute('v-model') &&
    !element.hasAttribute('formcontrolname');
}

/**
 * Determine if an element is likely a display-only field (not editable).
 */
export function isLikelyDisplayOnlyField(element: HTMLElement, value: unknown, _label: string): boolean {
  const tagName = element.tagName.toLowerCase();
  if (tagName === 'input' || tagName === 'select' || tagName === 'textarea') {
    return false;
  }
  if (isInDataTable(element)) { return true; }
  if (isInDisplayGrid(element, value)) { return true; }
  if (element.closest('ul, ol') && !element.hasAttribute('contenteditable')) { return true; }
  if (hasDisplayOnlyClassName(element)) { return true; }
  return isCustomElementWithoutInputIndicators(element);
}

/**
 * Check if an element is an internal field of a composite component
 * (such fields should not be directly fillable).
 */
export function isInternalFieldOfCompositeComponent(element: HTMLElement): boolean {
  // List of composite components whose internal fields should be ignored
  const compositeComponentSelectors = [
    'app-input-interval',     // Retention field component
    'app-date-range',         // Date range components
    'app-time-range',         // Time range components
    'app-number-range',       // Number range components
    'cloud-ui-input-tags',    // Multi-select tag inputs
    '[class*="composite"]',   // Any element with "composite" in class
    '[class*="interval"]',    // Any element with "interval" in class
    '[class*="range"]'        // Any element with "range" in class
  ];

  // Check if the element is inside a composite component
  for (const selector of compositeComponentSelectors) {
    const compositeParent = element.closest(selector);
    if (compositeParent && compositeParent !== element) {
      return true;
    }
  }

  return false;
}
