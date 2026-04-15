import { css } from 'lit';

export const tooltipStyles = css`
  /* Extend clickable area */
  .badge-group::before {
    content: '';
    position: absolute;
    top: calc(var(--space-2) * -1);
    bottom: calc(var(--space-2) * -1);
    left: 0;
    right: 0;
  }

  /* Field Tooltip — solid bg, single shadow */
  .field-tooltip {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    padding: 0;
    min-width: 200px;
    z-index: 1000000;
    animation: tooltip-appear 0.2s ease-out;
    overflow-y: auto;
    overflow-x: hidden;
    position: fixed;
  }

  .field-tooltip:hover {
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
  }

  /* Neutral scrollbar */
  .field-tooltip::-webkit-scrollbar {
    width: 4px;
  }

  .field-tooltip::-webkit-scrollbar-track {
    background: transparent;
  }

  .field-tooltip::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: 2px;
    transition: background 0.2s ease;
  }

  .field-tooltip::-webkit-scrollbar-thumb:hover {
    background: var(--gray-400);
  }

  /* Firefox scrollbar */
  .field-tooltip {
    scrollbar-width: thin;
    scrollbar-color: var(--gray-300) transparent;
  }

  @keyframes tooltip-appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .tooltip-field-name {
    font-weight: 600;
    font-size: 15px;
    color: var(--primary-600);
    margin-bottom: var(--space-2);
  }

  .tooltip-divider {
    height: 1px;
    background: var(--gray-200);
    margin: var(--space-2) 0;
  }

  .tooltip-section {
    margin: 4px 0;
    position: relative;
    padding: 4px 0;
  }

  .tooltip-section:hover {
    background: var(--gray-50);
    transform: translateX(2px);
  }

  /* Highlight values going to form */
  .tooltip-field-section > .tooltip-value {
    font-weight: 600;
    color: var(--gray-900);
  }

  .tooltip-section:last-child .tooltip-value {
    font-weight: 600;
    color: var(--gray-900);
  }

  .tooltip-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--gray-600);
    margin-bottom: 3px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .tooltip-value {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-800);
    word-break: break-word;
    line-height: 1.4;
  }

  .tooltip-close {
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-lg);
    cursor: pointer;
    color: var(--gray-500);
    transition: all var(--transition-base);
    pointer-events: all;
    box-shadow: var(--shadow-xs);
  }

  .tooltip-close:hover {
    background: var(--gray-50);
    border-color: var(--gray-300);
    color: var(--gray-700);
  }

  .tooltip-close:active {
    transform: scale(0.95);
  }

  /* Group tooltip */
  .tooltip-group-title {
    font-weight: 600;
    font-size: 14px;
    color: var(--gray-700);
    margin: 0;
    padding: var(--space-3) var(--space-3) var(--space-2) var(--space-3);
    padding-right: 48px;
    text-align: left;
    letter-spacing: -0.01em;
    line-height: 36px;
    border-bottom: 1px solid var(--gray-200);
  }

  .tooltip-content-wrapper {
    padding: var(--space-3);
  }

  .tooltip-field-section {
    margin: var(--space-1) 0;
    padding: var(--space-2);
    background: var(--gray-50);
    border-radius: var(--radius-md);
    border: 1px solid var(--gray-100);
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
  }

  .tooltip-field-section .tooltip-field-name {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--gray-700);
  }

  /* Active Form Highlighting */
`;
