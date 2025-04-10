"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { AnimatedSquares } from "./animated-squares"
import { Allerta as Kepler_Std } from "next/font/google"
import { Button } from "@/components/ui/button"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { StatCard } from "@/components/ui/stat-card"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { FeatureCard } from "@/components/ui/feature-card"
import { AuthForm } from "@/components/auth/auth-form"
import { PatientDashboard } from "@/components/patient/dashboard"
import { ProviderDashboard } from "@/components/provider/dashboard"
import { Calendar, Smartphone, Clock, Shield, PhoneCall, Users, ChevronDown, ArrowRight } from "lucide-react"

const keplerStd = Kepler_Std({
  weight: "300",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
})

const features = [
  {
    icon: Calendar,
    title: "Histórico Virtual da Alta Qualidade",
    description: "Mantenha todos os seus registros médicos organizados e acessíveis em um só lugar.",
    color: "rgb(195, 198, 199)",
  },
  {
    icon: Smartphone,
    title: "Histórico Médico Organizado",
    description: "Acesse seu histórico médico completo a qualquer momento, de qualquer lugar.",
    color: "rgb(27, 55, 100)",
  },
  {
    icon: Clock,
    title: "Agendamento Simplificado",
    description: "Marque consultas com poucos cliques e receba lembretes automáticos.",
    color: "rgb(35, 38, 90)",
  },
  {
    icon: Shield,
    title: "Plano de Bem-Estar",
    description: "Receba recomendações personalizadas para melhorar sua saúde.",
    color: "rgb(164, 14, 32)",
  },
  {
    icon: PhoneCall,
    title: "Atendimento 24/7",
    description: "Suporte médico disponível a qualquer hora do dia ou da noite.",
    color: "rgb(229, 70, 39)",
  },
  {
    icon: Users,
    title: "Apoio Familiar",
    description: "Gerencie a saúde de toda sua família em uma única plataforma.",
    color: "rgb(253, 133, 30)",
  },
]

const stats = [
  { number: "98%", label: "Satisfação dos Pacientes", color: "rgb(27, 55, 100)" },
  { number: "24/7", label: "Suporte Disponível", color: "rgb(164, 14, 32)" },
  { number: "15min", label: "Tempo Médio de Resposta", color: "rgb(253, 133, 30)" },
]

const testimonials = [
  {
    quote:
      "A Sequoia Health transformou completamente a maneira como cuido da minha saúde. É incrível ter tudo integrado em uma só plataforma.",
    author: "Maria Silva",
    role: "Usuária há 2 anos",
  },
  {
    quote: "O atendimento é excepcional e a facilidade de uso da plataforma me surpreende a cada dia.",
    author: "João Santos",
    role: "Usuário há 1 ano",
  },
  {
    quote: "Consegui organizar toda a saúde da minha família de forma simples e eficiente.",
    author: "Ana Oliveira",
    role: "Usuária há 6 meses",
  },
]

