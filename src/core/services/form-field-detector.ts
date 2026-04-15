/**
 * Service for detecting and analyzing form fields
 */

import { FormScanner, scanAllFormsOnPage, type FieldDescriptor } from '../../form-scanner/index.js';
import type { IFormScanning, FormScanResult, FormMetadata } from '../interfaces/form-scanning';
import { CacheManager, CACHE_NAMESPACES } from './cache-manager';

export class FormFieldDetector implements IFormScanning {
  private cacheManager = CacheManager.getInstance();
  private readonly CACHE_DURATION = 2000; // 2 seconds
  private mutationObserver: MutationObserver | null = null;
  private formChangeCallbacks: ((forms: FormScanResult[]) => void)[] = [];

  constructor() {}

  /**
   * Scan a form and extract field descriptors
   */
  scanForm(form: HTMLFormElement | HTMLElement): FieldDescriptor[] {
    // Check cache first
    const cacheKey = this.getFormCacheKey(form);
    const cached = this.cacheManager.get<FieldDescriptor[]>(CACHE_NAMESPACES.FORM_SCAN, cacheKey);
    if (cached) {
      return cached;
    }

    const scanner = new FormScanner(form as HTMLFormElement);
    const fields = scanner.scan();
    
    // Cache the result
    this.cacheManager.set(CACHE_NAMESPACES.FORM_SCAN, cacheKey, fields, this.CACHE_DURATION);
    
    return fields;
  }

