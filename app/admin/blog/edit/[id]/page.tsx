"use client"

import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"

interface BlogFormData {
  title: string
  slug: string
  content: string
  author: string
  tags: string
  image: string
  category: string
  readTime: string
  isActive: boolean
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
    image: "",
    category: "",
    readTime: "",
    isActive: true
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBlogPost = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/blog/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch blog post")
      }
      
      const blogPost = await response.json()
      const tagsString = Array.isArray(blogPost.tags) 
        ? blogPost.tags.join(", ") 
        : blogPost.tags || ""
      
      setFormData({
        title: blogPost.title || "",
        slug: blogPost.slug || "",
        content: blogPost.content || "",
        author: blogPost.author || "",
        tags: tagsString,
        image: blogPost.image || "",
        category: blogPost.category || "",
        readTime: blogPost.readTime || "",
        isActive: blogPost.isActive !== false
      })

      // Set current image URL for preview
      if (blogPost.image) {
        setCurrentImageUrl(
          blogPost.image.startsWith('/uploads') 
            ? `http://localhost:3001${blogPost.image}` 
            : blogPost.image
        )
      }
    } catch (err) {
      console.error("Error fetching blog post:", err)
      setError("No se pudo cargar la entrada de blog. Por favor, inténtalo de nuevo.")
    }
  }, [id])

  useEffect(() => {
    fetchBlogPost()
  }, [fetchBlogPost])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null)
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("http://localhost:3001/blog/upload", {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
  
    try {
      // Convert tags string to array
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      
      // Start with existing image URL, might be overwritten by upload
      let imageUrl = formData.image;

      // Upload new image if selected
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile)
      }
      
      // Map frontend field names to match backend entity fields
      const blogPostData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        author: formData.author,
        tags: tagsArray,
        image: imageUrl,
        category: formData.category,
        readTime: formData.readTime,
        isActive: formData.isActive
      }
  
      const response = await fetch(`http://localhost:3001/blog/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blogPostData)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar: ${response.status} - ${errorText}`);
      }
  
      router.push("/admin/blog")
    } catch (err) {
      console.error("Failed to update blog post:", err)
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-0 text-white">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Editar Entrada de Blog</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-zinc-700 text-white hover:bg-zinc-700"
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
        <section aria-labelledby="basic-info-title">
          <Card className="bg-zinc-900 text-white border-zinc-800">
            <CardHeader>
              <CardTitle id="basic-info-title" className="text-xl text-amber-500">
                Información Básica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <fieldset>
                  <Label htmlFor="title" className="block mb-2 text-sm font-medium">
                    Título
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </fieldset>
                <fieldset>
                  <Label htmlFor="slug" className="block mb-2 text-sm font-medium">
                    Slug
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </fieldset>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <fieldset>
                  <Label htmlFor="author" className="block mb-2 text-sm font-medium">
                    Autor
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </fieldset>
                <fieldset>
                  <Label htmlFor="category" className="block mb-2 text-sm font-medium">
                    Categoría
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </fieldset>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <fieldset>
                  <Label htmlFor="tags" className="block mb-2 text-sm font-medium">
                    Etiquetas (separadas por comas)
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="aventura, naturaleza, costa rica"
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </fieldset>
                <fieldset>
                  <Label htmlFor="readTime" className="block mb-2 text-sm font-medium">
                    Tiempo de Lectura
                  </Label>
                  <Input
                    id="readTime"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="5 min"
                    className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                  />
                </fieldset>
              </div>

              <fieldset>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                    className="rounded border-zinc-700 text-amber-500 focus:ring-amber-500"
                  />
                  <Label htmlFor="isActive" className="text-sm font-medium">
                    Publicado (visible en el sitio)
                  </Label>
                </div>
              </fieldset>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="image-section-title">
          <Card className="bg-zinc-900 text-white border-zinc-800">
            <CardHeader>
              <CardTitle id="image-section-title" className="text-xl text-amber-500">
                Imagen del Blog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <fieldset>
                  <Label htmlFor="imageFile" className="block mb-2 text-sm font-medium">
                    Seleccionar Nueva Imagen
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
                </fieldset>
                <figure>
                  {currentImageUrl && (
                    <div className="flex flex-col justify-center items-center mb-2">
                      <figcaption className="text-xs text-zinc-400 mb-1">Imagen actual:</figcaption>
                      <img
                        src={currentImageUrl.startsWith('/uploads') 
                          ? `http://localhost:3001${currentImageUrl}` 
                          : currentImageUrl}
                        alt="Imagen actual del blog"
                        className="mt-2 w-40 h-auto object-cover rounded border border-zinc-700"
                      />
                    </div>
                  )}
                  {!currentImageUrl && !selectedFile && (
                    <div className="h-40 w-full flex items-center justify-center bg-zinc-800 rounded-md">
                      <p className="text-zinc-500">No hay imagen</p>
                    </div>
                  )}
                </figure>
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="content-section-title">
          <Card className="bg-zinc-900 text-white border-zinc-800">
            <CardHeader>
              <CardTitle id="content-section-title" className="text-xl text-amber-500">
                Contenido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <fieldset>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  className="bg-zinc-950 border-zinc-700 focus:border-amber-500 focus:ring-amber-500 min-h-[300px]"
                  rows={12}
                  aria-label="Contenido del blog"
                />
              </fieldset>
            </CardContent>
          </Card>
        </section>

        <footer className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="border-zinc-700 text-white hover:bg-zinc-700"
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
              "Actualizar Entrada"
            )}
          </Button>
        </footer>
      </form>
    </main>
  )
}