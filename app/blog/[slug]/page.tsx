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
} from "lucide-react"
import { getBlogPost, getRelatedBlogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import BlogHeader from "@/components/blog-header"
import { useEffect, useState } from "react"

export default function BlogPostPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : ""

  const [post, setPost] = useState(getBlogPost(slug))
  const [relatedPosts, setRelatedPosts] = useState(getRelatedBlogPosts(slug, 2))

  useEffect(() => {
    setPost(getBlogPost(slug))
    setRelatedPosts(getRelatedBlogPosts(slug, 2))
  }, [slug])

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

          <Badge className="bg-amber-500/20 text-amber-500 border-amber-500 mb-4">{post.category}</Badge>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap gap-4 mb-8 text-zinc-400 text-sm">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
          </div>

          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          <div
            className="prose prose-invert prose-amber max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="border-t border-zinc-800 pt-12 mt-12">
            <h2 className="text-2xl font-bold mb-6">Artículos Relacionados</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="bg-zinc-800 rounded-lg overflow-hidden group">
                  <Link href={`/blog/${relatedPost.id}`} className="block">
                    <div className="h-48 relative">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Badge className="bg-amber-500/20 text-amber-500 border-amber-500 mb-2">
                      {relatedPost.category}
                    </Badge>
                    <Link href={`/blog/${relatedPost.id}`} className="block group">
                      <h3 className="font-bold mb-2 group-hover:text-amber-500 transition-colors">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-500">{relatedPost.readTime}</span>
                      <Link href={`/blog/${relatedPost.id}`}>
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
        </div>
      </main>

      <footer className="bg-zinc-900 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="rounded-full bg-amber-500 p-2">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ADVEN</span>
              </div>
              <p className="text-zinc-400 text-sm">
                Somos especialistas en aventuras y viajes extraordinarios. Nuestra misión es crear experiencias
                inolvidables que transformen tu forma de ver el mundo.
              </p>
              <div className="flex space-x-4 pt-2">
                <Link
                  href="#"
                  className="bg-amber-500 hover:bg-amber-600 text-black p-2 rounded-full transition-all duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="bg-amber-500 hover:bg-amber-600 text-black p-2 rounded-full transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="bg-amber-500 hover:bg-amber-600 text-black p-2 rounded-full transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 border-b border-amber-500 pb-2 inline-block">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#destinos"
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Destinos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#tours"
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Tours
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#actividades"
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Actividades
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 border-b border-amber-500 pb-2 inline-block">Información</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Testimonios
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 border-b border-amber-500 pb-2 inline-block">Contacto</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <LocationIcon className="w-5 h-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-zinc-400">Calle Aventura 123, Ciudad Viajera, España</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                  <span className="text-zinc-400">+34 912 345 678</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                  <span className="text-zinc-400">info@adven.com</span>
                </li>
                <li className="flex items-center">
                  <Clock className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                  <span className="text-zinc-400">Lun-Vie: 9:00 - 18:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-500 text-sm mb-4 md:mb-0">© 2023 ADVEN. Todos los derechos reservados.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#" className="text-zinc-500 hover:text-amber-500 text-sm">
                Términos de Uso
              </Link>
              <span className="text-zinc-700">|</span>
              <Link href="#" className="text-zinc-500 hover:text-amber-500 text-sm">
                Política de Privacidad
              </Link>
              <span className="text-zinc-700">|</span>
              <Link href="#" className="text-zinc-500 hover:text-amber-500 text-sm">
                Cookies
              </Link>
              <span className="text-zinc-700">|</span>
              <Link href="#" className="text-zinc-500 hover:text-amber-500 text-sm">
                Mapa del Sitio
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

