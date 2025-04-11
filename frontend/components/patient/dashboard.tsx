"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, FileText, ImageIcon, Users, MessageSquare, Settings, Bell, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const MenuItem = ({ icon: Icon, label, href, delay = 0 }) => (
  <Link href={href}>
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2 p-4"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-xl transition-all duration-500 group-hover:scale-110 opacity-0 group-hover:opacity-100" />
        <div className="relative h-20 w-20 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 group-hover:border-white/20">
          <Icon className="h-8 w-8 text-white/80 transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>
      <span className="text-sm font-medium text-white/80">{label}</span>
    </motion.div>
  </Link>
)

const NotificationBadge = ({ count }: { count: number }) => (
  <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 rounded-full text-xs font-medium text-white">
    {count}
  </div>
)

export function PatientDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Express%20Oct%2027%20Screenshot-6ZhBsRXUPcypJytUGb3uBpbFStD5pZ.png"
                alt="Sequoia Health"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-light text-white/90">
                  <span>Sequoia</span>
                  <span className="font-medium">Health</span>
                </h1>
                <p className="text-sm text-white/60">Portal do Paciente</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Pesquisar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-white/5 border-white/10 text-white/80 placeholder:text-white/40"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-white/80" />
                <NotificationBadge count={3} />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-white/80" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <MenuItem icon={Calendar} label="Agendar Consulta" href="/patient/appointments/schedule" delay={0.1} />
          <MenuItem icon={Users} label="Diretório de Especialistas" href="/provider-directory" delay={0.2} />
          <MenuItem icon={FileText} label="Resultados de Exames" href="/patient/exam-results" delay={0.3} />
          <MenuItem icon={ImageIcon} label="Exames de Imagem" href="/patient/exam-images" delay={0.4} />
          <MenuItem icon={MessageSquare} label="Mensagens" href="/patient/messages" delay={0.5} />
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 p-6 bg-white/5 border-white/10 backdrop-blur-lg">
          <h2 className="text-lg font-medium text-white/90 mb-4">Atividade Recente</h2>
          <div className="space-y-4">
            {[
              {
                title: "Consulta Agendada",
                description: "Dr. Silva - Cardiologista",
                date: "Amanhã às 14:30",
              },
              {
                title: "Novo Resultado de Exame",
                description: "Hemograma Completo",
                date: "Há 2 horas",
              },
              {
                title: "Nova Mensagem",
                description: "Dr. Santos enviou uma mensagem",
                date: "Há 1 hora",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <h3 className="text-white/90 font-medium">{activity.title}</h3>
                  <p className="text-sm text-white/60">{activity.description}</p>
                </div>
                <span className="text-sm text-white/40">{activity.date}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}

