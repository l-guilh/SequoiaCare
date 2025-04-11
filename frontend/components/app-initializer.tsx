"use client"

import { useEffect } from "react"
import { AdvancedHeaderConsolidator } from "./utils/advanced-header-consolidator"

export function AppInitializer() {
  useEffect(() => {
    // Any other app initialization logic can go here
    console.log("App initialized")
  }, [])

  return (
    <>
      {/* Add the header consolidator */}
      <AdvancedHeaderConsolidator
        initialDelay={800}
        observeDomChanges={true}
        debug={process.env.NODE_ENV === "development"}
      />

      {/* You can add other app-wide utilities here */}
    </>
  )
}

