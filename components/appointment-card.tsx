"use client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, ClockIcon, VideoIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface AppointmentCardProps {
  appointment: {
    id: string
    patientName: string
    patientAvatar?: string
    expertName: string
    expertAvatar?: string
    expertSpecialty: string
    date: Date
    status: "scheduled" | "in-progress" | "completed" | "cancelled"
    isVideoCall: boolean
  }
  userType: "patient" | "expert"
  onJoin?: () => void
  onCancel?: () => void
  onReschedule?: () => void
}

export function AppointmentCard({ appointment, userType, onJoin, onCancel, onReschedule }: AppointmentCardProps) {
  const { patientName, patientAvatar, expertName, expertAvatar, expertSpecialty, date, status, isVideoCall } =
    appointment

  const formattedDate = format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  const formattedTime = format(date, "HH:mm", { locale: ptBR })

  const statusMap = {
    scheduled: {
      label: "Agendado",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
    "in-progress": {
      label: "Em andamento",
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    completed: {
      label: "Concluído",
      color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    },
    cancelled: {
      label: "Cancelado",
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    },
  }

  const canJoin = status === "scheduled" || status === "in-progress"
  const canCancel = status === "scheduled"
  const canReschedule = status === "scheduled"

  const otherPersonName = userType === "patient" ? expertName : patientName
  const otherPersonAvatar = userType === "patient" ? expertAvatar : patientAvatar

  return (
    <Card className="card-apple overflow-hidden border-0 shadow-apple-md hover:shadow-apple-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl font-medium">
              {userType === "patient" ? "Consulta com" : "Atendimento para"}
            </CardTitle>
            <CardDescription className="text-base font-semibold text-primary mt-1">{otherPersonName}</CardDescription>
            {userType === "patient" && (
              <CardDescription className="text-sm text-muted-foreground">{expertSpecialty}</CardDescription>
            )}
          </div>
          <Badge className={`${statusMap[status].color} rounded-full px-3 py-1 text-xs font-medium`}>
            {statusMap[status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <ClockIcon className="mr-2 h-4 w-4" />
            <span>{formattedTime}</span>
          </div>
          {isVideoCall && (
            <div className="flex items-center text-sm text-muted-foreground">
              <VideoIcon className="mr-2 h-4 w-4" />
              <span>Teleconsulta</span>
            </div>
          )}
        </div>
      </CardContent>
      <div className="px-6 py-3 bg-muted/30 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={otherPersonAvatar} alt={otherPersonName} />
            <AvatarFallback>
              {otherPersonName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{otherPersonName}</span>
        </div>
      </div>
      <CardFooter className="flex justify-end gap-2 pt-4">
        {canJoin && onJoin && (
          <Button onClick={onJoin} className="btn-apple bg-primary hover:bg-primary/90 text-white">
            <VideoIcon className="mr-2 h-4 w-4" />
            Entrar
          </Button>
        )}
        {canReschedule && onReschedule && (
          <Button variant="outline" onClick={onReschedule} className="btn-apple">
            Reagendar
          </Button>
        )}
        {canCancel && onCancel && (
          <Button
            variant="ghost"
            onClick={onCancel}
            className="btn-apple text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Cancelar
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

