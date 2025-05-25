"use client"
import { getRecentBlogPosts } from "@/lib/blog-data"
import ActivitiesSection from "@/components/activities-section"
import Navbar from "@/components/navbar"
import WhatsappButton from "@/components/whatsapp-button"
import HeroSection from "@/components/hero-section"
import ToursSection from "@/components/tours-section"
import CaminoCostaRicaSection from "@/components/camino-costa-rica-section"
import GallerySection from "@/components/gallery-section"
import CotizarSection from "@/components/cotizar-section"
import Footer from "@/components/footer"
import BlogSection from "@/components/blog-section"
import ProductsSection from "@/components/products-section"


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
      <HeroSection />
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
      {/* Products Section */}
      <ProductsSection />
      {/* Blog Section */}
      <BlogSection />
      <Footer />
    </div>
  )
}

