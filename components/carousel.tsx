"use client"

import type React from "react"

import { useState, useEffect, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  children: ReactNode[]
  itemsToShow?: { mobile: number; tablet: number; desktop: number }
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showDots?: boolean
  className?: string
}

export default function Carousel({
  children,
  itemsToShow = { mobile: 1, tablet: 2, desktop: 3 },
  autoPlay = false,
  interval = 5000,
  showArrows = true,
  showDots = true,
  className = "",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [itemsPerView, setItemsPerView] = useState(itemsToShow.desktop)
  const totalItems = children.length
  const maxIndex = Math.max(0, totalItems - itemsPerView)

  // Determine items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(itemsToShow.mobile)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(itemsToShow.tablet)
      } else {
        setItemsPerView(itemsToShow.desktop)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [itemsToShow])

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      next()
    }, interval)

    return () => clearInterval(timer)
  }, [currentIndex, autoPlay, interval])

  const next = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0
      }
      return prev + 1
    })
  }

  const prev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex
      }
      return prev - 1
    })
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      next()
    }

    if (isRightSwipe) {
      prev()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Calculate visible items
  const visibleItems = () => {
    const items = [...children]
    const startIndex = currentIndex
    const endIndex = Math.min(startIndex + itemsPerView, totalItems)

    // If we're at the end, add items from the beginning to fill the view
    if (endIndex - startIndex < itemsPerView) {
      const remainingItems = itemsPerView - (endIndex - startIndex)
      return [...items.slice(startIndex), ...items.slice(0, remainingItems)]
    }

    return items.slice(startIndex, endIndex)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex transition-transform duration-500 ease-out">
          {visibleItems().map((child, index) => (
            <div key={index} className="px-2" style={{ width: `${100 / itemsPerView}%` }}>
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

