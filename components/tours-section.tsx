"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Tour, getAllTours } from "@/lib/tours-data"
import TourModal from "@/components/tour-modal"
import SimpleCarousel from "@/components/simple-carousel"

export default function ToursSection() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const tours = getAllTours()

  const openModal = (tour: Tour) => {
    setSelectedTour(tour)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Determine items per view based on screen size
  const getToursPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3 // Default for SSR
  }

  return (
    <section id="tours" className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-xl font-semibold text-amber-500 animate-fade-in">Tours Inolvidables</h2>
        <h3 className="text-3xl font-bold">Despliega Tus Alas Para Viajar</h3>
      </div>

      <SimpleCarousel itemsPerView={getToursPerView()} showArrows={true} showDots={true} className="mb-8">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="relative rounded-lg overflow-hidden group h-96 cursor-pointer mx-2"
            onClick={() => openModal(tour)}
          >
            <Image
              src={tour.image || "/placeholder.svg"}
              alt={tour.title}
              width={300}
              height={450}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h4 className="text-xl font-bold">{tour.title}</h4>
              <div className="flex items-center mt-2">
                <MapPin className="w-4 h-4 text-amber-500 mr-1" />
                <span className="text-sm">{tour.locations} Ubicaciones</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </SimpleCarousel>
      <TourModal tour={selectedTour} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}

