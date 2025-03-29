"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { type Activity, getAllActivities } from "@/lib/activities-data"
import ActivityModal from "@/components/activity-modal"
import SimpleCarousel from "@/components/simple-carousel"

export default function ActivitiesSection() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const activities = getAllActivities()

  const openModal = (activity: Activity) => {
    setSelectedActivity(activity)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Determine items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 2
      if (window.innerWidth < 1024) return 3
      return 6
    }
    return 6 // Default for SSR
  }

  return (
    <section id="actividades" className="container mx-auto px-4 py-16">
      <div className="mb-6">
        <h3 className="text-amber-500 font-medium mb-2 animate-fade-in">ACTIVIDADES DE TOUR</h3>
        <h2 className="text-4xl md:text-5xl font-bold italic mb-4">Lo Mejor en Actividades</h2>
        <p className="text-zinc-400 max-w-3xl mb-10">
          Descubre nuestras emocionantes actividades diseñadas para todos los niveles de aventureros. Desde tranquilos
          paseos por la naturaleza hasta adrenalínicas experiencias extremas, tenemos algo para cada viajero.
        </p>
      </div>

      <SimpleCarousel itemsPerView={getItemsPerView()} showArrows={true} showDots={true} className="mb-12">
        {activities.map((activity) => (
          <div key={activity.id} className="flex flex-col items-center">
            <button
              onClick={() => openModal(activity)}
              className="group relative w-full aspect-square rounded-full overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10"></div>
              <Image
                src={activity.image || "/placeholder.svg"}
                alt={activity.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <span className="text-white font-bold text-lg">{activity.name}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-medium">Ver Detalles</span>
              </div>
            </button>
            <p className="text-zinc-400 text-sm mt-3 text-center">
              {activity.difficulty} • {activity.duration}
            </p>
          </div>
        ))}
      </SimpleCarousel>

      <div className="flex flex-col items-center">
        <Button className="bg-amber-500 hover:bg-amber-600 text-black mb-4 rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105">
          VER TODAS LAS ACTIVIDADES
        </Button>
        <span className="text-amber-500 font-medium">NUESTROS PAQUETES</span>
      </div>

      <ActivityModal activity={selectedActivity} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}

