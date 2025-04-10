import { demoData } from "./demo-data"

export const validateCredentials = (email: string, password: string) => {
  // In a real application, this would validate against a secure database
  // and use proper password hashing

  // Physician logins
  if (email === "ana.silva@sequoiahealth.com" && password === "CardioDemo2024") {
    return {
      type: "physician",
      data: demoData.physicians[email],
    }
  }

  if (email === "carlos.santos@sequoiahealth.com" && password === "DermaDemo2024") {
    return {
      type: "physician",
      data: demoData.physicians[email],
    }
  }

  if (email === "mariana.oliveira@sequoiahealth.com" && password === "PedDemo2024") {
    return {
      type: "physician",
      data: demoData.physicians[email],
    }
  }

  // Patient logins
  const patientCredentials: Record<string, { physicianEmail: string; patientId: string }> = {
    "joao.pereira@demo.com": {
      physicianEmail: "ana.silva@sequoiahealth.com",
      patientId: "pat-001",
    },
    "maria.costa@demo.com": {
      physicianEmail: "ana.silva@sequoiahealth.com",
      patientId: "pat-002",
    },
    "ana.rodrigues@demo.com": {
      physicianEmail: "carlos.santos@sequoiahealth.com",
      patientId: "pat-003",
    },
    "pedro.silva@demo.com": {
      physicianEmail: "carlos.santos@sequoiahealth.com",
      patientId: "pat-004",
    },
    "lucas.santos@demo.com": {
      physicianEmail: "mariana.oliveira@sequoiahealth.com",
      patientId: "pat-005",
    },
    "julia.lima@demo.com": {
      physicianEmail: "mariana.oliveira@sequoiahealth.com",
      patientId: "pat-006",
    },
  }

  if (email in patientCredentials && password.startsWith("Patient2024#")) {
    const { physicianEmail, patientId } = patientCredentials[email]
    const physician = demoData.physicians[physicianEmail]
    const patient = physician.patients.find((p) => p.id === patientId)

    if (patient) {
      return {
        type: "patient",
        data: {
          ...patient,
          physician: {
            id: physician.id,
            name: physician.name,
            specialty: physician.specialty,
          },
        },
      }
    }
  }

  return null
}

