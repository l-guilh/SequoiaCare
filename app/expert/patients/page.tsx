"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus } from "lucide-react"
import Link from "next/link"

const patientData = [
  { id: 1, name: "João Silva", age: 45, lastVisit: "15/05/2023", condition: "Hipertensão" },
  { id: 2, name: "Maria Santos", age: 32, lastVisit: "22/04/2023", condition: "Diabetes Tipo 2" },
  { id: 3, name: "Carlos Oliveira", age: 28, lastVisit: "10/06/2023", condition: "Asma" },
  { id: 4, name: "Ana Rodrigues", age: 56, lastVisit: "03/05/2023", condition: "Artrite" },
  { id: 5, name: "Pedro Almeida", age: 39, lastVisit: "18/05/2023", condition: "Enxaqueca" },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patientData.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Pacientes</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Link href="/physician/patients/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Novo Paciente
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4">Nome</th>
                  <th className="pb-4">Idade</th>
                  <th className="pb-4">Última Visita</th>
                  <th className="pb-4">Condição</th>
                  <th className="pb-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-t border-gray-200">
                    <td className="py-4">{patient.name}</td>
                    <td className="py-4">{patient.age}</td>
                    <td className="py-4">{patient.lastVisit}</td>
                    <td className="py-4">{patient.condition}</td>
                    <td className="py-4">
                      <Link href={`/physician/patients/${patient.id}`}>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

