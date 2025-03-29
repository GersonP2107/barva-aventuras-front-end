"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SimpleCarousel from "@/components/simple-carousel"
import { getRecentBlogPosts } from "@/lib/blog-data"

export default function BlogSection() {
  const recentPosts = getRecentBlogPosts(6)

  const getBlogsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3 // Default for SSR
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-amber-500 mb-2 animate-fade-in">Últimas Novedades</p>
        <h2 className="text-3xl font-bold">Blogs Relacionados con Viajes</h2>
      </div>

      <SimpleCarousel itemsPerView={getBlogsPerView()} showArrows={true} showDots={true} className="mb-10">
        {recentPosts.map((post) => (
          <div key={post.id} className="bg-zinc-800 rounded-lg overflow-hidden group h-full">
            <Link href={`/blog/${post.id}`} className="block">
              <div className="h-48 relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Link>
            <div className="p-4">
              <Badge className="bg-amber-500/20 text-amber-500 border-amber-500 mb-2">{post.category}</Badge>
              <Link href={`/blog/${post.id}`} className="block group">
                <h4 className="font-semibold mb-2 group-hover:text-amber-500 transition-colors">{post.title}</h4>
              </Link>
              <p className="text-zinc-400 text-sm mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.id}`}>
                <Button variant="link" className="text-amber-500 p-0 h-auto">
                  Leer Más <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </SimpleCarousel>

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