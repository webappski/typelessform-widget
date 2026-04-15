/**
 * Consent step template — progressive disclosure consent overlay
 */

import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { icons } from '../../constants/icons.js';
import { renderModalHeader } from './shared.js';

export interface RenderConsentOptions {
  t: (key: string) => string;
  handleAcceptConsent: () => void;
  handleDeclineConsent: () => void;
  consentCheckboxMain: boolean;
  consentCheckboxAge: boolean;
  toggleConsentCheckboxMain: () => void;
  toggleConsentCheckboxAge: () => void;
}

/** Render the consent header */
function renderConsentHeader(t: (key: string) => string, handleDecline: () => void): TemplateResult {
  return renderModalHeader({
    titleId: 'typeless-modal-title',
    title: t('consent.title'),
    subtitle: t('consent.subtitle'),
    closeHandler: handleDecline,
  });
}

/** Render warning banner */
function renderWarningBanner(t: (key: string) => string): TemplateResult {
  return html`
    <div class="consent-warning-banner">
      <div class="consent-warning-icon">${unsafeHTML(icons.warningTriangle24)}</div>
      <div class="consent-warning-body">
        <h4 class="consent-warning-title">${t('consent.warning_title')}</h4>
        <p class="consent-warning-text">${t('consent.warning')}</p>
      </div>
    </div>
  `;
}

/** Render summary sections (always visible) */
function renderSummary(t: (key: string) => string): TemplateResult {
  return html`
    <div class="consent-summary">
      <h5 class="consent-section-title">${t('consent.summary_card1_title')}</h5>
      <ul class="consent-list">
        <li>${t('consent.summary_data1')}</li>
        <li>${t('consent.summary_data2')}</li>
        <li>${t('consent.summary_data3')}</li>
      </ul>
      <h5 class="consent-section-title">${t('consent.summary_card2_title')}</h5>
      <ul class="consent-list"><li>${t('consent.summary_transfer')}</li></ul>
      <h5 class="consent-section-title">${t('consent.summary_card3_title')}</h5>
      <ul class="consent-list"><li>${unsafeHTML(t('consent.summary_rights'))}</li></ul>
    </div>
  `;
}

/** Render full legal details inside progressive disclosure */
function renderFullDetails(t: (key: string) => string): TemplateResult {
  return html`
    <details class="consent-full-details">
      <summary class="consent-details-toggle">${t('consent.full_details_title')}</summary>
      <div class="consent-details-text">
        <h5 class="consent-section-title">${t('consent.section1_title')}</h5>
        <ul class="consent-list">
          ${['data1', 'data2', 'data3', 'data4', 'data5', 'data6'].map(key => html`<li>${t(`consent.${key}`)}</li>`)}
        </ul>
        <h5 class="consent-section-title">${t('consent.section2_title')}</h5>
        <ul class="consent-list">
          <li>${t('consent.recipients')}</li><li>${t('consent.transfer1')}</li>
          <li><strong>${t('consent.basis_title')}</strong></li>
          <li>${t('consent.basis1')}</li><li>${t('consent.basis2')}</li>
        </ul>
        <h5 class="consent-section-title">${t('consent.section3_title')}</h5>
        <ul class="consent-list">
          ${['rights1', 'rights2', 'rights3'].map(key => html`<li>${unsafeHTML(t(`consent.${key}`))}</li>`)}
        </ul>
        <h5 class="consent-section-title">${t('consent.footer_legal_title')}</h5>
        <ul class="consent-list">
          <li>${t('consent.footer_controller')}</li><li>${t('consent.footer_processor')}</li>
          <li>${t('consent.footer_contact')}</li><li>${unsafeHTML(t('consent.footer_sccs'))}</li>
        </ul>
      </div>
    </details>
  `;
}

/** Render consent checkboxes and footer */
function renderConsentFooter(options: RenderConsentOptions): TemplateResult {
  const { t, handleAcceptConsent, handleDeclineConsent, consentCheckboxMain, consentCheckboxAge, toggleConsentCheckboxMain, toggleConsentCheckboxAge } = options;
  return html`
    <div class="consent-checkboxes">
      <div class="consent-checkbox-item">
        <input type="checkbox" class="consent-checkbox-input" .checked=${consentCheckboxMain} @change=${toggleConsentCheckboxMain} />
        <span class="consent-checkbox-label">${unsafeHTML(t('consent.checkbox_main'))}</span>
      </div>
      <div class="consent-checkbox-item">
        <input type="checkbox" class="consent-checkbox-input" .checked=${consentCheckboxAge} @change=${toggleConsentCheckboxAge} />
        <span class="consent-checkbox-label">${t('consent.checkbox_age')}</span>
      </div>
    </div>
    <div class="modal-footer-modern consent-footer">
      <button class="button-modern button-primary-modern" .disabled=${!(consentCheckboxMain && consentCheckboxAge)} @click="${handleAcceptConsent}">
        <div class="button-content"><span>${t('consent.accept')}</span></div>
      </button>
      <button class="button-modern button-secondary-modern" @click="${handleDeclineConsent}">
        <div class="button-content"><span>${t('button.close')}</span></div>
      </button>
    </div>
  `;
}

export function renderConsentModal(options: RenderConsentOptions): TemplateResult {
  const { t, handleDeclineConsent } = options;
  return html`
    ${renderConsentHeader(t, handleDeclineConsent)}
    <div class="modal-body">
      ${renderWarningBanner(t)}
      ${renderSummary(t)}
      ${renderFullDetails(t)}
    </div>
    ${renderConsentFooter(options)}
  `;
}
