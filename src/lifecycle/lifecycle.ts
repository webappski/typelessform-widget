// Lifecycle orchestrator - main entry point for lifecycle callbacks
// Sub-modules: lifecycle-helpers.ts, lifecycle-observers.ts, lifecycle-setup.ts

import { FormValueApplier } from '../core/services/form-value-applier/index';
import { buildFieldElementsMap } from '../form/postprocess.ts';
import { collectObstructions } from '../lib/guards.ts';
import type { TypelessFormHost } from '../types/widget-host.js';
import type { FieldDescriptor } from '../form-scanner/index.js';
import type { WindowWithAifc } from './lifecycle-helpers.ts';
import {
  setupMutationObserver,
  setupFormsIntersectionObserver,
  setupObstructionObservers,
} from './lifecycle-observers.ts';
import {
  setupEventHandlers,
  setupCheckAndReapply,
  setupProactiveValueCheck,
  setupNavigationHandler,
  setupGlobalFocusHandler,
  setupWidgetVisibility,
} from './lifecycle-setup.ts';

// ── Leak detector for Zero-Delta guard ──
function scheduleLeakDetector(): void {
  setTimeout(() => {
    const entries = performance?.getEntriesByType('resource') || [];
    const leaks = entries.filter((e: PerformanceEntry) =>
      /detectLanguage|detectSensitive|generateBadges|translateText|initAnalyzeV2/.test(e.name)
    );
    if (leaks.length) {
      console.error('[AIFC_INIT][LEAK] Network calls detected before trigger click:', leaks);
    }
  }, 0);
}

// ── Initialize component configuration and position ──
function initComponentConfig(component: TypelessFormHost): void {
  component.checkUserConfiguration();
  if (!component.autoPositionDisabled) {
    component.findSafePosition();
  }
  component.calculateSmartZIndex();
}

export async function connectedCallbackImpl(component: TypelessFormHost): Promise<void> {
  component.hideWidget = true;

  await component.initializeI18n();
  component.injectGlobalStyles();

  Object.defineProperty(window, '__aifc_guard', {
    value: { phase: 'idle' },
    writable: true,
    enumerable: false,
    configurable: true,
  });
  scheduleLeakDetector();

  component.lastApplyTimestamp = 0;

  setupEventHandlers(component);
  setupCheckAndReapply(component);
  setupProactiveValueCheck(component);
  setupNavigationHandler(component);
  setupMutationObserver(component);

  initComponentConfig(component);
  setupGlobalFocusHandler(component);

  component.safeInsets = collectObstructions();

  setupFormsIntersectionObserver(component);
  setupObstructionObservers(component);
  component.scanAllForms();
  setupWidgetVisibility(component);
}

// ── Cleanup helpers ──
function cleanupTimers(component: TypelessFormHost): void {
  if (component.initialShowTimer) {
    clearTimeout(component.initialShowTimer);
    component.initialShowTimer = null;
  }
  if (component.proactiveCheckInterval) {
    clearInterval(component.proactiveCheckInterval);
    component.proactiveCheckInterval = null;
  }
  if (component.obstructionNodesUpdateInterval) {
    clearInterval(component.obstructionNodesUpdateInterval);
    component.obstructionNodesUpdateInterval = null;
  }
  if (component.navigationRetryTimers) {
    component.navigationRetryTimers.forEach((id: number) => clearTimeout(id));
    component.navigationRetryTimers = [];
  }
}

function cleanupObservers(component: TypelessFormHost): void {
  if (component.formsIntersectionObserver) {
    component.formsIntersectionObserver.disconnect();
    component.formsIntersectionObserver = null;
    component.visibleForms.clear();
  }
  if (component.formVisibilityObserver) {
    component.formVisibilityObserver.disconnect();
    component.formVisibilityObserver = null;
  }
  if (component.obstructionsObserver) {
    component.obstructionsObserver.disconnect();
    component.obstructionsObserver = null;
  }
  if (component.obstructionResizeObserver) {
    component.obstructionResizeObserver.disconnect();
    component.obstructionResizeObserver = null;
  }
  if (component.mutationObserver) {
    component.mutationObserver.disconnect();
  }
  component.trackedObstructionNodes = new Set();
}

