"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronDown, Camera } from "lucide-react"
import { Button } from "@/components/ui/button" // Assuming this is your Shadcn UI Button

interface HeroBanner {
  id: string
  url: string
  title: string
  subtitle: string
  isActive: boolean
  order: number
}

// Define default fallback images in case the API call fails or returns no data
const DEFAULT_HERO_IMAGES: HeroBanner[] = [
  {
    id: "default-1",
    url: "https://images.unsplash.com/photo-1510784752535-649033333333?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example placeholder
    title: "Aventura en Costa Rica",
    subtitle: "Explora la belleza natural",
    isActive: true,
    order: 1,
  },
  {
    id: "default-2",
    url: "https://images.unsplash.com/photo-1502425032549-ee930646c054?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Another example
    title: "Experiencias Inolvidables",
    subtitle: "Vive momentos únicos en la naturaleza",
    isActive: true,
    order: 2,
  },
]

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [heroImages, setHeroImages] = useState<HeroBanner[]>([]) // Start empty
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false); // New state to track API errors

  // Memoize the image URL construction for cleaner code
  const getImageUrl = useCallback((imagePath: string) => {
    // Check if the URL is relative to /uploads (from your backend)
    // or if it's an absolute URL (like Unsplash placeholders)
    return imagePath.startsWith('/uploads')
      ? `http://localhost:3001${imagePath}`
      : imagePath || "/placeholder.svg"; // Fallback to a local placeholder if URL is missing
  }, []);

  // Fetch hero banners from backend
  useEffect(() => {
    const fetchHeroBanners = async () => {
      try {
        const response = await fetch('http://localhost:3001/hero-banner')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        if (data && data.length > 0) {
          // Sort by order if available, otherwise use original order
          const sortedData = data.sort((a: HeroBanner, b: HeroBanner) => a.order - b.order);
          setHeroImages(sortedData);
        } else {
          // If no data from API, use default images
          setHeroImages(DEFAULT_HERO_IMAGES);
        }
      } catch (error) {
        console.error('Error fetching hero banners:', error)
        setHasError(true); // Indicate an error occurred
        setHeroImages(DEFAULT_HERO_IMAGES); // Use default images on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroBanners()
  }, [])

  // Image rotation logic
  useEffect(() => {
    // Only rotate if there are images available
    if (heroImages.length === 0) return;

    const rotateImages = () => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }

    const interval = setInterval(rotateImages, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [heroImages.length]) // Depend on heroImages.length to restart interval if images change

  // Handle scrolling to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render a skeleton loader while loading
  if (isLoading) {
    return (
      <section className="relative h-screen pt-[120px] bg-zinc-900 flex items-center justify-center">
        <div className="animate-pulse text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="h-6 w-1/4 bg-zinc-700 rounded mx-auto mb-2"></div> {/* Placeholder for subtitle */}
            <div className="h-16 w-3/4 bg-zinc-700 rounded mx-auto mb-4"></div> {/* Placeholder for title */}
            <div className="h-8 w-1/2 bg-zinc-700 rounded mx-auto"></div> {/* Placeholder for description */}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <div className="h-14 w-48 bg-amber-600 rounded-full"></div> {/* Button placeholder */}
            <div className="h-14 w-48 bg-zinc-700 border border-zinc-600 rounded-full"></div> {/* Button placeholder */}
          </div>
        </div>
      </section>
    );
  }

  // If no images after loading (e.g., API failed and no default images were set)
  if (heroImages.length === 0 && !isLoading) {
    return (
      <section className="relative h-screen pt-[120px] bg-zinc-900 flex items-center justify-center text-white text-center">
        <p className="text-xl">No hay imágenes disponibles para mostrar.</p>
        {hasError && <p className="text-red-400">Hubo un error al cargar las imágenes.</p>}
      </section>
    );
  }

  const currentHero = heroImages[currentImageIndex];

  return (
    <section className="relative h-screen pt-[120px]">
      <div className="absolute inset-0 w-full h-full">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {heroImages.map((image, index) => (
            <article
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentImageIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={getImageUrl(image.url)} // Use the memoized function here
                alt={image.title || "Hero Image"} // Provide a fallback alt text
                fill
                className="object-cover"
                priority={index === 0} // Load the first image with high priority
                sizes="(max-width: 768px) 100vw, 100vw" // Improve responsiveness for Image component
              />
              <span className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></span>
            </article>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h2 className="text-amber-500 text-xl md:text-2xl font-medium tracking-wider uppercase animate-fade-in">
                Bienvenidos al paraíso
              </h2>
              {/* Conditional rendering for title and subtitle for smoother transitions */}
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-700 ${currentHero ? 'opacity-100' : 'opacity-0'}`}>
                {currentHero?.title}
              </h1>
              <p className={`text-xl md:text-2xl text-gray-200 transition-all duration-700 ${currentHero ? 'opacity-100' : 'opacity-0'}`}>
                {currentHero?.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                className="group bg-amber-500 hover:bg-amber-600 text-black px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                onClick={() => scrollToSection('cotizar')}
                aria-label="Reserva tu aventura" // More descriptive aria-label
              >
                <span>Reserva Tu Aventura</span>
                <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="group bg-transparent border-2 border-white hover:border-amber-400 text-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 hover:text-amber-400"
                onClick={() => scrollToSection('galeria')}
                aria-label="Descubre más en la galería" // More descriptive aria-label
              >
                Descubre Más
              </Button>
            </div>
          </div>

          {/* Image Indicators */}
          {heroImages.length > 1 && ( // Only show indicators if there's more than one image
            <div className="absolute bottom-32 left-0 right-0 flex justify-center space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === index ? "bg-amber-500 w-8" : "bg-white/50 hover:bg-white/80"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
            <ChevronDown className="w-8 h-8 text-amber-400" />
          </div>
        </div>
      </div>
    </section>
  )
}