/**
 * DOM utility functions
 */

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

export function injectGlobalStyles(styles: string, elementId: string = 'ai-copilot-form-styles'): void {
  if (document.getElementById(elementId)) {
    return;
  }

  const style = document.createElement('style');
  style.id = elementId;
  style.textContent = styles;
  
  document.head.appendChild(style);
}