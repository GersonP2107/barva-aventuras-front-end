import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Barva Aventuras - Turismo Ecológico y Experiencias únicas en Costa Rica.",
  description: "Descubre la belleza natural de Costa Rica con Barva Aventuras, una agencia especializada en turismo ecológico y cultural. Vive experiencias inolvidables junto a tu familia o amigos explorando rutas como El Camino de Costa Rica, caminatas al majestuoso Cerro Chirripó y excursiones llenas de naturaleza, tradición y aventura.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'