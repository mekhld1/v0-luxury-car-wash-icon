"use client"

// Invoices Management Page
import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { KpiCard } from "@/components/kpi-card"
import { SARAmount, SARSymbol } from "@/components/sar-symbol"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Download,
  Search,
  Eye,
  AlertTriangle,
  X,
  User,
  Phone,
  Car,
  CreditCard,
  FileText,
  RotateCcw,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type InvoiceStatus = "Paid" | "Pending" | "Refunded"
type PaymentMethod = "Apple Pay" | "Mada" | "Visa" | "Mastercard" | "STC Pay" | "Tabby" | "Tamara" | "Package"
type StatusFilter = "All" | "Paid" | "Pending" | "Refunded"

interface Invoice {
  id: string
  orderId: string
  customerName: string
  customerPhone: string
  service: string
  vehicleType: string
  subtotal: number
  vat: number
  total: number
  paymentMethod: PaymentMethod
  status: InvoiceStatus
  date: string
  time: string
}

const mockInvoices: Invoice[] = [
  {
    id: "INV-2024-0001",
    orderId: "ORD-001",
    customerName: "Ahmed Al-Rashid",
    customerPhone: "+966 5* *** **45",
    service: "Premium Wash",
    vehicleType: "SUV",
    subtotal: 260,
    vat: 39,
    total: 299,
    paymentMethod: "Apple Pay",
    status: "Paid",
    date: "Apr 1, 2026",
    time: "10:30 AM",
  },
  {
    id: "INV-2024-0002",
    orderId: "ORD-002",
    customerName: "Mohammed Hassan",
    customerPhone: "+966 5* *** **12",
    service: "Full Detail",
    vehicleType: "Sedan",
    subtotal: 608,
    vat: 91,
    total: 699,
    paymentMethod: "Mada",
    status: "Paid",
    date: "Apr 1, 2026",
    time: "09:45 AM",
  },
  {
    id: "INV-2024-0003",
    orderId: "ORD-003",
    customerName: "Khalid Ibrahim",
    customerPhone: "+966 5* *** **78",
    service: "Interior Cleaning",
    vehicleType: "Pickup",
    subtotal: 196,
    vat: 29,
    total: 225,
    paymentMethod: "STC Pay",
    status: "Pending",
    date: "Apr 1, 2026",
    time: "09:15 AM",
  },
  {
    id: "INV-2024-0004",
    orderId: "ORD-004",
    customerName: "Fahad Al-Mutairi",
    customerPhone: "+966 5* *** **34",
    service: "Express Wash",
    vehicleType: "Sedan",
    subtotal: 87,
    vat: 13,
    total: 100,
    paymentMethod: "Visa",
    status: "Paid",
    date: "Mar 31, 2026",
    time: "04:30 PM",
  },
  {
    id: "INV-2024-0005",
    orderId: "ORD-005",
    customerName: "Sultan Al-Dosari",
    customerPhone: "+966 5* *** **56",
    service: "Ceramic Coating",
    vehicleType: "Luxury",
    subtotal: 1130,
    vat: 169,
    total: 1299,
    paymentMethod: "Tabby",
    status: "Paid",
    date: "Mar 31, 2026",
    time: "02:00 PM",
  },
  {
    id: "INV-2024-0006",
    orderId: "ORD-006",
    customerName: "Nasser Al-Qahtani",
    customerPhone: "+966 5* *** **89",
    service: "Premium Wash",
    vehicleType: "Van",
    subtotal: 304,
    vat: 45,
    total: 349,
    paymentMethod: "Tamara",
    status: "Refunded",
    date: "Mar 31, 2026",
    time: "11:00 AM",
  },
  {
    id: "INV-2024-0007",
    orderId: "ORD-007",
    customerName: "Turki Al-Shehri",
    customerPhone: "+966 5* *** **23",
    service: "Full Detail",
    vehicleType: "SUV",
    subtotal: 608,
    vat: 91,
    total: 699,
    paymentMethod: "Package",
    status: "Paid",
    date: "Mar 30, 2026",
    time: "03:45 PM",
  },
  {
    id: "INV-2024-0008",
    orderId: "ORD-008",
    customerName: "Abdullah Al-Ghamdi",
    customerPhone: "+966 5* *** **67",
    service: "Interior Cleaning",
    vehicleType: "Sedan",
    subtotal: 196,
    vat: 29,
    total: 225,
    paymentMethod: "Mastercard",
    status: "Paid",
    date: "Mar 30, 2026",
    time: "01:20 PM",
  },
  {
    id: "INV-2024-0009",
    orderId: "ORD-009",
    customerName: "Saad Al-Otaibi",
    customerPhone: "+966 5* *** **90",
    service: "Express Wash",
    vehicleType: "Pickup",
    subtotal: 87,
    vat: 13,
    total: 100,
    paymentMethod: "Apple Pay",
    status: "Pending",
    date: "Mar 30, 2026",
    time: "10:00 AM",
  },
  {
    id: "INV-2024-0010",
    orderId: "ORD-010",
    customerName: "Omar Al-Zahrani",
    customerPhone: "+966 5* *** **11",
    service: "Premium Wash",
    vehicleType: "Sedan",
    subtotal: 260,
    vat: 39,
    total: 299,
    paymentMethod: "Mada",
    status: "Refunded",
    date: "Mar 29, 2026",
    time: "05:15 PM",
  },
]

