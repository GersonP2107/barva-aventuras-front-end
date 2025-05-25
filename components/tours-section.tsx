"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, ChevronRight, Loader2, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Tour } from "@/types/tour"
import TourModal from "@/components/tour-modal"
import { Skeleton } from "@/components/ui/skeleton"

export default function ToursSection() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toursData, setToursData] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [blogsPerView, setBlogsPerView] = useState(3) // Default to 3 for SSR
  
  useEffect(() => {
    // Update blogs per view based on screen size after component mounts
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBlogsPerView(1)
      } else if (window.innerWidth < 1024) {
        setBlogsPerView(2)
      } else {
        setBlogsPerView(3)
      }
    }
    
    // Initial call
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function buildImageSrc(path?: string | null) {
    if (!path || path.trim() === "") {
      return "/placeholder.svg";
    }
  
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
  
    if (path.startsWith("/uploads")) {
      return `http://localhost:3001${path}`;
    }
  
    return `http://localhost:3001/${path.replace(/^\/+/, "")}`;
  }
  
  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch("http://localhost:3001/tours")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Tour[] = await response.json()
        setToursData(data)
      } catch (e) {
        console.error("Failed to fetch tours:", e)
        setError(e instanceof Error ? e.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTours()
  }, [])

  const openModal = (tour: Tour) => {
    setSelectedTour(tour)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Loading State
  if (isLoading) {
    return (
      <section id="tours" className="container mx-auto px-4 py-16">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-xl font-semibold text-amber-500">Tours Inolvidables</h2>
          <h3 className="text-3xl font-bold">Despliega Tus Alas Para Viajar</h3>
        </header>
        <figure className="flex space-x-4">
          {Array.from({ length: blogsPerView }).map((_, index) => (
            <article key={index} className="flex-1 space-y-3">
              <Skeleton className="h-96 w-full rounded-lg bg-zinc-700" />
              <Skeleton className="h-4 w-3/4 bg-zinc-700" />
              <Skeleton className="h-4 w-1/2 bg-zinc-700" />
            </article>
          ))}
        </figure>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section id="tours" className="container mx-auto px-4 py-16">
        <header className="text-center mb-6">
          <h2 className="text-xl font-semibold text-amber-500">Tours Inolvidables</h2>
          <h3 className="text-3xl font-bold">Despliega Tus Alas Para Viajar</h3>
        </header>
        <article className="text-center">
          <p className="text-red-500 mb-4">Error al cargar los tours: {error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-amber-500 hover:bg-amber-600 text-black"
          >
            <RefreshCcw className="w-4 h-4 mr-2" /> Reintentar
          </Button>
        </article>
      </section>
    );
  }

  // Main Content
  return (
    <section id="tours" className="container mx-auto px-4 py-16">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-xl font-semibold text-amber-500 animate-fade-in">Tours Inolvidables</h2>
        <h3 className="text-3xl font-bold">Despliega Tus Alas Para Viajar</h3>
      </header>

      {toursData.length > 0 ? (
        <figure className="w-full max-w-7xl mx-auto">
          <Carousel className="mb-8">
            <CarouselContent>
              {toursData.map((tour) => (
                <CarouselItem key={tour.id} className="md:basis-1/3 sm:basis-1/2 basis-full pl-4 md:pl-6">
                  <article
                    className="relative rounded-lg overflow-hidden group h-96 cursor-pointer"
                    onClick={() => openModal(tour)}
                  >
                    <figure className="h-full w-full">
                      <Image
                        src={tour.image?.startsWith("/uploads")
                          ? `http://localhost:3001${tour.image}`
                          : tour.image || "/placeholder.svg"}
                        alt={tour.title || "Tour image"}
                        fill
                        sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <figcaption className="sr-only">{tour.title}</figcaption>
                    </figure>
                    <span className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" aria-hidden="true"></span>
                    <footer className="absolute bottom-0 left-0 p-4 z-10">
                      <h4 className="text-xl font-bold text-white">{tour.title}</h4>
                      {tour.destination && (
                        <address className="flex items-center mt-2 text-zinc-200 not-italic">
                          <MapPin className="w-4 h-4 text-amber-500 mr-1 flex-shrink-0" />
                          <span className="text-sm">{tour.destination}</span>
                        </address>
                      )}
                    </footer>
                    <aside className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center">
                        <ChevronRight className="w-5 h-5" />
                        <span className="sr-only">Ver detalles de {tour.title}</span>
                      </Button>
                    </aside>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <nav className="flex justify-end gap-2 mt-4">
              <CarouselPrevious className="static transform-none bg-amber-500 hover:bg-amber-600 text-black border-none" />
              <CarouselNext className="static transform-none bg-amber-500 hover:bg-amber-600 text-black border-none" />
            </nav>
          </Carousel>
        </figure>
      ) : (
        <p className="text-center text-zinc-400 py-10">
          No hay tours disponibles en este momento.
        </p>
      )}
      
      <TourModal tour={selectedTour} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}

