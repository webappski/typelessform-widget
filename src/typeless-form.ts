import { LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import './components/form-assistant-button.js';
import './components/form-assistant-modal.js';
import type { FieldDescriptor } from './form-scanner/index.js';
import { LLMClient, type LLMResponse, type MultiFormatValue } from './llm-client.ts';
import { CONFIG } from './constants/config.ts';
import { typelessFormStyles } from './styles/typeless-form.styles.ts';
import { TranslationService } from './services/translation-service.ts';
import { FormValueApplier } from './core/services/form-value-applier/index.ts';
import { FormFieldDetector } from './core/services/form-field-detector.ts';
import { PrivacyChecker } from './core/services/privacy-checker.ts';
import { FormLanguageDetector } from './core/services/form-language-detector.ts';
import { type AssistantStep, ViewState } from './types';
import type { TypelessFormHost } from './types/widget-host.ts';
import { AudioWorkletRecorder, AudioRecorder } from './audio-recorder.ts';
import type { IStabilizerSession } from './core/services/universal-value-stabilizer.js';
import type { SafeBadgesResult, InitAnalyzeV2Data } from './types/common-types.js';
import type { FormAssistantModal } from './components/form-assistant-modal.js';
import { getDisplayValueForField } from './lib/labels.ts';
import { handleFloatingButtonClickImpl, closeModalImpl } from './controller/ui-events.ts';
import { FormFillerController } from './controllers/form-filler-controller.ts';
import { WidgetPositionController } from './controllers/widget-position-controller.ts';
import { LLMPipelineController } from './controllers/llm-pipeline-controller.ts';
import { createDetailedErrorImpl } from './errors/error-handling.ts';
import { renderImpl } from './ui/render.ts';
import { hydrateFromInitDataImpl, requestInitAnalyzeV2Impl, showLoadingImpl } from './controller/init-analyze.ts';
import { handleAcceptConsentImpl, handleDeclineConsentImpl, handleShowPrivacySettingsImpl, handleClosePrivacySettingsImpl, handleDeleteDataImpl } from './controller/consent-controller.ts';
import { isLocalEnvironment, shouldInitializeImpl, getFieldsForDisplayImpl, initializeRenderlessModalImpl, evaluateWidgetVisibilityImpl, getCurrentVisibleFormImpl } from './controller/widget-helpers.ts';
import { ViewStateController } from './controllers/view-state-controller.ts';
import { throttleImpl } from './utils/timing.ts';
import { connectedCallbackImpl, disconnectedCallbackImpl, firstUpdatedImpl } from './lifecycle/lifecycle.ts';
import { WIDGET_VERSION } from './constants/version.ts';
import { FormScannerController } from './controllers/form-scanner-controller.ts';
import { AudioController } from './controllers/audio-controller.ts';

export { ViewState };

export class TypelessForm extends LitElement {
  protected willUpdate(changedProps: Map<string, unknown>): void { super.willUpdate(changedProps); }
  static styles = typelessFormStyles;
  private static readonly WIDGET_VERSION = WIDGET_VERSION;
  private _scanner = new FormScannerController(this as unknown as TypelessFormHost);
  private _audio = new AudioController(this as unknown as TypelessFormHost);
  private _position = new WidgetPositionController(this as unknown as TypelessFormHost);
  private _viewState = new ViewStateController(this as unknown as TypelessFormHost);
  private _llm = new LLMPipelineController(this as unknown as TypelessFormHost);
  private _filler = new FormFillerController(this as unknown as TypelessFormHost);
  private DEBUG_SKIP_TO_SUCCESS = false;
  private widgetPosition: { bottom: number; right?: number; left?: number } = { bottom: 20, right: 20 };
  private smartZIndex = { widget: 999999, modal: 1000000 };
  private userConfigApplied = false;
  private autoPositionDisabled = false;
  private safeInsets = { right: 0, left: 0, bottom: 0 };
  private formsIntersectionObserver: IntersectionObserver | null = null;
  private formVisibilityObserver: IntersectionObserver | null = null;
  private isAnyFormVisible10 = false;
  private visibleForms = new Map<Element, boolean>();
  private hasEverBeenVisibleOnThisPage = false;
  private userClosedManually = false;
  private lastClosedOnForm: HTMLFormElement | null = null;
  private obstructionsObserver: MutationObserver | null = null;
  private showDelay = 500;
  private initialShowTimer: NodeJS.Timeout | null = null;
  private isApplyingValues = false;
  private lastAppliedKey: string | null = null;
  private lastApplyAt = 0;
  private currentStabilizerSession: IStabilizerSession | null = null;
  _formVisibilityFallback: (() => void) | null = null;
  constructor() { super(); this.apiKey = undefined; this.llmClient = null as unknown as LLMClient; }
  @state() private viewState: ViewState = ViewState.Hidden;
  @state() private progressStage: number = 1;
  @state() private processingStage: number = 1;
  get showModal(): boolean { return this.viewState === ViewState.Ready || this.viewState === ViewState.Error; }
  get showLoadingModal(): boolean { return this.viewState === ViewState.Loading; }

  @state() private showConsentModal = false;
  @state() private currentStep: AssistantStep = 'initial';
  // @ts-ignore TS6133
  @state() private _transcribedText = '';
  // @ts-ignore TS6133
  @state() private _isRecording = false;
  @state() private fieldsDetected = 0;
  @state() private isLoading = false;
  @state() private errorMessage = '';
  @state() private errorDetails = '';
  @state() private recordingDuration = 0;
  private recordingStartTime = 0;
  private maxRecordingTimer: ReturnType<typeof setTimeout> | null = null;
  private recordingDurationTimer: ReturnType<typeof setInterval> | null = null;
  @state() private lastLLMResponse: LLMResponse | null = null;
  @state() private focusedForm: HTMLFormElement | null = null;
  @state() private scannedFields: FieldDescriptor[] = [];
  @state() private hideWidget = false;
  @state() private noFormsMessage = false;
  @state() private currentLang = CONFIG.DEFAULT_LANG;
  @state() private highlightedForm: HTMLFormElement | null = null;
  @state() private cachedSafeBadges: SafeBadgesResult | null = null;
  @state() private expandedSections: { empty: boolean; check: boolean; filled: boolean } = { empty: false, check: false, filled: false };
  @state() private consentExpandedSections: { section1: boolean; section2: boolean; section3: boolean } = { section1: false, section2: false, section3: false };
  @state() private consentCheckboxMain = false;
  @state() private consentCheckboxAge = false;
  private _cachedFieldStatuses: import('./lib/badge-sort.js').FieldStatuses | null = null;
  private _lastLLMResponseForCache: string = '';
  private apiKey: string | undefined;
  private llmClient: LLMClient;
  private translationService = new TranslationService();
  private globalFocusHandler: ((_: FocusEvent) => void) | null = null;
  private audioRecorder: AudioWorkletRecorder | AudioRecorder | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private pendingGenerateSafeBadges: Promise<SafeBadgesResult | null> | null = null;
  private lastProcessedFieldsHash: string = '';
  private languageCache: Map<string, string> = new Map();
  private safeBadgesCache: Map<string, SafeBadgesResult> = new Map();
  private fieldElementsMap: Map<string, HTMLElement> = new Map();
  private audioChunks: Blob[] = [];
  @state() private isMicrophonePermissionGranted: boolean | null = null;
  private mutationObserver: MutationObserver | null = null;
  @state() private detectedLanguage: string = CONFIG.DEFAULT_LANG;
  @state() private originalUserText: Record<string, string> = {};
  private formValueApplier: FormValueApplier | null = null;
  private formFieldDetector: FormFieldDetector | null = null;
  private privacyChecker: PrivacyChecker | null = null;
  private formLanguageDetector: FormLanguageDetector | null = null;
  @state() private rawUserInput: string = '';
  private scrollHandler: (() => void) | null = null;
  private resizeHandler: (() => void) | null = null;
  private languageDetectionTimeout: NodeJS.Timeout | null = null;
  private isDetectingLanguage: boolean = false;
  private safeFieldNames: string[] = [];
  private renderlessModal: FormAssistantModal | null = null;
  private currentFormId: string | null = null;
  private initAbortController: AbortController | null = null;
  private progressTimer: NodeJS.Timeout | null = null;
  private processingTimer: NodeJS.Timeout | null = null;
  private isSubmittingConsent = false;
  @state() private showPrivacySettings = false;
  private isDeletingData = false;
  private deleteDataSuccess = false;
  private deleteDataError = '';
  private deleteConfirmChecked = false;
  private scannedForms: HTMLFormElement[] = [];
  private filterMap: number[] = [];
  private lastTranscriptLanguage: string = '';
  private lastApplyTimestamp: number = 0;
  private obstructionResizeObserver: ResizeObserver | null = null;
  private trackedObstructionNodes: Set<HTMLElement> = new Set();
  private obstructionNodesUpdateInterval: ReturnType<typeof setInterval> | null = null;
  private orientationChangeHandler: (() => void) | null = null;
  private navigationHandler: (() => void) | null = null;
  private navigationCleanup: (() => void) | null = null;
  private navigationRetryTimers: number[] = [];
  private proactiveCheckInterval: ReturnType<typeof setInterval> | null = null;
  private userEditListener: ((e: Event) => void) | null = null;
  private userEditListenerForm: HTMLFormElement | null = null;
  private userIsEditingFields: boolean = false;
  private __initAnalyzeV2: (InitAnalyzeV2Data & { formId?: string }) | null = null;
  private __pendingCommitCheck: boolean = false;
  private __commitSyncScheduled: boolean = false;
  checkAndReapplyIfNeeded(): void { /* overwritten by lifecycle.ts */ }
  startProactiveValueCheck(_windowMs?: number): void { /* overwritten by lifecycle.ts */ }
  private isLocalEnvironment(): boolean { return isLocalEnvironment(); }
  get isProduction(): boolean { return !this.isLocalEnvironment(); }
  private shouldInitialize(): boolean { return shouldInitializeImpl(this as unknown as TypelessFormHost); }
  async connectedCallback() {
    super.connectedCallback();
    if (!this.shouldInitialize()) { this.hideWidget = true; return; }
    this.translationService.setApiKey(this.apiKey);
    this._injectFontIfOptedIn();
    this.llmClient = new LLMClient();
    await connectedCallbackImpl(this as unknown as TypelessFormHost);
  }
  /**
   * Inject Plus Jakarta Sans font only if the developer opts in via `load-fonts` attribute.
   * Without opt-in, the widget uses a system font stack (no external requests).
   * Fonts are self-hosted on Firebase Hosting to avoid GDPR issues
   * (Google Fonts sends visitor IPs to Google servers) and CSP breakage.
   */
  private _injectFontIfOptedIn() {
    if (!this.hasAttribute('load-fonts')) { return; }
    const id = 'typeless-font-plus-jakarta';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      const baseUrl = 'https://ai-form-copilot-eu.web.app/fonts';
      style.textContent = `
/* cyrillic-ext */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
  src: url('${baseUrl}/plus-jakarta-sans-cyrillic-ext.woff2') format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
  src: url('${baseUrl}/plus-jakarta-sans-vietnamese.woff2') format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
  src: url('${baseUrl}/plus-jakarta-sans-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
  src: url('${baseUrl}/plus-jakarta-sans-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`;
      document.head.appendChild(style);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.initAbortController?.abort();
    this.initAbortController = null;
    this.formValueApplier?.destroyAll();
    this.currentStabilizerSession = null;
    disconnectedCallbackImpl(this as unknown as TypelessFormHost);
  }
  private throttle(func: (...args: unknown[]) => void, limit: number) { return throttleImpl(func, limit); }
  private debouncedLanguageDetection() {
    if (this.isDetectingLanguage) {return;}
    if (this.languageDetectionTimeout) {clearTimeout(this.languageDetectionTimeout);}
    this.languageDetectionTimeout = setTimeout(async () => {
      if (this.isDetectingLanguage) {return;}
      this.isDetectingLanguage = true;
      try {
        const lang = await this.getFormLanguage();
        if (lang !== this.detectedLanguage) { this.detectedLanguage = lang; this.requestUpdate(); }
      } finally { this.isDetectingLanguage = false; }
    }, 1000);
  }
  private async updateActiveForm() { return this._scanner.updateActiveForm(); }
  private checkUserConfiguration() { this._position.checkUserConfiguration(); }
  private findSafePosition() { this._position.findSafePosition(); }
  private calculateSmartZIndex() { this._position.calculateSmartZIndex(); }
  private injectGlobalStyles() { this._position.injectGlobalStyles(); }
  updated(changedProperties: Map<string, unknown>) { super.updated(changedProperties); }
  firstUpdated() { firstUpdatedImpl(this as unknown as TypelessFormHost); }
  private async initializeI18n() { await this.translationService.initialize(); this.currentLang = this.translationService.getCurrentLang(); }
  private t(key: string, params?: Record<string, string | number>): string { return this.translationService.t(key, params); }
  private getTotalFormsCount(): number { return this._scanner.getTotalFormsCount(); }
  private getFormIndex(targetForm: HTMLFormElement): number { return this._scanner.getFormIndex(targetForm); }
  private getFormsStatistics() { return this._scanner.getFormsStatistics(); }
  private initializeRenderlessModal() { initializeRenderlessModalImpl(this as unknown as TypelessFormHost); }
  private getFormFillRatio(form: HTMLFormElement): number { return this._scanner.getFormFillRatio(form); }
  private getElementVisibilityRatio(element: Element): number { return this._scanner.getElementVisibilityRatio(element); }
  private isFormFilled(form: HTMLFormElement): boolean { return this._scanner.isFormFilled(form); }
  private selectActiveForm(): HTMLFormElement | null { return this._scanner.selectActiveForm(); }
  private getFieldsForDisplay(allFields: FieldDescriptor[]): FieldDescriptor[] { return getFieldsForDisplayImpl(allFields); }
  private findBestCandidateForm(allForms: HTMLFormElement[]): HTMLFormElement | null { return this._scanner.findBestCandidateForm(allForms); }
  private getFormTitle(form: HTMLFormElement): string { return this._scanner.getFormTitle(form); }
  private async getFormLanguage(): Promise<string> { return this._scanner.getFormLanguage(); }
  private scanAllForms() { this._scanner.scanAllForms(); }
  private _noFormsHideTimer: ReturnType<typeof setTimeout> | null = null;
  private evaluateWidgetVisibility() { evaluateWidgetVisibilityImpl(this as unknown as TypelessFormHost); }
  private getCurrentVisibleForm(): HTMLFormElement | null { return getCurrentVisibleFormImpl(this as unknown as TypelessFormHost); }
  private updateFormHighlight() { this._viewState.updateFormHighlight(); }
  private clearFormHighlight() { this._viewState.clearFormHighlight(); }
  private async handleFloatingButtonClick(event?: Event) { return handleFloatingButtonClickImpl(this as unknown as TypelessFormHost, event); }
  private closeModal() { return closeModalImpl(this as unknown as TypelessFormHost); }
  private handleUserCloseModal() { this.userClosedManually = true; this.lastClosedOnForm = this.selectActiveForm(); this.closeModal(); }
  private resetToInitial() { this._viewState.resetToInitial(); }
  private clearDOMElements() { this._viewState.clearDOMElements(); }
  private createDetailedError(userMessage: string, technicalError: unknown, context: string): void { createDetailedErrorImpl(this as unknown as import('./types/widget-host.js').TypelessFormHost, userMessage, technicalError, context); }
  private async requestMicrophonePermission(): Promise<boolean> { return this._audio.requestMicrophonePermission(); }
  private async handleStartListening() { return this._audio.handleStartListening(); }
  private handleStopListening() { return this._audio.handleStopListening(); }
  private async handleRecordingStop(audioBlob: Blob) { return this._audio.handleRecordingStop(audioBlob); }
  private async sendTextToLLM(text: string) { return this._llm.sendTextToLLM(text); }
  private handleFillForm(source?: string, idempotencyKey?: string) {
    if (source === 'system' || source === 'scan') {return;}
    if (idempotencyKey && idempotencyKey === this.lastAppliedKey && Date.now() - this.lastApplyAt < 3000) {return;}
    this.lastAppliedKey = idempotencyKey ?? JSON.stringify(this.lastLLMResponse?.autofill ?? {});
    this.lastApplyAt = Date.now();
    return this._filler.handleFillForm();
  }
  private async generateSafeBadges(fieldsForDisplay: FieldDescriptor[]) { return this._llm.generateSafeBadges(fieldsForDisplay); }
  private async performGenerateSafeBadges(fieldsForDisplay: FieldDescriptor[]) { return this._llm.generateSafeBadges(fieldsForDisplay); }
  private hydrateFromInitData(data: InitAnalyzeV2Data): boolean { return hydrateFromInitDataImpl(this as unknown as TypelessFormHost, data); }
  private async requestInitAnalyzeV2(fields: FieldDescriptor[], signal?: AbortSignal): Promise<InitAnalyzeV2Data> { return requestInitAnalyzeV2Impl(this as unknown as TypelessFormHost, fields, signal); }
  private async withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> { return Promise.race([promise, new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`Request timeout after ${timeoutMs}ms`)), timeoutMs))]); }
  private showLoading(): void { showLoadingImpl(this as unknown as TypelessFormHost); }
  private applyValuesToSingleForm(values: Record<string, string | number | boolean>, form: HTMLFormElement) { this._filler.applyValuesToSingleForm(values, form); }
  private selectBestDateTimeFormat(element: HTMLElement, multiFormatValue: MultiFormatValue): string { return this._filler.selectBestDateTimeFormat(element, multiFormatValue); }
  private getDisplayValueForField(fieldValue: unknown): string { return getDisplayValueForField(fieldValue); }
  private toggleConsentSection(section: 'section1' | 'section2' | 'section3') { this.consentExpandedSections[section] = !this.consentExpandedSections[section]; this.requestUpdate(); }
  private toggleConsentCheckboxMain() { this.consentCheckboxMain = !this.consentCheckboxMain; this.requestUpdate(); }
  private toggleConsentCheckboxAge() { this.consentCheckboxAge = !this.consentCheckboxAge; this.requestUpdate(); }
  private async handleAcceptConsent() { return handleAcceptConsentImpl(this as unknown as TypelessFormHost); }
  private handleDeclineConsent() { handleDeclineConsentImpl(this as unknown as TypelessFormHost); }
  private handleShowPrivacySettings() { handleShowPrivacySettingsImpl(this as unknown as TypelessFormHost); }
  private handleClosePrivacySettings() { handleClosePrivacySettingsImpl(this as unknown as TypelessFormHost); }
  private async handleDeleteData() { return handleDeleteDataImpl(this as unknown as TypelessFormHost); }
  private toggleDeleteConfirm() { this.deleteConfirmChecked = !this.deleteConfirmChecked; this.requestUpdate(); }
  render() { return renderImpl(this as unknown as TypelessFormHost); }
}

if (!customElements.get('typeless-form')) { customElements.define('typeless-form', TypelessForm); }
