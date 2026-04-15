// Lifecycle observer setup - extracted from lifecycle.ts
// MutationObserver, IntersectionObserver, and obstruction observers

import { collectObstructions, findObstructionNodes } from '../lib/guards.ts';
import type { TypelessFormHost } from '../types/widget-host.js';
import {
  getFormTopologySignature,
  lastFormTopologyHash,
  setLastFormTopologyHash,
  checkBodyInputsVisibility,
} from './lifecycle-helpers.ts';

// ── Handle mutation observer re-apply logic when modal is closed ──
function handleClosedModalReapply(component: TypelessFormHost): void {
  if (!component.__pendingCommitCheck) {
    component.__pendingCommitCheck = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        component.__pendingCommitCheck = false;
        if (!component.showModal && !component.formValueApplier?.hasActiveWork()) {
          component.checkAndReapplyIfNeeded();
        }
      });
    });
  }
}

// ── Handle mutation observer re-apply logic when modal is open ──
function handleOpenModalReapply(component: TypelessFormHost, activeForm: HTMLFormElement): void {
  setTimeout(() => {
    if (component.formValueApplier && component.lastLLMResponse?.autofill) {
      component.formValueApplier.updateConfig({
        safeFieldNames: component.safeFieldNames,
        fieldElementsMap: component.fieldElementsMap,
        scannedFields: component.scannedFields
      });

      component.formValueApplier.applyValues(
        component.lastLLMResponse.autofill,
        activeForm
      );
    }
  }, 100);
}

// ── Mutation callback logic: detect form topology changes and reapply ──
function handleMutationBatch(component: TypelessFormHost, mutations: MutationRecord[]): void {
  if (isOwnMutation(component, mutations)) { return; }

  const activeForm = component.selectActiveForm();
  const newSig = getFormTopologySignature(activeForm);

  if (newSig === lastFormTopologyHash && newSig !== '') { return; }
  if (component.showModal || component.formValueApplier?.hasActiveWork()) { return; }

  setLastFormTopologyHash(newSig);
  component.scanAllForms();
  component.evaluateWidgetVisibility();

  reapplyAfterTopologyChange(component, activeForm);
}

function reapplyAfterTopologyChange(component: TypelessFormHost, activeForm: HTMLFormElement | null): void {
  const hasAutofill = component.lastLLMResponse?.autofill &&
    Object.keys(component.lastLLMResponse.autofill).length > 0;

  if (!hasAutofill || !activeForm) { return; }

  if (!component.showModal) {
    handleClosedModalReapply(component);
  } else {
    handleOpenModalReapply(component, activeForm);
  }
}

function isOwnMutation(component: TypelessFormHost, mutations: MutationRecord[]): boolean {
  const widgetRoot = component.shadowRoot?.host || component;
  return mutations.every((m: MutationRecord) =>
    m.type === 'childList' &&
    m.addedNodes.length + m.removedNodes.length > 0 &&
    Array.from(m.addedNodes).concat(Array.from(m.removedNodes)).every((node: Node) =>
      (widgetRoot as Node).contains(node)
    )
  );
}

// ── Setup DOM mutation observer for form changes ──
export function setupMutationObserver(component: TypelessFormHost): void {
  component.mutationObserver = new MutationObserver(component.throttle((...args: unknown[]) => {
    handleMutationBatch(component, args as MutationRecord[]);
  }, 1000));
  component.mutationObserver.observe(document.body, { childList: true, subtree: true });
}

// ── Setup IntersectionObserver for forms visibility ──
export function setupFormsIntersectionObserver(component: TypelessFormHost): void {
  if (typeof IntersectionObserver !== 'undefined') {
    component.formsIntersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const isVisible = entry.intersectionRatio >= 0.1;
        component.visibleForms.set(entry.target, isVisible);
      });

      component.isAnyFormVisible10 = Array.from(component.visibleForms.values()).some(Boolean);
      component.evaluateWidgetVisibility();
    }, { threshold: [0, 0.1] });
  }
}

// ── Setup obstruction observers ──
export function setupObstructionObservers(component: TypelessFormHost): void {
  setupObstructionMutationObserver(component);
  component.obstructionResizeObserver = null;
  component.trackedObstructionNodes = new Set<HTMLElement>();

  const updateResizeObserver = () => {
    refreshObstructionResizeObserver(component);
  };

  updateResizeObserver();
  component.obstructionNodesUpdateInterval = setInterval(updateResizeObserver, 2000);
}

function setupObstructionMutationObserver(component: TypelessFormHost): void {
  component.obstructionsObserver = new MutationObserver(component.throttle(() => {
    const newInsets = collectObstructions();
    if (JSON.stringify(newInsets) !== JSON.stringify(component.safeInsets)) {
      component.safeInsets = newInsets;
      component.findSafePosition();
      component.requestUpdate();
    }
  }, 200));

  component.obstructionsObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });
}

function refreshObstructionResizeObserver(component: TypelessFormHost): void {
  if (typeof ResizeObserver === 'undefined') { return; }

  const obstructionNodes = findObstructionNodes();
  const nodesChanged = obstructionNodes.size !== component.trackedObstructionNodes.size ||
    ![...obstructionNodes].every(node => component.trackedObstructionNodes.has(node));

  if (!nodesChanged) { return; }

  if (component.obstructionResizeObserver) {
    component.obstructionResizeObserver.disconnect();
  }

  component.obstructionResizeObserver = new ResizeObserver(component.throttle(() => {
    const newInsets = collectObstructions();
    if (JSON.stringify(newInsets) !== JSON.stringify(component.safeInsets)) {
      component.safeInsets = newInsets;
      component.findSafePosition();
      component.requestUpdate();
    }
  }, 200));

  obstructionNodes.forEach(node => {
    component.obstructionResizeObserver!.observe(node);
  });

  component.trackedObstructionNodes = obstructionNodes;
}

