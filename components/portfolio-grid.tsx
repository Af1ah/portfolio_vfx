import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

// Updated Project interface
interface Project {
  id: string;
  title: string;
  category: string;
  featured?: boolean;
  type: 'image' | 'youtube';
  image?: string;
  videoId?: string;
}

// Props interface
interface PortfolioGridProps {
  filteredProjects: Project[];
  onImageClick: (index: number) => void;
  onVideoClick: (videoId: string) => void;
}

export default function PortfolioGrid({ filteredProjects, onImageClick, onVideoClick }: PortfolioGridProps) {
  
  // Helper function to get YouTube thumbnail URLs with fallbacks
  const getYoutubeThumbnail = (videoId: string) => {
    // Clean videoId if it contains parameters
    const cleanVideoId = videoId.includes('?') ? videoId.split('?')[0] : videoId;
    return `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;
  };

  // Fallback thumbnails in order of preference
  const youtubeThumbnailFallbacks = (videoId: string) => {
    const cleanVideoId = videoId.includes('?') ? videoId.split('?')[0] : videoId;
    return [
      `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${cleanVideoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${cleanVideoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${cleanVideoId}/sddefault.jpg`,
      `https://img.youtube.com/vi/${cleanVideoId}/default.jpg`,
      // Fallback to a local placeholder if all YouTube thumbnails fail
      "/placeholder.svg?height=450&width=600"
    ];
  };

  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>, videoId: string, fallbackIndex = 0) => {
    const target = e.target as HTMLImageElement;
    const fallbacks = youtubeThumbnailFallbacks(videoId);
    
    if (fallbackIndex < fallbacks.length - 1) {
      // Try next fallback
      target.src = fallbacks[fallbackIndex + 1];
      target.dataset.fallbackIndex = String(fallbackIndex + 1);
    } else {
      // Set to final fallback image
      target.src = fallbacks[fallbacks.length - 1];
      target.onerror = null; // Prevent infinite error loop
    }
  };

  return (
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
              className="group cursor-pointer" 
              onClick={() => {
                if (project.type === 'image' && project.image) {
                  onImageClick(index);
                } else if (project.type === 'youtube' && project.videoId) {
                  onVideoClick(project.videoId);
                }
              }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <div className="aspect-[4/3] bg-muted overflow-hidden relative"> 
                  {project.type === 'image' && project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index < 3}
                      onError={() => {
                        const imgElement = document.getElementById(`project-img-${project.id}`) as HTMLImageElement;
                        if (imgElement) {
                          imgElement.src = "/placeholder.svg?height=450&width=600";
                        }
                      }}
                      id={`project-img-${project.id}`}
                    />
                  )}
                  {project.type === 'youtube' && project.videoId && (
                    <>
                      <Image
                        src={getYoutubeThumbnail(project.videoId)}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => handleThumbnailError(e, project.videoId || '', 0)}
                        priority={index < 3}
                        data-fallback-index="0"
                        id={`video-thumb-${project.id}`}
                      />
                      {/* Play Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300">
                        <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" />
                      </div>
                    </>
                  )}
                </div>

                {project.featured && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded z-10">
                    Featured
                  </div>
                )}

                {/* Title/category overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <h3 className="text-lg font-bold text-white mb-1 truncate">{project.title}</h3>
                  <p className="text-sm text-gray-300 capitalize">{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}