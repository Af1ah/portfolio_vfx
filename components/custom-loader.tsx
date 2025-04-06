"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

export default function CustomLoader() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start("visible")
    return () => controls.stop()
  }, [controls])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 border-2 border-primary rounded-full"
            variants={{
              hidden: { scale: 0, opacity: 1 },
              visible: {
                scale: [0, 1, 0.8],
                opacity: [1, 0.5, 0],
                transition: {
                  duration: 1,
                  repeat: 1,
                  ease: "easeInOut"
                }
              }
            }}
            initial="hidden"
            animate={controls}
          />
        </div>
        <motion.p
          className="mt-4 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  )
}

