"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Headphones, Mail, Facebook, MessageCircle } from "lucide-react"

export default function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Modified to handle navigation between pages
  const navigateToSection = (id: string) => {
    // Close mobile menu if open
    if (isMenuOpen) setIsMenuOpen(false)
    
    // Check if we're already on the home page
    if (window.location.pathname === '/') {
      // If on home page, just scroll to the section
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If on another page, navigate to home with the hash
      window.location.href = `/#${id}`
    }
  }

  return (
    <header className="relative bg-zinc-900 z-50">
      {/* Barra superior */}
      <div className="bg-zinc-900 border-b border-zinc-800 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <section className="flex items-center space-x-6">
            <article className="flex items-center text-zinc-400 text-sm">
              <Headphones className="w-4 h-4 mr-2 text-amber-500" />
              <span>+506 8342 8167</span>
            </article>
            <article className="flex items-center text-zinc-400 text-sm">
              <Mail className="w-4 h-4 mr-2 text-amber-500" />
              <span>barvaaventuras@gmail.com</span>
            </article>
          </section>

          <div className="flex items-center space-x-4">
            <a href="https://www.facebook.com/profile.php?id=100063744872622&rdid=9pjmwOzNdDE5ahy7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Dc7BiGews%2F#" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://wa.me/50683428167" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="mailto:barvaaventuras@gmail.com" className="text-zinc-400 hover:text-amber-500 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Barra de navegación principal */}
      <div className="bg-zinc-900/95 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/">
              <img 
                src="/logo.png" 
                className="m-0 w-[65px] h-[55px] md:w-[100px] md:h-[90px]" 
                alt="Barva Aventuras Logo" 
              />
            </Link>
            <nav className="hidden md:flex gap-8">
              <button 
                onClick={() => navigateToSection('top')}
                className="text-sm text-white hover:text-amber-500 transition-colors bg-transparent border-none cursor-pointer"
              >
                INICIO
              </button>
              <button 
                onClick={() => navigateToSection('camino-costa-rica')}
                className="text-sm text-white hover:text-amber-500 transition-colors bg-transparent border-none cursor-pointer"
              >
                CAMINO DE COSTA RICA
              </button>
              <button 
                onClick={() => navigateToSection('tours')}
                className="text-sm text-white hover:text-amber-500 transition-colors bg-transparent border-none cursor-pointer"
              >
                TOURS
              </button>
              <button 
                onClick={() => navigateToSection('galeria')}
                className="text-sm text-white hover:text-amber-500 transition-colors bg-transparent border-none cursor-pointer"
              >
                GALERÍA
              </button>
              <button 
                onClick={() => navigateToSection('cotizar')}
                className="text-sm text-white hover:text-amber-500 transition-colors bg-transparent border-none cursor-pointer"
              >
                COTIZAR TOUR
              </button>
              <Link href="/blog" className="text-sm text-amber-500 hover:text-amber-600 transition-colors font-medium">
                BLOG
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigateToSection('cotizar')}
              className="bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold py-1 px-4 rounded-full hidden md:flex"
            >
              RESERVAR AHORA
            </Button>
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white p-2 focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-zinc-900/95 backdrop-blur-sm z-50 md:hidden border-t border-zinc-800">
          <div className="container mx-auto py-4 px-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => navigateToSection('top')}
                className="text-white hover:text-amber-500 transition-colors py-2 text-left bg-transparent border-none cursor-pointer"
              >
                INICIO
              </button>
              <button
                onClick={() => navigateToSection('camino-costa-rica')}
                className="text-white hover:text-amber-500 transition-colors py-2 text-left bg-transparent border-none cursor-pointer"
              >
                CAMINO DE COSTA RICA
              </button>
              <button
                onClick={() => navigateToSection('tours')}
                className="text-white hover:text-amber-500 transition-colors py-2 text-left bg-transparent border-none cursor-pointer"
              >
                TOURS
              </button>
              <button
                onClick={() => navigateToSection('galeria')}
                className="text-white hover:text-amber-500 transition-colors py-2 text-left bg-transparent border-none cursor-pointer"
              >
                GALERÍA
              </button>
              <button
                onClick={() => navigateToSection('cotizar')}
                className="text-white hover:text-amber-500 transition-colors py-2 text-left bg-transparent border-none cursor-pointer"
              >
                COTIZAR TOUR
              </button>
              <Link
                href="/blog"
                className="text-amber-500 hover:text-amber-600 transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                BLOG
              </Link>
              <Button 
                onClick={() => navigateToSection('cotizar')}
                className="bg-amber-500 hover:bg-amber-600 text-black rounded-full w-full mt-2 py-2 font-bold"
              >
                RESERVAR AHORA
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

