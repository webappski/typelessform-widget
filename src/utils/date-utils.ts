/**
 * Date/time utility functions
 */

import type { MultiFormatValue } from '../llm-client';

/** Try to resolve time format from MultiFormatValue */
function resolveTimeFormat(mfv: MultiFormatValue): string {
  if (mfv.originalText && /^\d{1,2}:\d{2}$/.test(mfv.originalText)) {
    return mfv.originalText.trim();
  }
  if (mfv.formats.iso) {
    const match = String(mfv.formats.iso).match(/T(\d{2}:\d{2})/);
    if (match) {return match[1];}
  }
  return '';
}

/** Try to resolve format for Ionic components */
function resolveIonicFormat(tagName: string, formats: MultiFormatValue['formats']): string | null {
  if ((tagName === 'ion-datetime' || tagName.includes('ion-')) && formats.iso) {return formats.iso;}
  return null;
}

/** Try to resolve format for HTML5 input types */
function resolveHtml5Format(type: string, mfv: MultiFormatValue): string | null {
  if (type === 'date' && mfv.formats.iso) {return mfv.formats.iso.split('T')[0];}
  if (type === 'datetime-local' && mfv.formats.iso) {return mfv.formats.iso;}
  if (type === 'time') {return resolveTimeFormat(mfv);}
  return null;
}

/** Try to resolve format for custom numeric/timestamp components */
function resolveCustomFormat(type: string, tagName: string, formats: MultiFormatValue['formats']): string | null {
  if ((tagName.includes('timestamp') || tagName.includes('epoch')) && formats.timestamp) {return String(formats.timestamp);}
  if ((type === 'number' || tagName.includes('numeric')) && formats.numeric) {return formats.numeric;}
  return null;
}

/** Select the best date/time format based on element type and tagName */
export function selectBestDateTimeFormat(element: HTMLElement, mfv: MultiFormatValue): string {
  const type = (element as HTMLInputElement).type;
  const tagName = element.tagName.toLowerCase();
  const { formats } = mfv;

  return resolveIonicFormat(tagName, formats)
    ?? resolveHtml5Format(type, mfv)
    ?? resolveCustomFormat(type, tagName, formats)
    ?? formats.display
    ?? formats.iso
    ?? mfv.originalText;
}