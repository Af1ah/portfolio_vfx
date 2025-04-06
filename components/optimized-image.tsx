"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  placeholderSrc?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholderSrc
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Extract base URL without transformations for error fallback
  const baseUrl = src.split('?')[0]

  useEffect(() => {
    const img = new window.Image()
    img.src = src
    img.onload = () => setIsLoading(false)
    img.onerror = () => setError(true)
  }, [src])

  if (error) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <span className="text-sm text-gray-500">Image failed to load</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && placeholderSrc && (
        <Image
          src={placeholderSrc}
          alt={`${alt} placeholder`}
          fill
          className="object-cover blur-sm"
          unoptimized
        />
      )}
      <Image
        src={isLoading && placeholderSrc ? placeholderSrc : src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  )
}