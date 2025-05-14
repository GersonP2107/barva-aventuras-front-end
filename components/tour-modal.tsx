"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Clock, MapPin, DollarSign, AlertTriangle, CheckCircle, XCircle, Info, Calendar } from "lucide-react"
// Ensure this type definition matches the structure of the data coming from your backend
import type { Tour } from "@/types/tour" // Changed from "@/lib/tours-data" to a more generic location
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type TourModalProps = {
  tour: Tour | null
  isOpen: boolean
  onClose: () => void
}

export default function TourModal({ tour, isOpen, onClose: handleClose }: TourModalProps & { onClose: () => void }) {
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

  // Early returns if not mounted, no tour data, or not open
  if (!mounted || !isOpen || !tour) return null

  // Helper function for difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) { // Added toLowerCase for robustness
      case "fácil":
        return "bg-green-500"
      case "moderado":
        return "bg-amber-500"
      case "difícil":
        return "bg-orange-500"
      case "extremo":
        return "bg-red-500"
      default:
        return "bg-zinc-500" // Default color
    }
  }

  // Construct the image URL more robustly
  let imageUrl = "/placeholder.svg"; // Default fallback
  if (tour.image && typeof tour.image === 'string' && tour.image.trim()) { // Check if it's a non-empty string
    const imagePath = tour.image.trim();
    // Check if it's already an absolute URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      try {
        new URL(imagePath); // Validate absolute URL
        imageUrl = imagePath;
      } catch (e) {
        console.warn(`Provided absolute image URL "${imagePath}" is invalid. Falling back to placeholder.`);
        // Keep imageUrl as placeholder
      }
    }
    // Assume it's a relative path from the backend root
    else {
      const baseUrl = 'http://localhost:3001';
      // Ensure only one slash between base and path
      const finalPath = `${baseUrl.replace(/\/$/, '')}/${imagePath.replace(/^\//, '')}`;
      try {
        new URL(finalPath); // Validate the constructed URL
        imageUrl = finalPath;
      } catch(e) {
         console.warn(`Constructed image URL "${finalPath}" is invalid. Falling back to placeholder.`);
         // Keep imageUrl as placeholder
      }
    }
  }
  // If tour.image was empty, null, or invalid, imageUrl remains "/placeholder.svg"


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      {/* Modal Content Container */}
      <div
        className="bg-zinc-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header Section with Image and Close Button */}
        <div className="relative h-64 md:h-80 flex-shrink-0">
          {/* Use Next.js Image component for optimization */}
          <Image
             src={imageUrl} // Use the validated and constructed URL
             alt={tour.title || 'Tour image'} // Provide default alt text
             fill
             className="object-cover rounded-t-xl"
             priority // Consider adding priority if this is often the LCP
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes, adjust as needed
             onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} // Fallback image on error
           />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-zinc-900/80 text-white p-2 rounded-full hover:bg-zinc-800 transition-colors z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
          {/* Difficulty Badge */}
          <div className="absolute bottom-4 left-4 z-10">
            {tour.difficulty && ( // Only show badge if difficulty exists
                 <Badge className={`${getDifficultyColor(tour.difficulty)} text-white px-3 py-1 text-xs shadow-md`}>
                   {tour.difficulty}
                 </Badge>
            )}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 overflow-y-auto">
          {/* Title */}
          <h2 className="text-3xl font-bold text-amber-500 mb-4">{tour.title}</h2>

          {/* Quick Info Row (Duration, Destination, Price) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
            {tour.duration && (
                <div className="flex items-center text-zinc-300">
                  <Clock className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                  <span>{tour.duration}</span>
                </div>
            )}
            {tour.destination && (
                <div className="flex items-center text-zinc-300">
                  <MapPin className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                  <span>{tour.destination}</span>
                </div>
            )}
            {tour.price != null && ( // Check for null/undefined, allow 0
                <div className="flex items-center text-zinc-300">
                  <DollarSign className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                  {/* Format price if needed */}
                  <span>₡{tour.price.toLocaleString()}</span>
                </div>
            )}
          </div>
          {/* Description */}
          {tour.description && (
              <p className="text-zinc-300 mb-6 mt-6 whitespace-pre-line">{tour.description}</p>
          )}
          {/* Features (Optional - if you have this field) */}
          {tour.features && tour.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center text-zinc-100">
                <Info className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />
                Características
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 list-none pl-0">
                {tour.features.map((feature, index) => (
                  <li key={`feature-${index}`} className="flex items-start text-zinc-300 text-sm py-1">
                    <span className="text-amber-500 mr-2 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}


          {/* Booking Button */}
          <div className="flex justify-center mt-8 pt-4 border-t border-zinc-700">
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => {
                // Close the modal first
                handleClose();
                // Use setTimeout to ensure modal is closed before scrolling
                setTimeout(() => {
                  const cotizarSection = document.getElementById('cotizar');
                  if (cotizarSection) {
                    console.log("Scrolling to #cotizar section");
                    cotizarSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    console.warn("#cotizar section not found");
                  }
                }, 150); // Slightly longer delay might be needed
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

