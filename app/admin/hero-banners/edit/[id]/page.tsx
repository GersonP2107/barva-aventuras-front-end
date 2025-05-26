"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface HeroBanner {
  id: string
  url: string
  title: string
  subtitle: string
  isActive: boolean
  order: number
}

export default function EditHeroBanner() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const { toast } = useToast()
  
  const [formData, setFormData] = useState<Partial<HeroBanner>>({})
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const fetchBanner = useCallback(async () => {
    if (!id || !isMounted) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:3001/hero-banner/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch banner. Status: ${response.status}`)
      }
      
      const data: HeroBanner = await response.json()
      setFormData(data)
      setCurrentImageUrl(data.url || null)
    } catch (error) {
      console.error("Error fetching banner:", error)
      toast({
        title: "Error",
        description: "No se pudo cargar la información del banner",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [id, isMounted, toast])

  useEffect(() => {
    fetchBanner()
  }, [fetchBanner])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "order" ? parseInt(value) || 0 : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("http://localhost:3001/hero-banner/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Error uploading image")
      }

      const data = await res.json()
      return data.path // Return the path from the server
    } catch (error) {
      console.error("Image upload failed:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.subtitle) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Only upload a new image if one was selected
      let imageUrl = formData.url
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile)
      }
      
      // Update banner with possibly new image URL
      const response = await fetch(`http://localhost:3001/hero-banner/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          url: imageUrl,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update banner")
      }

      toast({
        title: "Éxito",
        description: "Banner actualizado correctamente",
      })
      
      router.push("/admin/hero-banners")
    } catch (error) {
      console.error("Error updating banner:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el banner",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <section className="p-6">
        <header className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/admin/hero-banners")}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <Skeleton className="h-8 w-48" />
        </header>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div>
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="p-6">
      <header className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => router.push("/admin/hero-banners")}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <h1 className="text-2xl font-bold">Editar Hero Banner</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardContent className="p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    required
                    className="bg-zinc-700 border-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtítulo *</Label>
                  <Input
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle || ""}
                    onChange={handleChange}
                    required
                    className="bg-zinc-700 border-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Orden</Label>
                  <Input
                    id="order"
                    name="order"
                    type="number"
                    value={formData.order || 0}
                    onChange={handleChange}
                    className="bg-zinc-700 border-zinc-600"
                  />
                  <p className="text-xs text-zinc-400">Determina el orden de aparición (menor número = primero)</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive || false}
                    onCheckedChange={(checked) => 
                      setFormData((prev) => ({ ...prev, isActive: checked }))
                    }
                  />
                  <Label htmlFor="isActive">Activo</Label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Imagen</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image")?.click()}
                      className="border-dashed border-2 text-black border-zinc-600 h-32 w-full flex flex-col items-center justify-center"
                    >
                      <Upload className="w-6 h-6 mb-2" />
                      <span>{selectedFile ? selectedFile.name : "Cambiar imagen"}</span>
                    </Button>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  
                  {/* Show either the new image preview or the current image */}
                  {imagePreview ? (
                    <div className="mt-4 relative h-48 w-full">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover rounded-md"
                      />
                      <p className="text-xs text-amber-500 mt-1">Nueva imagen seleccionada</p>
                    </div>
                  ) : currentImageUrl ? (
                    <div className="mt-4 relative h-48 w-full">
                      <Image
                        src={currentImageUrl.startsWith('/uploads') 
                          ? `http://localhost:3001${currentImageUrl}` 
                          : currentImageUrl}
                        alt="Current image"
                        fill
                        className="object-cover rounded-md"
                      />
                      <p className="text-xs text-zinc-400 mt-1">Imagen actual</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-500 hover:bg-amber-600"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                    Actualizando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Actualizar Banner
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </section>
  )
}