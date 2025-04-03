"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import ActiveLink from "@/components/active-link"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Close menu when switching to desktop
    if (!isMobile) {
      setIsMenuOpen(false)
    }
    
    // Prevent scrolling when menu is open on mobile
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobile, isMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          Ecomorph FX<span className="text-primary">.</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/portfolio">Portfolio</ActiveLink>
          <ActiveLink href="/about">About</ActiveLink>
          <ActiveLink href="/contact">Contact</ActiveLink>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </Button>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-full"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu - note that we've removed the conditional rendering based on isMobile here */}
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  )
}