// ── Setup form visibility IntersectionObserver ──
export function setupFormVisibilityObserver(
  component: TypelessFormHost,
  startShowTimer: () => void,
  formObserver: MutationObserver
): void {
  const VISIBILITY_THRESHOLD = 0.10;

  if ('IntersectionObserver' in window) {
    setupIntersectionBasedVisibility(component, startShowTimer, formObserver, VISIBILITY_THRESHOLD);
  } else {
    setupVisibilityFallback(component, startShowTimer, VISIBILITY_THRESHOLD);
  }
}

function setupIntersectionBasedVisibility(
  component: TypelessFormHost,
  startShowTimer: () => void,
  formObserver: MutationObserver,
  threshold: number
): void {
  component.formVisibilityObserver = new IntersectionObserver(
    (entries) => {
      handleVisibilityEntries(component, entries, startShowTimer, threshold);
    },
    { threshold: [threshold] }
  );

  const observeForms = () => {
    refreshFormObservation(component);
  };

  observeForms();
  scheduleVisibilityFallbackCheck(component, startShowTimer, threshold);
  replaceFormMutationObserver(component, formObserver, observeForms, startShowTimer);
}

function handleVisibilityEntries(
  component: TypelessFormHost,
  entries: IntersectionObserverEntry[],
  startShowTimer: () => void,
  threshold: number
): void {
  entries.forEach(entry => {
    const isVisible = entry.isIntersecting && entry.intersectionRatio >= threshold;
    component.visibleForms.set(entry.target, isVisible);
  });

  let hasVisibleForm = Array.from(component.visibleForms.values()).some(Boolean);

  if (!hasVisibleForm) {
    hasVisibleForm = checkBodyEntries(component, entries, threshold);
  }

  updateTimerFromVisibility(component, hasVisibleForm, startShowTimer);
}

function checkBodyEntries(
  component: TypelessFormHost,
  entries: IntersectionObserverEntry[],
  threshold: number
): boolean {
  for (const entry of entries) {
    if (entry.target === document.body && entry.isIntersecting) {
      if (checkBodyInputsVisibility(component, threshold)) {
        return true;
      }
    }
  }
  return false;
}

function updateTimerFromVisibility(
  component: TypelessFormHost,
  hasVisibleForm: boolean,
  startShowTimer: () => void
): void {
  if (hasVisibleForm && !component.initialShowTimer && component.hideWidget) {
    startShowTimer();
  } else if (!hasVisibleForm && component.initialShowTimer) {
    clearTimeout(component.initialShowTimer);
    component.initialShowTimer = null;
  }
}

function refreshFormObservation(component: TypelessFormHost): void {
  if (!component.formVisibilityObserver) { return; }
  component.formVisibilityObserver.disconnect();

  for (const [element] of component.visibleForms) {
    if (!element.isConnected) {
      component.visibleForms.delete(element);
    }
  }

  document.querySelectorAll('form').forEach(form => {
    if (!component.visibleForms.has(form)) {
      component.visibleForms.set(form, false);
    }
  });

  component.visibleForms.forEach((_: boolean, element: Element) => {
    component.formVisibilityObserver!.observe(element);
  });
}

function scheduleVisibilityFallbackCheck(
  component: TypelessFormHost,
  startShowTimer: () => void,
  threshold: number
): void {
  setTimeout(() => {
    if (!component.hideWidget || component.initialShowTimer) { return; }

    let hasVisibleForm = false;
    component.visibleForms.forEach((_: boolean, element: Element) => {
      const ratio = component.getElementVisibilityRatio(element);

      if (element === document.body) {
        if (checkBodyInputsVisibility(component, threshold)) {
          hasVisibleForm = true;
        }
      } else if (ratio >= threshold) {
        hasVisibleForm = true;
      }
    });

    if (hasVisibleForm) {
      startShowTimer();
    }
  }, 100);
}

function replaceFormMutationObserver(
  component: TypelessFormHost,
  formObserver: MutationObserver,
  observeForms: () => void,
  startShowTimer: () => void
): void {
  const extendedFormObserver = new MutationObserver(() => {
    if (!component.initialShowTimer && component.hideWidget) {
      const currentHasInputFields = document.querySelectorAll('input, textarea, select').length > 0;
      if (currentHasInputFields) {
        observeForms();
        startShowTimer();
      }
    }
    observeForms();
  });

  formObserver.disconnect();
  extendedFormObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
  });
}

function setupVisibilityFallback(component: TypelessFormHost, startShowTimer: () => void, threshold: number): void {
  const checkFormVisibility = () => {
    let hasVisibleForm = false;
    component.visibleForms.forEach((_: boolean, element: Element) => {
      const visibility = component.getElementVisibilityRatio(element);
      if (visibility >= threshold) {
        hasVisibleForm = true;
      }
    });

    if (!hasVisibleForm && document.querySelectorAll('input:not([type="hidden"]), textarea, select').length > 0) {
      hasVisibleForm = true;
    }

    updateTimerFromVisibility(component, hasVisibleForm, startShowTimer);
  };

  window.addEventListener('scroll', checkFormVisibility, { passive: true });
  window.addEventListener('resize', checkFormVisibility, { passive: true });
  component._formVisibilityFallback = checkFormVisibility;

  checkFormVisibility();
}
