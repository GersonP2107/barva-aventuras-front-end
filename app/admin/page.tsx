"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Compass, 
  FileText, 
  Map, 
  Image, 
  Package, 
  Mountain, 
  Plus, 
  Clock, 
  TrendingUp,
  Users,
  Calendar,
  BarChart4
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface DashboardStats {
  totalActivities: number
  totalBlogPosts: number
  totalTours: number
  totalGalleryItems: number
  totalProducts: number
  totalHeroBanners: number
  recentActivity: {
    type: string
    title: string
    date: string
    action: string
  }[]
  popularItems: {
    title: string
    type: string
    views: number
  }[]
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalActivities: 0,
    totalBlogPosts: 0,
    totalTours: 0,
    totalGalleryItems: 0,
    totalProducts: 0,
    totalHeroBanners: 0,
    recentActivity: [],
    popularItems: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:3001/admin/dashboard")
        const data = await response.json()
        
        // If backend doesn't provide all the data yet, we'll mock some of it
        setStats({
          ...data,
          totalProducts: data.totalProducts || 0,
          totalHeroBanners: data.totalHeroBanners || 0,
          recentActivity: data.recentActivity || mockRecentActivity(),
          popularItems: data.popularItems || mockPopularItems()
        })
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
        // Use mock data if API fails
        setStats({
          totalActivities: 5,
          totalBlogPosts: 8,
          totalTours: 12,
          totalGalleryItems: 24,
          totalProducts: 6,
          totalHeroBanners: 3,
          recentActivity: mockRecentActivity(),
          popularItems: mockPopularItems()
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Mock data for development until backend is updated
  const mockRecentActivity = () => [
    { type: "tour", title: "Volcán Poás", date: new Date().toISOString(), action: "created" },
    { type: "blog", title: "10 Razones para Visitar Costa Rica", date: new Date(Date.now() - 86400000).toISOString(), action: "updated" },
    { type: "gallery", title: "Cascada La Paz", date: new Date(Date.now() - 172800000).toISOString(), action: "created" },
    { type: "product", title: "Camiseta Barva Aventuras", date: new Date(Date.now() - 259200000).toISOString(), action: "created" },
    { type: "hero", title: "Banner Principal", date: new Date(Date.now() - 345600000).toISOString(), action: "updated" },
  ]

  const mockPopularItems = () => [
    { title: "El Camino de Costa Rica", type: "tour", views: 1245 },
    { title: "Volcán Poás", type: "tour", views: 987 },
    { title: "Guía de Aventuras en Costa Rica", type: "blog", views: 756 },
    { title: "Capilla en las Nubes", type: "gallery", views: 632 },
  ]

  const statCards = [
    {
      title: "Activities",
      value: stats.totalActivities,
      icon: Compass,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      link: "/admin/activities",
    },
    {
      title: "Blog Posts",
      value: stats.totalBlogPosts,
      icon: FileText,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      link: "/admin/blog",
    },
    {
      title: "Tours",
      value: stats.totalTours,
      icon: Map,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      link: "/admin/tours",
    },
    {
      title: "Gallery Items",
      value: stats.totalGalleryItems,
      icon: Image,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      link: "/admin/gallery",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: Package,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      link: "/admin/products",
    },
    {
      title: "Hero Banners",
      value: stats.totalHeroBanners,
      icon: Mountain,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      link: "/admin/hero-banners",
    },
  ]

  const quickActions = [
    { title: "New Activity", icon: Compass, link: "/admin/activities/new", color: "bg-blue-500" },
    { title: "New Blog Post", icon: FileText, link: "/admin/blog/new", color: "bg-green-500" },
    { title: "New Tour", icon: Map, link: "/admin/tours/new", color: "bg-amber-500" },
    { title: "Add to Gallery", icon: Image, link: "/admin/gallery/new", color: "bg-purple-500" },
    { title: "New Product", icon: Package, link: "/admin/products/new", color: "bg-red-500" },
    { title: "New Hero Banner", icon: Mountain, link: "/admin/hero-banners/new", color: "bg-cyan-500" },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-CR', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date)
  }

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'tour': return Map
      case 'blog': return FileText
      case 'gallery': return Image
      case 'product': return Package
      case 'hero': return Mountain
      default: return Compass
    }
  }

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'tour': return 'text-amber-500'
      case 'blog': return 'text-green-500'
      case 'gallery': return 'text-purple-500'
      case 'product': return 'text-red-500'
      case 'hero': return 'text-cyan-500'
      default: return 'text-blue-500'
    }
  }

  const getActivityLink = (type: string) => {
    switch(type) {
      case 'tour': return '/admin/tours'
      case 'blog': return '/admin/blog'
      case 'gallery': return '/admin/gallery'
      case 'product': return '/admin/products'
      case 'hero': return '/admin/hero-banners'
      default: return '/admin/activities'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Bienvenido al panel de administración de Barva Aventuras</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => window.open('/', '_blank')} 
            className="bg-amber-500 hover:bg-amber-600 text-black"
          >
            Ver Sitio Web
          </Button>
        </div>
      </header>

      <section aria-labelledby="quick-actions-heading" className="bg-zinc-900/50 p-6 rounded-lg">
        <h2 id="quick-actions-heading" className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className=" text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto py-4 px-2 flex flex-col items-center justify-center gap-2 bg-zinc-900 border-zinc-800 hover:border-amber-500 transition-colors"
              onClick={() => router.push(action.link)}
            >
              <div className={`${action.color} p-2 rounded-full`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium">{action.title}</span>
            </Button>
          ))}
        </div>
      </section>

      <Tabs defaultValue="overview" className="w-full">
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((card) => (
              <Card key={card.title} className="bg-zinc-900 border-zinc-800 hover:border-amber-500 transition-colors">
                <CardHeader className={`flex flex-row items-center justify-between pb-2 ${card.bgColor} rounded-t-lg`}>
                  <CardTitle className="text-lg font-medium text-white">{card.title}</CardTitle>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </CardHeader>
            
                <CardFooter>
                  <Button 
                    variant="link" 
                    className="text-amber-500 p-0 h-auto hover:text-amber-400 mt-10"
                    onClick={() => router.push(card.link)}
                  >
                    Ver todos
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
       </TabsContent>        
      </Tabs>
    </div>
  )
}