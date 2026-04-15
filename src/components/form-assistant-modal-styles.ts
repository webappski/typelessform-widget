/* eslint-disable max-lines */
/**
 * Styles for FormAssistantModal — extracted to reduce file size.
 * CSS tagged template literal for Lit's static styles.
 * Synced with main style modules (Warm Glass redesign).
 */
import { css } from 'lit';

export const formAssistantModalStyles = css`
    :host {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
      --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px; --space-12: 48px;
      --radius-xs: 4px; --radius-sm: 6px; --radius-md: 10px; --radius-lg: 14px; --radius-xl: 20px; --radius-2xl: 24px; --radius-full: 9999px;
      --gray-25: #FDFCFB; --gray-50: #FAFAF8; --gray-100: #F5F5F4; --gray-150: #EEECEB; --gray-200: #E7E5E4; --gray-300: #D6D3D1; --gray-400: #A8A29E;
      --gray-500: #78716C; --gray-600: #57534E; --gray-700: #44403C; --gray-800: #292524; --gray-900: #1C1917; --gray-950: #0C0A09;
      --white: #ffffff;
      --accent-50: #FFF7ED; --accent-100: #FFEDD5; --accent-200: #FED7AA;
      --accent-300: #FDBA74; --accent-400: #FB923C;
      --accent-500: #F97316; --accent-600: #EA580C; --accent-700: #C2410C;
      --primary-50: var(--accent-50); --primary-100: var(--accent-100); --primary-200: var(--accent-200);
      --primary-300: var(--accent-300); --primary-400: var(--accent-400);
      --primary-500: var(--accent-500); --primary-600: var(--accent-600); --primary-700: var(--accent-700);
      --success-50: #F0FDF4; --success-100: #DCFCE7; --success-200: #BBF7D0;
      --success-300: #86EFAC;
      --success-500: #22C55E; --success-600: #16A34A; --success-700: #15803D;
      --error-50: #FEF2F2; --error-100: #FEE2E2; --error-200: #FECACA; --error-500: #EF4444; --error-600: #DC2626;
      --warning-50: #FFFBEB; --warning-100: #FEF3C7; --warning-200: #FDE68A; --warning-300: #FCD34D;
      --warning-500: #F59E0B; --warning-600: #D97706; --warning-700: #B45309; --warning-800: #92400E;
      --transition-fast: 150ms cubic-bezier(0.22, 1, 0.36, 1); --transition-base: 250ms cubic-bezier(0.22, 1, 0.36, 1);
      --transition-spring: 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
      --leading-relaxed: 1.625; --leading-tight: 1.25;
      --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem;
      --text-lg: 1.125rem; --text-xl: 1.25rem; --text-2xl: 1.5rem; --text-3xl: 1.875rem; --text-4xl: 2.25rem;
      --shadow-xs: 0 1px 2px rgba(28, 25, 23, 0.04);
      --shadow-sm: 0 2px 6px rgba(28, 25, 23, 0.06);
      --shadow-md: 0 4px 16px rgba(28, 25, 23, 0.08);
      --shadow-lg: 0 12px 32px rgba(28, 25, 23, 0.10);
      --shadow-xl: 0 20px 48px rgba(28, 25, 23, 0.12);
      --shadow-accent: 0 4px 20px rgba(249, 115, 22, 0.25);
      --shadow-accent-lg: 0 8px 32px rgba(249, 115, 22, 0.30);
      --shadow-success: 0 4px 20px rgba(34, 197, 94, 0.20);
      --shadow-error: 0 4px 20px rgba(239, 68, 68, 0.20);
    }
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);
      z-index: var(--modal-z-index, 1000000); display: none;
      align-items: center; justify-content: center; padding: var(--space-4);
      opacity: 0; transition: opacity var(--transition-base);
      contain: strict; will-change: opacity;
    }
    @media (max-width: 480px) { .modal-overlay { padding: var(--space-4); align-items: center; justify-content: center; } }
    @media (max-height: 600px) and (max-width: 480px) { .modal-overlay { align-items: center; padding: var(--space-2); } }
    .modal-overlay.active { display: flex; opacity: 1; }
    .modal-content {
      background: #fff; border: 1px solid var(--gray-200);
      box-shadow: var(--shadow-xl);
      border-radius: var(--radius-2xl); padding: 0; width: 100%; max-width: 480px; position: relative;
      transform: scale(0.95); opacity: 0;
      transition: transform var(--transition-spring), opacity var(--transition-base);
      display: flex; flex-direction: column; max-height: calc(90vh - var(--space-8)); overflow: hidden;
      contain: layout style paint; will-change: transform, opacity;
    }
    .modal-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
      z-index: 10;
      pointer-events: none;
    }
    @media (max-width: 480px) {
      .modal-content { max-width: calc(100% - var(--space-3)); max-height: 85vh; min-height: auto; height: auto; border-radius: var(--radius-2xl); transform: scale(0.95); opacity: 0; transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); }
      .modal-overlay.active .modal-content { transform: scale(1); opacity: 1; }
    }
    @media (max-height: 600px) and (max-width: 480px) { .modal-content { max-height: 85vh; height: auto; border-radius: var(--radius-2xl); } }
    .modal-overlay.active .modal-content { transform: scale(1); opacity: 1; line-height: var(--leading-relaxed); }
    .modal-content--success { max-width: 680px; }
    .close-button { position: absolute; top: var(--space-4); right: var(--space-4); width: 36px; height: 36px; border-radius: var(--radius-lg); border: 1px solid var(--gray-200); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; transition: all var(--transition-base); z-index: 100; color: var(--gray-500); }
    .close-button:hover { background: var(--gray-100); border-color: var(--gray-300); color: var(--gray-700); }
    .close-button:active { transform: scale(0.95); }
    .close-button svg { width: 18px; height: 18px; }
    .modal-body { flex: 1; overflow-y: auto; overflow-x: hidden; padding: var(--space-4) var(--space-5) var(--space-5); -webkit-overflow-scrolling: touch; scroll-behavior: smooth; min-height: 0; display: flex; flex-direction: column; }
    .modal-body::-webkit-scrollbar { width: 6px; }
    .modal-body::-webkit-scrollbar-track { background: transparent; border-radius: var(--radius-full); }
    .modal-body::-webkit-scrollbar-thumb { background: var(--gray-300); border-radius: var(--radius-full); }
    .modal-body::-webkit-scrollbar-thumb:hover { background: var(--gray-500); }
    @media (max-width: 480px) { .modal-body { padding: var(--space-3) var(--space-4) var(--space-4); } }
    .processing-content { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: var(--space-10) var(--space-5); min-height: 200px; }
    .processing-icon { position: relative; width: 56px; height: 56px; margin-bottom: var(--space-5); }
    .spinner-track { position: absolute; inset: 0; border: 2px solid var(--gray-200); border-top-color: var(--accent-500); border-radius: 50%; animation: spin 0.8s linear infinite; }
    .spinner-icon { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
    .spinner-icon svg { width: 24px; height: 24px; color: var(--accent-500); }
    .processing-text { font-size: var(--text-lg); color: var(--gray-700); margin: 0 0 var(--space-1) 0; font-weight: 600; letter-spacing: -0.01em; line-height: var(--leading-tight); }
    .processing-subtitle { font-size: var(--text-sm); color: var(--gray-500); line-height: var(--leading-relaxed); margin: 0; }
    .processing-progress { margin-top: var(--space-5); width: 100%; max-width: 200px; }
    .processing-progress-track { height: 4px; background: var(--gray-200); border-radius: var(--radius-full); overflow: hidden; }
    .processing-progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent-500), var(--accent-400)); border-radius: var(--radius-full); transition: width 300ms ease; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .processing-stepper { display: flex; flex-direction: column; gap: 0; padding: var(--space-6) var(--space-5); }
    .stepper-step { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; position: relative; }
    .stepper-step:not(:last-child)::after { content: ''; position: absolute; left: 11px; top: calc(var(--space-3) + 24px); bottom: calc(-1 * var(--space-3)); width: 2px; background: var(--gray-200); border-radius: var(--radius-full); }
    .stepper-step--done:not(:last-child)::after { background: var(--success-500); }
    .stepper-step--active:not(:last-child)::after { background: linear-gradient(to bottom, var(--accent-300), var(--gray-200)); }
    .stepper-indicator { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; z-index: 1; }
    .stepper-done { background: var(--success-500); color: white; }
    .stepper-done svg { width: 14px; height: 14px; }
    .stepper-active { background: var(--accent-100); border: 2px solid var(--accent-500); }
    .stepper-pulse { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-500); animation: stepper-pulse 1.5s ease-in-out infinite; }
    @keyframes stepper-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.5; } }
    .stepper-pending { background: var(--gray-100); border: 2px solid var(--gray-300); }
    .stepper-label { font-size: var(--text-sm); line-height: var(--leading-tight); color: var(--gray-500); letter-spacing: -0.01em; }
    .stepper-step--done .stepper-label { color: var(--gray-700); }
    .stepper-step--active .stepper-label { color: var(--gray-900); font-weight: 600; }
    .carousel-progress-dots { display: flex; align-items: center; justify-content: center; gap: 8px; padding: var(--space-4) 0 var(--space-2); }
    .carousel-dot { width: 8px; height: 8px; border-radius: 50%; transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1); }
    .carousel-dot--done { background: var(--success-500); }
    .carousel-dot--active { background: var(--accent-500); width: 20px; border-radius: 9999px; box-shadow: 0 0 0 3px var(--accent-100); }
    .carousel-dot--pending { background: var(--gray-300); }
    .carousel-viewport { --carousel-card-width: 160px; --carousel-gap: 0px; position: relative; overflow: hidden; padding: var(--space-4) 0 var(--space-2); }
    .carousel-track { display: flex; gap: var(--carousel-gap); transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1); will-change: transform; padding-left: calc((100% - var(--carousel-card-width)) / 2); }
    .carousel-card { position: relative; width: var(--carousel-card-width); flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: var(--space-2); padding: var(--space-4) var(--space-3); background: var(--gray-50); border: 1.5px solid var(--gray-200); border-radius: var(--radius-lg); text-align: center; transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1); }
    .carousel-card--active { background: var(--white); border-color: var(--accent-400); box-shadow: var(--shadow-md); transform: scale(1.04); }
    .carousel-card--done { background: var(--success-50); border-color: var(--success-200); }
    .carousel-card--pending { opacity: 0.5; }
    .carousel-card-icon-wrap { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
    .carousel-card-icon { width: 44px; height: 44px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; background: var(--accent-50); color: var(--accent-500); }
    .carousel-card--active .carousel-card-icon { background: var(--accent-100); box-shadow: var(--shadow-sm); }
    .carousel-card--done .carousel-card-icon { background: var(--success-50); color: var(--success-500); }
    .carousel-card-icon svg { width: 22px; height: 22px; }
    .carousel-card-check { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--success-500); color: white; }
    .carousel-card-check svg { width: 20px; height: 20px; }
    .carousel-card-title { font-size: var(--text-xs); font-weight: 600; color: var(--gray-800); line-height: var(--leading-tight); letter-spacing: -0.01em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .carousel-card--active .carousel-card-title { color: var(--gray-900); }
    .carousel-card-meta { font-size: 10px; color: var(--gray-400); font-weight: 500; font-variant-numeric: tabular-nums; }
    .carousel-card--active .carousel-card-meta { color: var(--accent-500); font-weight: 600; }
    .carousel-card-connector { position: absolute; right: -1px; top: 50%; width: 2px; height: 24px; transform: translateX(100%) translateY(-50%); border-radius: var(--radius-full); }
    .carousel-card-connector--done { background: var(--success-300); }
    .carousel-card-connector--pending { background: var(--gray-200); }
    @media (max-width: 480px) { .carousel-viewport { --carousel-card-width: 140px; } .carousel-card { padding: var(--space-3) var(--space-2); } .carousel-card-icon-wrap { width: 40px; height: 40px; } .carousel-card-icon { width: 40px; height: 40px; } .carousel-card-check { width: 40px; height: 40px; } .carousel-card-icon svg { width: 20px; height: 20px; } }
    .listening-timer-section { display: flex; flex-direction: column; align-items: center; padding: var(--space-4) 0; }
    .listening-timer { font-size: var(--text-4xl); font-weight: 700; color: var(--gray-900); font-variant-numeric: tabular-nums; letter-spacing: -0.02em; line-height: 1; }
    .listening-timer-max { font-size: var(--text-xs); color: var(--gray-400); margin-top: var(--space-1); }
    .listening-progress { width: 100%; max-width: 200px; margin-top: var(--space-3); }
    .listening-progress-track { height: 3px; background: var(--gray-200); border-radius: var(--radius-full); overflow: hidden; }
    .listening-progress-fill { height: 100%; background: var(--error-500); border-radius: var(--radius-full); transition: width 1s linear; }
    .listening-footer { align-items: center; }
    .error-content { text-align: center; padding: var(--space-8) var(--space-6); }
    .error-icon { width: 56px; height: 56px; background: var(--error-50); border-radius: var(--radius-lg); margin: 0 auto var(--space-6); display: flex; align-items: center; justify-content: center; border: 1px solid var(--error-100); box-shadow: var(--shadow-sm); }
    .error-icon svg { width: 28px; height: 28px; color: var(--error-500); }
    .error-title { font-size: var(--text-xl); color: var(--gray-900); margin-bottom: var(--space-3); font-weight: 700; letter-spacing: -0.02em; line-height: var(--leading-tight); }
    .error-message { color: var(--gray-600); margin-bottom: var(--space-6); line-height: var(--leading-relaxed); font-size: var(--text-base); }
    .error-details { margin: var(--space-4) 0; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); background: var(--gray-50); }
    .error-details-summary { padding: var(--space-4); cursor: pointer; font-weight: 600; color: var(--gray-700); background: var(--gray-100); border-radius: var(--radius-lg); transition: background-color var(--transition-base); }
    .error-details-summary:hover { background: var(--gray-200); }
    .error-details-content { padding: var(--space-4); font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 12px; background: white; border-radius: 0 0 var(--radius-lg) var(--radius-lg); max-height: 300px; overflow-y: auto; white-space: pre-wrap; word-break: break-word; color: var(--gray-800); line-height: 1.4; }
    .error-icon-header { background: var(--error-50); border: 1px solid var(--error-100); }
    .error-icon-header svg { color: var(--error-500); }
    .error-header .header-decoration { background: linear-gradient(90deg, var(--error-500), var(--error-300)); }
    .error-actions { padding: var(--space-4) 0 var(--space-2); }
    .button { padding: var(--space-3) var(--space-5); border: none; border-radius: var(--radius-lg); font-size: var(--text-base); font-weight: 600; cursor: pointer; transition: all var(--transition-base); display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); min-height: 44px; }
    .button-primary { background: linear-gradient(180deg, var(--primary-500) 0%, var(--primary-600) 100%); color: white; box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.15); border: 1px solid var(--primary-600); }
    .button-primary:hover:not(:disabled) { background: linear-gradient(180deg, var(--primary-400) 0%, var(--primary-500) 100%); box-shadow: var(--shadow-lg), var(--shadow-accent); transform: translateY(-1px); }
    .button-full { width: 100%; }
    .modal-header-compact-modern { position: relative; padding: var(--space-4) var(--space-5); margin-bottom: 0; border-bottom: 1px solid var(--gray-200); background: var(--white); border-radius: var(--radius-2xl) var(--radius-2xl) 0 0; overflow: hidden; flex-shrink: 0; }
    .modal-header-compact-modern::after { content: ''; position: absolute; bottom: 0; left: 20px; right: 20px; height: 1px; background: var(--gray-150, var(--gray-200)); }
    @media (max-width: 480px) { .modal-header-compact-modern { padding: var(--space-4) var(--space-5); } }
    .modal-header-compact-modern.success-header .modal-header-content { gap: var(--space-3); }
    .modal-header-compact-modern.success-header .modal-text-group { max-width: calc(100% - 50px); }
    @media (max-width: 480px) { .modal-header-compact-modern.success-header .modal-text-group { max-width: calc(100% - 40px); } }
    .modal-header-compact-modern.listening-header { border-bottom-color: rgba(239, 68, 68, 0.15); }
    .modal-header-content { display: flex; align-items: center; gap: var(--space-4); position: relative; z-index: 1; }
    .modal-icon-compact-modern { position: relative; width: 40px; height: 40px; background: var(--primary-50); border: 1.5px solid var(--primary-200); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: var(--shadow-xs); transition: all var(--transition-base); }
    .modal-icon-compact-modern.listening-icon { background: var(--error-50); border-color: var(--error-200); animation: listening-icon-pulse 2s ease-in-out infinite; }
    @keyframes listening-icon-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.15); } 50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.08); } }
    .modal-icon-compact-modern svg { width: 20px; height: 20px; color: var(--primary-500); }
    .modal-icon-compact-modern.listening-icon svg { color: var(--error-500); }
    .icon-glow-subtle { display: none; }
    .listening-glow { display: none; }
    .modal-text-group { flex: 1; min-width: 0; max-width: calc(100% - 40px); }
    .modal-title-compact { font-size: 17px; font-weight: 700; color: var(--gray-900); margin: 0 0 2px 0; letter-spacing: -0.02em; line-height: 1.3; text-align: left; }
    @media (max-width: 480px) { .modal-title-compact { font-size: var(--text-lg); } }
    .modal-subtitle-compact { font-size: 13px; color: var(--gray-500); margin: 0; line-height: 1.4; font-weight: 500; text-align: left; }
    @media (max-width: 480px) { .modal-subtitle-compact { font-size: 12px; } }
    .close-button-modern { margin-left: auto; width: 30px; height: 30px; border-radius: var(--radius-md); border: 1px solid var(--gray-200); background: var(--white); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; transition: all var(--transition-base); color: var(--gray-400); flex-shrink: 0; }
    .close-button-modern:hover { background: var(--gray-100); border-color: var(--gray-300); color: var(--gray-700); }
    .close-button-modern:active { transform: scale(0.95); }
    .close-button-modern svg { width: 14px; height: 14px; }
    @media (max-width: 480px) { .close-button-modern { width: 36px; height: 36px; margin-left: var(--space-2); } .close-button-modern svg { width: 18px; height: 18px; } }
    .header-decoration { position: absolute; bottom: -1px; left: 0; right: 0; height: 2px; background: var(--gray-200); }
    .header-decoration.listening-decoration { background: linear-gradient(90deg, var(--error-500), var(--error-400), var(--error-500)); background-size: 200% 100%; animation: stripe-flow 2s linear infinite; }
    @keyframes stripe-flow { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    .modal-icon-compact-modern.logo-icon { background: var(--primary-50); border: 1.5px solid var(--primary-200); box-shadow: var(--shadow-xs); }
    .modal-icon-compact-modern.logo-icon svg { width: 28px; height: 28px; animation: icon-pulse 2s ease-in-out infinite; }
    @keyframes icon-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.08); opacity: 0.85; } }
    .modal-icon-compact-modern.processing-icon { animation: processing-pulse 2s ease-in-out infinite; background: var(--primary-50); border-color: var(--primary-200); }
    .modal-icon-compact-modern.processing-icon svg { color: var(--primary-500); }
    @keyframes processing-pulse { 0%, 100% { box-shadow: var(--shadow-xs); opacity: 1; } 50% { box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1); opacity: 0.8; } }
    .processing-header-progress { margin-top: var(--space-1); width: 100%; }
    .processing-header-progress-track { height: 3px; background: var(--gray-150, var(--gray-200)); border-radius: var(--radius-full); overflow: hidden; }
    .processing-header-progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary-500), var(--primary-400)); border-radius: var(--radius-full); transition: width 500ms ease; }
    .field-badges-container-modern.processing-shimmer { position: relative; overflow: hidden; }
    .field-badges-container-modern.processing-shimmer::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent 0%, rgba(249, 115, 22, 0.05) 25%, rgba(249, 115, 22, 0.12) 50%, rgba(249, 115, 22, 0.05) 75%, transparent 100%); animation: shimmer-sweep 2.5s ease-in-out infinite; pointer-events: none; z-index: 1; }
    @keyframes shimmer-sweep { 0% { left: -100%; } 100% { left: 100%; } }
    .listening-header-timer { display: flex; align-items: baseline; gap: var(--space-1); margin-top: 2px; }
    .listening-header-time { font-size: var(--text-base); font-weight: 700; color: var(--error-500); font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
    .listening-header-sep { font-size: var(--text-xs); color: var(--gray-400); font-weight: 400; }
    .listening-header-max { font-size: var(--text-xs); color: var(--gray-400); font-variant-numeric: tabular-nums; }
    .listening-header-progress { margin-top: var(--space-1); width: 100%; }
    .listening-header-progress-track { height: 3px; background: var(--gray-150, var(--gray-200)); border-radius: var(--radius-full); overflow: hidden; }
    .listening-header-progress-fill { height: 100%; background: linear-gradient(90deg, var(--error-500), var(--error-600)); border-radius: var(--radius-full); transition: width 1s linear; }
    .header-decoration.success-decoration { background: var(--gray-200); }
    .modal-hero-layout { position: relative; display: flex; flex-direction: column; align-items: center; padding: var(--space-6) var(--space-5) var(--space-4); text-align: center; }
    .modal-hero-layout .hero-close { position: absolute; top: var(--space-4); right: var(--space-4); }
    .hero-mic-button { width: 64px; height: 64px; background: linear-gradient(180deg, var(--primary-500) 0%, var(--primary-600) 100%); border: none; border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all var(--transition-base); box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.15); color: white; padding: 0; }
    .hero-mic-button:hover { background: linear-gradient(180deg, var(--primary-400) 0%, var(--primary-500) 100%); transform: translateY(-2px); box-shadow: var(--shadow-lg), var(--shadow-accent); }
    .hero-mic-button:active { transform: translateY(0); box-shadow: var(--shadow-md); }
    .hero-mic-button:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .hero-mic-button svg { width: 28px; height: 28px; color: white; }
    .hero-title { font-size: var(--text-lg); font-weight: 700; color: var(--gray-900); margin: var(--space-4) 0 var(--space-1) 0; letter-spacing: -0.02em; line-height: var(--leading-tight); }
    .hero-subtitle { font-size: var(--text-sm); color: var(--gray-500); margin: 0; line-height: var(--leading-relaxed); font-weight: 500; }
    @media (max-width: 480px) { .modal-hero-layout { padding: var(--space-5) var(--space-4) var(--space-3); } .hero-mic-button { width: 56px; height: 56px; } .hero-mic-button svg { width: 24px; height: 24px; } .hero-title { font-size: var(--text-base); } }
    .form-info-notice { margin: var(--space-4) 0; padding: var(--space-3) var(--space-4); background: var(--primary-50); border: 1px solid var(--primary-200); border-radius: var(--radius-lg); text-align: center; }
    .form-notice { font-size: var(--text-sm); font-weight: 600; color: var(--primary-700); margin: 0; line-height: var(--leading-tight); }
    .field-badges-container-modern { margin: var(--space-4) 0; padding: 0; }
    .field-badges-label { font-size: var(--text-sm); color: var(--gray-700); margin-bottom: var(--space-2); font-weight: 500; }
    .field-badges-modern { display: flex; flex-wrap: wrap; gap: var(--space-2); justify-content: flex-start; padding: var(--space-2) 0; align-content: flex-start; line-height: 1.8; }
    .field-badges-modern.scrollable { max-height: calc(90vh - 350px); overflow-y: auto; padding: var(--space-3) var(--space-3) var(--space-3) 0; }
    .field-badge-modern { position: relative; display: inline-block; padding: 6px 12px; background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: var(--radius-full); font-size: 13px; font-weight: 600; color: var(--gray-700); letter-spacing: -0.01em; user-select: none; cursor: default; }
    .field-badge-modern.listening-badge { /* neutral — no tint during recording */ }
    .badge-text { font-size: var(--text-sm); font-weight: 500; letter-spacing: -0.01em; }
    .modal-footer-modern { margin-top: auto; padding: var(--space-5) var(--space-5); border-top: 1px solid var(--gray-200); background: var(--white); flex-shrink: 0; display: flex; flex-direction: column; gap: var(--space-4); justify-content: center; align-items: center; }
    @media (max-width: 480px) { .modal-footer-modern { padding: var(--space-4) 20px calc(var(--space-4) + env(safe-area-inset-bottom)); } }
    .modal-footer-modern.success-footer { padding: var(--space-4) var(--space-5) var(--space-5); background: var(--white); border-top: 1px solid var(--gray-200); display: flex; flex-direction: column; gap: var(--space-2); align-items: stretch; }
    .modal-footer-modern.success-footer .button-modern { width: 100%; }
    .button-modern { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; padding: var(--space-3) var(--space-5); border: none; border-radius: var(--radius-lg); font-size: var(--text-base); font-weight: 600; cursor: pointer; overflow: hidden; transition: all var(--transition-base); min-height: 44px; }
    @media (max-width: 480px) { .button-modern { padding: var(--space-3) var(--space-5); font-size: 15px; border-radius: var(--radius-lg); } }
    .button-modern:disabled { opacity: 0.5; cursor: not-allowed; }
    .button-modern:hover:not(:disabled) { transform: translateY(-1px); }
    .button-modern:active:not(:disabled) { transform: translateY(0); transition-duration: 100ms; }
    .button-glow { display: none; }
    .danger-glow { display: none; }
    .button-content { position: relative; display: flex; align-items: center; gap: var(--space-3); z-index: 1; }
    .button-content svg { width: 20px; height: 20px; }
    .button-primary-modern { background: linear-gradient(180deg, var(--primary-500) 0%, var(--primary-600) 100%); color: white; box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.15); }
    .button-primary-modern:hover:not(:disabled) { background: linear-gradient(180deg, var(--primary-400) 0%, var(--primary-500) 100%); box-shadow: var(--shadow-lg), var(--shadow-accent); }
    .button-danger-modern { background: var(--error-500); color: white; box-shadow: var(--shadow-md); }
    .button-danger-modern:hover:not(:disabled) { background: var(--error-600); box-shadow: var(--shadow-lg); }
    .button-secondary-modern { background: white; color: var(--gray-700); border: 1px solid var(--gray-200); margin-top: var(--space-3); }
    .button-secondary-modern:hover { background: var(--gray-50); border-color: var(--gray-300); box-shadow: var(--shadow-sm); }
    .button-success-apply { background: linear-gradient(180deg, var(--success-500) 0%, var(--success-600) 100%); color: white; box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.15); padding: var(--space-3) var(--space-6); font-size: var(--text-base); font-weight: 700; letter-spacing: -0.02em; border-radius: var(--radius-lg); transition: all var(--transition-base); }
    .button-success-apply:hover:not(:disabled) { background: linear-gradient(180deg, #34d399 0%, var(--success-500) 100%); transform: translateY(-1px); box-shadow: var(--shadow-lg), var(--shadow-success); }
    .button-success-apply:active:not(:disabled) { transform: translateY(0); }
    .button-stop-round { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(180deg, var(--error-500) 0%, var(--error-600) 100%); color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.15); transition: all var(--transition-base); padding: 0; }
    .button-stop-round:hover { box-shadow: var(--shadow-lg), var(--shadow-error); transform: translateY(-2px) scale(1.04); }
    .button-stop-round:active { transform: translateY(0); }
    .button-stop-round svg { width: 24px; height: 24px; }
    .ghost-footer { opacity: 1; pointer-events: none; }
    .ghost-footer .button-modern { opacity: 0.6; box-shadow: 0 0 0 2px rgba(255,255,255,0.9), 0 0 0 4px var(--accent-300); }
    .progress-integrated { margin-top: var(--space-2); }
    .progress-inline-container { display: flex; align-items: center; gap: var(--space-3); }
    .progress-track-slim { flex: 1; height: 6px; background: var(--gray-100); border-radius: var(--radius-full); overflow: hidden; position: relative; }
    .progress-fill-modern { height: 100%; background: var(--primary-500); border-radius: var(--radius-full); transition: width var(--transition-base); position: relative; }
    .progress-value-inline { font-size: 13px; font-weight: 600; color: var(--primary-500); min-width: 36px; text-align: right; }
    .field-icon-modern--success { color: var(--success-500); }
    .field-icon-modern--warning { color: var(--warning-600); }
    .modal-icon-compact-modern.success-icon { background: var(--gray-100); border-color: var(--gray-300); }
    .modal-icon-compact-modern.success-icon svg { color: var(--gray-600); width: 20px; height: 20px; }
    .success-decoration { background: var(--gray-200); }
    .progress-fill-modern--success { background: linear-gradient(90deg, var(--success-500), var(--success-600)); }
    .progress-value-inline--success { color: var(--success-600); }
    .success-stats-ribbon { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) 0; flex-wrap: wrap; }
    .stat-pill { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: var(--radius-full); font-size: 11px; font-weight: 600; letter-spacing: 0.01em; line-height: 1; white-space: nowrap; }
    .stat-pill svg { width: 12px; height: 12px; flex-shrink: 0; }
    .stat-pill--success { background: var(--success-50); color: var(--success-700); border: 1px solid var(--success-200); }
    .stat-pill--warning { background: var(--warning-50); color: var(--warning-700); border: 1px solid var(--warning-200); }
    .stat-pill--empty { background: var(--error-50); color: var(--error-600); border: 1px solid var(--error-200); }
    .success-field-list { display: flex; flex-direction: column; gap: 0; padding: 0 0 var(--space-2); }
    .success-section-label { display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) 0 var(--space-2); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--gray-400); border-bottom: 1px solid var(--gray-100); margin-bottom: var(--space-1); }
    .success-section-label:first-child { padding-top: 0; }
    .success-section-count { font-weight: 500; text-transform: none; letter-spacing: normal; color: var(--gray-400); font-size: 11px; }
    .success-field-row { display: flex; align-items: center; gap: var(--space-2); padding: 7px var(--space-1); min-height: 36px; border-bottom: 1px solid var(--gray-100); transition: background var(--transition-fast); }
    .success-field-row:hover { background: none; }
    .success-field-row:last-of-type { border-bottom: none; }
    .success-field-dot { width: 18px; height: 18px; border-radius: var(--radius-sm); flex-shrink: 0; display: flex; align-items: center; justify-content: center; position: relative; }
    .success-field-dot--success { background: var(--success-50); border: 1.5px solid var(--success-300); }
    .success-field-dot--success::after { content: ''; width: 5px; height: 8px; border: solid var(--success-500); border-width: 0 1.5px 1.5px 0; transform: rotate(45deg) translateY(-1px); }
    .success-field-dot--warning { background: var(--warning-50); border: 1.5px solid var(--warning-300); width: 18px; height: 18px; border-radius: var(--radius-sm); }
    .success-field-dot--warning::after { content: '!'; font-size: 10px; font-weight: 800; color: var(--warning-600); line-height: 1; }
    .success-field-dot--error { background: var(--gray-100); border: 1.5px solid var(--gray-300); width: 18px; height: 18px; border-radius: var(--radius-sm); }
    .success-field-label { font-size: var(--text-sm); font-weight: 500; color: var(--gray-600); flex-shrink: 1; min-width: 80px; line-height: var(--leading-tight); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .field-long-head.truncated[data-tooltip]:hover::before, .field-long-head.truncated[data-tooltip]:hover::after { visibility: visible; opacity: 1; }
    .field-long-head[data-tooltip]::before { content: attr(data-tooltip); visibility: hidden; opacity: 0; position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); max-width: 280px; padding: 8px 12px; background: var(--gray-900); color: var(--gray-50); font-size: 12px; font-weight: 500; line-height: 1.4; letter-spacing: -0.01em; border-radius: 8px; white-space: normal; word-break: break-word; box-shadow: 0 8px 24px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08); z-index: 100; pointer-events: none; transition: opacity 0.1s ease; }
    .field-long-head[data-tooltip]::after { content: ''; visibility: hidden; opacity: 0; position: absolute; bottom: calc(100% + 2px); left: 50%; margin-left: -5px; width: 10px; height: 10px; background: var(--gray-900); transform: rotate(45deg); border-radius: 0 0 2px 0; z-index: 99; pointer-events: none; transition: opacity 0.1s ease; }
    .success-field-value { font-size: var(--text-sm); color: var(--gray-900); font-weight: 600; margin-left: auto; text-align: right; word-break: break-word; max-width: 55%; min-width: 60px; flex-shrink: 0; line-height: var(--leading-tight); }
    .success-field-empty { font-size: var(--text-sm); color: var(--gray-400); margin-left: auto; }
    .success-field-row--empty .success-field-label { color: var(--gray-500); }
    .success-empty-chips { display: flex; flex-wrap: wrap; gap: var(--space-2); padding: var(--space-2) 0; }
    .success-empty-chip { display: inline-flex; align-items: center; padding: 4px 10px; background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: 500; color: var(--gray-500); line-height: 1.2; white-space: nowrap; }
    .field-card-modern { position: relative; display: flex; flex-direction: column; border: 1px solid var(--success-100); border-radius: var(--radius-md); padding: var(--space-3); margin: var(--space-1) 0; transition: all var(--transition-fast); }
    .field-card-modern:hover { background: var(--gray-50); box-shadow: var(--shadow-xs); }
    .field-card-modern--warning { background: var(--warning-50); border-color: var(--warning-200); border-left: 3px solid var(--warning-400); }
    .field-card-modern--warning:hover { background: rgba(251, 191, 36, 0.08); box-shadow: var(--shadow-sm); }
    .field-card-modern--translated { padding: var(--space-3); }
    .field-header-modern { display: flex; align-items: flex-start; gap: var(--space-2); }
    .field-icon-modern { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
    .field-icon-modern svg { width: 14px; height: 14px; }
    .field-text-group { flex: 1; min-width: 0; }
    .field-label-modern { font-size: var(--text-sm); font-weight: 600; color: var(--gray-900); margin: 0; line-height: var(--leading-tight); }
    .field-value-modern { font-size: var(--text-sm); font-weight: 500; color: var(--gray-600); line-height: var(--leading-relaxed); margin-top: 2px; }
    .translation-flow-modern { display: flex; align-items: stretch; gap: var(--space-2); margin-top: var(--space-3); margin-left: 28px; }
    .translation-step-modern { display: flex; flex-direction: column; gap: 3px; flex: 1; min-width: 0; }
    .translation-arrow { display: flex; align-items: center; color: var(--gray-400); font-size: var(--text-sm); flex-shrink: 0; padding-top: 14px; }
    .step-label-modern { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gray-400); }
    .step-value-modern { font-size: var(--text-xs); font-weight: 500; color: var(--gray-600); padding: var(--space-2); background: var(--gray-50); border-radius: var(--radius-sm); border: 1px solid var(--gray-200); line-height: var(--leading-relaxed); word-break: break-word; }
    .step-value-modern--highlighted { background: var(--success-50); border-color: var(--success-200); color: var(--gray-900); font-weight: 600; }
    .field-card-modern--warning .step-value-modern--highlighted { background: var(--warning-50); border-color: var(--warning-200); }
    .success-cancel-link { background: transparent !important; border: none !important; box-shadow: none !important; color: var(--gray-500) !important; font-size: var(--text-sm) !important; font-weight: 500 !important; margin-top: 0 !important; min-height: 36px !important; }
    .success-cancel-link:hover { color: var(--gray-700) !important; background: transparent !important; transform: none !important; box-shadow: none !important; }
    @media (max-width: 480px) { .success-stats-ribbon { gap: var(--space-1); } .stat-pill { font-size: 10px; padding: 3px 8px; } .translation-flow-modern { flex-direction: column; gap: var(--space-2); margin-left: 0; } .translation-arrow { display: none; } .success-field-value { max-width: 50%; } }
    .consent-warning-body { flex: 1; }
    .consent-warning-title { font-size: var(--text-sm); font-weight: 600; color: var(--warning-700); margin: 0 0 var(--space-1) 0; }
    .consent-warning-text { flex: 1; margin: 0; font-size: var(--text-sm); line-height: 1.6; color: var(--gray-700); font-weight: 500; }
    .consent-summary { padding: 0 var(--space-2); }
    .consent-full-details { margin-top: var(--space-3); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); overflow: hidden; }
    .consent-details-toggle { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) var(--space-4); font-size: var(--text-sm); font-weight: 600; color: var(--primary-600); cursor: pointer; list-style: none; transition: background var(--transition-fast); }
    .consent-details-toggle::-webkit-details-marker { display: none; }
    .consent-details-toggle::before { content: ''; display: inline-block; width: 0; height: 0; border-left: 5px solid currentColor; border-top: 4px solid transparent; border-bottom: 4px solid transparent; transition: transform var(--transition-fast); }
    .consent-full-details[open] .consent-details-toggle::before { transform: rotate(90deg); }
    .consent-details-toggle:hover { background: var(--gray-50); }
    .consent-full-details[open] .consent-details-text { border-top: 1px solid var(--gray-200); }
    .consent-warning-banner { display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-4); margin-bottom: var(--space-4); background: var(--warning-50); border: 1px solid var(--warning-200); border-radius: var(--radius-lg); border-left: 4px solid var(--warning-500); }
    .consent-warning-icon { flex-shrink: 0; width: 24px; height: 24px; color: var(--warning-600); display: flex; align-items: center; justify-content: center; }
    .consent-main-title { font-size: var(--text-lg); font-weight: 700; color: var(--gray-900); margin: 0 0 var(--space-1) 0; letter-spacing: -0.02em; }
    .consent-section-title { margin: var(--space-4) 0 var(--space-3) 0; font-size: var(--text-base); font-weight: 700; color: var(--gray-900); padding: 0 var(--space-4); }
    .consent-section-title:first-child { margin-top: 0; }
    .consent-details-text { padding: var(--space-2); }
    .consent-list { margin: 0; padding-left: var(--space-5); list-style: disc; }
    .consent-list li { margin-bottom: var(--space-2); font-size: var(--text-sm); line-height: 1.6; color: var(--gray-700); }
    .consent-list li:last-child { margin-bottom: 0; }
    .consent-list li strong { color: var(--gray-900); font-weight: 600; }
    .consent-footer-legal { font-size: var(--text-xs); color: var(--gray-600); line-height: 1.5; margin: 0 0 var(--space-4) 0; padding: var(--space-4); background: var(--gray-50); border-radius: var(--radius-lg); border-left: 3px solid var(--primary-500); }
    .consent-footer-line { margin: 0 0 var(--space-2) 0; }
    .consent-footer-line:last-child { margin-bottom: 0; }
    .consent-checkboxes { display: flex; flex-direction: column; gap: var(--space-3); margin: var(--space-4) 0; padding: 0 var(--space-4); }
    .consent-checkbox-item { display: flex; align-items: flex-start; gap: var(--space-2); cursor: pointer; user-select: none; padding: var(--space-2); border-radius: var(--radius-md); transition: background-color 0.15s ease; }
    .consent-checkbox-item:hover { background-color: var(--gray-50); }
    .consent-checkbox-input { flex-shrink: 0; width: 16px; height: 16px; margin-top: 1px; cursor: pointer; accent-color: var(--primary-500); }
    .consent-checkbox-label { font-size: 0.6875rem; line-height: 1.4; color: var(--gray-700); flex: 1; }
    .consent-checkbox-item:hover .consent-checkbox-label { color: var(--gray-900); }

    /* ═══ Processing Orb Visualization ═══ */
    .processing-viz { display: flex; flex-direction: column; align-items: center; padding: var(--space-6) 0 var(--space-8); gap: var(--space-5); }
    .orb-container { position: relative; width: 120px; height: 120px; }
    .orb-ring { position: absolute; inset: 0; }
    .orb-ring svg { width: 120px; height: 120px; transform: rotate(-90deg); }
    .orb-ring-track { fill: none; stroke: var(--gray-150, var(--gray-200)); stroke-width: 3; }
    .orb-ring-fill { fill: none; stroke: url(#orbGradient); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 339.292; stroke-dashoffset: 339.292; transition: stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1); }
    .orb-core { position: absolute; inset: 16px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-50) 0%, var(--accent-100) 100%); border: 1.5px solid var(--accent-200); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 24px rgba(249, 115, 22, 0.12); animation: orb-breathe 3s ease-in-out infinite; }
    .orb-core svg { width: 32px; height: 32px; color: var(--accent-500); }
    @keyframes orb-breathe { 0%, 100% { transform: scale(1); box-shadow: 0 4px 24px rgba(249, 115, 22, 0.12); } 50% { transform: scale(1.03); box-shadow: 0 6px 32px rgba(249, 115, 22, 0.18); } }
    .orb-particles { position: absolute; inset: -8px; }
    .orb-particle { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: var(--accent-400); opacity: 0.6; animation: particle-orbit 4s linear infinite; }
    .orb-particle:nth-child(1) { top: 0; left: 50%; animation-delay: 0s; }
    .orb-particle:nth-child(2) { top: 50%; right: 0; animation-delay: -1s; }
    .orb-particle:nth-child(3) { bottom: 0; left: 50%; animation-delay: -2s; }
    @keyframes particle-orbit { 0% { transform: rotate(0deg) translateX(62px) rotate(0deg) scale(0.8); opacity: 0.3; } 25% { opacity: 0.8; transform: rotate(90deg) translateX(62px) rotate(-90deg) scale(1); } 50% { opacity: 0.3; transform: rotate(180deg) translateX(62px) rotate(-180deg) scale(0.8); } 75% { opacity: 0.8; transform: rotate(270deg) translateX(62px) rotate(-270deg) scale(1); } 100% { transform: rotate(360deg) translateX(62px) rotate(-360deg) scale(0.8); opacity: 0.3; } }
    .processing-stage { text-align: center; }
    .processing-stage-label { font-size: 15px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.02em; margin-bottom: 4px; }
    .processing-stage-meta { font-size: 12px; color: var(--gray-400); font-weight: 500; font-variant-numeric: tabular-nums; }
    .processing-steps { display: flex; align-items: center; gap: 6px; padding: 4px 0; }
    .processing-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gray-300); transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
    .processing-dot--done { background: var(--success-500); }
    .processing-dot--active { width: 20px; border-radius: var(--radius-full); background: linear-gradient(90deg, var(--accent-500), var(--accent-400)); box-shadow: 0 0 0 3px var(--accent-100); }

    /* ═══ Scanning Orb Visualization ═══ */
    .scanning-viz { display: flex; flex-direction: column; align-items: center; padding: var(--space-6) 0 var(--space-8); gap: var(--space-5); }
    .scan-ring { position: absolute; inset: 0; }
    .scan-ring svg { width: 120px; height: 120px; animation: scan-ring-rotate 2.5s linear infinite; }
    .scan-ring-track { fill: none; stroke: var(--gray-150, var(--gray-200)); stroke-width: 3; }
    .scan-ring-sweep { fill: none; stroke: url(#scanGradient); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 120 220; }
    @keyframes scan-ring-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .scan-core { animation: scan-breathe 3s ease-in-out infinite; }
    @keyframes scan-breathe { 0%, 100% { transform: scale(1); box-shadow: 0 4px 24px rgba(249, 115, 22, 0.12); } 50% { transform: scale(1.05); box-shadow: 0 8px 32px rgba(249, 115, 22, 0.22); } }
    .scan-pills { position: absolute; inset: -20px; pointer-events: none; }
    .scan-pill-orbit { position: absolute; top: 50%; left: 50%; width: 0; height: 0; }
    .scan-pill { position: absolute; height: 14px; transform: translateX(-50%) translateY(-80px); border-radius: var(--radius-full); background: var(--accent-100); border: 1.5px solid var(--accent-300); box-shadow: 0 2px 8px rgba(249, 115, 22, 0.1); animation: pill-collect 3s ease-in-out infinite; opacity: 0; }
    @keyframes pill-collect { 0% { opacity: 0; transform: translateX(-50%) translateY(-88px) scale(0.4); } 12% { opacity: 1; transform: translateX(-50%) translateY(-72px) scale(1); } 50% { opacity: 0.85; transform: translateX(-50%) translateY(-38px) scale(0.75); } 82% { opacity: 0.3; transform: translateX(-50%) translateY(-10px) scale(0.3); } 100% { opacity: 0; transform: translateX(-50%) translateY(0) scale(0); } }
    .scanning-dots { display: flex; align-items: center; gap: 8px; }
    .scanning-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-400); animation: scan-dot-pulse 1.4s ease-in-out infinite; }
    .scanning-dot:nth-child(2) { animation-delay: 0.2s; }
    .scanning-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes scan-dot-pulse { 0%, 100% { opacity: 0.3; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1.3); } }
    .scanning-header-progress { margin-top: var(--space-1); width: 100%; }
    .scanning-header-progress-track { height: 3px; background: var(--gray-150, var(--gray-200)); border-radius: var(--radius-full); overflow: hidden; }
    .scanning-header-progress-fill { height: 100%; width: 30%; background: linear-gradient(90deg, var(--accent-500), var(--accent-400)); border-radius: var(--radius-full); animation: indeterminate-slide 1.8s ease-in-out infinite; }
    @keyframes indeterminate-slide { 0% { transform: translateX(-120%); } 50% { transform: translateX(200%); } 100% { transform: translateX(450%); } }

    /* ═══ Listening Footer Layout (timer + stop) ═══ */
    .listening-footer-row { display: flex; align-items: center; justify-content: center; gap: 20px; width: 100%; }
    .listening-footer-timer { display: flex; align-items: baseline; gap: 3px; font-variant-numeric: tabular-nums; }
    .listening-footer-timer-value { font-size: 22px; font-weight: 800; color: var(--error-500); letter-spacing: -0.03em; line-height: 1; }
    .listening-footer-timer-sep { font-size: 14px; color: var(--gray-300); font-weight: 500; margin: 0 1px; }
    .listening-footer-timer-max { font-size: 14px; color: var(--gray-400); font-weight: 500; }

    /* ═══ Translation Banner ═══ */
    .translation-banner { display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: #FAFBFF; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); margin-bottom: 14px; }
    .translation-banner > svg { width: 20px; height: 20px; color: var(--gray-500); flex-shrink: 0; }
    .translation-banner-text { display: flex; flex-direction: column; gap: 8px; }
    .translation-banner-label { font-size: 13px; font-weight: 700; color: var(--gray-700); letter-spacing: -0.01em; }
    .translation-banner-langs { display: flex; align-items: center; gap: 6px; }
    .lang-tag { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: var(--radius-full); font-size: 11px; font-weight: 700; letter-spacing: -0.01em; }
    .lang-tag--source { background: var(--gray-100); color: var(--gray-600); border: 1px solid var(--gray-200); }
    .lang-tag--target { background: var(--gray-100); color: var(--gray-700); border: 1px solid var(--gray-300); font-weight: 800; }
    .lang-arrow { width: 14px; height: 14px; color: var(--gray-300); }

    /* ═══ Inline Translation (short text: source → target) ═══ */
    .tv-src { font-weight: 450; color: var(--gray-500); }
    .tv-arrow { color: var(--gray-300); font-weight: 400; margin: 0 1px; }
    .tv-tgt { font-weight: 650; color: var(--gray-800); }

    /* ═══ Stacked Translation (long text) ═══ */
    .success-field-row--long { flex-direction: column; align-items: stretch; gap: 8px; padding: 12px var(--space-1); }
    .field-long-head { display: flex; align-items: center; gap: 10px; position: relative; }
    .field-long-body { padding-left: 28px; display: flex; flex-direction: column; gap: 0; }
    .field-long-target { font-size: 13px; font-weight: 600; color: var(--gray-800); line-height: 1.6; word-break: break-word; }
    .field-long-divider { display: flex; align-items: center; gap: 8px; margin: 10px 0 8px; }
    .field-long-divider::after { content: ''; flex: 1; height: 1px; background: var(--gray-150, var(--gray-200)); }
    .field-long-divider-label { display: flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--gray-400); white-space: nowrap; }
    .field-long-divider-label svg { color: var(--gray-400); }
    .field-long-source { font-size: 13px; font-weight: 400; color: var(--gray-500); line-height: 1.6; word-break: break-word; font-style: italic; }

    /* Translation Accordion */
    .field-translation-details { width: 100%; }
    .field-translation-summary { display: flex; align-items: center; gap: 8px; cursor: pointer; list-style: none; }
    .field-translation-summary::-webkit-details-marker { display: none; }
    .field-translation-summary::marker { display: none; content: ''; }
    .field-translation-summary .field-long-target { flex: 1; }
    .field-translation-toggle { display: inline-flex; align-items: center; gap: 5px; flex-shrink: 0; margin-top: 0; padding: 4px 10px; background: var(--primary-50); border: 1px solid var(--primary-200); border-radius: var(--radius-full); font-size: 11px; font-weight: 600; color: var(--primary-600); white-space: nowrap; cursor: pointer; transition: all var(--transition-fast); user-select: none; }
    .field-translation-toggle:hover { background: var(--primary-100); border-color: var(--primary-300); color: var(--primary-700); }
    .field-translation-toggle svg { flex-shrink: 0; }
    .field-translation-chevron { transition: transform 0.2s ease; }
    .field-translation-details[open] .field-translation-chevron { transform: rotate(180deg); }
    .field-translation-original { margin-top: 8px; animation: accordion-slide 0.2s ease; }
    @keyframes accordion-slide { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
`;
