// src/constant/Size.ts

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/**
 * Global sizing and spacing scale for consistent layout across the app.
 * Includes static dp values and responsive functions.
 */
export const Size = {
  /** Standard spacing values (in dp) */
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  /** Standard border radius values (in dp) */
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
  },

  /** Standard icon sizes (in dp) */
  icon: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },

  /** Font size scale (in sp) */
  font: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  /** Responsive utility functions */
  responsive: {
    /** Width as percentage of screen width */
    width: (percent: number) => wp(`${percent}%`),
    /** Height as percentage of screen height */
    height: (percent: number) => hp(`${percent}%`),
  },
};
