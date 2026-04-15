/**
 * Privacy settings step — view consent info and delete user data (GDPR Art. 17)
 */

import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { icons } from '../../constants/icons.js';
import { renderModalHeader } from './shared.js';

export interface RenderPrivacySettingsOptions {
  t: (key: string) => string;
  userId: string | null;
  consentDate: string | null;
  policyVersion: string | null;
  usageCount: number;
  deleteConfirmChecked: boolean;
  toggleDeleteConfirm: () => void;
  handleDeleteData: () => void;
  handleClose: () => void;
  isDeletingData: boolean;
  deleteDataSuccess: boolean;
  deleteDataError: string;
}

function formatDate(isoString: string | null): string {
  if (!isoString) { return '—'; }
  try {
    return new Date(isoString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

function truncateId(id: string | null): string {
  if (!id) { return '—'; }
  if (id.length <= 12) { return id; }
  return `${id.substring(0, 8)}...${id.substring(id.length - 4)}`;
}

function renderConsentInfo(options: RenderPrivacySettingsOptions): TemplateResult {
  const { t, userId, consentDate, policyVersion, usageCount } = options;

  if (!userId) {
    return html`<p class="privacy-no-data">${t('privacy.no_data')}</p>`;
  }

  return html`
    <div class="privacy-info-section">
      <h5 class="consent-section-title">${t('privacy.info_title')}</h5>
      <div class="privacy-info-grid">
        <div class="privacy-info-row">
          <span class="privacy-info-label">${t('privacy.user_id')}</span>
          <span class="privacy-info-value"><code>${truncateId(userId)}</code></span>
        </div>
        <div class="privacy-info-row">
          <span class="privacy-info-label">${t('privacy.consent_date')}</span>
          <span class="privacy-info-value">${formatDate(consentDate)}</span>
        </div>
        <div class="privacy-info-row">
          <span class="privacy-info-label">${t('privacy.policy_version')}</span>
          <span class="privacy-info-value">${policyVersion || '—'}</span>
        </div>
        <div class="privacy-info-row">
          <span class="privacy-info-label">${t('privacy.usage_count')}</span>
          <span class="privacy-info-value">${usageCount}</span>
        </div>
      </div>
    </div>
  `;
}

function renderDeleteSection(options: RenderPrivacySettingsOptions): TemplateResult {
  const { t, userId, deleteConfirmChecked, toggleDeleteConfirm, handleDeleteData: _handleDeleteData, isDeletingData, deleteDataSuccess, deleteDataError } = options;

  if (!userId) { return html``; }

  if (deleteDataSuccess) {
    return html`
      <div class="privacy-delete-section">
        <div class="privacy-success-message">
          ${unsafeHTML(icons.checkCircle24 || '&#10003;')}
          <p>${t('privacy.delete_success')}</p>
        </div>
      </div>
    `;
  }

  return html`
    <div class="privacy-delete-section">
      <h5 class="consent-section-title">${t('privacy.delete_title')}</h5>
      <p class="privacy-delete-description">${t('privacy.delete_description')}</p>
      ${deleteDataError ? html`<p class="privacy-error-message">${t('privacy.delete_error')}</p>` : ''}
      <div class="consent-checkbox-item">
        <input type="checkbox" class="consent-checkbox-input" .checked=${deleteConfirmChecked} @change=${toggleDeleteConfirm} ?disabled=${isDeletingData} />
        <span class="consent-checkbox-label">${t('privacy.delete_confirm')}</span>
      </div>
    </div>
  `;
}

export function renderPrivacySettings(options: RenderPrivacySettingsOptions): TemplateResult {
  const { t, handleClose, handleDeleteData, deleteConfirmChecked, isDeletingData, deleteDataSuccess } = options;

  return html`
    ${renderModalHeader({
      titleId: 'typeless-modal-title',
      icon: html`<div class="modal-icon-compact-modern">${unsafeHTML(icons.shield24 || icons.infoCircle24)}</div>`,
      title: t('privacy.title'),
      subtitle: t('privacy.subtitle'),
      closeHandler: handleClose,
    })}
    <div class="modal-body">
      ${renderConsentInfo(options)}
      ${renderDeleteSection(options)}
    </div>
    <div class="modal-footer-modern success-footer">
      ${deleteDataSuccess
        ? html`
          <button class="button-modern button-primary-modern" @click=${handleClose}>
            <div class="button-content"><span>${t('privacy.done')}</span></div>
          </button>
        `
        : html`
          <button class="button-modern button-primary-modern button-danger" .disabled=${!deleteConfirmChecked || isDeletingData} @click=${handleDeleteData}>
            <div class="button-content"><span>${isDeletingData ? t('privacy.deleting') : t('privacy.delete_button')}</span></div>
          </button>
          <button class="button-modern button-secondary-modern" @click=${handleClose} ?disabled=${isDeletingData}>
            <div class="button-content"><span>${t('button.close')}</span></div>
          </button>
        `
      }
    </div>
  `;
}
