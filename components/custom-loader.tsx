"use client"

import { motion } from "framer-motion"

export default function CustomLoader() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 border-4 border-primary rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 1.2, 1],
              opacity: [1, 0.8, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-primary rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 1.2, 1],
              opacity: [1, 0.8, 0, 0],
            }}
            transition={{
              duration: 2,
              delay: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
        <motion.p
          className="mt-4 text-xl font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            ...
          </motion.span>
        </motion.p>
      </motion.div>
    </div>
  )
}

