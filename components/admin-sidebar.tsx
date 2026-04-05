"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Building2,
  Store,
  Users,
  ClipboardList,
  BarChart3,
  Gift,
  Megaphone,
  UserCog,
  Settings,
  LogOut,
  Phone,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Building2, label: "Brands", href: "/admin/brands" },
  { icon: Store, label: "Providers", href: "/admin/providers" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: ClipboardList, label: "Orders", href: "/admin/orders" },
  { icon: BarChart3, label: "Financial Reports", href: "/admin/reports" },
  { icon: Gift, label: "Loyalty", href: "/admin/loyalty" },
  { icon: Megaphone, label: "Campaigns", href: "/admin/campaigns" },
  { icon: UserCog, label: "Staff", href: "/admin/staff" },
  { icon: Settings, label: "Platform Settings", href: "/admin/settings" },
]

function ShinyLogo({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="dg" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="35%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        <clipPath id="cl">
          <rect width="1024" height="1024" rx="224" />
        </clipPath>
      </defs>
      <g clipPath="url(#cl)">
        <rect width="1024" height="1024" fill="white" />
        <path
          d="M512 140C512 140 720 400 720 580C720 695 628 800 512 800C396 800 304 695 304 580C304 400 512 140 512 140Z"
          fill="url(#dg)"
        />
        <path
          d="M512 170C512 170 420 290 380 420C360 480 350 530 355 560C365 540 390 510 430 460C490 385 530 290 512 170Z"
          fill="white"
          opacity="0.7"
        />
      </g>
    </svg>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-[#EDE9FE] bg-[#1C1C2E] px-4 lg:hidden">
        <div className="flex items-center gap-3">
          <ShinyLogo className="h-8 w-8" />
          <span className="text-lg font-semibold text-white">Shiny Admin</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:bg-white/10"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-60 flex-col bg-[#1C1C2E] transition-transform duration-300 lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Section */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <ShinyLogo className="h-8 w-8" />
          <span className="text-lg font-semibold text-white">Shiny Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href))
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#EDE9FE] text-[#7C3AED]"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
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

        {/* Admin Info */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7C3AED] text-sm font-semibold text-white">
              SA
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                Super Admin
              </p>
              <p className="truncate text-xs text-gray-400">Platform Manager</p>
            </div>
          </div>

          {/* Support */}
          <a
            href="tel:+966500000000"
            className="mb-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Phone className="h-4 w-4" />
            Support
          </a>

          {/* Logout */}
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </aside>
    </>
  )
}
