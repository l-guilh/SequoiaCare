"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, VideoIcon, TrendingUp } from "lucide-react"
import { DirectJoin } from "@/components/teleconsult/direct-join"
import Link from "next/link"

export default function ExpertPage() {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Bom dia")
    else if (hour < 18) setGreeting("Boa tarde")
    else setGreeting("Boa noite")
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold text-white"
            >
              {greeting}, Dr. Silva
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mt-1"
            >
              Bem-vindo(a) à sua área de especialista
            </motion.p>
          </div>
        </div>

        {/* Teleconsult Card */}
        <Card className="bg-gradient-to-r from-sequoia-green/20 to-sequoia-brown/20 border-sequoia-green/30">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">Teleconsulta</h2>
                <p className="text-white/70 max-w-md">
                  Conecte-se com seus pacientes através de uma consulta virtual segura e de alta qualidade.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <DirectJoin
                  userType="expert"
                  trigger={
                    <Button className="bg-white text-sequoia-green hover:bg-white/90">
                      <VideoIcon className="h-4 w-4 mr-2" />
                      Entrar com Código
                    </Button>
                  }
                />
                <Link href="/expert/teleconsult">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Ver Minhas Teleconsultas
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <h2 className="text-2xl font-bold text-white mt-8">Acesso Rápido</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link href="/expert/dashboard" className="group">
            <Card className="bg-white/5 border-white/10 h-full transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="p-3 bg-white/5 rounded-full mb-4 group-hover:bg-white/10 transition-all duration-300">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white">Dashboard</h3>
                <p className="text-white/60 text-sm mt-2">Visualize seu resumo de atividades</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/expert/appointments" className="group">
            <Card className="bg-white/5 border-white/10 h-full transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="p-3 bg-white/5 rounded-full mb-4 group-hover:bg-white/10 transition-all duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white">Agenda</h3>
                <p className="text-white/60 text-sm mt-2">Gerencie suas consultas</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/expert/teleconsult" className="group">
            <Card className="bg-white/5 border-white/10 h-full transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="p-3 bg-white/5 rounded-full mb-4 group-hover:bg-white/10 transition-all duration-300">
                  <VideoIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white">Teleconsultas</h3>
                <p className="text-white/60 text-sm mt-2">Consultas online com pacientes</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/expert/patients" className="group">
            <Card className="bg-white/5 border-white/10 h-full transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="p-3 bg-white/5 rounded-full mb-4 group-hover:bg-white/10 transition-all duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white">Pacientes</h3>
                <p className="text-white/60 text-sm mt-2">Gerencie seus pacientes</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