  /**
   * Scan all forms in the document
   */
  scanAllForms(): FormScanResult[] {
    const allFields = scanAllFormsOnPage();
    const formMap = new Map<HTMLElement, FieldDescriptor[]>();
    
    // Group fields by their form element if available
    allFields.forEach(field => {
      if (field.element) {
        const form = field.element.closest('form') || field.element.closest('[role="form"]') || field.element.parentElement;
        if (form) {
          if (!formMap.has(form as HTMLElement)) {
            formMap.set(form as HTMLElement, []);
          }
          formMap.get(form as HTMLElement)!.push(field);
        }
      }
    });
    
    // Create results
    const results: FormScanResult[] = [];
    
    // Handle forms with fields
    formMap.forEach((fields, form) => {
      results.push({
        fields,
        formElement: form,
        language: this.detectFormLanguage(form),
        metadata: this.getFormMetadata(form, fields)
      });
    });
    
    // Also check for forms without detected fields
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
      if (!formMap.has(form as HTMLFormElement)) {
        const fields = this.scanForm(form as HTMLFormElement);
        if (fields.length > 0) {
          results.push({
            fields,
            formElement: form as HTMLFormElement,
            language: this.detectFormLanguage(form as HTMLFormElement),
            metadata: this.getFormMetadata(form as HTMLFormElement, fields)
          });
        }
      }
    });
    
    return results;
  }

  /**
   * Get fields that can be filled (non-private, non-disabled)
   * Note: Privacy checking should be done externally via PrivacyChecker
   */
  getFillableFields(fields: FieldDescriptor[]): FieldDescriptor[] {
    return fields.filter(field => {
      // Skip disabled/readonly fields
      const element = field.element;
      if (element && element instanceof HTMLInputElement) {
        if (element.disabled || element.readOnly) {return false;}
      }
      
      // Skip hidden fields
      if (field.type === 'hidden') {return false;}
      
      return true;
    });
  }


  /**
   * Calculate form fill ratio
   */
  calculateFillRatio(form: HTMLFormElement | HTMLElement): number {
    const fields = this.scanForm(form);
    if (fields.length === 0) {return 0;}
    
    const filledFields = fields.filter(field => {
      const value = field.value;
      return value && value.toString().trim().length > 0;
    });
    
    return filledFields.length / fields.length;
  }

  /**
   * Select best form from multiple candidates
   */
  selectBestForm(forms: FormScanResult[]): FormScanResult | null {
    if (forms.length === 0) {return null;}
    if (forms.length === 1) {return forms[0];}
    
    // Score each form
    const scored = forms.map(form => {
      return { form, score: this.scoreForm(form) };
    });
    
    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);
    
    return scored[0].form;
  }

  /** Check element visibility and viewport containment */
  private getVisibilityFlags(el: HTMLElement): { visible: boolean; inViewport: boolean } {
    const rect = el.getBoundingClientRect();
    const visible = rect.width > 0 && rect.height > 0;
    const inViewport = visible && rect.top >= 0 && rect.left >= 0
      && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
    return { visible, inViewport };
  }

  /** Score a form result for best-form selection */
  private scoreForm(form: FormScanResult): number {
    const { visible, inViewport } = this.getVisibilityFlags(form.formElement as HTMLElement);
    const meta = form.metadata;
    const hasIdentity = !!(meta && (meta.id || meta.name));
    return form.fields.length * 10
      + this.getFillableFields(form.fields).length * 15
      + (hasIdentity ? 20 : 0)
      + (visible ? 30 : 0)
      + (inViewport ? 40 : 0);
  }

  /**
   * Observe form changes
   */
  observeFormChanges(callback: (forms: FormScanResult[]) => void): () => void {
    this.formChangeCallbacks.push(callback);
    
    // Start observing if not already
    if (!this.mutationObserver) {
      this.mutationObserver = new MutationObserver(() => {
        // Clear cache on DOM changes
        this.cacheManager.clearNamespace(CACHE_NAMESPACES.FORM_SCAN);
        
        // Scan and notify
        const forms = this.scanAllForms();
        this.formChangeCallbacks.forEach(cb => cb(forms));
      });
      
      this.mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['value', 'disabled', 'readonly']
      });
    }
    
    // Return unsubscribe function
    return () => {
      const index = this.formChangeCallbacks.indexOf(callback);
      if (index > -1) {
        this.formChangeCallbacks.splice(index, 1);
      }
      
      // Stop observing if no more callbacks
      if (this.formChangeCallbacks.length === 0 && this.mutationObserver) {
        this.mutationObserver.disconnect();
        this.mutationObserver = null;
      }
    };
  }

  /**
   * Detect form language
   */
  private detectFormLanguage(form: HTMLElement): string | undefined {
    // Check form's lang attribute
    const formLang = form.getAttribute('lang');
    if (formLang) {return formLang;}
    
    // Check closest parent with lang
    const parentWithLang = form.closest('[lang]');
    if (parentWithLang) {
      return parentWithLang.getAttribute('lang') || undefined;
    }
    
    // Check document lang
    return document.documentElement.lang || undefined;
  }

  /**
   * Get form metadata
   */
  private getFormMetadata(form: HTMLElement, fields: FieldDescriptor[]): FormMetadata {
    const formEl = form as HTMLFormElement;
    const filledCount = fields.filter(f => f.value && f.value.toString().trim()).length;
    
    return {
      id: formEl.id || undefined,
      name: formEl.name || undefined,
      action: formEl.action || undefined,
      method: formEl.method || undefined,
      fieldCount: fields.length,
      fillRatio: fields.length > 0 ? filledCount / fields.length : 0
    };
  }

  /**
   * Get total forms count
   */
  getTotalFormsCount(): number {
    return document.querySelectorAll('form').length;
  }

  /**
   * Check if there are any input fields on the page
   * Excludes service elements (Google Translate, etc.) and invisible elements
   */
  hasInputFields(): boolean {
    // Helper to check if element is a real user-facing input
    const isRealUserInput = (el: Element): boolean => {
      // Exclude Google Translate service inputs
      if (el.id?.startsWith('goog-gt-')) {return false;}

      // Exclude elements inside Google Translate containers
      if (el.closest('.goog-te-menu-frame, .goog-te-menu2, #goog-gt-tt')) {return false;}

      // Exclude elements inside our own widget
      if (el.closest('ai-form-copilot')) {return false;}

      // Exclude invisible elements (display:none, visibility:hidden, zero size)
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') {return false;}

      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {return false;}

      return true;
    };

    const nativeInputs = Array.from(
      document.querySelectorAll('input:not([type="hidden"]), textarea, select')
    ).filter(isRealUserInput).length;

    const customInputs = Array.from(document.querySelectorAll('*')).filter(el => {
      const tagName = el.tagName.toLowerCase();
      const isCustomInput = (tagName.includes('input') ||
              tagName.includes('select') ||
              tagName.includes('textarea') ||
              tagName.includes('dropdown') ||
              tagName.includes('combobox')) &&
             !['input', 'select', 'textarea'].includes(tagName);

      return isCustomInput && isRealUserInput(el);
    }).length;

    return nativeInputs > 0 || customInputs > 0;
  }

  /**
   * Check if a field can be filled
   */
  canFieldBeFilled(field: FieldDescriptor, fieldElementsMap?: Map<string, HTMLElement>): boolean {
    const name = field.name;
    
    // 1. Если есть сохраненная ссылка на элемент - поле заполняемо
    if (field.element || fieldElementsMap?.has(name)) {
      return true;
    }
    
    // 2. Проверяем стандартные способы поиска поля
    const forms = Array.from(document.forms);
    for (const form of forms) {
      // Проверяем стандартные селекторы
      if (form.elements.namedItem(name) || 
          form.querySelector(`[name="${name}"]`) ||
          form.querySelector(`[id="${name}"]`) ||
          form.querySelector(`[formcontrolname="${name}"]`)) {
        return true;
      }
    }
    
    // 3. Если поле не найдено ни одним способом - не показываем бэдж
    return false;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cacheManager.clearNamespace(CACHE_NAMESPACES.FORM_SCAN);
  }
  
  /**
   * Generate cache key for a form
   */
  private getFormCacheKey(form: HTMLElement): string {
    const formEl = form as HTMLFormElement;
    return `form_${formEl.id || formEl.name || 'anonymous'}_${formEl.elements?.length || 0}`;
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.clearCache();
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    this.formChangeCallbacks = [];
  }
}