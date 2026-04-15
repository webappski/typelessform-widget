// Lifecycle helper utilities - extracted from lifecycle.ts
// Pure functions for value normalization, DOM reading, and element lookup

import type { TypelessFormHost } from '../types/widget-host.js';
import { collectObstructions } from '../lib/guards.ts';

export interface WindowWithAifc {
  __aifc_guard?: { phase: string };
  performance?: Performance;
  AFC_TEST_FLAGS?: { useRenderlessModal?: boolean };
}

// Topology hash for quick form change detection
export let lastFormTopologyHash = '';
export function setLastFormTopologyHash(value: string): void {
  lastFormTopologyHash = value;
}

export function getFormTopologySignature(activeForm: HTMLFormElement | null): string {
  if (!activeForm) { return ''; }
  const fields = activeForm.querySelectorAll('input, textarea, select');
  let sig = '';
  fields.forEach((f: Element) => {
    const el = f as HTMLInputElement;
    sig += `${el.tagName}|${el.type || ''}|${el.name || ''}|${el.id || ''},`;
  });
  return sig;
}

// ── Get live element from fieldElementsMap, re-link if disconnected ──
export function getLiveElement(component: TypelessFormHost, name: string): Element | null {
  const prev = component.fieldElementsMap?.get(name);
  if (prev instanceof Element && prev.isConnected) {
    return prev;
  }

  const found = findElementByName(name);

  if (found && found.isConnected) {
    component.fieldElementsMap?.set(name, found as HTMLElement);
    return found;
  }

  return null;
}

function findElementByName(name: string): Element | null {
  const selectors = [
    `input[name="${CSS.escape(name)}"]`,
    `textarea[name="${CSS.escape(name)}"]`,
    `select[name="${CSS.escape(name)}"]`,
    `#${CSS.escape(name)}`,
    `[data-field="${CSS.escape(name)}"]`,
  ];

  for (const sel of selectors) {
    try {
      const found = document.querySelector(sel);
      if (found) { return found; }
    } catch (_) {
      // Invalid selector, skip
    }
  }
  return null;
}

// ── Ensure fieldElementsMap has live elements for given field names ──
export function ensureFreshFieldElementsMap(component: TypelessFormHost, fieldNames: string[], _context: string): boolean {
  const isLive = (el: unknown) => el instanceof Element && el.isConnected;
  const missing = fieldNames.filter(name => !isLive(component.fieldElementsMap?.get(name)));

  if (missing.length > 0) {
    component.scanAllForms();
    const stillMissing = fieldNames.filter(name => !isLive(component.fieldElementsMap?.get(name)));
    if (stillMissing.length > 0) {
      return false;
    }
  }
  return true;
}

// ── Normalize expected value for VALUE-CHECK comparison ──
export function normalizeExpectedValue(value: unknown, element: HTMLInputElement | HTMLTextAreaElement): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'object' && 'formats' in (value as Record<string, unknown>)) {
    return normalizeMultiFormatValue(value as Record<string, unknown>, element);
  }

  return String(value ?? '');
}

// ── Normalize MultiFormatValue for date/time fields ──
function normalizeMultiFormatValue(value: Record<string, unknown>, element: HTMLInputElement | HTMLTextAreaElement): string {
  const formats = value.formats as Record<string, string> | undefined;
  const originalText = value.originalText as string | undefined;

  if (element instanceof HTMLInputElement) {
    return normalizeInputMultiFormat(element.type, formats, originalText);
  }

  return formats?.html || String(originalText ?? '') || formats?.iso || '';
}

function normalizeInputMultiFormat(
  type: string,
  formats: Record<string, string> | undefined,
  originalText: string | undefined
): string {
  if (type === 'date') {
    return extractDateValue(formats, originalText);
  }

  if (type === 'time' || type === 'datetime-local') {
    return extractTimeValue(formats, originalText);
  }

  return formats?.html || String(originalText ?? '') || formats?.iso || '';
}

function extractDateValue(formats: Record<string, string> | undefined, originalText: string | undefined): string {
  const dateStr = formats?.html || originalText || formats?.iso || '';
  const m = String(dateStr).match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : '';
}

function extractTimeValue(formats: Record<string, string> | undefined, originalText: string | undefined): string {
  const timeStr = formats?.html || originalText || formats?.iso || '';
  const m = String(timeStr).match(/(?:^|T|\s)([01]?\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?/);
  if (m) {
    const hh = m[1].padStart(2, '0');
    const mm = m[2].padStart(2, '0');
    return `${hh}:${mm}`;
  }
  return '';
}

// ── Read current DOM value from a live element ──
export function readCurrentDOMValue(element: Element): string {
  if (element instanceof HTMLInputElement) {
    return readInputValue(element);
  }
  if (element instanceof HTMLTextAreaElement) {
    return element.value ?? '';
  }
  if (element instanceof HTMLSelectElement) {
    return element.value ?? '';
  }
  return readGenericElementValue(element);
}

function readInputValue(element: HTMLInputElement): string {
  if (element.type === 'checkbox' || element.type === 'radio') {
    return element.checked ? 'true' : 'false';
  }
  return element.value ?? '';
}

function readGenericElementValue(element: Element): string {
  if ((element as HTMLElement).isContentEditable) {
    return (element as HTMLElement).innerText ?? '';
  }
  return (element as HTMLElement).textContent?.trim() ?? '';
}

// ── Update safe insets if changed ──
export function updateSafeInsetsIfChanged(component: TypelessFormHost): void {
  const newInsets = collectObstructions();
  if (JSON.stringify(newInsets) !== JSON.stringify(component.safeInsets)) {
    component.safeInsets = newInsets;
  }
}

// ── Check body inputs for visibility (fallback for BODY observer) ──
export function checkBodyInputsVisibility(component: TypelessFormHost, threshold: number): boolean {
  const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea, select');
  for (const input of inputs) {
    const inputRatio = component.getElementVisibilityRatio(input);
    if (inputRatio >= threshold) {
      return true;
    }
  }
  return false;
}
