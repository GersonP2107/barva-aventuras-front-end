"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Clock, MapPin, DollarSign, AlertTriangle, CheckCircle, XCircle, Info, Calendar } from "lucide-react"
import type { Tour } from "@/lib/tours-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type TourModalProps = {
  tour: Tour | null
  isOpen: boolean
  onClose: () => void
}

export default function TourModal({ tour, isOpen, onClose }: TourModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!mounted) return null
  if (!tour) return null
  if (!isOpen) return null

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-500"
      case "Moderado":
        return "bg-amber-500"
      case "Difícil":
        return "bg-orange-500"
      case "Extremo":
        return "bg-red-500"
      default:
        return "bg-amber-500"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="bg-zinc-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 md:h-80">
          <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover rounded-t-xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-zinc-900/80 text-white p-2 rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4">
            <Badge className={`${getDifficultyColor(tour.difficulty)} text-white px-3 py-1 text-xs`}>
              {tour.difficulty}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-bold text-amber-500 mb-2">{tour.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-zinc-300">
              <Clock className="w-5 h-5 text-amber-500 mr-2" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center text-zinc-300">
              <MapPin className="w-5 h-5 text-amber-500 mr-2" />
              <span>{tour.destination}</span>
            </div>
            <div className="flex items-center text-zinc-300">
              <DollarSign className="w-5 h-5 text-amber-500 mr-2" />
              <span>{tour.price}</span>
            </div>
          </div>

          <p className="text-zinc-300 mb-6">{tour.description}</p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Info className="w-5 h-5 text-amber-500 mr-2" />
              Características
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tour.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Calendar className="w-5 h-5 text-amber-500 mr-2" />
              Itinerario
            </h3>
            <div className="space-y-4">
              {tour.itinerary.map((day, index) => (
                <div key={index} className="border-l-2 border-amber-500 pl-4 pb-4">
                  <h4 className="font-bold text-white">
                    Día {day.day}: {day.title}
                  </h4>
                  <p className="text-zinc-400">{day.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Incluido
              </h3>
              <ul className="space-y-2">
                {tour.included.map((item, index) => (
                  <li key={index} className="flex items-start text-zinc-300">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                No Incluido
              </h3>
              <ul className="space-y-2">
                {tour.notIncluded.map((item, index) => (
                  <li key={index} className="flex items-start text-zinc-300">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
              Recomendaciones
            </h3>
            <ul className="space-y-2">
              {tour.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start text-zinc-300">
                  <span className="text-amber-500 mr-2">→</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center mt-8">
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                // Close the modal first
                onClose();
                // Use setTimeout to delay the scroll action slightly
                setTimeout(() => {
                  const cotizarSection = document.getElementById('cotizar');
                  if (cotizarSection) {
                    cotizarSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
            >
              Reservar Este Tour
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

