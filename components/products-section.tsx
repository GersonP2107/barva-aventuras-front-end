"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, Loader2, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Define the Product interface
interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  isActive: boolean
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function buildImageSrc(path?: string | null) {
    if (!path || path.trim() === "") {
      return "/placeholder.svg";
    }
  
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
  
    if (path.startsWith("/uploads")) {
      return `http://localhost:3001${path}`;
    }
  
    return `http://localhost:3001/${path.replace(/^\/+/, "")}`;
  }
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch("http://localhost:3001/products")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Product[] = await response.json()
        setProducts(data)
      } catch (e) {
        console.error("Failed to fetch products:", e)
        setError(e instanceof Error ? e.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Render star ratings
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-amber-500 fill-amber-500" : "text-zinc-600"
            }`}
          />
        ))}
      </div>
    );
  };

  // Loading State
  if (isLoading) {
    return (
      <section id="products" className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <p className="text-amber-500 mb-2">New Arrival</p>
            <h2 className="text-3xl font-bold text-white">Handpicked Products</h2>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <article key={index} className="bg-zinc-800 rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full bg-zinc-700" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-zinc-700" />
                  <Skeleton className="h-4 w-1/2 bg-zinc-700" />
                  <Skeleton className="h-4 w-1/4 bg-zinc-700" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section id="products" className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <p className="text-amber-500 mb-2">New Arrival</p>
            <h2 className="text-3xl font-bold text-white">Handpicked Products</h2>
          </header>
          <div className="text-center">
            <p className="text-red-500 mb-4">Error al cargar los productos: {error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              <RefreshCcw className="w-4 h-4 mr-2" /> Reintentar
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Main Content
  return (
    <section id="products" className="py-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <p className="text-amber-500 mb-2 animate-fade-in">Lo Más Nuevo</p>
          <h2 className="text-3xl font-bold text-white">Descubre Nuestros Productos</h2>
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <article key={product.id} className="bg-zinc-800 rounded-lg overflow-hidden group">
                <figure className="relative h-48 overflow-hidden bg-white">

                  <Image
                    src={buildImageSrc(product.image)}
                    alt={product.name}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </figure>
                <div className="p-4">
                  <h3 className="font-bold text-lg uppercase mb-1 text-white">{product.name}</h3>
                  {renderRating(product.rating)}
                  <div className="flex items-center mt-2">
                    <span className="text-white font-bold">₡{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-400 py-10">
            No hay productos disponibles en este momento.
          </p>
        )}
      </div>
    </section>
  )
}