/**
 * Animation constants for consistent behavior across the app
 * Centralized configuration for maintainability and consistency
 */

export const ANIMATION_CONFIG = {
  // Spring animation physics
  TENSION: 100,
  FRICTION: 8,

  // Scale values for press animations
  SCALE_PRESS: 0.95,
  SCALE_PRESS_FAB: 0.9,
  SCALE_NORMAL: 1,

  // Animation durations
  DURATION_FAST: 100,
  DURATION_NORMAL: 300,

  // Shadow and elevation values
  SHADOW_OFFSET: 4,
  SHADOW_OPACITY: 0.3,
  SHADOW_RADIUS: 8,
  ELEVATION: 8,

  // Safe area padding
  SAFE_AREA_MIN: 20,
  SAFE_AREA_OFFSET: 16,

  // Layout spacing
  BOTTOM_PADDING: 100,
  RIGHT_MARGIN: 24,
  BUTTON_SPACING: 16,
} as const;

export const COLORS = {
  SHADOW_PURPLE: '#9333EA',
  SHADOW_BLACK: '#000000',
} as const;