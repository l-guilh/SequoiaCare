"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AppHeader } from "@/components/shared/app-header"

export default function ExpertLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1B4B] via-[#0F1437] to-[#1B1B4B]">
      <AppHeader />

      {/* Content Area */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 pt-12 px-6 bg-gradient-to-br from-[#1B1B4B] via-[#0F1437] to-[#1B1B4B]"
      >
        {children}
      </motion.main>

      {/* Mobile Search Overlay */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-72 bg-white/[0.03] border-white/[0.08] text-white/80 placeholder:text-white/30 focus:border-white/20 backdrop-blur-xl shadow-lg"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        </div>
      </div>
    </div>
  )
}

