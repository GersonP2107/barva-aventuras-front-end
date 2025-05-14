"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewActivity() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activity, setActivity] = useState({
    name: "",
    image: "",
    description: "",
    features: [""],
    duration: "",
    difficulty: "Moderado",
    price: "",
    location: "",
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setActivity({ ...activity, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setActivity({ ...activity, [name]: value })
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...activity[field as keyof typeof activity] as string[]]
    newArray[index] = value
    setActivity({ ...activity, [field]: newArray })
  }

  const addArrayItem = (field: string) => {
    const newArray = [...activity[field as keyof typeof activity] as string[], ""]
    setActivity({ ...activity, [field]: newArray })
  }

  const removeArrayItem = (field: string, index: number) => {
    const newArray = [...activity[field as keyof typeof activity] as string[]]
    if (newArray.length <= 1) {
      // Optionally clear the item instead of removing the input
      handleArrayChange(field, 0, "");
      return;
    }
    newArray.splice(index, 1)
    setActivity({ ...activity, [field]: newArray })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data, removing empty strings from arrays
      const dataToSubmit = { ...activity };
      if (Array.isArray(dataToSubmit.features)) {
        dataToSubmit.features = (dataToSubmit.features as string[]).filter(item => item.trim() !== '');
        if (dataToSubmit.features?.length === 0) {
          dataToSubmit.features = [];
        }
      }

      if (selectedFile) {
        try {
          const uploadedImageUrl = await uploadImage(selectedFile);
          dataToSubmit.image = uploadedImageUrl;
        } catch (uploadError) {
          alert("Error al subir la imagen. Intenta nuevamente.");
          setIsSubmitting(false);
          return;
        }
      }

      const response = await fetch("http://localhost:3001/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      })

      if (response.ok) {
        router.push("/admin/activities")
      } else {
        let errorMessage = "Failed to create activity";
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          errorMessage = `Error: ${response.status} ${response.statusText || "Unknown error"}`;
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error creating activity:", error)
      alert("Failed to create activity. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Crear Nueva Actividad</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-zinc-700 hover:bg-zinc-400 text-black"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="bg-zinc-900 text-white border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-amber-500">Información Básica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block mb-2 text-sm font-medium">Nombre de la Actividad</Label>
                  <Input
                    id="name"
                    name="name"
                    value={activity.name}
                    onChange={handleChange}
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
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
                </div>
                <div>
                  <Label htmlFor="duration" className="block mb-2 text-sm font-medium">Duración</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={activity.duration}
                    onChange={handleChange}
                    placeholder="ej. 3 horas"
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty" className="block mb-2 text-sm font-medium">Dificultad</Label>
                  <Select
                    value={activity.difficulty}
                    onValueChange={(value) => handleSelectChange("difficulty", value)}
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

              <div className="space-y-6">
                <div>
                  <Label htmlFor="price" className="block mb-2 text-sm font-medium">Precio (₡)</Label>
                  <Input
                    id="price"
                    name="price"
                    value={activity.price}
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
                    value={activity.location}
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
                    value={activity.description}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-500 hover:bg-amber-600 text-black"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Guardando..." : "Guardar Actividad"}
          </Button>
        </div>
      </form>
    </div>
  )
}