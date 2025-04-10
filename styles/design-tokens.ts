/**
 * SequoiaHealth Design Tokens
 *
 * This file defines the core design values used throughout the application,
 * with a focus on Apple-inspired Bezier curves for UI elements.
 */

export const borderRadius = {
  // Apple-inspired border radius values
  sm: "6px", // Small elements (buttons, inputs)
  md: "10px", // Medium elements (cards, panels)
  lg: "14px", // Large elements (modals, large cards)
  xl: "20px", // Extra large elements (full-page panels)
  "2xl": "28px", // Featured elements

  // Special values for specific components
  button: "8px",
  card: "12px",
  modal: "16px",
  panel: "14px",
  input: "8px",

  // Pill shape for tags, badges
  pill: "9999px",
}

// Apple-inspired shadow values
export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
}

// Apple-inspired transition values
export const transitions = {
  default: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  smooth: "all 0.3s cubic-bezier(0.42, 0, 0.58, 1)",
  bounce: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
}

