"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  Users,
  VideoIcon,
  ChevronRight,
  TrendingUp,
  Activity,
  MessageSquare,
  Plus,
} from "lucide-react"
import { AppointmentCard } from "@/components/appointment/appointment-card"
import { JoinTeleconsultCard } from "@/components/teleconsult/join-teleconsult-card"
import { DirectJoin } from "@/components/teleconsult/direct-join"
import Link from "next/link"

// Mock data for appointments
const mockAppointments = [
  {
    id: "apt-001",
    expertId: "exp-001",
    expertName: "Dra. Ana Silva",
    expertImage: "/placeholder.svg?height=200&width=200",
    date: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    time: new Date(Date.now() + 2 * 60 * 60 * 1000).toTimeString().slice(0, 5),
    type: "virtual" as const,
    status: "scheduled" as const,
  },
  {
    id: "apt-002",
    expertId: "exp-002",
    expertName: "Dr. Carlos Santos",
    expertImage: "/placeholder.svg?height=200&width=200",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    time: "14:30",
    type: "inPerson" as const,
    status: "scheduled" as const,
  },
  {
    id: "apt-003",
    expertId: "exp-003",
    expertName: "Dra. Mariana Oliveira",
    expertImage: "/placeholder.svg?height=200&width=200",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    time: "10:00",
    type: "virtual" as const,
    status: "scheduled" as const,
  },
]

// Mock data for teleconsults
const mockTeleconsults = [
  {
    id: "tc-001",
    date: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    time: new Date(Date.now() + 1 * 60 * 60 * 1000).toTimeString().slice(0, 5),
    status: "scheduled" as const,
    expert: {
      id: "exp-001",
      name: "Dra. Ana Silva",
      specialty: "Cardiologia",
      image: "/placeholder.svg?height=200&width=200",
    },
  },
]

export default function PatientDashboard() {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Bom dia")
    else if (hour < 18) setGreeting("Boa tarde")
    else setGreeting("Boa noite")
  }, [])

  // Find teleconsults that can be joined now
  const joinableTeleconsults = mockTeleconsults.filter((teleconsult) => {
    const teleconsultDateTime = new Date(`${teleconsult.date.toISOString().split("T")[0]}T${teleconsult.time}`)
    const canJoinFrom = new Date(teleconsultDateTime.getTime() - 15 * 60000) // 15 minutes before
    const canJoinUntil = new Date(teleconsultDateTime.getTime() + 30 * 60000) // 30 minutes after
    const now = new Date()
    return (
      (teleconsult.status === "scheduled" || teleconsult.status === "in-progress") &&
      now >= canJoinFrom &&
      now <= canJoinUntil
    )
  })

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold text-white"
            >
              {greeting}, Maria
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mt-1"
            >
              Aqui está o resumo da sua saúde hoje
            </motion.p>
          </div>
          <div className="flex items-center gap-4">
            <DirectJoin userType="patient" />
            <Link href="/patient/appointments/schedule">
              <Button variant="default" className="bg-sequoia-green hover:bg-sequoia-green/90">
                <Plus className="h-4 w-4 mr-2" />
                Nova Consulta
              </Button>
            </Link>
          </div>
        </div>

        {/* Joinable Teleconsults Section */}
        {joinableTeleconsults.length > 0 && (
          <Card className="bg-gradient-to-r from-sequoia-green/20 to-sequoia-brown/20 border-sequoia-green/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <VideoIcon className="h-5 w-5 mr-2 text-sequoia-green" />
                Teleconsultas Disponíveis Agora
              </CardTitle>
              <Link href="/patient/teleconsult">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  Ver Todas
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {joinableTeleconsults.map((teleconsult) => (
                  <JoinTeleconsultCard key={teleconsult.id} userType="patient" appointment={teleconsult} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Próximas Consultas</p>
                  <p className="text-2xl font-bold text-white">{mockAppointments.length}</p>
                </div>
                <div className="p-2 bg-white/5 rounded-full">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Exames Pendentes</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
                <div className="p-2 bg-white/5 rounded-full">
                  <Activity className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Medicamentos</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="p-2 bg-white/5 rounded-full">
                  <Clock className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Índice de Saúde</p>
                  <p className="text-2xl font-bold text-white">92%</p>
                </div>
                <div className="p-2 bg-white/5 rounded-full">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold text-white">Próximas Consultas</CardTitle>
            <Link href="/patient/appointments">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                Ver Todas
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} viewType="patient" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2 bg-white/5 text-white border-white/10 hover:bg-white/10"
            asChild
          >
            <Link href="/patient/appointments/schedule">
              <Calendar className="h-6 w-6" />
              <span>Agendar Consulta</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2 bg-white/5 text-white border-white/10 hover:bg-white/10"
            asChild
          >
            <Link href="/patient/messages">
              <MessageSquare className="h-6 w-6" />
              <span>Mensagens</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2 bg-white/5 text-white border-white/10 hover:bg-white/10"
            asChild
          >
            <Link href="/provider-directory">
              <Users className="h-6 w-6" />
              <span>Diretório de Experts</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2 bg-white/5 text-white border-white/10 hover:bg-white/10"
            asChild
          >
            <Link href="/patient/teleconsult">
              <VideoIcon className="h-6 w-6" />
              <span>Teleconsultas</span>
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

