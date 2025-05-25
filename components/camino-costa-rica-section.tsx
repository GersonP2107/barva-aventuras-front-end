"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

interface CaminoCostaRicaData {
  id: string;
  headerSubtitle: string;
  headerTitle: string;
  headerParagraph: string;
  mainImageSrc: string;
  mainImageAlt: string;
  contentTitle: string;
  contentParagraph: string;
}

const initialData: CaminoCostaRicaData = {
  id: "1",
  headerSubtitle: "DESCUBRE",
  headerTitle: "El Camino de Costa Rica",
  headerParagraph: 
    "Una experiencia única que te llevará a través de los paisajes más impresionantes y la cultura auténtica de Costa Rica, desde el Caribe hasta el Pacífico.",
  mainImageSrc: "/playa-costa-rica.webp", // Placeholder, will be updated from backend
  mainImageAlt: "Paisaje del Camino de Costa Rica",
  contentTitle: "Una Travesía Inolvidable",
  contentParagraph:
    "El Camino de Costa Rica es una ruta de 280 kilómetros que conecta el Océano Caribe con el Océano Pacífico, atravesando 16 comunidades rurales, 5 áreas de conservación y diversos ecosistemas. El recorrido incluye impresionantes volcanes y el majestuoso Cerro Chirripó, el punto más alto de Costa Rica con 3820 metros sobre el nivel del mar, ofreciendo vistas incomparables de ambos océanos en días despejados.",
};

export default function CaminoCostaRicaSection() {
  const [data, setData] = useState<CaminoCostaRicaData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Helper function to build image source URLs
  function buildImageSrc(path?: string | null): string {
    if (!path || path.trim() === "") {
      return "/placeholder.svg"; // Fallback for missing or empty paths
    }
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path; // Already an absolute URL
    }
    // Assuming backend serves images from a specific base URL and path structure
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
    if (path.startsWith("/uploads")) {
      return `${baseUrl}${path}`;
    }
    return `${baseUrl}/${path.replace(/^\/+/, "")}`; // Ensure single slash
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Make sure the API endpoint is correct and the server is running
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}/api/camino-costa-rica-info`;
        console.log("Fetching from:", apiUrl); // Debug log
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch Camino Costa Rica data")
        }
        
        const result = await response.json()
        setData(result)
      } catch (e) {
        console.error("Failed to fetch Camino de Costa Rica data:", e)
        setError(e instanceof Error ? e.message : "An unknown error occurred")
        // Still use initialData as fallback
        setData(initialData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <section id="camino-costa-rica" className="py-16 bg-zinc-800/30">
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <Skeleton className="h-6 w-1/4 mx-auto mb-2 bg-zinc-700" />
            <Skeleton className="h-12 w-1/2 mx-auto mb-4 bg-zinc-700" />
            <Skeleton className="h-16 w-3/4 mx-auto bg-zinc-700" />
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <Skeleton className="relative w-[90%] h-[480px] md:h-[560px] md:w-[70%] mx-auto rounded-lg bg-zinc-700" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4 bg-zinc-700" />
              <Skeleton className="h-24 w-full bg-zinc-700" />
              <Skeleton className="h-24 w-full bg-zinc-700" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error && !data) { // Show error only if data couldn't be fetched and no fallback
    return (
      <section id="camino-costa-rica" className="py-16 bg-zinc-800/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl text-red-500 mb-4">Error al Cargar Contenido</h2>
          <p className="text-zinc-400 mb-6">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-amber-500 hover:bg-amber-600 text-black"
          >
            <RefreshCcw className="w-4 h-4 mr-2" /> Reintentar
          </Button>
        </div>
      </section>
    );
  }
  
  // If data is null after attempting to fetch (and potentially failing with fallback), use initialData
  const displayData = data || initialData;

  return (
    <section id="camino-costa-rica" className="py-16 bg-zinc-800/30">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h3 className="text-amber-500 font-medium mb-2 animate-fade-in">
            {displayData.headerSubtitle}
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {displayData.headerTitle}
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            {displayData.headerParagraph}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <figure className="relative w-[90%] h-[480px] md:h-[560px] md:w-[70%] mx-auto rounded-lg overflow-hidden">
            <Image
              src={buildImageSrc(displayData.mainImageSrc)}
              alt={displayData.mainImageAlt}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 50vw"
              className="object-cover rounded-lg"
              priority // Consider adding priority if this is above the fold or critical
            />
          </figure>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">{displayData.contentTitle}</h3>
            <p className="text-zinc-300 text-xl">
              {displayData.contentParagraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

