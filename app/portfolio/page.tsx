"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Mail, MapPin, Phone, Instagram, Linkedin, Twitter, Loader2, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import PageTransition from "@/components/page-transition"
import AnimatedCursor from "@/components/animated-cursor"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Message sent successfully!")
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        const message = errorData.error || "Unknown error occurred"
        setErrorMessage(message)
        setSubmitStatus('error')
        toast.error(`Failed to send message: ${message}`)
      }
    } catch (error) {
      console.error("Submission error:", error)
      setErrorMessage("Network error occurred while sending the message")
      setSubmitStatus('error')
      toast.error("An error occurred while sending the message.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Reset status when user starts typing again
    if (submitStatus) setSubmitStatus(null)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  const statusVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <PageTransition>
        <div className="pt-20">
          <AnimatedCursor />
          
          {/* Back Button */}
          <motion.div 
            className="container mx-auto px-4 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="ghost" asChild className="gap-2 hover:bg-primary/10 transition-colors">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Let's discuss your next project and bring your vision to life
              </p>
            </motion.div>
          </section>

          {/* Contact Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-card p-8 rounded-lg border border-border shadow-sm"
              >
                <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8">Send a Message</motion.h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="transition-all focus:ring-2 focus:ring-primary/30"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="transition-all focus:ring-2 focus:ring-primary/30"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="transition-all focus:ring-2 focus:ring-primary/30"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Enter subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="transition-all focus:ring-2 focus:ring-primary/30"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[150px] transition-all focus:ring-2 focus:ring-primary/30"
                    />
                  </motion.div>

                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        key="success"
                        variants={statusVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 flex items-center gap-3"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <p className="text-green-800 dark:text-green-200">Message sent successfully! We'll get back to you soon.</p>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        key="error"
                        variants={statusVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 flex items-center gap-3"
                      >
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <p className="text-red-800 dark:text-red-200">{errorMessage || "Failed to send message. Please try again."}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div variants={itemVariants}>
                    <Button 
                      type="submit" 
                      className="w-full transition-all hover:shadow-md" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Contact Details */}
                <motion.div
                  variants={itemVariants}
                  className="bg-card p-8 rounded-lg border border-border shadow-sm"
                >
                  <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a 
                          href="mailto:echomorph10@gmail.com" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          echomorph10@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a 
                          href="tel:+916238932784" 
                          className="text-muted-foreground hover:text-primary transition-colors" 
                        >
                          +91 6238932784
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-muted-foreground">
                          Malappuram, Kerala
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  variants={itemVariants}
                  className="bg-card p-8 rounded-lg border border-border shadow-sm"
                >
                  <h2 className="text-3xl font-bold mb-8">Connect With Me</h2>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
                      aria-label="Follow on Instagram"
                    >
                      <Instagram className="h-6 w-6" aria-hidden="true" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
                      aria-label="Connect on LinkedIn"
                    >
                      <Linkedin className="h-6 w-6" aria-hidden="true" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
                      aria-label="Follow on Twitter"
                    >
                      <Twitter className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>
                </motion.div>

                {/* Business Hours */}
                <motion.div
                  variants={itemVariants}
                  className="bg-card p-8 rounded-lg border border-border shadow-sm"
                >
                  <h2 className="text-3xl font-bold mb-8">Business Hours</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Monday - Friday: 10:00 AM - 7:00 PM</p>
                    <p>Saturday: 11:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </div>
      </PageTransition>
    </div>
  )
}