"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, ImagePlus } from "lucide-react" // Added ImagePlus

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // For content field

interface BlogFormData {
  title: string
  slug: string
  content: string
  author: string
  tags: string // Comma-separated tags
  imageUrl?: string // Added for image URL
  metaTitle?: string
  metaDescription?: string
}

export default function NewBlogPostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    content: "",
    author: "",
    tags: "",
    imageUrl: "", // Removed as it's handled by file upload
    metaTitle: "",
    metaDescription: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null) // Added
  const [imagePreview, setImagePreview] = useState<string | null>(null) // Added
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "title") {
      // Auto-generate slug from title (simple version)
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
      setFormData((prev) => ({ ...prev, slug: generatedSlug }))
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { // Added
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

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
  
    const res = await fetch("http://localhost:3001/blog/upload", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error("Error uploading image");
    }
  
    const data = await res.json();
    // Adjust the returned path if your backend returns a different property
    return `/uploads/${data.filename}`;
  };

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
      // Step 1: Upload the image if one is selected
      let imageUrl = formData.imageUrl || ""
      if (selectedFile) {
        try {
          imageUrl = await uploadImage(selectedFile)
        } catch (uploadErr) {
          throw new Error("Error al subir la imagen: " + (uploadErr instanceof Error ? uploadErr.message : "Error desconocido"))
        }
      }

      // Step 2: Create the blog post with the image URL
      const blogPostData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        author: formData.author,
        tags: formData.tags,
        imageUrl: imageUrl,
        metaTitle: formData.metaTitle || "",
        metaDescription: formData.metaDescription || ""
      }

      const response = await fetch("http://localhost:3001/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogPostData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Error al crear la entrada de blog" }))
        throw new Error(errorData.message || "Error del servidor")
      }

      console.log("Blog post created successfully!")
      router.push("/admin/blog") // Redirect to blog admin page on success
    } catch (err) {
      console.error("Failed to create blog post:", err)
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-0 text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Crear Nueva Entrada de Blog</h1>
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
              Completa la información principal de tu entrada de blog.
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
               <p className="text-xs text-zinc-500 mt-1">Se genera automáticamente a partir del título, pero puedes ajustarlo.</p>
            </div>

            <div>
              <Label htmlFor="imageFile" className="block mb-2 text-sm font-medium">
                Imagen Principal (Opcional)
              </Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="bg-zinc-950 h-auto border-zinc-700 focus:border-amber-500 focus:ring-amber-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-zinc-400 mb-2">Vista previa:</p>
                  <img src={imagePreview} alt="Vista previa de imagen principal" className="max-w-xs max-h-48 rounded-md border border-zinc-700" />
                </div>
              )}
              {selectedFile && (
                <p className="text-sm mt-2 text-green-400">
                  Archivo seleccionado: {selectedFile.name}
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
                <Save className="w-4 h-4 mr-2" /> Guardar Entrada
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}