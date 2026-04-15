/**
 * Global form highlight styles
 */
export const GLOBAL_FORM_STYLES = `
  .ai-form-active-glow {
    outline: 4px solid rgba(91, 33, 182, 0.6) !important;
    outline-offset: 2px !important;
    border-radius: 12px !important;
    position: relative !important;
    animation: ai-form-pulse-global 2s infinite !important;
    transition: all 0.3s ease !important;
    z-index: 999 !important;
  }

  .ai-form-active-glow::before {
    content: '' !important;
    position: absolute !important;
    top: -6px !important;
    left: -6px !important;
    right: -6px !important;
    bottom: -6px !important;
    background: linear-gradient(45deg, 
      rgba(91, 33, 182, 0.3), 
      rgba(76, 29, 149, 0.3), 
      rgba(91, 33, 182, 0.3)
    ) !important;
    border-radius: 16px !important;
    z-index: -1 !important;
    animation: ai-form-glow-global 3s ease-in-out infinite !important;
    pointer-events: none !important;
  }

  @keyframes ai-form-pulse-global {
    0%, 100% { 
      outline-color: rgba(91, 33, 182, 0.6) !important;
    }
    50% { 
      outline-color: rgba(91, 33, 182, 0.9) !important;
    }
  }

  @keyframes ai-form-glow-global {
    0%, 100% { 
      opacity: 0.3 !important; 
    }
    50% { 
      opacity: 0.6 !important; 
    }
  }
`;