"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { KpiCard } from "@/components/kpi-card"
import { SARAmount, SARSymbol } from "@/components/sar-symbol"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  Plus,
  Package,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Layers,
} from "lucide-react"

// Types
interface ServiceOption {
  id: string
  nameEn: string
  nameAr: string
}

interface PackageType {
  id: string
  nameEn: string
  nameAr: string
  descriptionEn: string
  descriptionAr: string
  sessions: number
  price: number
  validityDays: number
  services: string[]
  isActive: boolean
  schedulingPreference: "auto" | "contact"
  purchaseCount: number
}

interface CustomerPurchase {
  id: string
  customerId: string
  customerName: string
  customerPhone: string
  packageId: string
  packageName: string
  totalSessions: number
  sessionsRemaining: number
  purchaseDate: string
  expiryDate: string
  status: "Active" | "Exhausted" | "Expired"
}

// Mock services
const mockServices: ServiceOption[] = [
  { id: "1", nameEn: "Premium Exterior Wash", nameAr: "غسيل خارجي مميز" },
  { id: "2", nameEn: "Full Interior Detail", nameAr: "تنظيف داخلي كامل" },
  { id: "3", nameEn: "Ceramic Coating", nameAr: "طلاء سيراميك" },
  { id: "4", nameEn: "Engine Deep Clean", nameAr: "تنظيف عميق للمحرك" },
  { id: "5", nameEn: "Tire Shine & Dressing", nameAr: "تلميع وتجميل الإطارات" },
]

// Mock packages
const mockPackages: PackageType[] = [
  {
    id: "PKG001",
    nameEn: "Monthly Shine",
    nameAr: "لمعان شهري",
    descriptionEn: "Perfect for regular car maintenance",
    descriptionAr: "مثالي للعناية المنتظمة بالسيارة",
    sessions: 4,
    price: 400,
    validityDays: 30,
    services: ["1", "5"],
    isActive: true,
    schedulingPreference: "auto",
    purchaseCount: 24,
  },
  {
    id: "PKG002",
    nameEn: "Premium Care",
    nameAr: "العناية المميزة",
    descriptionEn: "Complete interior and exterior care",
    descriptionAr: "عناية كاملة داخلية وخارجية",
    sessions: 6,
    price: 750,
    validityDays: 45,
    services: ["1", "2", "5"],
    isActive: true,
    schedulingPreference: "contact",
    purchaseCount: 12,
  },
  {
    id: "PKG003",
    nameEn: "Ultimate Protection",
    nameAr: "الحماية القصوى",
    descriptionEn: "Full detailing with ceramic protection",
    descriptionAr: "تنظيف كامل مع حماية سيراميك",
    sessions: 8,
    price: 1500,
    validityDays: 60,
    services: ["1", "2", "3", "4"],
    isActive: false,
    schedulingPreference: "contact",
    purchaseCount: 5,
  },
]

// Mock customer purchases
const mockPurchases: CustomerPurchase[] = [
  {
    id: "PUR001",
    customerId: "C001",
    customerName: "Ahmed Al-Rashid",
    customerPhone: "+966 55 123 4567",
    packageId: "PKG001",
    packageName: "Monthly Shine",
    totalSessions: 4,
    sessionsRemaining: 2,
    purchaseDate: "2024-01-15",
    expiryDate: "2024-02-14",
    status: "Active",
  },
  {
    id: "PUR002",
    customerId: "C002",
    customerName: "Fatima Hassan",
    customerPhone: "+966 55 234 5678",
    packageId: "PKG002",
    packageName: "Premium Care",
    totalSessions: 6,
    sessionsRemaining: 0,
    purchaseDate: "2024-01-10",
    expiryDate: "2024-02-24",
    status: "Exhausted",
  },
  {
    id: "PUR003",
    customerId: "C003",
    customerName: "Mohammed Ali",
    customerPhone: "+966 55 345 6789",
    packageId: "PKG001",
    packageName: "Monthly Shine",
    totalSessions: 4,
    sessionsRemaining: 4,
    purchaseDate: "2023-12-01",
    expiryDate: "2023-12-31",
    status: "Expired",
  },
  {
    id: "PUR004",
    customerId: "C004",
    customerName: "Sara Abdullah",
    customerPhone: "+966 55 456 7890",
    packageId: "PKG002",
    packageName: "Premium Care",
    totalSessions: 6,
    sessionsRemaining: 4,
    purchaseDate: "2024-01-20",
    expiryDate: "2024-03-05",
    status: "Active",
  },
]

