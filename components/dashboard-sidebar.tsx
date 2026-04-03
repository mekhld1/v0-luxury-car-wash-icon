"use client"

import { useState } from "react"
import { ShinyLogoMark } from "@/components/shiny-logo"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Sparkles,
  Package,
  ClipboardList,
  Users,
  UsersRound,
  Wallet,
  Settings,
  LogOut,
  Phone,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Sparkles, label: "Services", href: "/services" },
  { icon: Package, label: "Packages", href: "/packages" },
  { icon: ClipboardList, label: "Orders", href: "/orders" },
  { icon: UsersRound, label: "Customers", href: "/customers" },
  { icon: Users, label: "Crew", href: "/crew" },
  { icon: Wallet, label: "Earnings", href: "/earnings" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <ShinyLogoMark size={32} />
          <span className="text-lg font-semibold text-foreground">Shiny</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-accent"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-border bg-card transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo - Hidden on mobile (shown in header) */}
        <div className="hidden items-center gap-3 px-6 py-6 lg:flex">
          <ShinyLogoMark size={40} />
          <span className="text-xl font-semibold text-foreground">Shiny</span>
        </div>
        {/* Spacer for mobile */}
        <div className="h-14 lg:hidden" />

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-4 py-4">
          <div className="mb-4 flex items-center gap-2 px-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>+966 55 123 4567</span>
          </div>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-destructive">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
