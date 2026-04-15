/**
 * Init Analyze V2 helpers — extracted from typeless-form.ts to reduce file size.
 * Pure functions operating on TypelessFormHost interface.
 */

import { CONFIG } from '../constants/config.ts';
import { ViewState } from '../types';
import { getFormTitle } from '../lib/field-keys.ts';
import type { FieldDescriptor } from '../form-scanner/index.js';
import type { TypelessFormHost } from '../types/widget-host.ts';
import { apiFetch } from '../utils/api-fetch.ts';
import type { InitAnalyzeV2Data, AifcGlobalState, BadgeData, SafeBadge } from '../types/common-types.js';

interface WindowWithAifc {
  __aifc_state: AifcGlobalState | null;
  __aifc_debug?: { lastInitReq: unknown; lastInitResp: unknown };
}

/** Set window.__aifc_state as a non-enumerable property so it doesn't leak in console/enumeration */
function setAifcState(value: AifcGlobalState | null): void {
  Object.defineProperty(window, '__aifc_state', {
    value,
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

/** Build global state object from init data. Data is guaranteed non-null by callers. */
function buildGlobalState(data: InitAnalyzeV2Data): AifcGlobalState {
  const d = data as Record<string, unknown>;
  return {
    formLanguage: (d.formLanguage as string) ?? null,
    formName: (d.formName as string) ?? null,
    domTitleTranslated: (d.domTitleTranslated as string) ?? null,
    badges: (d.badges as BadgeData[]) ?? [],
    filterMap: (d.filterMap as number[]) ?? [],
  };
}

/** Map non-sensitive badges to SafeBadge format */
function mapBadgesToSafeFields(data: InitAnalyzeV2Data): SafeBadge[] {
  const sectionTranslations = data?.sectionTranslations || {};
  const nonSensitive = (data?.badges || []).filter((b: BadgeData) => !b.isSensitive);
  return nonSensitive.map((b: BadgeData) => ({
    name: b.fieldId,
    text: b.displayText || b.labelTranslated || b.labelOriginal || '',
    group: (b.group && sectionTranslations[b.group]) || b.group || null,
    translatedText: b.displayText || b.labelTranslated || b.labelOriginal || '',
  }));
}

/** Hydrate component from cached init data (used by tryCacheHit). Returns true if badges found. */
export function hydrateFromInitDataImpl(component: TypelessFormHost, data: InitAnalyzeV2Data): boolean {
  const formId = component.currentFormId;
  if (!formId || !data) {return false;}

  component.__initAnalyzeV2 = { ...data, formId };
  setAifcState(buildGlobalState(data));

  if (Array.isArray(data?.filterMap)) {component.filterMap = data.filterMap;}

  const mapped = mapBadgesToSafeFields(data);
  component.cachedSafeBadges = { safeFields: mapped, displayFields: mapped };

  if (component.viewState === ViewState.Loading) {component.viewState = ViewState.Ready;}
  component.requestUpdate();
  return mapped.length > 0;
}

/** Store init response in global state (first pass before hydrate) */
export function storeInitResponseImpl(component: TypelessFormHost, data: InitAnalyzeV2Data, formId: string): void {
  component.__initAnalyzeV2 = { ...data, formId };
  component.detectedLanguage = data.formLanguage ?? component.detectedLanguage;
  component.requestUpdate();
  setAifcState(buildGlobalState(data));
  updateTranslationFormName(component, data);
}

/** Set form name on translation service if present */
function updateTranslationFormName(component: TypelessFormHost, data: InitAnalyzeV2Data): void {
  if (!data.formName || !component.translationService) {return;}
  (component.translationService as unknown as { inferredFormName: string | null }).inferredFormName = data.formName;
  component.requestUpdate();
}

/** Hydrate component from fresh server response */
export function hydrateFromInitResponseImpl(component: TypelessFormHost, data: InitAnalyzeV2Data, formId: string): void {
  component.__initAnalyzeV2 = { ...data, formId };
  setAifcState(buildGlobalState(data));

  if (Array.isArray(data?.filterMap)) {component.filterMap = data.filterMap;}

  const mapped = mapBadgesToSafeFields(data);
  component.cachedSafeBadges = { safeFields: mapped, displayFields: mapped };

  if (component.viewState === ViewState.Loading) {component.viewState = ViewState.Ready;}
  component.requestUpdate();
}

/** Store debug info for dev tools */
export function storeDebugInfoImpl(payload: Record<string, unknown>, data: InitAnalyzeV2Data): void {
  if (!import.meta.env.DEV) { return; }
  const safeClip = (o: unknown): unknown => {
    try {
      const s = JSON.stringify(o);
      return s.length > 2000 ? JSON.parse(s.slice(0, 2000)) : o;
    } catch {
      return { note: 'clip-failed' };
    }
  };
  (window as unknown as WindowWithAifc).__aifc_debug = {
    lastInitReq: safeClip(payload),
    lastInitResp: safeClip(data),
  };
}

/** Convert nullable value to null (avoids undefined in JSON) */
function n(v: unknown): unknown { return v ?? null; }

/** Map basic field properties to payload */
function mapFieldBasicProps(f: FieldDescriptor, index: number): Record<string, unknown> {
  return {
    id: f.name ?? `field_${index}`, name: n(f.name), type: f.type ?? 'text',
    label: n(f.label), placeholder: n(f.placeholder), ariaLabel: n(f.ariaLabel),
    group: n(f.group), index, required: f.required ?? false,
  };
}

/** Map extended field properties to payload */
function mapFieldExtendedProps(f: FieldDescriptor): Record<string, unknown> {
  return {
    options: f.options ? f.options.map((o: { value: string; label: string; name?: string }) => o.label ?? o.value) : null,
    tagName: n(f.tagName), classList: n(f.classList), role: n(f.role),
    ariaHaspopup: n(f.ariaHaspopup), ariaControls: n(f.ariaControls),
    hasDatalist: n(f.hasDatalist), listId: n(f.listId),
    isPrivate: n(f.isPrivate), explicitLabel: n(f.explicitLabel),
  };
}

/** Map a FieldDescriptor to the init payload field format */
function mapFieldToPayload(f: FieldDescriptor, index: number): Record<string, unknown> {
  return { ...mapFieldBasicProps(f, index), ...mapFieldExtendedProps(f) };
}

/** Build init payload for the server */
export function buildInitPayloadImpl(component: TypelessFormHost, fields: FieldDescriptor[], formId: string): Record<string, unknown> {
  const form = component.selectActiveForm();
  const domTitle = form ? getFormTitle(form, '') : '';
  const payload: Record<string, unknown> = {
    pageUrl: window.location.origin, formId, formTitle: domTitle,
    userUiLang: component.currentLang,
    fields: fields.map(mapFieldToPayload),
    widgetVersion: '1.0.0',
  };
  if (component.apiKey) {payload.apiKey = component.apiKey;}
  return payload;
}

/** Fetch init data from backend */
export async function fetchInitDataImpl(payload: Record<string, unknown>, signal?: AbortSignal): Promise<InitAnalyzeV2Data> {
  const resp = await apiFetch(CONFIG.INIT_ANALYZE_V2_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });
  if (!resp.ok) {
    let detail = '';
    try { const body = await resp.json(); detail = [body?.code, body?.error].filter(Boolean).join(' '); } catch { /* response not JSON */ }
    throw new Error(`HTTP ${resp.status}: ${detail || resp.statusText}`);
  }
  return await resp.json() as InitAnalyzeV2Data;
}

/** Full requestInitAnalyzeV2 flow */
export async function requestInitAnalyzeV2Impl(component: TypelessFormHost, fields: FieldDescriptor[], signal?: AbortSignal): Promise<InitAnalyzeV2Data> {
  window.performance?.mark('aifc_init_start');
  const formId = component.currentFormId || component.selectActiveForm()?.id || 'unknown';
  const payload = buildInitPayloadImpl(component, fields, formId);
  const data = await fetchInitDataImpl(payload, signal);

  storeInitResponseImpl(component, data, formId);
  storeDebugInfoImpl(payload, data);

  const stale = !formId || ((data as InitAnalyzeV2Data & { formId?: string })?.formId && (data as InitAnalyzeV2Data & { formId?: string }).formId !== formId);
  if (!stale) {hydrateFromInitResponseImpl(component, data, formId);}

  return data;
}

/** Clear all UI state to show loading */
export function showLoadingImpl(component: TypelessFormHost): void {
  component.cachedSafeBadges = null;
  setAifcState(null);
  component.__initAnalyzeV2 = null;
  component.scannedFields = [];
  component.fieldsDetected = 0;
  component.requestUpdate();
}
