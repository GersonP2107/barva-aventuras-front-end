"use client"

import { useState, useEffect } from "react" // Import useEffect
import Image from "next/image"
import { MapPin, ChevronRight, Loader2 } from "lucide-react" // Import Loader2 for loading state
import { Button } from "@/components/ui/button"
// Import the Tour type definition matching your backend data structure
import type { Tour } from "@/types/tour"
import TourModal from "@/components/tour-modal"
import SimpleCarousel from "@/components/simple-carousel"
import { Skeleton } from "@/components/ui/skeleton" // Import Skeleton for loading state

export default function ToursSection() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // State for fetched tours, loading status, and errors
  const [toursData, setToursData] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function buildImageSrc(path?: string | null) {
    if (!path || path.trim() === "") {
      return "/placeholder.svg";                 // fallback local seguro
    }
  
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;                               // ya es absoluta
    }
  
    if (path.startsWith("/uploads")) {
      return `http://localhost:3001${path}`;     // añádele host
    }
  
    // si viene sin slash (“uploads/…”) → pon primero “/”
    return `http://localhost:3001/${path.replace(/^\/+/, "")}`;
  }
  
  // Fetch tours from the backend when the component mounts
  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch("http://localhost:3001/tours") // Fetch from backend API
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
  }, []) // Empty dependency array ensures this runs once on mount

  const openModal = (tour: Tour) => {
    setSelectedTour(tour)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Optional: Clear selected tour when modal closes
    // setSelectedTour(null);
  }

  // Determine items per view based on screen size
  const getToursPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 3  // Changed from 2 to 3 for medium screens
      return 3
    }
    return 3 // Default for SSR
  }

  // --- Render Loading State ---
  if (isLoading) {
    const itemsPerView = getToursPerView();
    return (
      <section id="tours" className="container mx-auto px-4 py-16">
        {/* Header remains the same */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-xl font-semibold text-amber-500">Tours Inolvidables</h2>
          <h3 className="text-3xl font-bold">Despliega Tus Alas Para Viajar</h3>
        </div>
        {/* Skeleton Loader for Carousel */}
        <div className="flex space-x-4">
           {Array.from({ length: itemsPerView }).map((_, index) => (
             <div key={index} className="flex-1 space-y-3">
               <Skeleton className="h-96 w-full rounded-lg bg-zinc-700" />
               <Skeleton className="h-4 w-3/4 bg-zinc-700" />
               <Skeleton className="h-4 w-1/2 bg-zinc-700" />
             </div>
           ))}
         </div>
      </section>
    );
  }

  // --- Render Error State ---
  if (error) {
    return (
      <section id="tours" className="container mx-auto px-4 py-16 text-center text-red-500">
        <p>Error al cargar los tours: {error}</p>
        {/* Optionally add a retry button */}
      </section>
    );
  }

  // --- Render Tours Data ---
  return (
    <section id="tours" className="container mx-auto px-4 py-16">
      {/* Header remains the same */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-xl font-semibold text-amber-500 animate-fade-in">Tours Inolvidables</h2>
        <h3 className="text-3xl font-bold">Despliega Tus Alas Para Viajar</h3>
      </div>

      {/* Use fetched toursData */}
      {toursData.length > 0 ? (
        <SimpleCarousel itemsPerView={getToursPerView()} showArrows={true} showDots={true} className="mb-8">
          {toursData.map((tour) => {
            // Construct image URL correctly
            const imageUrl = tour.image ? `http://localhost:3001${tour.image}` : "/placeholder.svg";
            return (
              <div
                key={tour.id} // Use the ID from the fetched data
                className="relative rounded-lg overflow-hidden group h-96 cursor-pointer mx-2"
                onClick={() => openModal(tour)}
              >
                <Image
                  src={tour.image?.startsWith("/uploads") 
                    ? `http://localhost:3001${imageUrl}` 
                    : tour.image || "/placeholder.svg"}
                  alt={tour.title || "Tour image"}
                  fill
                  sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 z-10">
                  <h4 className="text-xl font-bold text-white">{tour.title}</h4>
                  {/* Use the correct field from your backend data (e.g., destination) */}
                  {tour.destination && (
                    <div className="flex items-center mt-2 text-zinc-200">
                      <MapPin className="w-4 h-4 text-amber-500 mr-1 flex-shrink-0" />
                      <span className="text-sm">{tour.destination}</span>
                    </div>
                  )}
                </div>
                {/* Button remains the same */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center">
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </SimpleCarousel>
      ) : (
         <div className="text-center text-zinc-400 py-10">
             No hay tours disponibles en este momento.
         </div>
      )}
      {/* Modal remains the same, passing fetched data */}
      <TourModal tour={selectedTour} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}

