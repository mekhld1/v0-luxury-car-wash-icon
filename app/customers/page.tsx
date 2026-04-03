"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { KpiCard } from "@/components/kpi-card"
import { CustomerDetailPanel } from "@/components/customer-detail-panel"
import { SARAmount } from "@/components/sar-symbol"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  UsersRound,
  Package,
  ShoppingCart,
  Wallet,
  Download,
  Search,
  Eye,
} from "lucide-react"

interface CustomerOrder {
  id: string
  service: string
  date: string
  amount: number
  status: "Completed" | "Cancelled"
}

interface CustomerPackage {
  name: string
  sessionsRemaining: number
  totalSessions: number
  expiryDate: string
}

interface Customer {
  id: string
  name: string
  phone: string
  memberSince: string
  totalOrders: number
  lastOrderDate: string
  totalSpent: number
  activePackages: CustomerPackage[]
  lastOrders: CustomerOrder[]
  isVip: boolean
}

type FilterTab = "All" | "Has Active Package" | "VIP"

const filterTabs: FilterTab[] = ["All", "Has Active Package", "VIP"]

const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "Ahmed Al-Rashid",
    phone: "+966 55 *** 4567",
    memberSince: "Jan 15, 2024",
    totalOrders: 12,
    lastOrderDate: "Apr 1, 2026",
    totalSpent: 4850,
    activePackages: [
      {
        name: "Premium Monthly",
        sessionsRemaining: 3,
        totalSessions: 8,
        expiryDate: "Apr 30, 2026",
      },
    ],
    lastOrders: [
      { id: "ORD-001", service: "Premium Wash", date: "Apr 1, 2026", amount: 299, status: "Completed" },
      { id: "ORD-002", service: "Interior Cleaning", date: "Mar 25, 2026", amount: 199, status: "Completed" },
      { id: "ORD-003", service: "Express Wash", date: "Mar 18, 2026", amount: 99, status: "Completed" },
      { id: "ORD-004", service: "Full Detail", date: "Mar 10, 2026", amount: 599, status: "Completed" },
      { id: "ORD-005", service: "Premium Wash", date: "Mar 1, 2026", amount: 299, status: "Cancelled" },
    ],
    isVip: true,
  },
  {
    id: "CUST-002",
    name: "Mohammed Hassan",
    phone: "+966 50 *** 8901",
    memberSince: "Mar 22, 2024",
    totalOrders: 8,
    lastOrderDate: "Mar 30, 2026",
    totalSpent: 3200,
    activePackages: [
      {
        name: "Basic Package",
        sessionsRemaining: 5,
        totalSessions: 10,
        expiryDate: "May 15, 2026",
      },
    ],
    lastOrders: [
      { id: "ORD-010", service: "Express Wash", date: "Mar 30, 2026", amount: 99, status: "Completed" },
      { id: "ORD-011", service: "Express Wash", date: "Mar 22, 2026", amount: 99, status: "Completed" },
      { id: "ORD-012", service: "Interior Cleaning", date: "Mar 15, 2026", amount: 199, status: "Completed" },
      { id: "ORD-013", service: "Express Wash", date: "Mar 8, 2026", amount: 99, status: "Completed" },
      { id: "ORD-014", service: "Premium Wash", date: "Feb 28, 2026", amount: 299, status: "Completed" },
    ],
    isVip: true,
  },
  {
    id: "CUST-003",
    name: "Khalid Ibrahim",
    phone: "+966 54 *** 2345",
    memberSince: "Jun 10, 2024",
    totalOrders: 5,
    lastOrderDate: "Mar 28, 2026",
    totalSpent: 1450,
    activePackages: [],
    lastOrders: [
      { id: "ORD-020", service: "Full Detail", date: "Mar 28, 2026", amount: 599, status: "Completed" },
      { id: "ORD-021", service: "Express Wash", date: "Mar 10, 2026", amount: 99, status: "Completed" },
      { id: "ORD-022", service: "Premium Wash", date: "Feb 20, 2026", amount: 299, status: "Completed" },
      { id: "ORD-023", service: "Interior Cleaning", date: "Feb 5, 2026", amount: 199, status: "Completed" },
      { id: "ORD-024", service: "Express Wash", date: "Jan 15, 2026", amount: 99, status: "Cancelled" },
    ],
    isVip: true,
  },
  {
    id: "CUST-004",
    name: "Fahad Al-Mutairi",
    phone: "+966 55 *** 6789",
    memberSince: "Aug 5, 2024",
    totalOrders: 3,
    lastOrderDate: "Mar 25, 2026",
    totalSpent: 850,
    activePackages: [
      {
        name: "Premium Monthly",
        sessionsRemaining: 7,
        totalSessions: 8,
        expiryDate: "Apr 25, 2026",
      },
    ],
    lastOrders: [
      { id: "ORD-030", service: "Premium Wash", date: "Mar 25, 2026", amount: 299, status: "Completed" },
      { id: "ORD-031", service: "Express Wash", date: "Mar 15, 2026", amount: 99, status: "Completed" },
      { id: "ORD-032", service: "Interior Cleaning", date: "Mar 5, 2026", amount: 199, status: "Completed" },
    ],
    isVip: false,
  },
  {
    id: "CUST-005",
    name: "Sultan Al-Dosari",
    phone: "+966 50 *** 1234",
    memberSince: "Sep 20, 2024",
    totalOrders: 6,
    lastOrderDate: "Mar 31, 2026",
    totalSpent: 2950,
    activePackages: [],
    lastOrders: [
      { id: "ORD-040", service: "Ceramic Coating", date: "Mar 31, 2026", amount: 1299, status: "Completed" },
      { id: "ORD-041", service: "Full Detail", date: "Mar 1, 2026", amount: 599, status: "Completed" },
      { id: "ORD-042", service: "Premium Wash", date: "Feb 15, 2026", amount: 299, status: "Completed" },
      { id: "ORD-043", service: "Interior Cleaning", date: "Feb 1, 2026", amount: 199, status: "Completed" },
      { id: "ORD-044", service: "Express Wash", date: "Jan 20, 2026", amount: 99, status: "Completed" },
    ],
    isVip: true,
  },
  {
    id: "CUST-006",
    name: "Nasser Al-Qahtani",
    phone: "+966 55 *** 4321",
    memberSince: "Nov 1, 2024",
    totalOrders: 2,
    lastOrderDate: "Mar 20, 2026",
    totalSpent: 550,
    activePackages: [],
    lastOrders: [
      { id: "ORD-050", service: "Premium Wash", date: "Mar 20, 2026", amount: 299, status: "Completed" },
      { id: "ORD-051", service: "Express Wash", date: "Feb 28, 2026", amount: 99, status: "Completed" },
    ],
    isVip: false,
  },
  {
    id: "CUST-007",
    name: "Saud Al-Faisal",
    phone: "+966 56 *** 7890",
    memberSince: "Dec 15, 2024",
    totalOrders: 4,
    lastOrderDate: "Mar 29, 2026",
    totalSpent: 1800,
    activePackages: [
      {
        name: "VIP Unlimited",
        sessionsRemaining: 12,
        totalSessions: 20,
        expiryDate: "Jun 15, 2026",
      },
    ],
    lastOrders: [
      { id: "ORD-060", service: "Full Detail", date: "Mar 29, 2026", amount: 599, status: "Completed" },
      { id: "ORD-061", service: "Premium Wash", date: "Mar 15, 2026", amount: 299, status: "Completed" },
      { id: "ORD-062", service: "Interior Cleaning", date: "Mar 1, 2026", amount: 199, status: "Completed" },
      { id: "ORD-063", service: "Express Wash", date: "Feb 15, 2026", amount: 99, status: "Completed" },
    ],
    isVip: false,
  },
]

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(mockCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<FilterTab>("All")
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    // Search filter
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)

    // Tab filter
    let matchesTab = true
    if (activeTab === "Has Active Package") {
      matchesTab = customer.activePackages.length > 0
    } else if (activeTab === "VIP") {
      matchesTab = customer.isVip
    }

    return matchesSearch && matchesTab
  })

  // Calculate stats
  const stats = {
    totalCustomers: customers.length,
    activePackages: customers.reduce((acc, c) => acc + c.activePackages.length, 0),
    avgOrders: Math.round(
      customers.reduce((acc, c) => acc + c.totalOrders, 0) / customers.length
    ),
    totalRevenue: customers.reduce((acc, c) => acc + c.totalSpent, 0),
  }

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsPanelOpen(true)
  }

  const handleExportCSV = () => {
    console.log("Exporting customers to CSV...")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="pt-14 lg:ml-60 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Customers</h1>
            <p className="mt-1 text-muted-foreground">
              View and manage your customer base
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customers..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={handleExportCSV} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <KpiCard
            icon={UsersRound}
            label="Total Customers"
            value={stats.totalCustomers}
          />
          <KpiCard
            icon={Package}
            label="Active Packages"
            value={stats.activePackages}
          />
          <KpiCard
            icon={ShoppingCart}
            label="Avg Orders"
            value={stats.avgOrders}
          />
          <KpiCard
            icon={Wallet}
            label="Total Revenue"
            value={<SARAmount amount={stats.totalRevenue} />}
          />
        </div>

        {/* Filter Tabs & Table */}
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          {/* Filter Tabs */}
          <div className="flex gap-2 border-b border-border px-6 py-4">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Active Package</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="transition-colors hover:bg-accent/50"
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {customer.name}
                        </span>
                        {customer.isVip && (
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                            VIP
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {customer.totalOrders}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {customer.lastOrderDate}
                    </TableCell>
                    <TableCell>
                      {customer.activePackages.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {customer.activePackages.map((pkg, index) => (
                            <Badge
                              key={index}
                              className="w-fit bg-primary/10 text-primary hover:bg-primary/10"
                            >
                              {pkg.sessionsRemaining} sessions left
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      <SARAmount amount={customer.totalSpent} />
                    </TableCell>
                    <TableCell className="pr-6">
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewCustomer(customer)}
                          className="gap-1.5"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <p className="text-muted-foreground">No customers found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
            </div>
          </div>
        </div>
      </main>

      {/* Customer Detail Panel */}
      <CustomerDetailPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        customer={selectedCustomer}
      />
    </div>
  )
}
