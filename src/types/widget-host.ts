/**
 * TypelessFormHost — typed interface for the main component.
 *
 * Replaces `component: any` in all extracted modules.
 * Grouped by future controller domain (Phase 4A-4F).
 *
 * Phase 4.0: define interface
 * Phase 4A-4F: controllers take ownership, properties migrate off host
 * Phase 7: remove remaining `any` types
 */

import type { ReactiveControllerHost } from 'lit';
import type { FieldDescriptor } from '../form-scanner/index.js';
import type { LLMClient, LLMResponse, MultiFormatValue } from '../llm-client.js';
import type { TranslationService } from '../services/translation-service.js';
import type { FormValueApplier } from '../core/services/form-value-applier/index.js';
import type { FormFieldDetector } from '../core/services/form-field-detector.js';
import type { PrivacyChecker } from '../core/services/privacy-checker.js';
import type { FormLanguageDetector } from '../core/services/form-language-detector.js';
import type { AudioWorkletRecorder, AudioRecorder } from '../audio-recorder.js';
import type { AssistantStep, ViewState } from './index.js';
import type { SafeBadgesResult, FieldStatuses, InitAnalyzeV2Data } from './common-types.js';
import type { IStabilizerSession } from '../core/services/universal-value-stabilizer.js';
import type { FormAssistantModal } from '../components/form-assistant-modal.js';

// ---------------------------------------------------------------------------
// Host interface
// ---------------------------------------------------------------------------

export interface TypelessFormHost extends ReactiveControllerHost {

  // ── LitElement / HTMLElement surface used by extracted modules ──────────
  shadowRoot: ShadowRoot | null;
  style: CSSStyleDeclaration;
  contains(node: Node): boolean;
  getAttribute(name: string): string | null;
  updateComplete: Promise<boolean>;
  requestUpdate(name?: string): void;
  dispatchEvent(event: Event): boolean;

  // ── View state (→ ViewStateController 4D) ──────────────────────────────
  viewState: ViewState;
  currentStep: AssistantStep;
  progressStage: number;
  processingStage: number;
  showConsentModal: boolean;
  hideWidget: boolean;
  noFormsMessage: boolean;
  isLoading: boolean;
  errorMessage: string;
  errorDetails: string;
  expandedSections: { empty: boolean; check: boolean; filled: boolean };
  consentExpandedSections: { section1: boolean; section2: boolean; section3: boolean };
  consentCheckboxMain: boolean;
  consentCheckboxAge: boolean;
  isSubmittingConsent: boolean;
  showPrivacySettings: boolean;
  isDeletingData: boolean;
  deleteDataSuccess: boolean;
  deleteDataError: string;
  deleteConfirmChecked: boolean;
  _noFormsHideTimer: ReturnType<typeof setTimeout> | null;

  /** Derived getters */
  readonly showModal: boolean;
  readonly showLoadingModal: boolean;
  readonly isProduction: boolean;

  // ── Position (→ WidgetPositionController 4C) ───────────────────────────
  widgetPosition: { bottom: number; right?: number; left?: number };
  smartZIndex: { widget: number; modal: number };
  userConfigApplied: boolean;
  autoPositionDisabled: boolean;
  safeInsets: { right: number; left: number; bottom: number };
  showDelay: number;

  // ── Form scanning (→ FormScannerController 4A) ─────────────────────────
  fieldsDetected: number;
  scannedFields: FieldDescriptor[];
  scannedForms: HTMLFormElement[];
  focusedForm: HTMLFormElement | null;
  highlightedForm: HTMLFormElement | null;
  visibleForms: Map<Element, boolean>;
  isAnyFormVisible10: boolean;
  hasEverBeenVisibleOnThisPage: boolean;
  userClosedManually: boolean;
  lastClosedOnForm: HTMLFormElement | null;
  currentFormId: string | null;
  fieldElementsMap: Map<string, HTMLElement>;
  lastProcessedFieldsHash: string;
  filterMap: number[];

  // Services owned by scanner domain
  formFieldDetector: FormFieldDetector | null;
  privacyChecker: PrivacyChecker | null;
  formLanguageDetector: FormLanguageDetector | null;

