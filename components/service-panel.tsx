"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X, Upload, Link as LinkIcon, Plus } from "lucide-react"
import { type Service, type VehiclePricing } from "./service-card"
import { useState, useEffect } from "react"

interface ServicePanelProps {
  isOpen: boolean
  onClose: () => void
  onSave: (service: Partial<Service>) => void
  editingService?: Service | null
}

const defaultCategories = [
  "Exterior Wash",
  "Interior Cleaning",
  "Full Detail",
  "Ceramic Coating",
  "Paint Protection",
  "Engine Cleaning",
]

const vehicleTypes = [
  { key: "sedan" as const, label: "Sedan" },
  { key: "suv" as const, label: "SUV" },
  { key: "pickup" as const, label: "Pickup" },
  { key: "van" as const, label: "Van" },
  { key: "luxury" as const, label: "Luxury" },
  { key: "motorcycle" as const, label: "Motorcycle" },
  { key: "bicycle" as const, label: "Bicycle" },
]

const defaultPricing: VehiclePricing = {
  sedan: 0,
  suv: 0,
  pickup: 0,
  van: 0,
  luxury: 0,
  motorcycle: 0,
  bicycle: 0,
}

export function ServicePanel({
  isOpen,
  onClose,
  onSave,
  editingService,
}: ServicePanelProps) {
  const [nameEn, setNameEn] = useState("")
  const [nameAr, setNameAr] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")
  const [descriptionAr, setDescriptionAr] = useState("")
  const [category, setCategory] = useState("")
  const [duration, setDuration] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [includeVat, setIncludeVat] = useState(true)
  const [pricing, setPricing] = useState<VehiclePricing>(defaultPricing)
  const [categories, setCategories] = useState(defaultCategories)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategory, setNewCategory] = useState("")

  useEffect(() => {
    if (editingService) {
      setNameEn(editingService.nameEn)
      setNameAr(editingService.nameAr)
      setCategory(editingService.category)
      setDuration(String(editingService.duration))
      setPricing(editingService.pricing)
    } else {
      setNameEn("")
      setNameAr("")
      setDescriptionEn("")
      setDescriptionAr("")
      setCategory("")
      setDuration("")
      setVideoUrl("")
      setIncludeVat(true)
      setPricing(defaultPricing)
    }
  }, [editingService, isOpen])

  const handlePricingChange = (
    key: keyof VehiclePricing,
    value: string
  ) => {
    setPricing((prev) => ({
      ...prev,
      [key]: Number(value) || 0,
    }))
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories((prev) => [...prev, newCategory.trim()])
      setCategory(newCategory.trim())
      setNewCategory("")
      setIsAddingCategory(false)
    }
  }

  const handleSave = () => {
    onSave({
      nameEn,
      nameAr,
      category,
      duration: Number(duration),
      pricing,
      isActive: true,
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
            {editingService ? "Edit Service" : "Add Service"}
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
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameEn">Name (English)</Label>
                <Input
                  id="nameEn"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="Exterior Wash"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameAr">Name (Arabic)</Label>
                <Input
                  id="nameAr"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="غسيل خارجي"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Description Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="descEn">Description (English)</Label>
                <Textarea
                  id="descEn"
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  placeholder="Describe the service..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descAr">Description (Arabic)</Label>
                <Textarea
                  id="descAr"
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  placeholder="وصف الخدمة..."
                  dir="rtl"
                  rows={3}
                />
              </div>
            </div>

            {/* Category & Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                {isAddingCategory ? (
                  <div className="flex gap-2">
                    <Input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="New category name"
                      onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                    />
                    <Button size="sm" onClick={handleAddCategory}>
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsAddingCategory(false)
                        setNewCategory("")
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                      <button
                        onClick={() => setIsAddingCategory(true)}
                        className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-primary outline-none hover:bg-accent"
                      >
                        <Plus className="h-4 w-4" />
                        Add new category
                      </button>
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="45"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Service Image</Label>
              <div className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary hover:bg-muted">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="h-8 w-8" />
                  <span className="text-sm">Click to upload image</span>
                </div>
              </div>
            </div>

            {/* Video URL */}
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL (optional)</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="videoUrl"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* VAT Toggle */}
            <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
              <div>
                <p className="font-medium text-foreground">Include VAT</p>
                <p className="text-sm text-muted-foreground">
                  15% VAT will be added to the price
                </p>
              </div>
              <Switch checked={includeVat} onCheckedChange={setIncludeVat} />
            </div>

            {/* Vehicle Pricing Grid */}
            <div className="space-y-3">
              <Label>Pricing by Vehicle Type (SAR)</Label>
              <div className="grid grid-cols-2 gap-3">
                {vehicleTypes.map((vehicle) => (
                  <div
                    key={vehicle.key}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
                  >
                    <span className="flex-1 text-sm font-medium text-foreground">
                      {vehicle.label}
                    </span>
                    <Input
                      type="number"
                      value={pricing[vehicle.key] || ""}
                      onChange={(e) =>
                        handlePricingChange(vehicle.key, e.target.value)
                      }
                      placeholder="0"
                      className="w-24 text-right"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              {editingService ? "Update Service" : "Save Service"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
