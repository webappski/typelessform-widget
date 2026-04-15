/**
 * Focus trap utility for modal dialogs (WCAG 2.4.3).
 * Keeps Tab / Shift+Tab cycling within a container.
 */

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function handleFocusTrap(e: KeyboardEvent, container: HTMLElement): void {
  if (e.key !== 'Tab') {return;}

  const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
  if (focusable.length === 0) {return;}

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  // In shadow DOM, activeElement lives on the ShadowRoot, not document
  const root = container.getRootNode() as ShadowRoot | Document;
  const active = ('activeElement' in root ? root.activeElement : document.activeElement) as HTMLElement | null;

  if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
}
