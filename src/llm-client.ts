import type { FieldDescriptor } from './form-scanner/index.js';
import { CONFIG } from './constants/config.ts';
import { apiFetch } from './utils/api-fetch.ts';

// Интерфейс для multi-format значений дат/времени
export interface MultiFormatValue {
  formats: {
    iso?: string;          // ISO format: "2025-07-13T19:00:00"
    display?: string;      // Display format: "July 13 at 7:00 PM"
    numeric?: string;      // Numeric format: "07/13/2025 19:00"
    timestamp?: number;    // Unix timestamp: 1731524400000
  };
  originalText: string;    // Оригинальный текст пользователя
}

export interface LLMResponse {
  reply: string;
  autofill?: { [key: string]: string | number | boolean | string[] | MultiFormatValue | undefined };
  originalText?: { [key: string]: string }; // Оригинальный текст пользователя
  confidence?: { [key: string]: number }; // Уровень уверенности для каждого поля (0-1)
  error?: string;
  type?: string; // Тип ошибки от OpenAI
}

export class LLMClient {
  constructor() {
    // API keys are now managed server-side
  }

  /** Build request body for the LLM endpoint */
  private buildRequestBody(prompt: string, fields: FieldDescriptor[], formLanguage?: string): Record<string, unknown> {
    const safeFields = fields.filter(f => !f.isPrivate);
    const fieldsWithMetadata = safeFields.map(field => ({
      name: field.name, type: field.type, label: field.label,
      placeholder: field.placeholder, tagName: field.tagName,
      required: field.required, options: field.options, value: field.value,
      step: field.step, min: field.min, max: field.max, pattern: field.pattern
    }));

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const userTodayLocal = new Intl.DateTimeFormat('en-CA', {
      timeZone: userTimeZone, year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date());

    const body: Record<string, unknown> = {
      requestType: 'FORM_FILLING', prompt, fields: fieldsWithMetadata,
      useNewEmailPreprocessing: CONFIG.EMAIL_PREPROCESSING.USE_NEW_VERSION,
      userTimeZone, userTodayLocal
    };
    if (formLanguage) {body.language = formLanguage;}
    return body;
  }

  async sendPrompt(prompt: string, fields: FieldDescriptor[], formLanguage?: string): Promise<LLMResponse> {
    try {
      const requestBody = this.buildRequestBody(prompt, fields, formLanguage);
      const response = await apiFetch(CONFIG.COMPLETE_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        let errorBody;
        try { errorBody = await response.json(); }
        catch { errorBody = { error: await response.text() || response.statusText }; }
        return {
          reply: `Error: ${response.status} ${response.statusText}`,
          error: errorBody?.error || response.statusText,
          type: errorBody?.type
        };
      }
      return await response.json() as LLMResponse;
    } catch (error: unknown) {
      return {
        reply: 'Failed to connect to the AI service.',
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }
} 