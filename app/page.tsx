"use client";

import {
  useRef,
  useState,
  useEffect,
  Suspense,
  Component,
  ReactNode,
} from "react";
import { projects } from "@/lib/projects";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, PresentationControls } from "@react-three/drei";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import AnimatedCursor from "@/components/animated-cursor";
import Model3D from "@/components/model-3d";
import ParallaxSection from "@/components/parallax-section";
import CustomLoader from "@/components/custom-loader";
import ActiveLink from "@/components/active-link";
import ImageWithFallback from "@/components/image-with-fallback";
import { PlayCircle } from "lucide-react";

type ImageItem = {
  id: number;
  title: string;
  category: string;
  type: 'image';
  image: string;
  fallbackImage: string;
};

type VideoItem = {
  id: number;
  title: string;
  category: string;
  type: 'youtube';
  videoId: string;
  image: string;
  fallbackImage: string;
};

type PortfolioItem = ImageItem | VideoItem;

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* <AnimatedCursor /> */}
      <Header />

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
                <fog attach="fog" args={["#000", 5, 30]} />
              </ErrorBoundary>
            </Suspense>
          </Canvas>
        </div>

        <div className="container mx-auto px-6 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto md:mx-0 md:ml-8 lg:ml-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 text-center md:text-left">
              Creative <span className="text-primary">Visual</span> Storytelling
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 text-center md:text-left">
              Bringing imagination to life through poster design and visual
              effects
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Button size="lg" className="text-sm sm:text-base" asChild>
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Work Section with Parallax - Fixed to prevent overlap */}
      <section className="py-24 md:py-32 relative z-10 bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Featured Work
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A selection of my most recent and impactful projects in poster
              design and VFX
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2">
            {projects
              .filter((project) => project.featured)
              .sort((a, b) => parseInt(b.id) - parseInt(a.id))
              .slice(0, 3)
              .map((project): PortfolioItem => {
                if (project.type === 'youtube' && project.videoId) {
                  return {
                    id: parseInt(project.id),
                    title: project.title,
                    category: project.category,
                    type: 'youtube',
                    videoId: project.videoId.replace('shorts/', ''),
                    image: "/placeholder.svg?height=450&width=600",
                    fallbackImage: "https://placehold.co/600x800/1a1a1a/ffffff?text=" +
                      encodeURIComponent(project.title)
                  };
                }
                return {
                  id: parseInt(project.id),
                  title: project.title,
                  category: project.category,
                  type: 'image',
                  image: project.image || "/placeholder.svg?height=450&width=600",
                  fallbackImage: "https://placehold.co/600x800/1a1a1a/ffffff?text=" +
                    encodeURIComponent(project.title)
                };
              })
              .map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  
                    <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                     {item.type === 'youtube' ? (
                       <>
                         <Image
                           src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                           alt={item.title}
                           fill
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                           className="object-cover transition-transform duration-500 group-hover:scale-110"
                           onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                             const target = e.currentTarget;
                             target.src = "/placeholder.svg?height=450&width=600";
                             target.onerror = null;
                           }}
                           priority={item.id <= 3}
                           id={`video-thumb-${item.id}`}
                         />
                         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300">
                           <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" />
                         </div>
                       </>
                     ) : (
                       <Image
                         src={item.image}
                         alt={item.title}
                         fill
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                         className="object-cover transition-transform duration-500 group-hover:scale-110"
                         priority={item.id <= 3}
                         onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                           const target = e.currentTarget;
                           target.src = "/placeholder.svg?height=450&width=600";
                           target.onerror = null;
                         }}
                       />
                     )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                      <div className="w-full">
                        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground mb-3">
                          {item.category}
                        </p>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-xs md:text-sm w-full sm:w-auto"
                        >
                          <Link href="/portfolio">View Projects</Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
              ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Button variant="outline" size="lg" asChild>
              <Link href="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Added proper spacing */}
      <section className="py-20 md:py-28 bg-muted/30 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 md:mb-16 text-center">
            Client Testimonials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-card p-6 md:p-8 rounded-lg border border-border h-full"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-primary font-bold">C{item}</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Client Name {item}</h3>
                    <p className="text-sm text-muted-foreground">
                      Company {item}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Working with this studio was an incredible experience. The
                  creativity and attention to detail exceeded our expectations.
                  The final result was exactly what we needed and more."
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Link
                href="/"
                className="text-2xl font-bold tracking-tighter mb-4 inline-block"
              >
                Ecomorph FX<span className="text-primary">.</span>
              </Link>
              <p className="text-muted-foreground">
                Creating visual stories through poster design and VFX artistry.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <address className="not-italic text-muted-foreground">
                <p>ecomorph10@gmail.com</p>
                <p>+91 6238932784</p>
                <p>Malappuram, Kerala</p>
                <p>India</p>
              </address>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} Ecomorph FX. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
