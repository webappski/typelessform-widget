// UI render - extracted 1:1 from typeless-form.ts
// No behavior changes, exact extraction

import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { guard } from 'lit/directives/guard.js';
import { icons } from '../constants/icons.js';
import { renderInitialStep, renderListeningStep, renderProcessingStep, renderSuccessStep, renderErrorStep, renderConsentModal, renderPrivacySettings, renderModalHeader, renderScanningOrb } from '../view/modal-steps/index.js';
import { ConsentService } from '../services/consent-service.js';
import { getFieldStatuses } from '../lib/badge-sort.ts';
import { analyzeFormFill } from '../utils/form-utils.js';
import { handleFocusTrap } from '../utils/focus-trap.js';
import type { TypelessFormHost } from '../types/widget-host.js';

interface WindowWithAfcTestHook { AFC_TEST_HOOK?: unknown }

function renderConsentOverlay(component: TypelessFormHost) {
  return html`
    <div class="modal-overlay active consent-modal-overlay" @keydown=${(e: KeyboardEvent) => {
      if (e.key === 'Escape') { component.handleDeclineConsent(); return; }
      const dialog = (e.currentTarget as HTMLElement).querySelector('[role="dialog"]') as HTMLElement;
      if (dialog) {handleFocusTrap(e, dialog);}
    }}>
      <div class="modal-content modal-content--consent" role="dialog" aria-modal="true" aria-labelledby="typeless-modal-title">
        ${renderConsentModal({
          t: component.t.bind(component),
          handleAcceptConsent: () => component.handleAcceptConsent(),
          handleDeclineConsent: () => component.handleDeclineConsent(),
          consentCheckboxMain: component.consentCheckboxMain,
          consentCheckboxAge: component.consentCheckboxAge,
          toggleConsentCheckboxMain: () => component.toggleConsentCheckboxMain(),
          toggleConsentCheckboxAge: () => component.toggleConsentCheckboxAge(),
        })}
      </div>
    </div>
  `;
}

function renderLoadingContent(component: TypelessFormHost) {
  const t = component.t.bind(component);

  const progressContent = html`
    <div class="scanning-header-progress">
      <div class="scanning-header-progress-track">
        <div class="scanning-header-progress-fill"></div>
      </div>
    </div>
  `;

  return html`
    ${renderModalHeader({
      titleId: 'typeless-modal-title',
      icon: html`<div class="modal-icon-compact-modern logo-icon">${unsafeHTML(icons.typelessLogo)}</div>`,
      title: t('loader.initial'),
      subtitle: t(`loader.stage${component.progressStage}`),
      extraContent: progressContent,
      closeHandler: () => component.handleUserCloseModal(),
    })}
    <div class="modal-body">
      ${renderScanningOrb()}
    </div>
  `;
}

/** Route to the correct step renderer based on currentStep */
const STEP_RENDERERS: Record<string, (c: TypelessFormHost) => unknown> = {
  initial: renderInitialStepWrapper,
  listening: renderListeningStepWrapper,
  processing: renderProcessingStepWrapper,
  success: renderSuccessStepWrapper,
  error: renderErrorStepWrapper,
};

function renderReadyContent(component: TypelessFormHost) {
  return html`
    ${component.currentStep === 'error' ? html`
      <button class="close-button" @click=${component.handleUserCloseModal}>
        ${unsafeHTML(icons.close)}
      </button>
    ` : ''}
    ${guard(
      [component.currentStep, component.cachedSafeBadges?.safeFields?.length, component.expandedSections, component.processingStage, component.recordingDuration],
      () => (STEP_RENDERERS[component.currentStep] || (() => html``))(component)
    )}
  `;
}

