/**
 * Consent controller — handles consent modal logic.
 * Extracted from typeless-form.ts to reduce file size.
 */

import { ConsentService } from '../services/consent-service.ts';
import { ViewState } from '../types';
import type { TypelessFormHost } from '../types/widget-host.ts';

export async function handleAcceptConsentImpl(component: TypelessFormHost): Promise<void> {
  if (component.isSubmittingConsent) {return;}
  component.isSubmittingConsent = true;

  try {
    const uiLocale = component.translationService.getCurrentLang();
    await ConsentService.saveConsent({
      consentGiven: true, method: 'explicit',
      checkboxMain: component.consentCheckboxMain,
      checkboxAge: component.consentCheckboxAge, uiLocale,
    });
    component.showConsentModal = false;
    component.viewState = ViewState.Loading;
    component.requestUpdate();
    await component.updateComplete;
    component.handleFloatingButtonClick();
  } finally {
    setTimeout(() => { component.isSubmittingConsent = false; }, 1000);
  }
}

export function handleDeclineConsentImpl(component: TypelessFormHost): void {
  const uiLocale = component.translationService.getCurrentLang();
  ConsentService.saveConsent({
    consentGiven: false, method: 'explicit',
    checkboxMain: false, checkboxAge: false, uiLocale,
  });
  component.showConsentModal = false;
  component.requestUpdate();
}

export function handleShowPrivacySettingsImpl(component: TypelessFormHost): void {
  component.showPrivacySettings = true;
  component.deleteConfirmChecked = false;
  component.deleteDataSuccess = false;
  component.deleteDataError = '';
  component.requestUpdate();
}

export function handleClosePrivacySettingsImpl(component: TypelessFormHost): void {
  component.showPrivacySettings = false;
  // If data was deleted, also close the main modal and reset consent state
  if (component.deleteDataSuccess) {
    component.showConsentModal = false;
    component.viewState = ViewState.Hidden;
  }
  component.requestUpdate();
}

export async function handleDeleteDataImpl(component: TypelessFormHost): Promise<void> {
  if (component.isDeletingData) { return; }
  component.isDeletingData = true;
  component.deleteDataError = '';
  component.requestUpdate();

  try {
    await ConsentService.deleteUserData();
    component.deleteDataSuccess = true;
  } catch (error) {
    console.error('[Privacy] Failed to delete user data:', error);
    component.deleteDataError = error instanceof Error ? error.message : 'Unknown error';
  } finally {
    component.isDeletingData = false;
    component.requestUpdate();
  }
}
