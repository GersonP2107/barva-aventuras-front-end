"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, ImagePlus, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface GalleryFormData {
  alt: string
  category: string
  // image field will be handled by selectedFile and then imageUrl
}
export default function NewGalleryItemPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<GalleryFormData>({
    alt: "",
    category: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError(null) // Clear previous file errors
    } else {
      setSelectedFile(null)
      setImagePreview(null)
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      setError("Por favor, selecciona una imagen.")
      return
    }
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
      // Create FormData and append all data including the file
      const submissionFormData = new FormData()
      submissionFormData.append("image", selectedFile) // "image" must match the FileInterceptor key in backend
      submissionFormData.append("alt", formData.alt)
      submissionFormData.append("category", formData.category)

      // Send the combined data to the /gallery endpoint
      const response = await fetch("http://localhost:3001/gallery", {
        method: "POST",
        body: submissionFormData, // Send FormData directly, no 'Content-Type' header needed for FormData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Error al crear el ítem de galería" }))
        throw new Error(errorData.message || "Error del servidor")
      }

      console.log("Gallery item created successfully!")
      router.push("/admin/gallery") // Redirect to gallery admin page on success
    } catch (err) {
      console.error("Failed to create gallery item:", err)
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-0 text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Subir Nueva Imagen a Galería</h1>
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
              Sube una nueva imagen y proporciona la información necesaria.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="imageFile" className="block mb-2 text-sm font-medium">
                Archivo de Imagen
              </Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="bg-zinc-950 h-auto border-zinc-700 focus:border-amber-500 focus:ring-amber-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-zinc-400 mb-2">Vista previa:</p>
                  <img src={imagePreview} alt="Vista previa" className="max-w-xs max-h-48 rounded-md border border-zinc-700" />
                </div>
              )}
              {selectedFile && (
                <p className="text-sm mt-2 text-green-400">
                  Archivo seleccionado: {selectedFile.name}
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

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

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
            disabled={isSubmitting}
            className="bg-amber-500 hover:bg-amber-600 text-black px-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Subiendo...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> Guardar Imagen
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}