function renderModalOverlay(component: TypelessFormHost) {
  return html`
    <div class="modal-overlay active ${component.showLoadingModal ? 'loading-modal-overlay' : ''}"
         @click=${(e: Event) => {
           if (!component.showLoadingModal && (e.target as HTMLElement).classList.contains('modal-overlay')) {
             component.handleUserCloseModal();
           }
         }}
         @keydown=${(e: KeyboardEvent) => {
           if (e.key === 'Escape' && !component.showLoadingModal) { component.handleUserCloseModal(); return; }
           const dialog = (e.currentTarget as HTMLElement).querySelector('[role="dialog"]') as HTMLElement;
           if (dialog) {handleFocusTrap(e, dialog);}
         }}>
      <div class="modal-content ${component.showLoadingModal ? 'modal-content--loading' : ''} ${component.currentStep === 'success' ? 'modal-content--success' : ''}" role="dialog" aria-modal="true" aria-labelledby="typeless-modal-title">
        ${component.showLoadingModal ? renderLoadingContent(component) : renderReadyContent(component)}
      </div>
    </div>
  `;
}

function renderPrivacyOverlay(component: TypelessFormHost) {
  const summary = ConsentService.getConsentSummary();
  return html`
    <div class="modal-overlay active consent-modal-overlay" @keydown=${(e: KeyboardEvent) => {
      if (e.key === 'Escape') { component.handleClosePrivacySettings(); return; }
      const dialog = (e.currentTarget as HTMLElement).querySelector('[role="dialog"]') as HTMLElement;
      if (dialog) {handleFocusTrap(e, dialog);}
    }}>
      <div class="modal-content modal-content--consent" role="dialog" aria-modal="true" aria-labelledby="typeless-modal-title">
        ${renderPrivacySettings({
          t: component.t.bind(component),
          userId: summary.userId,
          consentDate: summary.consentDate,
          policyVersion: summary.policyVersion,
          usageCount: summary.usageCount,
          deleteConfirmChecked: component.deleteConfirmChecked,
          toggleDeleteConfirm: () => component.toggleDeleteConfirm(),
          handleDeleteData: () => component.handleDeleteData(),
          handleClose: () => component.handleClosePrivacySettings(),
          isDeletingData: component.isDeletingData,
          deleteDataSuccess: component.deleteDataSuccess,
          deleteDataError: component.deleteDataError,
        })}
      </div>
    </div>
  `;
}

export function renderImpl(component: TypelessFormHost) {
  if (component.hideWidget) {return html``;}
  if (component.showPrivacySettings) {return renderPrivacyOverlay(component);}
  if (component.showConsentModal) {return renderConsentOverlay(component);}

  return html`
    <form-assistant-button
      class="ai-form-copilot-widget ${component.noFormsMessage ? 'no-forms-state' : ''}"
      .position=${component.widgetPosition}
      .zIndex=${{ widget: component.smartZIndex.widget }}
      .hidden=${component.showModal || component.showLoadingModal}
      .brandText=${component.noFormsMessage ? '' : 'TypelessForm'}
      .taglineText=${component.noFormsMessage ? component.t('error.noFields') : component.t('floatingButton.fillByVoice')}
      @assistant-click=${(e: CustomEvent) => {
        if (!component.noFormsMessage) {
          component.handleFloatingButtonClick(e.detail?.originalEvent || e);
        }
      }}
    ></form-assistant-button>
    ${(component.showLoadingModal || component.showModal) ? renderModalOverlay(component) : ''}
  `;
}

/** Get form title and progress info for active form */
function getActiveFormInfo(component: TypelessFormHost, activeForm: HTMLFormElement) {
  const formTitle = component.getFormTitle(activeForm);
  const { filled } = analyzeFormFill(activeForm);
  const progressInfo = filled > 0 ? component.t('form.progress.filled', { count: filled }) : '';
  return { formTitle, formIndex: component.getFormIndex(activeForm), progressInfo };
}

/** Get form title and progress info for multi-form display */
function getMultiFormInfo(component: TypelessFormHost, totalForms: number) {
  const stats = component.getFormsStatistics();
  const parts: string[] = [];
  if (stats.filled > 0) {parts.push(component.t('form.progress.filled', { count: stats.filled }));}
  if (stats.partiallyFilled > 0) {
    parts.push(`${stats.partiallyFilled} ${stats.partiallyFilled === 1 ? 'form' : 'forms'} partially filled`);
  }
  return { formTitle: component.t('form.allForms', { count: totalForms }), progressInfo: parts.join(', ') };
}

