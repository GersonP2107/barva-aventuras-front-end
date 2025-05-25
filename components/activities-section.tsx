"use client"

import { useState, useEffect, useCallback } from "react" // Added useCallback
import Image from "next/image"
import type { Activity } from "@/types/activity"
import ActivityModal from "@/components/activity-modal"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function ActivitiesSection() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(1) // Default to 1 for mobile first approach

  // Function to update items per view based on screen size
  const updateItemsPerView = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) {
        setItemsPerView(1) // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3) // Tablet: 3 items
      } else {
        setItemsPerView(6) // Desktop: 6 items
      }
    }
  }, [])

  useEffect(() => {
    // Initial setup
    updateItemsPerView()

    // Add resize listener
    window.addEventListener('resize', updateItemsPerView)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateItemsPerView)
    }
  }, [updateItemsPerView])

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("http://localhost:3001/activities", { cache: 'no-store' })
        if (!response.ok) {
          throw new Error(`Failed to fetch activities. Status: ${response.status}`)
        }
        const data: Activity[] = await response.json()
        setActivities(data)
      } catch (err) {
        console.error("Error fetching activities:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const openModal = (activityId: string) => {
    setSelectedActivityId(activityId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  if (loading) {
    // Loading state remains the same
    return (
      <section id="actividades" className="container mx-auto px-4 py-16">
        <div className="mb-6">
          <h3 className="text-amber-500 font-medium mb-2">ACTIVIDADES DE TOUR</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Lo Mejor en Actividades</h2>
          <p className="text-zinc-400 max-w-3xl mb-10">
            Cargando actividades...
          </p>
        </div>
      </section>
    )
  }

  if (error) {
    // Error state remains the same
    return (
      <section id="actividades" className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Error al cargar actividades</h2>
        <p className="text-zinc-400">{error}</p>
      </section>
    )
  }

  return (
    <section id="actividades" className="container mx-auto px-4 py-16">
      <div className="mb-6">
        <h3 className="text-amber-500 font-medium mb-2 animate-fade-in">ACTIVIDADES DE TOUR</h3>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Lo Mejor en Actividades</h2>
        <p className="text-zinc-400 max-w-3xl mb-10">
          Descubre nuestras emocionantes actividades diseñadas para todos los niveles de aventureros. Desde tranquilos
          paseos por la naturaleza hasta adrenalínicas experiencias extremas, tenemos algo para cada viajero.
        </p>
      </div>

      {/* Replaced SimpleCarousel with shadcn Carousel */}
      <div className="w-full max-w-5xl mx-auto">
        <Carousel className="mb-10">
          <CarouselContent className="justify-center -ml-2 md:-ml-4">
            {activities.map((activity) => (
              <CarouselItem key={activity.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/3 sm:basis-1/3 basis-full m-2">
                <div className="flex flex-col items-center justify-center px-2 w-full h-full">
                  <div className="w-full flex items-center justify-center">
                    <button
                      onClick={() => openModal(activity.id)}
                      className="group relative w-full max-w-[280px] aspect-square rounded-full overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20 mx-auto"
                    >
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10"></div>
                      <Image
                        src={activity.image?.startsWith("/uploads")
                          ? `http://localhost:3001${activity.image}`
                          : activity.image || "/placeholder.svg"}
                        alt={activity.name}
                        fill
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 30vw, 16vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <span className="text-white text-center text-base sm:text-lg font-semibold truncate w-full px-4">{activity.name}</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Ver Detalles</span>
                      </div>
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-4">
            <CarouselPrevious className="static transform-none bg-amber-500 hover:bg-amber-600 text-black border-none" />
            <CarouselNext className="static transform-none bg-amber-500 hover:bg-amber-600 text-black border-none" />
          </div>
        </Carousel>
      </div>
      <ActivityModal activityId={selectedActivityId} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}

