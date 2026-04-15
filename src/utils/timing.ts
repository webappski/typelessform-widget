// Timing utilities - extracted 1:1 from typeless-form.ts
// No behavior changes, exact extraction

export function throttleImpl(func: (...args: unknown[]) => void, limit: number): (...args: unknown[]) => void {
  let inThrottle: boolean;
  return function(this: unknown, ...args: unknown[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}