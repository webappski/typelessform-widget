/**
 * Service for detecting form language
 */

import type { IFormLanguageDetector } from '../interfaces/form-language-detector';
import type { FieldDescriptor } from '../../form-scanner/index.js';
import { TranslationService } from '../../services/translation-service';
import { CONFIG } from '../../constants/config';
import { ErrorHandler } from './error-handler';
import { CacheManager, CACHE_NAMESPACES } from './cache-manager';

const PURE_NUMBER_RE = /^\d+([.,]\d+)?$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_RE = /^[A-Za-z0-9\-_]+$/;

function isMatchingNumber(orig: string, translated: string): boolean {
  if (!PURE_NUMBER_RE.test(orig.trim()) || !PURE_NUMBER_RE.test(translated.trim())) {return false;}
  return orig.replace(/[^\d]/g, '') === translated.replace(/[^\d]/g, '');
}

function isDateFormat(val: string): boolean {
  return DATE_RE.test(val);
}

function isMatchingEmail(orig: string, translated: string): boolean {
  if (!EMAIL_RE.test(translated) || !EMAIL_RE.test(orig)) {return false;}
  return orig.split('@')[1] === translated.split('@')[1];
}

function isMatchingPhone(orig: string, translated: string): boolean {
  const origDigits = orig.replace(/[^\d]/g, '');
  const transDigits = translated.replace(/[^\d]/g, '');
  return !!origDigits && origDigits === transDigits && origDigits.length >= 7;
}

function isMatchingCode(orig: string, translated: string): boolean {
  return CODE_RE.test(orig) && CODE_RE.test(translated) && orig === translated;
}

export class FormLanguageDetector implements IFormLanguageDetector {
  private translationService: TranslationService;
  private errorHandler = ErrorHandler.getInstance();
  private cacheManager = CacheManager.getInstance();
  
  constructor(translationService: TranslationService) {
    this.translationService = translationService;
  }

  /**
   * Detect language of a form based on its fields
   */
  async detectFormLanguage(fields: FieldDescriptor[]): Promise<string> {
    if (fields.length === 0) {
      return CONFIG.DEFAULT_LANG;
    }
    
    // Check cache first
    const fieldsHash = this.generateFieldsHash(fields);
    const cachedLanguage = this.getCachedLanguage(fieldsHash);
    if (cachedLanguage) {
      return cachedLanguage;
    }
    
    try {
      const detectedLanguage = await this.translationService.detectFormLanguage(fields);
      
      // Cache the result
      this.cacheLanguage(fieldsHash, detectedLanguage);
      
      return detectedLanguage;
    } catch (error) {
      this.errorHandler.logError('Language detection failed', error);
      
      // Fallback to browser language
      const fallbackLanguage = this.getBrowserLanguage();
      this.cacheLanguage(fieldsHash, fallbackLanguage);
      
      return fallbackLanguage;
    }
  }

  /**
   * Check if a value is non-linguistic (numbers, dates, emails, etc.)
   */
  isNonLinguisticValue(originalText: string, translatedValue: string): boolean {
    return isMatchingNumber(originalText, translatedValue) ||
           isDateFormat(translatedValue) ||
           isMatchingEmail(originalText, translatedValue) ||
           isMatchingPhone(originalText, translatedValue) ||
           isMatchingCode(originalText, translatedValue);
  }

  /**
   * Generate unique hash for a set of fields
   */
  generateFieldsHash(fields: FieldDescriptor[]): string {
    const fieldsSignature = fields.map(field =>
      `${field.name || ''}-${field.label || ''}-${field.type || ''}-${field.placeholder || ''}`
    ).join('|');
    
    let hash = 0;
    for (let i = 0; i < fieldsSignature.length; i++) {
      const char = fieldsSignature.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).substring(0, 8); // Short hex hash
  }

  /**
   * Get cached language for a fields hash
   */
  getCachedLanguage(fieldsHash: string): string | undefined {
    return this.cacheManager.get<string>(CACHE_NAMESPACES.FORM_LANGUAGE, fieldsHash);
  }

  /**
   * Cache detected language for a fields hash
   */
  cacheLanguage(fieldsHash: string, language: string): void {
    this.cacheManager.set(CACHE_NAMESPACES.FORM_LANGUAGE, fieldsHash, language, 30 * 60 * 1000); // 30 minutes
  }

  /**
   * Clear language detection cache
   */
  clearCache(): void {
    this.cacheManager.clearNamespace(CACHE_NAMESPACES.FORM_LANGUAGE);
  }

  /**
   * Get browser's default language
   */
  getBrowserLanguage(): string {
    const browserLang = navigator.language.split('-')[0];
    return CONFIG.SUPPORTED_LANGS.includes(browserLang) ? browserLang : CONFIG.DEFAULT_LANG;
  }
}