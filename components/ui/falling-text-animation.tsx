"use client"

import type React from "react"
import { motion } from "framer-motion"

interface FallingTextAnimationProps {
  text: string
}

export const FallingTextAnimation: React.FC<FallingTextAnimationProps> = ({ text }) => {
  const characters = Array.from(text)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 * i },
    }),
  }

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 120,
        duration: 2, // Slow down the animation
      },
    },
    hidden: {
      opacity: 0,
      y: -50,
      filter: "blur(10px)", // Apply blur when hidden
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 120,
      },
    },
  }

  return (
    <motion.h2
      className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span key={`${char}-${index}`} variants={childVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>
  )
}
