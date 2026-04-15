/**
 * InitAnalyzeV2 Adapter - Type definitions and interfaces
 * 
 * This file contains ONLY type definitions and interfaces for the unified
 * single-request architecture. No implementation logic should be added here.
 * 
 * @module init-v2-adapter
 */

/**
 * Field data from frontend scanner
 */
export interface InitV2Field {
  /** Unique field identifier */
  id: string;

  /** HTML name attribute */
  name: string | null;

  /** Input type (text, email, tel, etc.) */
  type: string;

  /** Visible label text */
  label: string | null;

  /** Placeholder text */
  placeholder: string | null;

  /** ARIA label for accessibility */
  ariaLabel: string | null;

  /** Field group/section identifier */
  group: string | null;

  /** Select/radio/checkbox options */
  options: string[] | null;

  /** Original DOM position index */
  index: number;

  /** Frontend PII detection flag */
  frontendSensitiveHint?: boolean;

  /** Explicit privacy flag from data-ai-private attribute */
  isPrivate?: boolean | null;

  /** Explicit label override from data-ai-label attribute */
  explicitLabel?: string | null;

  // v6: Rich structural metadata for selector detection
  /** HTML tagName (e.g., "nz-select", "mat-select", "input") */
  tagName?: string | null;

  /** Filtered CSS classes (SAFE_CLASS_PATTERNS) */
  classList?: string[] | null;

  /** ARIA role attribute */
  role?: string | null;

  /** ARIA haspopup attribute */
  ariaHaspopup?: string | null;

  /** ARIA controls attribute */
  ariaControls?: string | null;

  /** Has HTML5 datalist */
  hasDatalist?: boolean | null;

  /** Datalist ID */
  listId?: string | null;
}

/**
 * Request payload for initAnalyzeV2 endpoint
 */
export interface InitAnalyzeV2Request {
  /** Page origin (protocol + hostname + port) — no path/query to avoid leaking PII */
  pageUrl: string;

  /** Form DOM id attribute (if exists) */
  formId: string | null;

  /** User interface language (2-letter ISO code) */
  userUiLang: string;

  /** Raw form title extracted from DOM */
  formTitle: string | null;

  /** Array of scanned form fields */
  fields: InitV2Field[];

  /** Widget version */
  widgetVersion: string;
}

/**
 * Badge information for a form field
 */
export interface InitV2Badge {
  /** Original field identifier */
  fieldName: string;
  
  /** Translated/contextualized display name */
  displayName: string;
  
  /** Whether field contains sensitive data */
  isSensitive: boolean;
  
  /** Original position in DOM */
  originalIndex: number;
}

/**
 * Response metadata
 */
export interface InitV2Meta {
  /** Rules version identifier */
  rulesVersion: "v2";
  
  /** Processing time in milliseconds */
  elapsedMs: number;
  
  /** Whether response was served from cache */
  cached: boolean;
}

/**
 * Response from initAnalyzeV2 endpoint
 */
export interface InitAnalyzeV2Response {
  /** Detected form language (2-letter ISO code) */
  formLanguage: string;
  
  /** Form title (translated or generated) */
  formName: string;
  
  /** Array of badge information */
  badges: InitV2Badge[];
  
  /** Index mapping after sensitive field filtering */
  filterMap: number[];
  
  /** Cache key for this response */
  checksum: string;
  
  /** Response metadata */
  meta: InitV2Meta;
  
  /** Legacy field for backward compatibility */
  translations: null;
  
  /** Legacy field for backward compatibility */
  sensitiveFlags: null;
}

/**
 * Global state interface stored in window.__aifc_state
 */
export interface AifcGlobalState {
  /** Detected form language */
  formLanguage: string | null;
  
  /** Form name (single source of truth for UI) */
  formName: string | null;
  
  /** Badge array */
  badges: InitV2Badge[];
  
  /** Filter mapping */
  filterMap: number[];
  
  /** Response checksum for cache validation */
  checksum: string | null;
}

/**
 * Window augmentation for global state
 */
declare global {
  interface Window {
    __aifc_state?: AifcGlobalState;
  }
}

/**
 * Form name resolution strategy
 */
export enum FormNameStrategy {
  /** Keep original title as-is (same language) */
  KEEP_TITLE = "keep-title",
  
  /** Translate provided title */
  TRANSLATE_TITLE = "translate-title",
  
  /** Generate new title from context */
  GENERATE_TITLE = "generate-title"
}

/**
 * Pipeline step results (for internal orchestration)
 */
export interface PipelineContext {
  /** Sensitive field detection results */
  sensitiveFlags: boolean[];
  
  /** Detected form language */
  formLanguage: string;
  
  /** Resolved form name strategy */
  formNameStrategy: FormNameStrategy;
  
  /** Non-sensitive fields for processing */
  nonSensitiveFields: InitV2Field[];
  
  /** Labels for non-sensitive fields */
  nonSensitiveLabels: string[];
  
  /** Indices of non-sensitive fields */
  nonSensitiveIndices: number[];
}

/**
 * Cache entry structure
 */
export interface CacheEntry {
  /** Response data */
  data: InitAnalyzeV2Response;
  
  /** Cache timestamp */
  timestamp: number;
}

/**
 * Error fallback response
 */
export interface FallbackResponse {
  /** Fallback to English */
  formLanguage: "en";
  
  /** Generic form name */
  formName: "Form";
  
  /** Original labels as badges */
  badges: InitV2Badge[];
  
  /** Identity mapping */
  filterMap: number[];
  
  /** Error checksum */
  checksum: "error";
  
  /** Error metadata */
  meta: InitV2Meta;
  
  /** Null for compatibility */
  translations: null;
  
  /** Null for compatibility */
  sensitiveFlags: null;
}