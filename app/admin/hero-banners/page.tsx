"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

interface HeroBanner {
  id: string
  url: string
  title: string
  subtitle: string
  isActive: boolean
  order: number
}

export default function HeroBannersAdmin() {
  const [banners, setBanners] = useState<HeroBanner[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3001/hero-banner")
      if (!response.ok) {
        throw new Error("Failed to fetch hero banners")
      }
      const data = await response.json()
      setBanners(data)
    } catch (error) {
      console.error("Error fetching hero banners:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los banners",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (banner: HeroBanner) => {
    router.push(`/admin/hero-banners/edit/${banner.id}`)
  }

  const handleDelete = async (banner: HeroBanner) => {
    if (window.confirm(`¿Estás seguro que deseas eliminar el banner "${banner.title}"?`)) {
      try {
        const response = await fetch(`http://localhost:3001/hero-banner/${banner.id}`, {
          method: "DELETE",
        })
        
        if (!response.ok) {
          throw new Error("Failed to delete banner")
        }
        
        setBanners(banners.filter((b) => b.id !== banner.id))
        toast({
          title: "Éxito",
          description: "Banner eliminado correctamente",
        })
      } catch (error) {
        console.error("Error deleting banner:", error)
        toast({
          title: "Error",
          description: "No se pudo eliminar el banner",
          variant: "destructive",
        })
      }
    }
  }

  const handleToggleActive = async (banner: HeroBanner) => {
    try {
      const response = await fetch(`http://localhost:3001/hero-banner/${banner.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !banner.isActive }),
      })
      
      if (!response.ok) {
        throw new Error("Failed to update banner status")
      }
      
      setBanners(
        banners.map((b) =>
          b.id === banner.id ? { ...b, isActive: !b.isActive } : b
        )
      )
      
      toast({
        title: "Éxito",
        description: `Banner ${banner.isActive ? "desactivado" : "activado"} correctamente`,
      })
    } catch (error) {
      console.error("Error updating banner status:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del banner",
        variant: "destructive",
      })
    }
  }

  const handleAdd = () => {
    router.push("/admin/hero-banners/new")
  }

  if (loading) {
    return (
      <section aria-label="Cargando" className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </section>
    )
  }

  return (
    <section className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hero Banners</h1>
        <Button onClick={handleAdd} className="bg-amber-500 hover:bg-amber-600">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Banner
        </Button>
      </header>

      {banners.length === 0 ? (
        <div className="text-center py-10 bg-zinc-800/30 rounded-lg">
          <p className="text-zinc-400 mb-4">No hay banners disponibles</p>
          <Button onClick={handleAdd} className="bg-amber-500 hover:bg-amber-600">
            <Plus className="w-4 h-4 mr-2" />
            Crear Primer Banner
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <Card key={banner.id} className="bg-zinc-800/50 border-zinc-700 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={banner.url.startsWith('/uploads') 
                    ? `http://localhost:3001${banner.url}` 
                    : banner.url}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-medium text-white">{banner.title}</CardTitle>
                  <Badge className={banner.isActive ? "bg-green-500" : "bg-zinc-500"}>
                    {banner.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm mb-4">{banner.subtitle}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-zinc-400">Orden: {banner.order}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-zinc-400">Activo</span>
                      <Switch
                        checked={banner.isActive}
                        onCheckedChange={() => handleToggleActive(banner)}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(banner)}
                      className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(banner)}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}