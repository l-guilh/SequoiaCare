"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pill, Clock, AlertCircle, Plus, Search, Check } from "lucide-react"
import { Input } from "@/components/ui/input"

const medications = [
  {
    id: 1,
    name: "Atorvastatina",
    dosage: "20mg",
    frequency: "1x ao dia",
    time: "20:00",
    refillDate: "2024-03-30",
    status: "active",
    lastTaken: null,
  },
  {
    id: 2,
    name: "Metformina",
    dosage: "500mg",
    frequency: "2x ao dia",
    time: "08:00,20:00",
    refillDate: "2024-03-15",
    status: "active",
    lastTaken: "2024-03-10",
  },
  {
    id: 3,
    name: "Omeprazol",
    dosage: "20mg",
    frequency: "1x ao dia",
    time: "08:00",
    refillDate: "2024-03-22",
    status: "active",
    lastTaken: "2024-03-10",
  },
]

export default function MedicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMedications = medications.filter((medication) =>
    medication.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-sequoia-sage to-white px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-sequoia-darkBlue"
          >
            Minhas Medicações
          </motion.h2>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Buscar medicações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 border-0 shadow-sm w-full md:w-[300px]"
              />
            </div>
            <Button className="bg-sequoia-green hover:bg-sequoia-green/90 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Nova Medicação
            </Button>
          </div>
        </div>

        <Card className="bg-white/50 backdrop-blur-lg border-none shadow-lg">
          <CardHeader>
            <CardTitle>Medicações Atuais</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {filteredMedications.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                    <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Nenhuma medicação encontrada</p>
                  </motion.div>
                ) : (
                  filteredMedications.map((medication, index) => (
                    <motion.div
                      key={medication.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-sequoia-green/10">
                              <Pill className="h-5 w-5 text-sequoia-green" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sequoia-darkBlue">{medication.name}</h3>
                              <p className="text-gray-600">
                                {medication.dosage} - {medication.frequency}
                              </p>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{medication.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-2">
                          {new Date(medication.refillDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                            <div className="flex items-center text-amber-600">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              <span className="text-sm">Recarga próxima</span>
                            </div>
                          )}
                          <p className="text-sm text-gray-600">
                            Próxima recarga: {new Date(medication.refillDate).toLocaleDateString("pt-BR")}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-sequoia-green/10 border-sequoia-green/20 text-sequoia-green hover:bg-sequoia-green/20"
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Marcar como Tomado
                            </Button>
                            <Button variant="outline" size="sm">
                              Solicitar Recarga
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

