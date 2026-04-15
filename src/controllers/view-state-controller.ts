/**
 * ViewStateController — Reactive Controller for modal state, form highlight, and reset logic.
 *
 * Absorbs: ui/modal-orchestrator.ts
 *
 * Phase 4D
 */

import type { ReactiveController } from 'lit';
import type { TypelessFormHost } from '../types/widget-host.js';

export class ViewStateController implements ReactiveController {
  #host: TypelessFormHost;

  constructor(host: TypelessFormHost) {
    this.#host = host;
    host.addController(this);
  }

  hostConnected(): void { /* placeholder */ }
  hostDisconnected(): void { /* placeholder */ }

  // ── Form highlight (from ui/modal-orchestrator.ts) ──────────────────

  updateFormHighlight(): void {
    const isModalVisible = this.#host.viewState
      ? (this.#host.viewState === 'ready' || this.#host.viewState === 'loading')
      : this.#host.showModal;

    if (isModalVisible) {
      requestAnimationFrame(() => {
        const totalForms = this.#host.getTotalFormsCount();
        if (totalForms > 1) {
          const activeForm = this.#host.selectActiveForm();

          if (activeForm !== this.#host.highlightedForm) {
            if (this.#host.highlightedForm) {
              this.#host.highlightedForm.classList.remove('ai-form-active-glow');
            }

            if (activeForm) {
              activeForm.classList.add('ai-form-active-glow');
              this.#host.highlightedForm = activeForm;
            }
          } else if (activeForm && !activeForm.classList.contains('ai-form-active-glow')) {
            activeForm.classList.add('ai-form-active-glow');
          }
        }
      });
    } else {
      if (this.#host.highlightedForm) {
        this.#host.highlightedForm.classList.remove('ai-form-active-glow');
        this.#host.highlightedForm = null;
      }
    }
  }

  clearFormHighlight(): void {
    if (this.#host.highlightedForm) {
      this.#host.highlightedForm.classList.remove('ai-form-active-glow');
      this.#host.highlightedForm = null;
    }
  }

  // ── Reset to initial state ──────────────────────────────────────────

  resetToInitial(): void {
    this.#resetViewState();
    this.#resetLLMState();
    this.clearDOMElements();
    this.#stopAudioRecording();
    this.#clearRecordingTimers();
  }

  #resetViewState(): void {
    this.#host.currentStep = 'initial';
    this.#host.isLoading = false;
    this.#host._transcribedText = '';
    this.#host._isRecording = false;
    this.#host.errorMessage = '';
    this.#host.errorDetails = '';
  }

  #resetLLMState(): void {
    // CRITICAL FIX: DO NOT clear lastLLMResponse immediately after apply!
    // UniversalValueStabilizer and MutationObserver need it for re-apply when React re-renders
    this.#host.originalUserText = {};
    this.#host.rawUserInput = '';
    this.#host._cachedFieldStatuses = null;
    this.#host._lastLLMResponseForCache = '';
    this.#host.expandedSections = { empty: false, check: false, filled: false };
  }

  #stopAudioRecording(): void {
    if (this.#host.audioRecorder) {
      this.#host.audioRecorder.stopRecording();
      this.#host.audioRecorder = null;
    }
    if (this.#host.mediaRecorder && this.#host.mediaRecorder.state !== 'inactive') {
      this.#host.mediaRecorder.stop();
    }
    this.#host.mediaRecorder = null;
  }

  #clearRecordingTimers(): void {
    if (this.#host.maxRecordingTimer) {
      clearTimeout(this.#host.maxRecordingTimer);
      this.#host.maxRecordingTimer = null;
    }
    if (this.#host.recordingDurationTimer) {
      clearInterval(this.#host.recordingDurationTimer);
      this.#host.recordingDurationTimer = null;
    }
    this.#host.recordingDuration = 0;
    this.#host.recordingStartTime = 0;
  }

  // ── DOM cleanup (memory leak fix) ───────────────────────────────────

  clearDOMElements(): void {
    this.#host.safeBadgesCache.clear();

    // CRITICAL FIX: DO NOT clear fieldElementsMap and safeFieldNames after apply!
    // MutationObserver and UniversalValueStabilizer need them for re-apply

    this.#host._cachedFieldStatuses = null;
    this.#host._lastLLMResponseForCache = '';

    this.#host.highlightedForm = null;
    this.#host.focusedForm = null;
  }
}
