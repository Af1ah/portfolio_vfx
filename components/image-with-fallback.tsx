"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number,
}

export default function ImageWithFallback({
  src,
  alt,
  className = "",
  width,
  height,
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  return (
    <div className="relative">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
        >
          <Skeleton className="w-full h-full" />
        </motion.div>
      )}
      
      {error ? (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
            className="text-muted-foreground"
          >
            Image not available
          </motion.div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  )
} 