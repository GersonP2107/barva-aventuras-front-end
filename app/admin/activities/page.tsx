"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DataTable from "@/components/admin/data-table"
import { Badge } from "@/components/ui/badge"
import { Activity } from "@/types/activity"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function ActivitiesAdmin() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const fetchActivities = async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log("Fetching activities from backend...")
      const response = await fetch("http://localhost:3001/activities", {
        method: "GET",
        headers: {
          "Accept": "application/json"
        },
        // Add cache: 'no-store' to prevent caching
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Activities fetched:", data)
      setActivities(data)
      setError(null)
    } catch (error) {
      console.error("Error fetching activities:", error)
      setError(`Failed to load activities. ${error instanceof Error ? error.message : 'Please check if the backend server is running.'}`)
      setActivities([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const handleEdit = (activity: Activity) => {
    router.push(`/admin/activities/edit/${activity.id}`)
  }

  const handleDelete = async (activity: Activity) => {
    if (window.confirm(`Are you sure you want to delete "${activity.name}"?`)) {
      try {
        const response = await fetch(`http://localhost:3001/activities/${activity.id}`, {
          method: "DELETE",
        })
        
        if (!response.ok) {
          throw new Error(`Failed to delete activity. Status: ${response.status}`)
        }
        
        setActivities(activities.filter((a) => a.id !== activity.id))
      } catch (error) {
        console.error("Error deleting activity:", error)
        alert(`Failed to delete activity: ${error instanceof Error ? error.message : String(error)}`)
      }
    }
  }

  const handleAdd = () => {
    router.push("/admin/activities/new")
  }

  const columns = [
    {
      key: "name",
      label: "Name",
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
      render: (value: number) => `₡${value.toLocaleString()}`
    },
    {
      key: "location",
      label: "Location",
    },
  ]

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
        <p className="text-red-400 mb-4">{error}</p>
        <Button 
          onClick={fetchActivities} 
          variant="outline" 
          className="border-zinc-800 text-black hover:bg-zinc-800"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Retry
        </Button>
      </div>
    )
  }

  return (
    <DataTable
      title="Activities"
      columns={columns}
      data={activities}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  )
}