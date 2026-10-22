/**
 * Marks the moments the widget itself changes a field, so a listener can tell the widget's
 * change from a person's.
 *
 * `isTrusted` alone does not tell them apart: a checkbox or radio set with `click()` gets its
 * `input` and `change` from the browser's own activation behaviour, and those are trusted
 * (HTML Standard, "fire an event"), the same as a person's. The widget's other writes
 * dispatch their events itself and are untrusted. The events of a click arrive synchronously
 * inside `click()`, so a counter around it is enough.
 */
let depth = 0;
let lastWriteAt = -Infinity;

/** Run a write of the widget's own; events fired while it runs are the widget's. */
export function asWidgetWrite<T>(write: () => T): T {
  depth++;
  try {
    return write();
  } finally {
    depth--;
  }
}

/** Whether the widget is writing a field right now. */
export function isWidgetWriting(): boolean {
  return depth > 0;
}

/** Note that a field got an `input` or `change` while the widget was writing (fill-ledger.ts listens). */
export function noteWidgetWrite(): void {
  lastWriteAt = performance.now();
}

/** Whether the widget is writing a field now, or changed one less than `ms` ago. */
export function widgetWroteWithin(ms: number): boolean {
  return depth > 0 || performance.now() - lastWriteAt < ms;
}
