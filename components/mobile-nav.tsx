"use client"

import { useState } from "react"
import Link from "next/link"
import { Compass, Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  return (
    <div className="lg:hidden">
      <button onClick={toggleMenu} className="text-white p-2 focus:outline-none">
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={toggleMenu}>
          <div
            className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-zinc-900 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-zinc-800">
              <div className="flex items-center">
                <span className="text-xl font-bold text-white">ADVEN</span>
                <div className="bg-amber-500 p-1 rotate-45 ml-2">
                  <Compass className="w-4 h-4 text-white -rotate-45" />
                </div>
              </div>
              <button onClick={toggleMenu} className="text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4">
              {navItems.map((item) => (
                <div key={item.label} className="mb-2">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpand(item.label)}
                        className="flex justify-between items-center w-full py-2 text-white hover:text-amber-500 transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            expandedItems.includes(item.label) ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedItems.includes(item.label) && (
                        <div className="ml-4 border-l border-zinc-700 pl-4 mt-2 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-center py-2 text-zinc-400 hover:text-amber-500 transition-colors"
                              onClick={toggleMenu}
                            >
                              <ChevronRight className="w-4 h-4 mr-2" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-2 transition-colors ${
                        item.href === "/blog" ? "text-amber-500" : "text-white hover:text-amber-500"
                      }`}
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="mt-6">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black w-full rounded-none">
                  RESERVAR AHORA
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

