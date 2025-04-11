"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format, isToday, isAfter, isBefore } from "date-fns"
import { Video, Calendar, Search, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JoinTeleconsultCard } from "@/components/teleconsult/join-teleconsult-card"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface TeleconsultManagementProps {
  userType: "patient" | "expert"
  appointments: Array<{
    id: string
    date: Date
    time: string
    status: "scheduled" | "in-progress" | "completed" | "cancelled"
    patient?: {
      id: string
      name: string
      image?: string
    }
    expert?: {
      id: string
      name: string
      specialty?: string
      image?: string
    }
  }>
}

export function TeleconsultManagement({ userType, appointments }: TeleconsultManagementProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredAppointments, setFilteredAppointments] = useState(appointments)
  const [activeTab, setActiveTab] = useState("upcoming")

  // Filter appointments based on search query and active tab
  useEffect(() => {
    const now = new Date()

    const filtered = appointments.filter((appointment) => {
      const matchesSearch =
        searchQuery === "" ||
        (userType === "patient" && appointment.expert?.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (userType === "expert" && appointment.patient?.name.toLowerCase().includes(searchQuery.toLowerCase()))

      const appointmentDate = new Date(`${format(appointment.date, "yyyy-MM-dd")}T${appointment.time}`)

      if (activeTab === "upcoming") {
        return matchesSearch && appointment.status === "scheduled" && isAfter(appointmentDate, now)
      } else if (activeTab === "today") {
        return matchesSearch && isToday(appointment.date)
      } else if (activeTab === "past") {
        return (
          matchesSearch &&
          (appointment.status === "completed" || (appointment.status === "scheduled" && isBefore(appointmentDate, now)))
        )
      }

      return matchesSearch
    })

    setFilteredAppointments(filtered)
  }, [searchQuery, activeTab, appointments, userType])

  // Find appointments that can be joined now
  const joinableNow = appointments.filter((appointment) => {
    const appointmentDateTime = new Date(`${format(appointment.date, "yyyy-MM-dd")}T${appointment.time}`)
    const canJoinFrom = new Date(appointmentDateTime.getTime() - 15 * 60000) // 15 minutes before
    const canJoinUntil = new Date(appointmentDateTime.getTime() + 30 * 60000) // 30 minutes after
    const now = new Date()
    return (
      (appointment.status === "scheduled" || appointment.status === "in-progress") &&
      isAfter(now, canJoinFrom) &&
      isBefore(now, canJoinUntil)
    )
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-white"
            >
              Teleconsultas
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/60 mt-1"
            >
              {userType === "patient"
                ? "Gerencie suas consultas online com especialistas"
                : "Gerencie suas consultas online com pacientes"}
            </motion.p>
          </div>

          {userType === "patient" && (
            <Link href="/patient/appointments/schedule">
              <Button className="bg-sequoia-green hover:bg-sequoia-green/90">
                <Plus className="h-4 w-4 mr-2" />
                Agendar Nova Consulta
              </Button>
            </Link>
          )}
        </div>

        {/* Joinable Now Section */}
        {joinableNow.length > 0 && (
          <Card className="bg-gradient-to-r from-sequoia-green/20 to-sequoia-brown/20 border-sequoia-green/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <Video className="h-5 w-5 mr-2 text-sequoia-green" />
                Disponíveis Agora
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {joinableNow.map((appointment) => (
                  <JoinTeleconsultCard key={appointment.id} userType={userType} appointment={appointment} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              type="search"
              placeholder={`Buscar ${userType === "patient" ? "especialista" : "paciente"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-3 w-full sm:w-[400px]">
              <TabsTrigger value="upcoming">Próximas</TabsTrigger>
              <TabsTrigger value="today">Hoje</TabsTrigger>
              <TabsTrigger value="past">Anteriores</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Appointments List */}
        <TabsContent value={activeTab} className="mt-0">
          {filteredAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppointments.map((appointment) => (
                <JoinTeleconsultCard key={appointment.id} userType={userType} appointment={appointment} />
              ))}
            </div>
          ) : (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <Calendar className="h-12 w-12 text-white/20 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Nenhuma consulta encontrada</h3>
                <p className="text-white/60 max-w-md">
                  {activeTab === "upcoming"
                    ? "Você não tem consultas agendadas para os próximos dias."
                    : activeTab === "today"
                      ? "Você não tem consultas agendadas para hoje."
                      : "Você não tem consultas anteriores."}
                </p>

                {userType === "patient" && (
                  <Link href="/patient/appointments/schedule" className="mt-6">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Agendar Nova Consulta
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </motion.div>
    </div>
  )
}

