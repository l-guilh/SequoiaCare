/// <reference types="react" />

"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { ChevronDown, Globe, Lightbulb, TreePine, Heart, Shield, Target } from "lucide-react"
import { Header } from "@/components/ui/header"

export default function AboutPage() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50">
        <Header />
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-sequoia-dark">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1635184475512-1262d24309c2?q=80&w=3270&auto=format&fit=crop"
            alt="Floresta de Sequoias"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-sequoia-dark/60 to-sequoia-dark/20" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1
            className="text-5xl sm:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nossa História
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transformando o futuro da saúde através da inovação e cuidado humano
          </motion.p>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ChevronDown className="text-white w-8 h-8 animate-bounce" />
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="bg-white">
        {/* Vision Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-sequoia-dark">Nossa Visão</h2>
              <p className="text-xl text-sequoia-text leading-relaxed mb-12">
                Imaginamos um mundo onde a saúde não é apenas uma meta, mas uma jornada intuitiva e personalizada.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-sequoia-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-sequoia-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-sequoia-dark">Cuidado Humanizado</h3>
                  <p className="text-sequoia-text">Tecnologia que amplifica, nunca substitui, o toque humano.</p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-sequoia-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-sequoia-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-sequoia-dark">Privacidade Absoluta</h3>
                  <p className="text-sequoia-text">Seus dados, sua propriedade. Sempre.</p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-sequoia-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-sequoia-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-sequoia-dark">Precisão Inigualável</h3>
                  <p className="text-sequoia-text">Tecnologia de ponta a serviço da sua saúde.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-12 text-center text-sequoia-dark">Nossa Jornada</h2>
              <div className="space-y-16">
                <motion.div
                  className="flex flex-col md:flex-row items-center gap-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="md:w-1/2">
                    <Image
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=3270&auto=format&fit=crop"
                      alt="Início da Sequoia Health"
                      width={500}
                      height={300}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4 text-sequoia-dark">2020: O Início</h3>
                    <p className="text-sequoia-text leading-relaxed">
                      Nascemos da visão de que a saúde poderia ser mais do que procedimentos e consultas.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col md:flex-row-reverse items-center gap-8"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="md:w-1/2">
                    <Image
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=3270&auto=format&fit=crop"
                      alt="Primeira Plataforma"
                      width={500}
                      height={300}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4 text-sequoia-dark">2021: A Primeira Plataforma</h3>
                    <p className="text-sequoia-text leading-relaxed">
                      Lançamos nossa primeira plataforma, revolucionando a forma como as pessoas interagem com sua
                      saúde. Simplicidade encontra sofisticação.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col md:flex-row items-center gap-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="md:w-1/2">
                    <Image
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=3270&auto=format&fit=crop"
                      alt="Expansão Global"
                      width={500}
                      height={300}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4 text-sequoia-dark">2022: Expansão Global</h3>
                    <p className="text-sequoia-text leading-relaxed">
                      Nossa visão ultrapassou fronteiras. A saúde não conhece limites geográficos. Nossa tecnologia
                      também não.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col md:flex-row-reverse items-center gap-8"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="md:w-1/2">
                    <Image
                      src="https://images.unsplash.com/photo-1587936661097-4cb30d324a6d?q=80&w=3270&auto=format&fit=crop"
                      alt="Inovação Contínua"
                      width={500}
                      height={300}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4 text-sequoia-dark">2023: Inovação Contínua</h3>
                    <p className="text-sequoia-text leading-relaxed">
                      Introduzimos inteligência artificial avançada e aprendizado de máquina. Não para substituir, mas
                      para amplificar o cuidado humano.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 bg-sequoia-dark text-white overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Nossa Tecnologia</h2>
              <p className="text-xl text-sequoia-light">Inovação que transforma vidas</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3270&auto=format&fit=crop"
                  alt="IA Avançada"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg mb-6"
                />
                <h3 className="text-2xl font-bold mb-4">IA Avançada</h3>
                <p className="text-sequoia-light leading-relaxed">
                  Nossa IA não é apenas inteligente; é compreensiva. Aprende com cada interação para oferecer cuidados
                  personalizados.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=3270&auto=format&fit=crop"
                  alt="Privacidade"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg mb-6"
                />
                <h3 className="text-2xl font-bold mb-4">Privacidade por Design</h3>
                <p className="text-sequoia-light leading-relaxed">
                  Segurança não é uma camada adicional; é o fundamento. Cada bit de dados é protegido com criptografia
                  avançada.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <ParallaxSection>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-center text-sequoia-green">Nosso Impacto</h2>
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-sequoia-green mb-2">1M+</div>
                    <p className="text-gray-600">Vidas Impactadas</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-sequoia-green mb-2">50+</div>
                    <p className="text-gray-600">Países Alcançados</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-sequoia-green mb-2">98%</div>
                    <p className="text-gray-600">Satisfação dos Usuários</p>
                  </div>
                </div>
                <div className="space-y-12">
                  <div className="bg-gray-50 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4">Transformando Vidas</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Cada número representa uma história. Uma vida transformada. Um futuro mais saudável. Nossa
                      tecnologia não apenas monitora a saúde; ela capacita pessoas a viverem melhor.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4">Impacto Ambiental</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Assim como as sequoias são guardiãs do meio ambiente, nossa tecnologia reduz o impacto ambiental
                      da saúde. Menos papel, menos deslocamentos, mais eficiência.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4">Democratizando o Acesso</h3>
                    <p className="text-gray-700 leading-relaxed">
                      A saúde de qualidade não deve ser um privilégio. Nossa tecnologia torna o cuidado especializado
                      acessível a todos, em qualquer lugar.
                    </p>
                  </div>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-6">
            <ParallaxSection>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-center text-sequoia-green">Inovação Constante</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <Image
                      src="https://images.unsplash.com/photo-1581093458791-9d58e17a3576?q=80&w=3270&auto=format&fit=crop"
                      alt="Research Lab"
                      width={500}
                      height={300}
                      className="rounded-lg shadow-lg mb-6"
                    />
                    <h3 className="text-2xl font-bold mb-4">Pesquisa e Desenvolvimento</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nossa equipe de cientistas e pesquisadores trabalha incansavelmente para desenvolver novas
                      soluções. Cada avanço é um passo em direção a um futuro mais saudável.
                    </p>
                  </div>
                  <div>
                    <Image
                      src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=3270&auto=format&fit=crop"
                      alt="Innovation Lab"
                      width={500}
                      height={300}
                      className="rounded-lg shadow-lg mb-6"
                    />
                    <h3 className="text-2xl font-bold mb-4">Laboratório de Inovação</h3>
                    <p className="text-gray-700 leading-relaxed">
                      No nosso laboratório de inovação, as ideias mais ousadas ganham vida. Aqui, o futuro da saúde é
                      imaginado e construído, um projeto de cada vez.
                    </p>
                  </div>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <ParallaxSection>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-center text-sequoia-green">Nossa Equipe</h2>
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  <div className="text-center">
                    <Image
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=3270&auto=format&fit=crop"
                      alt="CEO"
                      width={200}
                      height={200}
                      className="rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">Dra. Maria Silva</h3>
                    <p className="text-gray-600">CEO & Fundadora</p>
                  </div>
                  <div className="text-center">
                    <Image
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=3270&auto=format&fit=crop"
                      alt="CTO"
                      width={200}
                      height={200}
                      className="rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">Dr. João Santos</h3>
                    <p className="text-gray-600">Diretor de Tecnologia</p>
                  </div>
                  <div className="text-center">
                    <Image
                      src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=3270&auto=format&fit=crop"
                      alt="CMO"
                      width={200}
                      height={200}
                      className="rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">Dra. Ana Oliveira</h3>
                    <p className="text-gray-600">Diretora Médica</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 leading-relaxed mb-8">
                    Nossa equipe reúne os melhores talentos em medicina, tecnologia e design. Unidos por um propósito:
                    transformar a saúde através da inovação.
                  </p>
                  <Button className="bg-sequoia-green hover:bg-sequoia-green/90 text-white px-8 py-3 rounded-full">
                    Conheça Nossa Equipe
                  </Button>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </section>

        {/* Future Vision Section */}
        <section className="py-24 bg-sequoia-dark text-white">
          <div className="container mx-auto px-6">
            <ParallaxSection>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">O Futuro da Saúde</h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-12">
                  Estamos apenas no começo. Nossa visão se estende muito além do horizonte, onde a tecnologia e o
                  cuidado humano se fundem em uma experiência única e transformadora.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-sequoia-green" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Alcance Global</h3>
                    <p className="text-gray-300">Saúde de qualidade para todos, em qualquer lugar.</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-8 h-8 text-sequoia-green" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Inovação Contínua</h3>
                    <p className="text-gray-300">Sempre um passo à frente, sempre evoluindo.</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TreePine className="w-8 h-8 text-sequoia-green" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Sustentabilidade</h3>
                    <p className="text-gray-300">Cuidando da saúde do planeta também.</p>
                  </div>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-sequoia-dark">Faça Parte da Nossa História</h2>
              <p className="text-xl text-sequoia-text leading-relaxed mb-12">
                Na Sequoia Health, não estamos apenas construindo tecnologia; estamos construindo o futuro da saúde. E
                queremos você conosco nessa jornada.
              </p>
              <Link href="/auth">
                <Button className="bg-sequoia-accent hover:bg-sequoia-accent/90 text-white px-8 py-3 rounded-full text-lg font-semibold">
                  Comece Sua Jornada
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sequoia Health</h3>
              <p className="text-gray-600">Transformando o futuro da saúde.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-sequoia-green">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-sequoia-green">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-sequoia-green">
                    Carreiras
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-sequoia-green">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-sequoia-green">
                    Termos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <p className="text-gray-600">contato@sequoiahealth.com</p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">&copy; 2024 Sequoia Health. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

