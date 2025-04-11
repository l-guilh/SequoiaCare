"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Clock, MapPin, Video, ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Mock data - in a real app this would come from an API
const appointments = [
  {
    id: 1,
    doctor: "Dr. Silva",
    specialty: "Cardiologia",
    date: "2024-03-15",
    time: "14:30",
    type: "Check-up",
    location: "Clínica Central",
    isVirtual: false,
  },
  {
    id: 2,
    doctor: "Dra. Santos",
    specialty: "Endocrinologia",
    date: "2024-03-20",
    time: "10:00",
    type: "Retorno",
    location: "Centro Médico",
    isVirtual: true,
  },
  {
    id: 3,
    doctor: "Dr. Oliveira",
    specialty: "Neurologia",
    date: "2024-03-22",
    time: "15:30",
    type: "Primeira Consulta",
    location: "Hospital São Lucas",
    isVirtual: false,
  },
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-sequoia-sage to-white px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-sequoia-darkBlue"
          >
            Minhas Consultas
          </motion.h2>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Buscar consultas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 border-0 shadow-sm w-full md:w-[300px]"
              />
            </div>
            <Link href="/patient/appointments/schedule">
              <Button className="bg-sequoia-green hover:bg-sequoia-green/90 text-white shadow-sm">
                Nova Consulta
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <Card className="bg-white/50 backdrop-blur-lg border-none shadow-lg">
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {filteredAppointments.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Nenhuma consulta encontrada</p>
                    <Link href="/patient/appointments/schedule">
                      <Button variant="outline">Agendar Nova Consulta</Button>
                    </Link>
                  </motion.div>
                ) : (
                  filteredAppointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-sequoia-green/10">
                              {appointment.isVirtual ? (
                                <Video className="h-5 w-5 text-sequoia-green" />
                              ) : (
                                <MapPin className="h-5 w-5 text-sequoia-green" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-sequoia-darkBlue">{appointment.doctor}</h3>
                              <p className="text-gray-600">{appointment.specialty}</p>
                              <p className="text-sm text-gray-500">{appointment.location}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-2">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{new Date(appointment.date).toLocaleDateString("pt-BR")}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              Remarcar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

