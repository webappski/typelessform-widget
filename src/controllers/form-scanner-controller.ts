/**
 * FormScannerController — Reactive Controller for form scanning, selection, and language detection.
 *
 * Absorbs: form/scan.ts, form/selection.ts, lang/form-language.ts
 * Owns services: FormFieldDetector, PrivacyChecker, FormLanguageDetector
 *
 * Phase 4A
 */

import type { ReactiveController } from 'lit';
import type { TypelessFormHost } from '../types/widget-host.js';
import type { FieldDescriptor } from '../form-scanner/index.js';
import { FormFieldDetector } from '../core/services/form-field-detector.js';
import { PrivacyChecker } from '../core/services/privacy-checker.js';
import { FormLanguageDetector } from '../core/services/form-language-detector.js';
import type { TranslationService } from '../services/translation-service.js';
import { normalizeScanResults, buildFieldElementsMap, computeBestForm } from '../form/postprocess.js';
import { getFormTitle as getFormTitleFromDOM } from '../lib/field-keys.js';
import { getFormFillRatio, isFormFilled, getElementVisibilityRatio } from '../lib/guards.js';
import { CONFIG } from '../constants/config.js';

export class FormScannerController implements ReactiveController {
  #host: TypelessFormHost;

  constructor(host: TypelessFormHost) {
    this.#host = host;
    host.addController(this);
  }

  hostConnected(): void {
    // Observer setup remains in lifecycle.ts for now (cross-cutting)
  }

  hostDisconnected(): void {
    // Observer cleanup remains in lifecycle.ts for now
  }

  // ── Service initialization (called from firstUpdated) ────────────────

  initializeServices(translationService: TranslationService): void {
    this.#host.formFieldDetector = new FormFieldDetector();
    this.#host.privacyChecker = new PrivacyChecker();
    this.#host.formLanguageDetector = new FormLanguageDetector(translationService);
  }

  // ── Scanning (from form/scan.ts) ─────────────────────────────────────

