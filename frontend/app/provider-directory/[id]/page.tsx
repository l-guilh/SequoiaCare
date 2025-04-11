"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Video, Building2, Star, Languages, GraduationCap, ArrowLeft } from "lucide-react"
import { format } from "date-fns"

const providerData = [
  {
    id: 1,
    name: "Dra. Ana Silva",
    specialty: "Cardiologia",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    languages: ["Português", "Inglês", "Espanhol"],
    education: ["Harvard Medical School, MD", "Cleveland Clinic, Residência", "Stanford Medicine, Fellowship"],
    location: {
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
    conditions: ["Hipertensão", "Arritmia", "Insuficiência Cardíaca", "Doença Arterial Coronariana"],
    clinicPhotos: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    ],
    about:
      "Cardiologista com mais de 15 anos de experiência, especializada em prevenção cardiovascular e tratamento de doenças cardíacas complexas. Comprometida com uma abordagem holística da saúde cardíaca.",
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 2,
    name: "Dr. Carlos Santos",
    specialty: "Dermatologia",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    languages: ["Português", "Inglês"],
    education: ["USP Medical School, MD", "Hospital das Clínicas, Residência", "NYU, Fellowship"],
    location: {
      address: "Rua Oscar Freire, 500",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
    conditions: ["Acne", "Dermatite", "Melanoma", "Psoríase"],
    clinicPhotos: [
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?q=80&w=2091&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631217868302-e29054ce1c75?q=80&w=2091&auto=format&fit=crop",
    ],
    about:
      "Dermatologista especializado em tratamentos estéticos e clínicos, com foco em tecnologias inovadoras e procedimentos minimamente invasivos. Pioneiro em tratamentos de rejuvenescimento.",
    rating: 4.8,
    reviews: 98,
  },
  {
    id: 3,
    name: "Dra. Mariana Oliveira",
    specialty: "Pediatria",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop",
    languages: ["Português", "Francês"],
    education: [
      "UFRJ Medical School, MD",
      "Hospital Pedro Ernesto, Residência",
      "Paris Children's Hospital, Fellowship",
    ],
    location: {
      address: "Rua das Flores, 300",
      city: "Curitiba",
      state: "PR",
      country: "Brasil",
    },
    conditions: ["Desenvolvimento Infantil", "Alergias", "Asma", "Vacinação"],
    clinicPhotos: [
      "https://images.unsplash.com/photo-1631217868699-4faa76fa849b?q=80&w=2091&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631217868814-804a4555685e?q=80&w=2091&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631217868854-a71130ffa583?q=80&w=2091&auto=format&fit=crop",
    ],
    about:
      "Pediatra dedicada ao cuidado integral da saúde infantil, com especial atenção ao desenvolvimento e bem-estar emocional das crianças. Experiência em pediatria comportamental.",
    rating: 4.9,
    reviews: 156,
  },
]

const timeSlots = ["7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30"]

export default function ProviderProfile() {
  const params = useParams()
  const [provider, setProvider] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<"virtual" | "clinic" | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchProvider = () => {
      setLoading(true)
      const found = providerData.find((p) => p.id === Number(params.id))
      setProvider(found)
      setLoading(false)
    }
    fetchProvider()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-sequoia-sage/5 to-sequoia-green/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sequoia-green"></div>
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-sequoia-sage/5 to-sequoia-green/5 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Profissional não encontrado</h2>
          <Link href="/provider-directory">
            <Button className="bg-sequoia-green hover:bg-sequoia-green/90 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Diretório
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sequoia-sage/5 to-sequoia-green/5">
      {/* Gallery Section */}
      <div className="w-full h-[300px] sm:h-[400px] relative grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={provider.clinicPhotos[0] || "/placeholder.svg"}
            alt="Clinic Interior"
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden sm:grid grid-rows-2 gap-4">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={provider.clinicPhotos[1] || "/placeholder.svg"}
              alt="Examination Room"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={provider.clinicPhotos[2] || "/placeholder.svg"}
              alt="Waiting Area"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={provider.photo || "/placeholder.svg"}
                      alt={provider.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-2">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                        <Badge className="mt-2 bg-sequoia-green text-white">{provider.specialty}</Badge>
                      </div>
                      <div className="mt-2 sm:mt-0 text-center sm:text-right">
                        <div className="flex items-center justify-center sm:justify-end gap-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <span className="font-semibold text-lg text-gray-900">{provider.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">{provider.reviews} avaliações</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-4">{provider.about}</p>
                    <div className="space-y-4 mt-6">
                      <div className="flex items-center gap-2">
                        <Languages className="w-5 h-5 text-sequoia-green" />
                        <div>
                          <h3 className="font-medium text-gray-900">Idiomas:</h3>
                          <p className="text-gray-600">{provider.languages.join(", ")}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-5 h-5 text-sequoia-green mt-1" />
                        <div>
                          <h3 className="font-medium text-gray-900">Formação:</h3>
                          <ul className="list-disc list-inside text-gray-600">
                            {provider.education.map((edu, index) => (
                              <li key={index}>{edu}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointment Booking */}
            <Card className="overflow-hidden border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Agendar consulta:</h2>
                <div className="flex gap-4 mb-6">
                  <Button
                    variant={selectedType === "virtual" ? "default" : "outline"}
                    onClick={() => setSelectedType("virtual")}
                    className={selectedType === "virtual" ? "bg-sequoia-green text-white" : "text-sequoia-green"}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Virtual
                  </Button>
                  <Button
                    variant={selectedType === "clinic" ? "default" : "outline"}
                    onClick={() => setSelectedType("clinic")}
                    className={selectedType === "clinic" ? "bg-sequoia-green text-white" : "text-sequoia-green"}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Presencial
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-6">
                  {Array.from({ length: 7 }).map((_, index) => {
                    const date = new Date()
                    date.setDate(date.getDate() + index)
                    return (
                      <Button
                        key={index}
                        variant={selectedDate?.getDate() === date.getDate() ? "default" : "outline"}
                        className={`flex flex-col items-center ${
                          selectedDate?.getDate() === date.getDate()
                            ? "bg-sequoia-green text-white"
                            : "text-gray-900 hover:bg-sequoia-green/10"
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <span className="text-xs">{format(date, "EEE")}</span>
                        <span className="text-lg font-bold">{format(date, "d")}</span>
                      </Button>
                    )
                  })}
                </div>

                {selectedDate && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedTimeSlot === slot ? "default" : "outline"}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`${
                          selectedTimeSlot === slot
                            ? "bg-sequoia-green text-white"
                            : "text-gray-900 hover:bg-sequoia-green/10"
                        }`}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Conditions */}
            <Card className="overflow-hidden border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Condições tratadas:</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.conditions.map((condition) => (
                    <Badge
                      key={condition}
                      variant="outline"
                      className="bg-sequoia-green/10 text-sequoia-green border-0"
                    >
                      {condition}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-0 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Localização:</h2>
                <div className="space-y-4">
                  <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://maps.googleapis.com/maps/api/staticmap?center=37.4419,-122.1419&zoom=13&size=600x600&maptype=roadmap&markers=color:red%7C37.4419,-122.1419&key=YOUR_API_KEY"
                      alt="Map"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-gray-900">
                    <p>{provider.location.address}</p>
                    <p>
                      {provider.location.city}, {provider.location.state}
                    </p>
                    <p>{provider.location.country}</p>
                  </div>
                  <Button className="w-full bg-sequoia-green text-white hover:bg-sequoia-green/90">
                    <MapPin className="w-4 h-4 mr-2" />
                    Como Chegar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

