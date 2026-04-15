/**
 * Processing step template — centered orb visualization
 *
 * SVG ring (progress), inner core (breathing), floating particles.
 * Step label below orb. Dot indicators at bottom.
 */

import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { icons } from '../../constants/icons.js';
import { renderModalHeader, renderProcessingContent } from './shared.js';

const TOTAL_STEPS = 8;

export interface RenderProcessingOptions {
  t: (key: string) => string;
  processingStage?: number;
  cachedSafeBadges?: unknown;
  renderFormInfoText?: () => TemplateResult | '';
  closeModal?: () => void;
}

/* ── Stage config: icon per stage ── */
const STAGE_ICONS: readonly string[] = [
  icons.stageWaveform,  // 1: Converting speech to text
  icons.globe,          // 2: Detecting language
  icons.stageBrain,     // 3: Understanding your request
  icons.stageExtract,   // 4: Extracting data
  icons.stageMatch,     // 5: Matching with form fields
  icons.stageValidate,  // 6: Validating data
  icons.stagePackage,   // 7: Preparing results
  icons.stageSparkle,   // 8: Almost ready!
];

/* ── Progress Dots (bottom) ── */
function renderProgressDots(currentStep: number): TemplateResult {
  return html`
    <div class="processing-steps" role="progressbar" aria-valuenow="${currentStep}" aria-valuemin="1" aria-valuemax="${TOTAL_STEPS}">
      ${Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const step = i + 1;
        const state = step < currentStep ? 'done' : step === currentStep ? 'active' : '';
        return html`<span class="processing-dot ${state ? `processing-dot--${state}` : ''}"></span>`;
      })}
    </div>
  `;
}

/* ── Orb Visualization ── */
function renderOrb(t: (key: string) => string, currentStep: number): TemplateResult {
  const pct = Math.round((currentStep / TOTAL_STEPS) * 100);
  const circumference = 339.292; // 2 * π * 54
  const offset = circumference - (circumference * pct) / 100;
  const iconIndex = Math.min(currentStep - 1, STAGE_ICONS.length - 1);

  return html`
    <div class="processing-viz">
      <div class="orb-container">
        <!-- Ring -->
        <div class="orb-ring">
          <svg viewBox="0 0 120 120">
            <defs>
              <linearGradient id="orbGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#F97316"/>
                <stop offset="100%" stop-color="#FB923C"/>
              </linearGradient>
            </defs>
            <circle class="orb-ring-track" cx="60" cy="60" r="54"/>
            <circle class="orb-ring-fill" cx="60" cy="60" r="54" style="stroke-dashoffset: ${offset}"/>
          </svg>
        </div>
        <!-- Core -->
        <div class="orb-core">${unsafeHTML(STAGE_ICONS[iconIndex])}</div>
        <!-- Particles -->
        <div class="orb-particles">
          <div class="orb-particle"></div>
          <div class="orb-particle"></div>
          <div class="orb-particle"></div>
        </div>
      </div>
      <div class="processing-stage">
        <div class="processing-stage-label">${t(`processing.stage${currentStep}`)}</div>
        <div class="processing-stage-meta">${currentStep} / ${TOTAL_STEPS}</div>
      </div>
      ${renderProgressDots(currentStep)}
    </div>
  `;
}

/* ── Main Export ── */
export function renderProcessingStep(options: RenderProcessingOptions): TemplateResult {
  const { t, processingStage = 1, closeModal } = options;
  const pct = Math.round((processingStage / TOTAL_STEPS) * 100);

  const progressContent = html`
    <div class="processing-header-progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
      <div class="processing-header-progress-track">
        <div class="processing-header-progress-fill" style="width: ${pct}%"></div>
      </div>
    </div>
  `;

  if (closeModal) {
    return html`
      ${renderModalHeader({
        titleId: 'typeless-modal-title',
        icon: html`<div class="modal-icon-compact-modern processing-icon">${unsafeHTML(icons.typelessLogo)}</div>`,
        title: t('processing.title'),
        subtitle: t(`processing.stage${processingStage}`),
        extraContent: progressContent,
        closeHandler: closeModal,
      })}
      <div class="modal-body">
        ${renderOrb(t, processingStage)}
      </div>
    `;
  }

  // Fallback: centered spinner
  return renderProcessingContent(t, `processing.stage${processingStage}`, {
    currentStage: processingStage,
    totalStages: TOTAL_STEPS,
  });
}
