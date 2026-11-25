// Re-export from form-utils to maintain backward compatibility
export { getFormFillRatio } from '../utils/form-utils';

export function getElementVisibilityRatio(element: Element): number {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  if (rect.width === 0 || rect.height === 0) {
    return 0;
  }
  
  const isVerticallyVisible = rect.top < windowHeight && rect.bottom > 0;
  const isHorizontallyVisible = rect.left < windowWidth && rect.right > 0;
  
  if (!isVerticallyVisible || !isHorizontallyVisible) {
    return 0;
  }
  
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
  const elementHeight = rect.bottom - rect.top;
  const elementWidth = rect.right - rect.left;
  
  const heightRatio = Math.max(0, visibleHeight) / elementHeight;
  const widthRatio = Math.max(0, visibleWidth) / elementWidth;
  
  return heightRatio * widthRatio;
}

// Re-export from form-utils to maintain backward compatibility
export { isFormFilled } from '../utils/form-utils';


// Known third-party widget selectors
const KNOWN_WIDGET_SELECTORS = [
  '.intercom-lightweight-app', '#freshchat-container', '#crisp-chatbox',
  '#tawkchat-container', '.grecaptcha-badge', '[id*="livechat"]',
  '[class*="livechat"]', '[class*="zendesk"]', '[class*="drift"]'
];

/** Collect elements matching known third-party widget selectors */
function collectKnownWidgets(target: Set<HTMLElement>): void {
  KNOWN_WIDGET_SELECTORS.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(el => {
        if (el instanceof HTMLElement) {target.add(el);}
      });
    } catch (_e) {
      // Ignore invalid selectors
    }
  });
}

/** Check if a fixed-position element looks like a bottom-corner widget */
function isCornerWidget(el: HTMLElement, vw: number, vh: number): boolean {
  const style = window.getComputedStyle(el);
  if (style.position !== 'fixed') {return false;}
  const rect = el.getBoundingClientRect();

  // Use proportional boundaries (max 200px) so detection scales with viewport.
  // Fixed 200px on a 650px viewport covers 31% of the screen → too many false positives.
  const bottomBoundary = Math.min(200, vh * 0.15);
  const sideBoundary = Math.min(200, vw * 0.15);

  const isBottom = rect.bottom >= vh - bottomBoundary;
  const isSide = rect.right >= vw - sideBoundary || rect.left <= sideBoundary;
  const isReasonableSize = rect.width >= 40 && rect.height >= 40 && rect.width <= 400 && rect.height <= 400;
  return isBottom && isSide && isReasonableSize;
}

/**
 * Check if a fixed-position element is a bar or a wide box at the bottom of the page:
 * a cookie banner, a "Book now" strip, a bottom navigation. `isCornerWidget` takes only
 * 40-400 px, so a full-width bar was invisible and the floating button lay on its buttons.
 * A backdrop over the window (taller than half of it), a bar that is hidden, transparent or
 * outside the window, and a wide toast that touches no corner are not bars.
 */
function isBottomBar(el: HTMLElement, vw: number, vh: number): boolean {
  const style = window.getComputedStyle(el);
  if (style.position !== 'fixed') {return false;}
  if (style.visibility === 'hidden' || parseFloat(style.opacity) === 0) {return false;}
  const rect = el.getBoundingClientRect();
  if (rect.top >= vh) {return false;}

  const bottomBoundary = Math.min(200, vh * 0.15);
  const isBottom = rect.bottom >= vh - bottomBoundary;
  const isWide = rect.width > 400 || rect.width >= vw * 0.5;
  const isReasonableHeight = rect.height >= 40 && rect.height <= vh * 0.5;
  const touchesCorner = rect.right >= vw - 200 || rect.left <= 200;
  return isBottom && isWide && isReasonableHeight && touchesCorner;
}

/** Collect fixed-position elements that look like widgets in bottom corners */
function collectFixedWidgets(target: Set<HTMLElement>): void {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (const el of document.querySelectorAll('*')) {
    if (el.tagName === 'AI-FORM-COPILOT' || el.closest('ai-form-copilot')) {continue;}
    if (!(el instanceof HTMLElement)) {continue;}
    if (isCornerWidget(el, vw, vh) || isBottomBar(el, vw, vh)) {target.add(el);}
  }
}

export function findObstructionNodes(): Set<HTMLElement> {
  const obstructions = new Set<HTMLElement>();
  collectKnownWidgets(obstructions);
  collectFixedWidgets(obstructions);
  return obstructions;
}

/**
 * Calculate safe insets from a set of obstruction elements.
 * A corner widget raises the button by its own height, capped at a quarter of the window (the button
 * stays in the lower quarter). A bar is not capped: the button has to clear its top edge or it lies on the
 * bar's buttons; the clamp in `findSafePosition` keeps the button inside the window.
 */
export function calculateInsets(candidates: Set<Element>): { right: number; left: number; bottom: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const GAP = 10;
  let maxRight = 0, maxLeft = 0, maxCornerBottom = 0, maxBarBottom = 0;

  candidates.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {return;}
    const touchesRight = rect.right >= vw - 200;
    const touchesLeft = rect.left <= 200;

    // `isBottomBar` already requires a corner, so a bar always lifts the button.
    if (el instanceof HTMLElement && isBottomBar(el, vw, vh)) {
      maxBarBottom = Math.max(maxBarBottom, vh - rect.top + GAP);
      return;
    }

    const needed = Math.max(0, vh - rect.bottom) + rect.height + GAP;
    if (touchesRight) { maxRight = Math.max(maxRight, rect.width); maxCornerBottom = Math.max(maxCornerBottom, needed); }
    if (touchesLeft) { maxLeft = Math.max(maxLeft, rect.width); maxCornerBottom = Math.max(maxCornerBottom, needed); }
  });

  // Cap the corner inset to 25% of viewport height to keep widget in the lower quarter
  const maxAllowedBottom = Math.max(0, vh * 0.25);

  return {
    right: maxRight > 0 ? maxRight + 16 : 0,
    left: maxLeft > 0 ? maxLeft + 16 : 0,
    bottom: Math.max(Math.min(maxCornerBottom, maxAllowedBottom), maxBarBottom)
  };
}

/** One set of obstacles for every reader: the load, the mutation observer, the resize observer, the poll. */
export function collectObstructions(): { right: number, left: number, bottom: number } {
  return calculateInsets(findObstructionNodes());
}
