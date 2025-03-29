"use client"

import { useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SimpleCarouselProps {
  children: ReactNode[]
  itemsPerView?: number
  showArrows?: boolean
  showDots?: boolean
  className?: string
}

export default function SimpleCarousel({
  children,
  itemsPerView = 3,
  showArrows = true,
  showDots = true,
  className = "",
}: SimpleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalItems = children.length
  const maxIndex = Math.max(0, totalItems - itemsPerView)

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="px-2" style={{ width: `${100 / itemsPerView}%`, flexShrink: 0 }}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalItems > itemsPerView && (
        <>
          <Button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center z-10"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && totalItems > itemsPerView && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.min(totalItems, maxIndex + 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-amber-500 w-8" : "bg-zinc-500 hover:bg-zinc-400"
              }`}
              aria-label={`Ir a diapositiva ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

