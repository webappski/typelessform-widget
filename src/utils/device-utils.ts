/**
 * Device utility functions
 */

export interface DeviceInfo {
  version: string;
  userAgent: string;
  platform: string;
  language: string;
  cookieEnabled: boolean;
  onLine: boolean;
  timestamp: string;
  url: string;
  context: string;
}

export interface ErrorInfo {
  message: string;
  stack: string;
  name: string;
  toString: string;
}

export function getDeviceInfo(context: string, version?: string): DeviceInfo {
  return {
    version: version || 'unknown',
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    context: context
  };
}

export function createErrorInfo(technicalError: unknown): ErrorInfo {
  const err = technicalError as Record<string, unknown> | null | undefined;
  return {
    message: (err?.message as string) || 'Unknown error',
    stack: (err?.stack as string) || 'No stack trace',
    name: (err?.name as string) || 'Error',
    toString: (typeof err?.toString === 'function' ? err.toString() : 'No string representation') as string
  };
}