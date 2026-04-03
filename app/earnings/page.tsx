"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { KpiCard } from "@/components/kpi-card"
import { SARAmount, SARSymbol } from "@/components/sar-symbol"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Wallet,
  Download,
  FileText,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  RotateCcw,
  AlertTriangle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type PeriodFilter = "today" | "week" | "month" | "quarter" | "year" | "custom"
type SubTab = "overview" | "services" | "crew" | "invoices"
type InvoiceStatus = "Paid" | "Pending" | "Refunded"
type PaymentMethod = "Apple Pay" | "Mada" | "Visa" | "Mastercard" | "STC Pay" | "Tabby" | "Tamara" | "Package"

interface ServiceEarning {
  rank: number
  name: string
  orders: number
  revenue: number
  growth: number
}

interface CrewEarning {
  rank: number
  name: string
  orders: number
  revenue: number
  performance: number
}

interface Invoice {
  id: string
  orderId: string
  customerName: string
  service: string
  crew: string
  vat: number
  total: number
  paymentMethod: PaymentMethod
  status: InvoiceStatus
  date: string
  time: string
}

const periodLabels: Record<PeriodFilter, string> = {
  today: "Today",
  week: "This Week",
  month: "This Month",
  quarter: "This Quarter",
  year: "This Year",
  custom: "Custom Range",
}

const mockServices = [
  "All Services",
  "Express Wash",
  "Premium Wash",
  "Interior Cleaning",
  "Full Detail",
  "Ceramic Coating",
]

const mockCrew = [
  "All Crew",
  "Yusuf Al-Malki",
  "Omar Hassan",
  "Khaled Ibrahim",
  "Faisal Al-Dosari",
]

const mockServiceEarnings: ServiceEarning[] = [
  { rank: 1, name: "Premium Wash", orders: 156, revenue: 46644, growth: 12.5 },
  { rank: 2, name: "Full Detail", orders: 89, revenue: 62211, growth: 8.2 },
  { rank: 3, name: "Interior Cleaning", orders: 124, revenue: 27900, growth: -3.1 },
  { rank: 4, name: "Express Wash", orders: 203, revenue: 20300, growth: 15.7 },
  { rank: 5, name: "Ceramic Coating", orders: 34, revenue: 44166, growth: 22.3 },
]

const mockCrewEarnings: CrewEarning[] = [
  { rank: 1, name: "Yusuf Al-Malki", orders: 89, revenue: 26700, performance: 98 },
  { rank: 2, name: "Khaled Ibrahim", orders: 76, revenue: 22800, performance: 95 },
  { rank: 3, name: "Omar Hassan", orders: 64, revenue: 19200, performance: 87 },
  { rank: 4, name: "Nasser Al-Harbi", orders: 58, revenue: 17400, performance: 82 },
  { rank: 5, name: "Faisal Al-Dosari", orders: 45, revenue: 13500, performance: 78 },
]

const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    orderId: "ORD-001",
    customerName: "Ahmed Al-Rashid",
    service: "Premium Wash",
    crew: "Yusuf Al-Malki",
    vat: 39,
    total: 299,
    paymentMethod: "Apple Pay",
    status: "Paid",
    date: "Apr 1, 2026",
    time: "10:30 AM",
  },
  {
    id: "INV-002",
    orderId: "ORD-002",
    customerName: "Mohammed Hassan",
    service: "Full Detail",
    crew: "Omar Hassan",
    vat: 91,
    total: 699,
    paymentMethod: "Mada",
    status: "Paid",
    date: "Apr 1, 2026",
    time: "09:45 AM",
  },
  {
    id: "INV-003",
    orderId: "ORD-003",
    customerName: "Khalid Ibrahim",
    service: "Interior Cleaning",
    crew: "Khaled Ibrahim",
    vat: 29,
    total: 225,
    paymentMethod: "STC Pay",
    status: "Pending",
    date: "Apr 1, 2026",
    time: "09:15 AM",
  },
  {
    id: "INV-004",
    orderId: "ORD-004",
    customerName: "Fahad Al-Mutairi",
    service: "Express Wash",
    crew: "Faisal Al-Dosari",
    vat: 13,
    total: 100,
    paymentMethod: "Visa",
    status: "Paid",
    date: "Mar 31, 2026",
    time: "04:30 PM",
  },
  {
    id: "INV-005",
    orderId: "ORD-005",
    customerName: "Sultan Al-Dosari",
    service: "Ceramic Coating",
    crew: "Yusuf Al-Malki",
    vat: 169,
    total: 1299,
    paymentMethod: "Tabby",
    status: "Paid",
    date: "Mar 31, 2026",
    time: "02:00 PM",
  },
  {
    id: "INV-006",
    orderId: "ORD-006",
    customerName: "Nasser Al-Qahtani",
    service: "Premium Wash",
    crew: "Omar Hassan",
    vat: 45,
    total: 349,
    paymentMethod: "Tamara",
    status: "Refunded",
    date: "Mar 31, 2026",
    time: "11:00 AM",
  },
  {
    id: "INV-007",
    orderId: "ORD-007",
    customerName: "Turki Al-Shehri",
    service: "Full Detail",
    crew: "Khaled Ibrahim",
    vat: 91,
    total: 699,
    paymentMethod: "Package",
    status: "Paid",
    date: "Mar 30, 2026",
    time: "03:45 PM",
  },
  {
    id: "INV-008",
    orderId: "ORD-008",
    customerName: "Abdullah Al-Ghamdi",
    service: "Interior Cleaning",
    crew: "Faisal Al-Dosari",
    vat: 29,
    total: 225,
    paymentMethod: "Mastercard",
    status: "Paid",
    date: "Mar 30, 2026",
    time: "01:20 PM",
  },
]

