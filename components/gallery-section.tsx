"use client"

import { useState, useEffect } from "react" // Import useEffect
import Image from "next/image"
import { X, Loader2 } from "lucide-react" // Import Loader2 for loading state
import { Skeleton } from "@/components/ui/skeleton" // Import Skeleton

// Define a type for the gallery image data from the backend
interface GalleryImage {
  id: string // Or number, depending on your backend
  src: string
  alt: string
  category: string
}

// Comment out or remove the hardcoded galleryImages array
// const galleryImages = [
//   {
//     src: "/playa.webp",
//     alt: "Playa en Costa Rica",
//     category: "Playas",
//   },
//   {
//     src: "/vista-mar.webp",
//     alt: "Playa en Costa Rica",
//     category: "Playas",
//   },
//   {
//     src: "/palmeras-playa.webp",
//     alt: "Playa en Costa Rica",
//     category: "Playas",
//   },
//   {
//     src: "/mar.webp",
//     alt: "Playa en Costa Rica",
//     category: "Playas",
//   },
//   {
//     src: "/volcan.webp",
//     alt: "Volcán Arenal",
//     category: "Volcanes",
//   },
//   {
//     src: "/atardecer.webp",
//     alt: "Atardecer en el Pacífico",
//     category: "Atardeceres",
//   },
//   {
//     src: "/capilla.webp",
//     alt: "Cultura local",
//     category: "Cultura",
//   },
//   {
//     src: "/barva-capilla.webp",
//     alt: "Cultura local",
//     category: "Cultura",
//   },
//   {
//     src: "/cementerio.webp",
//     alt: "Cultura local",
//     category: "Cultura",
//   },
// ];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("Todos")

  // Add state for fetched gallery data, loading, and error
  const [galleryData, setGalleryData] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Helper function to build image source URLs
  function buildImageSrc(path?: string | null): string {
    if (!path || path.trim() === "") {
      return "/placeholder.svg"; // Fallback for missing or empty paths
    }
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path; // Already an absolute URL
    }
    // Assuming backend serves images from a specific base URL and path structure
    // Adjust this logic if your backend provides full URLs or different paths
    const baseUrl = "http://localhost:3001";
    if (path.startsWith("/uploads")) {
      return `${baseUrl}${path}`;
    }
    return `${baseUrl}/${path.replace(/^\/+/, "")}`; // Ensure single slash
  }

  // Fetch gallery images from the backend when the component mounts
  useEffect(() => {
    const fetchGalleryImages = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Adjust the endpoint URL as needed
        const response = await fetch("http://localhost:3001/gallery")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: GalleryImage[] = await response.json()
        setGalleryData(data)
      } catch (e) {
        console.error("Failed to fetch gallery images:", e)
        setError(e instanceof Error ? e.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryImages()
  }, [])

  const categories = ["Todos", ...Array.from(new Set(galleryData.map((img) => img.category)))]

  const filteredImages = filter === "Todos" ? galleryData : galleryData.filter((img) => img.category === filter)

  // --- Render Loading State ---
  if (isLoading) {
    return (
      <section id="galeria" className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-amber-500 font-medium mb-2">MOMENTOS CAPTURADOS</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestra Galería</h2>
            <Skeleton className="h-6 w-3/4 md:w-1/2 mx-auto bg-zinc-700" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-24 rounded-full bg-zinc-700" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-lg bg-zinc-700" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // --- Render Error State ---
  if (error) {
    return (
      <section id="galeria" className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl text-red-500 mb-4">Error al Cargar la Galería</h2>
          <p className="text-zinc-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()} // Simple retry by reloading
            className="px-4 py-2 bg-amber-500 text-black rounded-md hover:bg-amber-600"
          >
            Reintentar
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="galeria" className="py-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-amber-500 font-medium mb-2 animate-fade-in">MOMENTOS CAPTURADOS</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestra Galería</h2>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            Explora las maravillas de Costa Rica a través de nuestra colección de imágenes que capturan la esencia de
            este paraíso natural.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === category ? "bg-amber-500 text-black font-medium" : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Galería */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => ( // Use image.id if available and unique, otherwise index
            <div
              key={image.id || image.src} // Prefer unique ID from backend
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(buildImageSrc(image.src))}
            >
              <Image
                src={buildImageSrc(image.src)} // Use the helper function
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <p className="font-medium">{image.alt}</p>
                  <span className="text-xs bg-amber-500 text-black px-2 py-1 rounded-full mt-2 inline-block">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de imagen */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white bg-zinc-800/50 p-2 rounded-full hover:bg-zinc-700/50"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage} // selectedImage is already a full URL processed by buildImageSrc
                alt="Imagen ampliada"
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