  scanAllForms(): void {
    if (!this.#host.formFieldDetector) {
      return;
    }

    const results = this.#host.formFieldDetector.scanAllForms();
    const allFields = normalizeScanResults(results);

    this.#host.fieldsDetected = allFields.length;
    this.#host.scannedFields = allFields;

    buildFieldElementsMap(this.#host.scannedFields, this.#host.fieldElementsMap);

    // Reconnect IntersectionObserver for form visibility tracking
    this.#reconnectFormObserver();
  }

  getFormsStatistics(): { filled: number; partiallyFilled: number; empty: number; total?: number } {
    const allForms = Array.from(document.querySelectorAll('form')) as HTMLFormElement[];
    let filledCount = 0;
    let partiallyFilledCount = 0;
    let emptyCount = 0;

    for (const form of allForms) {
      const fillRatio = getFormFillRatio(form);
      if (fillRatio >= 0.8) {
        filledCount++;
      } else if (fillRatio > 0) {
        partiallyFilledCount++;
      } else {
        emptyCount++;
      }
    }

    return { total: allForms.length, filled: filledCount, partiallyFilled: partiallyFilledCount, empty: emptyCount };
  }

  getFormIndex(_targetForm: HTMLFormElement): number {
    const allForms = Array.from(document.querySelectorAll('form'));
    return allForms.indexOf(_targetForm) + 1;
  }

  getTotalFormsCount(): number {
    return document.querySelectorAll('form').length;
  }

  getFormTitle(form: HTMLFormElement): string {
    const explicit = getFormTitleFromDOM(form, '');

    if (explicit && !this.#isFromLegend(form, explicit) && !this.#isFromLabel(form, explicit)) {
      return this.#resolveExplicitTitle(explicit);
    }

    return this.#getInferredTitle();
  }

  // ── Selection (from form/selection.ts) ───────────────────────────────

  selectActiveForm(): HTMLFormElement | null {
    if (this.#host.focusedForm) {
      return this.#host.focusedForm;
    }

    const allForms = Array.from(document.querySelectorAll('form')) as HTMLFormElement[];

    if (allForms.length === 0) {
      return this.#selectFromContainers();
    }

    if (allForms.length === 1) {
      return allForms[0];
    }

    return this.#selectBestFromForms(allForms);
  }

  findBestCandidateForm(allForms: HTMLFormElement[]): HTMLFormElement | null {
    const emptyForms = allForms.filter(form => getFormFillRatio(form) === 0);
    if (emptyForms.length > 0) {return emptyForms[0];}

    const partialForms = allForms.filter(form => {
      const ratio = getFormFillRatio(form);
      return ratio > 0 && ratio < 0.8;
    });
    if (partialForms.length > 0) {return partialForms[0];}

    return allForms[0] || null;
  }

  async updateActiveForm(): Promise<void> {
    this.#host.updateFormHighlight();

    if (this.#host.showModal && (this.#host.currentStep === 'initial' || this.#host.currentStep === 'listening')) {
      const activeForm = this.selectActiveForm();
      if (activeForm && this.#host.formFieldDetector) {
        const fields = this.#host.formFieldDetector.scanForm(activeForm);
        const currentFieldsHash = JSON.stringify(fields.map((f: FieldDescriptor) => ({ name: f.name, type: f.type, label: f.label })));
        if (currentFieldsHash !== this.#host.lastProcessedFieldsHash) {
          this.#host.lastProcessedFieldsHash = currentFieldsHash;
          this.#host.scannedFields = fields;
        }
      }
    }
  }

  // ── Form heuristics (thin wrappers around lib/guards.ts) ─────────────

  getFormFillRatio(form: HTMLFormElement): number {
    return getFormFillRatio(form);
  }

  getElementVisibilityRatio(element: Element): number {
    return getElementVisibilityRatio(element);
  }

  isFormFilled(form: HTMLFormElement): boolean {
    return isFormFilled(form);
  }

  // ── Language detection (from lang/form-language.ts) ───────────────────

  async getFormLanguage(): Promise<string> {
    const g = (window as unknown as { __aifc_guard?: { phase: string } }).__aifc_guard;
    if (!g || g.phase !== 'open') {
      return this.#host.currentLang || CONFIG.DEFAULT_LANG;
    }

    if (this.#host.__initAnalyzeV2?.formLanguage) {
      return this.#host.__initAnalyzeV2.formLanguage;
    }

    const fieldsForAnalysis = this.#gatherFieldsForLanguageDetection();
    if (fieldsForAnalysis.length === 0) { return 'en'; }

    return this.#detectLanguageWithCache(fieldsForAnalysis);
  }

  // ── Private helpers ──────────────────────────────────────────────────

  #needsTitleTranslation(): boolean {
    const uiLang = this.#host.currentLang;
    const formLang = (this.#host.__initAnalyzeV2 as Record<string, unknown>)?.formLanguage as string
      || this.#host.detectedLanguage;
    return !!(formLang && uiLang && formLang !== 'unknown' && uiLang !== 'unknown' && formLang !== uiLang);
  }

  #resolveExplicitTitle(explicit: string): string {
    if (!this.#needsTitleTranslation()) { return explicit; }
    const translated = this.#host.__initAnalyzeV2?.domTitleTranslated;
    if (translated && translated.trim()) { return translated.trim(); }
    return this.#getInferredTitle() || explicit;
  }

  #getInferredTitle(): string {
    const inferred = this.#host.translationService?.getInferredFormName?.();
    if (inferred && typeof inferred === 'string' && inferred.trim()) {
      return inferred.trim();
    }
    return '';
  }

  #selectFromContainers(): HTMLFormElement | null {
    if (!this.#host.visibleForms || this.#host.visibleForms.size === 0) { return null; }

    const visibleContainers = Array.from(this.#host.visibleForms.entries())
      .filter(([_, isVisible]) => isVisible)
      .map(([element]) => element as HTMLElement);

    if (visibleContainers.length > 0) {
      return this.#pickBestFromList(visibleContainers);
    }

    const allContainers = Array.from(this.#host.visibleForms.keys()) as HTMLElement[];
    return this.#pickBestFromList(allContainers);
  }

  #pickBestFromList(containers: HTMLElement[]): HTMLFormElement | null {
    if (containers.length === 0) { return null; }
    if (containers.length === 1) { return containers[0] as HTMLFormElement; }
    const { bestForm } = computeBestForm(
      containers as HTMLFormElement[],
      (form) => getElementVisibilityRatio(form),
      (form) => isFormFilled(form)
    );
    return bestForm;
  }

  #selectBestFromForms(allForms: HTMLFormElement[]): HTMLFormElement | null {
    const { bestForm, bestVisibility } = computeBestForm(
      allForms,
      (form) => getElementVisibilityRatio(form),
      (form) => isFormFilled(form)
    );

    if (!bestForm || bestVisibility === 0) {
      return this.findBestCandidateForm(allForms);
    }
    return bestForm;
  }

