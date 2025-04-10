"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Calendar, MessageSquare, Settings, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

type SidebarLinkProps = {
  href: string
  icon: React.ElementType
  label: string
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`group flex items-center w-full p-3 rounded-xl transition-all duration-300 
                  ${isActive ? "bg-gradient-to-r from-white/80 to-white/60 shadow-lg" : "hover:bg-white/40"}`}
    >
      <div
        className={`flex items-center transition-all duration-300 ${
          isActive ? "text-sequoia-green" : "text-gray-600 group-hover:text-sequoia-green"
        }`}
      >
        <Icon
          className={`h-[18px] w-[18px] mr-3 transition-all duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
        />
        <span
          className={`font-medium text-sm ${isActive ? "text-sequoia-green" : "text-gray-600 group-hover:text-sequoia-green"}`}
        >
          {label}
        </span>
      </div>
    </Link>
  )
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed md:sticky top-0 left-0 z-40 h-screen w-[280px] bg-white/60 backdrop-blur-xl border-r border-white/20 md:translate-x-0 shadow-[8px_0px_30px_-12px_rgba(0,0,0,0.1)] overflow-hidden"
      >
        <div className="flex flex-col h-full p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center mb-8"
          >
            <div className="relative w-10 h-10 mr-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Express%20Oct%2027%20Screenshot-6ZhBsRXUPcypJytUGb3uBpbFStD5pZ.png"
                alt="Sequoia Health Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl tracking-tight">
              <span className="font-light">Sequoia</span>
              <span className="font-semibold">Health</span>
            </h1>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 space-y-1.5"
          >
            <SidebarLink href="/patient/dashboard" icon={Activity} label="Dashboard" />
            <SidebarLink href="/patient/appointments" icon={Calendar} label="Consultas" />
            <SidebarLink href="/patient/exams" icon={FileText} label="Exames" />
            <SidebarLink href="/patient/messages" icon={MessageSquare} label="Mensagens" />
            <SidebarLink href="/patient/settings" icon={Settings} label="Configurações" />
          </motion.nav>
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}

