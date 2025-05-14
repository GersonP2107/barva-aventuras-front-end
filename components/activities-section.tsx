"use client"

import { useState, useEffect } from "react" // Import useEffect
import Image from "next/image"
import type { Activity } from "@/types/activity"; // Assuming type is defined here or adjust path
import ActivityModal from "@/components/activity-modal"
import SimpleCarousel from "@/components/simple-carousel"
import { Skeleton } from "@/components/ui/skeleton" // Import Skeleton for loading state

export default function ActivitiesSection() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("http://localhost:3001/activities", { cache: 'no-store' }); // Fetch from backend
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

  const [itemsPerView, setItemsPerView] = useState(6);


  if (loading) {
    return (
      <section id="actividades" className="container mx-auto px-4 py-16">
        {/* Keep headers */}
        <div className="mb-6">
          <h3 className="text-amber-500 font-medium mb-2">ACTIVIDADES DE TOUR</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Lo Mejor en Actividades</h2>
          <p className="text-zinc-400 max-w-3xl mb-10">
            Cargando actividades...
          </p>
        </div>
      </section>
    );
  }

  // --- Render Error State ---
  if (error) {
    return (
      <section id="actividades" className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Error al cargar actividades</h2>
        <p className="text-zinc-400">{error}</p>
        {/* Optionally add a retry button */}
      </section>
    );
  }

  // --- Render Activities ---
  return (
    <section id="actividades" className="container mx-auto px-4 py-16">
      {/* Keep headers */}
      <div className="mb-6">
        <h3 className="text-amber-500 font-medium mb-2 animate-fade-in">ACTIVIDADES DE TOUR</h3>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Lo Mejor en Actividades</h2>
        <p className="text-zinc-400 max-w-3xl mb-10">
          Descubre nuestras emocionantes actividades diseñadas para todos los niveles de aventureros. Desde tranquilos
          paseos por la naturaleza hasta adrenalínicas experiencias extremas, tenemos algo para cada viajero.
        </p>
      </div>

      {/* Use fetched activities */}
      <SimpleCarousel itemsPerView={itemsPerView} showArrows={true} showDots={true} className="mb-10">
        {activities.map((activity) => (
          <div key={activity.id} className="flex flex-col items-center">
            <button
              onClick={() => openModal(activity.id)} // Pass activity.id
              className="group relative w-full aspect-square rounded-full overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10"></div>
              <Image
                src={activity.image?.startsWith("/uploads")
                  ? `http://localhost:3001${activity.image}`
                  : activity.image || "/placeholder.svg"}
                alt={activity.name}
                fill
                // Ensure sizes attribute matches expected rendering based on itemsPerView
                sizes={`(max-width: 640px) ${100/2}vw, (max-width: 1024px) ${100/3}vw, ${100/6}vw`} // Example sizes, adjust as needed
                className="object-cover" // Removed rounded-t-xl as parent is rounded-full
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <span className="text-white text-center text-lg font-semibold truncate w-full px-2">{activity.name}</span> {/* Added padding and centering */}
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-medium">Ver Detalles</span>
              </div>
            </button>
          </div>
        ))}
      </SimpleCarousel>

      {/* Pass activityId to the modal */}
      <ActivityModal activityId={selectedActivityId} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}

