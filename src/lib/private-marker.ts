/**
 * Whether the site marked a field private — the one answer every layer asks: the
 * scanner (what is sent), the form applier, the controller's fallback and the public
 * applyValuesGlobal() (what is written).
 *
 * Private is:
 *   - `data-ai-private`, by its presence, whatever its value — as the docs show it
 *     (USER_GUIDE.md: a bare `data-ai-private`; README and typelessform.com/security:
 *     "the data-ai-private attribute"), `data-ai-private="false"` included;
 *   - `data-private="true"`, the older alias the scanner has always read;
 *   - a password field: an `<input type="password">`, or a field the scanner typed
 *     `password` (a custom element named after one), passed in as `type`.
 *
 * Each layer used to write its own copy of this check, and the copies drifted: only the
 * scanner knew the alias and the password type, so a layer that writes values filled a
 * `data-private="true"` field it was handed directly.
 *
 * A radio group comes back from `form.elements` as a RadioNodeList: it is private when
 * any of its buttons is.
 */
export function isMarkedPrivate(target: Element | RadioNodeList | null | undefined, type?: string): boolean {
  if (!target) { return false; }
  if (target instanceof RadioNodeList) {
    return Array.from(target).some(node => node instanceof Element && isMarkedPrivate(node));
  }
  return target.hasAttribute('data-ai-private') ||
    target.getAttribute('data-private') === 'true' ||
    (target instanceof HTMLInputElement && target.type === 'password') ||
    type === 'password';
}
