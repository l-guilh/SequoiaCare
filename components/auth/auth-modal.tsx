"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaApple, FaGoogle } from "react-icons/fa"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { validateCredentials } from "@/lib/auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [role, setRole] = useState<"patient" | "provider">("patient")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Reset error on new submission

    const result = validateCredentials(email, password)

    if (result) {
      // Close modal and navigate to appropriate dashboard
      onClose()
      if (result.type === "physician") {
        router.push("/expert")
      } else {
        router.push("/patient")
      }
    } else {
      setError("Email ou senha inválidos. Por favor, tente novamente.")
    }
  }

  const handleSocialAuth = (provider: "google" | "apple") => {
    setError(`Autenticação com ${provider} em desenvolvimento. Use as credenciais de teste.`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-lg bg-gradient-to-b from-black/10 to-black/30"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white/40 backdrop-blur-2xl shadow-2xl border border-white/20 backdrop-saturate-150"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-semibold text-center mb-2">
                {activeTab === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
              </h2>
              <p className="text-gray-600 text-center mb-8">
                {activeTab === "login"
                  ? "Continue sua jornada de saúde"
                  : "Comece sua jornada para uma vida mais saudável"}
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
              )}

              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Entrar</TabsTrigger>
                  <TabsTrigger value="signup">Cadastrar</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {activeTab === "signup" && (
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-white/50"
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/50"
                        required
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/50"
                        required
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tipo de conta</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setRole("patient")}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            role === "patient"
                              ? "border-sequoia-green bg-sequoia-green/10"
                              : "border-gray-200 hover:border-sequoia-green/50"
                          }`}
                        >
                          <div className="font-semibold mb-1">Paciente</div>
                          <div className="text-sm text-gray-600">Acesse seus cuidados de saúde</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRole("provider")}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            role === "provider"
                              ? "border-sequoia-green bg-sequoia-green/10"
                              : "border-gray-200 hover:border-sequoia-green/50"
                          }`}
                        >
                          <div className="font-semibold mb-1">Profissional</div>
                          <div className="text-sm text-gray-600">Gerencie seus pacientes</div>
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-sequoia-green hover:bg-sequoia-green/90">
                      {activeTab === "login" ? "Entrar" : "Criar conta"}
                    </Button>

                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white/80 text-gray-500">ou continue com</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialAuth("google")}
                        className="w-full bg-white hover:bg-gray-50"
                      >
                        <FaGoogle className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialAuth("apple")}
                        className="w-full bg-white hover:bg-gray-50"
                      >
                        <FaApple className="mr-2 h-4 w-4" />
                        Apple
                      </Button>
                    </div>

                    {activeTab === "login" ? (
                      <p className="text-center text-sm text-gray-600">
                        Não tem uma conta?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("signup")}
                          className="text-sequoia-green hover:underline font-medium"
                        >
                          Cadastre-se
                        </button>
                      </p>
                    ) : (
                      <p className="text-center text-sm text-gray-600">
                        Já tem uma conta?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("login")}
                          className="text-sequoia-green hover:underline font-medium"
                        >
                          Entre
                        </button>
                      </p>
                    )}
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

