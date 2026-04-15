import { TranslationService } from '../../services/translation-service';

export interface ErrorInfo {
  message: string;
  details?: string;
  type?: 'network' | 'validation' | 'permission' | 'no_fields' | 'general';
  code?: string;
  originalError?: unknown;
  userMessage?: string;
  suggestion?: string;
  technicalDetails?: string;
}

export interface DeviceInfo {
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private translationService: TranslationService;
  
  private constructor() {
    // TranslationService will be set later
    this.translationService = new TranslationService();
  }
  
  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }
  
  /**
   * Formats error for display to user
   */
  /** Classify an Error instance by its message */
  private classifyError(error: Error): { message: string; type: ErrorInfo['type'] } | null {
    const msg = error.message;
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
      return { message: this.translationService.t('error.network'), type: 'network' };
    }
    if (msg.includes('Permission denied') || msg.includes('NotAllowedError')) {
      return { message: this.translationService.t('error.microphone_permission'), type: 'permission' };
    }
    if (msg.includes('no_fields_detected')) {
      return { message: this.translationService.t('error.no_fields_detected'), type: 'no_fields' };
    }
    return null;
  }

  formatErrorMessage(error: unknown, type?: ErrorInfo['type']): ErrorInfo {
    if (error instanceof Error) {
      const classified = this.classifyError(error);
      if (classified) {
        return { message: classified.message, type: classified.type, originalError: error };
      }
      return {
        message: error.message || this.translationService.t('error.general'),
        type: type || 'general',
        originalError: error
      };
    }

    if (typeof error === 'string') {
      return { message: error, type: type || 'general', originalError: error };
    }

    return { message: this.translationService.t('error.general'), type: 'general', originalError: error };
  }
  
  /**
   * Gets device information for error reporting
   */
  getDeviceInfo(): DeviceInfo {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform || 'unknown',
      screenResolution: `${window.screen.width}x${window.screen.height}`
    };
  }
  
  /**
   * Formats technical error details for debugging
   */
  formatTechnicalDetails(error: ErrorInfo): string {
    const deviceInfo = this.getDeviceInfo();
    
    const errorInfo = {
      message: error.message,
      type: error.type,
      code: error.code,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    const technicalError = error.originalError instanceof Error ? {
      name: error.originalError.name,
      message: error.originalError.message,
      stack: error.originalError.stack
    } : error.originalError;
    
    return JSON.stringify({
      deviceInfo,
      errorInfo,
      originalError: technicalError
    }, null, 2);
  }
  
  /**
   * Logs error to console with context
   */
  logError(_context: string, _error: unknown): void {
    // Error logging handled by telemetry system
  }
  
  /**
   * Handles async errors with proper logging
   */
  async handleAsyncError<T>(
    operation: () => Promise<T>,
    context: string,
    fallback?: T
  ): Promise<T | undefined> {
    try {
      return await operation();
    } catch (error) {
      this.logError(context, error);
      return fallback;
    }
  }
  
  /**
   * Creates a safe error handler wrapper
   */
  createErrorHandler(context: string) {
    return (error: unknown) => {
      this.logError(context, error);
      return this.formatErrorMessage(error);
    };
  }
}