export function MainPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"patient" | "provider" | null>(null)
  const lastScrollY = useRef(0)
  const { scrollY } = useScroll()

  // Header show/hide logic
  useEffect(() => {
    return scrollY.onChange((current) => {
      if (current > lastScrollY.current && current > 100) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }
      lastScrollY.current = current
    })
  }, [scrollY])

  // Simulated login function (replace with actual authentication logic)
  const handleLogin = (role: "patient" | "provider") => {
    setIsLoggedIn(true)
    setUserRole(role)
    setShowAuthForm(false)
  }

  if (isLoggedIn) {
    return userRole === "patient" ? <PatientDashboard /> : <ProviderDashboard />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHeaderVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Express%20Oct%2027%20Screenshot-6ZhBsRXUPcypJytUGb3uBpbFStD5pZ.png"
                alt="Sequoia Tree"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              <h1 className="text-3xl tracking-tighter">
                <span className={`${keplerStd.className} font-light text-[#2ecc71]`}>Sequoia</span>
                <span className="font-sans font-bold text-[#a24f1b]">Health</span>
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/sobre" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                Sobre
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2ecc71] transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
              <Link href="/consultas" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                Consultas
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2ecc71] transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
              <button
                onClick={() => setShowAuthForm(true)}
                className="text-gray-600 hover:text-gray-900 transition-colors relative group"
              >
                Entrar
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2ecc71] transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </button>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-bold mb-4 leading-tight"
            >
              Sua Saúde.
              <br />
              Simplificada.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl mb-8 text-gray-200"
            >
              Cuidados de saúde acessíveis e fáceis de usar. Conecte-se com médicos e especialistas em segundos.
              Gerencie sua saúde com facilidade e eficiência.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4"
            >
              <Button
                className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-8 py-6 rounded-full text-lg
                          transform hover:scale-105 transition-all duration-300"
                onClick={() => setShowAuthForm(true)}
              >
                Comece Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-6 rounded-full text-lg
                          backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                Saiba Mais
              </Button>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </motion.div>
      </section>

      {/* Auth Form Modal */}
      {showAuthForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => setShowAuthForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <AuthForm onLogin={handleLogin} />
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ParallaxSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Recursos que Facilitam sua Vida</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Desenvolvemos ferramentas intuitivas para tornar o cuidado com a saúde mais simples e eficiente.
              </p>
            </div>
          </ParallaxSection>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <ParallaxSection offset={100}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold mb-6 text-gray-900">Sua Saúde na Palma da Mão</h3>
                <p className="text-xl text-gray-600 mb-8">
                  Com o aplicativo Sequoia Health, você tem acesso a todos os seus dados médicos, agendamentos e
                  recursos de saúde em um só lugar. Simples, seguro e sempre com você.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6 py-4">
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4QFpc1wOqFozsVJnxl96o-jMA_BiUXCMKg&s"
                      alt="App Store"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    App Store
                  </Button>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6 py-4">
                    <Image
                      src="https://www.logo.wine/a/logo/Google_Play/Google_Play-Icon-Logo.wine.svg"
                      alt="Play Store"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    Play Store
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2ecc71]/20 to-[#a24f1b]/20 rounded-3xl transform rotate-6" />
                <Image
                  src="https://images.unsplash.com/photo-1580828544055-92ee5fa33c8e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="App Preview"
                  width={400}
                  height={600}
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ParallaxSection>
            <h3 className="text-4xl font-bold text-center mb-16 text-gray-900">O Que Nossos Usuários Dizem</h3>
          </ParallaxSection>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2ecc71] to-[#a24f1b] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <ParallaxSection>
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-4xl font-bold mb-6 text-gray-900">Comece Sua Jornada de Saúde Hoje</h3>
              <p className="text-xl text-gray-600 mb-8">
                Junte-se a milhares de pessoas que já transformaram sua forma de cuidar da saúde com a Sequoia Health.
              </p>
              <Button
                className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-8 py-6 rounded-full text-lg
                          transform hover:scale-105 transition-all duration-300"
              >
                Criar Conta Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4c3d33] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Express%20Oct%2027%20Screenshot-6ZhBsRXUPcypJytUGb3uBpbFStD5pZ.png"
                  alt="Sequoia Tree"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <h4 className="text-xl">
                  <span className={`${keplerStd.className} font-light`}>Sequoia</span>
                  <span className="font-bold">Health</span>
                </h4>
              </div>
              <p className="text-gray-400 mb-4">
                Transformando o cuidado com a saúde através da tecnologia e inovação.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/sobre" className="text-gray-400 hover:text-white transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/fale-conosco" className="text-gray-400 hover:text-white transition-colors">
                    Fale Conosco
                  </Link>
                </li>
                <li>
                  <Link href="/trabalhe-conosco" className="text-gray-400 hover:text-white transition-colors">
                    Trabalhe Conosco
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Recursos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/ajuda" className="text-gray-400 hover:text-white transition-colors">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/parceiros" className="text-gray-400 hover:text-white transition-colors">
                    Para Parceiros
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/termos" className="text-gray-400 hover:text-white transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                    Política de Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Sequoia Health. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Background Squares with reduced opacity */}
      <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none">
        <AnimatedSquares />
      </div>
    </div>
  )
}

