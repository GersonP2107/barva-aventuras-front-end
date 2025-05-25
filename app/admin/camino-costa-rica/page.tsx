"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CaminoCostaRicaData {
  id: string;
  headerSubtitle: string;
  headerTitle: string;
  headerParagraph: string;
  mainImageSrc: string;
  mainImageAlt: string;
  contentTitle: string;
  contentParagraph: string;
}

export default function CaminoCostaRicaAdminPage() {
  // Initialize with empty data instead of null to avoid issues with controlled inputs
  const [data, setData] = useState<CaminoCostaRicaData>({
    id: "",
    headerSubtitle: "",
    headerTitle: "",
    headerParagraph: "",
    mainImageSrc: "",
    mainImageAlt: "",
    contentTitle: "",
    contentParagraph: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Functions remain the same
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}/api/camino-costa-rica-info`, {
        credentials: "include",
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch Camino Costa Rica data")
      }
      
      const result = await response.json()
      setData(result) // Now this will update the initialized state
      
      // Set image preview if there's an image
      if (result.mainImageSrc) {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
        const imageSrc = result.mainImageSrc.startsWith("/uploads")
          ? `${baseUrl}${result.mainImageSrc}`
          : result.mainImageSrc
        setImagePreview(imageSrc)
      }
    } catch (error) {
      console.error("Error fetching Camino Costa Rica data:", error)
      toast({
        title: "Error",
        description: "No se pudo cargar la información del Camino de Costa Rica",
        variant: "destructive",
      })
      // Don't reset data to null on error
    } finally {
      setIsLoading(false)
    }
  }

  // Update the handleChange function to be more robust
  const handleChange = (field: keyof CaminoCostaRicaData, value: string) => {
    setData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      
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
    
    if (!data) return
    
    setIsSaving(true)
    
    try {
      // Create form data to handle file upload
      const formData = new FormData()
      formData.append("id", data.id)
      formData.append("headerSubtitle", data.headerSubtitle)
      formData.append("headerTitle", data.headerTitle)
      formData.append("headerParagraph", data.headerParagraph)
      formData.append("mainImageAlt", data.mainImageAlt)
      formData.append("contentTitle", data.contentTitle)
      formData.append("contentParagraph", data.contentParagraph)
      
      // Only append image if a new one is selected
      if (selectedImage) {
        formData.append("mainImage", selectedImage)
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}/api/camino-costa-rica-info`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error("Failed to update Camino Costa Rica data")
      }
      
      toast({
        title: "Éxito",
        description: "Información actualizada correctamente",
      })
      
      // Refresh data
      fetchData()
    } catch (error) {
      console.error("Error updating Camino Costa Rica data:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar la información",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          </div>
        </div>
      </AdminLayout>
    )
  }

  // Update the input fields to use the new handleChange function
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Editar Camino de Costa Rica</h1>
          <Button
            variant="outline"
            onClick={() => router.push("/admin")}
            className="border-zinc-700 hover:bg-zinc-400 text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="bg-zinc-900 text-white border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-amber-500">Encabezado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <Label htmlFor="headerSubtitle" className="block mb-2 text-sm font-medium">Subtítulo</Label>
                  <Input
                    id="headerSubtitle"
                    value={data.headerSubtitle}
                    onChange={(e) => handleChange('headerSubtitle', e.target.value)}
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="headerTitle" className="block mb-2 text-sm font-medium">Título</Label>
                  <Input
                    id="headerTitle"
                    value={data.headerTitle}
                    onChange={(e) => handleChange('headerTitle', e.target.value)}
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <Label htmlFor="headerParagraph" className="block mb-2 text-sm font-medium">Párrafo de Introducción</Label>
                <Textarea
                  id="headerParagraph"
                  value={data.headerParagraph}
                  onChange={(e) => handleChange('headerParagraph', e.target.value)}
                  rows={3}
                  className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 text-white border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-amber-500">Imagen Principal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="mainImage" className="block mb-2 text-sm font-medium">Imagen</Label>
                    <Input
                      id="mainImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="bg-zinc-950 border-zinc-700 text-white focus:border-amber-500 focus:ring-amber-500"
                    />
                    {selectedImage && (
                      <p className="text-sm mt-1 text-green-400">
                        Archivo seleccionado: {selectedImage.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mainImageAlt" className="block mb-2 text-sm font-medium">Texto Alternativo</Label>
                    <Input
                      id="mainImageAlt"
                      value={data?.mainImageAlt || ""}
                      onChange={(e) => handleChange('mainImageAlt', e.target.value)}
                      className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>
                
                <div className="relative h-64 bg-zinc-950 rounded-md overflow-hidden border border-zinc-700">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-500">
                      No hay imagen seleccionada
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 text-white border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-amber-500">Contenido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contentTitle" className="block mb-2 text-sm font-medium">Título del Contenido</Label>
                  <Input
                    id="contentTitle"
                    value={data.contentTitle}
                    onChange={(e) => handleChange('contentTitle', e.target.value)}
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contentParagraph" className="block mb-2 text-sm font-medium">Párrafo del Contenido</Label>
                  <Textarea
                    id="contentParagraph"
                    value={data.contentParagraph}
                    onChange={(e) => handleChange('contentParagraph', e.target.value)}
                    rows={6}
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin")}
              disabled={isSaving}
              className="border-zinc-700 hover:bg-zinc-400 text-black"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-black px-6"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...
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
    </AdminLayout>
  )
}