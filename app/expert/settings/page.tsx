"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select } from "@/components/ui/select"
import { ImagePlus, Trash2 } from "lucide-react"
import Image from "next/image"

// Mock initial provider data
const initialProviderData = {
  personal: {
    name: "Dr. João Silva",
    email: "joao.silva@sequoiahealth.com",
    phone: "(11) 98765-4321",
    crm: "123456",
    specialty: "Cardiologia",
    languages: ["Português", "Inglês", "Espanhol"],
  },
  public: {
    displayName: "Dr. João Silva",
    title: "Cardiologista",
    shortBio: "Especialista em Cardiologia com mais de 15 anos de experiência",
    longBio:
      "Formado pela USP com especialização em Cardiologia pelo InCor. Experiência em tratamento de doenças cardíacas complexas e medicina preventiva.",
    education: [
      {
        institution: "Universidade de São Paulo",
        degree: "Medicina",
        year: "2005",
      },
      {
        institution: "InCor",
        degree: "Especialização em Cardiologia",
        year: "2008",
      },
    ],
    expertise: ["Cardiologia Clínica", "Ecocardiografia", "Medicina Preventiva"],
    acceptingNewPatients: true,
    telemedicineEnabled: true,
    consultationTypes: ["Presencial", "Telemedicina"],
    locations: [
      {
        name: "Clínica Cardio Saúde",
        address: "Av. Paulista, 1000",
        city: "São Paulo",
        state: "SP",
        phone: "(11) 3333-4444",
      },
    ],
    availability: {
      monday: ["09:00-12:00", "14:00-18:00"],
      tuesday: ["09:00-12:00", "14:00-18:00"],
      wednesday: ["09:00-12:00"],
      thursday: ["14:00-18:00"],
      friday: ["09:00-12:00", "14:00-18:00"],
    },
    insurances: ["Unimed", "Bradesco Saúde", "SulAmérica"],
    profileImage: "/placeholder.svg?height=200&width=200",
    clinicImages: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  preferences: {
    notifications: {
      email: true,
      sms: true,
      app: true,
    },
    appointmentReminders: {
      timing: "24h",
      method: "email",
    },
    calendar: {
      defaultView: "week",
      workingHours: {
        start: "09:00",
        end: "18:00",
      },
    },
  },
}

export default function ProviderSettings() {
  const [providerData, setProviderData] = useState(initialProviderData)
  const [isEditing, setIsEditing] = useState(false)

  const handlePersonalInfoChange = (field: string, value: string) => {
    setProviderData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }))
  }

  const handlePublicInfoChange = (field: string, value: any) => {
    setProviderData((prev) => ({
      ...prev,
      public: {
        ...prev.public,
        [field]: value,
      },
    }))
  }

  const handlePreferencesChange = (category: string, field: string, value: any) => {
    setProviderData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: {
          ...prev.preferences[category as keyof typeof prev.preferences],
          [field]: value,
        },
      },
    }))
  }

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false)
    console.log("Saving provider data:", providerData)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Configurações</h2>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="public">Perfil Público</TabsTrigger>
          <TabsTrigger value="preferences">Preferências</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={providerData.personal.name}
                      onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={providerData.personal.email}
                      onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={providerData.personal.phone}
                      onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="crm">CRM</Label>
                    <Input
                      id="crm"
                      value={providerData.personal.crm}
                      onChange={(e) => handlePersonalInfoChange("crm", e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={handleSave}>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="public">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Perfil Público</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={providerData.public.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <ImagePlus className="w-4 h-4 mr-2" />
                          Alterar Foto
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="displayName">Nome de Exibição</Label>
                      <Input
                        id="displayName"
                        value={providerData.public.displayName}
                        onChange={(e) => handlePublicInfoChange("displayName", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={providerData.public.title}
                        onChange={(e) => handlePublicInfoChange("title", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shortBio">Biografia Curta</Label>
                      <Input
                        id="shortBio"
                        value={providerData.public.shortBio}
                        onChange={(e) => handlePublicInfoChange("shortBio", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="longBio">Biografia Detalhada</Label>
                      <Textarea
                        id="longBio"
                        value={providerData.public.longBio}
                        onChange={(e) => handlePublicInfoChange("longBio", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Disponibilidade</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="acceptingNewPatients">Aceitando Novos Pacientes</Label>
                        <Switch
                          id="acceptingNewPatients"
                          checked={providerData.public.acceptingNewPatients}
                          onCheckedChange={(checked) => handlePublicInfoChange("acceptingNewPatients", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="telemedicineEnabled">Atendimento por Telemedicina</Label>
                        <Switch
                          id="telemedicineEnabled"
                          checked={providerData.public.telemedicineEnabled}
                          onCheckedChange={(checked) => handlePublicInfoChange("telemedicineEnabled", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Imagens da Clínica</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {providerData.public.clinicImages.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Clinic ${index + 1}`}
                            width={200}
                            height={150}
                            className="rounded-lg"
                          />
                          <div className="absolute top-2 right-2 space-x-2">
                            <Button variant="outline" size="sm" className="bg-white">
                              <ImagePlus className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-white">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSave}>Salvar Alterações</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horários de Atendimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(providerData.public.availability).map(([day, hours]) => (
                    <div key={day} className="flex items-center gap-4">
                      <Label className="w-24 capitalize">{day}</Label>
                      <div className="flex-1 space-y-2">
                        {hours.map((timeSlot, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input value={timeSlot} className="w-32" />
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm">
                          Adicionar Horário
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button onClick={handleSave}>Salvar Horários</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferências do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Notificações</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNotifications">Notificações por Email</Label>
                      <Switch
                        id="emailNotifications"
                        checked={providerData.preferences.notifications.email}
                        onCheckedChange={(checked) => handlePreferencesChange("notifications", "email", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="smsNotifications">Notificações por SMS</Label>
                      <Switch
                        id="smsNotifications"
                        checked={providerData.preferences.notifications.sms}
                        onCheckedChange={(checked) => handlePreferencesChange("notifications", "sms", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="appNotifications">Notificações no Aplicativo</Label>
                      <Switch
                        id="appNotifications"
                        checked={providerData.preferences.notifications.app}
                        onCheckedChange={(checked) => handlePreferencesChange("notifications", "app", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Lembretes de Consulta</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reminderTiming">Antecedência do Lembrete</Label>
                      <Select
                        id="reminderTiming"
                        value={providerData.preferences.appointmentReminders.timing}
                        onValueChange={(value) => handlePreferencesChange("appointmentReminders", "timing", value)}
                      >
                        <option value="24h">24 horas antes</option>
                        <option value="12h">12 horas antes</option>
                        <option value="2h">2 horas antes</option>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reminderMethod">Método de Lembrete</Label>
                      <Select
                        id="reminderMethod"
                        value={providerData.preferences.appointmentReminders.method}
                        onValueChange={(value) => handlePreferencesChange("appointmentReminders", "method", value)}
                      >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="both">Ambos</option>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Configurações do Calendário</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="calendarView">Visualização Padrão</Label>
                      <Select
                        id="calendarView"
                        value={providerData.preferences.calendar.defaultView}
                        onValueChange={(value) => handlePreferencesChange("calendar", "defaultView", value)}
                      >
                        <option value="day">Dia</option>
                        <option value="week">Semana</option>
                        <option value="month">Mês</option>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Horário de Trabalho</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={providerData.preferences.calendar.workingHours.start}
                          onChange={(e) =>
                            handlePreferencesChange("calendar", "workingHours", {
                              ...providerData.preferences.calendar.workingHours,
                              start: e.target.value,
                            })
                          }
                        />
                        <span>até</span>
                        <Input
                          type="time"
                          value={providerData.preferences.calendar.workingHours.end}
                          onChange={(e) =>
                            handlePreferencesChange("calendar", "workingHours", {
                              ...providerData.preferences.calendar.workingHours,
                              end: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSave}>Salvar Preferências</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

