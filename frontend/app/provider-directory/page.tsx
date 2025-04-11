"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProviderDirectory } from "@/components/patient/provider-directory"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ProviderDirectoryPage() {
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  const handleSelectProvider = (provider: any, slot: any) => {
    setSelectedProvider(provider)
    setSelectedSlot(slot)
  }

  return (
    <div className="min-h-screen bg-sequoia-sage/20">
      <div className="container mx-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <motion.h1
              className="text-4xl font-bold text-sequoia-darkBlue"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Experts Sequoia Health
            </motion.h1>
            <motion.p
              className="mt-2 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Conecte-se com os melhores especialistas em saúde
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProviderDirectory onSelectProvider={handleSelectProvider} />
        </motion.div>

        {selectedProvider && selectedSlot && (
          <motion.div
            className="mt-6 p-6 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-sequoia-darkBlue">Consulta Selecionada</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <div>
                <p className="font-medium text-sequoia-green">Expert:</p>
                <p>{selectedProvider.name}</p>
              </div>
              <div>
                <p className="font-medium text-sequoia-green">Especialidade:</p>
                <p>{selectedProvider.specialty}</p>
              </div>
              <div>
                <p className="font-medium text-sequoia-green">Horário:</p>
                <p>{selectedSlot}</p>
              </div>
            </div>
            <div className="mt-6">
              <Button className="bg-sequoia-green hover:bg-sequoia-green/90">Confirmar Agendamento</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

