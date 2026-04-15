import { LitElement, css, html } from 'lit';

export class SpinnerSmall extends LitElement {
  static styles = css`
    .spinner-small {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.7);
      border-top: 2px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  render() {
    return html`<div class="spinner-small"></div>`;
  }
}

if (!customElements.get('spinner-small')) {
  customElements.define('spinner-small', SpinnerSmall);
}