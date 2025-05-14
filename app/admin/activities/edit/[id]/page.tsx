"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Plus, X, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "@/types/activity" // Assuming you have this type defined

export default function EditActivity() {
  const router = useRouter()
  const params = useParams()
  // Log the raw params object
  console.log("Raw params:", params);
  // Refined ID extraction (handles potential array case, though unlikely here)
  const id = Array.isArray(params.id) ? params.id[0] : params.id as string;
  // Log the extracted ID
  console.log("Extracted ID:", id);

  const [activity, setActivity] = useState<Partial<Activity>>({})
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
  
    const res = await fetch("http://localhost:3001/activities/upload", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error("Error uploading image");
    }
  
    const data = await res.json();
    return `/uploads/${data.filename}`; // devuelve la URL
  };
  
  const fetchActivity = useCallback(async () => {
    // Add check here as well
    if (!id || typeof id !== 'string' || id.includes('.tsx')) {
        console.error("Invalid ID detected before fetching:", id);
        setError("Invalid activity ID in URL");
        setLoading(false);
        return;
    }
    setLoading(true)
    setError(null)
    try {
      const fetchUrl = `http://localhost:3001/activities/${id}`; // Define URL variable
      console.log(`Fetching activity with URL: ${fetchUrl}`) // Log the fetch URL
      const response = await fetch(fetchUrl, { cache: 'no-store' })
      if (!response.ok) {
        throw new Error(`Failed to fetch activity. Status: ${response.status}`)
      }
      const data: Activity = await response.json()
      console.log("Activity data fetched:", data)
      // Only initialize features array, remove the other arrays
      setActivity({
        ...data,
        features: data.features || [""],
      })
    } catch (err) {
      console.error("Error fetching activity:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }, [id]) // Keep dependencies simple

  useEffect(() => {
    if (isMounted && id) {
      // Add validation before calling fetch
      if (typeof id === 'string' && !id.includes('.tsx')) {
        fetchActivity()
      } else {
        console.error("Invalid ID detected in useEffect:", id);
        setError("Invalid activity ID in URL");
        setLoading(false);
      }
    }
  }, [id, isMounted, fetchActivity])

  // --- Form Handling Functions (Similar to NewActivity page) ---

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setActivity({ ...activity, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setActivity({ ...activity, [name]: value })
  }

  const handleArrayChange = (field: keyof Activity, index: number, value: string) => {
    if (!Array.isArray(activity[field])) return; // Type guard
    const newArray = [...(activity[field] as string[])]
    newArray[index] = value
    setActivity({ ...activity, [field]: newArray })
  }

  const addArrayItem = (field: keyof Activity) => {
    if (!Array.isArray(activity[field])) return; // Type guard
    const newArray = [...(activity[field] as string[]), ""]
    setActivity({ ...activity, [field]: newArray })
  }

  const removeArrayItem = (field: keyof Activity, index: number) => {
    if (!Array.isArray(activity[field])) return; // Type guard
    const currentArray = activity[field] as string[];
    // Prevent removing the last item if it's the only one
    if (currentArray.length <= 1) {
       // Optionally clear the item instead of removing the input
       handleArrayChange(field, index, "");
       return;
    }
    const newArray = currentArray.filter((_, i) => i !== index);
    setActivity({ ...activity, [field]: newArray })
  }

  // --- Submit Handler ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Add validation right before submitting
    if (!id || typeof id !== 'string' || id.includes('.tsx')) {
        console.error("Invalid ID detected before submitting:", id);
        setError("Cannot submit: Invalid activity ID.");
        return; // Stop submission if ID is invalid
    }

    setIsSubmitting(true)
    setError(null)

    // Prepare data, removing empty strings from arrays
    const dataToSubmit = { ...activity };
    // Only process the features array, remove the other arrays
    if (Array.isArray(dataToSubmit.features)) {
      dataToSubmit.features = (dataToSubmit.features as string[]).filter(item => item.trim() !== '');
      // If array becomes empty after filtering, ensure it's still an array
      if (dataToSubmit.features?.length === 0) {
        dataToSubmit.features = [];
      }
    }

    try {
      console.log("Submitting updated activity:", dataToSubmit)
      if (selectedFile) {
        try {
          const uploadedImageUrl = await uploadImage(selectedFile);
          dataToSubmit.image = uploadedImageUrl;
        } catch (uploadError) {
          setError("Error al subir la imagen. Intenta nuevamente.");
          setIsSubmitting(false);
          return;
        }
      }
      
      const response = await fetch(`http://localhost:3001/activities/${id}`, {
        method: "PATCH", // Use PATCH for partial updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (!response.ok) {
        // More robust error handling
        let errorMessage = `Server responded with status: ${response.status}`;
        try {
          // Try to parse as JSON, but don't fail if it's not valid JSON
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          // If JSON parsing fails, use the status text or a default message
          errorMessage = response.statusText || errorMessage;
          console.error("Error parsing error response:", parseError);
        }
        throw new Error(errorMessage);
      }

      console.log("Activity updated successfully")
      router.push("/admin/activities") // Redirect back to the list
    } catch (err) {
      console.error("Error updating activity:", err)
      setError(err instanceof Error ? err.message : "Failed to update activity")
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- Render Logic ---

  if (!isMounted) {
    return null; // Avoid hydration issues
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-white">
        <p className="text-red-400 mb-4">Error loading activity: {error}</p>
        <Button
          onClick={fetchActivity}
          variant="outline"
          className="border-zinc-800 text-black hover:bg-zinc-800"
        >
          <RefreshCw className="w-4 h-4 mr-2 text-black"/> Retry
        </Button>
      </div>
    )
  }

  // --- Form JSX (Similar to NewActivity page, but using 'activity' state) ---
  return (
    <div className="max-w-4xl mx-auto text-white"> {/* Center content and limit width */}
      <div className="flex items-center justify-between mb-8"> {/* Increased bottom margin */}
        <h1 className="text-3xl font-bold">Editar Actividad: {activity.name || 'Cargando...'}</h1> {/* Larger title */}
        <Button
          variant="outline"
          onClick={() => router.back()} // Use router.back() for more intuitive navigation
          className="border-zinc-700 hover:bg-zinc-400 text-black" // Slightly lighter border
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8"> {/* Add space between form sections */}
        {/* --- Basic Info Card --- */}
        <Card className="bg-zinc-900 text-white border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-amber-500">Información Básica</CardTitle> {/* Added CardHeader and Title */}
          </CardHeader>
          <CardContent> {/* Removed pt-6, handled by CardHeader */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"> {/* Adjusted gap */}
              {/* Left Column */}
              <div className="space-y-6"> {/* Increased space */}
                <div>
                  <Label htmlFor="name" className="block mb-2 text-sm font-medium">Nombre de la Actividad</Label> {/* Improved label spacing */}
                  <Input
                    id="name"
                    name="name"
                    value={activity.name || ""}
                    onChange={handleChange}
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500" // Adjusted colors
                  />
                </div>
                <div>
                  <Label htmlFor="image" className="block mb-2 text-sm font-medium">Imagen</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="bg-zinc-950 border-zinc-700"
                  />
                  {selectedFile && (
                    <p className="text-sm mt-1 text-green-400">
                      Archivo seleccionado: {selectedFile.name}
                    </p>
                  )}
                  {!selectedFile && activity.image && (
                    <img
                      src={`http://localhost:3001${activity.image}`}
                      alt="Imagen actual"
                      className="mt-2 w-40 rounded border border-zinc-700"
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor="duration" className="block mb-2 text-sm font-medium">Duración</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={activity.duration || ""}
                    onChange={handleChange}
                    placeholder="ej. 3 horas"
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty" className="block mb-2 text-sm font-medium">Dificultad</Label>
                  <Select
                    value={activity.difficulty || "Moderado"}
                    onValueChange={(value) => handleSelectChange("difficulty", value)}
                  >
                    <SelectTrigger className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500">
                      <SelectValue placeholder="Seleccionar dificultad" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 text-white"> {/* Ensure dropdown matches theme */}
                      <SelectItem value="Fácil">Fácil</SelectItem>
                      <SelectItem value="Moderado">Moderado</SelectItem>
                      <SelectItem value="Difícil">Difícil</SelectItem>
                      <SelectItem value="Extremo">Extremo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-6"> {/* Increased space */}
                <div>
                  <Label htmlFor="price" className="block mb-2 text-sm font-medium">Precio (₡)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="any"
                    value={activity.price || ""}
                    onChange={handleChange}
                    placeholder="ej. 35000"
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="block mb-2 text-sm font-medium">Ubicación</Label>
                  <Input
                    id="location"
                    name="location"
                    value={activity.location || ""}
                    onChange={handleChange}
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="block mb-2 text-sm font-medium">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={activity.description || ""}
                    onChange={handleChange}
                    rows={5} // Slightly taller
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
        <div className="flex justify-end gap-4"> {/* Added gap for buttons */}
           <Button
            type="button" // Important: type="button" to prevent form submission
            variant="outline"
            onClick={() => router.back()} // Go back on cancel
            disabled={isSubmitting}
            className="border-zinc-700 hover:bg-zinc-400 text-black"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || loading}
            className="bg-amber-500 hover:bg-amber-600 text-black px-6" // Added padding
          >
            <Save className="w-4 h-4 mr-2" /> {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  )
}