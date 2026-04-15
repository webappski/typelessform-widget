import { css } from 'lit';

export const accordionStyles = css`
  /* Progress bar (used in success header) */
  .progress-fill-modern {
    position: relative;
    height: 100%;
    border-radius: var(--radius-full);
    transition: width 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .progress-integrated {
    margin-top: var(--space-3);
    width: 100%;
  }

  .progress-inline-container {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .progress-track-slim {
    position: relative;
    flex: 1;
    height: 6px;
    background: var(--gray-200);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .progress-value-inline {
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
    min-width: 35px;
    text-align: right;
  }

  @media (max-width: 480px) {
    .modal-text-group {
      max-width: 100%;
    }

    .progress-integrated {
      margin-top: var(--space-4);
    }

    .progress-inline-container {
      gap: var(--space-2);
    }

    .progress-value-inline {
      font-size: 13px;
      min-width: 30px;
    }
  }
`;
