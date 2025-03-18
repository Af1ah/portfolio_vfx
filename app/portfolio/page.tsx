"use client"

import { useState } from "react"
import AnimatedCursor from "@/components/animated-cursor"
import PageTransition from "@/components/page-transition"
import ActiveLink from "@/components/active-link"
import Header from "@/components/header"
import Filters from "@/components/filters"
import PortfolioGrid from "@/components/portfolio-grid"
import CallToAction from "@/components/call-to-action"

// Sample project data
const projects = [
  { id: "1", title: "Neon Dreams", category: "posters", featured: true },
  { id: "2", title: "Cosmic Voyage", category: "vfx", featured: true },
  { id: "3", title: "Urban Pulse", category: "posters", featured: false },
  { id: "4", title: "Digital Horizon", category: "motion", featured: true },
  { id: "5", title: "Ethereal Landscapes", category: "vfx", featured: false },
  { id: "6", title: "Retro Revival", category: "posters", featured: false },
  { id: "7", title: "Particle Symphony", category: "motion", featured: false },
  { id: "8", title: "Cybernetic Dreams", category: "vfx", featured: true },
  { id: "9", title: "Minimal Expressions", category: "posters", featured: false },
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
        <Header />
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Portfolio</h1>
            <p className="text-xl text-muted-foreground">
              Explore my collection of poster designs, VFX work, and motion graphics
            </p>
          </div>
        </div>
        <Filters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
        <PortfolioGrid filteredProjects={filteredProjects} />
        <CallToAction />
      </div>
    </PageTransition>
  )
}

