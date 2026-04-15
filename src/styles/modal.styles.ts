import { css } from 'lit';

export const modalStyles = css`
  .hidden {
    display: none !important;
  }

  /* Modal Overlay */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: var(--modal-z-index, 1000000);
    display: none;
    align-items: center;
    justify-content: center;
    padding: var(--space-4);
    opacity: 0;
    transition: opacity var(--transition-base);
    contain: strict;
    will-change: opacity;
  }

  @media (max-width: 480px) {
    .modal-overlay {
      padding: var(--space-4);
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-height: 600px) and (max-width: 480px) {
    .modal-overlay {
      align-items: center;
      padding: var(--space-2);
    }
  }

  .modal-overlay.active {
    display: flex;
    opacity: 1;
  }

  /* Modal Content */
  .modal-content {
    background: var(--white);
    border: 1px solid var(--gray-200);
    box-shadow: var(--shadow-xl);
    border-radius: var(--radius-2xl);
    padding: 0;
    width: 100%;
    max-width: 480px;
    position: relative;
    transform: scale(0.95);
    opacity: 0;
    transition: transform var(--transition-spring), opacity var(--transition-base);
    display: flex;
    flex-direction: column;
    max-height: calc(90vh - var(--space-8));
    overflow: hidden;
    contain: layout style paint;
    will-change: transform, opacity;
  }

  /* Warm glass top highlight */
  .modal-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 24px;
    right: 24px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 480px) {
    .modal-content {
      max-width: calc(100% - var(--space-3));
      max-height: 85vh;
      min-height: auto;
      height: auto;
      border-radius: var(--radius-2xl);
      transform: scale(0.95);
      opacity: 0;
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .modal-overlay.active .modal-content {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (max-height: 600px) and (max-width: 480px) {
    .modal-content {
      max-height: 85vh;
      height: auto;
      border-radius: var(--radius-2xl);
    }
  }

  /* Modal Body */
  .modal-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-4) var(--space-5) var(--space-5);
    scroll-behavior: smooth;
    min-height: 0;
    -webkit-overflow-scrolling: touch;
  }

  @media (max-width: 480px) {
    .modal-content .modal-body {
      padding: var(--space-3) var(--space-4) var(--space-4);
    }
  }

  /* Warm-toned scrollbar */
  .modal-body::-webkit-scrollbar {
    width: 5px;
  }

  .modal-body::-webkit-scrollbar-track {
    background: transparent;
  }

  .modal-body::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: var(--radius-full);
  }

  .modal-body::-webkit-scrollbar-thumb:hover {
    background: var(--gray-400);
  }

  .modal-overlay.active .modal-content {
    transform: scale(1);
    opacity: 1;
    line-height: var(--leading-relaxed);
  }

  /* Close Button (error step fallback) */
  .close-button {
    position: absolute;
    top: var(--space-6);
    right: var(--space-6);
    background: var(--gray-100);
    border: none;
    cursor: pointer;
    padding: var(--space-2);
    border-radius: var(--radius-lg);
    color: var(--gray-500);
    transition: all var(--transition-base);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-button:hover {
    background: var(--gray-200);
    color: var(--gray-700);
    transform: scale(1.05);
  }

  .close-button svg {
    width: 20px;
    height: 20px;
  }
`;
