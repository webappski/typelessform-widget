/**
 * DOM utility functions for form-aware element membership checking
 *
 * Supports multiple form binding methods:
 * 1. Direct containment: form.contains(element)
 * 2. HTML5 form attribute: <input form="formId">
 * 3. Element.form property: input.form === form
 * 4. Shadow DOM hosts: custom components in shadow DOM
 */

/**
 * Check if an element belongs to a specific form
 * Respects all HTML5 form association methods
 * Handles shadow DOM traversal for custom components
 */
/** Check if a form-associated element's .form property matches the target form */
function isFormAssociated(node: Element, form: HTMLFormElement): boolean {
  if (node instanceof HTMLInputElement ||
      node instanceof HTMLTextAreaElement ||
      node instanceof HTMLSelectElement ||
      node instanceof HTMLButtonElement ||
      node instanceof HTMLOutputElement) {
    return node.form === form;
  }
  return false;
}

/** Walk shadow host chain to find if any host is contained by the form */
function isShadowHostInForm(node: Element, form: HTMLFormElement): boolean {
  let current: Element | null = node;
  let depth = 0;
  const maxDepth = 50;

  while (current && depth < maxDepth) {
    depth++;
    const root = current.getRootNode?.() as unknown as (ShadowRoot | Document) | null;
    if (!root) {break;}
    const host: Element | undefined = (root as ShadowRoot)?.host;
    if (!host) {break;}
    if (form.contains(host)) {return true;}
    current = host;
  }
  return false;
}

export function belongsToForm(node: Element, form: HTMLFormElement): boolean {
  if (!node || !form || !form.isConnected) {return false;}
  if (form.contains(node)) {return true;}
  if (isFormAssociated(node, form)) {return true;}

  const formAttr = (node as Element).getAttribute?.('form');
  if (formAttr && form.id && formAttr === form.id) {return true;}

  return isShadowHostInForm(node, form);
}
