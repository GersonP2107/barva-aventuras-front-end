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

