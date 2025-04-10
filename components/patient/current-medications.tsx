"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Pill } from "lucide-react"

const Prescription = ({ medication }) => (
  <div
    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
    data-fhir-resource-id={medication.resource.id}
  >
    <div>
      <p className="font-medium text-gray-800">{medication.resource.medicationCodeableConcept.text}</p>
      <p className="text-sm text-gray-600">{medication.resource.dosageInstruction[0].text}</p>
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-600">Status</p>
      <p className="font-medium text-gray-800">{medication.resource.status}</p>
    </div>
  </div>
)

export function CurrentMedications({ medications }) {
  const [isRefilling, setIsRefilling] = useState(false)

  const handleRefillRequest = () => {
    setIsRefilling(true)
    // Implement medication refill request logic here
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medicações Atuais</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {medications.map((medication) => (
            <Prescription key={medication.resource.id} medication={medication} />
          ))}
        </ScrollArea>
        <Button variant="outline" className="w-full mt-4" onClick={handleRefillRequest}>
          <Pill className="mr-2 h-4 w-4" /> Solicitar Recarga
        </Button>
      </CardContent>
    </Card>
  )
}

