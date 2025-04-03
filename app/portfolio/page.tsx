"use client"

import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CustomYoutubePlayer from "@/components/customYoutubePlayer";
import "yet-another-react-lightbox/styles.css";
import AnimatedCursor from "@/components/animated-cursor";
import PageTransition from "@/components/page-transition";
import Header from "@/components/header";
import Filters from "@/components/filters";
import PortfolioGrid from "@/components/portfolio-grid";
import CallToAction from "@/components/call-to-action";

// Define Project type
interface Project {
  id: string;
  title: string;
  category: string;
  featured?: boolean;
  type: 'image' | 'youtube';
  image?: string;
  videoId?: string;
}

// Sample project data - you can replace with your actual projects
const projects: Project[] = [
  { 
    id: "1", 
    title: "Cultural Poster", 
    category: "posters", 
    featured: true,
    type: 'image',
    image: "/images/kannan.png",
  },
  { 
    id: "2", 
    title: "Business Branding", 
    category: "posters", 
    featured: true,
    type: 'image',
    image: "/images/kannan3.jpeg",
  },
  { 
    id: "3", 
    title: "Car Design", 
    category: "design", 
    featured: false,
    type: 'image',
    image: "/placeholder.svg?height=450&width=600",
  },
  { 
    id: "4", 
    title: "Kannan VFX 2", 
    category: "posters", 
    featured: false,
    type: 'image',
    image: "/placeholder.svg?height=450&width=600",
  },
  { 
    id: "5", 
    title: "Ethereal Landscapes", 
    category: "vfx", 
    featured: false,
    type: 'image',
    image: "/placeholder.svg?height=450&width=600",
  },
  { 
    id: "6", 
    title: "Retro Revival", 
    category: "posters", 
    featured: false,
    type: 'image',
    image: "/placeholder.svg?height=450&width=600",
  },
  { 
    id: "7", 
    title: "Particle Symphony", 
    category: "motion", 
    featured: false,
    type: 'image',
    image: "/placeholder.svg?height=450&width=600",
  },
  { 
    id: "8", 
    title: "Cybernetic Dreams", 
    category: "vfx", 
    featured: false,
    type: 'image',
    image: "/placeholder.svg?height=450&width=600",
  },
  { 
    id: "9", 
    title: "Minimal Expressions", 
    category: "posters", 
    featured: false,
    type: 'image',
    image: "/placeholder.svg?height=450&width=600",
  },
  // Example YouTube video project
  {
    id: "10",
    title: "VFX Demo Reel",
    category: "vfx",
    featured: true,
    type: 'youtube',
    videoId: "KBNey4upFKE" // Clean video ID without parameters
  },
  {
    id: "11",
    title: "VFX Demo",
    category: "vfx",
    featured: true,
    type: 'youtube',
    videoId: "AxuJ9VdcSIg" // Clean video ID
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Lightbox and modal states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [videoPlayerError, setVideoPlayerError] = useState(false);
  
  // Filter projects based on category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Prepare slides specifically for the image lightbox
  const imageSlides = filteredProjects
    .filter(project => project.type === 'image') // 1. Filter for image projects first
    .map((project) => ({                         // 2. Map only image projects
      id: project.id, // Keep ID for index calculation
      src: project.image || "/placeholder.svg?height=450&width=600",
      title: project.title,
      description: project.category,
      // type: 'image', // Optional: Add if SlideImage type strictly requires it
    }));

  // Find the index within imageSlides for the currently selected project
  const currentProjectId = filteredProjects[currentMediaIndex]?.id;
  const imageLightboxIndex = imageSlides.findIndex(slide => slide.id === currentProjectId);

  // Function to handle media navigation
  const navigateMedia = (direction: 'next' | 'prev') => {
    if (filteredProjects.length <= 1) return;
    
    const increment = direction === 'next' ? 1 : -1;
    let newIndex = (currentMediaIndex + increment + filteredProjects.length) % filteredProjects.length;
    const nextItem = filteredProjects[newIndex];
    
    setCurrentMediaIndex(newIndex);
    
    if (videoModalOpen) {
      setVideoModalOpen(false);
    }
    
    if (lightboxOpen) {
      setLightboxOpen(false);
    }
    
    // Small timeout to allow modals to close properly before opening new ones
    setTimeout(() => {
      if (nextItem.type === 'youtube' && nextItem.videoId) {
        setCurrentVideoId(nextItem.videoId);
        setVideoModalOpen(true);
      } else if (nextItem.type === 'image') {
        setLightboxOpen(true);
      }
    }, 50);
  };

  // Function to open image lightbox
  const openImageLightbox = (index: number) => {
    setCurrentMediaIndex(index);
    setLightboxOpen(true);
  };

  // Function to open video modal
  const openVideoModal = (videoId: string) => {
    const projectIndex = filteredProjects.findIndex(p => p.type === 'youtube' && p.videoId === videoId);
    if (projectIndex !== -1) {
      setCurrentMediaIndex(projectIndex);
    }
    setCurrentVideoId(videoId);
    setVideoModalOpen(true);
    setVideoPlayerError(false);
  };

  // Handle lightbox close - reset state
  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  // Handle video modal close - reset state
  const handleVideoModalClose = () => {
    setVideoModalOpen(false);
    setCurrentVideoId(null);
    setVideoPlayerError(false);
  };

  // Handle YouTube player errors
  const handleVideoError = () => {
    setVideoPlayerError(true);
  };

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      setLightboxOpen(false);
      setVideoModalOpen(false);
    };
  }, []);

  // Custom render for lightbox navigation buttons to navigate between all media
  const renderNavButtons = () => {
    return {
      buttonPrev: () => (
        <button
          type="button"
          className="yarl__button"
          onClick={(e) => {
            e.stopPropagation();
            navigateMedia('prev');
          }}
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
          </svg>
        </button>
      ),
      buttonNext: () => (
        <button
          type="button"
          className="yarl__button"
          onClick={(e) => {
            e.stopPropagation();
            navigateMedia('next');
          }}
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
          </svg>
        </button>
      ),
    };
  };

  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <Header />
      <PageTransition>
        <div className="pt-24">
          <AnimatedCursor />
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
          
          <PortfolioGrid
            filteredProjects={filteredProjects}
            onImageClick={openImageLightbox}
            onVideoClick={openVideoModal}
          />
          
          <CallToAction />
        </div>
      </PageTransition>
      
      {/* Image Lightbox with custom navigation buttons */}
      <Lightbox
        open={lightboxOpen}
        close={handleLightboxClose}
        slides={imageSlides} // Pass the dedicated image slides array
        index={imageLightboxIndex >= 0 ? imageLightboxIndex : 0} // Use the pre-calculated index
        controller={{ closeOnBackdropClick: true }}
        render={renderNavButtons()}
      />
      
      {/* YouTube Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={handleVideoModalClose}>
        <DialogContent className="sm:max-w-[900px] bg-black">
          {videoPlayerError ? (
            <div className="flex flex-col items-center justify-center p-8 text-white">
              <p className="text-lg mb-4">Sorry, there was an error loading this video.</p>
              <button 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                onClick={handleVideoModalClose}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {currentVideoId && (
                <div className="relative aspect-video w-full">
                  <CustomYoutubePlayer
                    videoId={currentVideoId}
                    onError={handleVideoError}
                  />
                  
                  {/* Navigation controls for videos */}
                  <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateMedia('prev');
                      }}
                      className="p-2 bg-black/50 rounded-full pointer-events-auto hover:bg-black/70 transition ml-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateMedia('next');
                      }}
                      className="p-2 bg-black/50 rounded-full pointer-events-auto hover:bg-black/70 transition mr-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* Project title and info */}
          {currentMediaIndex !== -1 && filteredProjects[currentMediaIndex] && (
            <div className="px-4 py-3 bg-black text-white">
              <h3 className="text-xl font-semibold">{filteredProjects[currentMediaIndex].title}</h3>
              <p className="text-sm opacity-75 capitalize">{filteredProjects[currentMediaIndex].category}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}