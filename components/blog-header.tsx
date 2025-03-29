"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, Menu, X, Search, Headphones, Mail } from "lucide-react"

export default function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative bg-zinc-900 z-50">
      {/* Barra superior */}
      <div className="bg-zinc-900 border-b border-zinc-800 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-zinc-400 text-sm">
              <Headphones className="w-4 h-4 mr-2 text-amber-500" />
              <span>000-123-456789</span>
            </div>
            <div className="flex items-center text-zinc-400 text-sm">
              <Mail className="w-4 h-4 mr-2 text-amber-500" />
              <span>support@example.com</span>
            </div>
          </div>

          <div className="flex items-center">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold py-1 px-4 rounded-none">
              RESERVAR AHORA
            </Button>
          </div>
        </div>
      </div>

      {/* Barra de navegación principal */}
      <div className="bg-zinc-900/95 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-bold flex items-center space-x-2">
              <span className="text-white">ADVEN</span>
              <div className="bg-amber-500 p-1 rotate-45">
                <Compass className="w-5 h-5 text-white -rotate-45" />
              </div>
            </Link>
            <nav className="hidden md:flex gap-8">
              <Link href="/" className="relative group py-2">
                <span className="text-sm text-white group-hover:text-amber-500 transition-colors">INICIO</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/#camino-costa-rica" className="relative group py-2">
                <span className="text-sm text-white group-hover:text-amber-500 transition-colors">
                  CAMINO DE COSTA RICA
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/#tours" className="relative group py-2">
                <span className="text-sm text-white group-hover:text-amber-500 transition-colors">TOURS</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/#galeria" className="relative group py-2">
                <span className="text-sm text-white group-hover:text-amber-500 transition-colors">GALERÍA</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/#cotizar" className="relative group py-2">
                <span className="text-sm text-white group-hover:text-amber-500 transition-colors">COTIZAR TOUR</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-amber-500 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden text-white p-2 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
              <Link
                href="/"
                className="text-white hover:text-amber-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                INICIO
              </Link>
              <Link
                href="/#camino-costa-rica"
                className="text-white hover:text-amber-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                CAMINO DE COSTA RICA
              </Link>
              <Link
                href="/#tours"
                className="text-white hover:text-amber-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                TOURS
              </Link>
              <Link
                href="/#galeria"
                className="text-white hover:text-amber-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                GALERÍA
              </Link>
              <Link
                href="/#cotizar"
                className="text-white hover:text-amber-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                COTIZAR TOUR
              </Link>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-none w-full mt-2">
                RESERVAR AHORA
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

