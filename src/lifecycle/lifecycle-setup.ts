// Lifecycle setup functions - extracted from lifecycle.ts
// Event handlers, reapply logic, proactive checks, navigation, visibility

import { setupNavigationInterceptor } from '../utils/navigation-interceptor';
import type { TypelessFormHost } from '../types/widget-host.js';
import type { FieldDescriptor } from '../form-scanner/index.js';
import type { MultiFormatValue } from '../llm-client.js';

type AutofillMap = { [key: string]: string | number | boolean | string[] | MultiFormatValue | undefined };
import {
  updateSafeInsetsIfChanged,
  getLiveElement,
  readCurrentDOMValue,
  normalizeExpectedValue,
  ensureFreshFieldElementsMap,
} from './lifecycle-helpers.ts';
import { setupFormVisibilityObserver } from './lifecycle-observers.ts';

// ── Setup scroll/resize/orientation handlers ──
export function setupEventHandlers(component: TypelessFormHost): void {
  component.scrollHandler = component.throttle(() => {
    component.updateActiveForm();
    const timeSinceApply = performance.now() - (component.lastApplyTimestamp || 0);
    if (timeSinceApply < 10000 && component.lastLLMResponse?.autofill) {
      component.checkAndReapplyIfNeeded();
    }
  }, 500);

  component.resizeHandler = component.throttle(() => {
    if (!component.userConfigApplied) {
      component.checkUserConfiguration();
    }
    updateSafeInsetsIfChanged(component);
    if (!component.autoPositionDisabled) {
      component.findSafePosition();
    }
    component.requestUpdate();
  }, 500);

  component.orientationChangeHandler = component.throttle(() => {
    updateSafeInsetsIfChanged(component);
    if (!component.autoPositionDisabled) {
      component.findSafePosition();
    }
    component.requestUpdate();
  }, 500);

  window.addEventListener('scroll', component.scrollHandler, { passive: true });
  window.addEventListener('resize', component.resizeHandler, { passive: true });
  window.addEventListener('orientationchange', component.orientationChangeHandler, { passive: true });
}

// ── Setup checkAndReapplyIfNeeded on component ──
export function setupCheckAndReapply(component: TypelessFormHost): void {
  component.checkAndReapplyIfNeeded = () => {
    if (component.formValueApplier?.hasActiveWork()) { return; }

    const autofill = component.lastLLMResponse?.autofill;
    if (!autofill) { return; }

    const savedNames = Object.keys(autofill);
    const currentNames = new Set((component.scannedFields || []).map((f: FieldDescriptor) => f.name));
    if (!savedNames.every(name => currentNames.has(name))) { return; }
    if (!ensureFreshFieldElementsMap(component, savedNames, 'VALUE-CHECK')) { return; }

    const mismatchCount = countMismatches(component, autofill);
    if (mismatchCount > 0) {
      reapplyAutofill(component, autofill);
    }
  };
}

function countMismatches(component: TypelessFormHost, autofill: AutofillMap): number {
  let count = 0;
  for (const [name, expectedValue] of Object.entries(autofill)) {
    const element = getLiveElement(component, name);
    if (!element) { continue; }

    const currentValue = readCurrentDOMValue(element);
    const expected = normalizeExpectedValue(expectedValue, element as HTMLInputElement | HTMLTextAreaElement);
    if (currentValue !== expected) { count++; }
  }
  return count;
}

function reapplyAutofill(component: TypelessFormHost, autofill: AutofillMap): void {
  const activeForm = component.selectActiveForm();
  if (activeForm && component.formValueApplier) {
    component.formValueApplier.applyValues(autofill, activeForm);
    component.lastApplyTimestamp = performance.now();
  }
}

// ── Setup proactive VALUE-CHECK for React forms ──
export function setupProactiveValueCheck(component: TypelessFormHost): void {
  component.startProactiveValueCheck = (windowMs = 5000) => {
    const ctx = { startTime: performance.now(), stableTicks: 0 };

    const checkInterval = setInterval(() => {
      const result = runProactiveCheck(component, ctx, windowMs, () => { clearInterval(checkInterval); });
      if (result === 'reapplied') { ctx.stableTicks = 0; }
      if (result === 'stable') { ctx.stableTicks++; }
    }, 300);

    component.proactiveCheckInterval = checkInterval;
  };
}

