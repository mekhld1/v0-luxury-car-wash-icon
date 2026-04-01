"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Clock, User, Phone, Car } from "lucide-react"

interface PendingOrder {
  id: string
  service: string
  vehicleType: string
  amount: number
  customerName: string
  customerPhone: string
  location: string
  timeAgo: string
}

interface PendingOrderCardProps {
  order: PendingOrder
  onViewDetails: () => void
  onAcceptAssign: () => void
}

export function PendingOrderCard({
  order,
  onViewDetails,
  onAcceptAssign,
}: PendingOrderCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-foreground">{order.id}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500" />
            New Order
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {order.timeAgo}
        </div>
      </div>

      {/* Service Info */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-medium text-foreground">{order.service}</p>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Car className="h-4 w-4" />
            {order.vehicleType}
          </div>
        </div>
        <p className="text-lg font-bold text-primary">SAR {order.amount}</p>
      </div>

      {/* Customer Info */}
      <div className="mb-4 space-y-2 rounded-xl bg-muted/50 p-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{order.customerName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{order.customerPhone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{order.location}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onViewDetails}>
          Details
        </Button>
        <Button className="flex-1" onClick={onAcceptAssign}>
          Accept & Assign
        </Button>
      </div>
    </div>
  )
}
