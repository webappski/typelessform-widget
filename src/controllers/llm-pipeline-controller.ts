/**
 * LLMPipelineController — Reactive Controller for LLM communication and badge generation.
 *
 * Absorbs: llm/pipeline.ts, pipeline/generate.ts
 *
 * Phase 4E
 */

import type { ReactiveController } from 'lit';
import type { TypelessFormHost } from '../types/widget-host.js';
import type { LLMResponse } from '../llm-client.js';
import type { FieldDescriptor } from '../form-scanner/index.js';

interface AifcTestFlags { simulateEmptyLLMResponse?: boolean }

/** Badge record returned by initAnalyzeV2 */
interface InitBadge {
  fieldId: string;
  displayText?: string;
  labelTranslated?: string;
  labelOriginal?: string;
  group?: string;
}

export class LLMPipelineController implements ReactiveController {
  #host: TypelessFormHost;

  constructor(host: TypelessFormHost) {
    this.#host = host;
    host.addController(this);
  }

  hostConnected(): void { /* placeholder */ }
  hostDisconnected(): void { /* placeholder */ }

  // ── Send text to LLM (from llm/pipeline.ts) ────────────────────────

  async sendTextToLLM(text: string): Promise<void> {
    if (!text) { return; }
    this.#host.rawUserInput = text;

    const activeForm = this.#host.selectActiveForm();
    if (!activeForm) {
      this.#setErrorAndClearTimer(this.#host.t('error.noActiveForm'));
      return;
    }

    const fieldsForLLM = this.#host.formFieldDetector ? this.#host.formFieldDetector.scanForm(activeForm) : [];
    if (fieldsForLLM.length === 0) {
      this.#setErrorAndClearTimer(this.#host.t('error.noFields'));
      return;
    }

    const response = await this.#fetchLLMResponse(text, fieldsForLLM);
    this.#host.isLoading = false;
    this.#host.lastLLMResponse = response;

    if (response.error || !response.reply) {
      this.#handleLLMError(response);
    } else {
      this.#processSuccessfulResponse(response);
    }
  }

  // ── Generate safe badges (from typeless-form.ts inline) ─────────────

  async generateSafeBadges(fieldsForDisplay: FieldDescriptor[]): Promise<{ safeFields: FieldDescriptor[]; displayFields: FieldDescriptor[] }> {
    const cachedData = this.#host.__initAnalyzeV2;
    if (!cachedData?.badges) {
      return { safeFields: [], displayFields: [] };
    }

    const fieldDataMap = LLMPipelineController.#buildFieldDataMap(fieldsForDisplay);
    const sectionTranslations: Record<string, string> = cachedData.sectionTranslations || {};
    const mapped = ((cachedData.badges || []) as InitBadge[]).map(
      (b: InitBadge) => LLMPipelineController.#mapBadgeToField(b, fieldDataMap, sectionTranslations)
    );

    if (Array.isArray(cachedData.filterMap)) {
      this.#host.filterMap = cachedData.filterMap;
    }

    this.#host.cachedSafeBadges = { safeFields: mapped as never[], displayFields: mapped as never[] };
    performance?.mark('aifc_init_end');
    performance?.measure('aifc_init_total', 'aifc_init_start', 'aifc_init_end');

    return { safeFields: mapped, displayFields: mapped };
  }

  // ── Private helpers ─────────────────────────────────────────────────

  #setErrorAndClearTimer(message: string): void {
    if (this.#host.processingTimer) {
      clearInterval(this.#host.processingTimer);
      this.#host.processingTimer = null;
    }
    this.#host.errorMessage = message;
    this.#host.currentStep = 'error';
    this.#host.isLoading = false;
  }

  async #fetchLLMResponse(text: string, fieldsForLLM: FieldDescriptor[]): Promise<LLMResponse> {
    const badgesResult = await this.#host.generateSafeBadges(fieldsForLLM);
    const safeFields = badgesResult?.safeFields ?? [];
    this.#host.safeFieldNames = safeFields.map((f) => f.name);

    const simulateEmptyResponse = (window as unknown as { AFC_TEST_FLAGS?: AifcTestFlags }).AFC_TEST_FLAGS?.simulateEmptyLLMResponse === true;

