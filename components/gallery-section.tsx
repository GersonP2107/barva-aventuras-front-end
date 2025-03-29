"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

const galleryImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Playa en Costa Rica",
    category: "Playas",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Volcán Arenal",
    category: "Volcanes",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Selva tropical",
    category: "Selvas",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Fauna de Costa Rica",
    category: "Fauna",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Cascada en la selva",
    category: "Cascadas",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Atardecer en el Pacífico",
    category: "Atardeceres",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Aventura en tirolesa",
    category: "Aventuras",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Cultura local",
    category: "Cultura",
  },
]

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("Todos")

  const categories = ["Todos", ...Array.from(new Set(galleryImages.map((img) => img.category)))]

  const filteredImages = filter === "Todos" ? galleryImages : galleryImages.filter((img) => img.category === filter)

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
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
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
                src={selectedImage || "/placeholder.svg"}
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

