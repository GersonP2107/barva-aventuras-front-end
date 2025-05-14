"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DataTable from "@/components/admin/data-table"
import { Badge } from "@/components/ui/badge"
import { Tour } from "@/types/tour"

export default function ToursAdmin() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:3001/tours")
        const data = await response.json()
        setTours(data)
      } catch (error) {
        console.error("Error fetching tours:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  const handleEdit = (tour: Tour) => {
    router.push(`/admin/tours/edit/${tour.id}`)
  }

  const handleDelete = async (tour: Tour) => {
    if (window.confirm(`Are you sure you want to delete "${tour.title}"?`)) {
      try {
        await fetch(`http://localhost:3001/tours/${tour.id}`, {
          method: "DELETE",
        })
        setTours(tours.filter((t) => t.id !== tour.id))
      } catch (error) {
        console.error("Error deleting tour:", error)
      }
    }
  }

  const handleAdd = () => {
    router.push("/admin/tours/new")
  }

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "difficulty",
      label: "Difficulty",
      render: (value: string) => (
        <Badge
          className={`${
            value === "Fácil"
              ? "bg-green-500"
              : value === "Moderado"
              ? "bg-amber-500"
              : value === "Difícil"
              ? "bg-orange-500"
              : "bg-red-500"
          } text-white`}
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "duration",
      label: "Duration",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "destination",
      label: "Destination",
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
      title="Tours"
      columns={columns}
      data={tours}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  )
}