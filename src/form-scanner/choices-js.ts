/**
 * Selects enhanced by Choices.js (WPForms "Modern" dropdowns and many themes).
 *
 * Choices.js takes the options OUT of the native <select> — only the chosen one
 * stays — and draws its own list. Read from the native element the field had
 * options [''] and nothing could be chosen; set on the native element, the value
 * would not show in the list the visitor sees. Both sides go through Choices'
 * own DOM instead: the options are its `[data-choice]` items, and a choice is
 * made the way a visitor makes it — a mousedown on the item, which Choices
 * handles by selecting it, writing it into the native <select> and firing
 * `change` (Choices.js 10, _onMouseDown → _handleChoiceAction).
 */

interface ChoiceOption { value: string; label: string }

/** The Choices.js container of a native select it has enhanced, or null. */
function choicesContainer(select: HTMLSelectElement): HTMLElement | null {
  if (!select.classList.contains('choices__input')) { return null; }
  return select.closest<HTMLElement>('.choices');
}

function choiceItems(box: HTMLElement): HTMLElement[] {
  return Array.from(box.querySelectorAll<HTMLElement>('.choices__list--dropdown [data-choice][data-value]'))
    .filter(item => item.dataset.value !== '');
}

/** The options of a Choices.js select as the visitor sees them; null for any other select. */
export function choicesJsOptions(select: HTMLSelectElement): ChoiceOption[] | null {
  const box = choicesContainer(select);
  if (!box) { return null; }
  const options = choiceItems(box).map(item => ({
    value: item.dataset.value as string,
    label: item.textContent?.trim() || (item.dataset.value as string),
  }));
  return options.length > 0 ? options : null;
}

/** The item of a Choices.js select's list that `value` names (an option value or its text, any case); null for any other select. */
function choicesJsItem(select: HTMLSelectElement, value: string): HTMLElement | null {
  const box = choicesContainer(select);
  if (!box) { return null; }
  const wanted = value.trim().toLowerCase();
  return choiceItems(box).find(i =>
    (i.dataset.value as string).toLowerCase() === wanted || (i.textContent ?? '').trim().toLowerCase() === wanted) ?? null;
}

/** The value of the option `value` names in a Choices.js select; null when it names none or the select is not one. */
export function choicesJsOptionValue(select: HTMLSelectElement, value: string): string | null {
  return choicesJsItem(select, value)?.dataset.value ?? null;
}

/**
 * Choose `value` (an option value or its text, any case) in a Choices.js select.
 * @returns true when the select is a Choices.js one and now holds that option;
 *          false for any other select, so the caller sets it the native way.
 */
export function chooseChoicesJsOption(select: HTMLSelectElement, value: string): boolean {
  const item = choicesJsItem(select, value);
  if (!item) { return false; }
  if (select.value !== item.dataset.value) {
    item.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
  }
  return select.value === item.dataset.value;
}
