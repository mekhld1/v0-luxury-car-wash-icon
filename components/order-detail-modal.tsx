"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { SARAmount } from "@/components/sar-symbol"
import {
  User,
  Phone,
  MapPin,
  Car,
  CreditCard,
  Banknote,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Truck,
} from "lucide-react"

type OrderStatus =
  | "Pending"
  | "Accepted"
  | "In Progress"
  | "Completed"
  | "Cancelled"

interface OrderDetail {
  id: string
  service: string
  vehicleType: string
  vehiclePlate: string
  status: OrderStatus
  subtotal: number
  vat: number
  total: number
  paymentMethod: "Cash" | "Card" | "Apple Pay"
  customerName: string
  customerPhone: string
  location: string
  crewName?: string
  createdAt: string
  acceptedAt?: string
  startedAt?: string
  completedAt?: string
  cancelledAt?: string
  cancellationReason?: string
}

interface OrderDetailModalProps {
  isOpen: boolean
  onClose: () => void
  order: OrderDetail | null
}

const statusConfig: Record<
  OrderStatus,
  { color: string; icon: typeof CheckCircle2 }
> = {
  Pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
  Accepted: { color: "bg-blue-100 text-blue-700", icon: CheckCircle2 },
  "In Progress": { color: "bg-purple-100 text-purple-700", icon: Truck },
  Completed: { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  Cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
}

const paymentIcons = {
  Cash: Banknote,
  Card: CreditCard,
  "Apple Pay": CreditCard,
}

export function OrderDetailModal({
  isOpen,
  onClose,
  order,
}: OrderDetailModalProps) {
  if (!order) return null

  const StatusIcon = statusConfig[order.status].icon
  const PaymentIcon = paymentIcons[order.paymentMethod]

  const timelineSteps = [
    { label: "Order Placed", time: order.createdAt, completed: true },
    {
      label: "Accepted",
      time: order.acceptedAt,
      completed: !!order.acceptedAt && order.status !== "Pending",
    },
    {
      label: "In Progress",
      time: order.startedAt,
      completed:
        !!order.startedAt &&
        (order.status === "In Progress" || order.status === "Completed"),
    },
    {
      label: "Completed",
      time: order.completedAt,
      completed: order.status === "Completed",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Order Details</DialogTitle>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                statusConfig[order.status].color
              )}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {order.status}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {/* Customer Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Customer Information
            </h4>
            <div className="space-y-2 rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {order.customerPhone}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{order.location}</span>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Order Details
            </h4>
            <div className="space-y-2 rounded-xl bg-muted/50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-medium text-foreground">{order.id}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium text-foreground">
                  {order.service}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Vehicle</span>
                <div className="flex items-center gap-1.5">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {order.vehicleType} - {order.vehiclePlate}
                  </span>
                </div>
              </div>
              {order.crewName && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assigned Crew</span>
                  <span className="font-medium text-foreground">
                    {order.crewName}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Payment Breakdown
            </h4>
            <div className="space-y-2 rounded-xl bg-muted/50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground"><SARAmount amount={order.subtotal} /></span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">VAT (15%)</span>
                <span className="text-foreground"><SARAmount amount={order.vat} /></span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="text-lg font-bold text-primary">
                    <SARAmount amount={order.total} />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-2 text-sm">
                <span className="text-muted-foreground">Payment Method</span>
                <div className="flex items-center gap-1.5">
                  <PaymentIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {order.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          {order.status !== "Cancelled" && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">
                Status Timeline
              </h4>
              <div className="space-y-0">
                {timelineSteps.map((step, index) => (
                  <div key={step.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full",
                          step.completed ? "bg-primary" : "bg-muted"
                        )}
                      >
                        <CheckCircle2
                          className={cn(
                            "h-4 w-4",
                            step.completed
                              ? "text-primary-foreground"
                              : "text-muted-foreground"
                          )}
                        />
                      </div>
                      {index < timelineSteps.length - 1 && (
                        <div
                          className={cn(
                            "h-8 w-0.5",
                            step.completed ? "bg-primary" : "bg-muted"
                          )}
                        />
                      )}
                    </div>
                    <div className="pb-8">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          step.completed
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {step.label}
                      </p>
                      {step.time && (
                        <p className="text-xs text-muted-foreground">
                          {step.time}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cancellation Reason */}
          {order.status === "Cancelled" && order.cancellationReason && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">
                Cancellation
              </h4>
              <div className="flex gap-3 rounded-xl bg-red-50 p-4">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-red-700">
                    Order Cancelled
                  </p>
                  <p className="mt-1 text-sm text-red-600">
                    {order.cancellationReason}
                  </p>
                  {order.cancelledAt && (
                    <p className="mt-2 text-xs text-red-500">
                      {order.cancelledAt}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-2 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
