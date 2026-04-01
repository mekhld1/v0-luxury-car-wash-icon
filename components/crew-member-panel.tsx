"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X, Eye, EyeOff } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface CrewMember {
  id: string
  employeeNumber: string
  fullName: string
  phone: string
  email: string
  nationalId: string
  vehicleType: "Car" | "Motorcycle"
  vehiclePlate: string
  assignedServices: string[]
  status: "Available" | "Busy" | "Offline"
}

interface CrewMemberPanelProps {
  isOpen: boolean
  onClose: () => void
  onSave: (member: Partial<CrewMember>) => void
  editingMember?: CrewMember | null
  availableServices: string[]
}

export function CrewMemberPanel({
  isOpen,
  onClose,
  onSave,
  editingMember,
  availableServices,
}: CrewMemberPanelProps) {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [nationalId, setNationalId] = useState("")
  const [vehicleType, setVehicleType] = useState<"Car" | "Motorcycle">("Car")
  const [vehiclePlate, setVehiclePlate] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  useEffect(() => {
    if (editingMember) {
      setFullName(editingMember.fullName)
      setPhone(editingMember.phone)
      setEmail(editingMember.email)
      setNationalId(editingMember.nationalId)
      setVehicleType(editingMember.vehicleType)
      setVehiclePlate(editingMember.vehiclePlate)
      setSelectedServices(editingMember.assignedServices)
    } else {
      setFullName("")
      setPhone("")
      setEmail("")
      setNationalId("")
      setVehicleType("Car")
      setVehiclePlate("")
      setSelectedServices([])
    }
  }, [editingMember, isOpen])

  const handlePlateChange = (value: string) => {
    setVehiclePlate(value.toUpperCase())
  }

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    )
  }

  const handleSave = () => {
    onSave({
      fullName,
      phone,
      email,
      nationalId,
      vehicleType,
      vehiclePlate,
      assignedServices: selectedServices,
      status: editingMember?.status || "Offline",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-lg flex-col border-l border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-xl font-semibold text-foreground">
            {editingMember ? "Edit Crew Member" : "Add Crew Member"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Visible to Customer Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Visible to customer
                </span>
              </div>

              <div className="space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ahmed Al-Rashid"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+966 55 123 4567"
                  />
                </div>

                {/* Vehicle Type & Plate */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle Type</Label>
                    <Select
                      value={vehicleType}
                      onValueChange={(v) =>
                        setVehicleType(v as "Car" | "Motorcycle")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Car">Car</SelectItem>
                        <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehiclePlate">Vehicle Plate</Label>
                    <Input
                      id="vehiclePlate"
                      value={vehiclePlate}
                      onChange={(e) => handlePlateChange(e.target.value)}
                      placeholder="ABC 1234"
                      className="uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Private Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <EyeOff className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Private (not visible to customers)
                </span>
              </div>

              <div className="space-y-4 rounded-xl border border-border bg-muted/30 p-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ahmed@example.com"
                  />
                </div>

                {/* National ID */}
                <div className="space-y-2">
                  <Label htmlFor="nationalId">National ID</Label>
                  <Input
                    id="nationalId"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="1234567890"
                  />
                </div>

                {/* Employee Number - Auto Generated or Edit */}
                {editingMember && (
                  <div className="space-y-2">
                    <Label>Employee Number</Label>
                    <Input
                      value={editingMember.employeeNumber}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Services Multi-Select */}
            <div className="space-y-3">
              <Label>Assigned Services</Label>
              <p className="text-sm text-muted-foreground">
                Select which services this crew member can perform
              </p>
              <div className="flex flex-wrap gap-2">
                {availableServices.map((service) => (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                      selectedServices.includes(service)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                  >
                    {service}
                  </button>
                ))}
              </div>
              {selectedServices.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-sm text-muted-foreground">
                    Selected:
                  </span>
                  {selectedServices.map((service) => (
                    <Badge
                      key={service}
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4">
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              {editingMember ? "Update Member" : "Save Member"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
