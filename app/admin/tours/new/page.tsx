"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Tour } from "@/types/tour" // Assuming you have a Tour type defined similar to Activity

// Define the initial empty state for a new tour
const initialTourState: Partial<Tour> = {
  title: "",
  description: "",
  image: "", // Will be populated by upload URL
  duration: "",
  difficulty: "Moderado", // Default value
  price: "0",
  destination: "",
  included: [""], // Start with one empty item
  notIncluded: [""],
  recommendations: [""],
}

export default function NewTour() {
  const router = useRouter()
  const [tourData, setTourData] = useState<Partial<Tour>>(initialTourState)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // --- Form Input Handlers ---

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setTourData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value, // Handle price as number
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTourData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null)
  }

  // --- Image Upload Function ---
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file) // Key 'file' must match backend @UploadedFile('file')

    try {
      // IMPORTANT: Use your actual tour image upload endpoint
      const res = await fetch("http://localhost:3001/tours/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Unknown upload error" }))
        throw new Error(errorData.message || "Error uploading image")
      }

      const data = await res.json()
      // Adjust based on your backend response (e.g., data.url or construct from data.filename)
      if (!data.url && !data.filename) {
        throw new Error("Upload response missing URL or filename")
      }
      return data.url || `/uploads/${data.filename}` // Return the accessible URL
    } catch (uploadError) {
      console.error("Image upload failed:", uploadError)
      throw uploadError // Re-throw to be caught by handleSubmit
    }
  }

  // --- Form Submission Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    let imageUrl = "" // Initialize image URL

    try {
      // 1. Upload image if selected
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile)
      }

      // 2. Prepare final data
      const dataToSubmit = { ...tourData, image: imageUrl }

      // Clean up empty array items
      ;(["included", "notIncluded", "recommendations"] as const).forEach(
        (field) => {
          if (Array.isArray(dataToSubmit[field])) {
            dataToSubmit[field] = (dataToSubmit[field] as string[]).filter(
              (item) => item.trim() !== ""
            )
          }
        }
      )

      // Basic validation (add more as needed)
      if (!dataToSubmit.title || !dataToSubmit.duration || !dataToSubmit.destination) {
          throw new Error("Por favor completa todos los campos requeridos.");
      }


      // 3. Submit tour data to backend
      const response = await fetch("http://localhost:3001/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Error al crear el tour" }))
        throw new Error(errorData.message || "Error del servidor")
      }

      console.log("Tour created successfully!")
      router.push("/admin/tours") // Redirect on success
    } catch (err) {
      console.error("Failed to create tour:", err)
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- JSX Form ---
  return (
    <div className="max-w-4xl mx-auto text-white p-4 md:p-0">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Crear Nuevo Tour</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-zinc-700 text-black hover:bg-zinc-400"
        >
          <ArrowLeft className="w-4 h-4 mr-2 " /> Volver
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* --- Basic Info Card --- */}
        <Card className="bg-zinc-900 text-white border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-amber-500">
              Información Básica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="block mb-2 text-sm font-medium">
                    Título del Tour
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={tourData.title || ""}
                    onChange={handleChange}
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <Label htmlFor="imageFile" className="block mb-2 text-sm font-medium">
                    Imagen del Tour
                  </Label>
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="bg-zinc-950 h-24 border-zinc-700 focus:border-amber-500 focus:ring-amber-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-sm mt-1 text-green-400">
                      Archivo seleccionado: {selectedFile.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="duration" className="block mb-2 text-sm font-medium">
                    Duración
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={tourData.duration || ""}
                    onChange={handleChange}
                    placeholder="ej. 5 horas"
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty" className="block mb-2 text-sm font-medium">
                    Dificultad
                  </Label>
                  <Select
                    value={tourData.difficulty || "Moderado"}
                    onValueChange={(value) =>
                      handleSelectChange("difficulty", value)
                    }
                  >
                    <SelectTrigger className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500">
                      <SelectValue placeholder="Seleccionar dificultad" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                      <SelectItem value="Fácil">Fácil</SelectItem>
                      <SelectItem value="Moderado">Moderado</SelectItem>
                      <SelectItem value="Difícil">Difícil</SelectItem>
                      <SelectItem value="Extremo">Extremo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="price" className="block mb-2 text-sm font-medium">
                    Precio (₡)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="any"
                    value={tourData.price || ""}
                    onChange={handleChange}
                    placeholder="ej. 50000"
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <Label htmlFor="destination" className="block mb-2 text-sm font-medium">
                    Destino Principal
                  </Label>
                  <Input
                    id="destination"
                    name="destination"
                    value={tourData.destination || ""}
                    onChange={handleChange}
                    required
                    className="bg-zinc-950 border-zinc-700 text-white focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="block mb-2 text-sm font-medium">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={tourData.description || ""}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- Submit Button --- */}
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
            <Save className="w-4 h-4 mr-2" />{" "}
            {isSubmitting ? "Creando..." : "Crear Tour"}
          </Button>
        </div>
      </form>
    </div>
  )
}