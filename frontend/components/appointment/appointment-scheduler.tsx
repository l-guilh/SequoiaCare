"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, addDays, isSameDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Clock, MapPin, Video, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// Types
interface Expert {
  id: string
  name: string
  specialty: string
  image: string
  rating: number
  reviewCount: number
  availableDates: {
    date: Date
    inPerson: string[]
    virtual: string[]
  }[]
}

interface AppointmentSchedulerProps {
  onAppointmentScheduled: (appointment: {
    expertId: string
    expertName: string
    date: Date
    time: string
    type: "inPerson" | "virtual"
  }) => void
}

// Mock data for experts
const experts: Expert[] = [
  {
    id: "exp-001",
    name: "Dra. Ana Silva",
    specialty: "Cardiologia",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviewCount: 127,
    availableDates: Array.from({ length: 14 }, (_, i) => ({
      date: addDays(new Date(), i),
      inPerson: i % 2 === 0 ? ["09:00", "10:00", "11:00", "14:00", "15:00"] : ["10:00", "11:00", "14:00"],
      virtual:
        i % 2 === 0 ? ["09:30", "10:30", "11:30", "14:30", "15:30", "16:30"] : ["09:30", "10:30", "15:30", "16:30"],
    })),
  },
  {
    id: "exp-002",
    name: "Dr. Carlos Santos",
    specialty: "Dermatologia",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviewCount: 98,
    availableDates: Array.from({ length: 14 }, (_, i) => ({
      date: addDays(new Date(), i),
      inPerson: i % 2 === 0 ? ["10:00", "11:00", "14:00", "15:00"] : ["09:00", "10:00", "14:00"],
      virtual: i % 2 === 0 ? ["09:30", "10:30", "14:30", "15:30"] : ["10:30", "11:30", "15:30", "16:30"],
    })),
  },
  {
    id: "exp-003",
    name: "Dra. Mariana Oliveira",
    specialty: "Pediatria",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviewCount: 156,
    availableDates: Array.from({ length: 14 }, (_, i) => ({
      date: addDays(new Date(), i),
      inPerson: i % 2 === 0 ? ["09:00", "10:00", "11:00", "15:00"] : ["09:00", "11:00", "14:00"],
      virtual: i % 2 === 0 ? ["09:30", "10:30", "11:30", "14:30", "16:30"] : ["09:30", "11:30", "15:30", "16:30"],
    })),
  },
]

