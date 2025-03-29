"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Mail, MapPin, Phone, Menu, Moon, Sun, X, Clock } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import ActiveLink from "@/components/active-link"

export function AboutClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter" aria-label="Studio Home">
            Echomorph FX<span className="text-primary">.</span>
          </Link>

          {/* Desktop Navigation */}
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
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 dark:hidden" aria-hidden="true" />
              <Moon className="h-5 w-5 hidden dark:block" aria-hidden="true" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed inset-0 z-50 bg-background flex flex-col p-8"
        >
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex flex-col items-center justify-center space-y-8 flex-grow text-2xl">
            <ActiveLink href="/" onClick={() => setIsMenuOpen(false)}>Home</ActiveLink>
            <ActiveLink href="/portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</ActiveLink>
            <ActiveLink href="/about" onClick={() => setIsMenuOpen(false)}>About</ActiveLink>
            <ActiveLink href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</ActiveLink>
            <ActiveLink href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</ActiveLink>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/" aria-label="Back to home page">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A passionate visual storyteller specializing in poster design and visual effects
            </p>
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Story */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">My Story</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  With over a decade of experience in visual design and effects, I've dedicated my career
                  to creating compelling visual narratives that captivate and inspire. My journey began
                  with a passion for traditional art and evolved into a mastery of digital mediums.
                </p>
                <p>
                  I believe in the power of visual storytelling to communicate complex ideas and evoke
                  emotional responses. Each project is an opportunity to push boundaries and create
                  something unique that resonates with its audience.
                </p>
                <p>
                  My work spans across various mediums, from digital posters to motion graphics,
                  always maintaining a focus on quality, innovation, and attention to detail.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Skills & Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Skills */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Skills</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Poster Design",
                    "Visual Effects",
                    "Motion Graphics",
                    "3D Modeling",
                    "Color Theory",
                    "Typography",
                    "Digital Art",
                    "Brand Identity",
                  ].map((skill, index) => (
                    <div
                      key={index}
                      className="bg-card p-4 rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      <p className="font-medium">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Contact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                        <a href="mailto:kannanvfx@gmail.com" className="hover:text-primary transition-colors">
                          echomorph10@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                        <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                          +91 6238932784
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                        <span>Malappuram,Kerala</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                        <span>IST (UTC+5:30)</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button size="lg" asChild className="w-full">
                    <Link href="/contact" aria-label="Start a new project">Start a Project</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="container mx-auto px-4 py-16 bg-muted/30">
          <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                year: "2020 - Present",
                title: "Senior Visual Designer",
                company: "Creative Studio",
                description: "Leading visual design projects and mentoring junior designers.",
              },
              {
                year: "2018 - 2020",
                title: "Visual Effects Artist",
                company: "Digital Productions",
                description: "Creating high-end visual effects for commercials and films.",
              },
              {
                year: "2015 - 2018",
                title: "Graphic Designer",
                company: "Design Agency",
                description: "Designing posters and branding materials for various clients.",
              },
            ].map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg border border-border"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{experience.title}</h3>
                    <p className="text-muted-foreground">{experience.company}</p>
                  </div>
                  <span className="text-primary font-medium">{experience.year}</span>
                </div>
                <p className="mt-4 text-muted-foreground">{experience.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}