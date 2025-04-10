"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Mic, MicOff, Video, VideoOff, Phone, MessageSquare, Share2, Clipboard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

// Mock patient data
const getMockPatient = (id: string) => ({
  id,
  name: "Maria Silva",
  age: 42,
  gender: "Feminino",
  medicalHistory: [
    { date: "2023-01-15", description: "Consulta de rotina. Paciente relata dores de cabeça ocasionais." },
    {
      date: "2022-10-03",
      description: "Exames de sangue realizados. Resultados normais, exceto colesterol LDL levemente elevado.",
    },
    {
      date: "2022-05-22",
      description: "Paciente relata dores nas articulações. Recomendado anti-inflamatório e acompanhamento.",
    },
  ],
  labResults: [
    {
      id: "lab-001",
      date: "2023-02-10",
      type: "Perfil Lipídico",
      results: [
        { name: "Colesterol Total", value: "198", unit: "mg/dL", reference: "< 200 mg/dL" },
        { name: "Colesterol HDL", value: "55", unit: "mg/dL", reference: "> 40 mg/dL" },
        { name: "Colesterol LDL", value: "118", unit: "mg/dL", reference: "< 130 mg/dL" },
        { name: "Triglicerídeos", value: "125", unit: "mg/dL", reference: "< 150 mg/dL" },
      ],
    },
    {
      id: "lab-002",
      date: "2023-02-10",
      type: "Hemograma",
      results: [
        { name: "Hemoglobina", value: "13.5", unit: "g/dL", reference: "12.0 - 15.5 g/dL" },
        { name: "Hematócrito", value: "40", unit: "%", reference: "36 - 46%" },
        { name: "Leucócitos", value: "7500", unit: "/mm³", reference: "4000 - 10000 /mm³" },
        { name: "Plaquetas", value: "250000", unit: "/mm³", reference: "150000 - 450000 /mm³" },
      ],
    },
  ],
  currentPrescription: {
    id: "presc-001",
    date: "2023-01-15",
    medications: [
      { name: "Atorvastatina", dosage: "10mg", instructions: "1 comprimido à noite", duration: "30 dias" },
      {
        name: "Paracetamol",
        dosage: "750mg",
        instructions: "1 comprimido a cada 8 horas se dor",
        duration: "Conforme necessário",
      },
    ],
  },
})

