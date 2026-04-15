import { css } from 'lit';

export const successStyles = css`
  /* ── Success State ─────────────────────────────────── */

  .success-content {
    text-align: center;
    padding: 0;
  }

  /* Override center alignment for field content */
  .success-content .status-accordion,
  .success-content .status-accordion-content,
  .success-content .status-accordion-content * {
    text-align: left !important;
  }

  /* ── Success Header Icon — neutral (no green) ──────── */

  .success-icon .icon-glow-subtle { display: none; }

  .modal-icon-compact-modern.success-icon {
    background: var(--gray-100);
    border-color: var(--gray-300);
  }

  .modal-icon-compact-modern.success-icon svg {
    color: var(--gray-600);
    width: 20px;
    height: 20px;
  }

  .success-decoration {
    background: var(--gray-200);
  }

  .success-glow { display: none; }

  /* Progress bar — green for success */
  .progress-fill-modern--success {
    background: linear-gradient(90deg, var(--success-500), var(--success-600));
  }

  .progress-value-inline--success {
    color: var(--success-600);
  }

  /* ── Stats Ribbon ──────────────────────────────────── */

  .success-stats-ribbon {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) 0;
    flex-wrap: wrap;
  }

  .stat-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: var(--radius-full);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.01em;
    line-height: 1;
    white-space: nowrap;
  }

  .stat-pill svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }

  .stat-pill--success {
    background: var(--success-50);
    color: var(--success-700);
    border: 1px solid var(--success-200);
  }

  .stat-pill--warning {
    background: var(--warning-50);
    color: var(--warning-700);
    border: 1px solid var(--warning-200);
  }

  .stat-pill--empty {
    background: var(--error-50);
    color: var(--error-600);
    border: 1px solid var(--error-200);
  }

  /* ── Field List Container ──────────────────────────── */

  .success-field-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0 0 var(--space-2);
  }

  /* ── Section Labels — editorial divider ────────────── */

  .success-section-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-3) 0 var(--space-2);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--gray-400);
    border-bottom: 1px solid var(--gray-100);
    margin-bottom: var(--space-1);
  }

  .success-section-label--success {
    color: var(--success-600);
    border-bottom-color: var(--success-100);
  }

  .success-section-label--warning {
    color: var(--warning-600);
    border-bottom-color: var(--warning-100);
  }

  .success-section-label--error {
    color: var(--error-600);
    border-bottom-color: var(--error-100);
  }

  .success-section-label--success .success-section-count { color: var(--success-500); }
  .success-section-label--warning .success-section-count { color: var(--warning-500); }
  .success-section-label--error .success-section-count { color: var(--error-500); }

  .success-section-label:first-child {
    padding-top: 0;
  }

  .success-section-count {
    font-weight: 500;
    text-transform: none;
    letter-spacing: normal;
    color: var(--gray-400);
    font-size: 11px;
  }

  /* ── Filled Field Rows — receipt style ─────────────── */

  .success-field-row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: 7px var(--space-1);
    min-height: 36px;
    border-bottom: 1px solid var(--gray-100);
    transition: background var(--transition-fast);
  }

  .success-field-row:hover {
    background: none;
  }

  .success-field-row:last-of-type {
    border-bottom: none;
  }

  /* Check icon dot — CSS-only checkmark */
  .success-field-dot {
    width: 18px;
    height: 18px;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .success-field-dot--success {
    background: var(--success-50);
    border: 1.5px solid var(--success-200);
  }

  .success-field-dot--success::after {
    content: '';
    width: 5px;
    height: 8px;
    border: solid var(--success-500);
    border-width: 0 1.5px 1.5px 0;
    transform: rotate(45deg) translateY(-1px);
  }

  .success-field-dot--warning {
    background: var(--warning-50);
    border: 1.5px solid var(--warning-200);
    width: 18px;
    height: 18px;
    border-radius: var(--radius-sm);
  }

  .success-field-dot--warning::after {
    content: '!';
    font-size: 10px;
    font-weight: 800;
    color: var(--warning-600);
    line-height: 1;
  }

  .success-field-dot--error {
    background: var(--error-50);
    border: 1.5px solid var(--error-200);
    width: 18px;
    height: 18px;
    border-radius: var(--radius-sm);
  }

  .success-field-label {
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--gray-600);
    flex-shrink: 1;
    min-width: 80px;
    line-height: var(--leading-tight);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Custom Tooltip — only shown when label is truncated (.truncated class added by JS) ── */

  .field-long-head.truncated[data-tooltip]:hover::before,
  .field-long-head.truncated[data-tooltip]:hover::after {
    visibility: visible;
    opacity: 1;
  }

  .field-long-head[data-tooltip]::before {
    content: attr(data-tooltip);
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    max-width: 280px;
    padding: 8px 12px;
    background: var(--gray-900);
    color: var(--gray-50);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: -0.01em;
    border-radius: 8px;
    white-space: normal;
    word-break: break-word;
    box-shadow: 0 8px 24px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08);
    z-index: 100;
    pointer-events: none;
    transition: opacity 0.1s ease;
  }

  .field-long-head[data-tooltip]::after {
    content: '';
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: calc(100% + 2px);
    left: 50%;
    margin-left: -5px;
    width: 10px;
    height: 10px;
    background: var(--gray-900);
    transform: rotate(45deg);
    border-radius: 0 0 2px 0;
    z-index: 99;
    pointer-events: none;
    transition: opacity 0.1s ease;
  }

  .success-field-value {
    font-size: var(--text-sm);
    color: var(--gray-900);
    font-weight: 600;
    margin-left: auto;
    text-align: right;
    word-break: break-word;
    max-width: 55%;
    min-width: 60px;
    flex-shrink: 0;
    line-height: var(--leading-tight);
  }

  .success-field-empty {
    font-size: var(--text-sm);
    color: var(--gray-400);
    margin-left: auto;
  }

  .success-field-row--empty .success-field-label {
    color: var(--gray-500);
  }

  /* ── Empty Fields — chip layout ────────────────────── */

  .success-empty-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    padding: var(--space-2) 0;
  }

  .success-empty-chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    background: var(--error-50);
    border: 1px solid var(--error-200);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--error-600);
    line-height: 1.2;
    white-space: nowrap;
  }

  /* ── Field Cards (translated / check) ──────────────── */

  .field-card-modern {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--success-100);
    border-radius: var(--radius-md);
    padding: var(--space-3);
    margin: var(--space-1) 0;
    transition: all var(--transition-fast);
  }

  .field-card-modern:hover {
    background: var(--gray-50);
    box-shadow: var(--shadow-xs);
  }

  /* Warning card — amber left accent */
  .field-card-modern--warning {
    background: var(--warning-50);
    border-color: var(--warning-200);
    border-left: 3px solid var(--warning-400);
  }

  .field-card-modern--warning:hover {
    background: var(--warning-100);
    box-shadow: var(--shadow-sm);
  }

  .field-card-modern--translated {
    padding: var(--space-3);
  }

  /* ── Field Header (inside cards) ───────────────────── */

  .field-header-modern {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
  }

  .field-icon-modern {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .field-icon-modern svg {
    width: 14px;
    height: 14px;
  }

  .field-icon-modern--success { color: var(--success-500); }
  .field-icon-modern--warning { color: var(--warning-600); }

  .field-text-group {
    flex: 1;
    min-width: 0;
  }

  .field-label-modern {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--gray-900);
    margin: 0;
    line-height: var(--leading-tight);
  }

  .field-value-modern {
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--gray-600);
    line-height: var(--leading-relaxed);
    margin-top: 2px;
  }

  .field-content-modern {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  /* ── Translation Flow ──────────────────────────────── */

  .translation-flow-modern {
    display: flex;
    align-items: stretch;
    gap: var(--space-2);
    margin-top: var(--space-3);
    margin-left: 28px; /* align with text after icon */
  }

  .translation-step-modern {
    display: flex;
    flex-direction: column;
    gap: 3px;
    flex: 1;
    min-width: 0;
  }

  .translation-arrow {
    display: flex;
    align-items: center;
    color: var(--gray-400);
    font-size: var(--text-sm);
    flex-shrink: 0;
    padding-top: 14px;
  }

  .step-label-modern {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--gray-400);
  }

  .step-value-modern {
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--gray-600);
    padding: var(--space-2);
    background: var(--gray-50);
    border-radius: var(--radius-sm);
    border: 1px solid var(--gray-200);
    line-height: var(--leading-relaxed);
    word-break: break-word;
  }

  .step-value-modern--highlighted {
    background: var(--success-50);
    border-color: var(--success-200);
    color: var(--gray-900);
    font-weight: 600;
  }

  .field-card-modern--warning .step-value-modern--highlighted {
    background: var(--warning-50);
    border-color: var(--warning-200);
  }

  /* ── Footer — success-specific ─────────────────────── */

  .success-cancel-link {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    color: var(--gray-500) !important;
    font-size: var(--text-sm) !important;
    font-weight: 500 !important;
    margin-top: 0 !important;
    min-height: 36px !important;
    transition: color var(--transition-fast) !important;
  }

  .success-cancel-link:hover {
    color: var(--gray-700) !important;
    background: transparent !important;
    transform: none !important;
    box-shadow: none !important;
  }

  /* ── Responsive ────────────────────────────────────── */

  @media (max-width: 480px) {
    .success-stats-ribbon {
      gap: var(--space-1);
    }

    .stat-pill {
      font-size: 10px;
      padding: 3px 8px;
    }

    .translation-flow-modern {
      flex-direction: column;
      gap: var(--space-2);
      margin-left: 0;
    }

    .translation-arrow {
      display: none;
    }

    .field-card-modern {
      padding: var(--space-3);
    }

    .success-field-value {
      max-width: 50%;
    }
  }

  /* ═══ Inline Translation (short text: source → target) ═══ */

  .tv-src {
    font-weight: 450;
    color: var(--gray-500);
  }

  .tv-arrow {
    color: var(--gray-300);
    font-weight: 400;
    margin: 0 1px;
  }

  .tv-tgt {
    font-weight: 650;
    color: var(--gray-800);
  }

  /* ═══ Stacked Translation (long text) ═══ */

  .success-field-row--long {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 12px var(--space-1);
  }

  .field-long-head {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
  }

  .field-long-body {
    padding-left: 28px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .field-long-target {
    font-size: 13px;
    font-weight: 600;
    color: var(--gray-800);
    line-height: 1.6;
    word-break: break-word;
  }

  .field-long-divider {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 10px 0 8px;
  }

  .field-long-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--gray-150, var(--gray-200));
  }

  .field-long-divider-label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--gray-400);
    white-space: nowrap;
  }

  .field-long-divider-label svg {
    color: var(--gray-400);
  }

  .field-long-source {
    font-size: 13px;
    font-weight: 400;
    color: var(--gray-500);
    line-height: 1.6;
    word-break: break-word;
    font-style: italic;
  }

  /* ── Translation Accordion (details/summary) ── */

  .field-translation-details {
    width: 100%;
  }

  .field-translation-summary {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    list-style: none;
  }

  .field-translation-summary::-webkit-details-marker {
    display: none;
  }

  .field-translation-summary::marker {
    display: none;
    content: '';
  }

  .field-translation-summary .field-long-target {
    flex: 1;
  }

  .field-translation-toggle {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    margin-top: 0;
    padding: 4px 10px;
    background: var(--primary-50);
    border: 1px solid var(--primary-200);
    border-radius: var(--radius-full);
    font-size: 11px;
    font-weight: 600;
    color: var(--primary-600);
    white-space: nowrap;
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
  }

  .field-translation-toggle:hover {
    background: var(--primary-100);
    border-color: var(--primary-300);
    color: var(--primary-700);
  }

  .field-translation-toggle svg {
    flex-shrink: 0;
  }

  .field-translation-chevron {
    transition: transform 0.2s ease;
  }

  .field-translation-details[open] .field-translation-chevron {
    transform: rotate(180deg);
  }

  .field-translation-original {
    margin-top: 8px;
    animation: accordion-slide 0.2s ease;
  }

  @keyframes accordion-slide {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
