import { css } from 'lit';

export const badgesStyles = css`
  /* Field Badges */
  .field-badges {
    display: flex;
    justify-content: center;
    gap: var(--space-2);
    margin: var(--space-3) 0;
    flex-wrap: wrap;
    overflow-y: auto;
    flex-shrink: 1;
    padding: var(--space-1);
  }

  .field-badges.scrollable {
    /* handled by .field-badges */
  }

  .field-badges.scrollable::-webkit-scrollbar {
    height: 6px;
  }

  .field-badges.scrollable::-webkit-scrollbar-track {
    background: var(--gray-100);
    border-radius: var(--radius-full);
  }

  .field-badges.scrollable::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: var(--radius-full);
  }

  .field-badges.scrollable::-webkit-scrollbar-thumb:hover {
    background: var(--gray-400);
  }

  .field-badge {
    display: inline-block;
    padding: var(--space-2) var(--space-3);
    background-color: var(--gray-100);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-full);
    font-size: 13px;
    font-weight: 500;
    color: var(--gray-800);
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-xs);
  }

  .field-badge svg {
    width: 16px;
    height: 16px;
    color: var(--primary-500);
    flex-shrink: 0;
  }

  .field-badge:hover {
    background-color: var(--gray-200);
    border-color: var(--gray-300);
    transform: translateY(-1px);
  }

  .field-badge:hover svg {
    color: var(--primary-500);
  }

  .field-badge.filled {
    background: var(--success-50);
    border-color: var(--success-500);
    color: var(--success-700);
  }

  .field-badge.filled svg {
    color: var(--success-500);
  }

  /* Field Status Legend */
  .field-status-legend {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    padding: var(--space-3);
    border-top: 1px solid var(--gray-200);
    margin-top: var(--space-3);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: 12px;
    color: var(--gray-600);
  }

  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .legend-dot-filled {
    background: var(--success-500);
  }

  .legend-dot-check {
    background: var(--warning-500);
  }

  .legend-dot-empty {
    background: var(--error-500);
  }

  /* Status divider */
  .status-divider {
    width: 100%;
    height: 1px;
    background: var(--gray-200);
  }

  /* Badge Group */
  .badge-group {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    justify-content: flex-start;
    padding: var(--space-1);
    margin: 0 calc(var(--space-1) * -1);
    position: relative;
  }

  .field-badges-label {
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--gray-700);
    margin: 0 0 var(--space-2) 0;
  }

  /* Modern Field Badges Container — no own horizontal padding, parent modal-body provides it */
  .field-badges-container-modern {
    padding: 0;
    position: relative;
  }

  @media (max-width: 480px) {
    .field-badges-container-modern {
      padding: 0;
    }
  }

  .field-badges-modern {
    display: flex;
    justify-content: flex-start;
    gap: var(--space-2);
    flex-wrap: wrap;
    padding: var(--space-2) 0;
    align-content: flex-start;
    line-height: 1.8;
  }

  .field-badges-modern.scrollable {
    max-height: calc(90vh - 350px);
    overflow-y: auto;
    padding: var(--space-3) var(--space-3) var(--space-3) 0;
  }

  @media (max-width: 480px) {
    .field-badges-modern {
      gap: var(--space-2);
    }

    .field-badges-modern.scrollable {
      max-height: none;
      overflow-y: visible;
    }
  }

  /* Neutral scrollbar */
  .field-badges-modern::-webkit-scrollbar {
    width: 6px;
  }

  .field-badges-modern::-webkit-scrollbar-track {
    background: var(--gray-100);
    border-radius: var(--radius-full);
  }

  .field-badges-modern::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: var(--radius-full);
  }

  /* Modern Field Badge — pill shape, warm stone */
  .field-badge-modern {
    position: relative;
    display: inline-block;
    padding: 7px 14px;
    background: var(--gray-50);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-full);
    font-size: 13px;
    font-weight: 600;
    color: var(--gray-700);
    letter-spacing: -0.01em;
    user-select: none;
    cursor: default;
  }

  .listening-badge {
    /* Same as default badge — no red tint during recording */
  }

  /* Processing Shimmer — coral gradient sweep over badge container */
  .field-badges-container-modern.processing-shimmer {
    position: relative;
    overflow: hidden;
  }

  .field-badges-container-modern.processing-shimmer::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(249, 115, 22, 0.05) 25%,
      rgba(249, 115, 22, 0.12) 50%,
      rgba(249, 115, 22, 0.05) 75%,
      transparent 100%
    );
    animation: shimmer-sweep 2.5s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes shimmer-sweep {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  /* Badge text */
  .badge-text {
    font-size: var(--text-sm);
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  /* Form Info Notice */
  .form-info-notice-modern {
    position: relative;
    margin: var(--space-4) 0 0;
    padding: var(--space-4);
    background: var(--primary-50);
    border: 1px solid var(--primary-100);
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  @media (max-width: 480px) {
    .form-info-notice-modern {
      margin: var(--space-3) 0 0;
      padding: var(--space-3) var(--space-3);
      font-size: 12px;
      border-radius: var(--radius-lg);
    }
  }

  .form-notice-modern {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--accent-700);
    margin: 0;
    line-height: var(--leading-relaxed);
    text-align: center;
  }
`;
