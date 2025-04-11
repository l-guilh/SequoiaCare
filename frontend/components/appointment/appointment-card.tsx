"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, Clock, MapPin, Video, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface AppointmentCardProps {
  appointment: {
    id: string
    expertId: string
    expertName: string
    expertImage?: string
    patientId?: string
    patientName?: string
    patientImage?: string
    date: Date
    time: string
    type: "inPerson" | "virtual"
    status: "scheduled" | "completed" | "cancelled"
  }
  viewType: "patient" | "expert"
}

export function AppointmentCard({ appointment, viewType }: AppointmentCardProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const isUpcoming = new Date(`${format(appointment.date, "yyyy-MM-dd")}T${appointment.time}`) > new Date()
  const canJoin =
    isUpcoming &&
    appointment.type === "virtual" &&
    new Date(`${format(appointment.date, "yyyy-MM-dd")}T${appointment.time}`) <= new Date(Date.now() + 15 * 60 * 1000) // 15 minutes before

  const handleJoinCall = () => {
    if (viewType === "patient") {
      router.push(`/patient/teleconsult/${appointment.id}`)
    } else {
      router.push(`/expert/teleconsult/${appointment.id}`)
    }
  }

  const handleViewDetails = () => {
    if (viewType === "patient") {
      router.push(`/patient/appointments/${appointment.id}`)
    } else {
      router.push(`/expert/appointments/${appointment.id}`)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-transparent hover:border-sequoia-green/20 transition-all shadow-sm hover:shadow-md">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10 border border-white shadow-sm">
              <AvatarImage
                src={viewType === "patient" ? appointment.expertImage : appointment.patientImage}
                alt={viewType === "patient" ? appointment.expertName : appointment.patientName}
              />
              <AvatarFallback>
                {(viewType === "patient" ? appointment.expertName : appointment.patientName || "").charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-base truncate">
                {viewType === "patient" ? appointment.expertName : appointment.patientName}
              </h4>
              <p className="text-sm text-muted-foreground">
                {appointment.type === "inPerson" ? "Consulta Presencial" : "Teleconsulta"}
              </p>
            </div>
            <Badge
              variant={
                appointment.status === "scheduled"
                  ? "outline"
                  : appointment.status === "completed"
                    ? "secondary"
                    : "destructive"
              }
              className="ml-auto"
            >
              {appointment.status === "scheduled"
                ? "Agendada"
                : appointment.status === "completed"
                  ? "Concluída"
                  : "Cancelada"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{format(appointment.date, "dd MMM yyyy", { locale: ptBR })}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex items-center text-sm col-span-2">
              {appointment.type === "inPerson" ? (
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              ) : (
                <Video className="h-4 w-4 mr-2 text-muted-foreground" />
              )}
              <span>{appointment.type === "inPerson" ? "Av. Paulista, 1000 - São Paulo" : "Consulta Online"}</span>
            </div>
          </div>

          <div className="mt-auto pt-3 border-t flex gap-2">
            {canJoin && (
              <Button
                variant="default"
                className="flex-1"
                leftIcon={<Video className="h-4 w-4" />}
                onClick={handleJoinCall}
              >
                Iniciar Consulta
              </Button>
            )}
            <Button
              variant={canJoin ? "outline" : "default"}
              className={canJoin ? "flex-1" : "w-full"}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={handleViewDetails}
            >
              {canJoin ? "Detalhes" : "Ver Detalhes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

