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
    <div className="flex gap-5 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
      {/* Service Image */}
      <div className="relative h-32 w-40 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
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
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {service.nameEn}
            </h3>
            <p className="text-sm text-muted-foreground" dir="rtl">
              {service.nameAr}
            </p>
          </div>
          <Badge
            variant="secondary"
            className="bg-secondary text-secondary-foreground"
          >
            {service.category}
          </Badge>
        </div>

        {/* Duration */}
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{service.duration} minutes</span>
        </div>

        {/* Vehicle Pricing Tags */}
        <div className="flex flex-wrap gap-2">
          {vehicleTypes.map((vehicle) => (
            <span
              key={vehicle.key}
              className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-sm"
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
      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
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
            className="gap-1.5"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(service.id)}
            className="gap-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
