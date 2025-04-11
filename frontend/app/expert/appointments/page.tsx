"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus } from "lucide-react"

const appointmentData = [
  { id: 1, patient: "João Silva", date: "15/06/2023", time: "09:00", type: "Check-up", status: "Confirmado" },
  { id: 2, patient: "Maria Santos", date: "15/06/2023", time: "10:30", type: "Retorno", status: "Aguardando" },
  {
    id: 3,
    patient: "Carlos Oliveira",
    date: "15/06/2023",
    time: "11:45",
    type: "Primeira Consulta",
    status: "Confirmado",
  },
  { id: 4, patient: "Ana Rodrigues", date: "15/06/2023", time: "14:00", type: "Exames", status: "Confirmado" },
  { id: 5, patient: "Pedro Almeida", date: "15/06/2023", time: "15:30", type: "Retorno", status: "Aguardando" },
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAppointments = appointmentData.filter((appointment) =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Consultas</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar consulta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nova Consulta
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agenda de Consultas</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4">Paciente</th>
                  <th className="pb-4">Data</th>
                  <th className="pb-4">Hora</th>
                  <th className="pb-4">Tipo</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-t border-gray-200">
                    <td className="py-4">{appointment.patient}</td>
                    <td className="py-4">{appointment.date}</td>
                    <td className="py-4">{appointment.time}</td>
                    <td className="py-4">{appointment.type}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          appointment.status === "Confirmado"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