const invoiceStatusStyles: Record<InvoiceStatus, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Refunded: "bg-red-100 text-red-700",
}

export default function EarningsPage() {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("month")
  const [serviceFilter, setServiceFilter] = useState("All Services")
  const [crewFilter, setCrewFilter] = useState("All Crew")
  const [activeTab, setActiveTab] = useState<SubTab>("overview")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [refundInvoice, setRefundInvoice] = useState<Invoice | null>(null)
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false)

  // Mock stats - would be computed from real data
  const stats = {
    totalRevenue: 201221,
    vatCollected: 26146,
    completedOrders: 606,
    avgOrderValue: 332,
  }

  const handleExportCSV = () => {
    console.log("Exporting to CSV...")
  }

  const handleExportPDF = () => {
    console.log("Exporting to PDF...")
  }

  const handleViewPDF = (invoice: Invoice) => {
    console.log("Viewing PDF for invoice:", invoice.id)
  }

  const handleRefundClick = (invoice: Invoice) => {
    setRefundInvoice(invoice)
    setIsRefundDialogOpen(true)
  }

  const handleConfirmRefund = () => {
    if (refundInvoice) {
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === refundInvoice.id ? { ...inv, status: "Refunded" as InvoiceStatus } : inv
        )
      )
      setIsRefundDialogOpen(false)
      setRefundInvoice(null)
    }
  }

  const subTabs: { key: SubTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "services", label: "Services" },
    { key: "crew", label: "Crew" },
    { key: "invoices", label: "Invoices" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="pt-14 lg:ml-60 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground sm:text-2xl">Earnings</h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">Your revenue overview</p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button variant="outline" onClick={handleExportCSV} className="flex-1 gap-2 sm:flex-none">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span> CSV
              </Button>
              <Button variant="outline" onClick={handleExportPDF} className="flex-1 gap-2 sm:flex-none">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span> PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Period Filter Tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          {(Object.keys(periodLabels) as PeriodFilter[]).map((period) => (
            <button
              key={period}
              onClick={() => setPeriodFilter(period)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                periodFilter === period
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {periodLabels[period]}
            </button>
          ))}
        </div>

        {/* Custom Date Range */}
        {periodFilter === "custom" && (
          <div className="mb-4 flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
              <Label className="shrink-0 text-sm text-muted-foreground">From</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full sm:w-40"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="shrink-0 text-sm text-muted-foreground">To</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full sm:w-40"
              />
            </div>
            <Button size="sm" className="w-full sm:w-auto">Apply</Button>
          </div>
        )}

        {/* Filter Dropdowns */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              {mockServices.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={crewFilter} onValueChange={setCrewFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Crew" />
            </SelectTrigger>
            <SelectContent>
              {mockCrew.map((crew) => (
                <SelectItem key={crew} value={crew}>
                  {crew}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:mb-8 lg:grid-cols-4">
          <Card className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm">
            <CardContent className="p-3 md:p-6">
              {/* Mobile Layout */}
              <div className="flex flex-col items-center text-center md:hidden">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-1.5 text-[11px] leading-tight text-muted-foreground">
                  Total Revenue
                </p>
                <p className="mt-1 text-base font-bold leading-tight text-foreground">
                  {stats.totalRevenue.toLocaleString()}<SARSymbol />
                </p>
              </div>
              {/* Desktop Layout */}
              <div className="hidden items-center gap-3 overflow-hidden md:flex">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </p>
                  <p className="truncate text-2xl font-bold text-foreground">
                    <SARAmount amount={stats.totalRevenue} />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <KpiCard
            icon="receipt"
            label="VAT Collected"
            value={<SARAmount amount={stats.vatCollected} />}
            mobileValue={stats.vatCollected}
          />
          <KpiCard
            icon="check-circle"
            label="Completed Orders"
            value={stats.completedOrders}
          />
          <KpiCard
            icon="trending-up"
            label="Avg. Order Value"
            value={<SARAmount amount={stats.avgOrderValue} />}
            mobileValue={stats.avgOrderValue}
          />
        </div>

        {/* Sub Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top Services */}
            <Card className="rounded-2xl border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">
                  Top Services
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                <Table className="min-w-[400px]">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead className="text-right">Orders</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockServiceEarnings.slice(0, 5).map((service) => (
                      <TableRow key={service.rank}>
                        <TableCell className="font-medium text-muted-foreground">
                          {service.rank}
                        </TableCell>
                        <TableCell className="font-medium">
                          {service.name}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {service.orders}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          <SARAmount amount={service.revenue} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>

            {/* Top Crew */}
            <Card className="rounded-2xl border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">Top Crew</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                <Table className="min-w-[500px]">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Orders</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="w-24">Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCrewEarnings.slice(0, 5).map((crew) => (
                      <TableRow key={crew.rank}>
                        <TableCell className="font-medium text-muted-foreground">
                          {crew.rank}
                        </TableCell>
                        <TableCell className="font-medium">{crew.name}</TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {crew.orders}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          <SARAmount amount={crew.revenue} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={crew.performance}
                              className="h-2 w-16"
                            />
                            <span className="text-xs text-muted-foreground">
                              {crew.performance}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "services" && (
          <Card className="rounded-2xl border border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                Service Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Service Name</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Avg. Price</TableHead>
                    <TableHead className="text-right">Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockServiceEarnings.map((service) => (
                    <TableRow key={service.rank}>
                      <TableCell className="font-medium text-muted-foreground">
                        {service.rank}
                      </TableCell>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {service.orders}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <SARAmount amount={service.revenue} />
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        <SARAmount amount={Math.round(service.revenue / service.orders)} />
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-sm font-medium",
                            service.growth >= 0 ? "text-green-600" : "text-red-600"
                          )}
                        >
                          {service.growth >= 0 ? (
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowDownRight className="h-3.5 w-3.5" />
                          )}
                          {Math.abs(service.growth)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "crew" && (
          <Card className="rounded-2xl border border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                Crew Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Crew Name</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Avg. per Order</TableHead>
                    <TableHead className="w-32">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCrewEarnings.map((crew) => (
                    <TableRow key={crew.rank}>
                      <TableCell className="font-medium text-muted-foreground">
                        {crew.rank}
                      </TableCell>
                      <TableCell className="font-medium">{crew.name}</TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {crew.orders}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <SARAmount amount={crew.revenue} />
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        <SARAmount amount={Math.round(crew.revenue / crew.orders)} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={crew.performance}
                            className="h-2 flex-1"
                          />
                          <span className="w-10 text-right text-xs font-medium text-muted-foreground">
                            {crew.performance}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "invoices" && (
          <Card className="rounded-2xl border border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Invoices</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Date</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Crew</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">VAT</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <div>
                          <p className="text-foreground">{invoice.date}</p>
                          <p className="text-xs text-muted-foreground">
                            {invoice.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {invoice.orderId}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {invoice.service}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {invoice.crew}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {invoice.paymentMethod}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        <SARAmount amount={invoice.vat} />
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <SARAmount amount={invoice.total} />
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "font-medium",
                            invoiceStatusStyles[invoice.status]
                          )}
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleViewPDF(invoice)}
                            title="View PDF"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {invoice.status === "Paid" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => handleRefundClick(invoice)}
                            >
                              <RotateCcw className="mr-1 h-3.5 w-3.5" />
                              Refund
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Refund Confirmation Dialog */}
        <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <DialogTitle className="text-center">Confirm Refund</DialogTitle>
              <DialogDescription className="text-center">
                Are you sure you want to refund this invoice? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            {refundInvoice && (
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Invoice ID</p>
                    <p className="font-medium">{refundInvoice.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Order ID</p>
                    <p className="font-medium">{refundInvoice.orderId}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Customer</p>
                    <p className="font-medium">{refundInvoice.customerName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium text-red-600">
                      <SARAmount amount={refundInvoice.total} />
                    </p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsRefundDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmRefund}
              >
                Confirm Refund
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      </main>
    </div>
  )
}
