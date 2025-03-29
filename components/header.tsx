import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import ActiveLink from "@/components/active-link"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
           Echomorph FX<span className="text-primary">.</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/portfolio">Portfolio</ActiveLink>
          <ActiveLink href="/about">About</ActiveLink>
          <ActiveLink href="/contact">Contact</ActiveLink>
          <ActiveLink href="/blog">Blog</ActiveLink>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const theme = document.documentElement.classList.contains("dark") ? "light" : "dark"
              document.documentElement.classList.toggle("dark")
              localStorage.setItem("theme", theme)
            }}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </Button>
        </div>
      </div>
    </header>
  )
}