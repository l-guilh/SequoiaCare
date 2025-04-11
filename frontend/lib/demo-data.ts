export const demoData = {
  physicians: {
    "ana.silva@sequoiahealth.com": {
      id: "phy-001",
      name: "Dra. Ana Silva",
      specialty: "Cardiologia",
      patients: [
        {
          id: "pat-001",
          name: "João Pereira",
          age: 58,
          condition: "Hipertensão",
          consultations: [
            {
              date: "2024-02-15",
              type: "Retorno",
              notes: "Pressão arterial controlada. Mantida medicação atual.",
              vitals: {
                bloodPressure: "130/85",
                heartRate: 72,
                weight: 78,
              },
            },
            {
              date: "2024-01-15",
              type: "Rotina",
              notes: "Ajuste na medicação para melhor controle pressórico.",
              vitals: {
                bloodPressure: "145/95",
                heartRate: 78,
                weight: 79,
              },
            },
          ],
          labs: [
            {
              date: "2024-02-10",
              type: "Lipidograma",
              results: {
                colesterolTotal: 185,
                hdl: 45,
                ldl: 110,
                triglicerides: 150,
              },
            },
            {
              date: "2024-02-10",
              type: "Eletrocardiograma",
              results: "Ritmo sinusal normal, sem alterações isquêmicas",
            },
          ],
          medications: [
            {
              name: "Losartana",
              dosage: "50mg",
              frequency: "1x ao dia",
            },
            {
              name: "Hidroclorotiazida",
              dosage: "25mg",
              frequency: "1x ao dia",
            },
          ],
        },
        {
          id: "pat-002",
          name: "Maria Costa",
          age: 45,
          condition: "Arritmia",
          consultations: [
            {
              date: "2024-02-18",
              type: "Urgência",
              notes: "Episódio de palpitações. Ajustada medicação antiarrítmica.",
              vitals: {
                bloodPressure: "120/80",
                heartRate: 88,
                weight: 65,
              },
            },
            {
              date: "2024-01-20",
              type: "Rotina",
              notes: "Holter 24h mostra episódios de taquicardia supraventricular.",
              vitals: {
                bloodPressure: "125/85",
                heartRate: 76,
                weight: 65,
              },
            },
          ],
          labs: [
            {
              date: "2024-02-15",
              type: "Holter 24h",
              results: "Episódios de TPSV, FC média 76bpm",
            },
            {
              date: "2024-02-15",
              type: "Ecocardiograma",
              results: "Função sistólica preservada, FE 65%",
            },
          ],
          medications: [
            {
              name: "Propranolol",
              dosage: "40mg",
              frequency: "2x ao dia",
            },
            {
              name: "Amiodarona",
              dosage: "200mg",
              frequency: "1x ao dia",
            },
          ],
        },
      ],
    },
    "carlos.santos@sequoiahealth.com": {
      id: "phy-002",
      name: "Dr. Carlos Santos",
      specialty: "Dermatologia",
      patients: [
        {
          id: "pat-003",
          name: "Ana Rodrigues",
          age: 32,
          condition: "Dermatite",
          consultations: [
            {
              date: "2024-02-20",
              type: "Retorno",
              notes: "Melhora significativa das lesões. Mantido tratamento.",
              photos: ["/placeholder.svg?height=200&width=200"],
            },
            {
              date: "2024-01-23",
              type: "Primeira Consulta",
              notes: "Lesões eczematosas em membros superiores. Iniciado tratamento.",
              photos: ["/placeholder.svg?height=200&width=200"],
            },
          ],
          labs: [
            {
              date: "2024-02-01",
              type: "Teste Alérgico",
              results: "Positivo para ácaros e níquel",
            },
          ],
          medications: [
            {
              name: "Hidratante Corporal",
              dosage: "Aplicação",
              frequency: "2x ao dia",
            },
            {
              name: "Desonida Creme",
              dosage: "Aplicação",
              frequency: "1x ao dia",
            },
          ],
        },
        {
          id: "pat-004",
          name: "Pedro Silva",
          age: 41,
          condition: "Psoríase",
          consultations: [
            {
              date: "2024-02-19",
              type: "Retorno",
              notes: "Redução das placas psoriáticas. Resposta positiva ao tratamento.",
              photos: ["/placeholder.svg?height=200&width=200"],
            },
            {
              date: "2024-01-19",
              type: "Rotina",
              notes: "Surto de lesões após estresse. Ajustada medicação.",
              photos: ["/placeholder.svg?height=200&width=200"],
            },
          ],
          labs: [
            {
              date: "2024-02-10",
              type: "Biópsia de Pele",
              results: "Confirmado padrão histológico de psoríase",
            },
          ],
          medications: [
            {
              name: "Metotrexato",
              dosage: "15mg",
              frequency: "1x por semana",
            },
            {
              name: "Ácido Fólico",
              dosage: "5mg",
              frequency: "1x por semana",
            },
          ],
        },
      ],
    },
    "mariana.oliveira@sequoiahealth.com": {
      id: "phy-003",
      name: "Dra. Mariana Oliveira",
      specialty: "Pediatria",
      patients: [
        {
          id: "pat-005",
          name: "Lucas Santos",
          age: 8,
          condition: "Asma",
          consultations: [
            {
              date: "2024-02-21",
              type: "Urgência",
              notes: "Crise de asma leve. Orientado uso correto da bombinha.",
              vitals: {
                weight: 26,
                height: 128,
                temperature: 36.8,
                oxygenSaturation: 97,
              },
            },
            {
              date: "2024-01-21",
              type: "Rotina",
              notes: "Desenvolvimento adequado. Mantido plano de controle da asma.",
              vitals: {
                weight: 25.5,
                height: 127,
                temperature: 36.5,
                oxygenSaturation: 98,
              },
            },
          ],
          labs: [
            {
              date: "2024-02-15",
              type: "Espirometria",
              results: "Padrão obstrutivo leve, com resposta ao broncodilatador",
            },
          ],
          medications: [
            {
              name: "Salbutamol Spray",
              dosage: "100mcg",
              frequency: "Se necessário",
            },
            {
              name: "Budesonida Spray",
              dosage: "200mcg",
              frequency: "2x ao dia",
            },
          ],
        },
        {
          id: "pat-006",
          name: "Julia Lima",
          age: 5,
          condition: "Alergia Alimentar",
          consultations: [
            {
              date: "2024-02-22",
              type: "Retorno",
              notes: "Sem novas reações alérgicas. Mantidas orientações.",
              vitals: {
                weight: 19,
                height: 110,
                temperature: 36.6,
              },
            },
            {
              date: "2024-01-22",
              type: "Primeira Consulta",
              notes: "História de reação alérgica a amendoim. Iniciado plano de cuidados.",
              vitals: {
                weight: 18.5,
                height: 109,
                temperature: 36.7,
              },
            },
          ],
          labs: [
            {
              date: "2024-02-01",
              type: "IgE Específico",
              results: "Positivo para amendoim e castanhas",
            },
          ],
          medications: [
            {
              name: "Loratadina",
              dosage: "5ml",
              frequency: "1x ao dia",
            },
            {
              name: "Adrenalina Auto-Injetor",
              dosage: "0.15mg",
              frequency: "Se necessário",
            },
          ],
        },
      ],
    },
  },
}

