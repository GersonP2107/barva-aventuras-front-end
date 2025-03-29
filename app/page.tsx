"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Play,
  Compass,
  Camera,
  ChevronDown,
  Mail,
  Phone,
  LocateIcon as LocationIcon,
  Clock,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getRecentBlogPosts } from "@/lib/blog-data"
import ActivitiesSection from "@/components/activities-section"
import SimpleCarousel from "@/components/simple-carousel"
import Navbar from "@/components/navbar"
import WhatsappButton from "@/components/whatsapp-button"
import ToursSection from "@/components/tours-section"
import CaminoCostaRicaSection from "@/components/camino-costa-rica-section"
import GallerySection from "@/components/gallery-section"
import CotizarSection from "@/components/cotizar-section"

function HeroCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    {
      url: "/hero-playa.webp",
      title: "El Camino de Costa Rica",
      subtitle: "De Mar a Mar - 280 km de aventura",
    },
    {
      url: "/hero-capilla.webp",
      title: "La Capilla en las Nubes",
      subtitle: "Un Santuario Elevado en el Corazón de Costa Rica",
    },
    {
      url: "/hero-volcan.webp",
      title: "El Parque Nacional Volcán Poás",
      subtitle: "Descubre la Majestuosidad del Cráter Activo",
    },
  ]

  useEffect(() => {
    const rotateImages = () => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }

    const interval = setInterval(rotateImages, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>

      {/* Background Image Carousel */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        {heroImages.map((image, index) => ( 
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImageIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
           
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-amber-500 text-xl md:text-2xl font-medium tracking-wider uppercase animate-fade-in">
              Bienvenidos al paraíso
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 transition-all duration-700">
              {heroImages[currentImageIndex].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 transition-all duration-700">
              {heroImages[currentImageIndex].subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              className="group bg-amber-500 hover:bg-amber-600 text-black px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              onClick={() => {
                document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Reserva Tu Aventura</span>
              <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="group bg-transparent border-2 border-white hover:border-amber-400 text-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 hover:text-amber-400"
              onClick={() => {
                document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Descubre Más
            </Button>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index ? "bg-amber-500 w-8" : "bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-amber-400" />
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 py-6 px-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">15+</div>
              <div className="text-sm text-gray-300">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">50+</div>
              <div className="text-sm text-gray-300">Destinos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">1000+</div>
              <div className="text-sm text-gray-300">Clientes Felices</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">4.9</div>
              <div className="text-sm text-gray-300">Calificación Promedio</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Home() {
  const recentPosts = getRecentBlogPosts(6)

  // Determine items per view based on screen size
  const getProductsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 2
      if (window.innerWidth < 1024) return 3
      return 4
    }
    return 4 // Default for SSR
  }

  const getBlogsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3 // Default for SSR
  }

  return (
    <div className="bg-zinc-900 text-white">
      {/* Navbar */}
      <Navbar />
      {/* WhatsApp Button */}
      <WhatsappButton />

      {/* Hero Section */}
      <section className="relative h-screen pt-[120px]">
        <div className="absolute inset-0 w-full h-full">
          <HeroCarousel />
        </div>
      </section>
      {/* Tours Section */}
      <ToursSection />

      {/* Camino de Costa Rica Section */}
      <CaminoCostaRicaSection />


      {/* Gallery Section */}
      <GallerySection />

      {/* Best In Activities Section */}
      <ActivitiesSection />

      {/* Cotizar Tour Section */}
      <CotizarSection />

      {/* Create Memories Section */}
      <section className="relative h-[400px] my-16">
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="Fogata"
          width={1920}
          height={400}
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/80"></div>
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Crea recuerdos inolvidables</h2>
          <div className="flex gap-8 mb-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-500">500+</span>
              <span className="text-sm">Tours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-500">100+</span>
              <span className="text-sm">Destinos</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-500">12K+</span>
              <span className="text-sm">Viajeros</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500/20 rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-4 h-4 mr-2" /> Ver Video
          </Button>
        </div>
      </section>

      {/* Blog Section */}
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

      {/* Footer */}
      <footer id="contacto" className="bg-zinc-900 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
            +506 8342 8167              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" className="w-[50px] h-[45px]" alt="Barva Aventuras Logo" />
                <span className="text-2xl font-bold">Barva Aventuras</span>
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
                    href="#camino-costa-rica"
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Camino de Costa Rica
                  </Link>
                </li>
                <li>
                  <Link
                    href="#tours"
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Tours
                  </Link>
                </li>
                <li>
                  <Link
                    href="#galeria"
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Galería
                  </Link>
                </li>
                <li>
                  <Link
                    href="#cotizar"
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500" /> Cotizar Tour
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
                  <span className="text-zinc-400">Barva, Heredia, Costa Rica</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                  <span className="text-zinc-400">+506 8342 8167</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                  <span className="text-zinc-400">barvaventuras@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <Clock className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" />
                  <span className="text-zinc-400">Lun-Vie: 8:00 - 17:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-500 text-sm mb-4 md:mb-0">© 2023 Barva Aventuras. Todos los derechos reservados.</p>
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

          <div className="mt-8 bg-zinc-800/30 rounded-lg p-6 text-center">
            <p className="text-zinc-400 text-sm mb-4">Suscríbete a nuestro boletín para recibir ofertas exclusivas</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-zinc-700 border border-zinc-600 rounded-full px-4 py-2 text-white focus:outline-none focus:border-amber-500"
              />
              <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full transition-all duration-300">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