/** Build meta parts for form info display */
function buildMetaParts(component: TypelessFormHost, opts: { totalForms: number; formIndex: number; progressInfo: string; activeForm: HTMLFormElement | null }): string {
  const metaParts: string[] = [];
  if (opts.totalForms > 1) {
    metaParts.push(`${component.t('form.label')}: ${component.t('form.formNumber', { current: opts.formIndex, total: opts.totalForms })}`);
  }
  if (opts.progressInfo) {metaParts.push(`${component.t('form.fields')}: ${opts.progressInfo}`);}
  if (!opts.activeForm && opts.totalForms > 1) {metaParts.push(component.t('form.progress.scrollToSelect'));}
  return metaParts.join(' \u2022 ');
}

function renderFormInfoText(component: TypelessFormHost) {
  const activeForm = component.selectActiveForm();
  const totalForms = component.getTotalFormsCount();
  let formTitle = '', formIndex = 1, progressInfo = '';

  if (activeForm) {
    const info = getActiveFormInfo(component, activeForm);
    formTitle = info.formTitle; formIndex = info.formIndex; progressInfo = info.progressInfo;
  } else if (totalForms === 1) {
    const forms = component.scannedForms || [];
    if (forms.length > 0) {formTitle = component.getFormTitle(forms[0]);}
  } else if (totalForms > 1) {
    const info = getMultiFormInfo(component, totalForms);
    formTitle = info.formTitle; progressInfo = info.progressInfo;
  }

  if (!formTitle) {return '';}
  const metaInfo = buildMetaParts(component, { totalForms, formIndex, progressInfo, activeForm });
  return html`
    <div class="form-info-text">
      <h3 class="form-info-title-text">${formTitle}</h3>
      ${metaInfo ? html`<p class="form-info-meta-text">${metaInfo}</p>` : ''}
    </div>
  `;
}

function renderInitialStepWrapper(component: TypelessFormHost) {
  // Delegate to extracted function
  return renderInitialStep({
    cachedSafeBadges: component.cachedSafeBadges,
    t: component.t.bind(component),
    renderFormInfoText: () => renderFormInfoText(component),
    closeModal: () => component.handleUserCloseModal(),
    handleStartListening: () => component.handleStartListening(),
    handleShowPrivacySettings: () => component.handleShowPrivacySettings(),
    isLoading: component.isLoading,
    _isRecording: component._isRecording,
  });
}

function renderListeningStepWrapper(component: TypelessFormHost) {
  // Delegate to extracted function
  return renderListeningStep({
    cachedSafeBadges: component.cachedSafeBadges,
    t: component.t.bind(component),
    renderFormInfoText: () => renderFormInfoText(component),
    closeModal: () => component.handleUserCloseModal(),
    handleStopListening: () => component.handleStopListening(),
    getRecordingDuration: () => component.recordingDuration || 0,
  });
}

function renderProcessingStepWrapper(component: TypelessFormHost) {
  return renderProcessingStep({
    t: component.t.bind(component),
    processingStage: component.processingStage,
    cachedSafeBadges: component.cachedSafeBadges,
    renderFormInfoText: () => renderFormInfoText(component),
    closeModal: () => component.handleUserCloseModal(),
  });
}

type FormField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/** Find element in form by name, id, data-copilot-key, or fieldElementsMap */
function findFieldElement(component: TypelessFormHost, fieldName: string, form: HTMLFormElement): FormField | null {
  const byName = form.elements.namedItem(fieldName) as FormField | null;
  if (byName) {return byName;}
  const byId = form.querySelector(`#${CSS.escape(fieldName)}`) as FormField | null;
  if (byId) {return byId;}
  const byKey = form.querySelector(`[data-copilot-key="${CSS.escape(fieldName)}"]`) as FormField | null;
  if (byKey) {return byKey;}
  const mapped = component.fieldElementsMap.get(fieldName);
  if (mapped && form.contains(mapped)) {return mapped as FormField;}
  return null;
}

