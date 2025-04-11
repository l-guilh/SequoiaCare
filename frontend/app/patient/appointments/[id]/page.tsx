"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, User, Phone, Video } from "lucide-react"

export default function AppointmentDetails() {
  const params = useParams()

  // Mock appointment data (in a real app, fetch based on params.id)
  const appointment = {
    id: params.id,
    type: "Consulta",
    specialist: "Dr. Silva - Cardiologista",
    date: "15 de Março, 2024",
    time: "14:30",
    location: "Clínica Cardio",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    phone: "(11) 3333-4444",
    hasTelemedicine: true,
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Detalhes da Consulta</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Consulta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-sequoia-green" />
              <div>
                <p className="font-medium">{appointment.specialist}</p>
                <p className="text-sm text-gray-600">{appointment.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sequoia-green" />
              <div>
                <p className="font-medium">{appointment.date}</p>
                <p className="text-sm text-gray-600">Data da Consulta</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-sequoia-green" />
              <div>
                <p className="font-medium">{appointment.time}</p>
                <p className="text-sm text-gray-600">Horário</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-sequoia-green" />
              <div>
                <p className="font-medium">{appointment.location}</p>
                <p className="text-sm text-gray-600">{appointment.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-sequoia-green" />
              <div>
                <p className="font-medium">{appointment.phone}</p>
                <p className="text-sm text-gray-600">Telefone para Contato</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointment.hasTelemedicine && (
              <Button className="w-full" variant="default">
                <Video className="mr-2 h-4 w-4" />
                Iniciar Teleconsulta
              </Button>
            )}

            <Button className="w-full" variant="outline">
              Reagendar Consulta
            </Button>

            <Button className="w-full" variant="outline">
              Cancelar Consulta
            </Button>

            <Button className="w-full" variant="outline">
              Ver Histórico de Consultas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

