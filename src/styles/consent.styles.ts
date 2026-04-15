import { css } from 'lit';

export const consentStyles = css`
  /* Modal Footer — solid white bg, gray border */
  .modal-footer-modern {
    margin-top: auto;
    padding: var(--space-5) var(--space-5);
    border-top: 1px solid var(--gray-200);
    background: var(--white);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 480px) {
    .modal-content .modal-footer-modern {
      padding: var(--space-4) var(--space-5) calc(var(--space-4) + env(safe-area-inset-bottom)) !important;
    }
  }

  /* Success Footer */
  .modal-footer-modern.success-footer {
    padding: var(--space-4) var(--space-5) var(--space-5);
    background: var(--white);
    border-top: 1px solid var(--gray-200);
    position: relative;
    overflow: hidden;
  }

  .modal-footer-modern.success-footer::before {
    display: none;
  }

  .modal-footer-modern.success-footer {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    align-items: stretch;
  }

  .modal-footer-modern.success-footer .button-modern {
    width: 100%;
  }

  /* Anti-PII warning banner */
  .consent-warning-banner {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    margin-bottom: var(--space-4);
    background: var(--warning-50);
    border: 1px solid var(--warning-200);
    border-radius: var(--radius-lg);
    border-left: 4px solid var(--warning-500);
  }

  .consent-warning-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    color: var(--warning-600);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .consent-warning-body {
    flex: 1;
  }

  .consent-warning-title {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--warning-700);
    margin: 0 0 var(--space-1) 0;
  }

  .consent-warning-text {
    flex: 1;
    margin: 0;
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--gray-700);
    font-weight: 500;
  }

  /* Consent Summary (always visible) */
  .consent-summary {
    padding: 0 var(--space-2);
  }

  /* Progressive Disclosure */
  .consent-full-details {
    margin-top: var(--space-3);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .consent-details-toggle {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--primary-600);
    cursor: pointer;
    list-style: none;
    transition: background var(--transition-fast);
  }

  .consent-details-toggle::-webkit-details-marker {
    display: none;
  }

  .consent-details-toggle::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid currentColor;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    transition: transform var(--transition-fast);
  }

  .consent-full-details[open] .consent-details-toggle::before {
    transform: rotate(90deg);
  }

  .consent-details-toggle:hover {
    background: var(--gray-50);
  }

  .consent-full-details[open] .consent-details-text {
    border-top: 1px solid var(--gray-200);
  }

  /* Consent modal specific styles */
  .fields-accordion-container .field-label-modern {
    text-transform: none;
  }

  .fields-accordion-container .field-value-modern {
    line-height: 1.5;
  }

  .consent-main-title {
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--gray-900);
    margin: 0 0 var(--space-1) 0;
    letter-spacing: -0.02em;
  }

  .consent-section-title {
    margin: var(--space-4) 0 var(--space-3) 0;
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--gray-900);
    padding: 0 var(--space-4);
  }

  .consent-section-title:first-child {
    margin-top: 0;
  }

  .consent-details-text {
    padding: var(--space-2);
  }

  .consent-list {
    margin: 0;
    padding-left: var(--space-5);
    list-style: disc;
  }

  .consent-list li {
    margin-bottom: var(--space-2);
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--gray-700);
  }

  .consent-list li:last-child {
    margin-bottom: 0;
  }

  .consent-list li strong {
    color: var(--gray-900);
    font-weight: 600;
  }

  .consent-footer-legal {
    font-size: var(--text-xs);
    color: var(--gray-600);
    line-height: 1.5;
    margin: 0 0 var(--space-4) 0;
    padding: var(--space-4);
    background: var(--gray-50);
    border-radius: var(--radius-lg);
    border-left: 3px solid var(--primary-500);
  }

  .consent-footer-line {
    margin: 0 0 var(--space-2) 0;
  }

  .consent-footer-line:last-child {
    margin-bottom: 0;
  }

  /* Consent Footer — own class instead of reusing success-footer */
  .modal-footer-modern.consent-footer {
    padding: var(--space-4) var(--space-5) var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    align-items: stretch;
  }

  .modal-footer-modern.consent-footer .button-modern {
    width: 100%;
  }

  @media (max-width: 480px) {
    .modal-footer-modern.consent-footer {
      padding: var(--space-4) var(--space-5) calc(var(--space-4) + env(safe-area-inset-bottom));
    }
  }

  /* Consent Checkboxes */
  .consent-checkboxes {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin: var(--space-4) 0;
    padding: 0 var(--space-4);
  }

  .consent-checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    cursor: pointer;
    user-select: none;
    padding: var(--space-2);
    border-radius: var(--radius-md);
    transition: background-color 0.15s ease;
  }

  .consent-checkbox-item:hover {
    background-color: var(--gray-50);
  }

  .consent-checkbox-input {
    -webkit-appearance: none;
    appearance: none;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 1px;
    cursor: pointer;
    background: var(--white);
    border: 2px solid var(--gray-300);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .consent-checkbox-input:hover {
    border-color: var(--success-300);
    background: var(--success-50);
  }

  .consent-checkbox-input:focus-visible {
    outline: 2px solid var(--success-500);
    outline-offset: 2px;
  }

  .consent-checkbox-input:checked {
    background: var(--success-500);
    border-color: var(--success-500);
    box-shadow: 0 1px 3px rgba(34, 197, 94, 0.3);
  }

  .consent-checkbox-input:checked::after {
    content: '';
    width: 6px;
    height: 10px;
    border: solid var(--white);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) translateY(-1px);
  }

  .consent-checkbox-input:checked:hover {
    background: var(--success-600);
    border-color: var(--success-600);
  }

  .consent-checkbox-label {
    font-size: 0.6875rem;
    line-height: 1.4;
    color: var(--gray-700);
    flex: 1;
  }

  .consent-checkbox-item:hover .consent-checkbox-label {
    color: var(--gray-900);
  }

  /* Privacy settings link (in initial step footer) */
  .privacy-settings-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    background: none;
    border: none;
    padding: var(--space-1) var(--space-2);
    font-size: var(--text-xs);
    color: var(--gray-500);
    cursor: pointer;
    transition: color var(--transition-fast);
    font-family: inherit;
  }

  .privacy-settings-link:hover {
    color: var(--primary-600);
  }

  .privacy-settings-link svg {
    width: 14px;
    height: 14px;
  }

  /* Privacy info grid */
  .privacy-info-section {
    padding: 0 var(--space-2);
  }

  .privacy-info-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    background: var(--gray-50);
    border-radius: var(--radius-lg);
  }

  .privacy-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3);
  }

  .privacy-info-label {
    font-size: var(--text-sm);
    color: var(--gray-600);
    font-weight: 500;
  }

  .privacy-info-value {
    font-size: var(--text-sm);
    color: var(--gray-900);
    font-weight: 600;
    text-align: right;
  }

  .privacy-info-value code {
    font-family: monospace;
    font-size: var(--text-xs);
    background: var(--gray-200);
    padding: 1px 6px;
    border-radius: var(--radius-sm);
  }

  .privacy-no-data {
    font-size: var(--text-sm);
    color: var(--gray-500);
    text-align: center;
    padding: var(--space-6) var(--space-4);
  }

  /* Privacy delete section */
  .privacy-delete-section {
    margin-top: var(--space-4);
    padding: 0 var(--space-2);
  }

  .privacy-delete-description {
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--gray-600);
    margin: 0 0 var(--space-3) 0;
    padding: 0 var(--space-4);
  }

  .privacy-error-message {
    font-size: var(--text-sm);
    color: var(--error-600);
    margin: 0 0 var(--space-3) 0;
    padding: var(--space-2) var(--space-4);
    background: var(--error-50);
    border-radius: var(--radius-md);
    border: 1px solid var(--error-200);
  }

  .privacy-success-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-6) var(--space-4);
    text-align: center;
    color: var(--success-600);
  }

  .privacy-success-message svg {
    width: 48px;
    height: 48px;
  }

  .privacy-success-message p {
    font-size: var(--text-sm);
    margin: 0;
    color: var(--gray-700);
  }

  /* Delete button danger variant */
  .button-danger {
    background: var(--error-600) !important;
    border-color: var(--error-600) !important;
  }

  .button-danger:hover:not(:disabled) {
    background: var(--error-700) !important;
  }

  .button-danger:disabled {
    background: var(--gray-300) !important;
    border-color: var(--gray-300) !important;
  }
`;
