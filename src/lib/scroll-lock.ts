/**
 * iOS-safe scroll lock utility
 * Prevents scroll jump when opening modals on mobile devices
 */

let savedScrollPosition = 0;
let isLocked = false;

/**
 * Lock body scroll and save current position
 * Uses fixed positioning technique that works on iOS
 */
export function lockBodyScroll(): void {
  if (isLocked) {return;}
  
  // Save current scroll position before locking
  savedScrollPosition = window.scrollY || window.pageYOffset || 0;

  // Apply iOS-safe scroll lock
  // Important: must set ALL these properties for iOS compatibility
  document.body.style.position = 'fixed';
  document.body.style.top = `-${savedScrollPosition}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  
  // Prevent iOS rubber-band scrolling
  document.body.style.overscrollBehavior = 'none';
  
  // Add data attribute for debugging
  document.body.setAttribute('data-scroll-locked', 'true');
  document.body.setAttribute('data-scroll-position', String(savedScrollPosition));
  
  isLocked = true;
}

/**
 * Unlock body scroll and restore previous position
 */
export function unlockBodyScroll(): void {
  if (!isLocked) {return;}
  
  // Remove all lock styles
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overscrollBehavior = '';
  
  // Remove debug attributes
  document.body.removeAttribute('data-scroll-locked');
  document.body.removeAttribute('data-scroll-position');
  
  // Restore scroll position
  // Use requestAnimationFrame to ensure DOM updates before scrolling
  requestAnimationFrame(() => {
    window.scrollTo({
      top: savedScrollPosition,
      left: 0,
      behavior: 'instant' // Use instant to prevent visible scrolling
    });

    // Double-check position after a small delay (for iOS)
    setTimeout(() => {
      const currentPos = window.scrollY || window.pageYOffset;
      if (Math.abs(currentPos - savedScrollPosition) > 2) {
        window.scrollTo(0, savedScrollPosition);
      }
    }, 100);
  });
  
  isLocked = false;
}

/**
 * Get current lock state
 */
export function isScrollLocked(): boolean {
  return isLocked;
}

/**
 * Get saved scroll position
 */
export function getSavedScrollPosition(): number {
  return savedScrollPosition;
}