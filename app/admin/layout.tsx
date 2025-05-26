"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Compass, 
  FileText, 
  Map, 
  Image, 
  Package,
  LogOut,
  Menu,
  X,
  Mountain,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <section className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></span>
      </section>
    )
  }

  // Update the navItems array to include hero banners
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Activities", href: "/admin/activities", icon: Compass },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "Tours", href: "/admin/tours", icon: Map },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Camino Costa Rica", href: "/admin/camino-costa-rica", icon: Mountain },
    { name: "Hero Banners", href: "/admin/hero-banners", icon: Image },
  ]

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-md bg-zinc-800 text-white border-zinc-700"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-zinc-800 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-amber-500">Admin Panel</h1>
          {session?.user?.email && (
            <p className="text-sm text-zinc-400 mt-1">{session.user.email}</p>
          )}
        </div>
        
        {/* Navigation */}
        <div className="py-4 h-[calc(100%-160px)] overflow-y-auto">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-white ${
                      isActive 
                        ? "bg-amber-500 text-white" 
                        : "text-zinc-400 hover:bg-zinc-800"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-zinc-400"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-zinc-800">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start text-zinc-400 hover:text-white hover:bg-zinc-800"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 min-h-screen">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}