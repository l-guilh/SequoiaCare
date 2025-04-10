"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export default function MessagesPage() {
  const [chatMessages, setChatMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { type: "user", content: inputMessage }])
      setInputMessage("")
      // Simulate AI response (replace with actual AI integration)
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content:
              "Entendo sua preocupação. Baseado nos seus exames recentes, seus níveis estão dentro da faixa normal. No entanto, é sempre bom discutir detalhes com seu médico na próxima consulta.",
          },
        ])
      }, 1000)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Mensagens</h2>
      <Card>
        <CardContent className="p-6">
          <ScrollArea className="h-[400px] mb-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block p-3 rounded-lg ${msg.type === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSendMessage} className="rounded-l-none">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

