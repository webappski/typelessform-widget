/**
 * Initial step template — compact header + badges + CTA
 */

import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { icons } from '../../constants/icons.js';
import { renderBadgesLayout, renderModalHeader } from './shared.js';
import type { SafeBadgesResult } from '../../types/common-types.js';

export interface RenderInitialOptions {
  cachedSafeBadges: SafeBadgesResult | null;
  t: (key: string) => string;
  renderFormInfoText: () => TemplateResult | '';
  closeModal: () => void;
  handleStartListening: () => void;
  handleShowPrivacySettings?: () => void;
  isLoading: boolean;
  _isRecording: boolean;
}

/* ── Scanning orb: pills fly into a central ring ── */
const SCAN_PILLS = [
  { angle: 0, delay: 0, w: 36 },
  { angle: 120, delay: 0.6, w: 48 },
  { angle: 240, delay: 1.2, w: 32 },
];

export function renderScanningOrb(): TemplateResult {
  return html`
    <div class="scanning-viz">
      <div class="orb-container">
        <!-- Indeterminate sweep ring -->
        <div class="scan-ring">
          <svg viewBox="0 0 120 120">
            <defs>
              <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#F97316"/>
                <stop offset="50%" stop-color="#FB923C"/>
                <stop offset="100%" stop-color="#F97316" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <circle class="scan-ring-track" cx="60" cy="60" r="54"/>
            <circle class="scan-ring-sweep" cx="60" cy="60" r="54"/>
          </svg>
        </div>
        <!-- Core -->
        <div class="orb-core scan-core">${unsafeHTML(icons.stageScan)}</div>
        <!-- Flying badge-pills -->
        <div class="scan-pills">
          ${SCAN_PILLS.map(p => html`
            <div class="scan-pill-orbit" style="transform: rotate(${p.angle}deg)">
              <div class="scan-pill" style="width: ${p.w}px; animation-delay: ${p.delay}s"></div>
            </div>
          `)}
        </div>
      </div>
      <!-- Pulsing dots -->
      <div class="scanning-dots">
        <span class="scanning-dot"></span>
        <span class="scanning-dot"></span>
        <span class="scanning-dot"></span>
      </div>
    </div>
  `;
}

export function renderInitialStep(options: RenderInitialOptions): TemplateResult {
  const { cachedSafeBadges, t, renderFormInfoText, closeModal, handleStartListening, isLoading, _isRecording } = options;
  const { safeFields, displayFields } = cachedSafeBadges || { safeFields: [], displayFields: [] };

  // Empty state: no fillable fields found (e.g. form has only checkboxes)
  if (safeFields.length === 0) {
    return html`
      ${renderModalHeader({
        titleId: 'typeless-modal-title',
        icon: html`<div class="modal-icon-compact-modern info-icon-header">${unsafeHTML(icons.infoCircle24)}</div>`,
        title: t('empty.title'),
        subtitle: t('empty.subtitle'),
        closeHandler: closeModal,
      })}
      <div class="modal-body"></div>
    `;
  }

  return html`
    ${renderModalHeader({
      titleId: 'typeless-modal-title',
      icon: html`<div class="modal-icon-compact-modern">${unsafeHTML(icons.mic)}</div>`,
      title: t('modal.title'),
      subtitle: t('modal.subtitle'),
      closeHandler: closeModal,
    })}
    <div class="modal-body">
      <div class="field-badges-container-modern" aria-live="polite">
        ${renderBadgesLayout({ displayFields, shouldScroll: safeFields.length > 10, renderFormInfoText, enableDebugTracking: true })}
      </div>
    </div>
    <div class="modal-footer-modern">
      <button class="button-modern button-primary-modern" @click=${handleStartListening} ?disabled=${isLoading}>
        <div class="button-content">${_isRecording ? unsafeHTML(icons.stop) : unsafeHTML(icons.mic)}<span>${_isRecording ? t('button.stopSpeaking') : t('button.startSpeaking')}</span></div>
      </button>
      ${options.handleShowPrivacySettings ? html`
        <button class="privacy-settings-link" @click=${options.handleShowPrivacySettings}>
          ${unsafeHTML(icons.shield24 || icons.infoCircle24)} ${t('privacy.link')}
        </button>
      ` : ''}
    </div>
  `;
}
