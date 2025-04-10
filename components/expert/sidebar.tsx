"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Users, Calendar, FileText, MessageSquare, BarChart, Video, Brain, Settings } from "lucide-react"

const colors = {
  primary: "#2ecc71",
  secondary: "#a24f1b",
}

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
      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
        isActive ? `bg-${colors.primary} text-white` : `text-gray-600 hover:bg-${colors.primary}/10`
      }`}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span className="font-medium">{label}</span>
    </Link>
  )
}

export function Sidebar({ font }: { font: any }) {
  return (
    <aside className="w-64 bg-white p-4 shadow-md flex flex-col">
      <div className="flex items-center mb-8">
        <Image
          src="https://png.pngtree.com/png-clipart/20240909/original/pngtree-adult-giant-sequoia-tree-png-image_15970000.png"
          alt="Sequoia Health Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <h1 className="text-xl tracking-tighter">
          <span className="font-light">Sequoia</span>
          <span className="font-semibold">Health</span>
        </h1>
      </div>
      <nav className="space-y-2 flex-grow">
        <SidebarLink href="/physician" icon={Activity} label="Visão Geral" />
        <SidebarLink href="/physician/patients" icon={Users} label="Pacientes" />
        <SidebarLink href="/physician/appointments" icon={Calendar} label="Consultas" />
        <SidebarLink href="/physician/records" icon={FileText} label="Prontuários" />
        <SidebarLink href="/physician/messages" icon={MessageSquare} label="Mensagens" />
        <SidebarLink href="/physician/analytics" icon={BarChart} label="Análises" />
        <SidebarLink href="/physician/telemedicine" icon={Video} label="Telemedicina" />
        <SidebarLink href="/physician/clinical-support" icon={Brain} label="Suporte Clínico" />
        <SidebarLink href="/physician/settings" icon={Settings} label="Configurações" />
      </nav>
    </aside>
  )
}

