"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { FaApple, FaGoogle } from "react-icons/fa"
import { Allerta as Kepler_Std } from "next/font/google"
import { useRouter } from "next/navigation"

const keplerStd = Kepler_Std({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
})

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState<"patient" | "expert">("patient")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add authentication logic here
    router.push(role === "patient" ? "/patient" : "/expert")
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Panel - Image and Quote */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://lp-cms-production.imgix.net/2021-04/GettyRF_752178983.jpg"
          alt="Sequoia Forest"
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Back Button */}
        <div className="p-8">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
              opacity: { duration: 0.5 },
              scale: { duration: 0.6 },
            }}
            className="w-full max-w-md backdrop-blur-sm bg-white/40 p-8 rounded-2xl shadow-[0_0_1px_rgba(0,0,0,0.05),0_15px_35px_-5px_rgba(0,0,0,0.05)] border border-white/20"
          >
            {/* Logo */}
            <div className="flex items-center justify-center mb-12">
              <Image
                src="https://png.pngtree.com/png-clipart/20240909/original/pngtree-adult-giant-sequoia-tree-png-image_15970000.png"
                alt="Sequoia Health"
                width={50}
                height={50}
                className="mr-4"
              />
              <h1 className="text-3xl tracking-tight">
                <span className="font-light">Sequoia</span>
                <span className="font-semibold">Health</span>
              </h1>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className={`${keplerStd.className} text-3xl font-light text-gray-900 mb-2`}>
                {isSignUp ? "Crie sua conta" : "Bem-vindo de volta"}
              </h2>
              <p className="text-gray-600">
                {isSignUp ? "Comece sua jornada para uma vida mais saudável" : "Continue sua jornada de saúde"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Nome completo
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 bg-white/50 border-gray-200 focus:border-sequoia-green focus:ring-sequoia-green/20"
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/50 border-gray-200 focus:border-sequoia-green focus:ring-sequoia-green/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-white/50 border-gray-200 focus:border-sequoia-green focus:ring-sequoia-green/20"
                  required
                />
              </div>

              {/* Role Selector */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <div className="inline-flex rounded-lg bg-white shadow-sm p-1 border border-gray-100">
                    <button
                      type="button"
                      onClick={() => setRole("patient")}
                      className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                        role === "patient"
                          ? "bg-sequoia-green text-white shadow-sm"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      Paciente
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("expert")}
                      className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                        role === "expert"
                          ? "bg-sequoia-green text-white shadow-sm"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      Especialista
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-sequoia-green hover:bg-sequoia-green/90 text-white font-medium rounded-xl"
              >
                {isSignUp
                  ? `Criar conta como ${role === "patient" ? "Paciente" : "Especialista"}`
                  : `Entrar como ${role === "patient" ? "Paciente" : "Especialista"}`}
              </Button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-b from-white to-gray-50 text-gray-500">ou continue com</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 bg-white hover:bg-gray-50"
                  onClick={() => console.log("Google login")}
                >
                  <FaGoogle className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 bg-white hover:bg-gray-50"
                  onClick={() => console.log("Apple login")}
                >
                  <FaApple className="mr-2 h-4 w-4" />
                  Apple
                </Button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-8">
                {isSignUp ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sequoia-green hover:text-sequoia-green/80 font-medium"
                >
                  {isSignUp ? "Entrar" : "Criar conta"}
                </button>
              </p>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="p-8 text-center text-sm text-gray-500">
          <p>© 2024 Sequoia Health. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}

