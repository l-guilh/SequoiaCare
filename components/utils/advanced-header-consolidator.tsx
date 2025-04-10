"use client"

import { useEffect, useRef } from "react"

interface HeaderConsolidatorProps {
  /**
   * Delay in milliseconds before running the initial consolidation
   * Useful to ensure the DOM is fully loaded
   */
  initialDelay?: number

  /**
   * Whether to observe DOM changes to handle dynamically added headers
   */
  observeDomChanges?: boolean

  /**
   * Custom selectors to identify potential headers
   */
  customSelectors?: string[]

  /**
   * Debug mode to log actions to console
   */
  debug?: boolean
}

export function AdvancedHeaderConsolidator({
  initialDelay = 500,
  observeDomChanges = true,
  customSelectors = [],
  debug = false,
}: HeaderConsolidatorProps = {}) {
  const observerRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    const log = (...args: any[]) => {
      if (debug) {
        console.log("[HeaderConsolidator]", ...args)
      }
    }

    // Define selectors that might contain headers
    const defaultSelectors = [
      "header",
      "nav",
      ".header",
      ".navbar",
      ".nav-container",
      ".app-header",
      '[role="banner"]',
      // Add specific selectors for SequoiaHealth app
      ".fixed.top-0",
      ".fixed.z-40",
      ".fixed.z-50",
    ]

    const headerSelectors = [...defaultSelectors, ...customSelectors]

    const isSequoiaHeader = (element: Element): boolean => {
      // Check for SequoiaHealth text
      const hasSequoiaText = element.textContent?.includes("Sequoia") && element.textContent?.includes("Health")

      // Check for logo (could be in an img src or as a background image)
      const images = element.querySelectorAll("img")
      const hasSequoiaLogo = Array.from(images).some(
        (img) =>
          img.src.includes("sequoia") ||
          img.src.includes("tree") ||
          img.alt.toLowerCase().includes("sequoia") ||
          img.alt.toLowerCase().includes("logo"),
      )

      // Check for specific class names or IDs that might indicate a header
      const hasHeaderClasses =
        element.classList.contains("app-header") ||
        element.classList.contains("main-header") ||
        element.id.includes("header")

      return hasSequoiaText || hasSequoiaLogo || hasHeaderClasses
    }

    const consolidateHeaders = () => {
      log("Running header consolidation")

      // Query all potential header elements
      const potentialHeaders = document.querySelectorAll(headerSelectors.join(", "))
      log(`Found ${potentialHeaders.length} potential headers`)

      // Filter to find headers containing SequoiaHealth branding
      const sequoiaHeaders = Array.from(potentialHeaders).filter(isSequoiaHeader)
      log(`Found ${sequoiaHeaders.length} SequoiaHealth headers`)

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
          log("Removing duplicate header:", header)
          header.style.display = "none"
          // Add a data attribute to mark it as a removed duplicate
          header.setAttribute("data-removed-duplicate", "true")
        })

        log("Kept topmost header:", topmostHeader)
      }
    }

    // Set up mutation observer to watch for DOM changes
    if (observeDomChanges) {
      observerRef.current = new MutationObserver((mutations) => {
        // Check if any mutations added potential headers
        const shouldReconsolidate = mutations.some((mutation) => {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            return Array.from(mutation.addedNodes).some((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element
                // Check if this element matches our header selectors
                return headerSelectors.some((selector) => element.matches(selector) || element.querySelector(selector))
              }
              return false
            })
          }
          return false
        })

        if (shouldReconsolidate) {
          log("DOM changes detected, reconsolidating headers")
          consolidateHeaders()
        }
      })

      // Start observing the document
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
      })

      log("Mutation observer started")
    }

    // Run the initial consolidation after a delay
    const timeoutId = setTimeout(consolidateHeaders, initialDelay)

    // Clean up
    return () => {
      clearTimeout(timeoutId)
      if (observerRef.current) {
        observerRef.current.disconnect()
        log("Mutation observer disconnected")
      }
    }
  }, [initialDelay, observeDomChanges, customSelectors, debug])

  // This component doesn't render anything
  return null
}

