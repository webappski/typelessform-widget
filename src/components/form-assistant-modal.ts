import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { formAssistantModalStyles } from './form-assistant-modal-styles.js';
import { FONT_FACE_CSS } from '../constants/fonts.js';

type ModalStep = 'initial' | 'listening' | 'processing' | 'success' | 'error';

export interface ModalTranslations { [key: string]: string }

import type { FieldStatusEntry, SafeBadge } from '../types/common-types.js';

export interface FieldStatuses {
  filled: FieldStatusEntry[];
  needsCheck: FieldStatusEntry[];
  empty: FieldStatusEntry[];
}

export class FormAssistantModal extends LitElement {
  @property({ type: Boolean }) isOpen = false;
  @property({ type: String }) currentStep: ModalStep = 'initial';
  @property({ type: Boolean }) showCloseButton = false;
  @property({ type: Object }) zIndex = { modal: 999998 };
  @property({ type: Boolean, reflect: true }) renderless = false;
  @property({ type: Object }) translations: ModalTranslations = {};
  @property({ type: Boolean }) isLoading = false;
  @property({ type: Boolean }) isRecording = false;
  @property({ type: Array }) displayFields: SafeBadge[] = [];
  @property({ type: Array }) safeFields: SafeBadge[] = [];
  @property({ type: String }) errorMessage = '';
  @property({ type: String }) errorDetails = '';
  @property({ type: String }) formInfoText = '';
  @property({ type: Object }) fieldStatuses: FieldStatuses = { filled: [], needsCheck: [], empty: [] };
  @property({ type: String }) lastLLMResponse = '';
  @property({ type: Object }) expandedSections: Record<string, boolean> = { filled: false, needsCheck: false, empty: false };
  @property({ type: Object }) cachedSafeBadges: { safeFields: SafeBadge[]; displayFields: SafeBadge[] } | null = null;

  static styles = formAssistantModalStyles;

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.setAttribute('exportparts', 'overlay,modal-overlay,modal-content,content,close-button,close');
    this._injectFontIfOptedIn();
  }

  /**
   * Inject Plus Jakarta Sans font only if parent typeless-form has `load-fonts` attribute.
   * Without opt-in, the widget uses a system font stack (no external requests).
   * Fonts are self-hosted to avoid GDPR issues (Google Fonts leaks visitor IPs).
   */
  private _injectFontIfOptedIn() {
    const parent = this.closest('typeless-form');
    if (!parent?.hasAttribute('load-fonts')) { return; }
    const id = 'typeless-font-plus-jakarta';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = FONT_FACE_CSS;
      document.head.appendChild(style);
    }
  }

  private updateStyles() { this.style.setProperty('--modal-z-index', `${this.zIndex.modal}`); }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('zIndex')) { this.updateStyles(); }
  }

  handleCloseClick() { this.dispatchEvent(new CustomEvent('modal-close', { bubbles: true, composed: true })); }

  /** Renderless-only: no visual output, used as proxy for test integration */
  render() { return html``; }

  t(key: string): string { return this.translations[key] || key; }

  handleStartListening() { this.dispatchEvent(new CustomEvent('start-listening', { bubbles: true, composed: true })); }
  handleStopRecording() { this.dispatchEvent(new CustomEvent('stop-recording', { bubbles: true, composed: true })); }
  handleApplyToForm() { this.dispatchEvent(new CustomEvent('apply-to-form', { bubbles: true, composed: true })); }
  handleResetToInitial() { this.dispatchEvent(new CustomEvent('reset-to-initial', { bubbles: true, composed: true })); }

  toggleSection(section: 'empty' | 'needsCheck' | 'filled') {
    this.expandedSections = { ...this.expandedSections, [section]: !this.expandedSections[section] };
  }

  // Renderless mode methods for test integration
  private proxyOpenElement: Element | null = null;
  private proxyZIndexElement: Element | null = null;

  setOpen(value: boolean) {
    this.isOpen = value;
    if (this.renderless && this.proxyOpenElement) { (this.proxyOpenElement as unknown as HTMLInputElement).checked = value; }
  }

  setZIndex(value: number) {
    this.zIndex = { modal: value };
    if (this.renderless && this.proxyZIndexElement) { (this.proxyZIndexElement as unknown as HTMLInputElement).value = value.toString(); }
  }

  bindProxyOpen(element: Element) {
    this.proxyOpenElement = element;
    if ('checked' in element) { (element as unknown as HTMLInputElement).checked = this.isOpen; }
  }

  bindProxyZIndex(element: Element) {
    this.proxyZIndexElement = element;
    if ('value' in element) { (element as unknown as HTMLInputElement).value = this.zIndex.modal.toString(); }
  }
}

if (!customElements.get('form-assistant-modal')) {
  customElements.define('form-assistant-modal', FormAssistantModal);
}
