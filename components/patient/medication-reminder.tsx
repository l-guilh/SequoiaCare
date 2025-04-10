"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell, X } from "lucide-react"

const mockMedications = [
  { id: 1, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", time: "08:00" },
  { id: 2, name: "Metformin", dosage: "500mg", frequency: "Twice daily", time: "08:00,20:00" },
  { id: 3, name: "Simvastatin", dosage: "20mg", frequency: "Once daily", time: "20:00" },
]

export function MedicationReminder() {
  const [medications, setMedications] = useState(mockMedications)
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMedication((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMedications((prev) => [...prev, { ...newMedication, id: Date.now() }])
    setNewMedication({ name: "", dosage: "", frequency: "", time: "" })
  }

  const handleDelete = (id) => {
    setMedications((prev) => prev.filter((med) => med.id !== id))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Medication Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          {medications.map((med) => (
            <div key={med.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <div>
                <h3 className="font-semibold">{med.name}</h3>
                <p className="text-sm text-gray-600">
                  {med.dosage} - {med.frequency}
                </p>
                <p className="text-sm text-gray-600">Time: {med.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(med.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Medication Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={newMedication.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                type="text"
                id="dosage"
                name="dosage"
                value={newMedication.dosage}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <Input
                type="text"
                id="frequency"
                name="frequency"
                value={newMedication.frequency}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                type="time"
                id="time"
                name="time"
                value={newMedication.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Medication
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

