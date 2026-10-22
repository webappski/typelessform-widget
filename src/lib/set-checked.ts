import { asWidgetWrite } from './widget-write.js';

/**
 * Ticks or unticks a checkbox, or chooses a radio, the way a person does: with a click,
 * and only when its state is not the one wanted.
 *
 * React listens to `click` on these inputs, not to `input` or `change` (ChangeEventPlugin,
 * shouldUseClickEvent). Assigning `.checked` also updates React's own value tracker, so a
 * later click looks like "no change" and a controlled component's onChange never runs: the
 * box is drawn ticked while the component's state stays empty and the form is submitted
 * without the choice. With a click the browser toggles the box and fires `input` and
 * `change` itself, so Vue's v-model and plain pages hear it as they hear a person; the
 * widget sends no event of its own on top. Being a person's click, it also runs the page's
 * own click handlers (analytics, a confirm dialog).
 *
 * One click here. A box the page did not let change (a disabled box, a click handler that
 * prevents it, a controlled component that kept its state) is left as the page holds it —
 * never forced into a state the page does not know about. A box the page undoes later (v-model
 * dropping a box clicked in the same tick as another, an exclusive group unticking its
 * neighbour) is clicked again at most MAX_CHECKABLE_RETRIES times until the next fill or
 * in-page navigation — by the stabiliser or a value check after the fill, together
 * (core/services/fill-ledger.ts) — and then left as the page holds it.
 *
 * Not every writer comes here: the public applyValuesGlobal() and the fallback of
 * FormFillerController (used before the form applier exists) still assign `.checked`.
 *
 * @returns true when the input is now in the wanted state and was not before.
 */
export function setCheckedLikeAPerson(input: HTMLInputElement, checked: boolean): boolean {
  if (input.checked === checked) { return false; }
  // A radio is cleared by choosing another option of its group, never by itself.
  if (input.type === 'radio' && !checked) { return false; }
  asWidgetWrite(() => input.click());
  return input.checked === checked;
}
