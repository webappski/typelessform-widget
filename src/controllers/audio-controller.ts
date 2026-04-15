/**
 * AudioController — Reactive Controller for audio recording, transcription, and mic permission.
 *
 * Absorbs: controller/voice-orchestrator.ts, audio/capture.ts, audio/transcription.ts
 *
 * Phase 4B
 */

import type { ReactiveController } from 'lit';
import type { TypelessFormHost } from '../types/widget-host.js';
import { CONFIG } from '../constants/config.js';
import { BrowserUtils } from '../utils/browser.js';
import { apiFetch } from '../utils/api-fetch.js';

export class AudioController implements ReactiveController {
  #host: TypelessFormHost;

  constructor(host: TypelessFormHost) {
    this.#host = host;
    host.addController(this);
  }

  hostConnected(): void { /* placeholder */ }
  hostDisconnected(): void { /* placeholder */ }

  // ── Microphone permission (from audio/capture.ts) ────────────────────

  async requestMicrophonePermission(): Promise<boolean> {
    if (this.#host.isMicrophonePermissionGranted === true) {return true;}
    if (this.#host.isMicrophonePermissionGranted === false) {return false;}

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      this.#host.isMicrophonePermissionGranted = true;
      return true;
    } catch (err) {
      this.#host.isMicrophonePermissionGranted = false;
      this.#host.createDetailedError(this.#host.t('error.microphone'), err, 'microphone_permission');
      this.#host.currentStep = 'error';
      return false;
    }
  }

  // ── Start / stop recording (from controller/voice-orchestrator.ts) ───

  async handleStartListening(): Promise<void> {
    this.#host.currentStep = 'listening';

    const hasPermission = await this.requestMicrophonePermission();
    if (!hasPermission) {
      return;
    }

    try {
      // Always use MediaRecorder for all platforms
      await this.#fallbackToMediaRecorder();
    } catch (err: unknown) {
      this.#host.createDetailedError(this.#host.t('error.microphone'), err, 'start_recording');
      this.#host.currentStep = 'error';
    }
  }

  handleStopListening(): void {
    // Clear recording timers
    if (this.#host.maxRecordingTimer) {
      clearTimeout(this.#host.maxRecordingTimer);
      this.#host.maxRecordingTimer = null;
    }
    if (this.#host.recordingDurationTimer) {
      clearInterval(this.#host.recordingDurationTimer);
      this.#host.recordingDurationTimer = null;
    }

    if (this.#host.audioRecorder) {
      const audioBlob = this.#host.audioRecorder.stopRecording();

      if (audioBlob.size < CONFIG.AUDIO.MIN_BLOB_SIZE) {
        this.#host.errorMessage = 'Recording too short. Please try again.';
        this.#host.currentStep = 'error';
        this.#host.audioRecorder = null;
        return;
      }

      this.handleRecordingStop(audioBlob);
      this.#host.audioRecorder = null;
    } else if (this.#host.mediaRecorder && this.#host.mediaRecorder.state !== 'inactive') {
      this.#host.mediaRecorder.stop();
    }
  }

  // ── Transcription (from audio/transcription.ts) ──────────────────────

  async handleRecordingStop(audioBlob: Blob): Promise<void> {
    this.#initProcessingState();

    const formData = this.#buildTranscriptionFormData(audioBlob);

    try {
      const json = await this.#fetchTranscription(formData);
      await this.#processTranscriptionResult(json);
    } catch (err) {
      this.#clearProcessingTimer();
      this.#host.createDetailedError('Transcription failed', err, 'transcription');
      this.#host.currentStep = 'error';
      this.#host.isLoading = false;
    }
  }

  // ── Private helpers ──────────────────────────────────────────────────

  #initProcessingState(): void {
    this.#host.currentStep = 'processing';
    this.#host.isLoading = true;
    this.#host._isRecording = false;
    this.#host.audioChunks = [];

    this.#host.processingStage = 1;
    this.#host.processingTimer = setInterval(() => {
      if (this.#host.processingStage < 8) {
        this.#host.processingStage++;
        this.#host.requestUpdate();
      }
    }, 2500);
  }

  #buildTranscriptionFormData(audioBlob: Blob): FormData {
    const formData = new FormData();
    const filename = AudioController.#resolveFilename(audioBlob);

