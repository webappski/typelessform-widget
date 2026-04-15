import { css } from 'lit';

export const errorStyles = css`
  /* Error State */
  .error-content {
    text-align: center;
    padding: var(--space-8) var(--space-6);
  }

  .error-icon {
    width: 56px;
    height: 56px;
    background: var(--error-50);
    border-radius: var(--radius-lg);
    margin: 0 auto var(--space-6);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--error-200);
    box-shadow: var(--shadow-sm);
  }

  .error-icon svg {
    width: 28px;
    height: 28px;
    color: var(--error-500);
  }

  .error-title {
    font-size: var(--text-xl);
    color: var(--gray-900);
    margin-bottom: var(--space-3);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: var(--leading-tight);
  }

  .error-message {
    color: var(--gray-600);
    margin-bottom: var(--space-6);
    line-height: var(--leading-relaxed);
    font-size: var(--text-base);
  }

  .error-details {
    margin: var(--space-4) 0;
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-lg);
    background: var(--gray-50);
  }

  .error-details-summary {
    padding: var(--space-4);
    cursor: pointer;
    font-weight: 600;
    color: var(--gray-700);
    background: var(--gray-100);
    border-radius: var(--radius-lg);
    transition: background-color var(--transition-base);
  }

  .error-details-summary:hover {
    background: var(--gray-200);
  }

  .error-details-content {
    padding: var(--space-4);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
    background: white;
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    max-height: 300px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
    color: var(--gray-800);
    line-height: 1.4;
  }

  /* Error header icon tint (used inside renderModalHeader) */
  .error-icon-header {
    background: var(--error-50);
    border: 1px solid var(--error-200);
  }

  .error-icon-header svg {
    color: var(--error-500);
  }

  /* Error header decoration — red accent line */
  .error-header .header-decoration {
    background: linear-gradient(90deg, var(--error-500), var(--error-300));
  }

  /* Info header icon tint — neutral gray for informational states (e.g. "no fields found") */
  .info-icon-header {
    background: var(--gray-100);
    border: 1px solid var(--gray-300);
  }

  .info-icon-header svg {
    color: var(--gray-500);
  }

  /* Error actions in modal-body */
  .error-actions {
    padding: var(--space-4) 0 var(--space-2);
  }
`;
