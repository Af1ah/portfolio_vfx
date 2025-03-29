"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Menu, Moon, Sun, X, Calendar, Clock, Tag } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import ActiveLink from "@/components/active-link"
import { Badge } from "@/components/ui/badge"

// Example blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Art of Visual Storytelling in Modern Design",
    excerpt: "Explore how visual storytelling has evolved in contemporary design and its impact on user engagement.",
    category: "Design",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Design", "Storytelling", "UI/UX"],
  },
  {
    id: 2,
    title: "Mastering Color Theory in Digital Art",
    excerpt: "A comprehensive guide to understanding and applying color theory in digital art and design.",
    category: "Art",
    date: "March 10, 2024",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Color Theory", "Digital Art", "Design"],
  },
  {
    id: 3,
    title: "The Future of Motion Design",
    excerpt: "Discover emerging trends and technologies shaping the future of motion design and animation.",
    category: "Animation",
    date: "March 5, 2024",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Motion Design", "Animation", "Future Trends"],
  },
]

const categories = [
  "All",
  "Design",
  "Art",
  "Animation",
  "Technology",
  "Tutorials",
]

export default function BlogPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
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
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
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
              Creative <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore articles about design, art, and creative process
            </p>
          </motion.div>
        </section>

      
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </section>

        
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-lg border border-border overflow-hidden group"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        
        <section className="container mx-auto px-4 py-16">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground">
                Subscribe to my newsletter for the latest articles and creative insights
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
        </section>
      </div>
    </div>
  )
} 