    formData.append('file', audioBlob, filename);
    formData.append('temperature', '0');
    formData.append('response_format', 'json');
    return formData;
  }

  static #resolveFilename(audioBlob: Blob): string {
    if (audioBlob.type.includes('mp4')) { return 'recording.m4a'; }
    if (audioBlob.type.includes('webm')) { return 'recording.webm'; }
    if (audioBlob.type.includes('mpeg')) { return 'recording.mp3'; }
    return 'recording.wav';
  }

  async #fetchTranscription(formData: FormData): Promise<Record<string, unknown>> {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => { abortController.abort(); }, 210000);

    const response = await apiFetch(CONFIG.TRANSCRIBE_FUNCTION_URL, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      credentials: 'omit',
      signal: abortController.signal,
      headers: { 'Accept': 'application/json' }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  async #processTranscriptionResult(json: Record<string, unknown>): Promise<void> {
    const transcript = (json.transcript || json.text) as string | undefined;
    const confidence = json.confidence as number | undefined;
    const transcriptLanguage = json.language as string | undefined;

    if (transcriptLanguage) {
      this.#host.lastTranscriptLanguage = transcriptLanguage;
    }

    if (this.#isLowConfidence(confidence)) {
      this.#clearProcessingTimer();
      this.#host.errorMessage = this.#host.t('error.lowConfidence') || 'Could not clearly understand the audio. Please speak more clearly.';
      this.#host.currentStep = 'error';
      this.#host.isLoading = false;
      return;
    }

    if (transcript && transcript.trim().length > 0 && !transcript.includes('Amara.org')) {
      await this.#host.sendTextToLLM(transcript);
    } else {
      this.#clearProcessingTimer();
      this.#host.createDetailedError(this.#host.t('error.lowConfidence'),
        { transcript, json }, 'invalid_transcript');
      this.#host.currentStep = 'error';
      this.#host.isLoading = false;
    }
  }

  #isLowConfidence(confidence: number | undefined): boolean {
    return !!(CONFIG.AUDIO.CHECK_CONFIDENCE &&
      confidence !== undefined &&
      confidence < CONFIG.AUDIO.MIN_CONFIDENCE &&
      confidence < 0.1);
  }

  async #fallbackToMediaRecorder(): Promise<void> {
    const isSafariOrMobile = BrowserUtils.isSafari() || BrowserUtils.isMobile();

    if (BrowserUtils.isMobile()) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const stream = await this.#acquireAudioStream(isSafariOrMobile);
    const mediaRecorderOptions = AudioController.#buildRecorderOptions(isSafariOrMobile);

    this.#host.mediaRecorder = new MediaRecorder(stream, mediaRecorderOptions);
    this.#host.audioChunks = [];

    this.#setupRecorderHandlers(stream, mediaRecorderOptions);
    this.#startRecording(isSafariOrMobile);
  }

  async #acquireAudioStream(isSafariOrMobile: boolean): Promise<MediaStream> {
    const audioConstraints = isSafariOrMobile
      ? CONFIG.AUDIO.SAFARI_SETTINGS
      : CONFIG.AUDIO.CHROME_SETTINGS;

    try {
      return await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
    } catch (err: unknown) {
      this.#setMicrophoneError(err);
      throw err;
    }
  }

  #setMicrophoneError(err: unknown): void {
    const domErr = err as DOMException;
    const errorMap: Record<string, string> = {
      'NotAllowedError': this.#host.t('error.microphonePermissionDenied') || 'Microphone permission denied',
      'NotFoundError': this.#host.t('error.microphoneNotFound') || 'No microphone found',
      'NotReadableError': this.#host.t('error.microphoneInUse') || 'Microphone is already in use'
    };
    const message = domErr?.name ? errorMap[domErr.name] : undefined;
    if (message) {
      this.#host.errorMessage = message;
    }
  }

  static #buildRecorderOptions(isSafariOrMobile: boolean): MediaRecorderOptions {
    if (!isSafariOrMobile) {
      return { audioBitsPerSecond: CONFIG.AUDIO.CHROME_SETTINGS.audioBitsPerSecond };
    }
    let bestMimeType = 'audio/mp4';
    if (MediaRecorder.isTypeSupported('audio/mp4;codecs=mp4a.40.2')) {
      bestMimeType = 'audio/mp4;codecs=mp4a.40.2';
    } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
      bestMimeType = 'audio/webm;codecs=opus';
    }
    return { mimeType: bestMimeType, audioBitsPerSecond: 256000 };
  }

  #setupRecorderHandlers(stream: MediaStream, options: MediaRecorderOptions): void {
    this.#host.mediaRecorder!.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        this.#host.audioChunks.push(event.data);
      }
    };

    this.#host.mediaRecorder!.onstop = () => {
      this.#clearRecordingTimers();
      const recordedMimeType = this.#host.mediaRecorder?.mimeType || options.mimeType;
      const audioBlob = new Blob(this.#host.audioChunks, { type: recordedMimeType });

      if (audioBlob.size < CONFIG.AUDIO.MIN_BLOB_SIZE) {
        this.#host.errorMessage = 'Recording too short. Please try again.';
        this.#host.currentStep = 'error';
        return;
      }

      this.handleRecordingStop(audioBlob);
      stream.getTracks().forEach(track => track.stop());
    };

    this.#host.mediaRecorder!.onerror = (event: Event) => {
      this.#clearRecordingTimers();
      this.#host.createDetailedError('Recording failed. Please try again.', event, 'mediarecorder_error');
      this.#host.currentStep = 'error';
    };
  }

  #startRecording(isSafariOrMobile: boolean): void {
    const timeslice = isSafariOrMobile
      ? CONFIG.AUDIO.SAFARI_SETTINGS.timeslice
      : CONFIG.AUDIO.CHROME_SETTINGS.timeslice;
    this.#host.mediaRecorder!.start(timeslice);

    this.#host.recordingDuration = 0;
    this.#host.recordingStartTime = Date.now();

    this.#host.maxRecordingTimer = setTimeout(() => {
      if (this.#host.mediaRecorder && this.#host.mediaRecorder.state !== 'inactive') {
        this.#host.mediaRecorder.stop();
      }
    }, CONFIG.AUDIO.MAX_RECORDING_TIME);

    this.#host.recordingDurationTimer = setInterval(() => {
      this.#host.recordingDuration = Date.now() - this.#host.recordingStartTime;
      this.#host.requestUpdate();
    }, 100);
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
  }

  #clearProcessingTimer(): void {
    if (this.#host.processingTimer) {
      clearInterval(this.#host.processingTimer);
      this.#host.processingTimer = null;
    }
  }
}