export default function ExpertVideoCall() {
  const params = useParams()
  const router = useRouter()
  const appointmentId = params.id as string
  const patient = getMockPatient(appointmentId)

  const [isJoined, setIsJoined] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [activeTab, setActiveTab] = useState<"notes" | "records" | "labs" | "prescription">("notes")
  const [notes, setNotes] = useState("")
  const [prescription, setPrescription] = useState("")
  const [sharedTestResult, setSharedTestResult] = useState<{ name: string; value: string; unit: string } | null>(null)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // Initialize camera preview
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream
          }
        })
        .catch((err) => {
          console.error("Error accessing media devices:", err)
          toast.error("Não foi possível acessar sua câmera ou microfone")
        })
    }

    // Cleanup
    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (isJoined && remoteVideoRef.current) {
      // In a real implementation, this would be the Zoom SDK connection
      // For now, we'll just use a placeholder video
      remoteVideoRef.current.src =
        "https://assets.mixkit.co/videos/preview/mixkit-woman-sitting-at-a-table-looking-at-her-phone-41719-large.mp4"
      remoteVideoRef.current.loop = true
      remoteVideoRef.current.play()
    }
  }, [isJoined])

  const handleJoinCall = () => {
    setIsJoined(true)
  }

  const handleEndCall = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }

    router.push("/expert/dashboard")
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setIsVideoOff(!isVideoOff)

  const handleShareTestResult = (result: { name: string; value: string; unit: string }) => {
    setSharedTestResult(result)
    toast.success(`Resultado de ${result.name} compartilhado com o paciente`)
  }

  const handleSaveNotes = () => {
    toast.success("Anotações salvas com sucesso")
  }

  const handleSavePrescription = () => {
    toast.success("Prescrição salva com sucesso")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1B4B] via-[#0F1437] to-[#1B1B4B] flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row p-4 md:p-6 gap-4">
        {/* Left side - Video */}
        <div className="md:w-2/3 flex flex-col">
          <div className="relative flex-1 rounded-lg overflow-hidden bg-black">
            {isJoined ? (
              <video ref={remoteVideoRef} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button className="bg-sequoia-green hover:bg-sequoia-green/90" size="lg" onClick={handleJoinCall}>
                  Iniciar Consulta
                </Button>
              </div>
            )}

            {/* Expert video (small) */}
            <div className="absolute bottom-4 right-4 w-48 h-36 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg bg-black">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${isVideoOff ? "hidden" : ""}`}
              />
              {isVideoOff && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <p className="text-white text-sm">Câmera desativada</p>
                </div>
              )}
            </div>

            {/* Patient info */}
            <div className="absolute top-4 left-4 p-3 rounded-lg bg-black/50 backdrop-blur-sm text-white">
              <h3 className="font-medium">{patient.name}</h3>
              <p className="text-sm text-white/70">
                {patient.age} anos, {patient.gender}
              </p>
            </div>
          </div>

          {/* Call controls */}
          <div className="mt-4 flex justify-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={toggleMute}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isMuted ? "Ativar microfone" : "Desativar microfone"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={toggleVideo}
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isVideoOff ? "Ativar câmera" : "Desativar câmera"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Chat</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive" size="icon" onClick={handleEndCall}>
                    <Phone className="h-5 w-5 rotate-135" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Encerrar consulta</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Right side - Medical records */}
        <div className="md:w-1/3 flex flex-col">
          <Card className="flex-1 bg-white/10 backdrop-blur-md border-white/10">
            <CardContent className="p-4 flex flex-col h-full">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="notes">Anotações</TabsTrigger>
                  <TabsTrigger value="records">Prontuário</TabsTrigger>
                  <TabsTrigger value="labs">Exames</TabsTrigger>
                  <TabsTrigger value="prescription">Prescrição</TabsTrigger>
                </TabsList>

                <TabsContent value="notes" className="flex-1 flex flex-col mt-4">
                  <Textarea
                    placeholder="Anotações da consulta..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="flex-1 resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                  <Button className="mt-4 bg-sequoia-green hover:bg-sequoia-green/90" onClick={handleSaveNotes}>
                    Salvar Anotações
                  </Button>
                </TabsContent>

                <TabsContent value="records" className="flex-1 mt-4 overflow-auto">
                  <div className="space-y-4 text-white">
                    <h3 className="font-medium">Histórico Médico</h3>
                    {patient.medicalHistory.map((record, index) => (
                      <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-sm text-white/70 mb-1">{record.date}</p>
                        <p>{record.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="labs" className="flex-1 mt-4 overflow-auto">
                  <div className="space-y-6 text-white">
                    {patient.labResults.map((lab) => (
                      <div key={lab.id} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{lab.type}</h3>
                          <p className="text-sm text-white/70">{lab.date}</p>
                        </div>
                        <div className="space-y-2">
                          {lab.results.map((result, index) => (
                            <div
                              key={index}
                              className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center"
                            >
                              <div>
                                <p className="font-medium">{result.name}</p>
                                <p className="text-sm text-white/70">
                                  {result.value} {result.unit} <span className="text-xs">({result.reference})</span>
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                onClick={() => handleShareTestResult(result)}
                              >
                                <Share2 className="h-4 w-4 mr-2" />
                                Compartilhar
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="prescription" className="flex-1 flex flex-col mt-4">
                  <div className="space-y-4 text-white mb-4">
                    <h3 className="font-medium">Prescrição Atual</h3>
                    {patient.currentPrescription.medications.map((med, index) => (
                      <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="font-medium">
                          {med.name} {med.dosage}
                        </p>
                        <p className="text-sm text-white/70">{med.instructions}</p>
                        <p className="text-sm text-white/70">Duração: {med.duration}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-2">Nova Prescrição</h3>
                    <Textarea
                      placeholder="Digite a nova prescrição..."
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      className="h-40 resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                      leftIcon={<Clipboard className="h-4 w-4" />}
                      onClick={() => {
                        setPrescription(
                          patient.currentPrescription.medications
                            .map((med) => `${med.name} ${med.dosage} - ${med.instructions} - ${med.duration}`)
                            .join("\n"),
                        )
                      }}
                    >
                      Copiar Atual
                    </Button>
                    <Button
                      className="flex-1 bg-sequoia-green hover:bg-sequoia-green/90"
                      leftIcon={<Check className="h-4 w-4" />}
                      onClick={handleSavePrescription}
                    >
                      Salvar Prescrição
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

