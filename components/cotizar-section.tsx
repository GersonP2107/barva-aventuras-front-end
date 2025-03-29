"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Send } from "lucide-react"

export default function CotizarSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    personas: "",
    fechaViaje: "",
    duracion: "",
    destinos: "",
    mensaje: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    alert("Formulario enviado con éxito. Nos pondremos en contacto contigo pronto.")
    // Resetear el formulario
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      personas: "",
      fechaViaje: "",
      duracion: "",
      destinos: "",
      mensaje: "",
    })
  }

  return (
    <section id="cotizar" className="py-16 bg-zinc-800/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-amber-500 font-medium mb-2 animate-fade-in">PERSONALIZA TU EXPERIENCIA</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Cotiza Tu Tour</h2>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            Diseña tu aventura perfecta en Costa Rica. Completa el formulario y nuestro equipo te enviará una cotización
            personalizada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-black font-bold">1</span>
                </span>
                Por qué cotizar con nosotros
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-zinc-300">Tours 100% personalizados según tus intereses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-zinc-300">Guías locales expertos y certificados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-zinc-300">Atención personalizada durante todo el proceso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-zinc-300">Opciones para todos los presupuestos</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-black font-bold">2</span>
                </span>
                Información de contacto
              </h3>
              <div className="space-y-3">
                <p className="flex items-center text-zinc-300">
                  <MapPin className="w-5 h-5 text-amber-500 mr-3" />
                  San José, Costa Rica
                </p>
                <p className="flex items-center text-zinc-300">
                  <Phone className="w-5 h-5 text-amber-500 mr-3" />
                  +506 2222-3333
                </p>
                <p className="flex items-center text-zinc-300">
                  <Mail className="w-5 h-5 text-amber-500 mr-3" />
                  info@caminocostarica.com
                </p>
                <p className="flex items-center text-zinc-300">
                  <Clock className="w-5 h-5 text-amber-500 mr-3" />
                  Lun-Vie: 8:00 - 17:00
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-zinc-800/50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-zinc-300 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-zinc-300 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label htmlFor="personas" className="block text-sm font-medium text-zinc-300 mb-1">
                    Número de personas *
                  </label>
                  <input
                    type="number"
                    id="personas"
                    name="personas"
                    value={formData.personas}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="fechaViaje" className="block text-sm font-medium text-zinc-300 mb-1">
                    Fecha aproximada de viaje
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="fechaViaje"
                      name="fechaViaje"
                      value={formData.fechaViaje}
                      onChange={handleChange}
                      className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label htmlFor="duracion" className="block text-sm font-medium text-zinc-300 mb-1">
                    Duración aproximada
                  </label>
                  <select
                    id="duracion"
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleChange}
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="">Seleccionar duración</option>
                    <option value="1-3 días">1-3 días</option>
                    <option value="4-7 días">4-7 días</option>
                    <option value="8-14 días">8-14 días</option>
                    <option value="15+ días">15+ días</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="destinos" className="block text-sm font-medium text-zinc-300 mb-1">
                  Destinos de interés
                </label>
                <input
                  type="text"
                  id="destinos"
                  name="destinos"
                  value={formData.destinos}
                  onChange={handleChange}
                  placeholder="Ej: San José, Arenal, Manuel Antonio..."
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="mensaje" className="block text-sm font-medium text-zinc-300 mb-1">
                  Mensaje o requerimientos especiales
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <Button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105 w-full flex items-center justify-center"
              >
                Enviar Solicitud <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Componentes adicionales necesarios
function Phone(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function Mail(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

