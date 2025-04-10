"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, FileText, Lock, UserCircle } from "lucide-react"

interface Patient {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  time: string
  unread: number
}

const patients: Patient[] = [
  {
    id: "1",
    name: "Maria Silva",
    lastMessage: "Obrigada, doutor!",
    time: "10:30",
    unread: 2,
  },
  {
    id: "2",
    name: "João Santos",
    lastMessage: "Sim, vou enviar os exames",
    time: "09:15",
    unread: 0,
  },
  // Add more mock data as needed
]

export default function MessagesPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = () => {
    if (!message.trim()) return
    // Handle message sending logic here
    setMessage("")
  }

  const handleRequestRecords = () => {
    // Handle medical records request logic here
  }

  return (
    <div className="h-[calc(100vh-3rem)] flex gap-6">
      {/* Patient List */}
      <Card className="w-80 flex flex-col bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <div className="relative">
            <Input
              type="search"
              placeholder="Buscar pacientes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {patients.map((patient) => (
              <motion.button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-colors ${
                  selectedPatient?.id === patient.id ? "bg-white/10" : ""
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={patient.avatar} />
                  <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-white font-medium">{patient.name}</p>
                  <p className="text-sm text-white/70 truncate">{patient.lastMessage}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-white/50">{patient.time}</span>
                  {patient.unread > 0 && (
                    <span className="mt-1 h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                      {patient.unread}
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col bg-white/10 backdrop-blur-xl border-white/20">
        {selectedPatient ? (
          <>
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedPatient.avatar} />
                    <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white">{selectedPatient.name}</CardTitle>
                    <p className="text-sm text-white/70">Online</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                    onClick={handleRequestRecords}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Solicitar Prontuário
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                    <UserCircle className="h-5 w-5 mr-2" />
                    Perfil
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                {/* Chat messages would go here */}
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <span className="text-sm text-white/50">Hoje</span>
                  </div>
                  {/* Example messages */}
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-md">
                      <p>Olá! Como está se sentindo hoje?</p>
                      <span className="text-xs text-white/70 mt-1">10:30</span>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-md">
                      <p>Estou me sentindo melhor, doutor. Os medicamentos estão fazendo efeito.</p>
                      <span className="text-xs text-white/70 mt-1">10:32</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-white/50">
            <Lock className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">Selecione um paciente para iniciar uma conversa</p>
            <p className="text-sm">As mensagens são criptografadas e seguras</p>
          </div>
        )}
      </Card>
    </div>
  )
}

