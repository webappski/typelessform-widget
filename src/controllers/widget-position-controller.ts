/**
 * WidgetPositionController — Reactive Controller for widget positioning, z-index, and global styles.
 *
 * Absorbs: config/ui-config.ts
 *
 * Phase 4C
 */

import type { ReactiveController } from 'lit';
import type { TypelessFormHost } from '../types/widget-host.js';

/** Shape of the optional global user configuration object */
interface WidgetUserConfig {
  position?: { bottom?: number; top?: number; left?: number; right?: number };
  zIndex?: string;
  disableAutoPosition?: boolean;
  showDelay?: number;
}

export class WidgetPositionController implements ReactiveController {
  #host: TypelessFormHost;

  constructor(host: TypelessFormHost) {
    this.#host = host;
    host.addController(this);
  }

  hostConnected(): void { /* placeholder */ }
  hostDisconnected(): void { /* placeholder */ }

  // ── User configuration (from config/ui-config.ts) ───────────────────

  checkUserConfiguration(): void {
    const config = (window as unknown as { typelessFormConfig?: WidgetUserConfig; aiFormCopilotConfig?: WidgetUserConfig }).typelessFormConfig
      ?? (window as unknown as { aiFormCopilotConfig?: WidgetUserConfig }).aiFormCopilotConfig;
    if (!config || typeof config !== 'object') { return; }

    if (config.position) { this.#applyPositionConfig(config.position); }
    if (config.zIndex) { this.#applyZIndexConfig(config.zIndex); }
    if (config.disableAutoPosition === true) { this.#host.autoPositionDisabled = true; }
    if (config.showDelay !== undefined && typeof config.showDelay === 'number') {
      this.#host.showDelay = Math.max(0, config.showDelay);
    }
  }

  // ── Z-index calculation ─────────────────────────────────────────────

  calculateSmartZIndex(): void {
    let maxZ = 999999;

    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      const z = parseInt(style.zIndex);

      if (!isNaN(z) && z > maxZ && z < 2147483647) {
        maxZ = z;
      }
    });

    this.#host.smartZIndex = {
      widget: maxZ + 1000,
      modal: maxZ + 2000
    };
  }

  // ── Safe position calculation ───────────────────────────────────────

  findSafePosition(): void {
    const insets = this.#host.safeInsets || { right: 0, left: 0, bottom: 0 };
    const BASE_OFFSET = 16;
    const WIDGET_HEIGHT = 50;
    const MIN_TOP_MARGIN = 20;

    // Sticky corner - don't switch sides, only adjust vertical position
    const side = this.#host.widgetPosition?.left !== undefined ? 'left' : 'right';

    // Clamp bottom so the widget never goes above the viewport
    const vh = window.innerHeight;
    const maxBottom = Math.max(BASE_OFFSET, vh - WIDGET_HEIGHT - MIN_TOP_MARGIN);
    const bottom = Math.min(Math.max(BASE_OFFSET, insets.bottom), maxBottom);

    let position: { bottom: number; right?: number; left?: number };

    if (side === 'right') {
      position = { bottom, right: BASE_OFFSET };
    } else {
      position = { bottom, left: BASE_OFFSET };
    }

    const previousPosition = JSON.stringify(this.#host.widgetPosition);
    this.#host.widgetPosition = position;

    if (JSON.stringify(this.#host.widgetPosition) !== previousPosition) {
      this.#host.requestUpdate();
    }
  }

  // ── Global styles injection ─────────────────────────────────────────

  injectGlobalStyles(): void {
    if (document.getElementById('ai-copilot-form-styles')) { return; }

    const style = document.createElement('style');
    style.id = 'ai-copilot-form-styles';
    style.textContent = WidgetPositionController.#GLOBAL_CSS;
    document.head.appendChild(style);
  }

  // ── Private helpers ─────────────────────────────────────────────────

  #applyPositionConfig(position: NonNullable<WidgetUserConfig['position']>): void {
    const { bottom, top, left, right } = position;
    const style = this.#host.style;

    if (typeof bottom === 'number') {
      style.setProperty('--widget-bottom', `${bottom}px`);
      this.#host.widgetPosition.bottom = bottom;
    } else if (typeof top === 'number') {
      style.setProperty('--widget-bottom', 'auto');
      style.setProperty('--widget-top', `${top}px`);
    }

    if (typeof right === 'number') {
      style.setProperty('--widget-right', `${right}px`);
      style.setProperty('--widget-left', 'auto');
      this.#host.widgetPosition = { ...this.#host.widgetPosition, right, left: undefined };
    } else if (typeof left === 'number') {
      style.setProperty('--widget-left', `${left}px`);
      style.setProperty('--widget-right', 'auto');
      this.#host.widgetPosition = { ...this.#host.widgetPosition, left, right: undefined };
    }

    this.#host.userConfigApplied = true;
  }

  #applyZIndexConfig(zIndexStr: string): void {
    const zIndex = parseInt(zIndexStr);
    if (isNaN(zIndex)) { return; }

    this.#host.style.setProperty('--widget-z-index', zIndex.toString());
    this.#host.smartZIndex.widget = zIndex;
    this.#host.smartZIndex.modal = zIndex + 1;

    if (this.#host.renderlessModal) {
      (this.#host.renderlessModal as unknown as { setZIndex(v: number): void }).setZIndex(zIndex + 1);
    }
  }

  static #GLOBAL_CSS = `
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
      0%, 100% { outline-color: rgba(91, 33, 182, 0.6) !important; }
      50% { outline-color: rgba(91, 33, 182, 0.9) !important; }
    }
    @keyframes ai-form-glow-global {
      0%, 100% { opacity: 0.3 !important; }
      50% { opacity: 0.6 !important; }
    }
  `;
}
