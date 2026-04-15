/**
 * Interface for form scanning service
 * Handles detection and analysis of form fields
 */

import type { FieldDescriptor } from '../../form-scanner/index.js';

export interface FormScanResult {
  fields: FieldDescriptor[];
  formElement: HTMLFormElement | HTMLElement;
  language?: string;
  metadata?: FormMetadata;
}

export interface FormMetadata {
  id?: string;
  name?: string;
  action?: string;
  method?: string;
  fieldCount: number;
  fillRatio: number;
}

export interface IFormScanning {
  /**
   * Scan a form and extract field descriptors
   */
  scanForm(form: HTMLFormElement | HTMLElement): FieldDescriptor[];
  
  /**
   * Scan all forms in the document
   */
  scanAllForms(): FormScanResult[];
  
  /**
   * Get fields that can be filled (non-private, non-disabled)
   */
  getFillableFields(fields: FieldDescriptor[]): FieldDescriptor[];
  
  
  /**
   * Calculate form fill ratio
   */
  calculateFillRatio(form: HTMLFormElement | HTMLElement): number;
  
  /**
   * Select best form from multiple candidates
   */
  selectBestForm(forms: FormScanResult[]): FormScanResult | null;
  
  /**
   * Observe form changes
   */
  observeFormChanges(callback: (forms: FormScanResult[]) => void): () => void;
}