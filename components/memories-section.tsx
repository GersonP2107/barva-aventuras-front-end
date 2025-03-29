"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MemoriesSection() {
  return (
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
  )
}