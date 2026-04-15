/**
 * Interface for privacy and sensitive data checking
 */

import type { FieldDescriptor } from '../../form-scanner/index.js';

export interface IPrivacyChecker {
  /**
   * Check if a field contains sensitive/private data
   */
  isFieldSensitive(field: FieldDescriptor): boolean;
  
  /**
   * Check multiple fields for sensitive data
   */
  checkFieldsSensitivity(fields: FieldDescriptor[]): boolean[];
  
  /**
   * Filter out sensitive fields from array
   */
  filterSensitiveFields(fields: FieldDescriptor[]): FieldDescriptor[];
  
  /**
   * Check if a field type should be excluded from processing
   */
  isExcludedFieldType(type: string, fieldName: string): boolean;
  
  /**
   * Get list of sensitive patterns
   */
  getSensitivePatterns(): string[];
  
  /**
   * Add custom sensitive pattern
   */
  addSensitivePattern(pattern: string): void;
  
  /**
   * Remove sensitive pattern
   */
  removeSensitivePattern(pattern: string): void;
}