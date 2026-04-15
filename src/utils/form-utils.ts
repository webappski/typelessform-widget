/**
 * Form utility functions
 */

// Regex to detect placeholder options in select elements
const SELECT_PLACEHOLDER_RE =
  /^(choose|select|--? ?select|please select|выберите|seleccione|elija|elige|choisir|sélectionner|seleziona|bitte wählen|wähle|wybierz|selecione|selecionar|请选择|請選擇|選んでください)\b/i;

/**
 * Universal detector for select-like components (native and custom)
 * Detects:
 * - Native <select> elements
 * - Custom combobox components (ng-zorro, Ant Design, etc.)
 * - Elements with role="combobox", role="listbox"
 * - Elements with aria-autocomplete="list", aria-haspopup="listbox"
 */
/** Check ARIA attributes for select-like roles */
function hasSelectAriaRole(el: Element): boolean {
  const role = (el.getAttribute('role') || '').toLowerCase();
  if (role === 'combobox' || role === 'listbox') {return true;}
  if ((el.getAttribute('aria-autocomplete') || '').toLowerCase() === 'list') {return true;}
  if ((el.getAttribute('aria-haspopup') || '').toLowerCase() === 'listbox') {return true;}
  return false;
}

/** Check if element matches custom select patterns (ng-zorro, Ant Design) */
function isCustomSelectPattern(el: Element): boolean {
  const tag = el.tagName?.toUpperCase() || '';
  const input = el as HTMLInputElement;
  const type = (input.type || '').toLowerCase();
  const cls = (typeof input.className === 'string' ? input.className : '');

  if ((tag === 'INPUT' && type === 'search') || cls.includes('ant-select-selection-search-input')) {
    return true;
  }
  return !!el.closest('nz-select, .ant-select, [role="listbox"]');
}

export function isSelectLikeElement(el: Element | null): boolean {
  if (!el) {return false;}
  if (el.tagName?.toUpperCase() === 'SELECT') {return true;}
  if (hasSelectAriaRole(el)) {return true;}
  return isCustomSelectPattern(el);
}

/**
 * Universal flag for explicit exclusion via markup
 * Elements with data-aifc-ignore or inside containers with this attribute will be ignored
 */
export function hasAifcIgnore(el: Element | null): boolean {
  return !!el && (el.hasAttribute('data-aifc-ignore') || !!el.closest('[data-aifc-ignore]'));
}

/**
 * Analyzes form fill status
 */
const NON_ELIGIBLE_TYPES = new Set(['hidden', 'submit', 'button', 'reset', 'image']);

/** Check if input element is eligible for fill analysis */
function isEligibleInput(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): boolean {
  if (hasAifcIgnore(el)) {return false;}
  const type = (el as HTMLInputElement).type?.toLowerCase?.() || el.tagName.toLowerCase();
  if (NON_ELIGIBLE_TYPES.has(type)) {return false;}
  if (el.disabled || ('readOnly' in el && (el as unknown as HTMLInputElement).readOnly)) {return false;}
  return true;
}

/** Analyze a radio group: returns {eligible, filled} delta */
function analyzeRadio(el: HTMLInputElement, form: HTMLFormElement, handled: Set<string>): { e: number; f: number } {
  const name = el.name || '';
  if (!name || handled.has(name)) {return { e: 0, f: 0 };}
  handled.add(name);
  const checked = !!form.querySelector(`input[type="radio"][name="${CSS.escape(name)}"]:checked`);
  return { e: 1, f: checked ? 1 : 0 };
}

/** Check if a select element has a meaningful (non-placeholder) value */
function isSelectFilled(sel: HTMLSelectElement): boolean {
  if (sel.multiple) {return sel.selectedOptions.length > 0;}
  const opt = sel.selectedOptions[0];
  if (!opt) {return false;}
  const val = opt.value?.trim() || '';
  return !!val && !opt.disabled && !SELECT_PLACEHOLDER_RE.test(opt.text?.trim() || '');
}

/** Check if a text-like input has a meaningful value */
function isTextInputFilled(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): boolean {
  const val = (el.value || '').trim();
  return !!val && val !== (el.getAttribute('placeholder') || '').trim();
}

/** Resolve element input type */
function resolveInputType(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): string {
  return (el as HTMLInputElement).type?.toLowerCase?.() || el.tagName.toLowerCase();
}

type FillDelta = { e: number; f: number };
const SKIP: FillDelta = { e: 0, f: 0 };

/** Classify a single element by type */
function classifyByType(type: string, el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, form: HTMLFormElement, radiosHandled: Set<string>): FillDelta {
  if (type === 'radio') {return analyzeRadio(el as HTMLInputElement, form, radiosHandled);}
  if (type === 'checkbox') {return { e: 1, f: (el as HTMLInputElement).checked ? 1 : 0 };}
  if (el.tagName === 'SELECT') {return { e: 1, f: isSelectFilled(el as HTMLSelectElement) ? 1 : 0 };}
  return { e: 1, f: isTextInputFilled(el) ? 1 : 0 };
}

/** Classify a single element: returns {e: eligible count, f: filled count} */
function classifyElement(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, form: HTMLFormElement, radiosHandled: Set<string>): FillDelta {
  if (!isEligibleInput(el)) {return SKIP;}
  return classifyByType(resolveInputType(el), el, form, radiosHandled);
}

export function analyzeFormFill(form: HTMLFormElement) {
  const radiosHandled = new Set<string>();
  const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select');
  let eligible = 0;
  let filled = 0;
  inputs.forEach(el => {
    const r = classifyElement(el, form, radiosHandled);
    eligible += r.e;
    filled += r.f;
  });
  return { eligible, filled, ratio: eligible ? filled / eligible : 0 };
}

export function getTotalFormsCount(): number {
  const forms = document.querySelectorAll('form');
  return forms.length;
}

export function getFormIndex(targetForm: HTMLFormElement): number {
  const allForms = Array.from(document.querySelectorAll('form'));
  return allForms.indexOf(targetForm) + 1;
}

export function getFormFillRatio(form: HTMLFormElement): number {
  return analyzeFormFill(form).ratio;
}

export function isFormFilled(form: HTMLFormElement): boolean {
  const { ratio } = analyzeFormFill(form);
  return ratio > 0.5;
}

export function getFormsStatistics() {
  const allForms = Array.from(document.querySelectorAll('form')) as HTMLFormElement[];
  let filledCount = 0;
  let partiallyFilledCount = 0;
  let emptyCount = 0;

  for (const form of allForms) {
    const fillRatio = getFormFillRatio(form);
    if (fillRatio >= 0.8) {
      filledCount++;
    } else if (fillRatio > 0) {
      partiallyFilledCount++;
    } else {
      emptyCount++;
    }
  }

  return {
    total: allForms.length,
    filled: filledCount,
    partiallyFilled: partiallyFilledCount,
    empty: emptyCount
  };
}

export function findBestCandidateForm(allForms: HTMLFormElement[]): HTMLFormElement | null {
  // Приоритет: незаполненные формы
  const emptyForms = allForms.filter(form => getFormFillRatio(form) === 0);
  if (emptyForms.length > 0) {return emptyForms[0];}
  
  // Затем: частично заполненные формы  
  const partialForms = allForms.filter(form => {
    const ratio = getFormFillRatio(form);
    return ratio > 0 && ratio < 0.8;
  });
  if (partialForms.length > 0) {return partialForms[0];}
  
  // Последний вариант: первая форма
  return allForms[0] || null;
}