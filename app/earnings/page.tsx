"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { KpiCard } from "@/components/kpi-card"
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
  Receipt,
  CheckCircle2,
  TrendingUp,
  Download,
  FileText,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

type PeriodFilter = "today" | "week" | "month" | "quarter" | "year" | "custom"
type SubTab = "overview" | "services" | "crew" | "transactions"
type TransactionStatus = "Completed" | "Pending" | "Refunded"

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

interface Transaction {
  id: string
  orderId: string
  customerName: string
  service: string
  amount: number
  paymentMethod: "Cash" | "Card" | "Apple Pay"
  status: TransactionStatus
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

const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    orderId: "ORD-001",
    customerName: "Ahmed Al-Rashid",
    service: "Premium Wash",
    amount: 299,
    paymentMethod: "Card",
    status: "Completed",
    date: "Apr 1, 2026",
    time: "10:30 AM",
  },
  {
    id: "TXN-002",
    orderId: "ORD-002",
    customerName: "Mohammed Hassan",
    service: "Full Detail",
    amount: 699,
    paymentMethod: "Apple Pay",
    status: "Completed",
    date: "Apr 1, 2026",
    time: "09:45 AM",
  },
  {
    id: "TXN-003",
    orderId: "ORD-003",
    customerName: "Khalid Ibrahim",
    service: "Interior Cleaning",
    amount: 225,
    paymentMethod: "Cash",
    status: "Pending",
    date: "Apr 1, 2026",
    time: "09:15 AM",
  },
  {
    id: "TXN-004",
    orderId: "ORD-004",
    customerName: "Fahad Al-Mutairi",
    service: "Express Wash",
    amount: 100,
    paymentMethod: "Card",
    status: "Completed",
    date: "Mar 31, 2026",
    time: "04:30 PM",
  },
  {
    id: "TXN-005",
    orderId: "ORD-005",
    customerName: "Sultan Al-Dosari",
    service: "Ceramic Coating",
    amount: 1299,
    paymentMethod: "Card",
    status: "Completed",
    date: "Mar 31, 2026",
    time: "02:00 PM",
  },
  {
    id: "TXN-006",
    orderId: "ORD-006",
    customerName: "Nasser Al-Qahtani",
    service: "Premium Wash",
    amount: 349,
    paymentMethod: "Cash",
    status: "Refunded",
    date: "Mar 31, 2026",
    time: "11:00 AM",
  },
  {
    id: "TXN-007",
    orderId: "ORD-007",
    customerName: "Turki Al-Shehri",
    service: "Full Detail",
    amount: 699,
    paymentMethod: "Apple Pay",
    status: "Completed",
    date: "Mar 30, 2026",
    time: "03:45 PM",
  },
  {
    id: "TXN-008",
    orderId: "ORD-008",
    customerName: "Abdullah Al-Ghamdi",
    service: "Interior Cleaning",
    amount: 225,
    paymentMethod: "Card",
    status: "Completed",
    date: "Mar 30, 2026",
    time: "01:20 PM",
  },
]

const transactionStatusStyles: Record<TransactionStatus, string> = {
  Completed: "bg-green-100 text-green-700",
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

  const subTabs: { key: SubTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "services", label: "Services" },
    { key: "crew", label: "Crew" },
    { key: "transactions", label: "Transactions" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-60 p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Earnings</h1>
            <p className="mt-1 text-muted-foreground">Your revenue overview</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportCSV} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={handleExportPDF} className="gap-2">
              <FileText className="h-4 w-4" />
              Export PDF
            </Button>
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
          <div className="mb-4 flex items-center gap-4 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm text-muted-foreground">From</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-40"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">To</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-40"
              />
            </div>
            <Button size="sm">Apply</Button>
          </div>
        )}

        {/* Filter Dropdowns */}
        <div className="mb-6 flex gap-4">
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-48">
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
            <SelectTrigger className="w-48">
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
        <div className="mb-8 grid grid-cols-4 gap-4">
          <Card className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    SAR {stats.totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <KpiCard
            icon={Receipt}
            label="VAT Collected"
            value={`SAR ${stats.vatCollected.toLocaleString()}`}
          />
          <KpiCard
            icon={CheckCircle2}
            label="Completed Orders"
            value={stats.completedOrders}
          />
          <KpiCard
            icon={TrendingUp}
            label="Avg. Order Value"
            value={`SAR ${stats.avgOrderValue}`}
          />
        </div>

        {/* Sub Tabs */}
        <div className="mb-6 flex gap-2 border-b border-border pb-4">
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
                <Table>
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
                          SAR {service.revenue.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Crew */}
            <Card className="rounded-2xl border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">Top Crew</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Table>
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
                          SAR {crew.revenue.toLocaleString()}
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
              <Table>
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
                        SAR {service.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        SAR {Math.round(service.revenue / service.orders)}
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
              <Table>
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
                        SAR {crew.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        SAR {Math.round(crew.revenue / crew.orders)}
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
            </CardContent>
          </Card>
        )}

        {activeTab === "transactions" && (
          <Card className="rounded-2xl border border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-medium text-foreground">
                        {txn.id}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {txn.orderId}
                      </TableCell>
                      <TableCell className="font-medium">
                        {txn.customerName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {txn.service}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {txn.paymentMethod}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        SAR {txn.amount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "font-medium",
                            transactionStatusStyles[txn.status],
                            `hover:${transactionStatusStyles[txn.status]}`
                          )}
                        >
                          {txn.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-foreground">{txn.date}</p>
                          <p className="text-xs text-muted-foreground">
                            {txn.time}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