    if (simulateEmptyResponse) {
      return { reply: '', autofill: {}, error: undefined, originalText: {} } as LLMResponse;
    }
    return this.#host.llmClient.sendPrompt(text, fieldsForLLM, this.#host.detectedLanguage);
  }

  #processSuccessfulResponse(response: LLMResponse): void {
    if (response.autofill && response.originalText) {
      this.#host.originalUserText = response.originalText;
      this.#host._cachedFieldStatuses = null;
      this.#host._lastLLMResponseForCache = '';
    }

    if (this.#host.processingTimer) {
      clearInterval(this.#host.processingTimer);
      this.#host.processingTimer = null;
    }

    if (response.autofill && Object.keys(response.autofill).length > 0) {
      this.#host.currentStep = 'success';
    } else {
      this.#host.errorMessage = this.#host.t('error.no_fields_detected');
      this.#host.currentStep = 'error';
    }
  }

  #handleLLMError(response: LLMResponse): void {
    if (this.#isAuthError(response)) {
      this.#handleAuthError(response);
    } else if (response.type === 'SENSITIVE_DATA_DETECTED') {
      this.#host.errorMessage = this.#host.t('error.sensitiveData');
    } else {
      this.#host.errorMessage = this.#classifyErrorMessage(response);
    }
    this.#host.currentStep = 'error';
  }

  #isAuthError(response: LLMResponse): boolean {
    if (response.type === 'authentication_error') { return true; }
    const combined = [response.error, response.reply].filter(Boolean).join(' ');
    return !!(combined && (combined.includes('401') || combined.includes('403') || combined.includes('Authentication failed') || combined.includes('INVALID_KEY') || combined.includes('MISSING_KEY')));
  }

  #handleAuthError(response: LLMResponse): void {
    if (this.#host.isProduction) {
      this.#host.errorMessage = this.#host.t('error.invalidApiKey') || 'Service is not configured correctly. Please contact the website administrator.';
      this.#host.dispatchEvent(new CustomEvent('afc:invalid_config', {
        detail: { reason: 'invalid_api_key' },
        bubbles: true,
        composed: true
      }));
      console.error('[TypelessForm] Invalid API key');
    } else {
      this.#host.errorMessage = 'API key authentication failed';
      this.#host.errorDetails = response.error ?? '';
    }
  }

  #classifyErrorMessage(response: LLMResponse): string {
    const combined = [response.error, response.reply].filter(Boolean).join(' ');
    if (combined.includes('QUOTA_EXHAUSTED') || combined.includes('quota exhausted') || combined.includes('LIMIT_EXCEEDED')) {
      return this.#host.t('error.quotaExhausted');
    }
    if (combined.includes('429') || combined.includes('rate limit') || combined.includes('RATE_LIMIT')) {
      return this.#host.t('error.rateLimited');
    }
    if (combined.includes('Connection failed') || combined.includes('Network error')) {
      return this.#host.t('error.networkFailed');
    }
    return response.reply || response.error || this.#host.t('error.general');
  }

  static #buildFieldDataMap(fieldsForDisplay: FieldDescriptor[]): Map<string, FieldDescriptor> {
    const map = new Map<string, FieldDescriptor>();
    if (Array.isArray(fieldsForDisplay)) {
      fieldsForDisplay.forEach((f: FieldDescriptor) => { map.set(f.name, f); });
    }
    return map;
  }

  static #resolveBadgeText(b: InitBadge): string {
    return b.displayText || b.labelTranslated || b.labelOriginal || '';
  }

  static #resolveBadgeGroup(b: InitBadge, sectionTranslations: Record<string, string>): string | undefined {
    return (b.group && sectionTranslations[b.group]) || b.group || undefined;
  }

  static #mapBadgeToField(b: InitBadge, fieldDataMap: Map<string, FieldDescriptor>, sectionTranslations: Record<string, string>): FieldDescriptor {
    const originalField: Partial<FieldDescriptor> = fieldDataMap.get(b.fieldId) || {};
    const displayText = LLMPipelineController.#resolveBadgeText(b);
    const group = LLMPipelineController.#resolveBadgeGroup(b, sectionTranslations);
    return {
      name: b.fieldId,
      text: displayText,
      isSensitive: false,
      group,
      translatedText: displayText,
      type: originalField.type ?? 'text',
      label: originalField.label,
      placeholder: originalField.placeholder,
      tagName: originalField.tagName,
      required: originalField.required,
      options: originalField.options,
      value: originalField.value,
      step: originalField.step,
      min: originalField.min,
      max: originalField.max,
      pattern: originalField.pattern
    } as FieldDescriptor;
  }
}
