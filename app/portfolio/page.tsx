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
  { 
    id: "1", 
    title: "cultural", 
    category: "posters", 
    featured: true,
    image: "/images/kannan.png"
  },
  { 
    id: "2", 
    title: "bussiness", 
    category: "posters", 
    featured: true,
    image: "/images/kannan3.jpeg"
  },
  { 
    id: "3", 
    title: "Car Design", 
    category: "design", 
    featured: false,
    image: "/placeholder.svg?height=450&width=600"
  },
  { 
    id: "4", 
    title: "Kannan VFX 2", 
    category: "posters", 
    featured: false,
    image: "/placeholder.svg?height=450&width=600"
  },
  { 
    id: "5", 
    title: "Ethereal Landscapes", 
    category: "vfx", 
    featured: false,
    image: "/placeholder.svg?height=450&width=600"
  },
  { 
    id: "6", 
    title: "Retro Revival", 
    category: "posters", 
    featured: false,
    image: "/placeholder.svg?height=450&width=600"
  },
  { 
    id: "7", 
    title: "Particle Symphony", 
    category: "motion", 
    featured: false,
    image: "/placeholder.svg?height=450&width=600"
  },
  { 
    id: "8", 
    title: "Cybernetic Dreams", 
    category: "vfx", 
    featured: false,
    image: "/placeholder.svg?height=450&width=600"
  },
  { 
    id: "9", 
    title: "Minimal Expressions", 
    category: "posters", 
    featured: false,
    image: "/placeholder.svg?height=450&width=600"
  },
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

