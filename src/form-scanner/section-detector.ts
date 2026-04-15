const HEADING_SELECTOR = 'h1,h2,h3,h4,h5,h6,legend';

/**
 * Detect the nearest section heading for a field element.
 * Walks up the DOM checking previous siblings for h1-h6/legend elements.
 * Instance method wrapper that delegates to the static version.
 */
export function detectSectionHeading(element: HTMLElement, boundary: HTMLElement | null): string | null {
  return detectSectionHeadingFromBoundary(element, boundary);
}

/** Extract valid heading text (non-empty, under 80 chars). */
function getHeadingText(el: Element): string | null {
  const text = el.textContent?.trim();
  return (text && text.length < 80) ? text : null;
}

/** Search previous siblings at a given level for a heading. */
function findHeadingInSiblings(current: HTMLElement): string | null {
  let sibling = current.previousElementSibling;
  while (sibling) {
    if (sibling.matches(HEADING_SELECTOR)) {
      const text = getHeadingText(sibling);
      if (text) { return text; }
    }
    // Only use nested heading if sibling contains exactly one —
    // multiple headings means it's a list/grid of cards, not a section header
    const nestedHeadings = sibling.querySelectorAll(HEADING_SELECTOR);
    if (nestedHeadings.length === 1) {
      const text = getHeadingText(nestedHeadings[0]);
      if (text) { return text; }
    }
    sibling = sibling.previousElementSibling;
  }
  return null;
}

/** Check if parent is a fieldset with legend. */
function getFieldsetLegendText(current: HTMLElement): string | null {
  if (current.parentElement?.tagName !== 'FIELDSET') { return null; }
  const legend = current.parentElement.querySelector('legend');
  return legend?.textContent?.trim() || null;
}

/**
 * Static version of section heading detection.
 * Walks up from element to boundary, checking previous siblings for headings.
 */
export function detectSectionHeadingFromBoundary(
  element: HTMLElement,
  boundary: HTMLElement | null
): string | null {
  const maxDepth = 8;
  let depth = 0;
  let current: HTMLElement | null = element;

  while (current && current !== boundary && depth < maxDepth) {
    const siblingHeading = findHeadingInSiblings(current);
    if (siblingHeading) { return siblingHeading; }
    const legendText = getFieldsetLegendText(current);
    if (legendText) { return legendText; }
    current = current.parentElement;
    depth++;
  }
  return null;
}
