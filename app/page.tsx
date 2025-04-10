"use client"

// Remove the Navigation component and its imports since we're now using the shared Header
import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Remove Navigation component and update the Home component
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <TechShowcase />
      <AppShowcase />
      <Footer />
    </div>
  )
}

const Hero = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-sequoia-dark">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1526485856375-9110812fbf35?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="SequoiaHealth Hero"
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
          Viva Do Seu Jeito
        </motion.h1>
        <motion.p
          className="text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Sem jalecos, sem suspense de hospital. Só você e Sequoia. Elegância na praticidade.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/auth">
            <Button className="bg-white text-sequoia-dark px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
              Junte ao novo
            </Button>
          </Link>
        </motion.div>
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
  )
}

const Feature = ({
  title,
  description,
  icon: Icon,
  image,
  index,
}: {
  title: string
  description: string
  icon: LucideIcon
  image: string
  index: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col md:flex-row items-center text-center md:text-left gap-8"
    >
      <div className="md:w-1/2">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={500}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2">
        <div className="bg-sequoia-accent/10 rounded-full p-4 mb-4 inline-block">
          <Icon className="w-8 h-8 text-sequoia-accent" />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-sequoia-dark">{title}</h3>
        <p className="text-sequoia-text text-lg">{description}</p>
      </div>
    </motion.div>
  )
}

const Features = () => {
  return (
    <section id="recursos" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1640620963581-8c6a66d09c9b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Sequoia Forest"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="pl-0 md:pl-0 lg:pl-0"
          >
            <p
              className="font-serif text-[1.5rem] md:text-[1.5rem] lg:text-[2.5rem] text-black leading-[1.2] tracking-tighter mb-8 transform scale-x-[0.8] -ml-12"
              style={{
                fontFamily: "'Adobe Garamond Pro', Garamond, 'Times New Roman', serif",
                letterSpacing: "-0.025em",
              }}
            >
              Sem regras. Curtindo.
            </p>
            <p
              className="text-xl text-grey/90 font-light tracking-wide"
              style={{ fontFamily: "Garamond, Times New Roman, serif" }}
            ></p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const TechShowcase = () => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  return (
    <section className="py-20 bg-sequoia-dark text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Tecnologia de Ponta</h2>
          <p className="text-xl text-sequoia-light">Impulsionando sua jornada de saúde com inovação</p>
        </motion.div>
        <div className="relative h-[600px]">
          <motion.div className="absolute inset-0 flex items-center justify-center" style={{ scale }}>
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
              alt="SequoiaHealth Technology"
              width={800}
              height={600}
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const AppShowcase = () => {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1498747946579-bde604cb8f44?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Technology Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:col-start-2">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2
                  className="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight"
                  style={{
                    fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
                    fontWeight: 800,
                  }}
                >
                  Seguro onde estiver
                  <br />
                </h2>
                <p
                  className="text-xl text-white/90 mb-8 leading-relaxed"
                  style={{ fontFamily: "-apple-system, 'SF Pro Text', sans-serif" }}
                >
                  Paredes brancas e jalecos, opcionais.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/90 transition-colors">
                    Descubra mais
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const Footer = () => (
  <footer className="bg-sequoia-dark text-white py-12">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg mb-4">
            <span className="font-light">Sequoia</span>
            <span className="font-semibold">Health</span>
          </h3>
          <p className="text-sequoia-light">Inovando para um amanhã mais saudável</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
          <ul className="space-y-2">
            {["Início", "Sobre", "Recursos", "Médicos", "Suporte"].map((item) => (
              <li key={item}>
                <Link href={`#${item.toLowerCase()}`} className="text-sequoia-light hover:text-white transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Conecte-se</h4>
          <ul className="space-y-2">
            {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((item) => (
              <li key={item}>
                <a href="#" className="text-sequoia-light hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Fique Atualizado</h4>
          <form className="flex">
            <Input
              type="email"
              placeholder="Seu email"
              className="rounded-l-lg bg-sequoia-light text-sequoia-dark focus:outline-none focus:ring-2 focus:ring-sequoia-accent"
            />
            <Button className="bg-sequoia-accent text-white rounded-r-lg hover:bg-sequoia-accent/90 transition-colors">
              Inscrever-se
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-sequoia-light/20 text-center text-sequoia-light">
        <p>
          &copy; {new Date().getFullYear()} <span className="font-light">Sequoia</span>
          <span className="font-semibold">Health</span> Inc. Todos os direitos reservados. Projetado na Califórnia.
        </p>
        <p className="mt-2 text-sm">
          <span className="font-light">Sequoia</span>
          <span className="font-semibold">Health</span>, o logotipo <span className="font-light">Sequoia</span>
          <span className="font-semibold">Health</span> e outras marcas <span className="font-light">Sequoia</span>
          <span className="font-semibold">Health</span> são marcas registradas da{" "}
          <span className="font-light">Sequoia</span>
          <span className="font-semibold">Health</span> Inc. Revolucionando a saúde, um byte de cada vez.
        </p>
      </div>
    </div>
  </footer>
)

