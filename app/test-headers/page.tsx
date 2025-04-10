"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function TestHeadersPage() {
  const [showExtraHeader, setShowExtraHeader] = useState(false)

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Header Consolidation Test</h1>

      <div className="space-y-4 mb-8">
        <Button onClick={() => setShowExtraHeader(!showExtraHeader)}>
          {showExtraHeader ? "Hide" : "Show"} Extra Header
        </Button>

        <p className="text-gray-600">
          This page demonstrates the header consolidation feature. The main application header should be visible at the
          top of the page. Click the button above to add an extra header, which should be automatically hidden by the
          consolidation mechanism.
        </p>
      </div>

      {/* Extra header that should be removed by the consolidator */}
      {showExtraHeader && (
        <header className="fixed top-20 left-0 right-0 bg-white shadow-md p-4 z-40">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="https://png.pngtree.com/png-clipart/20240909/original/pngtree-adult-giant-sequoia-tree-png-image_15970000.png"
                alt="Sequoia Health Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-2xl">
                <span className="font-light">Sequoia</span>
                <span className="font-semibold">Health</span>
              </span>
            </div>
            <nav className="space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </nav>
          </div>
        </header>
      )}

      <div className="mt-20 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            The <code>AdvancedHeaderConsolidator</code> component scans the DOM for potential headers
          </li>
          <li>It identifies headers containing SequoiaHealth branding (logo or text)</li>
          <li>If multiple headers are found, only the topmost one is kept visible</li>
          <li>A MutationObserver watches for dynamically added headers</li>
          <li>The consolidation process runs on page load and when new headers are detected</li>
        </ol>
      </div>
    </div>
  )
}

