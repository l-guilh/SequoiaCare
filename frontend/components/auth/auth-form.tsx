"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import { Checkbox } from "@/components/ui/checkbox"

interface AuthFormProps {
  onLogin: (role: "patient" | "provider") => void
}

export function AuthForm({ onLogin }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isProvider, setIsProvider] = useState(false)
  const [role, setRole] = useState<"patient" | "provider">("patient")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === "admin" && password === "admin") {
      onLogin(role)
    } else {
      // Show error message
      alert("Credenciais inválidas. Use admin/admin para teste.")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{isSignUp ? "Criar Conta" : "Entrar"}</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="seu@email.com" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input type="password" id="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-full ${role === "patient" ? "bg-[#2ecc71] text-white" : "bg-gray-200"}`}
            onClick={() => setRole("patient")}
            type="button"
          >
            Paciente
          </button>
          <button
            className={`px-4 py-2 rounded-full ${role === "provider" ? "bg-[#2ecc71] text-white" : "bg-gray-200"}`}
            onClick={() => setRole("provider")}
            type="button"
          >
            Provedor
          </button>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox id="isProvider" checked={isProvider} onCheckedChange={setIsProvider} />
          <label
            htmlFor="isProvider"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Entrar como provedor de saúde
          </label>
        </div>
        <Button className="w-full bg-[#2ecc71] hover:bg-[#27ae60] text-white" onClick={handleSubmit}>
          {isSignUp ? "Cadastrar" : "Entrar"} como {role === "patient" ? "Paciente" : "Provedor"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">ou continue com</span>
        <div className="flex justify-center space-x-4 mt-2">
          <Button variant="outline" className="flex items-center justify-center w-1/2">
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
          </Button>
          <Button variant="outline" className="flex items-center justify-center w-1/2">
            <FaApple className="mr-2 h-5 w-5" />
            Apple
          </Button>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-600">
        {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="ml-1 text-[#2ecc71] hover:underline focus:outline-none"
        >
          {isSignUp ? "Entrar" : "Cadastre-se"}
        </button>
      </p>
    </motion.div>
  )
}

