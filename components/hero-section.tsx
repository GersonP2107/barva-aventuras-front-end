"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroBanner {
  id: string
  url: string
  title: string
  subtitle: string
  isActive: boolean
  order: number
}

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [heroImages, setHeroImages] = useState<HeroBanner[]>([
    // Default images as fallback
   
  ])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch hero banners from backend
  useEffect(() => {
    const fetchHeroBanners = async () => {
      try {
        const response = await fetch('http://localhost:3001/hero-banner')
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0) {
            setHeroImages(data)
          }
        }
      } catch (error) {
        console.error('Error fetching hero banners:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroBanners()
  }, [])

  useEffect(() => {
    const rotateImages = () => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }

    const interval = setInterval(rotateImages, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [heroImages.length])

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
                src={image.url.startsWith('/uploads') 
                  ? `http://localhost:3001${image.url}` 
                  : image.url || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover"
                priority={index === 0}
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
              <h1 className="text-5xl md:text-7xl font-bold mb-6 transition-all duration-700">
                {heroImages[currentImageIndex]?.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 transition-all duration-700">
                {heroImages[currentImageIndex]?.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button 
                className="group bg-amber-500 hover:bg-amber-600 text-black px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                onClick={() => {
                  document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Reserva Tu Aventura</span>
                <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="group bg-transparent border-2 border-white hover:border-amber-400 text-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 hover:text-amber-400"
                onClick={() => {
                  document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Descubre Más
              </Button>
            </div>
          </div>
          
          {/* Image Indicators - Moved outside the text content div for better positioning */}
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
          
          {/* Scroll Indicator - Properly centered */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
            <ChevronDown className="w-8 h-8 text-amber-400" />
          </div>
        </div>
      </div>
    </section>
  )
}