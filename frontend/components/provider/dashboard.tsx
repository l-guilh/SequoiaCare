"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Users, FileText, Bell } from "lucide-react"

const colors = {
  lightGray: "rgb(195, 198, 199)",
  darkBlue: "rgb(27, 55, 100)",
  navy: "rgb(35, 38, 90)",
  red: "rgb(164, 14, 32)",
  orange: "rgb(229, 70, 39)",
  yellow: "rgb(253, 133, 30)",
  teal: "rgb(18, 75, 88)",
}

const Appointment = ({ patient, time, type }) => (
  <div className="mb-4 p-3 bg-white rounded-lg shadow">
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-gray-800">{patient}</span>
      <span className="text-sm text-gray-500">{time}</span>
    </div>
    <p className="text-gray-600">{type}</p>
  </div>
)

const PatientOverview = ({ name, lastVisit, nextAppointment }) => (
  <div className="mb-4 p-3 bg-white rounded-lg shadow">
    <h4 className="font-bold text-gray-800">{name}</h4>
    <p className="text-sm text-gray-600">Última visita: {lastVisit}</p>
    <p className="text-sm text-gray-600">Próxima consulta: {nextAppointment}</p>
  </div>
)

export function ProviderDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Olá, Dr. Silva</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Appointments */}
        <Card className="md:col-span-2" style={{ backgroundColor: colors.lightGray }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Consultas de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Appointment patient="João Oliveira" time="09:00" type="Check-up anual" />
              <Appointment patient="Maria Santos" time="10:30" type="Acompanhamento" />
              <Appointment patient="Carlos Ferreira" time="14:00" type="Primeira consulta" />
              <Appointment patient="Ana Rodrigues" time="15:30" type="Resultados de exames" />
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Patient Overview */}
        <Card style={{ backgroundColor: colors.darkBlue }}>
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Users className="mr-2" />
              Visão Geral dos Pacientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <PatientOverview name="João Oliveira" lastVisit="15/05/2023" nextAppointment="Hoje, 09:00" />
              <PatientOverview name="Maria Santos" lastVisit="22/04/2023" nextAppointment="Hoje, 10:30" />
              <PatientOverview name="Carlos Ferreira" lastVisit="N/A" nextAppointment="Hoje, 14:00" />
              <PatientOverview name="Ana Rodrigues" lastVisit="10/03/2023" nextAppointment="Hoje, 15:30" />
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card style={{ backgroundColor: colors.navy }}>
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <FileText className="mr-2" />
              Tarefas Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2 text-white">
                <li>Revisar resultados de exames - João Oliveira</li>
                <li>Atualizar prontuário - Maria Santos</li>
                <li>Preparar encaminhamento - Carlos Ferreira</li>
                <li>Assinar receitas - Ana Rodrigues</li>
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card style={{ backgroundColor: colors.red }}>
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Bell className="mr-2" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2 text-white">
                <li>Novo resultado de exame disponível - João Oliveira</li>
                <li>Solicitação de receita - Maria Santos</li>
                <li>Lembrete: Conferência médica amanhã às 14h</li>
                <li>Atualização do sistema prevista para esta noite</li>
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

