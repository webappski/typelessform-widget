/**
 * Success step template — stacked field list with translation accordion
 */

import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { icons } from '../../constants/icons.js';
import { renderModalHeader } from './shared.js';
import type { FieldStatuses, FieldStatusEntry } from '../../types/common-types.js';
import type { IFormLanguageDetector } from '../../core/interfaces/form-language-detector.js';

export interface RenderSuccessOptions {
  getFieldStatuses: () => FieldStatuses;
  t: (key: string) => string;
  renderFormInfoText: () => TemplateResult | '';
  closeModal: () => void;
  /** @deprecated Kept for backward compat — not used in flat layout */
  getExpandedSections: () => { empty: boolean; check: boolean; filled: boolean };
  /** @deprecated Kept for backward compat — not used in flat layout */
  toggleSection: (section: string) => void;
  getDisplayValueForField: (value: unknown) => string;
  originalUserText: Record<string, string>;
  formLanguageDetector: IFormLanguageDetector | null;
  currentLang: string;
  detectedLanguage: string;
  handleFillForm: (e?: Event) => void;
}

interface TranslationContext {
  t: (key: string) => string;
  getDisplayValueForField: (value: unknown) => string;
  originalUserText: Record<string, string>;
  formLanguageDetector: IFormLanguageDetector | null;
  currentLang: string;
  detectedLanguage: string;
}

/** Determine if translation flow should be shown for a field */
function shouldShowTranslation(ctx: TranslationContext, originalText: string, displayValue: string, fieldName: string): boolean {
  if (ctx.currentLang === ctx.detectedLanguage) {return false;}
  if (originalText === displayValue) {return false;}
  if (ctx.formLanguageDetector?.isNonLinguisticValue(originalText, displayValue)) {return false;}
  return !!ctx.originalUserText[fieldName];
}

// Inline SVG fragments for stat pills
const STAT_CHECK_SVG = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const STAT_WARN_SVG = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 5.5V8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11" r=".75" fill="currentColor"/></svg>';
const STAT_EMPTY_SVG = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/></svg>';

/** Globe SVG icon at given size */
function globeSvg(size: number): TemplateResult {
  return html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="m2 12 20 0"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
}

/** Remove field-label prefix from original text to avoid duplication with the row heading */
function stripLabelPrefix(text: string, label: string | undefined): string {
  if (!label || !text) {return text;}
  const trimmed = text.trimStart();
  const trimmedLabel = label.trim();
  if (!trimmedLabel) {return text;}

  if (trimmed.toLowerCase().startsWith(trimmedLabel.toLowerCase())) {
    const afterLabel = trimmed.substring(trimmedLabel.length);
    // Only strip when followed by colon, whitespace, newline, or end-of-string
    if (/^[\s:,;\n]/.test(afterLabel) || afterLabel === '') {
      const cleaned = afterLabel.replace(/^[\s:,;]+/, '').trim();
      return cleaned || text;
    }
  }
  return text;
}

/** On mouseenter, check if the label is truncated and add .truncated class */
function handleHeadHover(e: Event): void {
  const head = e.currentTarget as HTMLElement;
  const label = head.querySelector('.success-field-label') as HTMLElement;
  if (label && label.scrollWidth > label.clientWidth) {
    head.classList.add('truncated');
  } else {
    head.classList.remove('truncated');
  }
}

/** Render any field in stacked format with optional translation accordion */
function renderFieldStacked(ctx: TranslationContext, field: FieldStatusEntry, dotClass: string): TemplateResult {
  const displayValue = ctx.getDisplayValueForField(field.value);
  const originalText = String(ctx.originalUserText[field.name] || displayValue);
  const isTranslated = shouldShowTranslation(ctx, originalText, displayValue, field.name);

  return html`
    <div class="success-field-row success-field-row--long">
      <div class="field-long-head" data-tooltip="${field.label}" @mouseenter="${handleHeadHover}">
        <div class="success-field-dot ${dotClass}"></div>
        <span class="success-field-label">${field.label}</span>
      </div>
      <div class="field-long-body">
        ${isTranslated ? html`
          <details class="field-translation-details">
            <summary class="field-translation-summary">
              <span class="field-long-target">${displayValue}</span>
              <span class="field-translation-toggle">
                ${globeSvg(12)}
                <span>Auto-translated</span>
                <svg class="field-translation-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="field-translation-original">
              <div class="field-long-divider">
                <span class="field-long-divider-label">
                  ${globeSvg(10)}
                  Original
                </span>
              </div>
              <div class="field-long-source">${stripLabelPrefix(originalText, field.label)}</div>
            </div>
          </details>
        ` : html`
          <div class="field-long-target">${displayValue}</div>
        `}
      </div>
    </div>
  `;
}

/** Render a filled field row — stacked with green dot */
function renderFilledRow(ctx: TranslationContext, field: FieldStatusEntry): TemplateResult {
  return renderFieldStacked(ctx, field, 'success-field-dot--success');
}

