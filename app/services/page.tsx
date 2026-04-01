"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ServiceCard, type Service } from "@/components/service-card"
import { ServicePanel } from "@/components/service-panel"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const mockServices: Service[] = [
  {
    id: "1",
    nameEn: "Premium Exterior Wash",
    nameAr: "غسيل خارجي مميز",
    category: "Exterior Wash",
    duration: 45,
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop",
    pricing: { sedan: 120, suv: 150, pickup: 140, van: 160, luxury: 200 },
    isActive: true,
  },
  {
    id: "2",
    nameEn: "Full Interior Detail",
    nameAr: "تنظيف داخلي كامل",
    category: "Interior Cleaning",
    duration: 90,
    image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=400&h=300&fit=crop",
    pricing: { sedan: 250, suv: 300, pickup: 280, van: 320, luxury: 400 },
    isActive: true,
  },
  {
    id: "3",
    nameEn: "Ceramic Coating",
    nameAr: "طلاء سيراميك",
    category: "Ceramic Coating",
    duration: 180,
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400&h=300&fit=crop",
    pricing: { sedan: 1500, suv: 1800, pickup: 1700, van: 2000, luxury: 2500 },
    isActive: true,
  },
  {
    id: "4",
    nameEn: "Engine Deep Clean",
    nameAr: "تنظيف عميق للمحرك",
    category: "Engine Cleaning",
    duration: 60,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    pricing: { sedan: 180, suv: 220, pickup: 200, van: 240, luxury: 300 },
    isActive: false,
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.nameAr.includes(searchQuery)
    const matchesCategory =
      activeCategory === "All" || service.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const handleAddService = () => {
    setEditingService(null)
    setIsPanelOpen(true)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setIsPanelOpen(true)
  }

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive } : s))
    )
  }

  const handleSaveService = (serviceData: Partial<Service>) => {
    if (editingService) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id ? { ...s, ...serviceData } : s
        )
      )
    } else {
      const newService: Service = {
        id: String(Date.now()),
        nameEn: serviceData.nameEn || "",
        nameAr: serviceData.nameAr || "",
        category: serviceData.category || "",
        duration: serviceData.duration || 0,
        image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop",
        pricing: serviceData.pricing || {
          sedan: 0,
          suv: 0,
          pickup: 0,
          van: 0,
          luxury: 0,
        },
        isActive: true,
      }
      setServices((prev) => [...prev, newService])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="pl-60">
        <div className="px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Services</h1>
              <p className="mt-1 text-muted-foreground">
                Manage your car wash services
              </p>
            </div>
            <Button onClick={handleAddService} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </div>

          {/* Search and Category Filters */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="pl-10"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Services List */}
          {filteredServices.length > 0 ? (
            <div className="space-y-4">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={handleEditService}
                  onDelete={handleDeleteService}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card px-8 py-16">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                No services yet
              </h3>
              <p className="mb-6 text-center text-muted-foreground">
                Get started by adding your first car wash service
              </p>
              <Button onClick={handleAddService} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Service
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Panel */}
      <ServicePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onSave={handleSaveService}
        editingService={editingService}
      />
    </div>
  )
}
