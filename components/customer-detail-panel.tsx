"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SARAmount } from "@/components/sar-symbol"
import {
  X,
  Phone,
  Calendar,
  ShoppingCart,
  Wallet,
  Package,
  Clock,
} from "lucide-react"

interface CustomerOrder {
  id: string
  service: string
  date: string
  amount: number
  status: "Completed" | "Cancelled"
}

interface CustomerPackage {
  name: string
  sessionsRemaining: number
  totalSessions: number
  expiryDate: string
}

interface Customer {
  id: string
  name: string
  phone: string
  memberSince: string
  totalOrders: number
  totalSpent: number
  activePackages: CustomerPackage[]
  lastOrders: CustomerOrder[]
  isVip: boolean
}

interface CustomerDetailPanelProps {
  isOpen: boolean
  onClose: () => void
  customer: Customer | null
}

const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
}

export function CustomerDetailPanel({
  isOpen,
  onClose,
  customer,
}: CustomerDetailPanelProps) {
  if (!isOpen || !customer) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md overflow-y-auto border-l border-border bg-card shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            Customer Details
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {customer.name}
                </h3>
                {customer.isVip && (
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                    VIP
                  </Badge>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{customer.phone}</span>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium text-foreground">{customer.memberSince}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-sm">Total Orders</span>
              </div>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {customer.totalOrders}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wallet className="h-4 w-4" />
                <span className="text-sm">Total Spent</span>
              </div>
              <p className="mt-1 text-2xl font-bold text-foreground">
                <SARAmount amount={customer.totalSpent} />
              </p>
            </div>
          </div>

          {/* Active Packages */}
          {customer.activePackages.length > 0 && (
            <div>
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                <Package className="h-5 w-5 text-primary" />
                Active Packages
              </h4>
              <div className="space-y-3">
                {customer.activePackages.map((pkg, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">{pkg.name}</p>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          Expires: {pkg.expiryDate}
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                        {pkg.sessionsRemaining}/{pkg.totalSessions} sessions
                      </Badge>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{
                          width: `${(pkg.sessionsRemaining / pkg.totalSessions) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last 5 Orders */}
          <div>
            <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Last 5 Orders
            </h4>
            {customer.lastOrders.length > 0 ? (
              <div className="space-y-2">
                {customer.lastOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-foreground">{order.service}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground">
                        <SARAmount amount={order.amount} />
                      </span>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No orders yet</p>
            )}
          </div>

          {/* Contact Button */}
          <Button className="w-full gap-2" size="lg">
            <Phone className="h-4 w-4" />
            Contact Customer
          </Button>
        </div>
      </div>
    </>
  )
}