/** Render a check field row — stacked with warning dot */
function renderCheckRow(ctx: TranslationContext, field: FieldStatusEntry): TemplateResult {
  return renderFieldStacked(ctx, field, 'success-field-dot--warning');
}

/** Render the success header with icon and progress */
function renderSuccessHeader(t: (key: string) => string, closeModal: () => void, filled: number, total: number): TemplateResult {
  const pct = total > 0 ? (filled / total) * 100 : 0;
  return renderModalHeader({
    titleId: 'typeless-modal-title',
    modifierClass: 'success-header',
    icon: html`<div class="modal-icon-compact-modern success-icon">${unsafeHTML(icons.success)}</div>`,
    title: t('success.title'),
    subtitle: t('success.subtitle'),
    extraContent: html`<div class="progress-integrated"><div class="progress-inline-container">
      <div class="progress-track-slim"><div class="progress-fill-modern progress-fill-modern--success" style="width: ${pct}%"></div></div>
      <span class="progress-value-inline progress-value-inline--success">${Math.round(pct)}%</span>
    </div></div>`,
    closeHandler: closeModal,
    decorationModifier: 'success-decoration',
  });
}

/** Pluralize field count */
function fieldCountText(count: number, t: (key: string) => string): string {
  return `${count} ${t(count === 1 ? 'success.field_single' : 'success.fields_multiple')}`;
}

/** Section label with extending line divider */
function renderSectionLabel(title: string, count: number, t: (key: string) => string, variant: 'success' | 'warning' | 'error' = 'success'): TemplateResult {
  return html`<div class="success-section-label success-section-label--${variant}"><span>${title}</span><span class="success-section-count">${fieldCountText(count, t)}</span></div>`;
}

/** Stats ribbon — colored pills showing counts */
function renderStatsRibbon(filled: number, needsCheck: number, empty: number, t: (key: string) => string): TemplateResult {
  return html`
    <div class="success-stats-ribbon">
      ${filled > 0 ? html`<div class="stat-pill stat-pill--success">${unsafeHTML(STAT_CHECK_SVG)}<span>${filled} ${t('success.successfully_filled').toLowerCase()}</span></div>` : ''}
      ${needsCheck > 0 ? html`<div class="stat-pill stat-pill--warning">${unsafeHTML(STAT_WARN_SVG)}<span>${needsCheck} ${t('success.require_attention').toLowerCase()}</span></div>` : ''}
      ${empty > 0 ? html`<div class="stat-pill stat-pill--empty">${unsafeHTML(STAT_EMPTY_SVG)}<span>${empty} ${t('success.empty_fields').toLowerCase()}</span></div>` : ''}
    </div>
  `;
}

export function renderSuccessStep(options: RenderSuccessOptions): TemplateResult {
  const { getFieldStatuses, t, renderFormInfoText, closeModal, handleFillForm } = options;
  const ctx: TranslationContext = { t, getDisplayValueForField: options.getDisplayValueForField, originalUserText: options.originalUserText, formLanguageDetector: options.formLanguageDetector, currentLang: options.currentLang, detectedLanguage: options.detectedLanguage };
  const { filled, needsCheck, empty } = getFieldStatuses();
  const total = filled.length + needsCheck.length + empty.length;

  return html`
    ${renderSuccessHeader(t, closeModal, filled.length, total)}
    <div class="modal-body">
      ${renderFormInfoText()}
      ${total > 0 ? html`
        ${renderStatsRibbon(filled.length, needsCheck.length, empty.length, t)}
        <div class="success-field-list" aria-live="polite">
          ${filled.length > 0 ? html`
            ${renderSectionLabel(t('success.filled_fields'), filled.length, t, 'success')}
            ${filled.map((f: FieldStatusEntry) => renderFilledRow(ctx, f))}
          ` : ''}
          ${needsCheck.length > 0 ? html`
            ${renderSectionLabel(t('success.check_fields'), needsCheck.length, t, 'warning')}
            ${needsCheck.map((f: FieldStatusEntry) => renderCheckRow(ctx, f))}
          ` : ''}
          ${empty.length > 0 ? html`
            ${renderSectionLabel(t('success.empty_fields'), empty.length, t, 'error')}
            <div class="success-empty-chips">
              ${empty.map((f: FieldStatusEntry) => html`<span class="success-empty-chip">${f.label}</span>`)}
            </div>
          ` : ''}
        </div>
      ` : ''}
    </div>
    <div class="modal-footer-modern success-footer">
      <button class="button-modern button-primary-modern button-success-apply" @click="${(e: Event) => handleFillForm(e)}"><div class="button-content">${unsafeHTML(icons.success)}<span>${t('success.apply_changes')}</span></div></button>
      <button class="button-modern button-secondary-modern success-cancel-link" @click="${closeModal}"><div class="button-content"><span>${t('button.close')}</span></div></button>
    </div>
  `;
}
