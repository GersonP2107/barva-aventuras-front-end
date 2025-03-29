"use client"

import { useState } from "react"
import Link from "next/link"
import { Compass, Search, ChevronDown } from "lucide-react"

type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: "INICIO", href: "/" },
  { label: "DESTINOS", href: "#destinos" },
  { label: "TOURS", href: "#tours" },
  { label: "ACTIVIDADES", href: "#actividades" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACTO", href: "#contacto" },
]

export default function MainNav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  // Dividir los elementos del menú para colocarlos a ambos lados del logo
  const leftNavItems = navItems.slice(0, 3)
  const rightNavItems = navItems.slice(3)

  return (
    <div className="bg-zinc-900/95 py-4 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {leftNavItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className="text-white text-sm font-medium hover:text-amber-500 transition-colors flex items-center"
              >
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4 ml-1" />}
              </Link>

              {item.children && activeDropdown === item.label && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg z-50 animate-fade-in">
                  <div className="py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-zinc-800 hover:bg-amber-500 hover:text-white transition-colors text-sm"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
            <span className="text-white">ADVEN</span>
            <div className="bg-amber-500 p-1 rotate-45">
              <Compass className="w-5 h-5 text-white -rotate-45" />
            </div>
          </Link>
        </div>

        {/* Right Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {rightNavItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors flex items-center ${
                  item.href === "/blog" ? "text-amber-500" : "text-white hover:text-amber-500"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4 ml-1" />}
              </Link>

              {item.children && activeDropdown === item.label && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg z-50 animate-fade-in">
                  <div className="py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-zinc-800 hover:bg-amber-500 hover:text-white transition-colors text-sm"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search Icon */}
        <div className="flex items-center">
          <button className="text-white hover:text-amber-500 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

