import Link from "next/link"
import Image from "next/image"
import {
  ChevronRight,
  Compass,
  Facebook,
  Instagram,
  Twitter,
  LocateIcon as LocationIcon,
  Phone,
  Mail,
  Clock,
} from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import BlogHeader from "@/components/blog-header"
import Footer from "@/components/footer"

export default function BlogPage() {
  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <BlogHeader />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Blogs de Viajes</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Descubre consejos de viaje, historias de aventuras y conocimientos de viajeros experimentados de todo el
            mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-zinc-800 rounded-lg overflow-hidden group">
              <Link href={`/blog/${post.id}`} className="block">
                <div className="h-56 relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <Badge className="bg-amber-500/20 text-amber-500 border-amber-500">{post.category}</Badge>
                  <span className="text-xs text-zinc-400">{post.date}</span>
                </div>
                <Link href={`/blog/${post.id}`} className="block group">
                  <h2 className="text-xl font-bold mb-3 group-hover:text-amber-500 transition-colors">{post.title}</h2>
                </Link>
                <p className="text-zinc-400 text-sm mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-500">{post.readTime}</span>
                  <Link href={`/blog/${post.id}`}>
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
      </main>
      
      <Footer />
    </div>
  )
}

