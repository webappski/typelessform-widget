/**
 * Constants for widget positioning functionality
 */

// Default widget position
export const DEFAULT_WIDGET_POSITION = {
  bottom: 20,
  right: 20
} as const;

// Widget button dimensions
export const WIDGET_DIMENSIONS = {
  width: 80,
  height: 80
} as const;

// Z-index configuration
export const DEFAULT_Z_INDEX = {
  widget: 999999,
  modal: 1000000
} as const;

// Z-index calculation offsets
export const Z_INDEX_OFFSETS = {
  widget: 1000,
  modal: 2000
} as const;

// Maximum z-index value to consider (browser limit)
export const MAX_Z_INDEX = 2147483647;

// Widget positioning options
export const POSITION_OPTIONS = [
  { bottom: 20, right: 20 },     // Standard position
  { bottom: 120, right: 20 },    // Shifted up by 100px
  { bottom: 20, left: 20 },      // Bottom left corner
  { bottom: 120, left: 20 },     // Bottom left corner, higher
] as const;

// Fallback position when all positions are occupied
export const FALLBACK_POSITION = {
  bottom: 180,
  right: 20
} as const;

// Positioning timing configuration
export const POSITION_TIMING = {
  showDelay: 1500,              // Default widget show delay in ms
  positionCheckInterval: 500,    // Position check interval in ms
  resizeThrottle: 500,          // Resize handler throttle in ms
  scrollThrottle: 500,          // Scroll handler throttle in ms
  mutationThrottle: 1000        // Mutation observer throttle in ms
};

// Viewport safety margins
export const VIEWPORT_MARGINS = {
  safeDistance: 20  // Minimum distance from viewport edges
} as const;

// Position check configuration
export const POSITION_CHECK = {
  maxAttempts: 10,
  intervalMs: 500
} as const;

// Conflict detection boundaries
export const CONFLICT_DETECTION = {
  // Relative position of widget boundaries
  boundaryOffsets: {
    buttonBottom: 0,
    buttonTop: 80,   // button height
    buttonLeft: 0,
    buttonRight: 80  // button width
  }
} as const;

// CSS variable names for positioning
export const POSITION_CSS_VARS = {
  bottom: '--widget-bottom',
  top: '--widget-top',
  left: '--widget-left',
  right: '--widget-right'
} as const;

// Position property types
export type WidgetPosition = {
  bottom: number;
  right?: number;
  left?: number;
};

export type ZIndexConfig = {
  widget: number;
  modal: number;
};

export type PositionOption = {
  bottom: number;
  right?: number;
  left?: number;
};

export type ViewportBounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};