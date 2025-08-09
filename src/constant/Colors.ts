// src/constants/Colors.ts

export type ThemeColors = {
  primary: string; // Buttons, links, interactive elements
  background: string; // App screen & container backgrounds
  accent: string; // Highlights, badges, secondary buttons
  cardBackgroud: string;
  textPrimary: string; // Main body text and headings
  textSecondary: string; // Captions, placeholder text, disabled text
  warning: string; // Warning messages, caution states
  error: string; // Error messages, destructive actions
  success: string; // Success messages, confirmations
  info: string; // Informational banners, tips
  purple: string; // Branding accents, special callouts
};

export const Colors: { LIGHT: ThemeColors; DARK: ThemeColors } = {
  LIGHT: {
    // Buttons, links, interactive elements
    primary: "#3D405B",
    // App screen & container backgrounds
    background: "#FFFFFF",
    // Highlights, badges, secondary buttons
    accent: "#81B29A",
    // Main body text and headings
    textPrimary: "#000000",
    // Captions, placeholder text, disabled text
    textSecondary: "#696970ff",
    // Warning messages, caution states
    warning: "#F2CC8F",
    //Card
    cardBackgroud: "#ebe6e0ff",

    // Error messages, destructive actions
    error: "#E07A5F",
    // Success messages, confirmations
    success: "#81B29A",
    // Informational banners, tips
    info: "#F4F1DE",
    // Branding accents, special callouts
    purple: "#3D405B",
  },
  DARK: {
    // Buttons, links, interactive elements
    primary: "#2c3050ff",
    // App screen & container backgrounds
    background: "#000000",
    // Highlights, badges, secondary buttons
    accent: "#81B29A",
    // card
    cardBackgroud: "#ebe6e0ff",
    // Main body text and headings
    textPrimary: "#FFFFFF",
    // Captions, placeholder text, disabled text
    textSecondary: "#F4F1DE",
    // Warning messages, caution states
    warning: "#F2CC8F",
    // Error messages, destructive actions
    error: "#E07A5F",
    // Success messages, confirmations
    success: "#81B29A",
    // Informational banners, tips
    info: "#F4F1DE",
    // Branding accents, special callouts
    purple: "#3D405B",
  },
};
