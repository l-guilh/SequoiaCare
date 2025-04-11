"use client"

import { useState } from "react"
import { FileText, Clipboard, Pill, MessageSquare, Mic, MicOff, Video, VideoOff, Phone, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface TeleconsultationInterfaceProps {
  patientName: string
  patientAvatar?: string
  expertName: string
  expertAvatar?: string
  expertSpecialty: string
  appointmentTime: string
  appointmentDate: string
  onEndCall: () => void
}

export function TeleconsultationInterface({
  patientName,
  patientAvatar,
  expertName,
  expertAvatar,
  expertSpecialty,
  appointmentTime,
  appointmentDate,
  onEndCall,
}: TeleconsultationInterfaceProps) {
  const [micEnabled, setMicEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={expertAvatar} alt={expertName} />
            <AvatarFallback>
              {expertName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-medium">{expertName}</h2>
            <p className="text-sm text-muted-foreground">{expertSpecialty}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800 rounded-full">Em andamento</Badge>
          <span className="text-sm text-muted-foreground">
            {appointmentDate} • {appointmentTime}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex-1 rounded-[var(--radius-panel)] bg-black relative overflow-hidden">
            {/* Main video (expert) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {videoEnabled ? (
                <video className="w-full h-full object-cover" autoPlay muted />
              ) : (
                <div className="flex flex-col items-center justify-center text-white">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarFallback className="text-4xl">
                      {expertName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xl">{expertName}</p>
                  <p className="text-sm opacity-70">Câmera desativada</p>
                </div>
              )}
            </div>

            {/* Self view (patient) */}
            <div className="absolute bottom-4 right-4 w-48 h-36 rounded-[var(--radius-card)] overflow-hidden border-2 border-white shadow-lg">
              <video className="w-full h-full object-cover" autoPlay muted />
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center mt-4 space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-white shadow-apple-md hover:bg-gray-100"
              onClick={() => setMicEnabled(!micEnabled)}
            >
              {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5 text-destructive" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-white shadow-apple-md hover:bg-gray-100"
              onClick={() => setVideoEnabled(!videoEnabled)}
            >
              {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-destructive" />}
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="rounded-full h-12 w-12 shadow-apple-md"
              onClick={onEndCall}
            >
              <Phone className="h-5 w-5 rotate-135" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-white shadow-apple-md hover:bg-gray-100"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l bg-card">
          <Tabs defaultValue="chat" className="h-full flex flex-col">
            <TabsList className="grid grid-cols-4 p-0 rounded-none border-b">
              <TabsTrigger
                value="chat"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              >
                <MessageSquare className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              >
                <FileText className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger
                value="records"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              >
                <Clipboard className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger
                value="prescription"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              >
                <Pill className="h-5 w-5" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-1 p-0 m-0 overflow-auto">
              <div className="p-4">
                <div className="space-y-4">
                  {/* Chat messages would go here */}
                  <div className="bg-muted p-3 rounded-[var(--radius-card)] max-w-[80%]">
                    <p className="text-sm">Olá, como posso ajudar hoje?</p>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      Dr. {expertName.split(" ")[0]} • 10:02
                    </span>
                  </div>

                  <div className="bg-primary/10 p-3 rounded-[var(--radius-card)] max-w-[80%] ml-auto">
                    <p className="text-sm">Estou com dores de cabeça frequentes nas últimas semanas.</p>
                    <span className="text-xs text-muted-foreground mt-1 block">Você • 10:03</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="flex-1 p-4 m-0 overflow-auto">
              <h3 className="text-lg font-medium mb-2">Anotações</h3>
              <textarea
                className="w-full h-[calc(100%-3rem)] p-3 rounded-[var(--radius-input)] border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Adicione suas anotações aqui..."
              />
            </TabsContent>
            <TabsContent value="records" className="flex-1 p-4 m-0 overflow-auto">
              <h3 className="text-lg font-medium mb-4">Prontuário</h3>
              <div className="space-y-4">
                <Card className="card-apple">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Histórico Médico</h4>
                    <p className="text-sm text-muted-foreground">
                      Paciente com histórico de enxaqueca desde 2018. Último episódio registrado em 15/03/2023.
                    </p>
                  </CardContent>
                </Card>
                <Card className="card-apple">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Alergias</h4>
                    <p className="text-sm text-muted-foreground">Dipirona, Penicilina</p>
                  </CardContent>
                </Card>
                <Card className="card-apple">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Medicamentos em uso</h4>
                    <p className="text-sm text-muted-foreground">Propranolol 40mg - 1x ao dia</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="prescription" className="flex-1 p-4 m-0 overflow-auto">
              <h3 className="text-lg font-medium mb-4">Prescrição</h3>
              <div className="space-y-4">
                <Card className="card-apple">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Sumatriptano</h4>
                      <Badge className="bg-blue-100 text-blue-800">Novo</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">50mg - Comprimido</p>
                    <p className="text-sm text-muted-foreground mb-1">
                      1 comprimido ao início dos sintomas de enxaqueca
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Máximo de 2 comprimidos por dia, com intervalo mínimo de 2 horas
                    </p>
                  </CardContent>
                </Card>
                <Button className="w-full btn-apple">Adicionar medicamento</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

