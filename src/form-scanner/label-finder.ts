import { isTranslationKey, extractCleanLabelText, isElementBefore } from './utils.js';

const POTENTIAL_LABEL_TAGS = ['P', 'SPAN', 'DIV', 'H6', 'H5', 'H4', 'H3', 'H2', 'H1', 'LABEL'];

/** Try <label for="element.id">. */
function findLabelFor(element: HTMLElement, form: HTMLElement): string | null {
  if (!element.id) { return null; }
  const labelEl = form.querySelector<HTMLLabelElement>(`label[for="${element.id}"]`);
  return (labelEl && labelEl.textContent) ? labelEl.textContent.trim() : null;
}

/** Try parent <label>, excluding the element's own text. */
function findParentLabel(element: HTMLElement): string | null {
  const parent = element.parentElement;
  if (!parent || parent.tagName.toLowerCase() !== 'label' || !parent.textContent) { return null; }
  let textContent = '';
  Array.from(parent.childNodes).forEach(node => {
    if (node !== element) { textContent += node.textContent || ''; }
  });
  return textContent.trim() || null;
}

/** Try preceding sibling or wrapper's preceding sibling. */
function findSiblingLabel(element: HTMLElement, form: HTMLElement): string | null {
  const sibling = element.previousElementSibling;
  if (sibling && POTENTIAL_LABEL_TAGS.includes(sibling.tagName) && sibling.textContent) {
    return sibling.textContent.trim();
  }
  return findWrapperSiblingLabel(element, form);
}

/** Check the previous sibling of the element's wrapper. */
function findWrapperSiblingLabel(element: HTMLElement, form: HTMLElement): string | null {
  const wrapper = element.parentElement;
  if (!wrapper || wrapper === form || wrapper === document.body) { return null; }
  const sibling = wrapper.previousElementSibling;
  if (!sibling || !POTENTIAL_LABEL_TAGS.includes(sibling.tagName) || !sibling.textContent) { return null; }
  if (sibling.tagName === 'LABEL' && (sibling as HTMLLabelElement).htmlFor && (sibling as HTMLLabelElement).htmlFor !== element.id) {
    return null;
  }
  return sibling.textContent.trim();
}

/**
 * Find the label text associated with a form element.
 * Searches: <label for="...">, parent <label>, universal label search, sibling elements.
 */
export function findLabelText(element: HTMLElement, form: HTMLElement): string | null {
  return findLabelFor(element, form)
    || findParentLabel(element)
    || findUniversalLabel(element)
    || findSiblingLabel(element, form);
}

/**
 * Universal label search that works with any framework/library.
 * Walks up the DOM looking for label-like elements.
 */
export function findUniversalLabel(element: HTMLElement): string | null {
  // Universal label search that works with any framework/library
  let current: HTMLElement = element;
  let searchDepth = 0;
  const maxDepth = 5;

  while (current && searchDepth < maxDepth) {
    const parent = current.parentElement;
    if (!parent) {break;}

    // 1. Look for universal label-like elements in the same container
    const labelSelectors = [
      // Standard labels
      'label',
      // Framework-specific labels (Angular, React, Vue, etc.)
      '*[class*="label"]',
      '*[class*="Label"]',
      // ARIA labels
      '*[role="label"]',
      // Common headings/text elements that act as labels
      'h1, h2, h3, h4, h5, h6',
      'p, span, div',
      // Framework-specific components
      'gc-label, mat-label, v-label, form-label',
      // Any element with label-like attributes
      '*[aria-label]',
      '*[title]'
    ];

    for (const selector of labelSelectors) {
      // Look for label BEFORE the current element (common pattern)
      const labelElement = findLabelInContainer(parent, selector, current);
      if (labelElement) {
        const labelText = extractCleanLabelText(labelElement);
        if (labelText && !isTranslationKey(labelText)) {
          return labelText;
        }
      }
    }

    current = parent;
    searchDepth++;
  }

  return null;
}

/**
 * Find a label element within a container that appears before the target element.
 */
export function findLabelInContainer(container: HTMLElement, selector: string, targetElement: HTMLElement): HTMLElement | null {
  try {
    const elements = container.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLElement;
      // Check if this label is positioned before our target element
      if (isElementBefore(el, targetElement) && el.textContent?.trim()) {
        return el;
      }
    }
  } catch (_e) {
    // Invalid selector, skip
  }
  return null;
}

const GROUP_LABEL_MATCH = 'p, span, h1,h2,h3,h4,h5,h6';

/** Check if element is a label-like sibling (heading, p, span, or unbound label). */
function isGroupLabelSibling(el: Element): boolean {
  return el.matches(GROUP_LABEL_MATCH) ||
    (el.tagName === 'LABEL' && !(el as HTMLLabelElement).htmlFor);
}

/** Search for group label via the container's previous siblings and parent. */
function findGroupLabelFromContainer(
  containerToProbe: Element, firstElementInGroup: HTMLElement, form: HTMLElement
): Element | null {
  const prevSibling = containerToProbe.previousElementSibling;
  if (prevSibling && isGroupLabelSibling(prevSibling)) { return prevSibling; }

  const containerParent = containerToProbe.parentElement;
  if (containerParent && containerParent !== form && containerParent.children[0] === containerToProbe) {
    const parentPrevSibling = containerParent.previousElementSibling;
    if (parentPrevSibling && isGroupLabelSibling(parentPrevSibling)) { return parentPrevSibling; }
  }

  return findDirectChildLabel(containerToProbe, firstElementInGroup);
}

/** Look for a direct child of the container that acts as a group label. */
function findDirectChildLabel(container: Element, firstElement: HTMLElement): Element | null {
  const directLabel = container.querySelector(`${GROUP_LABEL_MATCH}, legend`);
  if (!directLabel || directLabel.closest('label[for]')) { return null; }
  if (directLabel.contains(firstElement)) { return null; }
  const nestedLabels = Array.from(directLabel.querySelectorAll('label'));
  if (nestedLabels.some(l => l.htmlFor === firstElement.id)) { return null; }
  return directLabel;
}

/** Fallback: walk up the DOM looking for label-like previous siblings. */
function findGroupLabelFallback(startElement: HTMLElement, form: HTMLElement): Element | null {
  let current: Element | null = startElement.parentElement;
  while (current && current !== form) {
    let prev = current.previousElementSibling;
    while (prev) {
      if (prev.matches(`${GROUP_LABEL_MATCH},legend`) || (prev.tagName === 'LABEL' && !(prev as HTMLLabelElement).htmlFor)) {
        return prev;
      }
      prev = prev.previousElementSibling;
    }
    current = current.parentElement;
  }
  return null;
}

/**
 * Find the group label element for radio/checkbox groups.
 * Searches fieldset legends, container siblings, and parent elements.
 */
export function findGroupLabelElement(firstElementInGroup: HTMLElement, form: HTMLElement, groupContainer?: Element | null): Element | null {
  const fieldset = firstElementInGroup.closest('fieldset');
  if (fieldset) {
    const legend = fieldset.querySelector('legend');
    if (legend) { return legend; }
  }

  const containerToProbe = groupContainer || firstElementInGroup.closest('.form-group, .radio-group, .checkbox-group, .feature-options, .choice-options');
  if (containerToProbe) {
    const result = findGroupLabelFromContainer(containerToProbe, firstElementInGroup, form);
    if (result) { return result; }
  }

  return findGroupLabelFallback(firstElementInGroup, form);
}
