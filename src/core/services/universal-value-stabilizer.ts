/**
 * UniversalValueStabilizer - per-form session-based value stabilization
 *
 * Ensures form field values "stick" in controlled frameworks (React, Angular, Vue)
 * without relying on private APIs or framework-specific hooks.
 *
 * One session per form; independent lifecycle; safe for multi-widget scenarios.
 */

type AnyInput = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

// Native property setters (cached once per module load)
const inputValueSetter =
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set || null;
const textareaValueSetter =
  Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set || null;

/**
 * Public session interface - minimal, isolation-safe
 */
export interface IStabilizerSession {
  writeOnce(el: AnyInput, v: string | boolean): void;
  enqueue(el: AnyInput, v: string | boolean, logicalName?: string): void;
  hasPendingWork(): boolean;
  quietFor(ms: number): boolean;
  maxSlotMs(): number;
  attach(): void;
  detach(): void;
  destroy(): void;
}

// ---- Module-level utility functions (no closure dependency)

function norm(s?: string): string {
  return (s || '').trim().toLowerCase();
}

function indexInForm(el: HTMLElement, targetForm: HTMLFormElement): number {
  const controls = [...targetForm.querySelectorAll('input,textarea,select')] as HTMLElement[];
  return controls.indexOf(el);
}

/** Write value to a select element */
function writeSelect(el: HTMLSelectElement, v: string | boolean): void {
  const target = String(v).toLowerCase();
  const match = [...el.options].find(
    (o) => o.value.toLowerCase() === target || o.text.toLowerCase() === target
  );
  if (match) {el.value = match.value;}
  el.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
}

/** Write value to a checkbox or radio element */
function writeCheckableInput(el: HTMLInputElement, v: string | boolean): void {
  const shouldBeChecked = el.type === 'checkbox' ? !!v : el.value === String(v);
  if (el.checked !== shouldBeChecked) {el.click();}
}

/** Set native value on text input/textarea and dispatch events */
function writeTextInput(el: HTMLInputElement | HTMLTextAreaElement, v: string | boolean): void {
  const str = String(v);
  if (el instanceof HTMLInputElement) {
    inputValueSetter ? inputValueSetter.call(el, str) : (el.value = str);
  } else {
    textareaValueSetter ? textareaValueSetter.call(el, str) : (el.value = str);
  }
  try {
    el.dispatchEvent(new InputEvent('input', {
      bubbles: true, composed: true, cancelable: false,
      inputType: 'insertText', data: str,
    }));
  } catch {
    el.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }
  el.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
}

/** Low-level write - no framework hooks, just native property + events */
function writeOnceImpl(el: AnyInput, v: string | boolean): void {
  if (el instanceof HTMLSelectElement) {return writeSelect(el, v);}
  if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio')) {
    return writeCheckableInput(el, v);
  }
  writeTextInput(el, v);
}

/** Check if an element's current value matches the desired value */
function isCommitted(el: AnyInput, desired: string | boolean): boolean {
  if (el instanceof HTMLSelectElement) {
    const d = String(desired).toLowerCase();
    return el.value.toLowerCase() === d || (el.selectedOptions[0]?.text || '').toLowerCase() === d;
  }
  return (el as HTMLInputElement | HTMLTextAreaElement).value === String(desired);
}

interface RebindCriteria { pl: string; role: string; idx: number; targetForm: HTMLFormElement }

/** Score a candidate element for rebinding by matching attributes */
function scoreCandidateForRebind(c: AnyInput, criteria: RebindCriteria): number {
  const cpl = 'placeholder' in c ? norm((c as HTMLInputElement | HTMLTextAreaElement).placeholder) : '';
  const crole = (c as HTMLElement).getAttribute('role') || '';
  const cidx = indexInForm(c as unknown as HTMLElement, criteria.targetForm);
  return (criteria.pl && cpl === criteria.pl ? 2 : 0) + (criteria.role && crole === criteria.role ? 1 : 0) + (criteria.idx === cidx ? 1 : 0);
}

