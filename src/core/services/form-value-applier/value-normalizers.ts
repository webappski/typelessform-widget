/**
 * Value Normalizers — pure helper functions for normalizing and applying values to form fields.
 */

/** React-safe value setter — uses native property descriptor to trigger React's value tracking */
export const setReactValue = (el: HTMLInputElement | HTMLTextAreaElement, v: string): void => {
  const proto = el instanceof HTMLTextAreaElement
    ? HTMLTextAreaElement.prototype
    : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
  if (setter) {
    setter.call(el, v);
  } else {
    (el as HTMLInputElement).value = v; // fallback
  }
};

/** Fire input and change events in correct order for React controlled components */
export const fireInputChange = (el: HTMLElement): void => {
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
};

/** Normalize text value (simple string conversion) */
export const normText = (v: unknown): string => {
  return (v === null || v === undefined) ? '' : String(v);
};

/** Format a Date to YYYY-MM-DD */
const formatDateYMD = (d: Date): string => {
  if (isNaN(d.getTime())) {return '';}
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/** Extract YYYY-MM-DD from various string patterns */
const parseDateString = (s: string): string => {
  if (!s) {return '';}

  // ISO format: "2025-01-15" or "2025-01-15T14:30:00"
  const iso = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (iso) {return iso[1];}

  // American format: "01/15/2025" (MM/DD/YYYY)
  const american = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (american && parseInt(american[1]) <= 12) {
    return `${american[3]}-${american[1].padStart(2, '0')}-${american[2].padStart(2, '0')}`;
  }

  // European format with dots: "15.01.2025" (DD.MM.YYYY)
  const euro = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (euro) {return `${euro[3]}-${euro[2].padStart(2, '0')}-${euro[1].padStart(2, '0')}`;}

  // European format with slashes (day > 12 → definitely DD/MM/YYYY)
  if (american && parseInt(american[1]) > 12) {
    return `${american[3]}-${american[2].padStart(2, '0')}-${american[1].padStart(2, '0')}`;
  }

  // Fallback: try Date.parse
  const parsed = Date.parse(s);
  return isNaN(parsed) ? '' : formatDateYMD(new Date(parsed));
};

/** Unwrap MultiFormatValue or other object/primitive into a raw value for further parsing */
type MultiFormatLike = { formats?: { html?: string; iso?: string }; originalText?: string };

const unwrapMultiFormat = (v: unknown, preferredKeys: (keyof NonNullable<MultiFormatLike['formats']>)[]): unknown => {
  if (!v || typeof v !== 'object' || !('formats' in v)) {return v;}
  const mv = v as MultiFormatLike;
  for (const key of preferredKeys) {
    const val = mv.formats?.[key];
    if (val) {return val;}
  }
  return mv.originalText ?? v;
};

/** Normalize date value. INPUT[type=date] requires STRICTLY "YYYY-MM-DD" format. */
export const normDate = (input: unknown): string => {
  if (input === null || input === undefined) {return '';}
  const v = unwrapMultiFormat(input, ['html', 'iso']);

  // MultiFormatValue: try to extract date from string
  if (v !== input && typeof v === 'string') {
    const m = v.match(/(\d{4}-\d{2}-\d{2})/);
    if (m) {return m[1];}
  }

  if (v instanceof Date) {return formatDateYMD(v);}
  if (typeof v === 'number') {return formatDateYMD(new Date(v));}
  return parseDateString(String(v).trim());
};

/** Extract time in HH:mm format from various string formats */
export const extractTimeFromString = (s: string): string => {
  if (!s) {return '';}

  // 1. 12-hour format with AM/PM: "2:30 PM", "02:30 pm", "2:30PM"
  let m = s.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);
  if (m) {
    let hours = parseInt(m[1]);
    const minutes = m[2];
    const meridiem = m[3].toLowerCase();

    // Convert to 24-hour format
    if (meridiem === 'pm' && hours !== 12) {
      hours += 12;
    } else if (meridiem === 'am' && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, '0')}:${minutes}`;
  }

  // 2. 24-hour format: "14:30", "14:30:00", "2025-01-15T14:30:00"
  m = s.match(/(?:^|T|\s)([01]?\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?/);
  if (m) {
    const hours = m[1].padStart(2, '0');
    const minutes = m[2];
    return `${hours}:${minutes}`;
  }

  return '';
};

/** Format a Date to HH:mm */
const formatTimeHM = (d: Date): string => {
  if (isNaN(d.getTime())) {return '';}
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

/** Normalize time value. INPUT[type=time] requires STRICTLY "HH:mm" format. */
export const normTime = (input: unknown): string => {
  if (input === null || input === undefined) {return '';}
  const v = unwrapMultiFormat(input, ['html', 'iso']);

  if (v !== input && typeof v === 'string') {
    const extracted = extractTimeFromString(v);
    if (extracted) {return extracted;}
  }

  if (v instanceof Date) {return formatTimeHM(v);}
  if (typeof v === 'number') {return formatTimeHM(new Date(v));}
  return extractTimeFromString(String(v).trim());
};

/** Extract datetime in YYYY-MM-DDTHH:mm format from various string formats */
export const extractDateTimeFromString = (s: string): string => {
  if (!s) {return '';}

  // 1. ISO format: "2025-01-15T14:30:00" or "2025-01-15T14:30"
  let m = s.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})(?::\d{2})?/);
  if (m) {
    return `${m[1]}T${m[2]}`;
  }

  // 2. Space-separated: "2025-01-15 14:30" or "2025-01-15 14:30:00"
  m = s.match(/^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})(?::\d{2})?/);
  if (m) {
    return `${m[1]}T${m[2]}`;
  }

  // 3. Try parsing as date and extracting components
  const parsed = Date.parse(s);
  if (!isNaN(parsed)) {
    const date = new Date(parsed);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return '';
};

/** Format a Date to YYYY-MM-DDTHH:mm */
const formatDateTimeISO = (d: Date): string => {
  if (isNaN(d.getTime())) {return '';}
  return `${formatDateYMD(d)}T${formatTimeHM(d)}`;
};

/** Normalize datetime-local value. INPUT[type=datetime-local] requires STRICTLY "YYYY-MM-DDTHH:mm" format. */
export const normDateTime = (input: unknown): string => {
  if (input === null || input === undefined) {return '';}
  const v = unwrapMultiFormat(input, ['iso', 'html']);

  if (v !== input && typeof v === 'string') {
    const extracted = extractDateTimeFromString(v);
    if (extracted) {return extracted;}
  }

  if (v instanceof Date) {return formatDateTimeISO(v);}
  if (typeof v === 'number') {return formatDateTimeISO(new Date(v));}
  return extractDateTimeFromString(String(v).trim());
};