function shouldStopProactiveCheck(
  component: TypelessFormHost,
  ctx: { startTime: number; stableTicks: number },
  windowMs: number,
  stopInterval: () => void
): boolean {
  const elapsed = performance.now() - ctx.startTime;
  if (elapsed > windowMs || ctx.stableTicks >= 5) { stopInterval(); return true; }
  if (component.userIsEditingFields) { stopInterval(); return true; }
  return false;
}

function runProactiveCheck(
  component: TypelessFormHost,
  ctx: { startTime: number; stableTicks: number },
  windowMs: number,
  stopInterval: () => void
): 'stop' | 'reapplied' | 'stable' {
  if (shouldStopProactiveCheck(component, ctx, windowMs, stopInterval)) { return 'stop'; }

  const autofill = component.lastLLMResponse?.autofill;
  if (!autofill) { return 'stop'; }

  const activeForm = component.selectActiveForm();
  if (!activeForm || !component.formValueApplier) { return 'stop'; }
  if (component.formValueApplier.hasActiveWork?.()) { return 'stop'; }

  if (needsProactiveReapply(component, autofill)) {
    return doProactiveReapply(component, autofill, activeForm, stopInterval);
  }
  return 'stable';
}

function needsProactiveReapply(component: TypelessFormHost, autofill: AutofillMap): boolean {
  for (const [name, expectedValue] of Object.entries(autofill)) {
    const el = component.fieldElementsMap?.get(name);
    if (!el || !el.isConnected) { return true; }
    const currentValue = (el as unknown as HTMLInputElement).value ?? '';
    if (currentValue !== String(expectedValue)) { return true; }
  }
  return false;
}

function doProactiveReapply(
  component: TypelessFormHost,
  autofill: AutofillMap,
  activeForm: HTMLFormElement,
  stopInterval: () => void
): 'stop' | 'reapplied' {
  const fieldNames = Object.keys(autofill);
  if (!ensureFreshFieldElementsMap(component, fieldNames, 'PROACTIVE-CHECK')) {
    stopInterval();
    return 'stop';
  }

  component.formValueApplier!.updateConfig({
    safeFieldNames: component.safeFieldNames,
    fieldElementsMap: component.fieldElementsMap,
    scannedFields: component.scannedFields
  });

  component.formValueApplier!.applyValues(autofill, activeForm);
  return 'reapplied';
}

// ── Setup SPA navigation handler ──
export function setupNavigationHandler(component: TypelessFormHost): void {
  component.navigationHandler = () => {
    component.hasEverBeenVisibleOnThisPage = false;
    component.userClosedManually = false;
    component.noFormsMessage = false;

    component.visibleForms.clear();
    component.scanAllForms();

    updateSafeInsetsIfChanged(component);
    component.findSafePosition();
    component.evaluateWidgetVisibility();
  };

  component.navigationRetryTimers = [];

  component.navigationCleanup = setupNavigationInterceptor(() => {
    clearNavigationTimers(component);
    component.navigationHandler!();
    scheduleVisibilityReevaluations(component);
    scheduleAutofillReapply(component);
  });
}

function clearNavigationTimers(component: TypelessFormHost): void {
  if (Array.isArray(component.navigationRetryTimers)) {
    component.navigationRetryTimers.forEach((id: number) => clearTimeout(id));
  }
  component.navigationRetryTimers = [];
}

function scheduleVisibilityReevaluations(component: TypelessFormHost): void {
  const reevaluateVisibility = () => {
    component.scanAllForms();
    component.evaluateWidgetVisibility();
  };

  for (const ms of [100, 300, 600]) {
    const timerId = window.setTimeout(reevaluateVisibility, ms);
    component.navigationRetryTimers.push(timerId);
  }
}

function scheduleAutofillReapply(component: TypelessFormHost): void {
  const autofill = component.lastLLMResponse?.autofill;
  if (!autofill || Object.keys(autofill).length === 0) { return; }

  for (const ms of [0, 200, 500, 1000]) {
    const timerId = window.setTimeout(() => reapplyAfterNavigation(component, autofill), ms);
    component.navigationRetryTimers.push(timerId);
  }
}