export function AppointmentScheduler({ onAppointmentScheduled }: AppointmentSchedulerProps) {
  const [step, setStep] = useState<"expert" | "date" | "time" | "confirm">("expert")
  const [appointmentType, setAppointmentType] = useState<"inPerson" | "virtual">("virtual")
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  // Reset selections when changing appointment type
  useEffect(() => {
    setSelectedTime(null)
    if (selectedDate && selectedExpert) {
      updateAvailableTimes(selectedDate, selectedExpert)
    }
  }, [appointmentType, selectedDate, selectedExpert])

  // Update available times when date or expert changes
  useEffect(() => {
    if (selectedDate && selectedExpert) {
      updateAvailableTimes(selectedDate, selectedExpert)
    }
  }, [selectedDate, selectedExpert])

  const updateAvailableTimes = (date: Date, expert: Expert) => {
    const availableDate = expert.availableDates.find((d) => isSameDay(d.date, date))
    if (availableDate) {
      setAvailableTimes(appointmentType === "inPerson" ? availableDate.inPerson : availableDate.virtual)
    } else {
      setAvailableTimes([])
    }
  }

  const handleExpertSelect = (expert: Expert) => {
    setSelectedExpert(expert)
    setStep("date")
  }

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date)
    if (date) {
      setStep("time")
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep("confirm")
  }

  const handleConfirm = () => {
    if (selectedExpert && selectedDate && selectedTime) {
      onAppointmentScheduled({
        expertId: selectedExpert.id,
        expertName: selectedExpert.name,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
      })

      toast.success("Consulta agendada com sucesso!", {
        description: `${format(selectedDate, "dd 'de' MMMM", { locale: ptBR })} às ${selectedTime}`,
      })
    }
  }

  const handleBack = () => {
    if (step === "date") setStep("expert")
    else if (step === "time") setStep("date")
    else if (step === "confirm") setStep("time")
  }

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden border-none shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-sequoia-green/10 to-sequoia-brown/10 border-b">
        <CardTitle className="text-2xl font-medium">Agendar Consulta</CardTitle>
        <CardDescription>Escolha um especialista, data e horário para sua consulta</CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs
          value={appointmentType}
          onValueChange={(v) => setAppointmentType(v as "inPerson" | "virtual")}
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inPerson" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Presencial
            </TabsTrigger>
            <TabsTrigger value="virtual" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Telemedicina
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {step === "expert" && (
              <motion.div
                key="expert-selection"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium">Selecione um especialista</h3>
                <div className="grid gap-4">
                  {experts.map((expert) => (
                    <motion.div
                      key={expert.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="cursor-pointer"
                      onClick={() => handleExpertSelect(expert)}
                    >
                      <Card className="overflow-hidden border-transparent hover:border-sequoia-green/20 transition-all">
                        <CardContent className="p-4 flex items-center gap-4">
                          <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                            <AvatarImage src={expert.image} alt={expert.name} />
                            <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium text-lg">{expert.name}</h4>
                            <p className="text-muted-foreground">{expert.specialty}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                ★ {expert.rating}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{expert.reviewCount} avaliações</span>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "date" && selectedExpert && (
              <motion.div
                key="date-selection"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Button variant="outline" size="sm" onClick={handleBack}>
                    Voltar
                  </Button>
                  <h3 className="text-lg font-medium">Selecione uma data para consulta com {selectedExpert.name}</h3>
                </div>

                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => {
                      // Disable dates that don't have availability for the selected type
                      const availableDate = selectedExpert.availableDates.find((d) => isSameDay(d.date, date))
                      if (!availableDate) return true
                      return appointmentType === "inPerson"
                        ? availableDate.inPerson.length === 0
                        : availableDate.virtual.length === 0
                    }}
                    fromDate={new Date()}
                    toDate={addDays(new Date(), 30)}
                    className="rounded-md border shadow-sm"
                  />
                </div>
              </motion.div>
            )}

            {step === "time" && selectedExpert && selectedDate && (
              <motion.div
                key="time-selection"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Button variant="outline" size="sm" onClick={handleBack}>
                    Voltar
                  </Button>
                  <h3 className="text-lg font-medium">
                    Selecione um horário para {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                  </h3>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {availableTimes.length > 0 ? (
                    availableTimes.map((time) => (
                      <motion.div key={time} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full border-2",
                            selectedTime === time && "border-sequoia-green bg-sequoia-green/10",
                          )}
                          onClick={() => handleTimeSelect(time)}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {time}
                        </Button>
                      </motion.div>
                    ))
                  ) : (
                    <p className="col-span-full text-center text-muted-foreground py-4">
                      Não há horários disponíveis para esta data.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {step === "confirm" && selectedExpert && selectedDate && selectedTime && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Button variant="outline" size="sm" onClick={handleBack}>
                    Voltar
                  </Button>
                  <h3 className="text-lg font-medium">Confirmar agendamento</h3>
                </div>

                <Card className="bg-gray-50 border-none">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                        <AvatarImage src={selectedExpert.image} alt={selectedExpert.name} />
                        <AvatarFallback>{selectedExpert.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-lg">{selectedExpert.name}</h4>
                        <p className="text-muted-foreground">{selectedExpert.specialty}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Data</p>
                        <p className="font-medium flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-sequoia-green" />
                          {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Horário</p>
                        <p className="font-medium flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-sequoia-green" />
                          {selectedTime}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Tipo de Consulta</p>
                        <p className="font-medium flex items-center">
                          {appointmentType === "inPerson" ? (
                            <>
                              <MapPin className="h-4 w-4 mr-2 text-sequoia-green" />
                              Presencial
                            </>
                          ) : (
                            <>
                              <Video className="h-4 w-4 mr-2 text-sequoia-green" />
                              Telemedicina
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="pt-4">
                  <Button className="w-full" size="lg" onClick={handleConfirm} leftIcon={<Check className="h-4 w-4" />}>
                    Confirmar Agendamento
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

