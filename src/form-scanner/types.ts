export interface FieldDescriptor {
  formIndex?: number;
  name: string;
  label?: string;
  ariaLabel?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  isPrivate?: boolean;
  explicitLabel?: string;
  options?: { value: string; label: string; name?: string }[];
  value?: string | number | boolean | string[] | undefined;
  element?: HTMLElement; // Reference to actual DOM element
  tagName?: string; // Element tagName for format detection (e.g., 'ion-datetime', 'gc-input')
  // Constraint attributes for intelligent value processing
  step?: string; // For time/number inputs (e.g., "300" = 5 minutes)
  min?: string; // Minimum value/time
  max?: string; // Maximum value/time
  pattern?: string; // Regex pattern for validation
  classList?: string[];
  role?: string | null;
  ariaHaspopup?: string | null;
  ariaControls?: string | null;
  hasDatalist?: boolean;
  listId?: string | null;
  group?: string; // Section heading text (e.g., "Emergency Contact")
}

export const SAFE_CLASS_PATTERNS: RegExp[] = [
  /(^|[-_])(ant|mat|ion|nz|p|el|bs|v)(-|$)/i,
  /(^|[-_])(select|dropdown|combobox|listbox)(-|$)/i,
  /(^|[-_])(field|form|control|input|picker|chooser)(-|$)/i,
  /^w-\d+$/i,
  /^h-\d+$/i,
];
