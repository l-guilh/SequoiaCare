"use client"

import { useState } from "react"
import { format, isToday, isTomorrow, isAfter, isBefore } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Video, Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface JoinTeleconsultCardProps {
  userType: "patient" | "expert"
  appointment: {
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
  }
}

export function JoinTeleconsultCard({ userType, appointment }: JoinTeleconsultCardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const person = userType === "patient" ? appointment.expert : appointment.patient

  // Format date for display
  const formatDate = (date: Date) => {
    if (isToday(date)) return "Hoje"
    if (isTomorrow(date)) return "Amanhã"
    return format(date, "dd 'de' MMMM", { locale: ptBR })
  }

  // Check if the appointment can be joined now
  const canJoinNow = () => {
    const appointmentDateTime = new Date(`${format(appointment.date, "yyyy-MM-dd")}T${appointment.time}`)
    const canJoinFrom = new Date(appointmentDateTime.getTime() - 15 * 60000) // 15 minutes before
    const canJoinUntil = new Date(appointmentDateTime.getTime() + 30 * 60000) // 30 minutes after
    const now = new Date()
    return (
      (appointment.status === "scheduled" || appointment.status === "in-progress") &&
      isAfter(now, canJoinFrom) &&
      isBefore(now, canJoinUntil)
    )
  }

  const handleJoin = async () => {
    setIsLoading(true)

    try {
      // In a real implementation, we would make an API call to join the teleconsult
      // For now, we'll just simulate a delay and redirect
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to the appropriate teleconsult page
      if (userType === "patient") {
        router.push(`/patient/teleconsult/${appointment.id}`)
      } else {
        router.push(`/expert/teleconsult/${appointment.id}`)
      }
    } catch (error) {
      toast.error("Não foi possível entrar na consulta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card
      className={`overflow-hidden border ${canJoinNow() ? "border-sequoia-green/30 bg-white/5" : "border-white/10 bg-white/5"}`}
    >
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10 border border-white/10">
              <AvatarImage src={person?.image} alt={person?.name} />
              <AvatarFallback className="bg-white/10 text-white">{person?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-white">{person?.name}</h3>
              {userType === "patient" && appointment.expert?.specialty && (
                <p className="text-sm text-white/60">{appointment.expert.specialty}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Clock className="h-4 w-4" />
              <span>{appointment.time}</span>
            </div>
          </div>

          {canJoinNow() ? (
            <Button
              className="w-full bg-sequoia-green hover:bg-sequoia-green/90"
              onClick={handleJoin}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Entrar Agora
                </span>
              )}
            </Button>
          ) : (
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-white/60 border-white/20">
                {isAfter(new Date(`${format(appointment.date, "yyyy-MM-dd")}T${appointment.time}`), new Date())
                  ? "Agendada"
                  : "Concluída"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => {
                  if (userType === "patient") {
                    router.push(`/patient/teleconsult`)
                  } else {
                    router.push(`/expert/teleconsult`)
                  }
                }}
              >
                Detalhes
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

