"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { Mic, MicOff, Video, VideoOff, Phone, Settings, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"

// Mock appointment data
const getMockAppointment = (id: string) => ({
  id,
  expertId: "exp-001",
  expertName: "Dra. Ana Silva",
  expertImage: "/placeholder.svg?height=200&width=200",
  date: new Date(),
  time: new Date().toTimeString().slice(0, 5),
  type: "virtual" as const,
  status: "scheduled" as const,
})

export default function PatientVideoCall() {
  const params = useParams()
  const router = useRouter()
  const appointmentId = params.id as string
  const appointment = getMockAppointment(appointmentId)

  const [isJoined, setIsJoined] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isPreviewReady, setIsPreviewReady] = useState(false)
  const [lightingQuality, setLightingQuality] = useState<"good" | "poor">("poor")
  const [audioQuality, setAudioQuality] = useState<"good" | "poor">("poor")
  const [sharedTestResult, setSharedTestResult] = useState<{ name: string; value: string; unit: string } | null>(null)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // Initialize camera preview
  useEffect(() => {
    if (!isJoined && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream
            setIsPreviewReady(true)

            // Simulate analyzing video quality
            setTimeout(() => {
              setLightingQuality("good")
              setAudioQuality("good")
            }, 2000)
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
  }, [isJoined])

  // Simulate receiving a shared test result
  useEffect(() => {
    if (isJoined) {
      const timer = setTimeout(() => {
        setSharedTestResult({
          name: "Colesterol LDL",
          value: "118",
          unit: "mg/dL",
        })

        toast.info("Dr. Ana Silva compartilhou um resultado de exame com você")
      }, 15000)

      return () => clearTimeout(timer)
    }
  }, [isJoined])

  const handleJoinCall = () => {
    setIsJoined(true)

    // Simulate remote video
    if (remoteVideoRef.current) {
      // In a real implementation, this would be the Zoom SDK connection
      // For now, we'll just use a placeholder video
      remoteVideoRef.current.src =
        "https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-with-smartphone-40845-large.mp4"
      remoteVideoRef.current.loop = true
      remoteVideoRef.current.play()
    }
  }

  const handleEndCall = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }

    router.push("/patient/dashboard")
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setIsVideoOff(!isVideoOff)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1B4B] via-[#0F1437] to-[#1B1B4B] flex flex-col">
      <div className="flex-1 flex flex-col p-4 md:p-8">
        {!isJoined ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto w-full flex flex-col items-center justify-center h-full"
          >
            <Card className="w-full bg-white/10 backdrop-blur-md border-white/10">
              <CardContent className="p-6 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-medium text-white">Preparando sua consulta</h2>
                  <p className="text-gray-300">
                    Consulta com {appointment.expertName} às {appointment.time}
                  </p>
                </div>

                <div className="relative rounded-lg overflow-hidden aspect-video bg-black">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${isVideoOff ? "hidden" : ""}`}
                  />
                  {isVideoOff && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <p className="text-white">Câmera desativada</p>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                    {isPreviewReady && (
                      <>
                        <div
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                            lightingQuality === "good"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              lightingQuality === "good" ? "bg-green-400" : "bg-yellow-400"
                            }`}
                          />
                          {lightingQuality === "good" ? "Iluminação boa" : "Iluminação fraca"}
                        </div>

                        <div
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                            audioQuality === "good"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              audioQuality === "good" ? "bg-green-400" : "bg-yellow-400"
                            }`}
                          />
                          {audioQuality === "good" ? "Áudio bom" : "Áudio fraco"}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-center gap-3">
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
                          <Settings className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Configurações</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full bg-sequoia-green hover:bg-sequoia-green/90"
                    size="lg"
                    onClick={handleJoinCall}
                    disabled={!isPreviewReady}
                  >
                    Entrar na Consulta
                  </Button>
                </div>

                {isPreviewReady && (
                  <div className="text-sm text-gray-400 text-center space-y-2">
                    <p>Dicas para uma melhor experiência:</p>
                    <ul className="space-y-1">
                      <li>• Procure um ambiente bem iluminado</li>
                      <li>• Use fones de ouvido para melhor qualidade de áudio</li>
                      <li>• Mantenha-se em um local silencioso e privado</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="relative flex-1 flex flex-col">
            {/* Main video (expert) */}
            <div className="relative flex-1 rounded-lg overflow-hidden bg-black">
              <video ref={remoteVideoRef} className="w-full h-full object-cover" />

              {/* Patient video (small) */}
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

              {/* Shared test result */}
              <AnimatePresence>
                {sharedTestResult && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute top-4 right-4 p-4 rounded-lg bg-gradient-to-r from-sequoia-green/90 to-sequoia-brown/90 backdrop-blur-md text-white shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Resultado Compartilhado</h3>
                      <button onClick={() => setSharedTestResult(null)} className="text-white/70 hover:text-white">
                        ×
                      </button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/80">{sharedTestResult.name}</p>
                      <p className="text-2xl font-bold">
                        {sharedTestResult.value} <span className="text-sm font-normal">{sharedTestResult.unit}</span>
                      </p>
                      <p className="text-xs text-white/70">Valores de referência: 100-129 mg/dL</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
        )}
      </div>
    </div>
  )
}

