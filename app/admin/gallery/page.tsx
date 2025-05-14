"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import DataTable from "@/components/admin/data-table"
import { GalleryItem } from "@/types/gallery"

export default function GalleryAdmin() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/gallery")
        const data = await response.json()
        setGalleryItems(data)
      } catch (error) {
        console.error("Error fetching gallery items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  const handleEdit = (item: GalleryItem) => {
    router.push(`/admin/gallery/edit/${item.id}`)
  }

  const handleDelete = async (item: GalleryItem) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      try {
        await fetch(`http://localhost:3001/gallery/${item.id}`, {
          method: "DELETE",
        })
        setGalleryItems(galleryItems.filter((g) => g.id !== item.id))
      } catch (error) {
        console.error("Error deleting gallery item:", error)
      }
    }
  }

  const handleAdd = () => {
    router.push("/admin/gallery/new")
  }

  const columns = [
    {
      key: "imageUrl",
      label: "Image",
      render: (value: string) => (
        <div className="h-16 w-24 relative rounded overflow-hidden">
          <Image
            src={value || "/placeholder.svg"}
            alt="Gallery thumbnail"
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "createdAt",
      label: "Date Added",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <DataTable
      title="Gallery"
      columns={columns}
      data={galleryItems}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  )
}