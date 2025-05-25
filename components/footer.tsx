"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  Mail,
  Phone,
  LocateIcon as LocationIcon,
  Clock,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer id="contacto" className="bg-zinc-900 pt-16 pb-8">
      <section className="container mx-auto px-4">
        <nav className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <article className="space-y-4">
            <header className="flex items-center space-x-2 mb-4">
              <Image src="/logo.png" width={50} height={45} className="w-[50px] h-[45px]" alt="Barva Aventuras Logo" />
              <h2 className="text-2xl font-bold text-white">Barva Aventuras</h2>
            </header>
            <p className="text-zinc-400 text-sm">
              Somos especialistas en aventuras y viajes extraordinarios. Nuestra misión es crear experiencias
              inolvidables que transformen tu forma de ver el mundo.
            </p>
            <nav className="flex space-x-4 pt-2">
              <Link
                href="https://www.facebook.com/profile.php?id=100063744872622"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-600 text-black p-2 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/barvaventuras"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-600 text-black p-2 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </nav>
          </article>

          <section>
            <h3 className="text-lg font-bold mb-4 border-b border-amber-500 pb-2 inline-block text-white">Enlaces Rápidos</h3>
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center group">
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500 group-hover:translate-x-1 transition-transform" /> Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#actividades"
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500 group-hover:translate-x-1 transition-transform" /> Actividades
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#tours"
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500 group-hover:translate-x-1 transition-transform" /> Tours
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500 group-hover:translate-x-1 transition-transform" /> Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contacto"
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-amber-500 group-hover:translate-x-1 transition-transform" /> Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
          
          <section>
            <h3 className="text-lg font-bold mb-4 border-b border-amber-500 pb-2 inline-block text-white">Contacto</h3>
            <address className="not-italic">
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <LocationIcon className="w-5 h-5 text-amber-500 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">San José, Costa Rica</span>
                </li>
                <li className="flex items-center group">
                  <Phone className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="tel:+50683428167" className="text-zinc-400 group-hover:text-zinc-300 transition-colors">+506 8342 8167</a>
                </li>
                <li className="flex items-center group">
                  <Mail className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="mailto:barvaventuras@gmail.com" className="text-zinc-400 group-hover:text-zinc-300 transition-colors">barvaaventuras@gmail.com</a>
                </li>
                <li className="flex items-center group">
                  <Clock className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <time className="text-zinc-400 group-hover:text-zinc-300 transition-colors">Abierto 24 horas</time>
                </li>
              </ul>
            </address>
          </section>
          
          <section>
            <h3 className="text-lg font-bold mb-4 border-b border-amber-500 pb-2 inline-block text-white">Síguenos</h3>
            <p className="text-zinc-400 mb-4 text-sm">
              Síguenos en nuestras redes sociales para descubrir nuevas aventuras, promociones exclusivas y contenido inspirador.
            </p>
            <a 
              href="https://wa.me/50683428167" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-black py-2 px-4 rounded-md transition-all duration-300 text-center font-medium inline-block"
            >
              Contáctanos por WhatsApp
            </a>
          </section>
        </nav>

        <footer className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm mb-4 md:mb-0">© {currentYear} Barva Aventuras. Todos los derechos reservados.</p>
          <nav className="flex flex-wrap gap-4 justify-center">
            <Link href="" className="text-zinc-500 hover:text-amber-500 text-sm transition-colors">
              Términos de Uso
            </Link>
            <span className="text-zinc-700">|</span>
            <Link href="" className="text-zinc-500 hover:text-amber-500 text-sm transition-colors">
              Política de Privacidad
            </Link>
            <span className="text-zinc-700">|</span>
            <Link href="" className="text-zinc-500 hover:text-amber-500 text-sm transition-colors">
              Cookies
            </Link>
          </nav>
        </footer>
      </section>
    </footer>
  )
}