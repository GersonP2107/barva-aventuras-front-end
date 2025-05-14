"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
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
import type { Tour } from "@/types/tour" // Ensure this type is defined
import { Skeleton } from "@/components/ui/skeleton" // For loading state

export default function EditTour() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string // Get ID from URL

  const [tourData, setTourData] = useState<Partial<Tour>>({})
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null) // To show current image
  const [loading, setLoading] = useState(true) // Start loading true for fetching
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- Fetch Existing Tour Data ---
  const fetchTour = useCallback(async () => {
    if (!id || !isMounted) return; // Don't fetch if no ID or not mounted

    console.log(`Fetching tour with ID: ${id}`);
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`http://localhost:3001/tours/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch tour. Status: ${response.status}`)
      }
      const data: Tour = await response.json()
      console.log("Fetched tour data:", data)
      // Remove the initialization of the arrays we don't want to use anymore
      setTourData({
        ...data,
        // No longer initialize included, notIncluded, recommendations arrays
      })
      setCurrentImageUrl(data.image || null) // Set current image URL for preview
    } catch (err) {
      console.error("Error fetching tour:", err)
      setError(err instanceof Error ? err.message : "Failed to load tour data")
    } finally {
      setLoading(false)
    }
  }, [id, isMounted])

  useEffect(() => {
    fetchTour()
  }, [fetchTour]) // Fetch when the component mounts or ID changes

  // --- Form Input Handlers (same as NewTour) ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setTourData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTourData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null)
    // Optionally clear current image preview when new file is selected
    // setCurrentImageUrl(null);
  }

  // --- Array Input Handlers (same as NewTour) ---
  const handleArrayChange = (
    field: keyof Tour,
    index: number,
    value: string
  ) => {
    setTourData((prev) => {
      const currentArray = (prev[field] as string[] | undefined) || []
      const newArray = [...currentArray]
      newArray[index] = value
      return { ...prev, [field]: newArray }
    })
  }

  const addArrayItem = (field: keyof Tour) => {
    setTourData((prev) => ({
      ...prev,
      [field]: [...((prev[field] as string[] | undefined) || []), ""],
    }))
  }

  const removeArrayItem = (field: keyof Tour, index: number) => {
    setTourData((prev) => ({
      ...prev,
      [field]: ((prev[field] as string[] | undefined) || []).filter(
        (_, i) => i !== index
      ),
    }))
  }

  // --- Image Upload Function (same as NewTour) ---
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      // Use the same tour image upload endpoint
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

      const data = await res.json();
      return `/uploads/${data.filename}`;
    } catch (uploadError) {
      console.error("Image upload failed:", uploadError)
      throw uploadError
    }
  }

  // --- Form Submission Handler (Updated for PATCH) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) {
      setError("Tour ID is missing.")
      return
    }
    setIsSubmitting(true)
    setError(null)

    // Start with existing image URL, might be overwritten by upload
    let imageUrl = tourData.image;

    try {
      // 1. Upload image ONLY if a new file is selected
      if (selectedFile) {
        console.log("Uploading new image...");
        imageUrl = await uploadImage(selectedFile)
        console.log("New image URL:", imageUrl);
      }

      // 2. Prepare final data
      const dataToSubmit = { ...tourData, image: imageUrl }

      // Remove the array processing for fields we don't want anymore
      // No need to process included, notIncluded, recommendations arrays

      // Basic validation
      if (!dataToSubmit.title || !dataToSubmit.duration || !dataToSubmit.destination) {
          throw new Error("Por favor completa todos los campos requeridos.");
      }

      // 3. Submit updated tour data to backend using PATCH
      console.log("Submitting updated tour data:", dataToSubmit);
      const response = await fetch(`http://localhost:3001/tours/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Error al actualizar el tour" }))
        throw new Error(errorData.message || "Error del servidor")
      }

      console.log("Tour updated successfully!")
      router.push("/admin/tours") // Redirect on success
    } catch (err) {
      console.error("Failed to update tour:", err)
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  

  // --- Render Error State ---
  if (error && !isSubmitting) { // Don't show fetch error if a submit error occurs
      return (
          <div className="max-w-4xl mx-auto text-center text-white p-10">
              <h2 className="text-2xl text-red-500 mb-4">Error</h2>
              <p className="mb-6">{error}</p>
              <Button variant="outline" onClick={() => router.back()}>Volver</Button>
              <Button variant="secondary" onClick={fetchTour} className="ml-4">Reintentar</Button>
          </div>
      );
  }

  // --- JSX Form ---
  return (
    <div className="max-w-4xl mx-auto text-white p-4 md:p-0">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Editar Tour</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-zinc-700 text-black hover:bg-zinc-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
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
                  {/* Show current image preview */}
                  {currentImageUrl && !selectedFile && (
                     <div className="mb-2">
                       <p className="text-xs text-zinc-400 mb-1">Imagen actual:</p>
                       <img
                         src={currentImageUrl.startsWith('/uploads') 
                           ? `http://localhost:3001${currentImageUrl}` 
                           : currentImageUrl}
                         alt="Imagen actual"
                         className="mt-2 w-40 h-auto object-cover rounded border border-zinc-700"
                       />
                     </div>
                  )}
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-sm mt-1 text-green-400">
                      Nuevo archivo seleccionado: {selectedFile.name}
                    </p>
                  )}
                   <p className="text-xs text-zinc-500 mt-1">Sube una nueva imagen para reemplazar la actual.</p>
                </div>
                {/* ... other fields like duration, difficulty ... */}
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
                {/* ... other fields like price, destination, description ... */}
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
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
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
            className="border-zinc-700 text-black hover:bg-zinc-400"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || loading} // Disable if loading initial data too
            className="bg-amber-500 hover:bg-amber-600 text-black px-6"
          >
            <Save className="w-4 h-4 mr-2" />{" "}
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  )
}