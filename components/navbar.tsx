"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Headphones, Mail, Facebook, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      if (isMenuOpen) toggleMenu()
    }
  }

  return (
    <header className="absolute w-full z-50">
      {/* Top Bar - Hidden on mobile, visible on md and up */}
      <div className="hidden md:block bg-transparent border-b border-zinc-500/30 py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-zinc-200 text-sm">
              <Headphones className="w-4 h-4 mr-2 text-amber-500" />
              <span>+506 8342 8167</span>
            </div>
            <div className="flex items-center text-zinc-200 text-sm">
              <Mail className="w-4 h-4 mr-2 text-amber-500" />
              <span>barvaventuras@gmail.com</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-amber-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://wa.me/50683428167" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-amber-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="mailto:barvaventuras@gmail.com" className="text-zinc-200 hover:text-amber-500 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-transparent py-4 px-4 transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <img 
              src="/logo.png" 
              className="m-0 w-[65px] h-[55px] md:w-[100px] md:h-[90px]" 
              alt="Barva Aventuras Logo" 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('top')} 
              className="text-sm text-white hover:text-amber-500 transition-colors bg-transparent border-none cursor-pointer"
            >
              INICIO
            </button>
            <button
              onClick={() => scrollToSection('camino-costa-rica')}
              className="text-sm text-amber-500 hover:text-amber-600 transition-colors font-medium bg-transparent border-none cursor-pointer"
            >
              CAMINO DE COSTA RICA
            </button>
            <button 
              onClick={() => scrollToSection('tours')} 
              className="text-sm text-white hover:text-amber-500 transition-colors bg-transparent border-none cursor-pointer"
            >
              TOURS
            </button>
            <button 
              onClick={() => scrollToSection('galeria')} 
              className="text-sm text-white hover:text-amber-500 transition-colors bg-transparent border-none cursor-pointer"
            >
              GALERÍA
            </button>
            <button 
              onClick={() => scrollToSection('cotizar')} 
              className="text-sm text-white hover:text-amber-500 transition-colors bg-transparent border-none cursor-pointer"
            >
              COTIZAR TOUR
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2 focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-zinc-800/30 absolute w-full">
          <div className="container mx-auto py-4 px-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('top')} 
                className="text-white hover:text-amber-500 transition-colors py-2 text-left bg-transparent border-none cursor-pointer"
              >
                INICIO
              </button>
              <button
                onClick={() => scrollToSection('camino-costa-rica')}
                className="text-white hover:text-amber-500 transition-colors py-2 text-left bg-transparent border-none cursor-pointer"
              >
                CAMINO DE COSTA RICA
              </button>
              <button
                onClick={() => scrollToSection('tours')}
                className="text-white hover:text-amber-500 transition-colors py-2 text-left bg-transparent border-none cursor-pointer"
              >
                TOURS
              </button>
              <button
                onClick={() => scrollToSection('galeria')}
                className="text-white hover:text-amber-500 transition-colors py-2 text-left bg-transparent border-none cursor-pointer"
              >
                GALERÍA
              </button>
              <button
                onClick={() => scrollToSection('cotizar')}
                className="text-white hover:text-amber-500 transition-colors py-2 text-left bg-transparent border-none cursor-pointer"
              >
                COTIZAR TOUR
              </button>
              <Button 
                className="bg-amber-500 hover:bg-amber-600 text-black w-full rounded-full mt-2"
                onClick={() => scrollToSection('cotizar')}
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

