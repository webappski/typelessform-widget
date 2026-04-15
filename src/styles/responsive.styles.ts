import { css } from 'lit';

export const responsiveStyles = css`
  /* Disable all transitions during resize */
  .modal-overlay.resizing * {
    transition: none !important;
    animation: none !important;
  }

  .modal-overlay.resizing .modal-content {
    transition: none !important;
  }

  /* Also disable transitions for specific performance-heavy elements */
  .modal-overlay.resizing .field-badge-modern,
  .modal-overlay.resizing .modal-icon-compact-modern,
  .modal-overlay.resizing .button-modern,
  .modal-overlay.resizing .close-button-modern {
    transition: none !important;
    will-change: auto !important;
  }

  /* Prevent layout recalculations during resize */
  .modal-overlay.modal-opened .modal-content {
    will-change: transform;
  }

  @media (max-width: 480px) {
    .modal-overlay.modal-opened .modal-content {
      contain: layout style paint;
    }
  }

  /* Form Highlighting — clean outline, no animation */
  .ai-form-active-glow {
    outline: 2px solid var(--accent-500) !important;
    outline-offset: 2px !important;
    border-radius: 12px !important;
    position: relative !important;
    transition: outline-color 0.2s ease !important;
    z-index: 999 !important;
  }

  .ai-form-active-glow::before {
    display: none !important;
  }
`;
