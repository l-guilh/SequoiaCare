"use client"

import { useState } from "react"
import { TeleconsultManagement } from "@/components/teleconsult/teleconsult-management"
import { DirectJoin } from "@/components/teleconsult/direct-join"
import { addDays, subDays } from "date-fns"

// Mock data for expert teleconsultations
const getMockAppointments = () => {
  const now = new Date()

  return [
    {
      id: "tc-001",
      date: now,
      time: new Date(now.setHours(now.getHours() + 1, 0, 0, 0)).toTimeString().slice(0, 5),
      status: "scheduled" as const,
      patient: {
        id: "pat-001",
        name: "Maria Silva",
        image: "/placeholder.svg?height=200&width=200",
      },
    },
    {
      id: "tc-002",
      date: addDays(new Date(), 2),
      time: "14:30",
      status: "scheduled" as const,
      patient: {
        id: "pat-002",
        name: "João Santos",
        image: "/placeholder.svg?height=200&width=200",
      },
    },
    {
      id: "tc-003",
      date: subDays(new Date(), 5),
      time: "10:00",
      status: "completed" as const,
      patient: {
        id: "pat-003",
        name: "Ana Oliveira",
        image: "/placeholder.svg?height=200&width=200",
      },
    },
    {
      id: "tc-004",
      date: now,
      time: new Date(now.setHours(now.getHours() + 2, 30, 0, 0)).toTimeString().slice(0, 5),
      status: "scheduled" as const,
      patient: {
        id: "pat-004",
        name: "Pedro Almeida",
        image: "/placeholder.svg?height=200&width=200",
      },
    },
  ]
}

export default function ExpertTeleconsultPage() {
  const [appointments, setAppointments] = useState(getMockAppointments())

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1B4B] via-[#0F1437] to-[#1B1B4B]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Teleconsultas</h1>
          <DirectJoin userType="expert" />
        </div>

        <TeleconsultManagement userType="expert" appointments={appointments} />
      </div>
    </div>
  )
}

