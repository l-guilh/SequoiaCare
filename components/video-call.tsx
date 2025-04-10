"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff } from "lucide-react"

export function VideoCall({ isPhysician = false }) {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  useEffect(() => {
    // This is where you would initialize the Zoom SDK
    // For now, we'll just use the browser's getUserMedia API as a placeholder
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => console.error("Error accessing media devices.", err))
    }
  }, [])

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setIsVideoOff(!isVideoOff)

  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="flex-grow p-0 relative">
        <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <Button onClick={toggleMute} variant="secondary">
            {isMuted ? <MicOff /> : <Mic />}
          </Button>
          <Button onClick={toggleVideo} variant="secondary">
            {isVideoOff ? <VideoOff /> : <Video />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

