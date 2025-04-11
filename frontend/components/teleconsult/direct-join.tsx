"use client"

import type React from "react"

import { useState } from "react"
import { Video, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface DirectJoinProps {
  userType: "patient" | "expert"
  trigger?: React.ReactNode
  className?: string
}

export function DirectJoin({ userType, trigger, className }: DirectJoinProps) {
  const router = useRouter()
  const [consultId, setConsultId] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleJoin = async () => {
    if (!consultId.trim()) {
      toast.error("Por favor, insira um código de consulta válido")
      return
    }

    setIsLoading(true)

    try {
      // In a real implementation, we would validate the consultation ID
      // For now, we'll just simulate a delay and redirect
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to the appropriate teleconsult page
      if (userType === "patient") {
        router.push(`/patient/teleconsult/${consultId}`)
      } else {
        router.push(`/expert/teleconsult/${consultId}`)
      }

      setIsOpen(false)
    } catch (error) {
      toast.error("Não foi possível entrar na consulta. Verifique o código e tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const defaultTrigger = (
    <Button variant="outline" className="bg-white/5 text-white border-white/10 hover:bg-white/10">
      <Video className="h-4 w-4 mr-2" />
      Entrar com Código
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="bg-gradient-to-b from-[#1B1B4B] to-[#0F1437] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium flex items-center">
            <Video className="h-5 w-5 mr-2 text-sequoia-green" />
            Entrar em uma Teleconsulta
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Insira o código da consulta fornecido pelo {userType === "patient" ? "especialista" : "paciente"}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="consult-id">Código da Consulta</Label>
            <Input
              id="consult-id"
              placeholder="Ex: TC-123456"
              value={consultId}
              onChange={(e) => setConsultId(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <Button
            className="w-full bg-sequoia-green hover:bg-sequoia-green/90"
            onClick={handleJoin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Entrando...
              </span>
            ) : (
              <span className="flex items-center">
                Entrar na Consulta
                <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

