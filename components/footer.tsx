"use client"

import Link from "next/link"
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
  return (
    <footer id="contacto" className="bg-zinc-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
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
      </div>
    </footer>
  )
}