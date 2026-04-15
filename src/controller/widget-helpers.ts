/**
 * Widget helper functions — extracted from typeless-form.ts to reduce file size.
 * Pure functions that operate on TypelessFormHost or DOM.
 */

import type { FieldDescriptor } from '../form-scanner/index.js';
import type { TypelessFormHost } from '../types/widget-host.ts';
import type { FormAssistantModal } from '../components/form-assistant-modal.js';
import { setTypelessApiKey } from '../utils/api-fetch.ts';

/** Check if we're in a local development environment */
export function isLocalEnvironment(): boolean {
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {return true;}
  if (host.endsWith('.local')) {return true;}
  if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host)) {return true;}
  return false;
}

/** Early guard to check if widget should initialize */
export function shouldInitializeImpl(component: TypelessFormHost): boolean {
  const apiKey = (component as unknown as HTMLElement).getAttribute?.('api-key')?.trim();
  if (apiKey) {
    component.apiKey = apiKey;
    setTypelessApiKey(apiKey);
  }
  return true;
}

const NON_DISPLAY_TYPES = new Set(['submit', 'reset', 'button', 'hidden']);

/**
 * Filters out service fields (submit buttons, hidden inputs, etc.)
 * Preserves the index property for proper filterMap generation
 */
export function getFieldsForDisplayImpl(allFields: FieldDescriptor[]): FieldDescriptor[] {
  return allFields.filter((field, originalIndex) => {
    const lowerType = (field.type ?? '').toLowerCase();
    if (NON_DISPLAY_TYPES.has(lowerType)) {return false;}
    if (!field.name && !field.label && !field.placeholder) {return false;}
    (field as FieldDescriptor & { index: number }).index = originalIndex;
    return true;
  });
}

/** Initialize renderless modal for test mode */
export function initializeRenderlessModalImpl(component: TypelessFormHost): void {
  const shadowRoot = (component as unknown as HTMLElement).shadowRoot;
  let modal = shadowRoot?.querySelector('form-assistant-modal[renderless]');
  if (!modal) {
    modal = document.createElement('form-assistant-modal');
    modal.setAttribute('renderless', '');
    shadowRoot?.appendChild(modal);
  }
  component.renderlessModal = modal as unknown as FormAssistantModal;
  bindProxyShell(component);
}

/** Bind proxy shell elements if they exist */
function bindProxyShell(component: TypelessFormHost): void {
  const shell = document.querySelector('#modal-proxy-shell');
  if (!shell || !component.renderlessModal) {return;}
  const openBtn = shell.querySelector('.proxy-open-button');
  const zIndexInput = shell.querySelector('.proxy-z-index-input');
  if (openBtn) {component.renderlessModal.bindProxyOpen(openBtn);}
  if (zIndexInput) {component.renderlessModal.bindProxyZIndex(zIndexInput);}
}

/** Evaluate widget visibility based on form detection */
export function evaluateWidgetVisibilityImpl(component: TypelessFormHost): void {
  const hasAnyForm = component.fieldsDetected > 0 || (component.formFieldDetector?.hasInputFields() ?? false);
  if (hasAnyForm && component.noFormsMessage) {
    if (component._noFormsHideTimer) {
      clearTimeout(component._noFormsHideTimer);
      component._noFormsHideTimer = null;
    }
    component.noFormsMessage = false;
    component.requestUpdate();
  }
}

/** Get the most visible form from the visibility map */
export function getCurrentVisibleFormImpl(component: TypelessFormHost): HTMLFormElement | null {
  let mostVisibleForm: HTMLFormElement | null = null;
  let maxVisibility = 0;
  component.visibleForms.forEach((isVisible, element) => {
    if (isVisible && element instanceof HTMLFormElement) {
      const visibility = component.getElementVisibilityRatio(element);
      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        mostVisibleForm = element;
      }
    }
  });
  return mostVisibleForm;
}

