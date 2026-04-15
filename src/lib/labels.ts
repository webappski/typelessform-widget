export interface MultiFormatValue {
  originalText: string;
  formats: {
    iso?: string;
    american?: string;
    european?: string;
    display?: string;
  };
}

/** Check if this is a time-only value based on originalText */
function isTimeOnlyByOriginalText(mv: MultiFormatValue): string | null {
  if (mv.originalText && /^\d{1,2}:\d{2}$/.test(mv.originalText)) {
    return mv.originalText.trim();
  }
  return null;
}

/** Check if ISO+display indicate a time-only value with placeholder date */
function isTimeOnlyByIsoPlaceholder(mv: MultiFormatValue): string | null {
  if (!mv.formats.iso || !mv.formats.display) {return null;}
  const isoStr = String(mv.formats.iso);
  const displayStr = String(mv.formats.display);
  if (isoStr.match(/^\d{4}-01-01T\d{2}:\d{2}/) && displayStr.includes('January 1')) {
    const match = isoStr.match(/T(\d{2}:\d{2})/);
    if (match) {return match[1];}
  }
  return null;
}

export function getDisplayValueForField(fieldValue: unknown): string {
  if (fieldValue && typeof fieldValue === 'object' && 'formats' in fieldValue) {
    const mv = fieldValue as MultiFormatValue;
    const timeOnly = isTimeOnlyByOriginalText(mv) || isTimeOnlyByIsoPlaceholder(mv);
    if (timeOnly) {return timeOnly;}

    return mv.formats.display || mv.formats.iso || mv.originalText || String(fieldValue);
  }
  return String(fieldValue);
}