"use client"

import { useEffect } from "react"

/**
 * HeaderConsolidator component
 *
 * This component identifies and removes duplicate headers in the DOM,
 * keeping only the topmost header that contains SequoiaHealth branding.
 */
export function HeaderConsolidator() {
  useEffect(() => {
    // Run the consolidation after the DOM is fully loaded
    const consolidateHeaders = () => {
      // Define selectors that might contain headers
      // This covers semantic headers, navigation bars, and common header class names
      const headerSelectors = [
        "header",
        "nav",
        ".header",
        ".navbar",
        ".nav-container",
        ".app-header",
        '[role="banner"]',
      ]

      // Query all potential header elements
      const potentialHeaders = document.querySelectorAll(headerSelectors.join(", "))

      // Filter to find headers containing SequoiaHealth branding
      const sequoiaHeaders = Array.from(potentialHeaders).filter((header) => {
        // Check for SequoiaHealth text
        const hasSequoiaText = header.textContent?.includes("Sequoia") && header.textContent?.includes("Health")

        // Check for logo (could be in an img src or as a background image)
        const images = header.querySelectorAll("img")
        const hasSequoiaLogo = Array.from(images).some(
          (img) =>
            img.src.includes("sequoia") ||
            img.alt.toLowerCase().includes("sequoia") ||
            img.alt.toLowerCase().includes("logo"),
        )

        return hasSequoiaText || hasSequoiaLogo
      })

      // If we found multiple headers, keep only the first one (topmost)
      if (sequoiaHeaders.length > 1) {
        // Sort by their vertical position to ensure we keep the topmost
        sequoiaHeaders.sort((a, b) => {
          const aRect = a.getBoundingClientRect()
          const bRect = b.getBoundingClientRect()
          return aRect.top - bRect.top
        })

        // Keep the first one, remove the rest
        const [topmostHeader, ...duplicateHeaders] = sequoiaHeaders

        // Remove duplicate headers
        duplicateHeaders.forEach((header) => {
          console.log("Removing duplicate SequoiaHealth header:", header)
          header.style.display = "none"
          // Add a data attribute to mark it as a removed duplicate
          header.setAttribute("data-removed-duplicate", "true")
        })

        console.log("Kept topmost SequoiaHealth header:", topmostHeader)
      }
    }

    // Run the consolidation
    consolidateHeaders()

    // Also run it after a short delay to catch any dynamically loaded headers
    const timeoutId = setTimeout(consolidateHeaders, 1000)

    // Clean up
    return () => clearTimeout(timeoutId)
  }, [])

  // This component doesn't render anything
  return null
}

