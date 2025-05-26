"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function NewHeroBanner() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    order: 0,
    isActive: true,
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!selectedFile) {
      setError("Por favor selecciona una imagen para el banner")
      return
    }

    if (!formData.title || !formData.subtitle) {
      setError("Por favor completa todos los campos requeridos")
      return
    }

    setIsSubmitting(true)

    try {
      // 1. Upload image
      const imageFormData = new FormData()
      imageFormData.append("file", selectedFile)
      
      const uploadResponse = await fetch("http://localhost:3001/hero-banner/upload", {
        method: "POST",
        body: imageFormData,
      })

      if (!uploadResponse.ok) {
        throw new Error("Error al subir la imagen")
      }

      const uploadData = await uploadResponse.json()
      const imageUrl = uploadData.path
      
      // 2. Create banner with image URL
      const response = await fetch("http://localhost:3001/hero-banner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          url: imageUrl,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al crear el banner")
      }

      toast({
        title: "Éxito",
        description: "Banner creado correctamente",
      })
      
      router.push("/admin/hero-banners")
    } catch (err) {
      console.error("Error creating banner:", err)
      setError(err instanceof Error ? err.message : "Error al crear el banner")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-0">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Nuevo Hero Banner</h1>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/hero-banners")}
          className="border-zinc-700 text-black hover:bg-zinc-400"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Button>
      </header>

      {error && (
        <div role="alert" aria-live="assertive" className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtítulo *</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Orden</Label>
              <Input
                id="order"
                name="order"
                type="number"
                value={formData.order}
                onChange={handleChange}
                className="bg-zinc-800 border-zinc-700"
              />
              <p className="text-xs text-zinc-400">Determina el orden de aparición (menor número = primero)</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => 
                  setFormData((prev) => ({ ...prev, isActive: checked }))
                }
              />
              <Label htmlFor="isActive">Activo</Label>
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Imagen *</Label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image")?.click()}
                  className="border-dashed border-2 border-zinc-600 h-32 w-full flex flex-col items-center justify-center"
                >
                  <Upload className="w-6 h-6 mb-2 text-black" />
                  <span className="text-black">{selectedFile ? selectedFile.name : "Seleccionar imagen"}</span>
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
              {imagePreview && (
                <figure className="mt-4 relative h-48 w-full">
                  <Image
                    src={imagePreview}
                    alt="Vista previa"
                    fill
                    className="object-cover rounded-md"
                  />
                  <figcaption className="sr-only">Vista previa de la imagen</figcaption>
                </figure>
              )}
            </div>
          </section>
        </div>

        <footer className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/hero-banners")}
            className="border-zinc-700 text-black hover:bg-zinc-400"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-500 hover:bg-amber-600 text-black px-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...
              </>
            ) : (
              "Crear Banner"
            )}
          </Button>
        </footer>
      </form>
    </main>
  )
}