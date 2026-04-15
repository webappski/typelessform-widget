/**
 * Consent Management Service
 *
 * Handles user consent for GDPR compliance with audit trail.
 *
 * Features:
 * - LocalStorage for fast consent checks
 * - Firestore for immutable audit trail
 * - UUID-based user identification
 * - Policy version tracking for re-consent
 */

import { v4 as uuidv4 } from 'uuid';
import { WIDGET_VERSION } from '../constants/version.js';
import { apiFetch } from '../utils/api-fetch.ts';

export interface ConsentRecord {
  userId: string;
  firstConsentAt: string;
  lastConsentAt: string;
  policyVersion: string;
  consentGiven: boolean;
  consentMethod: 'explicit' | 'dismissed';
  userAgent: string;
  domain: string;
  widgetVersion: string;
  usageCount: number;
  lastUsedAt: string;
  consentHistory: ConsentHistoryEntry[];
  // Audit trail fields for GDPR compliance (Art. 7(1) - proof of consent)
  checkboxMain: boolean;        // Main consent checkbox state
  checkboxAge: boolean;          // Age 16+ confirmation checkbox state
  uiLocale: string;              // Language in which consent was shown
  modalVersion: string;          // Compose key: policyVersion_locale_widgetVersion
  // User deduplication fields (GDPR-compliant)
  ipHashLast24h?: string;        // SHA256(IP + date) - rotates daily, set by backend
  linkedUserIds?: string[];      // List of related userIds from same user (set by backend)
}

export interface ConsentHistoryEntry {
  timestamp: string;
  action: 'consent_given' | 'consent_revoked' | 'policy_updated';
  policyVersion: string;
}

export interface SaveConsentOptions {
  consentGiven: boolean;
  method: 'explicit' | 'dismissed';
  checkboxMain: boolean;
  checkboxAge: boolean;
  uiLocale: string;
}

export class ConsentService {
  private static readonly STORAGE_KEY = 'typelessForm_consent';
  private static readonly SESSION_KEY = 'typelessForm_consent_session';
  // Legacy keys for one-time migration (users who consented before rebranding)
  private static readonly LEGACY_STORAGE_KEY = 'aiFormCopilot_consent';
  private static readonly LEGACY_SESSION_KEY = 'aiFormCopilot_consent_session';
  private static readonly CURRENT_POLICY_VERSION = 'v1.0';
  private static readonly WIDGET_VERSION = WIDGET_VERSION;

