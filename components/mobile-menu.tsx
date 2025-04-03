"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"

interface MobileMenuProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

export function MobileMenu({ isMenuOpen, setIsMenuOpen }: MobileMenuProps) {
  if (!isMenuOpen) return null
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed inset-0 z-50 flex flex-col bg-black"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
        <div className="text-xl font-bold tracking-tight text-white">
          Ecomorph FX<span className="text-rose-500">.</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          className="text-white hover:bg-neutral-800 rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Menu content */}
      <div className="flex-1 flex flex-col justify-center px-6 bg-black">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.href}
            variants={itemVariants}
            className="py-4 border-b border-neutral-800/50 last:border-0"
          >
            <Link
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-2xl font-medium text-white hover:text-rose-500 transition-colors duration-200"
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Footer with CTA */}
      <div className="p-6 flex flex-col gap-4 bg-black">
        <Link
          href="/contact"
          onClick={() => setIsMenuOpen(false)}
          className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white text-center rounded-md font-medium transition-colors duration-200"
        >
          Get in Touch
        </Link>
        <p className="text-neutral-400 text-sm text-center">
          Creative Visual Storytelling
        </p>
      </div>
    </motion.div>
  )
}