import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class FormAssistantButton extends LitElement {
  @property({ type: Object }) position = {
    bottom: 20,
    right: 20,
    left: undefined
  };

  @property({ type: Boolean }) hidden = false;

  @property({ type: Object }) zIndex = {
    widget: 999999
  };

  @property({ type: String }) brandText = 'TypelessForm';
  @property({ type: String }) taglineText = 'Fill with voice • Any language';

  static styles = css`
    :host {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      animation: widgetAppear 0.4s ease-out forwards;
      animation-delay: 0.3s;
      opacity: 0;
    }

    :host([hidden]) {
      display: none;
    }

    :host(.no-forms-state) {
      opacity: 1;
      animation: widgetFadeOut 0.5s ease 2s forwards;
    }

    @keyframes widgetFadeOut {
      to {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
      }
    }

    :host(.no-forms-state) .voice-widget-container {
      border-color: #CBD5E1;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      cursor: default;
    }

    :host(.no-forms-state) .voice-widget-container:hover {
      transform: none;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      border-color: #CBD5E1;
    }

    :host(.no-forms-state) .voice-wave .wave-bar {
      background: #94A3B8;
      animation: none;
    }

    :host(.no-forms-state) .voice-widget-tagline {
      color: #475569;
      text-transform: none;
      font-size: 11px;
    }

    @keyframes widgetAppear {
      from {
        opacity: 0;
        transform: translateY(100px) scale(0.8);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .voice-widget-container {
      padding: 0;
      border-radius: 100px;
      background: #FFFFFF;
      cursor: pointer;
      border: 1px solid #E2E8F0;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .voice-widget-container:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      border-color: var(--primary-500, #4F46E5);
    }

    .voice-widget-container:active {
      transform: translateY(0);
    }

    .voice-widget-inner {
      background: transparent;
      border-radius: 100px;
      padding: 6px 14px 6px 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .voice-wave-container {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .voice-widget-inner .voice-wave {
      display: flex;
      align-items: center;
      gap: 2px;
      height: 100%;
    }

    .voice-widget-inner .voice-wave .wave-bar {
      width: 3px;
      background: var(--primary-500, #4F46E5);
      border-radius: 1.5px;
      animation: wave 1s ease-in-out infinite;
    }

    .voice-widget-inner .voice-wave .wave-bar:nth-child(1) {
      height: 10px;
      animation-delay: 0s;
    }

    .voice-widget-inner .voice-wave .wave-bar:nth-child(2) {
      height: 16px;
      animation-delay: 0.1s;
    }

    .voice-widget-inner .voice-wave .wave-bar:nth-child(3) {
      height: 22px;
      animation-delay: 0.2s;
    }

    .voice-widget-inner .voice-wave .wave-bar:nth-child(4) {
      height: 14px;
      animation-delay: 0.3s;
    }

    .voice-widget-inner .voice-wave .wave-bar:nth-child(5) {
      height: 19px;
      animation-delay: 0.4s;
    }

    .voice-widget-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
      align-items: flex-start;
      text-align: left;
    }

    .voice-widget-brand {
      display: flex;
      align-items: center;
      gap: 0;
      font-size: 9px;
      line-height: 1;
      white-space: nowrap;
    }

    .brand-powered-by {
      font-weight: 400;
      color: #94A3B8;
    }

    .brand-name {
      font-weight: 600;
      color: #64748B;
    }

    :host(.no-forms-state) .voice-widget-brand {
      display: none;
    }

    .voice-widget-tagline {
      font-size: 12px;
      font-weight: 600;
      color: #1E293B;
      letter-spacing: -0.2px;
      text-transform: none;
    }

    @keyframes wave {
      0%, 100% {
        transform: scaleY(0.5);
        opacity: 0.4;
      }
      50% {
        transform: scaleY(1);
        opacity: 1;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('exportparts',
      'ai-form-copilot-widget,widget-container,voice-widget-container,' +
      'voice-widget-inner,widget-inner,' +
      'wave-container,wave,wave-bar,' +
      'voice-widget-brand,widget-brand,' +
      'voice-widget-tagline,widget-tagline'
    );
    this._applyHostLayout();
    this.addEventListener('click', this._onHostClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onHostClick);
  }

  private updateStyles() {
    this.style.setProperty('--widget-bottom', `${this.position.bottom}px`);
    this.style.setProperty('--widget-right', this.position.right !== undefined ? `${this.position.right}px` : 'auto');
    this.style.setProperty('--widget-left', this.position.left !== undefined ? `${this.position.left}px` : 'auto');
    this.style.setProperty('--widget-z-index', `${this.zIndex.widget}`);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('position') || changedProperties.has('zIndex')) {
      this.updateStyles();
    }
    if (changedProperties.has('position') || changedProperties.has('zIndex') || changedProperties.has('hidden')) {
      this._applyHostLayout();
    }
  }

  private handleClick(e?: MouseEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.dispatchEvent(new CustomEvent('assistant-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: e }
    }));
  }

  private _onHostClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === this) {
      this.handleClick(e);
    }
  }

  private _applyHostLayout() {
    const host = this as HTMLElement;
    host.style.position = 'fixed';

    if (typeof this.position.bottom === 'number') {
      host.style.bottom = `${this.position.bottom}px`;
    }

    if (typeof this.position.right === 'number') {
      host.style.right = `${this.position.right}px`;
      host.style.left = '';
    } else if (typeof this.position.left === 'number') {
      host.style.left = `${this.position.left}px`;
      host.style.right = '';
    }

    host.style.zIndex = String(this.zIndex.widget);
    host.style.display = this.hidden ? 'none' : '';
  }

  render() {
    return html`
      <div class="voice-widget-container" role="button" tabindex="0" aria-label="${this.taglineText || this.brandText}" @click=${(e: MouseEvent) => this.handleClick(e)} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.handleClick(e as unknown as MouseEvent); } }} part="ai-form-copilot-widget widget-container voice-widget-container">
        <div class="voice-widget-inner" part="voice-widget-inner widget-inner">
          <div class="voice-wave-container" part="wave-container">
            <div class="voice-wave" part="wave">
              <div class="wave-bar" part="wave-bar"></div>
              <div class="wave-bar" part="wave-bar"></div>
              <div class="wave-bar" part="wave-bar"></div>
              <div class="wave-bar" part="wave-bar"></div>
              <div class="wave-bar" part="wave-bar"></div>
            </div>
          </div>

          <div class="voice-widget-content">
            <div class="voice-widget-tagline" part="voice-widget-tagline widget-tagline">${this.taglineText}</div>
            ${this.brandText ? html`
              <div class="voice-widget-brand" part="voice-widget-brand widget-brand">
                <span class="brand-powered-by">powered by&nbsp;</span><span class="brand-name">${this.brandText}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('form-assistant-button')) {
  customElements.define('form-assistant-button', FormAssistantButton);
}
