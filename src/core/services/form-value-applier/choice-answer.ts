/**
 * How an answer names the options of a radio group, a checkbox group or a select — one
 * reading for the applier that writes them and for the value checks that compare them
 * after a fill (choiceHolds), so the two never disagree about what the answer asks.
 */

import type { MultiFormatValue } from '../../../llm-client.js';
import { choicesJsOptionValue } from '../../../form-scanner/choices-js.js';

/** Union of all value types that the LLM can produce for a single field */
type FieldValue = string | number | boolean | string[] | MultiFormatValue | undefined;

/** How an answer is compared with an option: trimmed, in any letter case — as selects compare. */
function sameText(text: string | null | undefined, answer: string): boolean {
  return (text ?? '').trim().toLowerCase() === answer.trim().toLowerCase();
}

/** The option an answer names: by its value first, then by the text of its label. */
export function findOption(inputs: HTMLInputElement[], answer: string): HTMLInputElement | undefined {
  if (!answer.trim()) {return undefined;}
  return inputs.find(i => sameText(i.value, answer)) ??
    inputs.find(i => Array.from(i.labels ?? []).some(label => sameText(label.textContent, answer)));
}

/**
 * The boxes of a checkbox group an answer names, or null when it names none — the group
 * is then left as the visitor set it. A list names one option per item; a text names one
 * option or, when no option is called that, several separated by commas or semicolons
 * (whole first: an option may hold a comma itself, "1,000-5,000 EUR").
 */
export function chosenBoxes(boxes: HTMLInputElement[], value: FieldValue): Set<HTMLInputElement> | null {
  let items: string[];
  if (Array.isArray(value)) {items = value.map(String);}
  else if (typeof value === 'string') {items = findOption(boxes, value) ? [value] : value.split(/[,;]/);}
  else {return null;}
  const chosen = new Set(items.map(item => findOption(boxes, item)).filter((box): box is HTMLInputElement => !!box));
  return chosen.size > 0 ? chosen : null;
}

/** What an answer says about one checkbox: yes or no, or "tick it" when it names the box; null when it says nothing about it. */
export function checkboxAnswer(input: HTMLInputElement, value: FieldValue): boolean | null {
  if (typeof value === 'boolean') {return value;}
  if (typeof value === 'string') {return findOption([input], value) ? true : null;}
  if (Array.isArray(value)) {return value.some(v => findOption([input], String(v))) ? true : null;}
  return null;
}

/** The value of the option an answer names in a select — in its Choices.js list, else among its own options; null when it names none. */
export function selectOptionValue(select: HTMLSelectElement, answer: string): string | null {
  const choices = choicesJsOptionValue(select, answer);
  if (choices !== null) {return choices;}
  const nv = answer.toLowerCase();
  const option = Array.from(select.options).find(o => o.value.toLowerCase() === nv || o.text.toLowerCase() === nv);
  return option ? option.value : null;
}

/** Whether the radios and boxes of one field show what the answer asks — compared as the applier writes them. */
function radiosHold(radios: HTMLInputElement[], value: FieldValue): boolean {
  if (radios.length === 0 || (typeof value !== 'string' && typeof value !== 'number')) {return true;}
  const option = findOption(radios, String(value));
  return !option || option.checked;
}

function boxesHold(boxes: HTMLInputElement[], value: FieldValue): boolean {
  if (boxes.length === 1) {
    const wanted = checkboxAnswer(boxes[0], value);
    return wanted === null || boxes[0].checked === wanted;
  }
  const chosen = boxes.length > 1 ? chosenBoxes(boxes, value) : null;
  return !chosen || boxes.every(box => box.checked === chosen.has(box));
}

function choicesHold(inputs: HTMLInputElement[], value: FieldValue): boolean {
  return radiosHold(inputs.filter(input => input.type === 'radio'), value) &&
    boxesHold(inputs.filter(input => input.type === 'checkbox'), value);
}

/**
 * Whether a radio, a checkbox or a select already shows what an answer asks of it, read the
 * way the applier writes it: a group by the set of options ticked (value, then label, in any
 * letter case), a select by the option chosen. An answer that names no option asks nothing
 * and holds. Null for any other field. The value checks after a fill read radios and boxes
 * through this; they compared "true"/"false" with the answer, found every group changed and
 * wrote it again on every scroll.
 */
export function choiceHolds(element: Element, value: FieldValue): boolean | null {
  if (element instanceof HTMLSelectElement) {
    if (typeof value !== 'string' && typeof value !== 'number') {return null;}
    const target = selectOptionValue(element, String(value));
    return target === null || element.value === target;
  }
  if (!(element instanceof HTMLInputElement) || (element.type !== 'checkbox' && element.type !== 'radio')) {return null;}
  const root: ParentNode = element.form ?? element.ownerDocument;
  const group = element.name
    ? Array.from(root.querySelectorAll<HTMLInputElement>(`input[name="${CSS.escape(element.name)}"]`))
      .filter(input => input.type === 'checkbox' || input.type === 'radio')
    : [element];
  return choicesHold(group, value);
}
