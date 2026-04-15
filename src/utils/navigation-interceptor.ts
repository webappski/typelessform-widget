/**
 * SPA Navigation Interceptor
 *
 * Intercepts SPA navigation (React Router, Vue Router, etc.) to:
 * 1. Detect route changes (pushState/replaceState/popstate)
 * 2. Wait for DOM stabilization after React re-renders
 * 3. Re-apply saved form values to new DOM elements
 *
 * This solves the core problem: when React unmounts/remounts components,
 * our old element references become stale. We need to re-scan and re-apply.
 */

type NavigationCallback = () => void;

let isSetup = false;
let originalPushState: typeof history.pushState;
let originalReplaceState: typeof history.replaceState;
let popstateListener: (() => void) | null = null;

/**
 * Setup navigation interceptor
 * Returns cleanup function
 */
export function setupNavigationInterceptor(onNavigate: NavigationCallback): () => void {
  if (isSetup) {
    console.warn('[NavigationInterceptor] Already setup');
    return () => {};
  }

  // Save original methods
  originalPushState = history.pushState;
  originalReplaceState = history.replaceState;

  // Intercept pushState (React Router programmatic navigation)
  history.pushState = function(...args) {
    const result = originalPushState.apply(this, args);
    onNavigate();
    return result;
  };

  // Intercept replaceState (route replacement)
  history.replaceState = function(...args) {
    const result = originalReplaceState.apply(this, args);
    onNavigate();
    return result;
  };

  // Listen to popstate (browser back/forward buttons)
  popstateListener = () => {
    onNavigate();
  };
  window.addEventListener('popstate', popstateListener);

  isSetup = true;

  // Return cleanup function
  return () => {
    if (originalPushState) {history.pushState = originalPushState;}
    if (originalReplaceState) {history.replaceState = originalReplaceState;}
    if (popstateListener) {
      window.removeEventListener('popstate', popstateListener);
    }
    isSetup = false;
  };
}
