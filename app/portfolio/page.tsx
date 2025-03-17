"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Filter, Search, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimatedCursor from "@/components/animated-cursor"
import PageTransition from "@/components/page-transition"
// Add import for ActiveLink at the top
import ActiveLink from "@/components/active-link"

// Sample project data
const projects = [
  { id: 1, title: "Neon Dreams", category: "posters", featured: true },
  { id: 2, title: "Cosmic Voyage", category: "vfx", featured: true },
  { id: 3, title: "Urban Pulse", category: "posters", featured: false },
  { id: 4, title: "Digital Horizon", category: "motion", featured: true },
  { id: 5, title: "Ethereal Landscapes", category: "vfx", featured: false },
  { id: 6, title: "Retro Revival", category: "posters", featured: false },
  { id: 7, title: "Particle Symphony", category: "motion", featured: false },
  { id: 8, title: "Cybernetic Dreams", category: "vfx", featured: true },
  { id: 9, title: "Minimal Expressions", category: "posters", featured: false },
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter projects based on category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeFilter === "all" || project.category === activeFilter
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground pt-24">
        <AnimatedCursor />

        {/* Add a header with navigation that matches the home page */}
        {/* Add this after the AnimatedCursor component and before the Page Header section: */}

        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              STUDIO<span className="text-primary">.</span>
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

        {/* Page Header */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Portfolio</h1>
            <p className="text-xl text-muted-foreground">
              Explore my collection of poster designs, VFX work, and motion graphics
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="container mx-auto px-4 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveFilter}>
              <TabsList className="grid grid-cols-4 w-full md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="posters">Posters</TabsTrigger>
                <TabsTrigger value="vfx">VFX</TabsTrigger>
                <TabsTrigger value="motion">Motion</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex w-full md:w-auto gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Filters */}
          {isFilterOpen && (
            <div className="md:hidden bg-card border border-border rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2">Additional Filters</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="featured" className="mr-2" />
                  <label htmlFor="featured">Featured Projects</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="recent" className="mr-2" />
                  <label htmlFor="recent">Recent Projects</label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Portfolio Grid */}
        <div className="container mx-auto px-4 mb-24">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <Link href={`/portfolio/${project.id}`}>
                    <div className="relative overflow-hidden rounded-lg">
                      <div className="aspect-[4/3] bg-muted overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=450&width=600`}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                          Featured
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          <p className="text-muted-foreground capitalize">{project.category}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button
                onClick={() => {
                  setActiveFilter("all")
                  setSearchQuery("")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Create Something Amazing Together</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have a project in mind? I'm always open to discussing new ideas and collaborations.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

