import { css } from 'lit';

export const loadingStyles = css`
  /* Loading / Processing State */
  .processing-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--space-10) var(--space-5);
    min-height: 200px;
  }

  /* Spinner container */
  .processing-icon {
    position: relative;
    width: 56px;
    height: 56px;
    margin-bottom: var(--space-5);
  }

  /* Spinning ring — 2px refined track (coral accent) */
  .spinner-track {
    position: absolute;
    inset: 0;
    border: 2px solid var(--gray-200);
    border-top-color: var(--accent-500);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Bolt icon centered inside spinner */
  .spinner-icon {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner-icon svg {
    width: 24px;
    height: 24px;
    color: var(--accent-500);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Title */
  .processing-text {
    font-size: var(--text-lg);
    color: var(--gray-700);
    margin: 0 0 var(--space-1) 0;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: var(--leading-tight);
  }

  /* Subtitle / stage label */
  .processing-subtitle {
    font-size: var(--text-sm);
    color: var(--gray-500);
    line-height: var(--leading-relaxed);
    margin: 0;
  }

  /* Progress bar */
  .processing-progress {
    margin-top: var(--space-5);
    width: 100%;
    max-width: 200px;
  }

  .processing-progress-track {
    height: 4px;
    background: var(--gray-200);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .processing-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-500), var(--accent-400));
    border-radius: var(--radius-full);
    transition: width 300ms ease;
  }

  /* Processing Stepper */
  .processing-stepper {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: var(--space-6) var(--space-5);
  }

  .stepper-step {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) 0;
    position: relative;
  }

  /* Vertical connector line between steps */
  .stepper-step:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 11px;
    top: calc(var(--space-3) + 24px);
    bottom: calc(-1 * var(--space-3));
    width: 2px;
    background: var(--gray-200);
    border-radius: var(--radius-full);
  }

  .stepper-step--done:not(:last-child)::after {
    background: var(--success-500);
  }

  .stepper-step--active:not(:last-child)::after {
    background: linear-gradient(to bottom, var(--accent-300), var(--gray-200));
  }

  /* Indicator circles */
  .stepper-indicator {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .stepper-done {
    background: var(--success-500);
    color: white;
  }

  .stepper-done svg {
    width: 14px;
    height: 14px;
  }

  .stepper-active {
    background: var(--accent-100);
    border: 2px solid var(--accent-500);
  }

  .stepper-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent-500);
    animation: stepper-pulse 1.5s ease-in-out infinite;
  }

  @keyframes stepper-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.5; }
  }

  .stepper-pending {
    background: var(--gray-100);
    border: 2px solid var(--gray-300);
  }

  /* Step label */
  .stepper-label {
    font-size: var(--text-sm);
    line-height: var(--leading-tight);
    color: var(--gray-500);
    letter-spacing: -0.01em;
  }

  .stepper-step--done .stepper-label {
    color: var(--gray-700);
  }

  .stepper-step--active .stepper-label {
    color: var(--gray-900);
    font-weight: 600;
  }

  @media (max-width: 480px) {
    .processing-stepper {
      padding: var(--space-5) var(--space-4);
    }
  }

  /* Listening Timer Section */
  .listening-timer-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-4) 0;
  }

  .listening-timer {
    font-size: var(--text-4xl);
    font-weight: 700;
    color: var(--gray-900);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .listening-timer-max {
    font-size: var(--text-xs);
    color: var(--gray-400);
    margin-top: var(--space-1);
  }

  .listening-progress {
    width: 100%;
    max-width: 200px;
    margin-top: var(--space-3);
  }

  .listening-progress-track {
    height: 3px;
    background: var(--gray-200);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .listening-progress-fill {
    height: 100%;
    background: var(--error-500);
    border-radius: var(--radius-full);
    transition: width 1s linear;
  }

  @media (max-width: 480px) {
    .processing-content {
      padding: var(--space-8) var(--space-4);
      min-height: 180px;
    }

    .modal-content {
      margin: 0;
      padding: 0;
    }

    .close-button {
      top: var(--space-4);
      right: var(--space-4);
      width: 36px;
      height: 36px;
    }

    .close-button svg {
      width: 18px;
      height: 18px;
    }
  }

  /* ═══ Processing Orb Visualization ═══ */

  .processing-viz {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-6) 0 var(--space-8);
    gap: var(--space-5);
  }

  .orb-container {
    position: relative;
    width: 120px;
    height: 120px;
  }

  .orb-ring {
    position: absolute;
    inset: 0;
  }

  .orb-ring svg {
    width: 120px;
    height: 120px;
    transform: rotate(-90deg);
  }

  .orb-ring-track {
    fill: none;
    stroke: var(--gray-150, var(--gray-200));
    stroke-width: 3;
  }

  .orb-ring-fill {
    fill: none;
    stroke: url(#orbGradient);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 339.292;
    stroke-dashoffset: 339.292;
    transition: stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .orb-core {
    position: absolute;
    inset: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-50) 0%, var(--accent-100) 100%);
    border: 1.5px solid var(--accent-200);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 24px rgba(249, 115, 22, 0.12);
    animation: orb-breathe 3s ease-in-out infinite;
  }

  .orb-core svg {
    width: 32px;
    height: 32px;
    color: var(--accent-500);
  }

  @keyframes orb-breathe {
    0%, 100% { transform: scale(1); box-shadow: 0 4px 24px rgba(249, 115, 22, 0.12); }
    50% { transform: scale(1.03); box-shadow: 0 6px 32px rgba(249, 115, 22, 0.18); }
  }

  .orb-particles {
    position: absolute;
    inset: -8px;
  }

  .orb-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent-400);
    opacity: 0.6;
    animation: particle-orbit 4s linear infinite;
  }

  .orb-particle:nth-child(1) { top: 0; left: 50%; animation-delay: 0s; }
  .orb-particle:nth-child(2) { top: 50%; right: 0; animation-delay: -1s; }
  .orb-particle:nth-child(3) { bottom: 0; left: 50%; animation-delay: -2s; }

  @keyframes particle-orbit {
    0% { transform: rotate(0deg) translateX(62px) rotate(0deg) scale(0.8); opacity: 0.3; }
    25% { opacity: 0.8; transform: rotate(90deg) translateX(62px) rotate(-90deg) scale(1); }
    50% { opacity: 0.3; transform: rotate(180deg) translateX(62px) rotate(-180deg) scale(0.8); }
    75% { opacity: 0.8; transform: rotate(270deg) translateX(62px) rotate(-270deg) scale(1); }
    100% { transform: rotate(360deg) translateX(62px) rotate(-360deg) scale(0.8); opacity: 0.3; }
  }

  .processing-stage {
    text-align: center;
  }

  .processing-stage-label {
    font-size: 15px;
    font-weight: 700;
    color: var(--gray-900);
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }

  .processing-stage-meta {
    font-size: 12px;
    color: var(--gray-400);
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .processing-steps {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 0;
  }

  .processing-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gray-300);
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .processing-dot--done {
    background: var(--success-500);
  }

  .processing-dot--active {
    width: 20px;
    border-radius: var(--radius-full);
    background: linear-gradient(90deg, var(--accent-500), var(--accent-400));
    box-shadow: 0 0 0 3px var(--accent-100);
  }

  /* ═══ Listening Footer Layout (timer + stop) ═══ */

  .listening-footer-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
  }

  .listening-footer-timer {
    display: flex;
    align-items: baseline;
    gap: 3px;
    font-variant-numeric: tabular-nums;
  }

  .listening-footer-timer-value {
    font-size: 22px;
    font-weight: 800;
    color: var(--error-500);
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .listening-footer-timer-sep {
    font-size: 14px;
    color: var(--gray-300);
    font-weight: 500;
    margin: 0 1px;
  }

  .listening-footer-timer-max {
    font-size: 14px;
    color: var(--gray-400);
    font-weight: 500;
  }

  /* ═══ Scanning Orb Visualization ═══ */

  .scanning-viz {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-6) 0 var(--space-8);
    gap: var(--space-5);
  }

  /* ── Indeterminate sweep ring ── */
  .scan-ring {
    position: absolute;
    inset: 0;
  }

  .scan-ring svg {
    width: 120px;
    height: 120px;
    animation: scan-ring-rotate 2.5s linear infinite;
  }

  .scan-ring-track {
    fill: none;
    stroke: var(--gray-150, var(--gray-200));
    stroke-width: 3;
  }

  .scan-ring-sweep {
    fill: none;
    stroke: url(#scanGradient);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 120 220;
  }

  @keyframes scan-ring-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* ── Scan core (reuses .orb-core base, adds distinct breathing) ── */
  .scan-core {
    animation: scan-breathe 3s ease-in-out infinite;
  }

  @keyframes scan-breathe {
    0%, 100% { transform: scale(1); box-shadow: 0 4px 24px rgba(249, 115, 22, 0.12); }
    50% { transform: scale(1.05); box-shadow: 0 8px 32px rgba(249, 115, 22, 0.22); }
  }

  /* ── Flying badge-pills ── */
  .scan-pills {
    position: absolute;
    inset: -20px;
    pointer-events: none;
  }

  .scan-pill-orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
  }

  .scan-pill {
    position: absolute;
    height: 14px;
    transform: translateX(-50%) translateY(-80px);
    border-radius: var(--radius-full);
    background: var(--accent-100);
    border: 1.5px solid var(--accent-300);
    box-shadow: 0 2px 8px rgba(249, 115, 22, 0.1);
    animation: pill-collect 3s ease-in-out infinite;
    opacity: 0;
  }

  @keyframes pill-collect {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(-88px) scale(0.4);
    }
    12% {
      opacity: 1;
      transform: translateX(-50%) translateY(-72px) scale(1);
    }
    50% {
      opacity: 0.85;
      transform: translateX(-50%) translateY(-38px) scale(0.75);
    }
    82% {
      opacity: 0.3;
      transform: translateX(-50%) translateY(-10px) scale(0.3);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(0) scale(0);
    }
  }

  /* ── Scanning pulsing dots ── */
  .scanning-dots {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .scanning-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-400);
    animation: scan-dot-pulse 1.4s ease-in-out infinite;
  }

  .scanning-dot:nth-child(2) { animation-delay: 0.2s; }
  .scanning-dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes scan-dot-pulse {
    0%, 100% { opacity: 0.3; transform: scale(0.7); }
    50% { opacity: 1; transform: scale(1.3); }
  }

  /* ── Scanning header progress (indeterminate) ── */
  .scanning-header-progress {
    margin-top: var(--space-1);
    width: 100%;
  }

  .scanning-header-progress-track {
    height: 3px;
    background: var(--gray-150, var(--gray-200));
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .scanning-header-progress-fill {
    height: 100%;
    width: 30%;
    background: linear-gradient(90deg, var(--accent-500), var(--accent-400));
    border-radius: var(--radius-full);
    animation: indeterminate-slide 1.8s ease-in-out infinite;
  }

  @keyframes indeterminate-slide {
    0% { transform: translateX(-120%); }
    50% { transform: translateX(200%); }
    100% { transform: translateX(450%); }
  }
`;
