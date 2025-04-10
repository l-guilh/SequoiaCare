"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { format } from "date-fns"

export function UpcomingAppointments({ appointments }) {
  const [isScheduling, setIsScheduling] = useState(false)

  const handleNewAppointment = () => {
    setIsScheduling(true)
    // Implement appointment scheduling logic here
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas Consultas</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.resource.id}
                className="flex justify-between items-center"
                data-fhir-resource-id={appointment.resource.id}
              >
                <div>
                  <p className="font-medium text-gray-800">{appointment.resource.serviceType[0].text}</p>
                  <p className="text-sm text-gray-600">{appointment.resource.appointmentType.text}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">
                    {format(new Date(appointment.resource.start), "dd/MM/yyyy")}
                  </p>
                  <p className="text-sm text-gray-600">{format(new Date(appointment.resource.start), "HH:mm")}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <Button className="w-full mt-4" onClick={handleNewAppointment}>
          <PlusCircle className="mr-2 h-4 w-4" /> Agendar Nova Consulta
        </Button>
      </CardContent>
    </Card>
  )
}

