/**
 * Error step template — header with error icon + message + retry
 *
 * Uses renderModalHeader() for consistency with other modal states.
 * Error-type-specific titles help users understand what went wrong.
 */

import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { icons } from '../../constants/icons.js';
import { renderModalHeader } from './shared.js';

/** Check if error is non-retryable (auth/quota — user can't fix by retrying) */
function isNonRetryableError(errorMessage: string | null, t: (key: string) => string): boolean {
  if (!errorMessage) { return false; }
  const invalidApiKey = t('error.invalidApiKey');
  const quotaExhausted = t('error.quotaExhausted');
  const domainNotAllowed = t('error.domainNotAllowed');
  return errorMessage.includes(invalidApiKey) || errorMessage.includes(quotaExhausted) || errorMessage.includes(domainNotAllowed);
}

/** Determine error-type-specific title */
function getErrorTitle(errorMessage: string | null, t: (key: string) => string): string {
  if (!errorMessage) { return t('error.general'); }
  if (errorMessage.includes(t('error.no_fields_detected'))) { return t('error.no_data_title'); }
  if (errorMessage.includes(t('error.microphone')) || errorMessage.toLowerCase().includes('microphone')) { return t('error.mic_title'); }
  if (errorMessage.includes(t('error.serviceUnavailable')) || errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('unavailable')) { return t('error.network_title'); }
  if (isNonRetryableError(errorMessage, t)) { return t('error.title'); }
  return t('error.general');
}

/** Determine error-type-specific subtitle */
function getErrorSubtitle(errorMessage: string | null, t: (key: string) => string): string {
  if (!errorMessage) { return t('error.general'); }
  if (errorMessage.includes(t('error.no_fields_detected'))) { return t('error.no_fields_detected'); }
  if (errorMessage.includes(t('error.microphone')) || errorMessage.toLowerCase().includes('microphone')) { return t('error.microphone'); }
  if (errorMessage.includes(t('error.serviceUnavailable')) || errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('unavailable')) { return t('error.serviceUnavailable'); }
  return errorMessage;
}

interface ErrorStepOptions {
  errorMessage: string | null;
  errorDetails: string | null;
  t: (key: string) => string;
  resetToInitial: () => void;
  closeModal?: () => void;
}

function renderErrorDetails(details: string | null, t: (key: string) => string): TemplateResult | string {
  if (!details) { return ''; }
  return html`<details class="error-details">
    <summary class="error-details-summary">${t('error.showDetails')}</summary>
    <pre class="error-details-content">${details}</pre>
  </details>`;
}

export function renderErrorStep(opts: ErrorStepOptions): TemplateResult {
  const { errorMessage, errorDetails, t, resetToInitial, closeModal } = opts;
  const errorTitle = getErrorTitle(errorMessage, t);
  const errorSubtitle = getErrorSubtitle(errorMessage, t);
  const nonRetryable = isNonRetryableError(errorMessage, t);
  const buttonText = nonRetryable ? t('button.close') : t('button.tryAgain');
  const buttonHandler = nonRetryable && closeModal ? closeModal : resetToInitial;

  if (closeModal) {
    return html`
      ${renderModalHeader({
        titleId: 'typeless-modal-title',
        modifierClass: 'error-header',
        icon: html`<div class="modal-icon-compact-modern error-icon-header">${unsafeHTML(icons.alertCircle)}</div>`,
        title: errorTitle,
        subtitle: errorSubtitle,
        closeHandler: closeModal,
      })}
      <div class="modal-body">
        ${renderErrorDetails(errorDetails, t)}
        <div class="error-actions">
          <button class="button button-primary button-full" @click=${buttonHandler}>${buttonText}</button>
        </div>
      </div>
    `;
  }

  // No closeModal — only action available is resetToInitial, so always show "Try Again"
  return html`
    <div class="error-content">
      <div class="error-icon">${unsafeHTML(icons.alertCircle)}</div>
      <h2 class="error-title">${errorTitle}</h2>
      <p class="error-message">${errorMessage}</p>
      ${renderErrorDetails(errorDetails, t)}
      <button class="button button-primary button-full" @click=${resetToInitial}>${t('button.tryAgain')}</button>
    </div>
  `;
}
