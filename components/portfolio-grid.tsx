import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Project {
  id: string;
  title: string;
  category: string;
  featured?: boolean;
  image: string;
}

interface PortfolioGridProps {
  filteredProjects: Project[];
}

export default function PortfolioGrid({ filteredProjects }: PortfolioGridProps) {
    function setActiveFilter(arg0: string) {
        throw new Error("Function not implemented.");
    }

    function setSearchQuery(arg0: string) {
        throw new Error("Function not implemented.");
    }

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
              className="group"
            >
              <Link href={`/portfolio/${project.id}`}>
                <div className="relative overflow-hidden rounded-lg">
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={project.image}
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
  )
}