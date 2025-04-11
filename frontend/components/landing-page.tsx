"use client"

import { useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { AnimatedSquares } from "./animated-squares"
import { ArrowRight } from "lucide-react"
import { Allerta as Kepler_Std } from "next/font/google"

const keplerStd = Kepler_Std({
  weight: "300",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
})

export function LandingPage({ onExperienceCare }: { onExperienceCare: () => void }) {
  const [isArrowAnimating, setIsArrowAnimating] = useState(false)
  const arrowControls = useAnimation()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleExperienceCare = async () => {
    setIsArrowAnimating(true)
    await arrowControls.start({ x: buttonRef.current?.offsetWidth || 0, opacity: 0 })
    onExperienceCare()
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <AnimatedSquares />

      <div className="absolute inset-0 backdrop-blur-lg bg-white/20" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 md:px-6 text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex items-center"
          >
            <Image
              src="https://png.pngtree.com/png-clipart/20240909/original/pngtree-adult-giant-sequoia-tree-png-image_15970000.png"
              alt="Sequoia Tree"
              width={80}
              height={120}
              className="mr-4"
            />
            <h1 className="text-5xl sm:text-7xl md:text-8xl tracking-tighter">
              <span className={`${keplerStd.className} font-light text-[#2ecc71] text-shadow`}>Sequoia</span>
              <span className="font-sans font-bold text-[#a24f1b] text-shadow">Health</span>
            </h1>
          </motion.div>
        </div>

        <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            ref={buttonRef}
            variant="ghost"
            className="rounded-full px-8 py-6 text-lg font-semibold 
                      bg-white/70 hover:bg-white/90 text-[#2c4a2c] transition-all duration-300 
                      border border-[#2c4a2c]/10 hover:border-[#2c4a2c]/20
                      shadow-lg hover:shadow-xl relative overflow-hidden"
            onClick={handleExperienceCare}
            disabled={isArrowAnimating}
          >
            <motion.span
              className="absolute left-4 text-white drop-shadow-md"
              animate={arrowControls}
              initial={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ArrowRight size={24} />
            </motion.span>
            <span className="ml-8">Experience Care</span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

