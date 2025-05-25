"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  LocateIcon as LocationIcon,
  Compass,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import BlogHeader from "@/components/blog-header"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"

// Define the BlogPost interface based on backend structure
interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  author: string
  category?: string
  tags: string[]
  imageUrl: string
  readTime?: string
  createdAt: string
  updatedAt: string
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : ""
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Fetch the specific blog post by slug
        const response = await fetch(`http://localhost:3001/blog/slug/${slug}`)
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el artículo del blog')
        }
        
        const data = await response.json()
        setPost(data)
        
        // Fetch related posts
        const relatedResponse = await fetch(`http://localhost:3001/blog/related/${data.id}?limit=2`)
        
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedPosts(relatedData)
        } else {
          // If related posts endpoint fails, fetch recent posts instead
          const recentResponse = await fetch('http://localhost:3001/blog?limit=2')
          if (recentResponse.ok) {
            const recentData = await recentResponse.json()
            // Filter out the current post if it's in the recent posts
            setRelatedPosts(recentData.filter((p: BlogPost) => p.id !== data.id))
          } else {
            setRelatedPosts([])
          }
        }
      } catch (err) {
        console.error('Error al cargar el post del blog:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchBlogPost()
    }
  }, [slug])

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-zinc-900 text-white min-h-screen">
        <BlogHeader />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-amber-500 mb-4" />
            <p className="text-zinc-400">Cargando artículo...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-zinc-900 text-white min-h-screen">
        <BlogHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="mb-8 text-red-500">{error}</p>
          <Link href="/blog">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105">
              Volver al Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Not found state
  if (!post) {
    return (
      <div className="bg-zinc-900 text-white min-h-screen">
        <BlogHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
          <p className="mb-8">El artículo de blog que estás buscando no existe.</p>
          <Link href="/blog">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105">
              Volver al Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <BlogHeader />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-amber-500 mb-6 hover:underline group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:mr-2 transition-all" /> Volver a todos los artículos
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap gap-4 mb-8 text-zinc-400 text-sm">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(post.createdAt)}
            </div>
            {post.readTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime}
              </div>
            )}
          </div>

          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          <div
            className="prose prose-invert prose-amber max-w-none mb-12 text-pretty text-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {relatedPosts.length > 0 && (
            <div className="border-t border-zinc-800 pt-12 mt-12">
              <h2 className="text-2xl font-bold mb-6">Artículos Relacionados</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="bg-zinc-800 rounded-lg overflow-hidden group">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <div className="h-48 relative">
                        <Image
                          src={relatedPost.imageUrl || "/placeholder.svg"}
                          alt={relatedPost.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Badge className="bg-amber-500/20 text-amber-500 border-amber-500 m-2">
                        {relatedPost.category || (relatedPost.tags && relatedPost.tags.length > 0 ? relatedPost.tags[0] : 'General')}
                      </Badge>
                      <Link href={`/blog/${relatedPost.slug}`} className="block group">
                        <h3 className="font-bold mb-2 group-hover:text-amber-500 transition-colors">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-zinc-500">Por {relatedPost.author}</span>
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <Button
                            variant="link"
                            className="text-amber-500 p-0 h-auto group-hover:translate-x-1 transition-transform"
                          >
                            Leer Más <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

