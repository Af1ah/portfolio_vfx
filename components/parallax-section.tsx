"use client"

import type React from "react"

import { forwardRef, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
}

const ParallaxSection = forwardRef<HTMLDivElement, ParallaxSectionProps>(({ children, speed = 0.5 }, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  useEffect(() => {
    if (ref && typeof ref === "function") {
      ref(sectionRef.current)
    } else if (ref) {
      ref.current = sectionRef.current
    }
  }, [ref])

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      <motion.div style={{ y }} className="relative">
        {children}
      </motion.div>
    </div>
  )
})

ParallaxSection.displayName = "ParallaxSection"

export default ParallaxSection

