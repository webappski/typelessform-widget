import { css } from 'lit';

export const headerStyles = css`
  /* Modal Header (legacy) */
  .modal-header {
    text-align: center;
  }

  .modal-icon {
    width: 56px;
    height: 56px;
    background: var(--primary-50);
    border-radius: var(--radius-xl);
    margin: 0 auto var(--space-6);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 1px solid var(--primary-100);
    box-shadow: var(--shadow-sm);
  }

  .modal-icon svg {
    width: 28px;
    height: 28px;
    color: var(--primary-500);
  }

  .modal-title {
    font-size: var(--text-4xl);
    font-weight: 600;
    color: var(--gray-700);
    margin: 0 0 var(--space-4) 0;
    letter-spacing: -0.04em;
    line-height: var(--leading-tight);
  }

  .modal-subtitle {
    font-size: var(--text-lg);
    color: var(--gray-600);
    margin: 0;
    line-height: var(--leading-relaxed);
    letter-spacing: -0.01em;
  }

  /* Compact Modern Header */
  .modal-header-compact-modern {
    position: relative;
    padding: var(--space-4) var(--space-5);
    margin-bottom: 0;
    border-bottom: 1px solid var(--gray-200);
    background: var(--white);
    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
    overflow: hidden;
    flex-shrink: 0;
  }

  /* Subtle bottom divider */
  .modal-header-compact-modern::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 20px;
    height: 1px;
    background: var(--gray-150, var(--gray-200));
  }

  @media (max-width: 480px) {
    .modal-header-compact-modern {
      padding: var(--space-4) var(--space-5);
    }
  }

  /* Success header */
  .modal-header-compact-modern.success-header .modal-header-content {
    gap: var(--space-3);
  }

  .modal-header-compact-modern.success-header .modal-text-group {
    max-width: calc(100% - 50px);
  }

  @media (max-width: 480px) {
    .modal-header-compact-modern.success-header .modal-text-group {
      max-width: calc(100% - 40px);
    }
  }

  .modal-header-compact-modern.listening-header {
    border-bottom-color: var(--error-100);
  }

  .modal-header-content {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    position: relative;
    z-index: 1;
  }

  /* Compact Icon — 40px, warm glass */
  .modal-icon-compact-modern {
    position: relative;
    width: 40px;
    height: 40px;
    background: var(--primary-50);
    border: 1.5px solid var(--primary-200);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: var(--shadow-xs);
    transition: all var(--transition-base);
  }

  @media (max-width: 480px) {
    .modal-icon-compact-modern {
      width: 36px;
      height: 36px;
    }

    .modal-icon-compact-modern svg {
      width: 18px;
      height: 18px;
    }
  }

  .modal-icon-compact-modern:hover {
    box-shadow: var(--shadow-sm);
  }

  .modal-icon-compact-modern.listening-icon {
    background: var(--error-50);
    border-color: var(--error-200);
    animation: listening-icon-pulse 2s ease-in-out infinite;
  }

  @keyframes listening-icon-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.15); }
    50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.08); }
  }

  .modal-icon-compact-modern svg {
    width: 20px;
    height: 20px;
    color: var(--primary-500);
  }

  .modal-icon-compact-modern.listening-icon svg {
    color: var(--error-500);
  }

  /* Text Group */
  .modal-text-group {
    flex: 1;
    max-width: calc(100% - 40px);
  }

  .modal-title-compact {
    font-size: 17px;
    font-weight: 700;
    color: var(--gray-900);
    margin: 0 0 2px 0;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }

  .modal-subtitle-compact {
    font-size: 13px;
    color: var(--gray-500);
    margin: 0;
    line-height: 1.4;
    font-weight: 500;
  }

  @media (max-width: 480px) {
    .modal-title-compact {
      font-size: var(--text-lg);
    }

    .modal-subtitle-compact {
      font-size: 12px;
    }
  }

  /* Close Button — 30px, warm stone */
  .close-button-modern {
    margin-left: auto;
    width: 30px;
    height: 30px;
    border-radius: var(--radius-md);
    border: 1px solid var(--gray-200);
    background: var(--white);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: all var(--transition-base);
    color: var(--gray-400);
    flex-shrink: 0;
  }

  .close-button-modern:hover {
    background: var(--gray-100);
    border-color: var(--gray-300);
    color: var(--gray-700);
  }

  .close-button-modern:active {
    transform: scale(0.95);
  }

  .close-button-modern svg {
    width: 14px;
    height: 14px;
  }

  @media (max-width: 480px) {
    .close-button-modern {
      width: 36px;
      height: 36px;
      margin-left: var(--space-2);
    }

    .close-button-modern svg {
      width: 18px;
      height: 18px;
    }
  }

  /* Header Decoration — listening stripe */
  .header-decoration {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gray-200);
  }

  .listening-decoration {
    background: linear-gradient(90deg, var(--error-500), var(--error-400), var(--error-500));
    background-size: 200% 100%;
    animation: stripe-flow 2s linear infinite;
  }

  @keyframes stripe-flow {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Logo Icon — brand icon, fills 80% of container */
  .modal-icon-compact-modern.logo-icon {
    background: var(--primary-50);
    border: 1.5px solid var(--primary-200);
    box-shadow: var(--shadow-xs);
  }

  .modal-icon-compact-modern.logo-icon svg {
    width: 28px;
    height: 28px;
    animation: icon-pulse 2s ease-in-out infinite;
  }

  @keyframes icon-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.08);
      opacity: 0.85;
    }
  }

  /* Processing Icon — subtle pulse */
  .modal-icon-compact-modern.processing-icon {
    animation: processing-pulse 2s ease-in-out infinite;
    background: var(--primary-50);
    border-color: var(--primary-200);
  }

  .modal-icon-compact-modern.processing-icon svg {
    color: var(--primary-500);
  }

  @keyframes processing-pulse {
    0%, 100% {
      box-shadow: var(--shadow-xs);
      opacity: 1;
    }
    50% {
      box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
      opacity: 0.8;
    }
  }

  /* Processing Progress — thin bar in header */
  .processing-header-progress {
    margin-top: var(--space-1);
    width: 100%;
  }

  .processing-header-progress-track {
    height: 3px;
    background: var(--gray-150, var(--gray-200));
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .processing-header-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-500), var(--primary-400));
    border-radius: var(--radius-full);
    transition: width 500ms ease;
  }

  /* Listening Timer — embedded in header subtitle slot */
  .listening-header-timer {
    display: flex;
    align-items: baseline;
    gap: var(--space-1);
    margin-top: 2px;
  }

  .listening-header-time {
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--error-500);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
  }

  .listening-header-sep {
    font-size: var(--text-xs);
    color: var(--gray-400);
    font-weight: 400;
  }

  .listening-header-max {
    font-size: var(--text-xs);
    color: var(--gray-400);
    font-variant-numeric: tabular-nums;
  }

  .listening-header-progress {
    margin-top: var(--space-1);
    width: 100%;
  }

  .listening-header-progress-track {
    height: 3px;
    background: var(--gray-150, var(--gray-200));
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .listening-header-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--error-500), var(--error-600));
    border-radius: var(--radius-full);
    transition: width 1s linear;
  }

  /* Hero Layout — centered mic-as-CTA for initial state */
  .modal-hero-layout {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-6) var(--space-5) var(--space-4);
    text-align: center;
  }

  .modal-hero-layout .hero-close {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
  }

  .hero-mic-button {
    width: 64px;
    height: 64px;
    background: linear-gradient(180deg, var(--primary-500) 0%, var(--primary-600) 100%);
    border: none;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.15);
    color: white;
    padding: 0;
  }

  .hero-mic-button:hover {
    background: linear-gradient(180deg, var(--primary-400) 0%, var(--primary-500) 100%);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg), var(--shadow-accent);
  }

  .hero-mic-button:active {
    transform: translateY(0);
    box-shadow: var(--shadow-md);
  }

  .hero-mic-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .hero-mic-button svg {
    width: 28px;
    height: 28px;
    color: white;
  }

  .hero-title {
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--gray-900);
    margin: var(--space-4) 0 var(--space-1) 0;
    letter-spacing: -0.02em;
    line-height: var(--leading-tight);
  }

  .hero-subtitle {
    font-size: var(--text-sm);
    color: var(--gray-500);
    margin: 0;
    line-height: var(--leading-relaxed);
    font-weight: 500;
  }

  @media (max-width: 480px) {
    .modal-hero-layout {
      padding: var(--space-5) var(--space-4) var(--space-3);
    }

    .hero-mic-button {
      width: 56px;
      height: 56px;
    }

    .hero-mic-button svg {
      width: 24px;
      height: 24px;
    }

    .hero-title {
      font-size: var(--text-base);
    }
  }

  /* Legacy selectors — kept for backward compatibility, minimal styling */
  .modal-header-modern {
    text-align: center;
    position: relative;
    padding: var(--space-8) var(--space-6) var(--space-6);
    background: var(--gray-50);
    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
    overflow: hidden;
  }

  .modal-icon-wrapper {
    position: relative;
    width: 72px;
    height: 72px;
    margin: 0 auto var(--space-6);
  }

  .modal-icon-modern {
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--primary-500);
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);
  }

  .modal-icon-modern:hover {
    box-shadow: var(--shadow-lg);
  }

  .modal-icon-modern.listening {
    background: var(--error-500);
  }

  .modal-icon-modern svg {
    width: 36px;
    height: 36px;
    color: white;
    z-index: 1;
  }

  /* Modern Typography */
  .modal-title-modern {
    font-size: var(--text-4xl);
    font-weight: 700;
    color: var(--gray-900);
    margin: 0 0 var(--space-3) 0;
    letter-spacing: -0.04em;
    line-height: var(--leading-tight);
  }

  .modal-subtitle-modern {
    font-size: var(--text-lg);
    color: var(--gray-600);
    margin: 0;
    line-height: var(--leading-relaxed);
    letter-spacing: -0.01em;
    opacity: 0.9;
  }

`;
