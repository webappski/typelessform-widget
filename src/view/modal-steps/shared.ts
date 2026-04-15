/**
 * Shared helpers for modal step templates
 */

import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { icons } from '../../constants/icons.js';
import { normalizeFieldKey } from '../../lib/field-keys.js';
import type { SafeBadge } from '../../types/common-types.js';

// === Shared interfaces ===

export interface AfcTestHook {
  sensitiveHints?: Array<{ id?: string; name?: string; label?: string }>;
}

export interface AfcDebug {
  lastBadgePipeline?: {
    renderedBadges: Array<{ key: string; label: string }>;
  };
}

export interface WindowWithAfcTest {
  AFC_TEST_HOOK?: AfcTestHook;
  AFC_DEBUG?: AfcDebug;
}

/** Extended badge type for display — may carry extra FieldDescriptor properties at runtime. */
export interface DisplayBadge extends SafeBadge {
  label?: string;
  placeholder?: string;
}

// === Sensitive flag & debug tracking ===

/** Compute sensitive flag for a badge using test hooks */
function computeSensitiveFlag(fieldKey: string): string {
  const testHook = (window as unknown as WindowWithAfcTest).AFC_TEST_HOOK;
  if (!testHook?.sensitiveHints) {return 'false';}
  const keys = new Set<string>();
  for (const hint of testHook.sensitiveHints) {
    if (hint.id) {keys.add(hint.id.toLowerCase().trim());}
    if (hint.name) {keys.add(hint.name.toLowerCase().trim());}
    if (hint.label) {keys.add(hint.label.toLowerCase().trim());}
  }
  return keys.has(fieldKey) ? 'true' : 'false';
}

/** Track a badge in the debug pipeline */
function trackBadgeInDebug(fieldKey: string, field: DisplayBadge): void {
  const pipeline = (window as unknown as WindowWithAfcTest).AFC_DEBUG?.lastBadgePipeline;
  if (!pipeline) {return;}
  if (!pipeline.renderedBadges.find((b: { key: string }) => b.key === fieldKey)) {
    pipeline.renderedBadges.push({ key: fieldKey, label: field.translatedText || field.name || '' });
  }
}

// === Badge rendering ===

interface RenderBadgeOptions {
  cssClass?: string;
  enableDebugTracking?: boolean;
}

/** Render a single badge element */
export function renderBadge(field: DisplayBadge, opts: RenderBadgeOptions = {}): TemplateResult {
  const { cssClass = 'field-badge-modern', enableDebugTracking = false } = opts;
  const fieldKey = normalizeFieldKey(field as unknown as Record<string, unknown>);
  if (enableDebugTracking) {trackBadgeInDebug(fieldKey, field);}
  return html`
    <span class="${cssClass}" data-afc-field-key="${fieldKey}" data-afc-sensitive="${computeSensitiveFlag(fieldKey)}">
      <span class="badge-text">${(field.translatedText || field.label || field.placeholder || field.name || '').toString().trim()}</span>
    </span>
  `;
}

// === Badges layout ===

interface RenderBadgesLayoutOptions {
  displayFields: SafeBadge[];
  shouldScroll: boolean;
  renderFormInfoText: () => TemplateResult | '';
  badgeCssClass?: string;
  enableDebugTracking?: boolean;
}

/** Render badges layout — form title + flat badge list (GPT handles disambiguation via badge names) */
export function renderBadgesLayout(opts: RenderBadgesLayoutOptions): TemplateResult {
  const badgeOpts: RenderBadgeOptions = { cssClass: opts.badgeCssClass, enableDebugTracking: opts.enableDebugTracking };
  return html`
    ${opts.renderFormInfoText()}
    <div class="field-badges-modern ${opts.shouldScroll ? 'scrollable' : ''}">${opts.displayFields.map(b => renderBadge(b as DisplayBadge, badgeOpts))}</div>
  `;
}

// === Processing content ===

interface ProcessingContentOptions {
  currentStage?: number;
  totalStages?: number;
}

/** Render processing/loading spinner content */
export function renderProcessingContent(
  t: (key: string) => string,
  subtitleKey: string,
  options?: ProcessingContentOptions
): TemplateResult {
  const { currentStage, totalStages } = options || {};
  const showProgress = currentStage !== undefined && totalStages !== undefined && totalStages > 0;
  const progressPct = showProgress ? Math.round((currentStage! / totalStages!) * 100) : 0;

  return html`
    <div class="processing-content" role="status" aria-live="polite">
      <div class="processing-icon">
        <div class="spinner-track"></div>
        <div class="spinner-icon">${unsafeHTML(icons.processingBolt)}</div>
      </div>
      <p class="processing-text">${t('processing.title')}</p>
      <p class="processing-subtitle">${t(subtitleKey)}</p>
      ${showProgress ? html`
        <div class="processing-progress" role="progressbar" aria-valuenow="${progressPct}" aria-valuemin="0" aria-valuemax="100">
          <div class="processing-progress-track">
            <div class="processing-progress-fill" style="width:${progressPct}%"></div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// === Modal header ===

interface RenderModalHeaderOptions {
  modifierClass?: string;
  icon?: TemplateResult | string;
  title: string;
  subtitle: string;
  extraContent?: TemplateResult | string;
  closeHandler: () => void;
  decorationModifier?: string;
  /** Stable ID placed on <h2> so aria-labelledby can reference it */
  titleId?: string;
}

/** Render a reusable modal header */
export function renderModalHeader(opts: RenderModalHeaderOptions): TemplateResult {
  return html`
    <div class="modal-header-compact-modern ${opts.modifierClass || ''}">
      <div class="modal-header-content">
        ${opts.icon || ''}
        <div class="modal-text-group">
          <h2 class="modal-title-compact" id="${opts.titleId || ''}">${opts.title}</h2>
          <p class="modal-subtitle-compact">${opts.subtitle}</p>
          ${opts.extraContent || ''}
        </div>
        <button class="close-button-modern" @click=${opts.closeHandler} aria-label="Close">${unsafeHTML(icons.close)}</button>
      </div>
      <div class="header-decoration ${opts.decorationModifier || ''}"></div>
    </div>
  `;
}

// === Formatting ===

/** Format milliseconds to MM:SS */
export function formatRecordingTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
