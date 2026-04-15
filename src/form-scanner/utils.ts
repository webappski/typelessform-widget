import { SAFE_CLASS_PATTERNS } from './types.js';

/**
 * Deeply search for a native input/select/textarea inside an element.
 * Used across many modules.
 */
export function findDeepNestedInput(element: HTMLElement): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null {
  // If element itself is an input
  if (element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement) {
    return element;
  }

  // Search deeply for any input element
  const inputs = element.querySelectorAll('input:not([type="hidden"]), select, textarea');
  if (inputs.length > 0) {
    return inputs[0] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  }

  // Check Shadow DOM if available
  if (element.shadowRoot) {
    const shadowInputs = element.shadowRoot.querySelectorAll('input:not([type="hidden"]), select, textarea');
    if (shadowInputs.length > 0) {
      return shadowInputs[0] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    }
  }

  return null;
}

/**
 * Check if a string looks like a translation key (e.g., {{ key }} or dot.separated.key)
 */
export function isTranslationKey(text: string | null | undefined): boolean {
  if (!text) {return false;}
  const trimmedText = text.trim();
  // Check for {{ ... }} or | translate
  if (/\{\{.*\}\}|\|\s*translate/.test(trimmedText)) {
    return true;
  }
  if (/^([a-zA-Z0-9]+[._-])+[a-zA-Z0-9]+$/.test(trimmedText) && (trimmedText.includes('.') || trimmedText.includes('_') || trimmedText.includes('-'))) {
      if (trimmedText.length > 30 || trimmedText.split(/[._-]/).length > 2) {return true;}
  }
  return /^[a-z0-9-]+-[a-z0-9-]+/.test(trimmedText) && trimmedText.length > 20;
}

/**
 * Collect structural metadata from an element (classList, role, aria-*, datalist).
 */
export function collectStructuralMeta(el: HTMLElement): {
  tagName: string;
  classList: string[];
  role: string | null;
  ariaHaspopup: string | null;
  ariaControls: string | null;
  hasDatalist: boolean;
  listId: string | null;
} {
  const deep = findDeepNestedInput(el);
  const target = deep || el;

  const rawClasses = target.classList ? Array.from(target.classList) : [];
  const classList = rawClasses
    .filter(cls => SAFE_CLASS_PATTERNS.some(p => p.test(cls)))
    .slice(0, 12)
    .map(cls => cls.slice(0, 40));

  const role = target.getAttribute('role');
  const ariaHaspopup = target.getAttribute('aria-haspopup');
  const ariaControls = target.getAttribute('aria-controls');

  const listId = target.getAttribute('list');
  const hasDatalist = !!(listId && document.getElementById(listId) instanceof HTMLDataListElement);

  const tagName = el.tagName.toLowerCase();

  return {
    tagName,
    classList,
    role,
    ariaHaspopup,
    ariaControls,
    hasDatalist,
    listId,
  };
}

/**
 * Extract clean label text from a DOM element.
 */
export function extractCleanLabelText(element: HTMLElement): string | null {
  if (!element.textContent) {return null;}

  // Extract text and clean it
  let text = element.textContent.trim();

  // Remove common label suffixes/prefixes
  text = text.replace(/^(Label|label):\s*/i, '');
  text = text.replace(/\s*:$/, '');
  text = text.replace(/\s*\*\s*$/, ''); // Remove required asterisk
  text = text.replace(/\s*\(.*?\)\s*$/, ''); // Remove parenthetical text like "(optional)"

  return text.trim() || null;
}

/**
 * Check if labelElement appears before targetElement in DOM order.
 */
export function isElementBefore(labelElement: HTMLElement, targetElement: HTMLElement): boolean {
  // Check if label comes before target in DOM order
  const position = labelElement.compareDocumentPosition(targetElement);
  return (position & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
}

/**
 * Universal visibility check for form elements.
 * Works reliably with custom web components (Ionic, Material, ng-zorro, etc.)
 * where offsetParent can be null for visible elements.
 */
export function isElementHidden(el: HTMLElement): boolean {
  // 1. Best method: checkVisibility (Chrome 105+, Safari 17.4+, Firefox 106+)
  if (typeof el.checkVisibility === 'function') {
    return !el.checkVisibility();
  }

  // 2. Fallback: computed style check
  try {
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return true;
    }
  } catch {
    // getComputedStyle can throw for detached elements
  }

  // 3. For custom web components (tag contains '-'), be lenient:
  //    offsetParent can be null inside Ionic scroll containers, Capacitor WebViews, etc.
  if (el.tagName.includes('-')) {
    return false;
  }

  // 4. For native elements, offsetParent null means truly hidden (display:none ancestor)
  //    Exception: position:fixed elements also have null offsetParent but are visible
  if (el.offsetParent === null) {
    try {
      const style = getComputedStyle(el);
      return style.position !== 'fixed';
    } catch {
      return true;
    }
  }

  return false;
}