  #gatherFieldsForLanguageDetection(): FieldDescriptor[] {
    const activeForm = this.selectActiveForm();

    if (activeForm && this.#host.formFieldDetector) {
      return this.#host.formFieldDetector.scanForm(activeForm);
    }

    if (this.#host.formFieldDetector) {
      const results = this.#host.formFieldDetector.scanAllForms();
      return results.reduce(
        (all: FieldDescriptor[], form: { fields: FieldDescriptor[] }) => [...all, ...form.fields],
        [] as FieldDescriptor[]
      );
    }

    return [];
  }

  async #detectLanguageWithCache(fieldsForAnalysis: FieldDescriptor[]): Promise<string> {
    const fieldsHash = this.#host.formLanguageDetector
      ? this.#host.formLanguageDetector.generateFieldsHash(fieldsForAnalysis)
      : '';
    const cachedLanguage = this.#host.languageCache.get(fieldsHash);
    if (cachedLanguage) { return cachedLanguage; }

    try {
      const detectedLanguage = this.#host.formLanguageDetector
        ? await this.#host.formLanguageDetector.detectFormLanguage(fieldsForAnalysis)
        : await this.#host.translationService.detectFormLanguage(fieldsForAnalysis);

      this.#host.languageCache.set(fieldsHash, detectedLanguage);
      return detectedLanguage;
    } catch (_error) {
      const fallbackLanguage = this.#host.formLanguageDetector
        ? this.#host.formLanguageDetector.getBrowserLanguage()
        : CONFIG.DEFAULT_LANG;
      this.#host.languageCache.set(fieldsHash, fallbackLanguage);
      return fallbackLanguage;
    }
  }

  #reconnectFormObserver(): void {
    if (!this.#host.formsIntersectionObserver) {
      return;
    }

    this.#host.formsIntersectionObserver.disconnect();
    this.#host.visibleForms.clear();

    const allFormsAndContainers = new Set<Element>();

    document.querySelectorAll('form').forEach(form => {
      allFormsAndContainers.add(form);
    });

    document.querySelectorAll('[role="form"], [data-form], [class*="form-"], [class*="-form"]').forEach(container => {
      if (!container.closest('form')) {
        allFormsAndContainers.add(container);
      }
    });

    if (allFormsAndContainers.size === 0 &&
      (document.querySelectorAll('input, select, textarea').length > 0)) {
      allFormsAndContainers.add(document.body);
    }

    allFormsAndContainers.forEach(form => {
      this.#host.visibleForms.set(form, false);
      this.#host.formsIntersectionObserver!.observe(form);
    });

    this.#host.isAnyFormVisible10 = Array.from(this.#host.visibleForms.values()).some(Boolean);
  }

  #isFromLegend(form: HTMLFormElement, text: string): boolean {
    if (!text) {return false;}
    const normalizedText = text.trim().toLowerCase();
    const legends = form.querySelectorAll('legend');
    for (const legend of legends) {
      const legendText = legend.textContent?.trim().toLowerCase();
      if (legendText === normalizedText) {
        return true;
      }
    }
    return false;
  }

  #isFromLabel(form: HTMLFormElement, text: string): boolean {
    if (!text) {return false;}
    const normalizedText = text.trim().toLowerCase();
    const labels = form.querySelectorAll('label');
    for (const label of labels) {
      const labelText = label.textContent?.trim().toLowerCase();
      if (labelText === normalizedText) {
        return true;
      }
    }
    return false;
  }
}
