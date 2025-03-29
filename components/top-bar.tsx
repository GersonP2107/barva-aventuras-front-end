"use client"

import Link from "next/link"
import { Headphones, Mail, Facebook, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TopBar() {
  return (
    <div className="bg-zinc-900 border-b border-zinc-800 py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-zinc-400 text-sm">
            <Headphones className="w-4 h-4 mr-2 text-amber-500" />
            <span>000-123-456789</span>
          </div>
          <div className="flex items-center text-zinc-400 text-sm">
            <Mail className="w-4 h-4 mr-2 text-amber-500" />
            <span>support@example.com</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-3">
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Youtube className="w-4 h-4" />
            </Link>
          </div>
          <Button className="bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold py-1 px-4 rounded-none">
            RESERVAR AHORA
          </Button>
        </div>
      </div>
    </div>
  )
}