function reapplyAfterNavigation(component: TypelessFormHost, autofill: AutofillMap): void {
  if (!component.formValueApplier) { return; }
  if (component.formValueApplier.hasActiveWork?.()) { return; }

  const activeForm = component.selectActiveForm?.();
  if (!activeForm) { return; }

  const savedNames = Object.keys(autofill);
  const currentNames = new Set((component.scannedFields || []).map((f: FieldDescriptor) => f.name));
  if (!savedNames.every(name => currentNames.has(name))) { return; }

  component.formValueApplier.updateConfig({
    safeFieldNames: component.safeFieldNames,
    fieldElementsMap: component.fieldElementsMap,
    scannedFields: component.scannedFields
  });

  component.formValueApplier.applyValues(autofill, activeForm);
}

// ── Setup global focus handler ──
export function setupGlobalFocusHandler(component: TypelessFormHost): void {
  component.globalFocusHandler = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
      const form = target.closest('form') as HTMLFormElement;
      if (form && form !== component.focusedForm) {
        component.focusedForm = form;
        component.updateActiveForm();
        component.updateFormHighlight();
      }
    } else if (component.focusedForm) {
      component.focusedForm = null;
      component.updateActiveForm();
      component.updateFormHighlight();
    }
  };
  document.addEventListener('focusin', component.globalFocusHandler, true);
}

// ── Setup widget show timer and visibility tracking ──
export function setupWidgetVisibility(component: TypelessFormHost): void {
  const hasInputFields = component.formFieldDetector
    ? component.formFieldDetector.hasInputFields()
    : false;

  const startShowTimer = createShowTimerStarter(component);

  if (component.fieldsDetected > 0 || hasInputFields) {
    initVisibilityWithFields(component, startShowTimer);
  } else {
    initVisibilityWithoutFields(component, startShowTimer);
  }

  const formObserver = createFormMutationObserver(component, startShowTimer);

  setupFormVisibilityObserver(component, startShowTimer, formObserver);
}

function createShowTimerStarter(component: TypelessFormHost): () => void {
  return () => {
    if (component.initialShowTimer) { return; }

    const hasVisibleForm = Array.from(component.visibleForms.values()).some(Boolean) ||
      component.isAnyFormVisible10 ||
      document.querySelectorAll('input:not([type="hidden"]), textarea, select').length > 0;

    if (!hasVisibleForm) { return; }

    component.initialShowTimer = setTimeout(() => {
      component.hideWidget = false;
      component.requestUpdate();
      if (component.fieldsDetected > 0 || (component.formFieldDetector?.hasInputFields() ?? false)) {
        component.hasEverBeenVisibleOnThisPage = true;
      }
    }, component.showDelay);
  };
}

function initVisibilityWithFields(component: TypelessFormHost, startShowTimer: () => void): void {
  if (component.formsIntersectionObserver) {
    const forms = document.querySelectorAll('form');
    if (forms.length === 0) {
      component.isAnyFormVisible10 = false;
    }
  }
  startShowTimer();

  const immediateShowHandler = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
      const form = target.closest('form');
      if (form) {
        if (component.initialShowTimer) {
          clearTimeout(component.initialShowTimer);
          component.initialShowTimer = null;
        }
        component.hideWidget = false;
        document.removeEventListener('focusin', immediateShowHandler, true);
      }
    }
  };
  document.addEventListener('focusin', immediateShowHandler, true);
}

function initVisibilityWithoutFields(component: TypelessFormHost, startShowTimer: () => void): void {
  setTimeout(() => {
    component.scanAllForms();
    const hasInputs = component.formFieldDetector ? component.formFieldDetector.hasInputFields() : false;
    if (component.fieldsDetected > 0 || hasInputs) {
      startShowTimer();
    }
  }, 1000);
}

function createFormMutationObserver(component: TypelessFormHost, startShowTimer: () => void): MutationObserver {
  const formObserver = new MutationObserver(() => {
    if (!component.initialShowTimer && component.hideWidget) {
      const currentHasInputFields = document.querySelectorAll('input, textarea, select').length > 0;
      if (currentHasInputFields) {
        startShowTimer();
        formObserver.disconnect();
      }
    }
  });

  formObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
  });

  return formObserver;
}
