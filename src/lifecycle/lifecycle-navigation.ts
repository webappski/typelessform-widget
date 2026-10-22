// SPA navigation handler - extracted from lifecycle-setup.ts
// Rescans and writes the last answer back after the page changes its URL.

import { setupNavigationInterceptor, type NavigationKind } from '../utils/navigation-interceptor';
import { widgetWroteWithin } from '../lib/widget-write.js';
import type { TypelessFormHost } from '../types/widget-host.js';
import type { FieldDescriptor } from '../form-scanner/index.js';
import type { MultiFormatValue } from '../llm-client.js';
import { updateSafeInsetsIfChanged } from './lifecycle-helpers.ts';

type AutofillMap = { [key: string]: string | number | boolean | string[] | MultiFormatValue | undefined };

// Passes writing the answer back after a navigation (ms): a route renders its form later, at times twice.
const AUTOFILL_REAPPLY_MS = [0, 200, 500, 1000];
const NEW_ROUTE_RESTORE_MS = AUTOFILL_REAPPLY_MS[AUTOFILL_REAPPLY_MS.length - 1] + 500;
// A URL change this soon after a write of the widget is the page's answer to that write (a router
// that pushes the field's value into the URL, at once or after a short debounce), not a new route.
const PAGE_REPLY_MS = 1000;

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

  // Until when the passes after the last new route give a field mounted anew its own rewrite.
  let newRouteRestoresUntil = 0;

  component.navigationCleanup = setupNavigationInterceptor((kind: NavigationKind) => {
    // pushState, back or forward is a new route: every field may be written back once more
    // (fill-ledger.ts). replaceState (a page keeping its state in the URL) and a URL change
    // answering the widget's own write give nothing back, or a field the page undoes loops.
    if (kind !== 'replace' && !widgetWroteWithin(PAGE_REPLY_MS)) {
      component.formValueApplier?.newRoute();
      newRouteRestoresUntil = performance.now() + NEW_ROUTE_RESTORE_MS;
    }
    clearNavigationTimers(component);
    component.navigationHandler!();
    scheduleVisibilityReevaluations(component);
    scheduleAutofillReapply(component, () => performance.now() <= newRouteRestoresUntil);
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

function scheduleAutofillReapply(component: TypelessFormHost, afterNewRoute: () => boolean): void {
  const autofill = component.lastLLMResponse?.autofill;
  if (!autofill || Object.keys(autofill).length === 0) { return; }

  for (const ms of AUTOFILL_REAPPLY_MS) {
    const timerId = window.setTimeout(() => reapplyAfterNavigation(component, autofill, afterNewRoute()), ms);
    component.navigationRetryTimers.push(timerId);
  }
}

function reapplyAfterNavigation(component: TypelessFormHost, autofill: AutofillMap, afterNewRoute: boolean): void {
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

  component.formValueApplier.reapplyValues(autofill, activeForm, { afterNewRoute });
}
