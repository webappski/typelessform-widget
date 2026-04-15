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

/** Collect fixed-position elements that look like widgets in bottom corners */
function collectFixedWidgets(target: Set<HTMLElement>): void {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (const el of document.querySelectorAll('*')) {
    if (el.tagName === 'AI-FORM-COPILOT' || el.closest('ai-form-copilot')) {continue;}
    if (!(el instanceof HTMLElement)) {continue;}
    if (isCornerWidget(el, vw, vh)) {target.add(el);}
  }
}

export function findObstructionNodes(): Set<HTMLElement> {
  const obstructions = new Set<HTMLElement>();
  collectKnownWidgets(obstructions);
  collectFixedWidgets(obstructions);
  return obstructions;
}

/** Collect all candidate obstruction elements (known selectors + fixed-position) */
function collectCandidateElements(): Set<Element> {
  const candidates = new Set<Element>();
  KNOWN_WIDGET_SELECTORS.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(el => candidates.add(el));
    } catch (_e) {
      // Ignore invalid selectors
    }
  });
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (const el of document.querySelectorAll('*')) {
    if (el.tagName === 'AI-FORM-COPILOT' || el.closest('ai-form-copilot')) {continue;}
    if (!(el instanceof HTMLElement)) {continue;}
    if (isCornerWidget(el, vw, vh)) {candidates.add(el);}
  }
  return candidates;
}

/** Calculate safe insets from a set of candidate elements */
function calculateInsets(candidates: Set<Element>): { right: number; left: number; bottom: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const GAP = 10;
  let maxRight = 0, maxLeft = 0, maxBottom = 0;

  candidates.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {return;}
    const needed = Math.max(0, vh - rect.bottom) + rect.height + GAP;
    if (rect.right >= vw - 200) { maxRight = Math.max(maxRight, rect.width); maxBottom = Math.max(maxBottom, needed); }
    if (rect.left <= 200) { maxLeft = Math.max(maxLeft, rect.width); maxBottom = Math.max(maxBottom, needed); }
  });

  // Cap bottom inset to 25% of viewport height to keep widget in the lower quarter
  const maxAllowedBottom = Math.max(0, vh * 0.25);

  return {
    right: maxRight > 0 ? maxRight + 16 : 0,
    left: maxLeft > 0 ? maxLeft + 16 : 0,
    bottom: Math.min(maxBottom, maxAllowedBottom)
  };
}

export function collectObstructions(): { right: number, left: number, bottom: number } {
  return calculateInsets(collectCandidateElements());
}