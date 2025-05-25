import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Package, 
  Users, 
  Settings, 
  Phone,
  LogOut 
} from "lucide-react"

export default function AdminSidebar() {
  const pathname = usePathname()
  
  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Blog",
      href: "/admin/blog",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Galería",
      href: "/admin/gallery",
      icon: <Image className="h-5 w-5" />,
    },
    {
      title: "Tours",
      href: "/admin/tours",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Usuarios",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Información de Contacto",
      href: "/admin/contact-settings",
      icon: <Phone className="h-5 w-5" />,
    },
    {
      title: "Configuración",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="h-full bg-zinc-800 text-white w-64 flex flex-col">
      <div className="p-4 border-b border-zinc-700">
        <h2 className="text-xl font-bold">Barva Aventuras</h2>
        <p className="text-sm text-zinc-400">Panel Administrativo</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  pathname === item.href 
                    ? "bg-amber-500 text-black" 
                    : "hover:bg-zinc-700"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-zinc-700">
        <Link 
          href="/api/auth/signout"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-700 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Cerrar Sesión
        </Link>
      </div>
    </div>
  )
}