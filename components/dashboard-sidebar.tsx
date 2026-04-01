"use client"

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

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <ShinyLogoMark size={40} />
        <span className="text-xl font-semibold text-foreground">Shiny</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
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
  )
}
