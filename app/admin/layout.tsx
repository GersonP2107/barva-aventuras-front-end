"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Menu, 
  X, 
  Compass, 
  FileText, 
  Map, 
  Image, 
  LogOut 
} from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Activities", href: "/admin/activities", icon: Compass },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "Tours", href: "/admin/tours", icon: Map },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-zinc-800 text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-amber-500">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-md transition-colors ${
                      isActive
                        ? "bg-amber-500 text-white"
                        : "hover:bg-zinc-800"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <Link
            href="/"
            className="flex items-center p-3 rounded-md text-zinc-400 hover:bg-zinc-800 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Back to Website
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className={`lg:ml-64 min-h-screen`}>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}