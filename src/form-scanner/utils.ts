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

/** Controls a person types into — the only kind a spam trap is ever made of. */
const TEXT_ENTRY_TYPES = new Set(['', 'text', 'email', 'tel', 'url', 'number', 'search', 'password']);

function isTextEntry(el: HTMLElement): boolean {
  if (el instanceof HTMLTextAreaElement) { return true; }
  return el instanceof HTMLInputElement && TEXT_ENTRY_TYPES.has(el.type);
}

/**
 * A 1×1px box that clips what is inside: the field is there for bots, not for people.
 * Both sides must be tiny — a collapsed accordion section (height 0, full width) is a
 * part of the form the visitor opens, not a trap.
 */
function isClippedToNothing(el: HTMLElement): boolean {
  for (let node: HTMLElement | null = el; node && node !== document.body; node = node.parentElement) {
    const rect = node.getBoundingClientRect();
    if (rect.width > 1 || rect.height > 1) { continue; }
    if (node === el || getComputedStyle(node).overflow !== 'visible') { return true; }
  }
  return false;
}

/**
 * Hidden from assistive technology by the form itself. An aria-hidden ancestor OUTSIDE
 * the form is not counted: a page that opens a dialog marks everything else hidden,
 * and that says nothing about the field.
 */
function isAriaHiddenWithinForm(el: HTMLElement): boolean {
  const hiddenBy = el.closest('[aria-hidden="true"]');
  if (!hiddenBy) { return false; }
  const form = el.closest('form');
  return hiddenBy === el || (!!form && form.contains(hiddenBy));
}

/**
 * A text field a person cannot see or reach. Form builders hide their spam traps
 * exactly this way (WPForms Anti-Spam v3: a 1px container and visibility:hidden;
 * honeypot plugins: aria-hidden, display:none) and drop the whole entry when one is
 * filled, while the visitor is shown "thank you". Limited to text entry on purpose:
 * a radio or checkbox clipped to 1px is the standard custom-styled control, its
 * label is what people click.
 */
function isTrapLikeTextField(el: HTMLElement): boolean {
  return isTextEntry(el) && (isAriaHiddenWithinForm(el) || isClippedToNothing(el));
}

/**
 * checkVisibility() options that make it look at `visibility`. The option has two names:
 * Chrome 105-120 and Firefox 106-121 read only `checkVisibilityCSS`, later versions and
 * Safari 17.4+ read `visibilityProperty` too (MDN browser-compat-data, 2026-10-21). An
 * option a browser does not know is ignored, so both are passed.
 */
const CHECK_VISIBILITY_CSS: CheckVisibilityOptions = { visibilityProperty: true, checkVisibilityCSS: true };

/**
 * Not rendered for a person: display:none on it or an ancestor, or visibility:hidden.
 * checkVisibility() where the browser has it (Chrome 105+, Firefox 106+, Safari 17.4+);
 * without the visibility option it does NOT look at `visibility` — a visibility:hidden
 * field counted as visible and the widget filled WPForms' trap. Older browsers (Safari
 * before 17.4, older iOS) get the computed-style check, which must decide the same.
 */
function isNotRendered(el: HTMLElement): boolean {
  if (typeof el.checkVisibility === 'function') { return !el.checkVisibility(CHECK_VISIBILITY_CSS); }

  try {
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return true;
    }
  } catch {
    // getComputedStyle can throw for detached elements
  }

  // For custom web components (tag contains '-'), be lenient:
  // offsetParent can be null inside Ionic scroll containers, Capacitor WebViews, etc.
  if (el.tagName.includes('-')) {
    return false;
  }

  // For native elements, offsetParent null means truly hidden (display:none ancestor).
  // Exception: position:fixed elements also have null offsetParent but are visible.
  if (el.offsetParent === null) {
    try {
      return getComputedStyle(el).position !== 'fixed';
    } catch {
      return true;
    }
  }

  return false;
}

/** A radio or checkbox whose own box is hidden but whose label is on screen. */
function hasVisibleLabel(el: HTMLElement): boolean {
  if (!(el instanceof HTMLInputElement) || (el.type !== 'radio' && el.type !== 'checkbox')) { return false; }
  return Array.from(el.labels ?? []).some(label => !isNotRendered(label as HTMLElement));
}

const NATIVE_CONTROLS = 'input:not([type="hidden"]), select, textarea';
const OWN_INPUT_ROLES = new Set(['textbox', 'combobox', 'searchbox', 'spinbutton', 'listbox']);

/** An element that is an input on its own, whatever it holds: a component, a role, a binding. */
function isInputOnItsOwn(el: HTMLElement): boolean {
  if (el.tagName.includes('-') || el.shadowRoot) { return true; }
  if (OWN_INPUT_ROLES.has(el.getAttribute('role') ?? '')) { return true; }
  if (el.getAttribute('contenteditable') === 'true') { return true; }
  return ['ng-model', 'v-model', 'formcontrolname', 'data-bind'].some(attr => el.hasAttribute(attr));
}

/**
 * A plain wrapper (a div with "field" in its class, as every form builder draws one)
 * whose every control is hidden. Such a wrapper is scanned only for the controls inside
 * it; when they are all hidden, so is the field. Without this, hiding WPForms' trap
 * input made its container `div.wpforms-field` go to the analysis as a text field of
 * its own — with a badge, a "not filled" line in the review, and a value the widget
 * would write into the first text input of the form.
 */
function isWrapperOfHiddenControls(el: HTMLElement): boolean {
  if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) { return false; }
  if (isInputOnItsOwn(el)) { return false; }
  const controls = Array.from(el.querySelectorAll<HTMLElement>(NATIVE_CONTROLS));
  return controls.length > 0 && controls.every(control => isElementHidden(control));
}

/**
 * Universal visibility check for form elements.
 * Works reliably with custom web components (Ionic, Material, ng-zorro, etc.)
 * where offsetParent can be null for visible elements.
 */
export function isElementHidden(el: HTMLElement): boolean {
  if (isNotRendered(el)) { return !hasVisibleLabel(el); }
  return isTrapLikeTextField(el) || isWrapperOfHiddenControls(el);
}

/**
 * The container of a checkbox group: a known group class, or — as Contact Form 7,
 * WPForms and plain HTML draw it — the closest element holding every checkbox of
 * the form that shares this name. Counting only the two classes, any other group
 * went out as one checkbox, without its options, labelled after its first box, and
 * the model could not say which boxes to tick.
 */
export function findCheckboxGroupContainer(form: HTMLElement, baseNameOrId: string, element: HTMLElement): Element | null {
  const known = element.closest('.feature-options, .choice-options');
  if (known) { return known; }
  const name = element.getAttribute('name');
  if (!name || name !== baseNameOrId) { return null; }
  const boxes = Array.from(form.querySelectorAll(`input[type="checkbox"][name="${CSS.escape(name)}"]`));
  if (boxes.length < 2) { return null; }
  let container: Element | null = element.parentElement;
  while (container && !boxes.every(box => container!.contains(box))) { container = container.parentElement; }
  return container;
}
