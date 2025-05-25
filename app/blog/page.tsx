"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import BlogHeader from "@/components/blog-header"
import Footer from "@/components/footer"

// Define the BlogPost interface based on backend structure
interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  author: string
  category?: string
  tags: string[]
  image: string
  readTime?: string
  createdAt: string
  updatedAt: string
}

export default function BlogPage() {
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

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Function to create excerpt from content
  const createExcerpt = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + '...'
  }

  return (
    <div className="bg-zinc-900 text-white min-h-screen flex flex-col">
      <BlogHeader />

      <main className="container mx-auto px-4 py-16 flex-grow">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Blogs de Viajes</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Descubre consejos de viaje, historias de aventuras y conocimientos de viajeros experimentados de todo el
            mundo.
          </p>
        </header>

        {isLoading ? (
          <section aria-label="Cargando contenido" className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-amber-500" aria-hidden="true" />
            <span className="ml-3 text-zinc-400">Cargando artículos...</span>
          </section>
        ) : error ? (
          <section aria-label="Error" className="text-center py-10" role="alert">
            <p className="text-red-500 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              Reintentar
            </Button>
          </section>
        ) : posts.length === 0 ? (
          <section aria-label="Sin contenido" className="text-center py-10">
            <p className="text-zinc-400">No hay artículos disponibles en este momento.</p>
          </section>
        ) : (
          <section aria-label="Artículos del blog">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0">
              {posts.map((post) => (
                <li key={post.id} className="bg-zinc-800 rounded-lg overflow-hidden group">
                  <article>
                    <Link href={`/blog/${post.slug}`} className="block">
                      <figure className="h-56 relative m-0">
                        <Image
                          src={post.image?.startsWith("/uploads")
                            ? `http://localhost:3001${post.image}`
                            : post.image || "/placeholder.svg"}
                          alt={`Imagen para ${post.title}`}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </figure>
                    </Link>
                    <div className="p-6">
                      <header className="flex justify-between items-center mb-3">
                        <Badge className="bg-amber-500/20 text-amber-500 border-amber-500">
                          {post.category || (post.tags && post.tags.length > 0 ? post.tags[0] : "General")}
                        </Badge>
                        <time dateTime={post.createdAt} className="text-sm text-zinc-400">
                          {formatDate(post.createdAt)}
                        </time>
                      </header>
                      <Link href={`/blog/${post.slug}`} className="block group">
                        <h2 className="text-2xl font-bold mb-3 group-hover:text-amber-500 transition-colors">{post.title}</h2>
                      </Link>
                      <div className="text-zinc-400 mb-4 text-lg">
                        {createExcerpt(post.content)}
                      </div>
                      <footer className="flex justify-between items-center">
                        <address className="text-sm text-zinc-500 not-italic">
                          Por {post.author}
                        </address>
                        <Link href={`/blog/${post.slug}`}>
                          <Button
                            variant="link"
                            className="text-amber-500 p-0 h-auto group-hover:translate-x-1 transition-transform"
                          >
                            Leer Más <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" aria-hidden="true" />
                          </Button>
                        </Link>
                      </footer>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

