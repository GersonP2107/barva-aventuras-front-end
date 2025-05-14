"use client"

import { useState, useEffect } from "react"
import { Compass, FileText, Map, Image } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardStats {
  totalActivities: number
  totalBlogPosts: number
  totalTours: number
  totalGalleryItems: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalActivities: 0,
    totalBlogPosts: 0,
    totalTours: 0,
    totalGalleryItems: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:3001/admin/dashboard")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Activities",
      value: stats.totalActivities,
      icon: Compass,
      color: "text-blue-500",
      link: "/admin/activities",
    },
    {
      title: "Blog Posts",
      value: stats.totalBlogPosts,
      icon: FileText,
      color: "text-green-500",
      link: "/admin/blog",
    },
    {
      title: "Tours",
      value: stats.totalTours,
      icon: Map,
      color: "text-amber-500",
      link: "/admin/tours",
    },
    {
      title: "Gallery Items",
      value: stats.totalGalleryItems,
      icon: Image,
      color: "text-purple-500",
      link: "/admin/gallery",
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {statCards.map((card) => (
            <Card key={card.title} className="bg-zinc-900 border-zinc-800 hover:border-amber-500 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium text-white">{card.title}</CardTitle>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{card.value}</div>
                <a
                  href={card.link}
                  className="text-sm text-amber-500 hover:underline mt-2 inline-block"
                >
                  View all
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}