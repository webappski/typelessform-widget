// Extracted form post-processing functions from typeless-form.ts
// Byte-for-byte перенос логики без «улучшений».

import { belongsToForm } from '../lib/dom';
import type { FieldDescriptor } from '../form-scanner/types.js';

export function normalizeScanResults(results: { fields: FieldDescriptor[] }[]): FieldDescriptor[] {
  // РОВНО как в typeless-form.ts (~890–893)
  const allFields = results.reduce((all, form) => [...all, ...form.fields], [] as FieldDescriptor[]);
  return allFields;
}

export function buildFieldElementsMap(
  scannedFields: FieldDescriptor[],
  targetMap: Map<string, HTMLElement>,
  activeForm?: HTMLFormElement
): void {
  // Важно: сохраняем ТОТ ЖЕ экземпляр Map
  targetMap.clear();

  scannedFields.forEach(field => {
    if (!field) {
      return;
    }

    if (!field.element) {
      return;
    }

    const isConnected = field.element.isConnected;
    if (!isConnected) {
      return;
    }

    // Filter by form membership if activeForm provided
    // Prevents fieldElementsMap collisions when multiple forms on page
    if (activeForm && !belongsToForm(field.element, activeForm)) {
      return;
    }

    targetMap.set(field.name, field.element);
  });
}

export function computeBestForm(
  allForms: HTMLFormElement[],
  getVisibility: (f: HTMLFormElement) => number,
  isFilled: (f: HTMLFormElement) => boolean
): { bestForm: HTMLFormElement | null; bestVisibility: number } {
  // РОВНО как в исходнике (~794–805): adjustedVisibility с понижением для заполненных форм
  let bestForm: HTMLFormElement | null = null;
  let bestVisibility = 0;

  for (const form of allForms) {
    const visibility = getVisibility(form);
    const filled = isFilled(form);
    const adjustedVisibility = filled ? visibility * 0.8 : visibility;

    if (adjustedVisibility > bestVisibility) {
      bestVisibility = adjustedVisibility;
      bestForm = form;
    }
  }

  return { bestForm, bestVisibility };
}