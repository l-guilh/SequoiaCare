"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Bell, Globe, Shield, User } from "lucide-react"
import Image from "next/image"

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200")
  const [settings, setSettings] = useState({
    profile: {
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "(11) 98765-4321",
      birthDate: "1990-05-15",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      emergencyContact: "João Silva - (11) 99999-9999",
    },
    notifications: {
      email: true,
      sms: false,
      push: true,
      appointments: true,
      labResults: true,
      medications: true,
    },
    preferences: {
      language: "pt-BR",
      darkMode: false,
      timezone: "America/Sao_Paulo",
    },
    privacy: {
      shareData: false,
      anonymousData: true,
      marketing: false,
    },
  })

  const handleSettingChange = (category: string, setting: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sequoia-sage to-white px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-sequoia-darkBlue"
        >
          Configurações
        </motion.h2>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white/50 p-1">
            <TabsTrigger value="profile" className="data-[state=active]:bg-white">
              <User className="h-4 w-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-white">
              <Globe className="h-4 w-4 mr-2" />
              Preferências
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-white">
              <Shield className="h-4 w-4 mr-2" />
              Privacidade
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-white/50 backdrop-blur-lg border-none shadow-lg">
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Image
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        width={120}
                        height={120}
                        className="rounded-full"
                      />
                      <button className="absolute bottom-0 right-0 p-2 bg-sequoia-green text-white rounded-full shadow-lg">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={settings.profile.name}
                        onChange={(e) => handleSettingChange("profile", "name", e.target.value)}
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => handleSettingChange("profile", "email", e.target.value)}
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={settings.profile.phone}
                        onChange={(e) => handleSettingChange("profile", "phone", e.target.value)}
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Data de Nascimento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={settings.profile.birthDate}
                        onChange={(e) => handleSettingChange("profile", "birthDate", e.target.value)}
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        value={settings.profile.address}
                        onChange={(e) => handleSettingChange("profile", "address", e.target.value)}
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={settings.profile.city}
                        onChange={(e) => handleSettingChange("profile", "city", e.target.value)}
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        value={settings.profile.state}
                        onChange={(e) => handleSettingChange("profile", "state", e.target.value)}
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                      <Input
                        id="emergencyContact"
                        value={settings.profile.emergencyContact}
                        onChange={(e) => handleSettingChange("profile", "emergencyContact", e.target.value)}
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-sequoia-green hover:bg-sequoia-green/90 text-white">Salvar Alterações</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-white/50 backdrop-blur-lg border-none shadow-lg">
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Canais de Notificação</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailNotifications">Notificações por Email</Label>
                        <Switch
                          id="emailNotifications"
                          checked={settings.notifications.email}
                          onCheckedChange={(checked) => handleSettingChange("notifications", "email", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="smsNotifications">Notificações por SMS</Label>
                        <Switch
                          id="smsNotifications"
                          checked={settings.notifications.sms}
                          onCheckedChange={(checked) => handleSettingChange("notifications", "sms", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="pushNotifications">Notificações Push</Label>
                        <Switch
                          id="pushNotifications"
                          checked={settings.notifications.push}
                          onCheckedChange={(checked) => handleSettingChange("notifications", "push", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tipos de Notificação</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="appointmentNotifications">Lembretes de Consulta</Label>
                        <Switch
                          id="appointmentNotifications"
                          checked={settings.notifications.appointments}
                          onCheckedChange={(checked) => handleSettingChange("notifications", "appointments", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="labResultNotifications">Resultados de Exames</Label>
                        <Switch
                          id="labResultNotifications"
                          checked={settings.notifications.labResults}
                          onCheckedChange={(checked) => handleSettingChange("notifications", "labResults", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="medicationNotifications">Lembretes de Medicação</Label>
                        <Switch
                          id="medicationNotifications"
                          checked={settings.notifications.medications}
                          onCheckedChange={(checked) => handleSettingChange("notifications", "medications", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-sequoia-green hover:bg-sequoia-green/90 text-white">
                      Salvar Preferências
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="bg-white/50 backdrop-blur-lg border-none shadow-lg">
              <CardHeader>
                <CardTitle>Preferências do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <select
                          id="language"
                          value={settings.preferences.language}
                          onChange={(e) => handleSettingChange("preferences", "language", e.target.value)}
                          className="w-full p-2 rounded-md border border-gray-200 bg-white"
                        >
                          <option value="pt-BR">Português (Brasil)</option>
                          <option value="en-US">English (US)</option>
                          <option value="es-ES">Español</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Fuso Horário</Label>
                        <select
                          id="timezone"
                          value={settings.preferences.timezone}
                          onChange={(e) => handleSettingChange("preferences", "timezone", e.target.value)}
                          className="w-full p-2 rounded-md border border-gray-200 bg-white"
                        >
                          <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                          <option value="America/New_York">New York (GMT-4)</option>
                          <option value="Europe/London">London (GMT+1)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="darkMode">Modo Escuro</Label>
                        <p className="text-sm text-gray-500">Ativar tema escuro para melhor visualização noturna</p>
                      </div>
                      <Switch
                        id="darkMode"
                        checked={settings.preferences.darkMode}
                        onCheckedChange={(checked) => handleSettingChange("preferences", "darkMode", checked)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-sequoia-green hover:bg-sequoia-green/90 text-white">
                      Salvar Preferências
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="bg-white/50 backdrop-blur-lg border-none shadow-lg">
              <CardHeader>
                <CardTitle>Configurações de Privacidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="shareData">Compartilhamento de Dados</Label>
                        <p className="text-sm text-gray-500">
                          Permitir compartilhamento de dados com profissionais de saúde
                        </p>
                      </div>
                      <Switch
                        id="shareData"
                        checked={settings.privacy.shareData}
                        onCheckedChange={(checked) => handleSettingChange("privacy", "shareData", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="anonymousData">Dados Anônimos</Label>
                        <p className="text-sm text-gray-500">Contribuir com dados anônimos para pesquisa médica</p>
                      </div>
                      <Switch
                        id="anonymousData"
                        checked={settings.privacy.anonymousData}
                        onCheckedChange={(checked) => handleSettingChange("privacy", "anonymousData", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing">Comunicações de Marketing</Label>
                        <p className="text-sm text-gray-500">Receber informações sobre novos serviços e recursos</p>
                      </div>
                      <Switch
                        id="marketing"
                        checked={settings.privacy.marketing}
                        onCheckedChange={(checked) => handleSettingChange("privacy", "marketing", checked)}
                      />
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                    <p>
                      Seus dados são protegidos de acordo com a Lei Geral de Proteção de Dados (LGPD). Para mais
                      informações, consulte nossa política de privacidade.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-sequoia-green hover:bg-sequoia-green/90 text-white">
                      Salvar Configurações
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

