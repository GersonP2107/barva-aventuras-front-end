"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, ImagePlus, Trash2 } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface BlogFormData {
  title: string
  slug: string
  content: string
  author: string
  tags: string
  imageUrl?: string
  metaTitle?: string
  metaDescription?: string
}

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    content: "",
    author: "",
    tags: "",
    imageUrl: "",
    metaTitle: "",
    metaDescription: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/blog/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch blog post")
        }
        
        const blogPost = await response.json()
        
        // Convert tags array to comma-separated string if needed
        const tagsString = Array.isArray(blogPost.tags) 
          ? blogPost.tags.join(", ") 
          : blogPost.tags || ""
        
        setFormData({
          title: blogPost.title || "",
          slug: blogPost.slug || "",
          content: blogPost.content || "",
          author: blogPost.author || "",
          tags: tagsString,
          imageUrl: blogPost.imageUrl || "",
          metaTitle: blogPost.metaTitle || "",
          metaDescription: blogPost.metaDescription || "",
        })
        
        // Set image preview if there's an imageUrl
        if (blogPost.imageUrl) {
          setImagePreview(blogPost.imageUrl)
        }
        
      } catch (err) {
        console.error("Error fetching blog post:", err)
        setError("No se pudo cargar la entrada de blog. Por favor, inténtalo de nuevo.")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchBlogPost()
  }, [id])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "title" && !formData.slug) {
      // Auto-generate slug from title (simple version)
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
      setFormData((prev) => ({ ...prev, slug: generatedSlug }))
    }
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
      setError(null)
    } else {
      setSelectedFile(null)
      // Don't reset imagePreview here to keep showing the existing image
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
  
    const res = await fetch("http://localhost:3001/blog/upload", {
      method: "POST",
      body: formData,
    })
  
    if (!res.ok) {
      throw new Error("Error uploading image")
    }
  
    const data = await res.json()
    return `/uploads/${data.filename}`
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.title.trim() || !formData.slug.trim() || !formData.content.trim() || !formData.author.trim()) {
      setError("Por favor, completa todos los campos obligatorios: Título, Slug, Contenido y Autor.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Step 1: Upload the image if a new one is selected
      let imageUrl = formData.imageUrl || ""
      if (selectedFile) {
        try {
          imageUrl = await uploadImage(selectedFile)
          console.log("Image uploaded successfully:", imageUrl)
        } catch (uploadErr) {
          console.error("Image upload error:", uploadErr)
          throw new Error("Error al subir la imagen: " + (uploadErr instanceof Error ? uploadErr.message : "Error desconocido"))
        }
      }

      // Convert tags string to array if needed
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')

      // Step 2: Update the blog post with the image URL
      const blogPostData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        author: formData.author,
        tags: tagsArray, // Send as array
        imageUrl: imageUrl,
        metaTitle: formData.metaTitle || "",
        metaDescription: formData.metaDescription || ""
      }

      console.log("Sending update with data:", JSON.stringify(blogPostData))

      // Make sure the URL matches exactly what your backend expects
      const response = await fetch(`http://localhost:3001/blog/${id}`, {
        method: "PATCH", // Changed from empty string to PATCH to match the controller
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blogPostData)
      })

      // Handle response
      if (!response.ok) {
        console.error("Error status:", response.status);
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Error al actualizar: ${response.status}`);
      }

      console.log("Blog post updated successfully!")
      router.push("/admin/blog") // Redirect to blog admin page on success
    } catch (err) {
      console.error("Failed to update blog post:", err)
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setSelectedFile(null)
    setFormData(prev => ({ ...prev, imageUrl: "" }))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <span className="ml-2 text-white">Cargando entrada de blog...</span>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-0 text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Editar Entrada de Blog</h1>
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
            <CardTitle className="text-xl text-amber-500">Contenido Principal</CardTitle>
            <CardDescription className="text-zinc-400">
              Edita la información principal de tu entrada de blog.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title" className="block mb-2 text-sm font-medium">
                Título <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Ej: Las mejores rutas de senderismo en Barva"
                className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <Label htmlFor="slug" className="block mb-2 text-sm font-medium">
                Slug (URL amigable) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="Ej: mejores-rutas-senderismo-barva"
                className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
              />
              <p className="text-xs text-zinc-500 mt-1">URL amigable para la entrada de blog.</p>
            </div>

            <div>
              <Label htmlFor="imageFile" className="block mb-2 text-sm font-medium">
                Imagen Principal
              </Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="bg-zinc-950 h-auto border-zinc-700 focus:border-amber-500 focus:ring-amber-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-4 relative">
                  <p className="text-sm text-zinc-400 mb-2">Imagen actual:</p>
                  <div className="relative inline-block">
                    <img src={imagePreview} alt="Vista previa de imagen principal" className="max-w-xs max-h-48 rounded-md border border-zinc-700" />
                    <Button 
                      type="button"
                      variant="destructive" 
                      size="sm"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
              {selectedFile && (
                <p className="text-sm mt-2 text-green-400">
                  Nuevo archivo seleccionado: {selectedFile.name}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="content" className="block mb-2 text-sm font-medium">
                Contenido <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Escribe aquí el contenido de tu entrada de blog..."
                className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500 min-h-[200px]"
                rows={10}
              />
            </div>

            <div>
              <Label htmlFor="author" className="block mb-2 text-sm font-medium">
                Autor <span className="text-red-500">*</span>
              </Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Ej: Juan Pérez"
                className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <Label htmlFor="tags" className="block mb-2 text-sm font-medium">
                Etiquetas (separadas por comas)
              </Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Ej: senderismo, aventura, barva, naturaleza"
                className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            
            <div>
              <Label htmlFor="imageUrl" className="block mb-2 text-sm font-medium">
                URL de la Imagen Principal (Opcional)
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 text-white border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-amber-500">SEO (Opcional)</CardTitle>
            <CardDescription className="text-zinc-400">
              Optimiza tu entrada para motores de búsqueda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="metaTitle" className="block mb-2 text-sm font-medium">
                Meta Título
              </Label>
              <Input
                id="metaTitle"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="Título para SEO, ej: Guía Completa de Senderismo en Barva"
                className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div>
              <Label htmlFor="metaDescription" className="block mb-2 text-sm font-medium">
                Meta Descripción
              </Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                placeholder="Breve descripción para motores de búsqueda (aprox. 155-160 caracteres)."
                className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                rows={3}
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
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> Actualizar Entrada
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}