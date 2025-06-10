"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Mail, FileText, Settings, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Emails",
      path: "/dashboard/emails",
      icon: Mail,
    },
    {
      name: "Templates",
      path: "/dashboard/templates",
      icon: FileText,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Email Generator</h2>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === route.path && "bg-accent text-accent-foreground font-medium",
                )}
              >
                <route.icon className="mr-3 h-5 w-5" />
                {route.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t text-xs text-muted-foreground">
            <p>© 2025 AI Email Generator</p>
          </div>
        </div>
      </div>
    </>
  )
}

