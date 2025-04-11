"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Search, Plus, Download, Calendar, TrendingUp, TrendingDown, X, Upload } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

const mockExams = [
  {
    id: 1,
    type: "Hemograma",
    date: "2024-03-15",
    doctor: "Dra. Maria Silva",
    status: "Disponível",
    results: {
      hemoglobina: { value: 14.5, trend: "up" },
      hematocrito: { value: 43, trend: "stable" },
      leucocitos: { value: 7500, trend: "down" },
    },
  },
  {
    id: 2,
    type: "Glicemia",
    date: "2024-03-10",
    doctor: "Dr. João Santos",
    status: "Em análise",
  },
  {
    id: 3,
    type: "Colesterol",
    date: "2024-02-28",
    doctor: "Dr. Carlos Oliveira",
    status: "Disponível",
    results: {
      colesterolTotal: { value: 180, trend: "down" },
      hdl: { value: 45, trend: "up" },
      ldl: { value: 110, trend: "down" },
    },
  },
]

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewExamModal, setShowNewExamModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const filteredExams = mockExams.filter(
    (exam) =>
      exam.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-red-500" />
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-green-500" />
    return null
  }

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
            Meus Exames
          </motion.h2>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Buscar exames..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 border-0 shadow-sm w-full md:w-[300px]"
              />
            </div>
            <Button
              className="bg-sequoia-green hover:bg-sequoia-green/90 text-white shadow-sm"
              onClick={() => setShowNewExamModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Exame
            </Button>
          </div>
        </div>

        <Card className="bg-white/50 backdrop-blur-lg border-none shadow-lg">
          <CardHeader>
            <CardTitle>Histórico de Exames</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {filteredExams.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Nenhum exame encontrado</p>
                  </motion.div>
                ) : (
                  filteredExams.map((exam, index) => (
                    <motion.div
                      key={exam.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-sequoia-green/10">
                              <FileText className="h-5 w-5 text-sequoia-green" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sequoia-darkBlue">{exam.type}</h3>
                              <p className="text-gray-600">{exam.doctor}</p>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{format(new Date(exam.date), "dd/MM/yyyy")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              exam.status === "Disponível"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {exam.status}
                          </span>
                          {exam.results && (
                            <div className="flex flex-wrap gap-4 mt-2">
                              {Object.entries(exam.results).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600 capitalize">
                                    {key}: {value.value}
                                  </span>
                                  <TrendIcon trend={value.trend} />
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex gap-2 mt-2">
                            {exam.status === "Disponível" && (
                              <>
                                <Link href={`/patient/exams/${exam.id}`}>
                                  <Button variant="outline" size="sm">
                                    Ver Detalhes
                                  </Button>
                                </Link>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  PDF
                                </Button>
                              </>
                            )}
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

      {/* New Exam Modal */}
      <AnimatePresence>
        {showNewExamModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-sequoia-darkBlue">Solicitar Novo Exame</h3>
                <button onClick={() => setShowNewExamModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <Label htmlFor="examType">Tipo de Exame</Label>
                  <select
                    id="examType"
                    className="w-full mt-1 p-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sequoia-green"
                  >
                    <option value="">Selecione o tipo de exame</option>
                    <option value="hemograma">Hemograma</option>
                    <option value="glicemia">Glicemia</option>
                    <option value="colesterol">Colesterol</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="doctor">Médico Solicitante</Label>
                  <Input type="text" id="doctor" placeholder="Nome do médico" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="date">Data Preferencial</Label>
                  <Input type="date" id="date" className="mt-1" />
                </div>

                <div>
                  <Label>Anexos</Label>
                  <div
                    className="mt-1 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-sequoia-green/50 transition-colors"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {selectedFile ? selectedFile.name : "Clique para anexar ou arraste arquivos"}
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowNewExamModal(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-sequoia-green hover:bg-sequoia-green/90 text-white">
                    Solicitar Exame
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

