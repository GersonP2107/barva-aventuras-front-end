
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Clock, MapPin, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Activity } from "@/types/activity"; // Assuming type is defined here or adjust path

type ActivityModalProps = {
  // activity: Activity | null // Remove this prop
  activityId: string | null // Add activityId prop
  isOpen: boolean
  onClose: () => void
}

export default function ActivityModal({ activityId, isOpen, onClose: handleClose }: ActivityModalProps & { onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  // Add state for activity data, loading, and error
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true)

    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Add useEffect for fetching data
  useEffect(() => {
    const fetchActivity = async () => {
      if (!isOpen || !activityId) {
        // Don't fetch if modal is closed or no ID is provided
        setActivity(null); // Reset data when closed or ID changes
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      setActivity(null); // Clear previous data before fetching new

      try {
        console.log(`Fetching activity with ID: ${activityId}`); // Log fetching attempt
        const response = await fetch(`http://localhost:3001/activities/${activityId}`, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Failed to fetch activity. Status: ${response.status}`);
        }
        const data: Activity = await response.json();
        console.log("Activity data fetched:", data); // Log fetched data
        setActivity(data);
      } catch (err) {
        console.error("Error fetching activity:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
       fetchActivity();
    }

    // Cleanup function or dependency array logic might be needed
    // depending on how often activityId/isOpen change while mounted.
    // This setup fetches when isOpen becomes true with a valid activityId.

  }, [isOpen, activityId, mounted]); // Add dependencies

  if (!mounted) return null
  if (!activity) return null

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
        <Image
            src={activity.image?.startsWith("/uploads")
              ? `http://localhost:3001${activity.image}`
              : activity.image || "/placeholder.svg"}
            alt={activity.name}
            fill
            className="object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-zinc-900/80 text-white p-2 rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4">
             {/* Use activityData */}
            <Badge className={`${getDifficultyColor(activity.difficulty)} text-white px-3 py-1 text-xs`}>
              {activity.difficulty}
            </Badge>
          </div>
        </div>

        <div className="p-6">
           {/* Use activityData */}
          <h2 className="text-4xl font-bold text-amber-500 mb-5">{activity.name}</h2>
           {/* Use activityData */}
          <p className="text-zinc-300 text-2xl mb-5">{activity.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-xl text-zinc-300">
              <Clock className="w-5 h-5 text-amber-500 mr-2" />
               {/* Use activityData */}
              <span>{activity.duration}</span>
            </div>
            <div className="flex items-center text-xl text-zinc-300">
              <MapPin className="w-10 h-10 text-amber-500 " />
               {/* Use activityData */}
              <span>{activity.location}</span>
            </div>
            <div className="flex items-center text-xl text-zinc-300">
              <DollarSign className="w-5 h-5 text-amber-500 mr-2" />
              {/* Format price with thousands separator */}
              <span>{activity.price?.toLocaleString('es-CR')} CRC</span>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                // Close the modal first
                handleClose();
                // Use setTimeout to delay the scroll action slightly
                setTimeout(() => {
                  const cotizarSection = document.getElementById('cotizar');
                  if (cotizarSection) {
                    cotizarSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100); // Delay ensures modal is closed before scrolling
              }}
            >
              Reservar Esta Actividad
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

