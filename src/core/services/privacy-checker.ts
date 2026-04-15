/**
 * Service for checking privacy and sensitive data in form fields
 */

import type { IPrivacyChecker } from '../interfaces/privacy-checker';
import type { FieldDescriptor } from '../../form-scanner/index.js';

export class PrivacyChecker implements IPrivacyChecker {
  private sensitivePatterns: Set<string> = new Set([
    // Authentication & Security
    'password', 'pwd', 'secret', 'token', 'key', 'auth', 'api',
    'private', 'credential', 'login', 'signin', 'pass',
    
    // Financial
    'cvv', 'cvc', 'card', 'credit', 'debit', 'bank', 'account',
    'routing', 'iban', 'swift', 'wallet', 'payment', 'billing',
    
    // Personal Identifiers  
    'ssn', 'social', 'tax', 'ein', 'passport', 'license', 'visa',
    'id', 'identification', 'identity', 'driver', 'birth', 'dob',
    
    // Personal Information
    'salary', 'income', 'medical', 'health', 'insurance', 'diagnosis',
    'medication', 'allergy', 'condition', 'treatment',
    
    // Russian specific
    'паспорт', 'инн', 'снилс', 'пароль', 'секрет', 'конфиденц',
    'личн', 'счет', 'счёт', 'карт', 'платеж', 'платёж'
  ]);
  
  private excludedFieldTypes = new Set([
    'select', 'checkbox', 'radio', 'choice', 'option', 
    'toggle', 'switch', 'dropdown', 'combobox'
  ]);
  
  // Important select fields that should not be excluded
  private importantSelectFields = new Set([
    'units', 'unit', 'period', 'interval', 'duration', 
    'time', 'frequency', 'type', 'category', 'status'
  ]);

  constructor() {}

  /**
   * Check if a field contains sensitive/private data
   */
  /** Quick checks for explicit privacy markers */
  private hasExplicitPrivacyMarker(field: FieldDescriptor): boolean {
    if (field.isPrivate) {return true;}
    if (field.type === 'password') {return true;}
    if (field.element?.hasAttribute('data-ai-private')) {return true;}
    return false;
  }

  /** Check if any field text property matches a sensitive pattern */
  private matchesSensitivePattern(field: FieldDescriptor): boolean {
    const texts = [
      (field.name || '').toLowerCase(),
      (field.label || '').toLowerCase(),
      (field.placeholder || '').toLowerCase(),
      (field.element?.id || '').toLowerCase(),
    ];
    for (const pattern of this.sensitivePatterns) {
      if (texts.some(t => t.includes(pattern))) {return true;}
    }
    return false;
  }

  isFieldSensitive(field: FieldDescriptor): boolean {
    if (this.hasExplicitPrivacyMarker(field)) {return true;}
    if (this.matchesSensitivePattern(field)) {return true;}
    if (this.hasFinancialPattern(field)) {return true;}
    if (this.hasPersonalIdentifierPattern(field)) {return true;}
    return false;
  }

  /**
   * Check multiple fields for sensitive data
   */
  checkFieldsSensitivity(fields: FieldDescriptor[]): boolean[] {
    return fields.map(field => this.isFieldSensitive(field));
  }

  /**
   * Filter out sensitive fields from array
   */
  filterSensitiveFields(fields: FieldDescriptor[]): FieldDescriptor[] {
    return fields.filter(field => !this.isFieldSensitive(field));
  }

  /**
   * Check if a field type should be excluded from processing
   */
  isExcludedFieldType(type: string, fieldName: string): boolean {
    const lowerType = type.toLowerCase();
    const lowerName = fieldName.toLowerCase();
    
    // Check if it's an important select field that should not be excluded
    for (const importantField of this.importantSelectFields) {
      if (lowerName.includes(importantField)) {
        return false; // Don't exclude important fields
      }
    }
    
    // Check against excluded types
    for (const excludedType of this.excludedFieldTypes) {
      if (lowerType.includes(excludedType)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Get list of sensitive patterns
   */
  getSensitivePatterns(): string[] {
    return Array.from(this.sensitivePatterns);
  }

  /**
   * Add custom sensitive pattern
   */
  addSensitivePattern(pattern: string): void {
    this.sensitivePatterns.add(pattern.toLowerCase());
  }

  /**
   * Remove sensitive pattern
   */
  removeSensitivePattern(pattern: string): void {
    this.sensitivePatterns.delete(pattern.toLowerCase());
  }

  /**
   * Check for financial-related patterns
   */
  private hasFinancialPattern(field: FieldDescriptor): boolean {
    const text = `${field.name} ${field.label} ${field.placeholder}`.toLowerCase();
    
    // Credit card patterns
    if (/\b(?:card|cc|credit|debit)\s*(?:number|num|no|#)\b/.test(text)) {
      return true;
    }
    
    // CVV/CVC patterns
    if (/\b(?:cvv|cvc|cvv2|cvc2|security\s*code)\b/.test(text)) {
      return true;
    }
    
    // Bank account patterns
    if (/\b(?:account|acct)\s*(?:number|num|no|#)\b/.test(text)) {
      return true;
    }
    
    return false;
  }

  /**
   * Check for personal identifier patterns
   */
  private hasPersonalIdentifierPattern(field: FieldDescriptor): boolean {
    const text = `${field.name} ${field.label} ${field.placeholder}`.toLowerCase();
    
    // SSN patterns
    if (/\b(?:ssn|social\s*security)\b/.test(text)) {
      return true;
    }
    
    // ID document patterns
    if (/\b(?:passport|license|permit)\s*(?:number|num|no|#)\b/.test(text)) {
      return true;
    }
    
    // Tax ID patterns
    if (/\b(?:tax|tin|ein|vat)\s*(?:id|number|num|no|#)\b/.test(text)) {
      return true;
    }
    
    // Russian patterns
    if (/\b(?:инн|снилс|паспорт)\b/.test(text)) {
      return true;
    }
    
    return false;
  }
}