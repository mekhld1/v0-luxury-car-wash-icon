"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { SARAmount } from "@/components/sar-symbol"
import { Clock, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"

export interface VehiclePricing {
  sedan: number
  suv: number
  pickup: number
  van: number
  luxury: number
  motorcycle?: number
  bicycle?: number
}

export interface Service {
  id: string
  nameEn: string
  nameAr: string
  category: string
  duration: number
  image: string
  pricing: VehiclePricing
  isActive: boolean
}

interface ServiceCardProps {
  service: Service
  onEdit: (service: Service) => void
  onDelete: (id: string) => void
  onToggleActive: (id: string, isActive: boolean) => void
}

export function ServiceCard({
  service,
  onEdit,
  onDelete,
  onToggleActive,
}: ServiceCardProps) {
  const vehicleTypes = [
    { key: "sedan" as const, label: "Sedan" },
    { key: "suv" as const, label: "SUV" },
    { key: "pickup" as const, label: "Pickup" },
    { key: "van" as const, label: "Van" },
    { key: "luxury" as const, label: "Luxury" },
  ]

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md sm:flex-row sm:gap-5 sm:p-5">
      {/* Service Image */}
      <div className="relative h-40 w-full flex-shrink-0 overflow-hidden rounded-xl bg-muted sm:h-32 sm:w-40">
        <Image
          src={service.image}
          alt={service.nameEn}
          fill
          className="object-cover"
        />
      </div>

      {/* Service Details */}
      <div className="flex flex-1 flex-col">
        {/* Header Row */}
        <div className="mb-2 flex flex-wrap items-start justify-between gap-2 sm:mb-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-foreground sm:text-lg">
              {service.nameEn}
            </h3>
            <p className="truncate text-sm text-muted-foreground" dir="rtl">
              {service.nameAr}
            </p>
          </div>
          <Badge
            variant="secondary"
            className="shrink-0 bg-secondary text-secondary-foreground"
          >
            {service.category}
          </Badge>
        </div>

        {/* Duration */}
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground sm:mb-3">
          <Clock className="h-4 w-4 shrink-0" />
          <span>{service.duration} minutes</span>
        </div>

        {/* Vehicle Pricing Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {vehicleTypes.map((vehicle) => (
            <span
              key={vehicle.key}
              className="inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-xs sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              <span className="font-medium text-foreground">
                {vehicle.label}
              </span>
              <span className="text-muted-foreground">
                <SARAmount amount={service.pricing[vehicle.key]} />
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row items-center justify-between gap-3 border-t border-border pt-3 sm:flex-col sm:items-end sm:justify-between sm:border-t-0 sm:pt-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs text-muted-foreground sm:text-sm">
            {service.isActive ? "Active" : "Inactive"}
          </span>
          <Switch
            checked={service.isActive}
            onCheckedChange={(checked) => onToggleActive(service.id, checked)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(service)}
            className="gap-1 text-xs sm:gap-1.5 sm:text-sm"
          >
            <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(service.id)}
            className="gap-1 text-xs text-destructive hover:bg-destructive hover:text-destructive-foreground sm:gap-1.5 sm:text-sm"
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