/** Rebind if element was replaced - search ONLY within the given form */
function rebindWithinForm(el: AnyInput, form: HTMLFormElement): AnyInput | null {
  if (el.isConnected) {return el;}
  const tag = (el as HTMLElement).tagName.toLowerCase();
  const candidates = [...form.querySelectorAll(tag)] as AnyInput[];
  if (candidates.length === 0) {return null;}

  const criteria: RebindCriteria = {
    pl: 'placeholder' in el ? norm((el as HTMLInputElement | HTMLTextAreaElement).placeholder) : '',
    role: (el as HTMLElement).getAttribute('role') || '',
    idx: indexInForm(el as unknown as HTMLElement, form),
    targetForm: form,
  };

  const scored = candidates
    .map(c => ({ c, s: scoreCandidateForRebind(c, criteria) }))
    .sort((a, b) => b.s - a.s);
  return scored[0]?.s > 0 ? scored[0].c : null;
}

/** Generate unique DOM path for element */
function getDomPath(element: Element): string {
  const path: string[] = [];
  let current: Element | null = element;
  while (current && current !== document.body) {
    const parent: Element | null = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children);
      path.unshift(`${current.tagName}[${siblings.indexOf(current)}]`);
    }
    current = parent;
  }
  return path.join('/') || 'BODY';
}

/** Resolve a logical field name from element attributes */
function resolveFieldName(el: AnyInput, logicalName?: string): string {
  return logicalName
    || (el as HTMLElement).getAttribute('name')
    || (el as HTMLElement).getAttribute('id')
    || (el as HTMLElement).getAttribute('data-field-id')
    || (el as HTMLElement).getAttribute('placeholder')
    || getDomPath(el as Element);
}

type Pending = {
  desired: string | boolean;
  tries: number;
  cancelled: boolean;
  timer?: number;
  logicalName?: string;
};

/** Create a throttled MutationObserver that marks form mutations */
function createFormObserver(form: HTMLFormElement, tick: { scheduled: boolean }): MutationObserver {
  const observer = new MutationObserver(() => {
    if (tick.scheduled) {return;}
    tick.scheduled = true;
    queueMicrotask(() => { tick.scheduled = false; });
  });
  observer.observe(form, { childList: true, subtree: true });
  return observer;
}

/** Create a new stabilizer session bound to a form */
export function createStabilizerSession(
  form: HTMLFormElement, slotsMs: number[] = [16, 64, 160, 400, 800, 2000]
): IStabilizerSession {
  let lastActivityAt = 0;
  let pendingCount = 0;
  let observer: MutationObserver | null = null;
  const moTick = { scheduled: false };
  const pending = new WeakMap<Element, Pending>();

  const done = (el: AnyInput): void => { pending.delete(el); pendingCount--; lastActivityAt = performance.now(); };

  const schedule = (el: AnyInput, p: Pending): void => {
    if (p.cancelled) {return;}
    p.timer = window.setTimeout(() => {
      if (p.cancelled) { done(el); return; }
      const bound = rebindWithinForm(el, form);
      if (!bound || isCommitted(bound, p.desired)) { done(el); return; }
      writeOnceImpl(bound, p.desired);
      schedule(bound, p);
    }, slotsMs[Math.min(p.tries++, slotsMs.length - 1)]);
  };

  return {
    writeOnce: writeOnceImpl,
    enqueue(el: AnyInput, v: string | boolean, logicalName?: string): void {
      const existing = pending.get(el);
      if (existing) {existing.cancelled = true;}
      const p: Pending = { desired: v, tries: 0, cancelled: false, logicalName: resolveFieldName(el, logicalName) };
      pending.set(el, p); pendingCount++; lastActivityAt = performance.now();
      schedule(el, p);
    },
    hasPendingWork: () => pendingCount > 0,
    quietFor: (ms: number) => performance.now() - lastActivityAt >= ms,
    maxSlotMs: () => slotsMs[slotsMs.length - 1] || 2000,
    attach(): void { if (form.isConnected) { observer = createFormObserver(form, moTick); } },
    detach(): void { if (observer) { observer.disconnect(); observer = null; } },
    destroy(): void { this.detach(); pendingCount = 0; lastActivityAt = 0; },
  };
}
