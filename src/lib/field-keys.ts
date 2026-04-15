/**
 * Check if element is visible to user (not hidden by CSS, aria-hidden, or collapsed)
 */
function isVisible(el: Element): boolean {
  const html = el as HTMLElement;
  if (!html) {return false;}
  if (html.hasAttribute('hidden') || html.getAttribute('aria-hidden') === 'true') {return false;}
  const css = window.getComputedStyle(html);
  if (css.display === 'none' || css.visibility === 'hidden') {return false;}
  if (html.getClientRects().length === 0) {return false;}
  return true;
}

/**
 * Pick best heading in container, prioritizing h1/h2/h3 over h4/h5/h6
 */
function pickHeadingInContainer(root: Element): HTMLElement | null {
  // Prefer higher levels (h1 > h2 > h3); take first visible by priority
  // Skip heading levels that appear multiple times (card lists/grids)
  const prefer = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  for (const tag of prefer) {
    const matches = root.querySelectorAll(tag);
    if (matches.length === 1 && isVisible(matches[0])) {return matches[0] as HTMLElement;}
  }
  return null;
}

/**
 * Extract and normalize text from element
 */
function getText(el: Element | null): string {
  return el?.textContent?.trim() || '';
}

/** Try to find title from ARIA attributes */
function getTitleFromAria(form: HTMLFormElement): string | null {
  const ariaLabelledBy = form.getAttribute('aria-labelledby');
  if (ariaLabelledBy) {
    const text = getText(document.getElementById(ariaLabelledBy));
    if (text) {return text;}
  }
  const ariaLabel = form.getAttribute('aria-label')?.trim();
  if (ariaLabel) {return ariaLabel;}
  return null;
}

/** Get heading level (1-6) from tag name, or 7 if not a heading */
function headingLevel(el: Element): number {
  const m = el.tagName.match(/^H([1-6])$/i);
  return m ? Number(m[1]) : 7;
}

/** Try to find title from previous sibling headings — prefers higher heading level */
function tryBetterHeading(el: Element, best: { text: string | null; level: number }): void {
  const level = headingLevel(el);
  const text = getText(el);
  if (text && level < best.level) { best.text = text; best.level = level; }
}

function getTitleFromPreviousSiblings(form: HTMLFormElement): string | null {
  const best = { text: null as string | null, level: 7 };
  let sib: Element | null = form.previousElementSibling;
  let hops = 0;
  while (sib && hops < 6) {
    if (sib.matches('h1,h2,h3,h4,h5,h6') && isVisible(sib)) { tryBetterHeading(sib, best); }
    const inner = pickHeadingInContainer(sib);
    if (inner) { tryBetterHeading(inner, best); }
    sib = sib.previousElementSibling;
    hops++;
  }
  return best.text;
}

/** Try to find a heading inside the form before the first visible control */
function getTitleFromInternalHeading(form: HTMLFormElement): string | null {
  const allControls = form.querySelectorAll('input, select, textarea, button[type="submit"]');
  const firstControl = Array.from(allControls).find(isVisible);
  if (!firstControl) { return null; }
  const headings = Array.from(form.querySelectorAll('h1, h2, h3, h4, h5, h6')).filter(isVisible);
  const before = headings.filter(h =>
    (h.compareDocumentPosition(firstControl) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
  );
  if (before.length === 0) { return null; }
  const levelCounts = new Map<string, number>();
  for (const h of before) { levelCounts.set(h.tagName, (levelCounts.get(h.tagName) || 0) + 1); }
  const filtered = before.filter(h => (levelCounts.get(h.tagName) || 0) <= 2);
  if (filtered.length > 0) { return getText(filtered[filtered.length - 1]) || null; }
  return null;
}

export function getFormTitle(form: HTMLFormElement, defaultTitle: string): string {
  // 1. ARIA
  const aria = getTitleFromAria(form);
  if (aria) {return aria;}

  // 2. Legend
  const legendText = getText(form.querySelector(':scope > fieldset:first-of-type > legend'));
  if (legendText) {return legendText;}

  // 3. Previous siblings
  const sibling = getTitleFromPreviousSiblings(form);
  if (sibling) {return sibling;}

  // 4. Internal heading before first control
  const internal = getTitleFromInternalHeading(form);
  if (internal) {return internal;}

  // 5. Parent heading
  const parent = form.parentElement;
  if (parent && parent !== document.body) {
    const text = getText(parent.querySelector(':scope > h1, :scope > h2, :scope > h3'));
    if (text) {return text;}
  }

  // 6. Form title attribute, then default
  return form.title || defaultTitle || '';
}

export function normalizeFieldKey(field: Record<string, unknown>): string {
  const raw = (
    field.id ||
    field.name ||
    field.fieldKey ||
    field.nameInForm ||
    ''
  );
  return String(raw).toLowerCase().trim();
}