function cleanupEventListeners(component: TypelessFormHost): void {
  if (component.userEditListener && component.userEditListenerForm) {
    component.userEditListenerForm.removeEventListener('input', component.userEditListener, true);
    component.userEditListener = null;
    component.userEditListenerForm = null;
  }
  component.userIsEditingFields = false;

  if (component._formVisibilityFallback) {
    window.removeEventListener('scroll', component._formVisibilityFallback);
    window.removeEventListener('resize', component._formVisibilityFallback);
    component._formVisibilityFallback = null;
  }

  if (component.globalFocusHandler) {
    document.removeEventListener('focusin', component.globalFocusHandler, true);
  }
  if (component.scrollHandler) {
    window.removeEventListener('scroll', component.scrollHandler);
  }
  if (component.resizeHandler) {
    window.removeEventListener('resize', component.resizeHandler);
  }
  if (component.orientationChangeHandler) {
    window.removeEventListener('orientationchange', component.orientationChangeHandler);
  }
  if (component.navigationCleanup) {
    component.navigationCleanup();
    component.navigationCleanup = null;
  }
}

function cleanupResources(component: TypelessFormHost): void {
  if (component.focusedForm) {
    component.focusedForm.classList.remove('ai-form-active-glow');
  }
  if (component.audioRecorder) {
    component.audioRecorder.stopRecording();
    component.audioRecorder = null;
  }
  if (component.mediaRecorder && component.mediaRecorder.state !== 'inactive') {
    component.mediaRecorder.stop();
  }
}

export function disconnectedCallbackImpl(component: TypelessFormHost): void {
  cleanupTimers(component);
  cleanupEventListeners(component);
  cleanupObservers(component);

  component.clearDOMElements();
  component.languageCache.clear();
  cleanupResources(component);
  component.clearFormHighlight();

  const styleElement = document.getElementById('ai-copilot-form-styles');
  if (styleElement) {
    styleElement.remove();
  }

  component.highlightedForm = null;
  component.focusedForm = null;
  component.mediaRecorder = null;
  component.audioRecorder = null;
  component.mutationObserver = null;
}

// ── firstUpdated: handle focused form scanning ──
function handleActiveElementOnFirstUpdate(component: TypelessFormHost): void {
  const activeElement = document.activeElement;
  if (!activeElement || activeElement === document.body) { return; }
  if ((component as unknown as Node).contains(activeElement)) { return; }

  const activeForm = activeElement.closest('form');
  if (!activeForm) { return; }

  component.focusedForm = activeForm;
  if (component.formFieldDetector) {
    component.scannedFields = component.formFieldDetector.scanForm(component.focusedForm);
    component.fieldsDetected = component.scannedFields.length;
  }

  buildFieldElementsMap(component.scannedFields, component.fieldElementsMap);
  component.scannedFields.forEach((field: FieldDescriptor) => {
    if (field.element) {
      // Element reference already populated in fieldElementsMap
    }
  });
}

export function firstUpdatedImpl(component: TypelessFormHost): void {
  component._scanner.initializeServices(component.translationService);

  if ((window as unknown as WindowWithAifc).AFC_TEST_FLAGS?.useRenderlessModal === true) {
    component.initializeRenderlessModal();
  }

  component.formValueApplier = new FormValueApplier({
    safeFieldNames: component.safeFieldNames,
    fieldElementsMap: component.fieldElementsMap,
    scannedFields: component.scannedFields,
    privacyChecker: component.privacyChecker ?? undefined
  });

  component.scanAllForms();
  handleActiveElementOnFirstUpdate(component);

  component.getFormLanguage().then((language: string) => {
    component.detectedLanguage = language;
    component.requestUpdate();
  });

  if ((window as unknown as WindowWithAifc).AFC_TEST_FLAGS?.useRenderlessModal === true) {
    /* noop - required by linter */
  }
}