  // ── Audio / recording (→ AudioController 4B) ──────────────────────────
  _isRecording: boolean;
  _transcribedText: string;
  recordingDuration: number;
  recordingStartTime: number;
  maxRecordingTimer: ReturnType<typeof setTimeout> | null;
  recordingDurationTimer: ReturnType<typeof setInterval> | null;
  isMicrophonePermissionGranted: boolean | null;
  audioRecorder: AudioWorkletRecorder | AudioRecorder | null;
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];

  // ── LLM pipeline (→ LLMPipelineController 4E) ─────────────────────────
  llmClient: LLMClient;
  lastLLMResponse: LLMResponse | null;
  cachedSafeBadges: SafeBadgesResult | null;
  safeFieldNames: string[];
  detectedLanguage: string;
  currentLang: string;
  originalUserText: Record<string, string>;
  rawUserInput: string;
  pendingGenerateSafeBadges: Promise<SafeBadgesResult | null> | null;
  languageCache: Map<string, string>;
  safeBadgesCache: Map<string, SafeBadgesResult>;
  initAbortController: AbortController | null;
  progressTimer: ReturnType<typeof setTimeout> | null;
  processingTimer: ReturnType<typeof setTimeout> | null;
  _cachedFieldStatuses: FieldStatuses | null;
  _lastLLMResponseForCache: string;
  lastTranscriptLanguage: string;

  // ── Form filling (→ FormFillerController 4F) ───────────────────────────
  formValueApplier: FormValueApplier | null;
  isApplyingValues: boolean;
  lastAppliedKey: string | null;
  lastApplyAt: number;
  currentStabilizerSession: IStabilizerSession | null;
  lastApplyTimestamp: number;

  // ── Observers & handlers (→ lifecycle / controllers) ───────────────────
  mutationObserver: MutationObserver | null;
  formsIntersectionObserver: IntersectionObserver | null;
  formVisibilityObserver: IntersectionObserver | null;
  obstructionsObserver: MutationObserver | null;
  obstructionResizeObserver: ResizeObserver | null;
  trackedObstructionNodes: Set<HTMLElement>;
  obstructionNodesUpdateInterval: ReturnType<typeof setInterval> | null;
  initialShowTimer: ReturnType<typeof setTimeout> | null;
  globalFocusHandler: ((e: FocusEvent) => void) | null;
  scrollHandler: (() => void) | null;
  resizeHandler: (() => void) | null;
  orientationChangeHandler: (() => void) | null;
  navigationHandler: (() => void) | null;
  navigationCleanup: (() => void) | null;
  navigationRetryTimers: number[];
  languageDetectionTimeout: ReturnType<typeof setTimeout> | null;
  isDetectingLanguage: boolean;
  proactiveCheckInterval: ReturnType<typeof setInterval> | null;
  userEditListener: ((e: Event) => void) | null;
  userEditListenerForm: HTMLFormElement | null;
  userIsEditingFields: boolean;

  // ── Services ───────────────────────────────────────────────────────────
  translationService: TranslationService;
  apiKey: string | undefined;

  // ── Misc ───────────────────────────────────────────────────────────────
  renderlessModal: FormAssistantModal | null;
  DEBUG_SKIP_TO_SUCCESS: boolean;
  _scanner: { initializeServices(translationService: TranslationService): void };

  // Dynamic cache properties (set via `(this as any).__xxx`)
  __initAnalyzeV2: (InitAnalyzeV2Data & { formId?: string }) | null;
  __pendingCommitCheck: boolean;
  __commitSyncScheduled: boolean;

  // Visibility fallback handler (set in lifecycle.ts for browsers without IntersectionObserver)
  _formVisibilityFallback: (() => void) | null;

  // ── Methods ────────────────────────────────────────────────────────────

  // Translation
  t(key: string, params?: Record<string, string | number>): string;
  initializeI18n(): Promise<void>;

  // Form scanning
  scanAllForms(): void;
  selectActiveForm(): HTMLFormElement | null;
  findBestCandidateForm(allForms: HTMLFormElement[]): HTMLFormElement | null;
  updateActiveForm(): Promise<void>;
  evaluateWidgetVisibility(): void;
  getFormTitle(form: HTMLFormElement): string;
  getFormIndex(targetForm: HTMLFormElement): number;
  getTotalFormsCount(): number;
  getFormsStatistics(): { filled: number; partiallyFilled: number; empty: number };
  getFormFillRatio(form: HTMLFormElement): number;
  getElementVisibilityRatio(element: Element): number;
  isFormFilled(form: HTMLFormElement): boolean;
  getFieldsForDisplay(allFields: FieldDescriptor[]): FieldDescriptor[];
  getFormLanguage(): Promise<string>;
  debouncedLanguageDetection(): void;

  // UI
  checkUserConfiguration(): void;
  findSafePosition(): void;
  calculateSmartZIndex(): void;
  injectGlobalStyles(): void;
  updateFormHighlight(): void;
  clearFormHighlight(): void;
  resetToInitial(): void;
  clearDOMElements(): void;
  showLoading(): void;
  closeModal(): void;
  handleUserCloseModal(): void;
  initializeRenderlessModal(): void;
  toggleConsentSection(section: 'section1' | 'section2' | 'section3'): void;
  toggleConsentCheckboxMain(): void;
  toggleConsentCheckboxAge(): void;
  handleAcceptConsent(): Promise<void>;
  handleDeclineConsent(): void;
  handleShowPrivacySettings(): void;
  handleClosePrivacySettings(): void;
  handleDeleteData(): Promise<void>;
  toggleDeleteConfirm(): void;

  // Audio
  requestMicrophonePermission(): Promise<boolean>;
  handleStartListening(): Promise<void>;
  handleStopListening(): void;
  handleRecordingStop(audioBlob: Blob): Promise<void>;

  // LLM
  sendTextToLLM(text: string): Promise<void>;
  generateSafeBadges(fieldsForDisplay: FieldDescriptor[]): Promise<SafeBadgesResult | null>;
  performGenerateSafeBadges(fieldsForDisplay: FieldDescriptor[]): Promise<void>;
  requestInitAnalyzeV2(fields: FieldDescriptor[], signal?: AbortSignal): Promise<InitAnalyzeV2Data | null>;
  hydrateFromInitData(data: InitAnalyzeV2Data): boolean;

  // Form fill
  handleFloatingButtonClick(event?: Event): Promise<void>;
  handleFillForm(source?: string, idempotencyKey?: string): void;
  applyValuesToSingleForm(values: Record<string, string | number | boolean>, form: HTMLFormElement): void;
  selectBestDateTimeFormat(element: HTMLElement, multiFormatValue: MultiFormatValue): string;
  getDisplayValueForField(fieldValue: string | number | boolean | null | undefined): string;

  // Error handling
  createDetailedError(userMessage: string, technicalError: unknown, context: string): void;

  // Utilities
  throttle(func: (...args: unknown[]) => void, limit: number): () => void;
  withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T>;

  // Proactive value-check (dynamically added in lifecycle.ts)
  checkAndReapplyIfNeeded(): void;
  startProactiveValueCheck(windowMs?: number): void;
}
