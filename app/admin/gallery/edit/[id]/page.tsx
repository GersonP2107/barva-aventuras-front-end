"use client"

import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Save, ImagePlus, Loader2, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton" // For loading state

interface GalleryItemData {
  id: string
  src: string
  alt: string
  category: string
}

interface GalleryFormData {
  alt: string
  category: string
}

export default function EditGalleryItemPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string // Get ID from URL

  const [formData, setFormData] = useState<GalleryFormData>({
    alt: "",
    category: "",
  })
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const fetchGalleryItem = useCallback(async () => {
    if (!id) return
    setIsLoadingData(true)
    setError(null)
    try {
      const response = await fetch(`http://localhost:3001/gallery/${id}`)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error al cargar el ítem de galería: ${response.statusText}`)
      }
      const item: GalleryItemData = await response.json()
      setFormData({ alt: item.alt, category: item.category })
      setCurrentImageUrl(item.src) // Store the original image URL
    } catch (err) {
      console.error("Failed to fetch gallery item:", err)
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado al cargar los datos.")
    } finally {
      setIsLoadingData(false)
    }
  }, [id])

  useEffect(() => {
    fetchGalleryItem()
  }, [fetchGalleryItem])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError(null)
    } else {
      setSelectedFile(null)
      setImagePreview(null)
    }
  }

  // Re-use uploadImage function from new page, adjust endpoint if necessary
  const uploadImage = async (file: File): Promise<string> => {
    const imageFormData = new FormData()
    imageFormData.append("file", file)
    // Ensure this endpoint is correct for your backend setup
    const res = await fetch("http://localhost:3001/uploads/gallery", {
      method: "POST",
      body: imageFormData,
    })
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Error al subir la imagen" }))
      throw new Error(errorData.message || "Error desconocido al subir la imagen")
    }
    const data = await res.json()
    if (!data.url && !data.filename) {
      throw new Error("La respuesta del servidor no incluyó URL o nombre de archivo para la imagen")
    }
    return data.url || `/uploads/gallery/${data.filename}`
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formData.alt.trim()) {
      setError("Por favor, ingresa un texto alternativo para la imagen.")
      return
    }
    if (!formData.category.trim()) {
      setError("Por favor, ingresa una categoría para la imagen.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      let imageUrl = currentImageUrl // Start with existing image URL

      if (selectedFile) {
        console.log("Uploading new image...");
        imageUrl = await uploadImage(selectedFile)
        console.log("New image URL:", imageUrl);
      }

      if (!imageUrl) {
        throw new Error("No se pudo determinar la URL de la imagen.");
      }

      const galleryItemDataToUpdate = {
        src: imageUrl,
        alt: formData.alt,
        category: formData.category,
      }

      const response = await fetch(`http://localhost:3001/gallery/${id}`, {
        method: "PATCH", // Or "PUT" depending on your backend
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryItemDataToUpdate),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Error al actualizar el ítem de galería" }))
        throw new Error(errorData.message || "Error del servidor")
      }

      console.log("Gallery item updated successfully!")
      router.push("/admin/gallery")
    } catch (err) {
      console.error("Failed to update gallery item:", err)
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper to build full image URL for display if paths are relative
  const buildDisplayImageUrl = (path: string | null): string | null => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Adjust if your paths are stored differently, e.g., always absolute or need a different prefix
    return `http://localhost:3001${path.startsWith('/') ? '' : '/'}${path}`;
  }


  if (isLoadingData) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-0 text-white space-y-8">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-9 w-72 bg-zinc-700" />
          <Skeleton className="h-9 w-24 bg-zinc-700" />
        </div>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-zinc-700" />
            <Skeleton className="h-4 w-full mt-2 bg-zinc-700" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-40 w-full bg-zinc-700" /> {/* Image placeholder */}
            <Skeleton className="h-10 w-full bg-zinc-700" /> {/* Alt text */}
            <Skeleton className="h-10 w-full bg-zinc-700" /> {/* Category */}
          </CardContent>
        </Card>
        <div className="flex justify-end gap-4">
          <Skeleton className="h-10 w-24 bg-zinc-700" />
          <Skeleton className="h-10 w-32 bg-zinc-700" />
        </div>
      </div>
    )
  }

  if (error && !isSubmitting) { // Show fetch error if not a submit error
    return (
      <div className="max-w-2xl mx-auto text-center text-white p-10">
        <h2 className="text-2xl text-red-500 mb-4">Error al Cargar Datos</h2>
        <p className="mb-6">{error}</p>
        <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => router.back()} className="border-zinc-700 text-black hover:bg-zinc-400">
                <ArrowLeft className="w-4 h-4 mr-2" /> Volver
            </Button>
            <Button variant="secondary" onClick={fetchGalleryItem} className="bg-amber-500 hover:bg-amber-600 text-black">
                <RefreshCw className="w-4 h-4 mr-2" /> Reintentar
            </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-0 text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Editar Imagen de Galería</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-zinc-700 text-black hover:bg-zinc-400"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="bg-zinc-900 text-white border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-amber-500">Detalles de la Imagen</CardTitle>
            <CardDescription className="text-zinc-400">
              Modifica la información de la imagen o sube una nueva para reemplazarla.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="imageFile" className="block mb-2 text-sm font-medium">
                Archivo de Imagen (Opcional: subir para reemplazar)
              </Label>
              {currentImageUrl && !imagePreview && (
                <div className="mb-4">
                  <p className="text-sm text-zinc-400 mb-2">Imagen actual:</p>
                  <img 
                    src={buildDisplayImageUrl(currentImageUrl) || undefined}
                    alt="Imagen actual" 
                    className="max-w-xs max-h-48 rounded-md border border-zinc-700" 
                  />
                </div>
              )}
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-zinc-400 mb-2">Nueva imagen (vista previa):</p>
                  <img src={imagePreview} alt="Vista previa de nueva imagen" className="max-w-xs max-h-48 rounded-md border border-zinc-700" />
                </div>
              )}
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="bg-zinc-950 h-auto border-zinc-700 focus:border-amber-500 focus:ring-amber-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer"
              />
              {selectedFile && (
                <p className="text-sm mt-2 text-green-400">
                  Nuevo archivo seleccionado: {selectedFile.name}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="alt" className="block mb-2 text-sm font-medium">
                Texto Alternativo (Alt Text)
              </Label>
              <Input
                id="alt"
                name="alt"
                value={formData.alt}
                onChange={handleChange}
                required
                placeholder="Ej: Atardecer en la playa con palmeras"
                className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <Label htmlFor="category" className="block mb-2 text-sm font-medium">
                Categoría
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="Ej: Playas, Montañas, Cultura"
                className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </CardContent>
        </Card>

        {error && isSubmitting && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="border-zinc-700 hover:bg-zinc-400 text-black"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || isLoadingData}
            className="bg-amber-500 hover:bg-amber-600 text-black px-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Actualizando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> Guardar Cambios
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}