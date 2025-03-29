"use client"

import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function WhatsappButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Mostrar el botón después de un pequeño retraso para una mejor experiencia de usuario
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Número de WhatsApp (reemplazar con el número real)
  const phoneNumber = "+506 8342 8167"
  const message = "Hola, estoy interesado en sus servicios de aventura."

  // URL de WhatsApp con el número y mensaje predefinido
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  if (!isVisible) return null

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 animate-bounce-slow group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" />
      <span className="absolute right-full mr-3 bg-black/80 text-white text-sm py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        ¡Chatea con nosotros!
      </span>
    </Link>
  )
}