/** Extract current value from a found form element */
function extractElementValue(element: FormField, fieldName: string, form: HTMLFormElement): string {
  if (element.tagName === 'SELECT') {return (element as HTMLSelectElement).value || '';}
  if ((element as HTMLInputElement).type === 'checkbox') {return (element as HTMLInputElement).checked ? 'checked' : '';}
  if ((element as HTMLInputElement).type === 'radio') {
    const radioGroup = form.querySelectorAll(`input[type="radio"][name="${CSS.escape(fieldName)}"]`) as NodeListOf<HTMLInputElement>;
    for (const radio of radioGroup) {
      if (radio.checked) {return radio.value || 'checked';}
    }
    return '';
  }
  return element.value || '';
}

function getFieldCurrentValue(component: TypelessFormHost, fieldName: string, form: HTMLFormElement | null): string {
  if (!form) {return '';}
  try {
    const element = findFieldElement(component, fieldName, form);
    if (!element) {return '';}
    return extractElementValue(element, fieldName, form);
  } catch (_error) {
    return '';
  }
}

function getFieldStatusesWrapper(component: TypelessFormHost) {
  // Delegate to extracted function
  const result = getFieldStatuses({
    lastLLMResponse: component.lastLLMResponse,
    scannedFields: component.scannedFields,
    safeFieldNames: component.safeFieldNames,
    cachedSafeBadges: component.cachedSafeBadges,
    getFieldCurrentValue: (fieldName: string, form: HTMLFormElement | null) => getFieldCurrentValue(component, fieldName, form),
    selectActiveForm: () => component.selectActiveForm(),
    originalUserText: component.originalUserText,
    cachedFieldStatuses: component._cachedFieldStatuses,
    lastLLMResponseForCache: component._lastLLMResponseForCache,
  });

  // Update cache if needed
  if (result.shouldUpdateCache) {
    component._cachedFieldStatuses = result.statuses;
    component._lastLLMResponseForCache = result.cacheKey;
  }

  return result.statuses;
}

function renderSuccessStepWrapper(component: TypelessFormHost) {
  // Delegate to extracted function
  return renderSuccessStep({
    getFieldStatuses: () => getFieldStatusesWrapper(component),
    t: component.t.bind(component),
    renderFormInfoText: () => renderFormInfoText(component),
    closeModal: () => component.handleUserCloseModal(),
    getExpandedSections: () => component.expandedSections,  // Pass as getter function for reactivity!
    toggleSection: (section: string) => {
      toggleSection(component, section as 'empty' | 'check' | 'filled');
    },
    getDisplayValueForField: (value: unknown) => component.getDisplayValueForField(value as string | number | boolean | null | undefined),
    originalUserText: component.originalUserText,
    formLanguageDetector: component.formLanguageDetector,
    currentLang: component.currentLang,
    detectedLanguage: component.detectedLanguage,
    handleFillForm: (e?: Event) => {
      // Event hygiene: only accept real user clicks (e.isTrusted)
      // Reject synthetic events from render effects
      // EXCEPTION: Allow non-trusted events in test environment (AFC_TEST_HOOK exists)
      const isTestEnvironment = typeof window !== 'undefined' && (window as unknown as WindowWithAfcTestHook).AFC_TEST_HOOK;
      if (e && !e.isTrusted && !isTestEnvironment) {
        return;
      }
      const llmId = Date.now();
      component.handleFillForm('ui', String(llmId));
    },
  });
}

function toggleSection(component: TypelessFormHost, section: 'empty' | 'check' | 'filled') {
  // Мгновенное обновление без задержек
  // Create new object to trigger Lit's change detection
  component.expandedSections = {
    ...component.expandedSections,
    [section]: !component.expandedSections[section]
  };

  component.requestUpdate('expandedSections');
}

function renderErrorStepWrapper(component: TypelessFormHost) {
  // Delegate to extracted function
  return renderErrorStep({
    errorMessage: component.errorMessage,
    errorDetails: component.errorDetails,
    t: component.t.bind(component),
    resetToInitial: () => component.resetToInitial(),
    closeModal: () => component.handleUserCloseModal(),
  });
}
