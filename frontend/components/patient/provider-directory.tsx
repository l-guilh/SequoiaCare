"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, MapPin, Languages, GraduationCap, Video, Building2, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const providerData = [
  {
    id: 1,
    name: "Dra. Ana Silva",
    specialty: "Cardiologia",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    languages: ["Português", "Inglês", "Espanhol"],
    education: "Harvard Medical School",
    location: "São Paulo, SP",
    availability: ["Hoje 14:00", "Amanhã 10:00", "Sex 16:00"],
    telemedicine: true,
    inPerson: true,
  },
  {
    id: 2,
    name: "Dr. Carlos Santos",
    specialty: "Dermatologia",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    languages: ["Português", "Inglês"],
    education: "USP Medical School",
    location: "Rio de Janeiro, RJ",
    availability: ["Hoje 15:30", "Qui 09:00", "Sex 14:00"],
    telemedicine: true,
    inPerson: true,
  },
  {
    id: 3,
    name: "Dra. Mariana Oliveira",
    specialty: "Pediatria",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop",
    languages: ["Português", "Francês"],
    education: "UFRJ Medical School",
    location: "Curitiba, PR",
    availability: ["Amanhã 09:00", "Qui 15:00", "Sex 10:00"],
    telemedicine: true,
    inPerson: false,
  },
]

export function ProviderDirectory({ onSelectProvider }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const specialties = ["all", ...new Set(providerData.map((provider) => provider.specialty))]

  const filteredProviders = providerData.filter(
    (provider) =>
      (provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSpecialty === "all" || provider.specialty === selectedSpecialty),
  )

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-white via-sequoia-sage/5 to-sequoia-green/5">
      <div className="relative space-y-6 px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="sticky top-0 z-10 backdrop-blur-sm bg-white/60 p-4 rounded-xl shadow-sm"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Buscar por nome ou especialidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 border-0 shadow-sm"
              />
            </div>
            <div className="relative min-w-[200px]">
              <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-md shadow-sm">
                <Filter size={18} className="text-gray-400" />
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="bg-transparent border-0 focus:ring-0 text-gray-600 w-full"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty === "all" ? "Todas Especialidades" : specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="grid gap-4">
            <AnimatePresence>
              {mounted &&
                filteredProviders.map((provider, index) => (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link href={`/provider-directory/${provider.id}`}>
                      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md bg-white/70 backdrop-blur-sm border-0">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative w-20 h-20 mx-auto md:mx-0">
                              <Image
                                src={provider.photo || "/placeholder.svg"}
                                alt={provider.name}
                                fill
                                className="rounded-lg object-cover shadow-sm"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-2">
                                <div className="text-center md:text-left">
                                  <h3 className="text-lg font-medium text-gray-900">{provider.name}</h3>
                                  <p className="text-sequoia-green">{provider.specialty}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  {provider.telemedicine && (
                                    <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-2 py-1 rounded-md text-sm">
                                      <Video className="w-4 h-4" />
                                      <span>Online</span>
                                    </div>
                                  )}
                                  {provider.inPerson && (
                                    <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-2 py-1 rounded-md text-sm">
                                      <Building2 className="w-4 h-4" />
                                      <span>Presencial</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4 text-sequoia-green" />
                                  <span>{provider.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Languages className="w-4 h-4 text-sequoia-green" />
                                  <span>{provider.languages.join(", ")}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <GraduationCap className="w-4 h-4 text-sequoia-green" />
                                  <span>{provider.education}</span>
                                </div>
                              </div>
                              <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                  {provider.availability.map((slot, index) => (
                                    <button
                                      key={index}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        onSelectProvider(provider, slot)
                                      }}
                                      className="px-3 py-1 text-sm bg-sequoia-green/10 text-sequoia-green rounded-md 
                                               hover:bg-sequoia-green hover:text-white transition-colors duration-200"
                                    >
                                      {slot}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