  /**
   * Check if LocalStorage is available
   */
  private static isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__localStorage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (_e) {
      return false;
    }
  }

  /**
   * Check if user has given valid consent
   *
   * @returns true if consent is valid, false if modal should be shown
   */
  static hasValidConsent(): boolean {
    const record = this.getLocalConsent();

    if (!record) {
      return false;
    }

    // Check if consent was given
    if (!record.consentGiven) {
      return false;
    }

    // Check if policy version is current
    if (record.policyVersion !== this.CURRENT_POLICY_VERSION) {
      return false;
    }

    return true;
  }

  /**
   * Migrate consent from legacy keys (aiFormCopilot_*) to new keys (typelessForm_*).
   * Runs once per page load, removes old keys after migration.
   */
  private static migrateLegacyKeys(): void {
    try {
      if (this.isLocalStorageAvailable()) {
        const legacy = localStorage.getItem(this.LEGACY_STORAGE_KEY);
        if (legacy && !localStorage.getItem(this.STORAGE_KEY)) {
          localStorage.setItem(this.STORAGE_KEY, legacy);
        }
        localStorage.removeItem(this.LEGACY_STORAGE_KEY);
      }
    } catch (_e) { /* ignore */ }
    try {
      const legacySession = sessionStorage.getItem(this.LEGACY_SESSION_KEY);
      if (legacySession && !sessionStorage.getItem(this.SESSION_KEY)) {
        sessionStorage.setItem(this.SESSION_KEY, legacySession);
      }
      sessionStorage.removeItem(this.LEGACY_SESSION_KEY);
    } catch (_e) { /* ignore */ }
  }

  private static _migrated = false;

  /**
   * Get consent record from LocalStorage or SessionStorage fallback
   */
  private static getLocalConsent(): ConsentRecord | null {
    // One-time migration from legacy keys
    if (!this._migrated) {
      this._migrated = true;
      this.migrateLegacyKeys();
    }

    // Try LocalStorage first
    if (this.isLocalStorageAvailable()) {
      try {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) {
          return JSON.parse(data) as ConsentRecord;
        }
      } catch (error) {
        console.error('[ConsentService] Failed to read from LocalStorage:', error);
      }
    }

    // Fallback to SessionStorage (for incognito/private mode)
    try {
      const sessionData = sessionStorage.getItem(this.SESSION_KEY);
      if (sessionData) {
        console.warn('[ConsentService] Using SessionStorage fallback (consent will expire on browser close)');
        return JSON.parse(sessionData) as ConsentRecord;
      }
    } catch (error) {
      console.error('[ConsentService] Failed to read from SessionStorage:', error);
    }

    return null;
  }

  /**
   * Save consent record to LocalStorage and Firestore
   */
  /** Build a ConsentRecord from options and existing data */
  private static buildConsentRecord(options: SaveConsentOptions, existing: ConsentRecord | null): ConsentRecord {
    const { consentGiven, method, checkboxMain, checkboxAge, uiLocale } = options;
    const now = new Date().toISOString();
    const action = consentGiven ? 'consent_given' as const : 'consent_revoked' as const;
    const base = existing
      ? { userId: existing.userId, firstConsentAt: existing.firstConsentAt, usageCount: existing.usageCount, lastUsedAt: existing.lastUsedAt, history: existing.consentHistory }
      : { userId: uuidv4(), firstConsentAt: now, usageCount: 0, lastUsedAt: now, history: [] as ConsentHistoryEntry[] };
    return {
      ...base, userId: base.userId, firstConsentAt: base.firstConsentAt,
      lastConsentAt: now, policyVersion: this.CURRENT_POLICY_VERSION,
      consentGiven, consentMethod: method,
      userAgent: navigator.userAgent, domain: window.location.hostname,
      widgetVersion: this.WIDGET_VERSION,
      usageCount: base.usageCount, lastUsedAt: base.lastUsedAt,
      consentHistory: [...base.history, { timestamp: now, action, policyVersion: this.CURRENT_POLICY_VERSION }],
      checkboxMain, checkboxAge, uiLocale,
      modalVersion: `${this.CURRENT_POLICY_VERSION}_${uiLocale}_${this.WIDGET_VERSION}`,
    };
  }

  /** Persist record to LocalStorage or SessionStorage fallback */
  private static persistLocally(record: ConsentRecord): void {
    if (this.isLocalStorageAvailable()) {
      try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(record)); return; }
      catch (error) { console.error('[ConsentService] Failed to save to LocalStorage:', error); }
    }
    try {
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(record));
      console.warn('[ConsentService] Using SessionStorage fallback (consent will expire on browser close)');
    } catch (error) {
      console.error('[ConsentService] Failed to save to SessionStorage:', error);
    }
  }

  static async saveConsent(options: SaveConsentOptions): Promise<void> {
    const existingRecord = this.getLocalConsent();
    const isFirstConsent = !existingRecord || !existingRecord.consentGiven;
    const record = this.buildConsentRecord(options, existingRecord);

    this.persistLocally(record);

    if (options.consentGiven && isFirstConsent) {
      this.sendConsentToFirestore(record).catch((error) => {
        console.error('[ConsentService] Failed to save to Firestore:', error);
      });
    }
  }

  /**
   * Update usage statistics when user uses the widget
   * Usage stats are tracked LOCALLY only (not synced to Firestore)
   */
  static async trackUsage(): Promise<void> {
    const record = this.getLocalConsent();
    if (!record) {
      return;
    }

    const now = new Date().toISOString();
    record.usageCount++;
    record.lastUsedAt = now;

    // Save to LocalStorage ONLY (no Firestore sync)
    if (this.isLocalStorageAvailable()) {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(record));
      } catch (error) {
        console.error('[ConsentService] Failed to update usage in LocalStorage:', error);
      }
    } else {
      // Fallback to SessionStorage
      try {
        sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(record));
      } catch (error) {
        console.error('[ConsentService] Failed to update usage in SessionStorage:', error);
      }
    }
  }

  /**
   * Send consent record to Firestore for audit trail
   */
  private static async sendConsentToFirestore(
    record: ConsentRecord
  ): Promise<void> {
    // Use explicit VITE_SAVE_CONSENT_URL if configured, otherwise derive from INIT_ANALYZE_V2_URL
    let consentUrl = import.meta.env.VITE_SAVE_CONSENT_URL;

    if (!consentUrl) {
      const initAnalyzeUrl = import.meta.env.VITE_INIT_ANALYZE_V2_URL;
      if (!initAnalyzeUrl) {
        console.warn('[ConsentService] VITE_SAVE_CONSENT_URL and VITE_INIT_ANALYZE_V2_URL not configured');
        return;
      }

      // Extract base URL for consent endpoint
      const baseUrl = initAnalyzeUrl.replace(/\/initAnalyzeV2$/, '');
      consentUrl = `${baseUrl}/saveConsent`;
    }

    try {
      const response = await apiFetch(consentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('[ConsentService] Firestore save failed:', error);
      throw error;
    }
  }

  /**
   * Revoke consent (user opts out)
   */
  static async revokeConsent(): Promise<void> {
    // When revoking, checkboxes are considered unchecked
    await this.saveConsent({ consentGiven: false, method: 'explicit', checkboxMain: false, checkboxAge: false, uiLocale: 'en' });
  }

  /**
   * Delete all user data from the server and clear local storage.
   * Calls the deleteUserConsent backend endpoint (GDPR Art. 17 — Right to Erasure).
   */
  static async deleteUserData(): Promise<{ success: boolean; deletedCount: number }> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('No userId found — no data to delete');
    }

    let deleteUrl = import.meta.env.VITE_DELETE_CONSENT_URL;
    if (!deleteUrl) {
      const initAnalyzeUrl = import.meta.env.VITE_INIT_ANALYZE_V2_URL;
      if (!initAnalyzeUrl) {
        throw new Error('Backend URL not configured');
      }
      const baseUrl = initAnalyzeUrl.replace(/\/initAnalyzeV2$/, '');
      deleteUrl = `${baseUrl}/deleteUserConsent`;
    }

    const response = await apiFetch(deleteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin,
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok && response.status !== 404) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const result = response.ok
      ? await response.json()
      : { deletedCount: 0 };

    // Clear all local data regardless — if server has no data (404),
    // local data should still be removed (GDPR Right to Erasure)
    this.clearConsent();

    return { success: true, deletedCount: result.deletedCount || 0 };
  }

  /**
   * Get user ID (for debugging/support)
   */
  static getUserId(): string | null {
    const record = this.getLocalConsent();
    return record?.userId || null;
  }

  /**
   * Clear consent (for testing/development)
   */
  static clearConsent(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (_e) {
      // Ignore if LocalStorage not available
    }
    try {
      sessionStorage.removeItem(this.SESSION_KEY);
    } catch (_e) {
      // Ignore if SessionStorage not available
    }
  }

  /**
   * Check if policy version requires re-consent
   */
  static needsReConsent(): boolean {
    const record = this.getLocalConsent();
    if (!record) {
      return true; // No consent at all
    }

    return record.policyVersion !== this.CURRENT_POLICY_VERSION;
  }

  /**
   * Get consent summary for display
   */
  static getConsentSummary(): {
    hasConsent: boolean;
    userId: string | null;
    consentDate: string | null;
    policyVersion: string | null;
    usageCount: number;
  } {
    const record = this.getLocalConsent();
    if (!record) {
      return { hasConsent: false, userId: null, consentDate: null, policyVersion: null, usageCount: 0 };
    }
    return {
      hasConsent: record.consentGiven,
      userId: record.userId,
      consentDate: record.firstConsentAt,
      policyVersion: record.policyVersion,
      usageCount: record.usageCount,
    };
  }
}
