/**
 * Common shared types used across the widget codebase.
 *
 * Extracted to eliminate scattered `any` usage and provide a single
 * source of truth for recurring data shapes.
 */

// ---------------------------------------------------------------------------
// Safe badges (generated from initAnalyzeV2 or generateSafeBadges)
// ---------------------------------------------------------------------------

/** A single badge representing a non-sensitive form field. */
export interface SafeBadge {
  name: string;
  text: string;
  group: string | null | undefined;
  translatedText: string;
}

/** Result of the safe-badge generation pipeline. */
export interface SafeBadgesResult {
  safeFields: SafeBadge[];
  displayFields: SafeBadge[];
}

// ---------------------------------------------------------------------------
// Field statuses (getFieldStatuses in lib/badge-sort.ts)
// ---------------------------------------------------------------------------

/** A single entry in a field-status category. */
export interface FieldStatusEntry {
  name: string;
  label: string;
  value?: string;
}

/** Categorised field statuses returned by getFieldStatuses. */
export interface FieldStatuses {
  filled: FieldStatusEntry[];
  needsCheck: FieldStatusEntry[];
  empty: FieldStatusEntry[];
}

// ---------------------------------------------------------------------------
// initAnalyzeV2 payload & response helpers
// ---------------------------------------------------------------------------

/** Shape of a single badge returned from the server in initAnalyzeV2. */
export interface BadgeData {
  fieldId: string;
  displayText?: string;
  labelTranslated?: string;
  labelOriginal?: string;
  isSensitive?: boolean;
  group?: string;
}

/** Data returned by the /initAnalyzeV2 endpoint. */
export interface InitAnalyzeV2Data {
  formLanguage?: string;
  formName?: string;
  domTitleTranslated?: string;
  badges?: BadgeData[];
  filterMap?: number[];
  sectionTranslations?: Record<string, string>;
  formId?: string;
}

// ---------------------------------------------------------------------------
// Global state written to window.__aifc_state
// ---------------------------------------------------------------------------

/** Shape of `(window as any).__aifc_state`. */
export interface AifcGlobalState {
  formLanguage: string | null;
  formName: string | null;
  domTitleTranslated?: string | null;
  badges: BadgeData[];
  filterMap: number[];
}
