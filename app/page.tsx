"use client"

import { useRef, useState, useEffect, Suspense, Component, ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Environment, Float, PresentationControls } from "@react-three/drei"
import { Menu, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import AnimatedCursor from "@/components/animated-cursor"
import Model3D from "@/components/model-3d"
import ParallaxSection from "@/components/parallax-section"
import CustomLoader from "@/components/custom-loader"
import ActiveLink from "@/components/active-link"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { theme, setTheme } = useTheme()
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <CustomLoader />
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <AnimatedCursor />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            STUDIO<span className="text-primary">.</span>
          </Link>

          {/* Replace the navigation links in the header with ActiveLink */}
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
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
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
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Replace the mobile menu links with ActiveLink */}
          <div className="flex flex-col items-center justify-center space-y-8 flex-grow text-2xl">
            <ActiveLink href="/" onClick={() => setIsMenuOpen(false)}>Home</ActiveLink>
            <ActiveLink href="/portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</ActiveLink>
            <ActiveLink href="/about" onClick={() => setIsMenuOpen(false)}>About</ActiveLink>
            <ActiveLink href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</ActiveLink>
            <ActiveLink href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</ActiveLink>
          </div>
        </motion.div>
      )}

      {/* Hero Section with 3D Background */}
      <section className="min-h-screen relative flex items-center pt-20 pb-10">
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <ErrorBoundary fallback={null}>
                <PresentationControls
                  global
                  rotation={[0.13, 0.1, 0]}
                  polar={[-0.4, 0.2]}
                  azimuth={[-1, 0.75]}
                  speed={1.5}
                  zoom={1}
                >
                  <Float rotationIntensity={0.4}>
                    <Model3D />
                  </Float>
                </PresentationControls>
                <Environment preset="city" />
                <fog attach="fog" args={['#000', 5, 30]} />
              </ErrorBoundary>
            </Suspense>
          </Canvas>
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl ml-0 md:ml-8 lg:ml-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 text-left">
              Creative <span className="text-primary">Visual</span> Storytelling
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-left">
              Bringing imagination to life through poster design and visual effects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Button size="lg" asChild>
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Work Section with Parallax */}
      <ParallaxSection ref={parallaxRef}>
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A selection of my most recent and impactful projects in poster design and VFX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[3/4] bg-muted overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=600&width=450`}
                    alt={`Featured work ${item}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Project Title {item}</h3>
                    <p className="text-muted-foreground mb-4">Poster Design / VFX</p>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/portfolio/project-${item}`}>View Project</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button variant="outline" size="lg" asChild>
              <Link href="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </ParallaxSection>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Client Testimonials</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-lg border border-border"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">C{item}</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Client Name {item}</h3>
                    <p className="text-sm text-muted-foreground">Company {item}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Working with this studio was an incredible experience. The creativity and attention to detail
                  exceeded our expectations. The final result was exactly what we needed and more."
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground">
                Subscribe to my newsletter for the latest projects, insights, and creative process
              </p>
            </div>

            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 inline-block">
                STUDIO<span className="text-primary">.</span>
              </Link>
              <p className="text-muted-foreground">Creating visual stories through poster design and VFX artistry.</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Behance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dribbble
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <address className="not-italic text-muted-foreground">
                <p>hello@studio.com</p>
                <p>+1 (555) 123-4567</p>
                <p>New York, NY</p>
              </address>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Studio. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
