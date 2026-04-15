import { css } from 'lit';

export const buttonStyles = css`
  /* Base Button */
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-5);
    border: none;
    border-radius: var(--radius-lg);
    font-size: var(--text-base);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-base);
    min-height: 44px;
    letter-spacing: -0.01em;
    line-height: var(--leading-tight);
    position: relative;
    overflow: hidden;
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button svg {
    width: 20px;
    height: 20px;
  }

  .button span {
    z-index: 1;
  }

  .button-primary {
    background: linear-gradient(180deg, var(--primary-500) 0%, var(--primary-600) 100%);
    color: white;
    box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.15);
    border: 1px solid var(--primary-600);
  }

  .button-primary:hover:not(:disabled) {
    background: linear-gradient(180deg, var(--primary-400) 0%, var(--primary-500) 100%);
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg), var(--shadow-accent);
  }

  .button-primary:active:not(:disabled) {
    transform: translateY(0);
    transition: all var(--transition-fast);
  }

  .button-secondary {
    background: white;
    color: var(--gray-700);
    border: 1.5px solid var(--gray-200);
    box-shadow: var(--shadow-sm);
  }

  .button-secondary:hover:not(:disabled) {
    background: var(--gray-50);
    border-color: var(--gray-300);
    transform: translateY(-1px);
  }

  .button-full {
    width: 100%;
  }

  /* Success Apply Button */
  .button-success-apply {
    background: linear-gradient(180deg, var(--success-500) 0%, var(--success-600) 100%);
    color: white;
    box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.15);
    padding: var(--space-3) var(--space-6);
    font-size: var(--text-base);
    font-weight: 700;
    letter-spacing: -0.02em;
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
  }

  .button-success-apply:hover:not(:disabled) {
    background: linear-gradient(180deg, var(--success-400) 0%, var(--success-500) 100%);
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg), var(--shadow-success);
  }

  .button-success-apply:active:not(:disabled) {
    transform: translateY(0);
  }

  .button-success-apply .button-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
  }

  .button-success-apply svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    .modal-footer-modern.success-footer {
      padding: var(--space-4) var(--space-5) calc(var(--space-4) + env(safe-area-inset-bottom));
    }

    .button-success-apply {
      padding: var(--space-3) var(--space-5);
      font-size: var(--text-base);
    }

    .modal-footer-modern.success-footer .button-secondary-modern {
      background: transparent;
      color: var(--gray-600);
      border: none;
      box-shadow: none;
      padding: var(--space-3) var(--space-6);
      font-size: var(--text-sm);
      opacity: 0.8;
      transition: opacity var(--transition-fast);
    }

    .modal-footer-modern.success-footer .button-secondary-modern:hover {
      opacity: 1;
      background: transparent;
      transform: none;
    }
  }

  @media (min-width: 768px) {
    .modal-footer-modern.success-footer {
      gap: var(--space-3);
      padding: var(--space-5) var(--space-6) var(--space-6);
    }
  }

  /* Modern Button */
  .button-modern {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: var(--space-3) var(--space-5);
    border: none;
    border-radius: var(--radius-lg);
    font-size: var(--text-base);
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    transition: all var(--transition-base);
    min-height: 44px;
  }

  @media (max-width: 480px) {
    .button-modern {
      padding: var(--space-3) var(--space-5);
      font-size: 15px;
      border-radius: var(--radius-lg);
    }
  }

  .button-modern:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button-modern:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .button-modern:active:not(:disabled) {
    transform: translateY(0);
    transition-duration: 100ms;
  }

  /* Button Content */
  .button-content {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    z-index: 1;
  }

  .button-content svg {
    width: 20px;
    height: 20px;
  }

  .button-content span {
    letter-spacing: -0.01em;
  }

  /* Primary Modern */
  .button-primary-modern {
    background: linear-gradient(180deg, var(--primary-500) 0%, var(--primary-600) 100%);
    color: white;
    box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.15);
  }

  .button-primary-modern:hover:not(:disabled) {
    background: linear-gradient(180deg, var(--primary-400) 0%, var(--primary-500) 100%);
    box-shadow: var(--shadow-lg), var(--shadow-accent);
  }

  /* Danger Modern */
  .button-danger-modern {
    background: var(--error-500);
    color: white;
    box-shadow: var(--shadow-md);
  }

  .button-danger-modern:hover:not(:disabled) {
    background: var(--error-600);
    box-shadow: var(--shadow-lg);
  }

  /* Secondary Modern */
  .button-secondary-modern {
    background: white;
    color: var(--gray-700);
    border: 1px solid var(--gray-200);
    margin-top: var(--space-3);
  }

  .button-secondary-modern:hover {
    background: var(--gray-50);
    border-color: var(--gray-300);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  /* Round Stop Button (Listening) */
  .button-stop-round {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(180deg, var(--error-500) 0%, var(--error-600) 100%);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.15);
    transition: all var(--transition-base);
    padding: 0;
  }

  .button-stop-round:hover {
    box-shadow: var(--shadow-lg), var(--shadow-error);
    transform: translateY(-2px) scale(1.04);
  }

  .button-stop-round:active {
    transform: translateY(0);
  }

  .button-stop-round svg {
    width: 24px;
    height: 24px;
  }

  /* Ghost Footer — disabled CTA preview during loading */
  .ghost-footer {
    opacity: 1;
    pointer-events: none;
  }

  .ghost-footer .button-modern {
    opacity: 0.6;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.9), 0 0 0 4px var(--accent-300);
  }
`;
