import type { LLMResponse } from '../llm-client.js';
import type { FieldDescriptor } from '../form-scanner/index.js';
import type { SafeBadgesResult, FieldStatuses } from '../types/common-types.js';

export type { FieldStatuses };

export interface GetFieldStatusesOptions {
  lastLLMResponse: LLMResponse | null;
  scannedFields: FieldDescriptor[];
  safeFieldNames: string[];
  cachedSafeBadges: SafeBadgesResult | null;
  getFieldCurrentValue: (fieldName: string, form: HTMLFormElement | null) => string;
  selectActiveForm: () => HTMLFormElement | null;
  originalUserText: Record<string, string>;
  cachedFieldStatuses: FieldStatuses | null;
  lastLLMResponseForCache: string;
}

const EMPTY_STATUSES: FieldStatuses = { filled: [], needsCheck: [], empty: [] };

/** Check if a field is an email field by type or name */
function isEmailField(field: FieldDescriptor): boolean {
  const nameLower = field.name.toLowerCase();
  return field.type === 'email' || nameLower.includes('email') || nameLower.includes('mail');
}

/** Get translated label for a field from cached badges */
function resolveFieldLabel(field: FieldDescriptor, displayFields: { name: string; translatedText?: string }[]): string {
  const cached = displayFields.find(f => f.name === field.name);
  return cached?.translatedText || field.label || field.placeholder || field.name;
}

/** Classify a single field into filled/needsCheck/empty */
function classifyField(
  opts: { field: FieldDescriptor; label: string; value: unknown; currentValue: string }
): { category: 'filled' | 'needsCheck' | 'empty' | 'skip'; entry: { name: string; label: string; value?: string } } {
  const { field, label, value, currentValue } = opts;

  // Email fields always show as needsCheck — never skip
  if (isEmailField(field)) {
    const displayValue = value || currentValue || '';
    if (displayValue && String(displayValue).trim() !== '') {
      return { category: 'needsCheck', entry: { name: field.name, label, value: String(displayValue) } };
    }
    return { category: 'empty', entry: { name: field.name, label } };
  }

  if (!value || value === '') {
    if (currentValue && currentValue.trim() !== '') {return { category: 'skip', entry: { name: field.name, label } };}
    return { category: 'empty', entry: { name: field.name, label } };
  }
  return { category: 'filled', entry: { name: field.name, label, value: value as string } };
}

type StatusResult = { statuses: FieldStatuses; cacheKey: string; shouldUpdateCache: boolean };

/** Build cache key from autofill data and user text */
function buildCacheKey(autofill: Record<string, unknown>, userText: Record<string, string>): string {
  return `${JSON.stringify(autofill)}_${JSON.stringify(userText || {})}`;
}

/** Classify all safe scanned fields into filled/needsCheck/empty */
function classifyAllFields(options: GetFieldStatusesOptions): FieldStatuses {
  const safeFields = options.safeFieldNames || [];
  const displayFields = options.cachedSafeBadges?.displayFields || [];
  const activeForm = options.selectActiveForm();
  const autofill = options.lastLLMResponse!.autofill!;
  const filled: Array<{name: string; label: string; value: string}> = [];
  const needsCheck: Array<{name: string; label: string; value: string}> = [];
  const empty: Array<{name: string; label: string}> = [];

  for (const field of options.scannedFields) {
    if (!safeFields.includes(field.name)) {continue;}
    const label = resolveFieldLabel(field, displayFields);
    const result = classifyField({
      field, label, value: autofill[field.name],
      currentValue: options.getFieldCurrentValue(field.name, activeForm),
    });
    if (result.category === 'filled') {filled.push(result.entry as typeof filled[0]);}
    else if (result.category === 'needsCheck') {needsCheck.push(result.entry as typeof needsCheck[0]);}
    else if (result.category === 'empty') {empty.push(result.entry);}
  }
  return { filled, needsCheck, empty };
}

export function getFieldStatuses(options: GetFieldStatusesOptions): StatusResult {
  if (!options.lastLLMResponse?.autofill || !options.scannedFields) {
    return { statuses: EMPTY_STATUSES, cacheKey: '', shouldUpdateCache: false };
  }
  const cacheKey = buildCacheKey(options.lastLLMResponse.autofill, options.originalUserText);
  if (options.cachedFieldStatuses && options.lastLLMResponseForCache === cacheKey) {
    return { statuses: options.cachedFieldStatuses, cacheKey, shouldUpdateCache: false };
  }
  return { statuses: classifyAllFields(options), cacheKey, shouldUpdateCache: true };
}
