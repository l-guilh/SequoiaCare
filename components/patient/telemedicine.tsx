"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mic, MicOff, Video, VideoOff, Phone } from "lucide-react"

export function Telemedicine() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    if (isCallActive && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          videoRef.current.srcObject = stream
        })
        .catch((err) => console.error("Error accessing media devices.", err))
    }
  }, [isCallActive])

  const handleStartCall = () => {
    setIsCallActive(true)
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
    }
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setIsVideoOn(!isVideoOn)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Telemedicine Consultation</CardTitle>
      </CardHeader>
      <CardContent>
        {!isCallActive ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="doctorName">Doctor's Name</Label>
              <Input id="doctorName" placeholder="Dr. John Doe" />
            </div>
            <div>
              <Label htmlFor="appointmentTime">Appointment Time</Label>
              <Input id="appointmentTime" type="datetime-local" />
            </div>
            <Button onClick={handleStartCall} className="w-full">
              Start Consultation
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <video ref={videoRef} autoPlay muted={isMuted} className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-center space-x-4">
              <Button onClick={toggleMute} variant={isMuted ? "destructive" : "outline"}>
                {isMuted ? <MicOff /> : <Mic />}
              </Button>
              <Button onClick={toggleVideo} variant={isVideoOn ? "outline" : "destructive"}>
                {isVideoOn ? <Video /> : <VideoOff />}
              </Button>
              <Button onClick={handleEndCall} variant="destructive">
                <Phone className="rotate-135" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

