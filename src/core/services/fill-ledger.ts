/**
 * FillLedger — what the widget may still write into a form after it has filled it.
 *
 * A fill writes each field once. Afterwards the widget writes a field again only to repair
 * it: the stabiliser, while a framework settles, and the value checks that run on a scroll,
 * on a change of the form's structure, right after the window closes and after an in-page
 * navigation. Each of those started over with no memory of the others, so a field the page
 * keeps undoing was written for as long as anything kept asking — a Contact Form 7 exclusive
 * group clicked on every scroll, a select the page resets written every 2 s — and a field the
 * visitor changed was written back.
 *
 * The ledger is the one memory all of them share, from one fill to the next:
 * - every field has a small number of rewrites (by kind of field, below); once they are
 *   spent the field is the page's until the next fill or the next route. A new route
 *   (history.pushState, back or forward, not answering a write of the widget) gives every
 *   field its rewrites again, and while the widget restores the form after it, a field the
 *   route mounts anew — a new element, none spent on it — gets its own (a route that renders
 *   a loading state, then the data). Outside that a field mounted anew shares the rewrites
 *   of the one it replaces: a page that swaps a field for an empty one on every change would
 *   otherwise be written on every check;
 * - a field a person has changed since the fill is the visitor's: it is never written again
 *   until the next fill. A person's change is a trusted `input` or `change` the widget did
 *   not cause: a page script's dispatched events are untrusted, and the trusted events of
 *   the widget's own click() on a box are told apart by lib/widget-write.ts. The mark goes
 *   on the field's name, so a whole radio or checkbox group is the visitor's after a click
 *   on any of its boxes, and a field the page re-renders keeps the mark.
 */

import { isWidgetWriting, noteWidgetWrite } from '../../lib/widget-write.js';

type Writable = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * Rewrites a checkbox or radio gets after the fill's click, and again after each new route. One recovers a box the page
 * dropped as it settled (Vue's v-model loses a box clicked in the same tick as another).
 * A box the page undoes again keeps a rule of its own — an exclusive group (Contact Form 7
 * unticks the other boxes of the name on change), a limit on how many may be ticked — and
 * clicking on fights it: every click runs the page's handlers, and the visitor's own choice
 * is clicked back. Measured over the whole Critical suite with the limit lifted: the Vue page
 * needs one, no other page any; with none, the Vue page loses a box.
 */
export const MAX_CHECKABLE_RETRIES = 1;

/**
 * Rewrites a text field or a select gets after the fill's write, and again after each new route. Measured over the whole
 * Critical suite with the limit lifted: no React, Vue or plain page needs one while it
 * settles; a field a re-render empties after the fill needs one, from the value check (with
 * none it stays empty). A field the page undoes again puts it back on purpose — a controlled
 * field that keeps its own state, a select reset or given another option — and is left as
 * the page holds it.
 */
export const MAX_VALUE_REWRITES = 1;

function isCheckable(el: Element): el is HTMLInputElement {
  return el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio');
}

function isWritable(el: unknown): el is Writable {
  return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement;
}

/** What a rewrite is counted on: a checkbox or radio per option (name and value), anything else per field. */
function budgetKey(el: Element, logicalName?: string): string {
  const field = logicalName || el.getAttribute('name') || el.id || '';
  return isCheckable(el) ? `${field}\u0000${el.value}` : field;
}

export class FillLedger {
  private rewrites = new Map<string, number>();
  /** The elements a rewrite was spent on since the fill or the last new route. */
  private spentOn = new WeakSet<Element>();
  private visitorNames = new Set<string>();
  private visitorFields = new WeakSet<Element>();
  private listening = false;

  private readonly onEdit = (event: Event): void => {
    if (isWidgetWriting()) { noteWidgetWrite(); return; }
    if (!event.isTrusted) {return;}
    const target = event.composedPath()[0];
    if (!isWritable(target)) {return;}
    this.visitorFields.add(target);
    if (target.name) {this.visitorNames.add(target.name);}
  };

  /** A new fill: every field has its rewrites again and none counts as the visitor's. */
  begin(): void {
    this.newRoute();
    this.visitorNames.clear();
    this.visitorFields = new WeakSet();
    if (!this.listening && typeof document !== 'undefined') {
      document.addEventListener('input', this.onEdit, true);
      document.addEventListener('change', this.onEdit, true);
      this.listening = true;
    }
  }

  /**
   * A new route: every field has its rewrites again. What the visitor changed since the fill
   * stays theirs — a route that puts the visitor's value back into a new field keeps it.
   */
  newRoute(): void {
    this.rewrites.clear();
    this.spentOn = new WeakSet();
  }

  /** Stop listening (the widget is removed). */
  stop(): void {
    if (!this.listening) {return;}
    document.removeEventListener('input', this.onEdit, true);
    document.removeEventListener('change', this.onEdit, true);
    this.listening = false;
  }

  /** Whether a person has changed this field since the fill. */
  isVisitors(el: Element, logicalName?: string): boolean {
    if (this.visitorFields.has(el)) {return true;}
    const name = el.getAttribute('name');
    return (!!name && this.visitorNames.has(name)) || (!!logicalName && this.visitorNames.has(logicalName));
  }

  /**
   * Whether the field may be written once more since the fill; spends one rewrite when it may.
   * A checkbox or radio counts per option (name and value), anything else per field.
   * `afterNewRoute`: the widget restores the form after a new route, and an element nothing
   * has been spent on since — one the route mounted anew — has its rewrites whole.
   */
  takeRewrite(el: Element, logicalName?: string, afterNewRoute = false): boolean {
    if (this.isVisitors(el, logicalName)) {return false;}
    const key = budgetKey(el, logicalName);
    const used = afterNewRoute && !this.spentOn.has(el) ? 0 : this.rewrites.get(key) ?? 0;
    if (used >= (isCheckable(el) ? MAX_CHECKABLE_RETRIES : MAX_VALUE_REWRITES)) {return false;}
    this.rewrites.set(key, used + 1);
    this.spentOn.add(el);
    return true;
  }
}
