"use client"

import { useEffect, useState } from "react"
import CustomLoader from "@/components/custom-loader"

export default function Loading() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000) // Minimum 3s display time
    return () => clearTimeout(timer)
  }, [])

  if (!showLoader) return null

  return <CustomLoader />
}
