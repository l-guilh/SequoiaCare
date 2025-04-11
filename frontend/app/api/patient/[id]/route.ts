import { NextResponse } from "next/server"

const mockPatientData = {
  patient: {
    id: "example-patient-id",
    name: [{ text: "John Doe" }],
    birthDate: "1990-01-01",
    gender: "male",
    address: [{ line: ["123 Main St"], city: "Anytown" }],
    telecom: [{ value: "(555) 123-4567" }],
  },
  conditions: [
    {
      resource: { id: "condition-1", code: { text: "Hypertension" }, clinicalStatus: { coding: [{ code: "active" }] } },
    },
    {
      resource: {
        id: "condition-2",
        code: { text: "Type 2 Diabetes" },
        clinicalStatus: { coding: [{ code: "active" }] },
      },
    },
  ],
  medications: [
    {
      resource: {
        id: "med-1",
        medicationCodeableConcept: { text: "Lisinopril" },
        dosageInstruction: [{ text: "10mg daily" }],
        status: "active",
      },
    },
    {
      resource: {
        id: "med-2",
        medicationCodeableConcept: { text: "Metformin" },
        dosageInstruction: [{ text: "500mg twice daily" }],
        status: "active",
      },
    },
  ],
  appointments: [
    {
      resource: {
        id: "appt-1",
        serviceType: [{ text: "Cardiology Follow-up" }],
        appointmentType: { text: "Routine" },
        start: "2023-06-15T14:30:00Z",
      },
    },
    {
      resource: {
        id: "appt-2",
        serviceType: [{ text: "Endocrinology Consult" }],
        appointmentType: { text: "New Patient" },
        start: "2023-06-22T10:00:00Z",
      },
    },
  ],
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // In a real application, you would use the patientId to fetch the correct data
  // For now, we'll just return the mock data regardless of the ID
  const patientId = params.id

  return NextResponse.json(mockPatientData)
}

