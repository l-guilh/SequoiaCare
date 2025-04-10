"use client"

import { motion } from "framer-motion"

const squares = [
  { color: "rgb(195, 198, 199)", initialRotate: -45 },
  { color: "rgb(27, 55, 100)", initialRotate: -90 },
  { color: "rgb(35, 38, 90)", initialRotate: -135 },
  { color: "rgb(164, 14, 32)", initialRotate: 180 },
  { color: "rgb(229, 70, 39)", initialRotate: 135 },
  { color: "rgb(253, 133, 30)", initialRotate: 90 },
  { color: "rgb(18, 75, 88)", initialRotate: 45 },
]

export function AnimatedSquares() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {squares.map((square, index) => {
          const radius = 18
          const angle = square.initialRotate * (Math.PI / 180)
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.div
              key={index}
              className="absolute w-96 h-96 rounded-[3rem] origin-center"
              style={{
                backgroundColor: square.color,
                opacity: 0.7,
                left: "50%",
                top: "50%",
                x: `-50%`,
                y: `-50%`,
                rotate: square.initialRotate,
              }}
              initial={{
                x: `calc(-50% + ${x}vw)`,
                y: `calc(-50% + ${y}vh)`,
              }}
              animate={{
                x: [`calc(-50% + ${x}vw)`, `calc(-50% + ${x * 1.1}vw)`, `calc(-50% + ${x}vw)`],
                y: [`calc(-50% + ${y}vh)`, `calc(-50% + ${y * 1.1}vh)`, `calc(-50% + ${y}vh)`],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: index * 0.2,
              }}
            />
          )
        })}
      </motion.div>
    </div>
  )
}

