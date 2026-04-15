// Error handling - extracted 1:1 from typeless-form.ts
// No behavior changes, exact extraction

import type { TypelessFormHost } from '../types/widget-host.js';

export function createDetailedErrorImpl(component: TypelessFormHost, userMessage: string, technicalError: unknown, context: string): void {
  const deviceInfo = {
    version: (component.constructor as unknown as { WIDGET_VERSION?: string }).WIDGET_VERSION,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    context: context
  };

  const err = technicalError as Record<string, unknown> | null | undefined;
  const errorInfo = {
    message: (err?.message as string) || 'Unknown error',
    stack: (err?.stack as string) || 'No stack trace',
    name: (err?.name as string) || 'Error',
    toString: (typeof err?.toString === 'function' ? err.toString() : 'No string representation') as string
  };

  component.errorMessage = userMessage;
  component.errorDetails = JSON.stringify({ deviceInfo, errorInfo, originalError: technicalError }, null, 2);
}