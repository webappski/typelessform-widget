/**
 * Widget version — MUST equal the `version` field in package.json.
 *
 * It is not a cosmetic string: it is stamped into every consent receipt
 * (`consent-service.ts` → `widgetVersion` and the composed `modalVersion`,
 * kept as GDPR Art. 7(1) proof) and into error reports. Until 2026-09-16 this
 * constant still read "1.0.0-beta.1" while the package shipped 1.0.7, so those
 * legal records named a version no user was running. `tests/version-sync.test.mjs`
 * now fails the moment the two drift apart again.
 */
export const WIDGET_VERSION = "1.0.8";

/**
 * Debug flag for skipping to success step (must be false in production)
 */
export const DEBUG_SKIP_TO_SUCCESS = false;