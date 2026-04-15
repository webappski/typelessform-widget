import { lockBodyScroll, unlockBodyScroll } from '../lib/scroll-lock.js';
import { ViewState } from '../types';
import { ConsentService } from '../services/consent-service.ts';
import type { TypelessFormHost } from '../types/widget-host.js';
import type { FieldDescriptor } from '../form-scanner/index.js';
import type { SafeBadge, BadgeData, AifcGlobalState } from '../types/common-types.js';

interface WindowWithAifc {
  __aifc_state: AifcGlobalState | null;
  __aifc_guard?: { phase: string };
}

/** Set window.__aifc_state as a non-enumerable property so it doesn't leak in console/enumeration */
function setAifcState(value: AifcGlobalState | null): void {
  Object.defineProperty(window, '__aifc_state', {
    value,
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

/** Error classification rules: [pattern, translationKey, fallback] */
const ERROR_RULES: [RegExp, string, string][] = [
  [/Domain not allowed|DOMAIN_NOT_ALLOWED/, 'error.domainNotAllowed', 'This domain is not authorized to use the service'],
  [/HTTP 401|HTTP 403|INVALID_KEY|MISSING_KEY|INVALID_KEY_FORMAT/, 'error.invalidApiKey', 'Service is not configured correctly. Please contact the website administrator.'],
  [/HTTP 429.*QUOTA_EXHAUSTED|QUOTA_EXHAUSTED/, 'error.quotaExhausted', 'This service is currently unavailable. Please contact the website administrator.'],
  [/HTTP 429|RATE_LIMIT/, 'error.rateLimited', 'Service is busy right now. Please try again in a moment.'],
  [/timeout/, 'error.serviceUnavailable', 'Request timeout. Please try again.'],
  [/HTTP 5/, 'error.serviceUnavailable', 'Service temporarily unavailable. Please try again later.'],
  [/HTTP 4/, 'error.general', 'Request failed. Please try again.'],
  [/Invalid response|parse/, 'error.serviceUnavailable', 'Invalid server response. Please try again.'],
  [/Failed to fetch|NetworkError|ERR_NETWORK/, 'error.serviceUnavailable', 'Network error. Please check your connection and try again.'],
];

function mapErrorMessage(component: TypelessFormHost, e: { message?: string; toString(): string }): string {
  const msg = e.message || '';
  const match = ERROR_RULES.find(([pattern]) => pattern.test(msg));
  if (match) {
    return component.t(match[1]) || match[2];
  }
  return component.t('error.general') || 'Something went wrong. Please try again.';
}

// ── Helper: Pre-scan form fields ──
function prescanFormFields(component: TypelessFormHost): void {
  const prescanForm = component.selectActiveForm();
  if (prescanForm) {
    component.scannedFields = component.formFieldDetector ? component.formFieldDetector.scanForm(prescanForm) : [];
    component.fieldsDetected = component.scannedFields.length;
  } else {
    component.scanAllForms();
  }
}

// ── Helper: Check if cached fields match current fields ──
function doFieldsMatch(fieldsForDisplay: FieldDescriptor[], cachedInitData: { badges?: BadgeData[] } | null): boolean {
  const currentFieldNames = new Set(fieldsForDisplay.map((f: FieldDescriptor) => f.name));
  const cachedFieldNames = new Set((cachedInitData?.badges || []).map((b: BadgeData) => b.fieldId));
  return currentFieldNames.size === cachedFieldNames.size &&
         Array.from(currentFieldNames).every(name => cachedFieldNames.has(name));
}

// ── Helper: Validate cache is usable ──
function isCacheValid(component: TypelessFormHost, formId: string, fieldsForDisplay: FieldDescriptor[]): boolean {
  const cachedState = (window as unknown as WindowWithAifc).__aifc_state;
  const cachedInitData = component.__initAnalyzeV2;
  if (!cachedState || !cachedInitData || cachedInitData.formId !== formId) {return false;}
  const fieldsMatch = doFieldsMatch(fieldsForDisplay, cachedInitData);
  if (!fieldsMatch) {
    console.log('[CACHE-MISS] FormId matches but fields changed (wizard step?) - fetching fresh data');
    return false;
  }
  return true;
}

// ── Helper: Apply cached init data ──
function applyCachedData(component: TypelessFormHost): void {
  clearProgressTimer(component);
  setGuardPhase('open');
  component.hydrateFromInitData(component.__initAnalyzeV2!);
  if (component.renderlessModal) {component.renderlessModal.setOpen(true);}
  component.requestUpdate();
}

// ── Helper: Clear progress timer ──
function clearProgressTimer(component: TypelessFormHost): void {
  if (component.progressTimer) {
    clearInterval(component.progressTimer);
    component.progressTimer = null;
  }
}

// ── Helper: Set guard phase ──
function setGuardPhase(phase: string): void {
  const wnd = window as unknown as WindowWithAifc;
  if (!wnd.__aifc_guard) {
    Object.defineProperty(window, '__aifc_guard', {
      value: { phase: 'idle' },
      writable: true,
      enumerable: false,
      configurable: true,
    });
  }
  const g = wnd.__aifc_guard!;
  g.phase = phase;
}

// ── Helper: Try to use cached init data ──
function tryCacheHit(component: TypelessFormHost, formId: string, fieldsForDisplay: FieldDescriptor[]): boolean {
  if (!isCacheValid(component, formId, fieldsForDisplay)) {return false;}
  console.log('[CACHE-HIT] Using cached data for same form and fields');
  applyCachedData(component);
  return true;
}

// ── Helper: Reset init state before fresh fetch ──
function resetInitState(component: TypelessFormHost): void {
  setAifcState(null);
  if (component.initAbortController) {component.initAbortController.abort();}
  component.initAbortController = new AbortController();
  component.__initAnalyzeV2 = null;
  component.requestUpdate();
}

// ── Helper: Handle fetch error ──
function handleFetchError(component: TypelessFormHost, e: unknown): boolean {
  clearProgressTimer(component);
  const err = e as { name?: string; message?: string; toString(): string };
  if (err.name === 'AbortError') {
    component.viewState = ViewState.Hidden;
    return false;
  }
  component.currentStep = 'error';
  component.errorMessage = mapErrorMessage(component, err);
  component.errorDetails = err.message || err.toString();
  component.viewState = ViewState.Ready;
  component.requestUpdate();
  return false;
}

// ── Helper: Fetch fresh init data from server ──
async function fetchFreshInitData(component: TypelessFormHost, fieldsForDisplay: FieldDescriptor[]): Promise<boolean> {
  resetInitState(component);
  try {
    const initPromise = component.requestInitAnalyzeV2(fieldsForDisplay, component.initAbortController!.signal);
    await component.withTimeout(initPromise, 30000);
    return true;
  } catch (e: unknown) {
    return handleFetchError(component, e);
  } finally {
    component.initAbortController = null;
  }
}

// ── Helper: Handle DEBUG_SKIP_TO_SUCCESS mode ──
async function handleDebugSkipToSuccess(component: TypelessFormHost): Promise<void> {
  const mockFields = [
    { name: 'firstName', label: '\u0418\u043c\u044f', type: 'text', value: '\u0418\u0432\u0430\u043d', required: true },
    { name: 'lastName', label: '\u0424\u0430\u043c\u0438\u043b\u0438\u044f', type: 'text', value: '\u0418\u0432\u0430\u043d\u043e\u0432', required: true },
    { name: 'email', label: 'Email', type: 'email', value: 'ivan@example.com', required: true },
    { name: 'phone', label: '\u0422\u0435\u043b\u0435\u0444\u043e\u043d', type: 'tel', value: '+7 (999) 123-45-67', required: false },
    { name: 'birthDate', label: '\u0414\u0430\u0442\u0430 \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f', type: 'date', value: '1990-01-01', required: false },
    { name: 'address', label: '\u0410\u0434\u0440\u0435\u0441', type: 'text', value: '', required: false },
    { name: 'city', label: '\u0413\u043e\u0440\u043e\u0434', type: 'text', value: '', required: true },
    { name: 'postalCode', label: '\u0418\u043d\u0434\u0435\u043a\u0441', type: 'text', value: '', required: false },
    { name: 'country', label: '\u0421\u0442\u0440\u0430\u043d\u0430', type: 'select', value: '\u0420\u043e\u0441\u0441\u0438\u044f', required: true },
    { name: 'passport', label: '\u041f\u0430\u0441\u043f\u043e\u0440\u0442', type: 'text', value: '', required: false, isPrivate: true },
    { name: 'inn', label: '\u0418\u041d\u041d', type: 'text', value: '', required: false, isPrivate: true },
    { name: 'comment', label: '\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439', type: 'textarea', value: '\u0422\u0435\u0441\u0442\u043e\u0432\u044b\u0439 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439', required: false }
  ] as FieldDescriptor[];

  component.scannedFields = mockFields;
  component.fieldsDetected = mockFields.length;

  component.lastLLMResponse = {
    reply: '\u0424\u043e\u0440\u043c\u0430 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0430 (DEBUG MODE)',
    autofill: {
      firstName: '\u0418\u0432\u0430\u043d', lastName: '\u0418\u0432\u0430\u043d\u043e\u0432', email: 'ivan@example.com',
      phone: '+7 (999) 123-45-67', birthDate: '1990-01-01',
      country: '\u0420\u043e\u0441\u0441\u0438\u044f', comment: '\u0422\u0435\u0441\u0442\u043e\u0432\u044b\u0439 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439'
    },
    originalText: {
      firstName: '\u043c\u0435\u043d\u044f \u0437\u043e\u0432\u0443\u0442 \u0418\u0432\u0430\u043d', lastName: '\u0444\u0430\u043c\u0438\u043b\u0438\u044f \u0418\u0432\u0430\u043d\u043e\u0432',
      email: '\u043c\u043e\u0439 \u0438\u043c\u0435\u0439\u043b ivan@example.com', phone: '\u0442\u0435\u043b\u0435\u0444\u043e\u043d 999 123 45 67',
      birthDate: '\u0440\u043e\u0434\u0438\u043b\u0441\u044f \u043f\u0435\u0440\u0432\u043e\u0433\u043e \u044f\u043d\u0432\u0430\u0440\u044f \u0434\u0435\u0432\u044f\u043d\u043e\u0441\u0442\u043e\u0433\u043e \u0433\u043e\u0434\u0430',
      country: '\u0436\u0438\u0432\u0443 \u0432 \u0420\u043e\u0441\u0441\u0438\u0438', comment: '\u043d\u0430\u043f\u0438\u0448\u0438 \u0442\u0435\u0441\u0442\u043e\u0432\u044b\u0439 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439'
    }
  };

  component.originalUserText = component.lastLLMResponse.originalText || {};
  component.cachedSafeBadges = await component.generateSafeBadges(mockFields);

  if (component.cachedSafeBadges?.safeFields) {
    component.safeFieldNames = component.cachedSafeBadges.safeFields.map((f: SafeBadge) => f.name);
  }

  component.currentStep = 'success';
}

// ── Helper: Handle form ID change ──
function handleFormIdChange(component: TypelessFormHost, formId: string): void {
  if (component.currentFormId && component.currentFormId !== formId) {
    if (component.initAbortController) {
      component.initAbortController.abort();
      component.initAbortController = null;
    }
    component.showLoading();
  }
  component.currentFormId = formId;
}

// ── Helper: Show "no forms" message temporarily ──
function showNoFormsMessage(component: TypelessFormHost): void {
  component.noFormsMessage = true;
  component.requestUpdate();
  setTimeout(() => {
    component.noFormsMessage = false;
    component.requestUpdate();
  }, 5000);
}

// ── Helper: Start progress timer ──
function startProgressTimer(component: TypelessFormHost): void {
  component.viewState = ViewState.Loading;
  component.progressStage = 1;
  component.progressTimer = setInterval(() => {
    if (component.progressStage < 5) {
      component.progressStage++;
      component.requestUpdate();
    }
  }, 2500);
}

// ── Helper: Prepare modal and field elements map ──
function prepareModalAndFields(component: TypelessFormHost): void {
  lockBodyScroll();
  component.shadowRoot?.querySelector('.modal-overlay')?.classList.add('modal-opened');
  component.fieldElementsMap.clear();
  component.scannedFields.forEach((field: FieldDescriptor) => {
    if (field.element) {
      component.fieldElementsMap.set(field.name, field.element as HTMLElement);
    }
  });
  setGuardPhase('open');
}

// ── Helper: Fetch or use cache, then finalize ──
async function fetchOrCacheAndFinalize(component: TypelessFormHost, formId: string): Promise<void> {
  const fieldsForDisplay = component.getFieldsForDisplay
    ? component.getFieldsForDisplay(component.scannedFields)
    : component.scannedFields;

  if (tryCacheHit(component, formId, fieldsForDisplay)) {return;}

  const success = await fetchFreshInitData(component, fieldsForDisplay);
  if (!success) {return;}

  clearProgressTimer(component);
  if (component.renderlessModal) {component.renderlessModal.setOpen(true);}
  component.requestUpdate();
  component.updateFormHighlight();
}

// ── Helper: Check consent and show modal if needed. Returns true if should stop. ──
function ensureConsent(component: TypelessFormHost): boolean {
  if (ConsentService.hasValidConsent()) {return false;}
  component.showConsentModal = true;
  component.requestUpdate();
  return true;
}

// ── Helper: Select active form and prepare form ID ──
function setupActiveForm(component: TypelessFormHost): string {
  const activeForm = component.selectActiveForm();
  component.formValueApplier?.setActiveForm(activeForm);
  return activeForm?.id || 'form_' + Date.now();
}

export async function handleFloatingButtonClickImpl(component: TypelessFormHost, event?: Event): Promise<void> {
  if (event) { event.preventDefault(); event.stopPropagation(); }
  if (ensureConsent(component)) {return;}

  ConsentService.trackUsage().catch(err => console.warn('[ConsentService] Failed to track usage:', err));

  const formId = setupActiveForm(component);
  handleFormIdChange(component, formId);
  prescanFormFields(component);

  if (component.scannedFields.length === 0) { showNoFormsMessage(component); return; }

  startProgressTimer(component);
  component.updateFormHighlight();

  if (component.DEBUG_SKIP_TO_SUCCESS) { await handleDebugSkipToSuccess(component); return; }

  prepareModalAndFields(component);
  await fetchOrCacheAndFinalize(component, formId);
}

export function closeModalImpl(component: TypelessFormHost): void {
  if (component.initAbortController) {
    component.initAbortController.abort();
    component.initAbortController = null;
  }

  // Clear progress timer if running
  if (component.progressTimer) {
    clearInterval(component.progressTimer);
    component.progressTimer = null;
  }

  const g = (window as unknown as WindowWithAifc).__aifc_guard;
  if (g) {g.phase = 'idle';}
  component.viewState = ViewState.Hidden;

  // Update renderless modal if initialized
  if (component.renderlessModal) {
    component.renderlessModal.setOpen(false);
  }

  if (component.mediaRecorder && component.mediaRecorder.state !== 'inactive') {
    component.mediaRecorder.stop();
  }

  // Restore body scroll for all devices
  // This will restore the exact scroll position from before modal was opened
  unlockBodyScroll();

  // Remove class that disables transitions
  component.shadowRoot?.querySelector('.modal-overlay')?.classList.remove('modal-opened');

  component.clearFormHighlight();

  // MEMORY LEAK FIX: Forced cleanup before reset
  component.resetToInitial();

  // Additional cleanup after a short delay
  setTimeout(() => {
    component.requestUpdate(); // Force re-render
  }, 100);
}
