/**
 * Widget Constants
 *
 * Central location for all widget-related constants
 */

export { WIDGET_VERSION } from './version.js';

export const AUDIO_CONFIG = {
  MIN_DECIBELS: -45,
  SMOOTHING_TIME_CONSTANT: 0.8,
  FFT_SIZE: 256,
  VOLUME_THRESHOLD: 10,
  SAMPLE_RATE: 16000,
  CHANNELS: 1,
  DETECTION_INTERVAL: 100,
  MIN_DETECTION_COUNT: 5,
  MIN_DURATION: 800,
  MAX_DURATION: 60000
};

export const SCROLL_CONFIG = {
  THROTTLE_DELAY: 200,
  SMART_POSITION_UPDATE_DELAY: 1000
};

export const MUTATION_OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeOldValue: true,
  attributeFilter: ['style', 'value', 'disabled', 'readonly']
};

export const API_TIMEOUT = 30000; // 30 seconds

export const STYLES_UPDATE_DELAY = 50;