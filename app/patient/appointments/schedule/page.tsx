"use client"

import { AppointmentScheduler } from "@/components/appointment/appointment-scheduler"
import { useRouter } from "next/navigation"

export default function ScheduleAppointmentPage() {
  const router = useRouter()

  const handleAppointmentScheduled = (appointment: any) => {
    // In a real app, this would save the appointment to a database
    // For now, we'll just redirect to the dashboard
    setTimeout(() => {
      router.push("/patient/dashboard")
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <AppointmentScheduler onAppointmentScheduled={handleAppointmentScheduled} />
    </div>
  )
}