const purchaseStatusStyles: Record<CustomerPurchase["status"], string> = {
  Active: "bg-green-100 text-green-700",
  Exhausted: "bg-gray-100 text-gray-700",
  Expired: "bg-red-100 text-red-700",
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageType[]>(mockPackages)
  const [purchases] = useState<CustomerPurchase[]>(mockPurchases)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletePackageId, setDeletePackageId] = useState<string | null>(null)
  const [purchaseFilter, setPurchaseFilter] = useState("all")

  // Form state
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    sessions: 2,
    price: 0,
    validityDays: 30,
    services: [] as string[],
    isActive: true,
    schedulingPreference: "auto" as "auto" | "contact",
  })

  // Stats
  const stats = {
    activePackages: packages.filter((p) => p.isActive).length,
    totalPurchases: purchases.filter(
      (p) =>
        new Date(p.purchaseDate).getMonth() === new Date().getMonth()
    ).length,
    sessionsUsed: purchases.reduce(
      (sum, p) => sum + (p.totalSessions - p.sessionsRemaining),
      0
    ),
  }

  // Filtered purchases
  const filteredPurchases =
    purchaseFilter === "all"
      ? purchases
      : purchases.filter((p) => p.packageId === purchaseFilter)

  const handleAddPackage = () => {
    setEditingPackage(null)
    setFormData({
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
      sessions: 2,
      price: 0,
      validityDays: 30,
      services: [],
      isActive: true,
      schedulingPreference: "auto",
    })
    setIsPanelOpen(true)
  }

  const handleEditPackage = (pkg: PackageType) => {
    setEditingPackage(pkg)
    setFormData({
      nameEn: pkg.nameEn,
      nameAr: pkg.nameAr,
      descriptionEn: pkg.descriptionEn,
      descriptionAr: pkg.descriptionAr,
      sessions: pkg.sessions,
      price: pkg.price,
      validityDays: pkg.validityDays,
      services: pkg.services,
      isActive: pkg.isActive,
      schedulingPreference: pkg.schedulingPreference,
    })
    setIsPanelOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setDeletePackageId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (deletePackageId) {
      setPackages((prev) => prev.filter((p) => p.id !== deletePackageId))
      setIsDeleteDialogOpen(false)
      setDeletePackageId(null)
    }
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive } : p))
    )
  }

  const handleSavePackage = () => {
    if (editingPackage) {
      setPackages((prev) =>
        prev.map((p) =>
          p.id === editingPackage.id
            ? { ...p, ...formData }
            : p
        )
      )
    } else {
      const newPackage: PackageType = {
        id: `PKG${String(packages.length + 1).padStart(3, "0")}`,
        ...formData,
        purchaseCount: 0,
      }
      setPackages((prev) => [...prev, newPackage])
    }
    setIsPanelOpen(false)
  }

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }))
  }

  const getServiceNames = (serviceIds: string[]) => {
    return serviceIds
      .map((id) => mockServices.find((s) => s.id === id)?.nameEn)
      .filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="pt-14 lg:ml-60 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                Packages
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Manage your service bundles
              </p>
            </div>
            <Button onClick={handleAddPackage} className="w-full gap-2 sm:w-auto">
              <Plus className="h-4 w-4" />
              Add Package
            </Button>
          </div>

          {/* KPI Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            <KpiCard
              icon="package"
              label="Active Packages"
              value={stats.activePackages}
            />
            <KpiCard
              icon="shopping-cart"
              label="Purchases This Month"
              value={stats.totalPurchases}
            />
            <KpiCard
              icon="calendar"
              label="Sessions Used"
              value={stats.sessionsUsed}
            />
          </div>

          {/* Packages Grid */}
          {packages.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Layers className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No packages yet
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first package to offer service bundles
              </p>
              <Button onClick={handleAddPackage} className="mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Create your first package
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => {
                const serviceNames = getServiceNames(pkg.services)
                const displayedServices = serviceNames.slice(0, 3)
                const moreCount = serviceNames.length - 3

                return (
                  <div
                    key={pkg.id}
                    className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                  >
                    {/* Header */}
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-semibold text-foreground sm:text-lg">
                          {pkg.nameEn}
                        </h3>
                        <p className="truncate text-sm text-muted-foreground" dir="rtl">
                          {pkg.nameAr}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="shrink-0 bg-primary/10 text-primary"
                      >
                        {pkg.sessions} Sessions
                      </Badge>
                    </div>

                    {/* Price & Validity */}
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-lg font-bold text-foreground sm:text-xl">
                        <SARAmount amount={pkg.price} />
                      </p>
                      <p className="text-xs text-muted-foreground sm:text-sm">
                        Valid for {pkg.validityDays} days
                      </p>
                    </div>

                    {/* Services */}
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {displayedServices.map((name, idx) => (
                        <span
                          key={idx}
                          className="rounded-lg bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {name}
                        </span>
                      ))}
                      {moreCount > 0 && (
                        <span className="rounded-lg bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          +{moreCount} more
                        </span>
                      )}
                    </div>

                    {/* Toggle & Purchases */}
                    <div className="mb-4 flex items-center justify-between border-t border-border pt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground sm:text-sm">
                          {pkg.isActive ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={pkg.isActive}
                          onCheckedChange={(checked) =>
                            handleToggleActive(pkg.id, checked)
                          }
                        />
                      </div>
                      <p className="text-xs text-muted-foreground sm:text-sm">
                        {pkg.purchaseCount} customers
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPackage(pkg)}
                        className="flex-1 gap-1.5 text-xs sm:text-sm"
                      >
                        <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(pkg.id)}
                        className="flex-1 gap-1.5 text-xs text-destructive hover:bg-destructive hover:text-destructive-foreground sm:text-sm"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Customer Purchases Section */}
          <div className="mt-8">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                Customer Purchases
              </h2>
              <Select value={purchaseFilter} onValueChange={setPurchaseFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Packages</SelectItem>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-2xl border border-border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <Table className="min-w-[800px]">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6">Customer</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead className="text-center">Sessions</TableHead>
                      <TableHead>Purchase Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPurchases.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell className="pl-6">
                          <div>
                            <p className="font-medium text-foreground">
                              {purchase.customerName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {purchase.customerPhone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {purchase.packageName}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium text-foreground">
                            {purchase.sessionsRemaining}
                          </span>
                          <span className="text-muted-foreground">
                            /{purchase.totalSessions}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {purchase.purchaseDate}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {purchase.expiryDate}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "font-medium",
                              purchaseStatusStyles[purchase.status]
                            )}
                          >
                            {purchase.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Package Side Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-md transform border-l border-border bg-card shadow-xl transition-transform duration-300",
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">
              {editingPackage ? "Edit Package" : "Add Package"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPanelOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-5">
              {/* Name English */}
              <div className="space-y-2">
                <Label htmlFor="nameEn">Name (English)</Label>
                <Input
                  id="nameEn"
                  value={formData.nameEn}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nameEn: e.target.value }))
                  }
                  placeholder="e.g., Monthly Shine"
                />
              </div>

              {/* Name Arabic */}
              <div className="space-y-2">
                <Label htmlFor="nameAr">Name (Arabic)</Label>
                <Input
                  id="nameAr"
                  value={formData.nameAr}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nameAr: e.target.value }))
                  }
                  placeholder="مثال: لمعان شهري"
                  dir="rtl"
                />
              </div>

              {/* Description English */}
              <div className="space-y-2">
                <Label htmlFor="descEn">Description (English)</Label>
                <Textarea
                  id="descEn"
                  value={formData.descriptionEn}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      descriptionEn: e.target.value,
                    }))
                  }
                  placeholder="Describe the package benefits..."
                  rows={3}
                />
              </div>

              {/* Description Arabic */}
              <div className="space-y-2">
                <Label htmlFor="descAr">Description (Arabic)</Label>
                <Textarea
                  id="descAr"
                  value={formData.descriptionAr}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      descriptionAr: e.target.value,
                    }))
                  }
                  placeholder="وصف مزايا الباقة..."
                  dir="rtl"
                  rows={3}
                />
              </div>

              {/* Sessions */}
              <div className="space-y-2">
                <Label htmlFor="sessions">Number of Sessions</Label>
                <Input
                  id="sessions"
                  type="number"
                  min={2}
                  value={formData.sessions}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sessions: parseInt(e.target.value) || 2,
                    }))
                  }
                />
                <p className="text-xs text-muted-foreground">Minimum 2 sessions</p>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <Input
                    id="price"
                    type="number"
                    min={0}
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <SARSymbol />
                  </div>
                </div>
              </div>

              {/* Validity */}
              <div className="space-y-2">
                <Label htmlFor="validity">Validity Period</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="validity"
                    type="number"
                    min={1}
                    value={formData.validityDays}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        validityDays: parseInt(e.target.value) || 30,
                      }))
                    }
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">
                    days after purchase
                  </span>
                </div>
              </div>

              {/* Services Multi-Select */}
              <div className="space-y-2">
                <Label>Included Services</Label>
                <div className="space-y-2 rounded-xl border border-border p-3">
                  {mockServices.map((service) => (
                    <label
                      key={service.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-muted"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service.id)}
                        onChange={() => handleServiceToggle(service.id)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {service.nameEn}
                        </p>
                        <p className="truncate text-xs text-muted-foreground" dir="rtl">
                          {service.nameAr}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Scheduling Preference */}
              <div className="space-y-3">
                <Label>Scheduling Preference</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        schedulingPreference: "auto",
                      }))
                    }
                    className={cn(
                      "rounded-xl border-2 p-3 text-left transition-all",
                      formData.schedulingPreference === "auto"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <p className="text-sm font-medium text-foreground">
                      Auto Schedule
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Customer picks days
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        schedulingPreference: "contact",
                      }))
                    }
                    className={cn(
                      "rounded-xl border-2 p-3 text-left transition-all",
                      formData.schedulingPreference === "contact"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    <p className="text-sm font-medium text-foreground">
                      Contact Customer
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Provider calls to arrange
                    </p>
                  </button>
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div>
                  <p className="font-medium text-foreground">Package Status</p>
                  <p className="text-sm text-muted-foreground">
                    {formData.isActive ? "Visible to customers" : "Hidden from customers"}
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isActive: checked }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Panel Footer */}
          <div className="border-t border-border px-6 py-4">
            <Button onClick={handleSavePackage} className="w-full">
              {editingPackage ? "Save Changes" : "Create Package"}
            </Button>
          </div>
        </div>
      </div>

      {/* Panel Overlay */}
      {isPanelOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsPanelOpen(false)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-center">Delete Package</DialogTitle>
          </DialogHeader>
          <p className="text-center text-muted-foreground">
            Are you sure you want to delete this package? This action cannot be
            undone.
          </p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
