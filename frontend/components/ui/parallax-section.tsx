"use client"

import type React from "react"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

interface ParallaxSectionProps {
  children: React.ReactNode
  offset?: number
}

export function ParallaxSection({ children, offset = 50 }: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

