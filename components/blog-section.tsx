"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


// Definimos la interfaz para los posts del blog basada en la entidad del backend
interface BlogPost {
  id: string
  title: string
  slug: string
  author: string
  category: string
  readTime: string
  image: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:3001/blog')
        
        if (!response.ok) {
          throw new Error('No se pudieron cargar los artículos del blog')
        }
        
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        console.error('Error al cargar los posts del blog:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const getBlogsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3 // Default for SSR
  }

  // Función para generar un extracto del contenido
  const getExcerpt = (content: string, maxLength = 100) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + '...'
  }

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500" />
          <p className="mt-2 text-zinc-400">Cargando artículos...</p>
        </div>
      </section>
    )
  }

  // Mostrar mensaje de error
  if (error) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-black"
          >
            Reintentar
          </Button>
        </div>
      </section>
    )
  }

  // Limitar a 6 posts más recientes
  const recentPosts = posts.slice(0, 6)

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-amber-500 mb-2 animate-fade-in">Últimas Novedades</p>
        <h2 className="text-3xl font-bold">Blogs Relacionados con Viajes</h2>
      </div>

      {recentPosts.length > 0 ? (
        <div className="w-full max-w-7xl mx-auto">
          <Carousel className="mb-10">
            <CarouselContent>
              {recentPosts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/3 sm:basis-1/2 basis-full pl-4 md:pl-6">
                  <div className="bg-zinc-800 rounded-lg overflow-hidden group h-full">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="h-48 relative">
                        <Image
                          src={post.image?.startsWith("/uploads")
                            ? `http://localhost:3001${post.image}`
                            : post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/blog/${post.slug}`} className="block group">
                        <h4 className="font-semibold mb-2 group-hover:text-amber-500 text-2xl transition-colors">{post.title}</h4>
                      </Link>
                      <p className="text-zinc-400 text-lg mb-4">{getExcerpt(post.content)}</p>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="link" className="text-amber-500 p-0 h-auto">
                          Leer Más <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-4">
              <CarouselPrevious className="static transform-none bg-amber-500 hover:bg-amber-600 text-black border-none" />
              <CarouselNext className="static transform-none bg-amber-500 hover:bg-amber-600 text-black border-none" />
            </div>
          </Carousel>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-zinc-400">No hay artículos disponibles en este momento.</p>
        </div>
      )}

      <div className="flex justify-center">
        <Link href="/blog">
          <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105">
            Ver Todos los Artículos
          </Button>
        </Link>
      </div>
    </section>
  )
}