const invoiceStatusStyles: Record<InvoiceStatus, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Refunded: "bg-red-100 text-red-700",
}

const paymentMethods: PaymentMethod[] = [
  "Apple Pay",
  "Mada",
  "Visa",
  "Mastercard",
  "STC Pay",
  "Tabby",
  "Tamara",
  "Package",
]

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [refundInvoice, setRefundInvoice] = useState<Invoice | null>(null)
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false)

  const statusTabs: StatusFilter[] = ["All", "Paid", "Pending", "Refunded"]

  // Stats
  const stats = {
    totalInvoices: invoices.length,
    totalPaid: invoices
      .filter((inv) => inv.status === "Paid")
      .reduce((sum, inv) => sum + inv.total, 0),
    totalRefunded: invoices
      .filter((inv) => inv.status === "Refunded")
      .reduce((sum, inv) => sum + inv.total, 0),
  }

  // Filtered invoices
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesStatus =
      statusFilter === "All" || invoice.status === statusFilter
    const matchesPaymentMethod =
      paymentMethodFilter === "All" ||
      invoice.paymentMethod === paymentMethodFilter
    const matchesSearch =
      searchQuery === "" ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesPaymentMethod && matchesSearch
  })

  const handleExportCSV = () => {
    const headers = [
      "Invoice ID",
      "Order ID",
      "Date",
      "Customer Name",
      "Customer Phone",
      "Service",
      "Vehicle",
      "Payment Method",
      "Subtotal (SAR)",
      "VAT (SAR)",
      "Total (SAR)",
      "Status",
    ]

    const rows = filteredInvoices.map((invoice) => [
      invoice.id,
      invoice.orderId,
      invoice.date,
      invoice.customerName,
      invoice.customerPhone,
      invoice.service,
      invoice.vehicleType,
      invoice.paymentMethod,
      invoice.subtotal.toFixed(2),
      invoice.vat.toFixed(2),
      invoice.total.toFixed(2),
      invoice.status,
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `invoices_${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const handleExportPDF = () => {
    // For PDF export, we would typically use a library like jsPDF or html2pdf
    // For now, we'll trigger print which allows saving as PDF
    window.print()
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsPanelOpen(true)
  }

  const handleRefundClick = (invoice: Invoice) => {
    setRefundInvoice(invoice)
    setIsRefundDialogOpen(true)
  }

  const handleConfirmRefund = () => {
    if (refundInvoice) {
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === refundInvoice.id
            ? { ...inv, status: "Refunded" as InvoiceStatus }
            : inv
        )
      )
      setIsRefundDialogOpen(false)
      setRefundInvoice(null)
    }
  }

  const handleDownloadPDF = (invoice: Invoice) => {
    console.log("Downloading PDF for:", invoice.id)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="pt-14 lg:ml-60 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                  Invoices
                </h1>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  All your transaction records
                </p>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  onClick={handleExportCSV}
                  className="flex-1 gap-2 sm:flex-none"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span> CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportPDF}
                  className="flex-1 gap-2 sm:flex-none"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span> PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            <KpiCard
              icon="file-text"
              label="Total Invoices"
              value={stats.totalInvoices}
            />
            <KpiCard
              icon="receipt"
              label="Total Paid"
              value={<SARAmount amount={stats.totalPaid} />}
              mobileValue={stats.totalPaid}
            />
            <KpiCard
              icon="rotate-ccw"
              label="Total Refunded"
              value={<SARAmount amount={stats.totalRefunded} />}
              mobileValue={stats.totalRefunded}
            />
          </div>

          {/* Filters */}
          <div className="mb-6 space-y-4">
            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
              {statusTabs.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    statusFilter === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Filter Row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID or customer..."
                  className="pl-10"
                />
              </div>

              {/* Date From */}
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full sm:w-40"
                placeholder="From"
              />

              {/* Date To */}
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full sm:w-40"
                placeholder="To"
              />

              {/* Payment Method */}
              <Select
                value={paymentMethodFilter}
                onValueChange={setPaymentMethodFilter}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Payment Methods</SelectItem>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">Invoice #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">VAT</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow
                      key={invoice.id}
                      className="cursor-pointer hover:bg-accent/50"
                      onClick={() => handleViewInvoice(invoice)}
                    >
                      <TableCell className="pl-6 font-medium text-foreground">
                        {invoice.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-foreground">{invoice.date}</p>
                          <p className="text-xs text-muted-foreground">
                            {invoice.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {invoice.customerName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {invoice.service}
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
                      <TableCell className="pr-6">
                        <div
                          className="flex items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleViewInvoice(invoice)}
                            title="View Invoice"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDownloadPDF(invoice)}
                            title="Download PDF"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          {invoice.status === "Paid" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => handleRefundClick(invoice)}
                              title="Refund"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>

      {/* Invoice Detail Side Panel */}
      {isPanelOpen && selectedInvoice && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsPanelOpen(false)}
          />
          <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-border bg-card shadow-xl">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {selectedInvoice.id}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedInvoice.date} at {selectedInvoice.time}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPanelOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="rounded-xl border border-border p-4">
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {selectedInvoice.customerName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {selectedInvoice.customerPhone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="rounded-xl border border-border p-4">
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                  Service Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium text-foreground">
                      {selectedInvoice.service}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Vehicle Type</span>
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {selectedInvoice.vehicleType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="rounded-xl border border-border p-4">
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                  Payment Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      <SARAmount amount={selectedInvoice.subtotal} />
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">VAT (15%)</span>
                    <span className="text-foreground">
                      <SARAmount amount={selectedInvoice.vat} />
                    </span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="text-lg font-bold text-primary">
                        <SARAmount amount={selectedInvoice.total} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="rounded-xl border border-border p-4">
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                  Payment Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Method</span>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {selectedInvoice.paymentMethod}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      className={cn(
                        "font-medium",
                        invoiceStatusStyles[selectedInvoice.status]
                      )}
                    >
                      {selectedInvoice.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  className="w-full gap-2"
                  onClick={() => handleDownloadPDF(selectedInvoice)}
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => window.print()}
                >
                  <FileText className="h-4 w-4" />
                  Print Invoice
                </Button>
                {selectedInvoice.status === "Paid" && (
                  <Button
                    variant="outline"
                    className="w-full gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => {
                      setIsPanelOpen(false)
                      handleRefundClick(selectedInvoice)
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                    Refund Invoice
                  </Button>
                )}
              </div>
            </div>
          </aside>
        </>
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
            <Button variant="destructive" onClick={handleConfirmRefund}>
              Confirm Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
