"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function CaminoCostaRicaSection() {
  return (
    <section id="camino-costa-rica" className="py-16 bg-zinc-800/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-amber-500 font-medium mb-2 animate-fade-in">DESCUBRE</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">El Camino de Costa Rica</h2>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            Una experiencia única que te llevará a través de los paisajes más impresionantes y la cultura auténtica de
            Costa Rica, desde el Caribe hasta el Pacífico.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center mb-12">
          <div className="relative w-[90%] h-[480px] md:h-[560px] md:w-[70%] mx-auto rounded-lg overflow-hidden">
            <Image
              src="/playa-costa-rica.webp"
              alt="Camino de Costa Rica"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Una Travesía Inolvidable</h3>
            <p className="text-zinc-300">
              El Camino de Costa Rica es una ruta de 280 kilómetros que conecta el Océano Caribe con el Océano Pacífico,
              atravesando 16 comunidades rurales, 5 áreas de conservación y diversos ecosistemas. El recorrido incluye
              impresionantes volcanes y el majestuoso Cerro Chirripó, el punto más alto de Costa Rica con 3820 metros
              sobre el nivel del mar, ofreciendo vistas incomparables de ambos océanos en días despejados.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-amber-500 mb-2">16 Comunidades</h4>
                <p className="text-sm text-zinc-400">
                  Conoce la auténtica cultura rural costarricense y su hospitalidad.
                </p>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-amber-500 mb-2">280 Kilómetros</h4>
                <p className="text-sm text-zinc-400">
                  Recorre a pie, en bicicleta o a caballo esta ruta histórica y cultural.
                </p>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-amber-500 mb-2">5 Áreas Protegidas</h4>
                <p className="text-sm text-zinc-400">
                  Explora parques nacionales y reservas de increíble biodiversidad.
                </p>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-amber-500 mb-2">2 Océanos</h4>
                <p className="text-sm text-zinc-400">Conecta el Caribe con el Pacífico en una experiencia única.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

