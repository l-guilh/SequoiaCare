"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

// Mock patient data (replace with actual API calls in production)
const patientData = {
  id: "1",
  name: "João Silva",
  age: 45,
  gender: "Masculino",
  bloodType: "A+",
  allergies: ["Penicilina", "Amendoim"],
  chronicConditions: ["Hipertensão", "Diabetes Tipo 2"],
}

const labResults = [
  { id: 1, test: "Hemoglobina", result: "14.5 g/dL", normalRange: "13.5 - 17.5 g/dL", date: "2023-05-15" },
  { id: 2, test: "Glicose em jejum", result: "110 mg/dL", normalRange: "70 - 100 mg/dL", date: "2023-05-15" },
  { id: 3, test: "Colesterol total", result: "190 mg/dL", normalRange: "< 200 mg/dL", date: "2023-05-15" },
]

const ehrNotes = [
  {
    id: 1,
    date: "2023-05-15",
    note: "Paciente relata melhora nos níveis de pressão arterial após início da medicação.",
  },
  { id: 2, date: "2023-04-01", note: "Prescrição de metformina 500mg 2x ao dia para controle glicêmico." },
  { id: 3, date: "2023-03-10", note: "Paciente queixa-se de dores nas articulações. Encaminhado para reumatologista." },
]

export default function PatientDetails() {
  const params = useParams()
  const patientId = params.id
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([])

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { type: "user", content: message }])
      setMessage("")
      // Simulate AI response (replace with actual AI integration)
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content:
              "Entendo sua preocupação sobre o paciente. Com base nos exames recentes, os níveis estão dentro da faixa normal. No entanto, é recomendável discutir os detalhes na próxima consulta.",
          },
        ])
      }, 1000)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Detalhes do Paciente: {patientData.name}</h2>

      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Nome:</strong> {patientData.name}
              </p>
              <p>
                <strong>Idade:</strong> {patientData.age}
              </p>
              <p>
                <strong>Gênero:</strong> {patientData.gender}
              </p>
            </div>
            <div>
              <p>
                <strong>Tipo Sanguíneo:</strong> {patientData.bloodType}
              </p>
              <p>
                <strong>Alergias:</strong> {patientData.allergies.join(", ")}
              </p>
              <p>
                <strong>Condições Crônicas:</strong> {patientData.chronicConditions.join(", ")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lab-results">
        <TabsList>
          <TabsTrigger value="lab-results">Resultados de Exames</TabsTrigger>
          <TabsTrigger value="ehr">Prontuário Eletrônico</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
        </TabsList>
        <TabsContent value="lab-results">
          <Card>
            <CardHeader>
              <CardTitle>Resultados de Exames</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Exame</th>
                      <th className="text-left pb-2">Resultado</th>
                      <th className="text-left pb-2">Faixa Normal</th>
                      <th className="text-left pb-2">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labResults.map((result) => (
                      <tr key={result.id} className="border-t border-gray-200">
                        <td className="py-2">{result.test}</td>
                        <td className="py-2">{result.result}</td>
                        <td className="py-2">{result.normalRange}</td>
                        <td className="py-2">{result.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ehr">
          <Card>
            <CardHeader>
              <CardTitle>Prontuário Eletrônico</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {ehrNotes.map((note) => (
                  <div key={note.id} className="mb-4 p-3 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">{note.date}</p>
                    <p className="text-gray-800">{note.note}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Mensagens</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] mb-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`mb-4 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                    <span
                      className={`inline-block p-3 rounded-lg ${
                        msg.type === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.content}
                    </span>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex">
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage} className="ml-2">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

