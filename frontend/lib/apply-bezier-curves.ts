import { borderRadius, shadows, transitions } from "@/styles/design-tokens"

type ElementType = "button" | "card" | "input" | "panel" | "modal" | "custom"
type SizeType = "sm" | "md" | "lg" | "xl" | "2xl"

interface BezierCurveOptions {
  elementType?: ElementType
  size?: SizeType
  customRadius?: string
  withShadow?: boolean
  withTransition?: boolean
  withHoverEffect?: boolean
}

/**
 * Utility function to generate Apple-inspired Bezier curve styles
 * for any UI element
 */
export function applyBezierCurves({
  elementType = "custom",
  size = "md",
  customRadius,
  withShadow = false,
  withTransition = true,
  withHoverEffect = false,
}: BezierCurveOptions = {}) {
  // Get the appropriate border radius
  let radius = customRadius

  if (!radius) {
    if (elementType === "custom") {
      radius = borderRadius[size]
    } else {
      radius = borderRadius[elementType]
    }
  }

  // Build the style object
  const styles: Record<string, string> = {
    borderRadius: radius,
  }

  // Add shadow if requested
  if (withShadow) {
    styles.boxShadow = shadows.md
  }

  // Add transition if requested
  if (withTransition) {
    styles.transition = transitions.default
  }

  // Add hover effect if requested
  if (withHoverEffect && withShadow) {
    styles.cursor = "pointer"
    // We'll need to handle this with a class or inline styles in the component
  }

  return styles
}

/**
 * Generate Tailwind class names for Apple-inspired Bezier curves
 */
export function getBezierCurveClasses({
  elementType = "custom",
  size = "md",
  withShadow = false,
  withTransition = true,
  withHoverEffect = false,
}: Omit<BezierCurveOptions, "customRadius"> = {}) {
  const classes = []

  // Border radius
  if (elementType === "custom") {
    classes.push(`rounded-apple-${size}`)
  } else {
    classes.push(`rounded-[var(--radius-${elementType})]`)
  }

  // Shadow
  if (withShadow) {
    classes.push("shadow-apple-md")

    if (withHoverEffect) {
      classes.push("hover:shadow-apple-lg")
    }
  }

  // Transition
  if (withTransition) {
    classes.push("transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]")
  }

  return classes.join(" ")
}

