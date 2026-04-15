/**
 * Interface for form language detection service
 */

import type { FieldDescriptor } from '../../form-scanner/index.js';

export interface IFormLanguageDetector {
  /**
   * Detect language of a form based on its fields
   */
  detectFormLanguage(fields: FieldDescriptor[]): Promise<string>;
  
  /**
   * Check if a value is non-linguistic (numbers, dates, emails, etc.)
   */
  isNonLinguisticValue(originalText: string, translatedValue: string): boolean;
  
  /**
   * Generate unique hash for a set of fields
   */
  generateFieldsHash(fields: FieldDescriptor[]): string;
  
  /**
   * Get cached language for a fields hash
   */
  getCachedLanguage(fieldsHash: string): string | undefined;
  
  /**
   * Cache detected language for a fields hash
   */
  cacheLanguage(fieldsHash: string, language: string): void;
  
  /**
   * Clear language detection cache
   */
  clearCache(): void;
  
  /**
   * Get browser's default language
   */
  getBrowserLanguage(): string;
}