/**
 * Listening step template — timer in footer next to stop button
 */

import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { icons } from '../../constants/icons.js';
import { renderBadgesLayout, renderModalHeader, formatRecordingTime } from './shared.js';
import { CONFIG } from '../../constants/config.js';
import type { SafeBadgesResult } from '../../types/common-types.js';

export interface RenderListeningOptions {
  cachedSafeBadges: SafeBadgesResult | null;
  t: (key: string) => string;
  renderFormInfoText: () => TemplateResult | '';
  closeModal: () => void;
  handleStopListening: () => void;
  getRecordingDuration: () => number;
}

export function renderListeningStep(options: RenderListeningOptions): TemplateResult {
  const { cachedSafeBadges, t, renderFormInfoText, closeModal, handleStopListening, getRecordingDuration } = options;
  const { safeFields, displayFields } = cachedSafeBadges || { safeFields: [], displayFields: [] };
  const elapsed = getRecordingDuration();
  const max = CONFIG.AUDIO.MAX_RECORDING_TIME;
  const pct = max > 0 ? Math.min((elapsed / max) * 100, 100) : 0;

  // Progress bar in header
  const progressContent = html`
    <div class="listening-header-progress" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100">
      <div class="listening-header-progress-track">
        <div class="listening-header-progress-fill" style="width: ${pct}%"></div>
      </div>
    </div>
  `;

  return html`
    ${renderModalHeader({
      titleId: 'typeless-modal-title',
      icon: html`<div class="modal-icon-compact-modern listening-icon">${unsafeHTML(icons.mic)}</div>`,
      title: t('listening.title'),
      subtitle: t('listening.subtitle'),
      extraContent: progressContent,
      closeHandler: closeModal,
    })}
    <div class="modal-body">
      <div class="field-badges-container-modern">
        ${safeFields.length > 0 ? renderBadgesLayout({ displayFields, shouldScroll: safeFields.length > 10, renderFormInfoText }) : ''}
      </div>
    </div>
    <div class="modal-footer-modern listening-footer">
      <div class="listening-footer-row">
        <div class="listening-footer-timer">
          <span class="listening-footer-timer-value" aria-live="polite" aria-atomic="true">${formatRecordingTime(elapsed)}</span>
          <span class="listening-footer-timer-sep">/</span>
          <span class="listening-footer-timer-max">${formatRecordingTime(max)}</span>
        </div>
        <button class="button-stop-round" @click=${handleStopListening} aria-label="${t('button.stopSpeaking')}">${unsafeHTML(icons.stop)}</button>
      </div>
    </div>
  `;
}
