import { css } from 'lit';

export const formInfoStyles = css`
  /* Form Info Notice */
  .form-info-notice {
    margin: var(--space-4) 0;
    padding: var(--space-3) var(--space-4);
    background: var(--primary-50);
    border: 1px solid var(--primary-200);
    border-radius: var(--radius-lg);
    text-align: center;
  }

  .form-notice {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--primary-700);
    margin: 0;
    line-height: var(--leading-tight);
  }

  /* Progress Header */
  .progress-header {
    padding: 0 0 var(--space-3) 0;
    margin-bottom: var(--space-3);
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-2);
  }

  .progress-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--gray-700);
  }

  .progress-percentage {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-600);
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: var(--gray-100);
    border-radius: var(--radius-full);
    overflow: hidden;
    position: relative;
  }

  .progress-fill {
    height: 100%;
    background: var(--primary-500);
    border-radius: var(--radius-full);
    transition: width var(--transition-base);
  }

  .verification-icon-wrap {
    width: 28px;
    height: 28px;
    background: var(--warning-500);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .verification-icon-wrap svg {
    color: white;
  }

  .verification-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--warning-700);
    letter-spacing: -0.01em;
  }

  .verification-divider {
    height: 1px;
    background: var(--warning-100);
    margin: 0;
  }

  /* Form Info Card */
  .form-info-card {
    background: var(--primary-50);
    border: 1px solid var(--primary-100);
    border-radius: var(--radius-xl);
    padding: var(--space-4);
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-top: 0;
    margin-bottom: var(--space-5);
  }

  .form-info-icon {
    width: 40px;
    height: 40px;
    background: var(--primary-500);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .form-info-icon svg {
    width: 20px;
    height: 20px;
    color: white;
  }

  .form-info-content {
    flex: 1;
    min-width: 0;
  }

  .form-info-title {
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--gray-900);
    margin: 0 0 var(--space-1) 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .form-info-meta {
    font-size: var(--text-sm);
    color: var(--gray-600);
    margin: 0;
  }

  .form-info-text {
    text-align: center;
  }

  .form-info-title-text {
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--gray-900);
    margin: 0 0 var(--space-2);
    line-height: var(--leading-tight);
  }

  .form-info-meta-text {
    font-size: var(--text-sm);
    color: var(--gray-600);
    margin: 0;
    line-height: var(--leading-relaxed);
  }
`;
