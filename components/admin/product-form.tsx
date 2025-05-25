"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save, ArrowLeft, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

interface ProductFormProps {
  productId?: string
}

interface ProductData {
  name: string
  price: number
  image: string
  rating: number
  isActive: boolean
}

export default function ProductForm({ productId }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState<ProductData>({
    name: "",
    price: 0,
    image: "",
    rating: 5,
    isActive: true
  })

  const isEditMode = !!productId

  useEffect(() => {
    if (isEditMode) {
      fetchProductData()
    }
  }, [productId, isEditMode])

  const fetchProductData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        credentials: "include"
      })
      
      if (!response.ok) {
        throw new Error("Failed to fetch product")
      }
      
      const data = await response.json()
      setFormData({
        name: data.name,
        price: data.price,
        image: data.image,
        rating: data.rating,
        isActive: data.isActive
      })
      
      if (data.image) {
        setImagePreview(data.image.startsWith("/uploads") 
          ? `http://localhost:3001${data.image}`
          : data.image
        )
      }
    } catch (error) {
      console.error("Error fetching product:", error)
      toast({
        title: "Error",
        description: "No se pudo cargar la información del producto",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const formDataToSend = new FormData()
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined) {
          formDataToSend.append(key, value.toString())
        }
      })
      
      // Append image file if exists
      if (imageFile) {
        formDataToSend.append("file", imageFile)
      }
      
      let url: string
      let method: string
      
      if (isEditMode) {
        // If editing, first upload the image if there's a new one
        if (imageFile) {
          const uploadResponse = await fetch("http://localhost:3001/products/upload", {
            method: "POST",
            body: formDataToSend,
            credentials: "include"
          })
          
          if (!uploadResponse.ok) {
            throw new Error("Failed to upload image")
          }
          
          const uploadData = await uploadResponse.json()
          formData.image = `/uploads/${uploadData.filename}`
        }
        
        // Then update the product
        url = `http://localhost:3001/products/${productId}`
        method = "PATCH"
        
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include"
        })
        
        if (!response.ok) {
          throw new Error("Failed to update product")
        }
      } else {
        // If creating new product, first upload the image
        if (imageFile) {
          const uploadResponse = await fetch("http://localhost:3001/products/upload", {
            method: "POST",
            body: formDataToSend,
            credentials: "include"
          })
          
          if (!uploadResponse.ok) {
            throw new Error("Failed to upload image")
          }
          
          const uploadData = await uploadResponse.json()
          formData.image = `/uploads/${uploadData.filename}`
        }
        
        // Then create the product
        url = "http://localhost:3001/products"
        method = "POST"
        
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include"
        })
        
        if (!response.ok) {
          throw new Error("Failed to create product")
        }
      }
      
      toast({
        title: "Éxito",
        description: `Producto ${isEditMode ? "actualizado" : "creado"} correctamente`,
      })
      
      router.push("/admin/products")
    } catch (error) {
      console.error(`Error ${isEditMode ? "updating" : "creating"} product:`, error)
      toast({
        title: "Error",
        description: `No se pudo ${isEditMode ? "actualizar" : "crear"} el producto`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          className="text-black"
          type="button" 
          variant="outline" 
          onClick={() => router.push("/admin/products")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Button>
        <Button 
          type="submit" 
          className="bg-amber-500 hover:bg-amber-600 text-black"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" /> Guardar Producto
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del Producto *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="text-black"
            />
          </div>
          
          <div>
            <Label htmlFor="price">Precio (₡) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="text-black"
            />
          </div>
          
          <div>
            <Label htmlFor="rating">Calificación</Label>
            <Select 
              value={formData.rating.toString()} 
              onValueChange={(value) => handleSelectChange("rating", value)}
              
            >
              <SelectTrigger className="text-black">
                <SelectValue  placeholder="Seleccionar calificación" />
              </SelectTrigger>
              <SelectContent className="-slate-500">
                <SelectItem value="1">1 Estrella</SelectItem>
                <SelectItem value="2">2 Estrellas</SelectItem>
                <SelectItem value="3">3 Estrellas</SelectItem>
                <SelectItem value="4">4 Estrellas</SelectItem>
                <SelectItem value="5">5 Estrellas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="rounded border-zinc-700 text-amber-500 focus:ring-amber-500"
            />
            <Label htmlFor="isActive">Producto activo</Label>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="image">Imagen del Producto</Label>
            <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg p-6 cursor-pointer hover:bg-zinc-800/50 transition-colors">
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="image" className="cursor-pointer w-full h-full flex flex-col items-center">
                {imagePreview ? (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="w-12 h-12 text-zinc-500 mb-2" />
                    <p className="text-sm text-zinc-500">Haz clic para subir una imagen</p>
                  </div>
                )}
                <Button type="button" variant="outline" className="mt-4 text-black">
                  {imagePreview ? "Cambiar imagen" : "Seleccionar imagen"}
                </Button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}