"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { KpiCard } from "@/components/kpi-card"
import { PendingOrderCard } from "@/components/pending-order-card"
import { AssignOrderModal } from "@/components/assign-order-modal"
import { OrderDetailModal } from "@/components/order-detail-modal"
import { SARAmount } from "@/components/sar-symbol"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  ClipboardList,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Download,
  Eye,
  UserPlus,
} from "lucide-react"

type OrderStatus =
  | "Pending"
  | "Accepted"
  | "In Progress"
  | "Completed"
  | "Cancelled"

interface Order {
  id: string
  service: string
  vehicleType: string
  vehiclePlate: string
  amount: number
  status: OrderStatus
  customerName: string
  customerPhone: string
  location: string
  crewName?: string
  paymentMethod: "Cash" | "Card" | "Apple Pay"
  date: string
  timeAgo?: string
  subtotal: number
  vat: number
  total: number
  createdAt: string
  acceptedAt?: string
  startedAt?: string
  completedAt?: string
  cancelledAt?: string
  cancellationReason?: string
}

interface CrewMember {
  id: string
  name: string
  vehicle: string
  available: boolean
}

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-blue-100 text-blue-700",
  "In Progress": "bg-purple-100 text-purple-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
}

const statusTabs: Array<OrderStatus | "All"> = [
  "All",
  "Pending",
  "Accepted",
  "In Progress",
  "Completed",
  "Cancelled",
]

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    service: "Premium Wash",
    vehicleType: "Sedan",
    vehiclePlate: "ABC 1234",
    amount: 299,
    status: "Pending",
    customerName: "Ahmed Al-Rashid",
    customerPhone: "+966 55 *** 4567",
    location: "King Fahd Road, Riyadh",
    paymentMethod: "Card",
    date: "Apr 1, 2026",
    timeAgo: "5 mins ago",
    subtotal: 260,
    vat: 39,
    total: 299,
    createdAt: "Apr 1, 2026 - 10:30 AM",
  },
  {
    id: "ORD-002",
    service: "Full Detail",
    vehicleType: "SUV",
    vehiclePlate: "XYZ 5678",
    amount: 699,
    status: "Pending",
    customerName: "Mohammed Hassan",
    customerPhone: "+966 50 *** 8901",
    location: "Olaya Street, Riyadh",
    paymentMethod: "Apple Pay",
    date: "Apr 1, 2026",
    timeAgo: "12 mins ago",
    subtotal: 608,
    vat: 91,
    total: 699,
    createdAt: "Apr 1, 2026 - 10:23 AM",
  },
  {
    id: "ORD-003",
    service: "Interior Cleaning",
    vehicleType: "Luxury",
    vehiclePlate: "LUX 9999",
    amount: 449,
    status: "Accepted",
    customerName: "Khalid Ibrahim",
    customerPhone: "+966 54 *** 2345",
    location: "Al Nakheel, Riyadh",
    crewName: "Omar Said",
    paymentMethod: "Cash",
    date: "Apr 1, 2026",
    subtotal: 390,
    vat: 59,
    total: 449,
    createdAt: "Apr 1, 2026 - 09:45 AM",
    acceptedAt: "Apr 1, 2026 - 09:50 AM",
  },
  {
    id: "ORD-004",
    service: "Express Wash",
    vehicleType: "Sedan",
    vehiclePlate: "DEF 4567",
    amount: 149,
    status: "In Progress",
    customerName: "Fahad Al-Mutairi",
    customerPhone: "+966 55 *** 6789",
    location: "Tahlia Street, Riyadh",
    crewName: "Ali Hassan",
    paymentMethod: "Card",
    date: "Apr 1, 2026",
    subtotal: 130,
    vat: 19,
    total: 149,
    createdAt: "Apr 1, 2026 - 09:00 AM",
    acceptedAt: "Apr 1, 2026 - 09:05 AM",
    startedAt: "Apr 1, 2026 - 09:30 AM",
  },
  {
    id: "ORD-005",
    service: "Ceramic Coating",
    vehicleType: "Luxury",
    vehiclePlate: "VIP 1111",
    amount: 1299,
    status: "Completed",
    customerName: "Sultan Al-Dosari",
    customerPhone: "+966 50 *** 1234",
    location: "Al Malqa, Riyadh",
    crewName: "Yousef Ahmed",
    paymentMethod: "Card",
    date: "Mar 31, 2026",
    subtotal: 1130,
    vat: 169,
    total: 1299,
    createdAt: "Mar 31, 2026 - 02:00 PM",
    acceptedAt: "Mar 31, 2026 - 02:10 PM",
    startedAt: "Mar 31, 2026 - 02:45 PM",
    completedAt: "Mar 31, 2026 - 05:30 PM",
  },
  {
    id: "ORD-006",
    service: "Premium Wash",
    vehicleType: "SUV",
    vehiclePlate: "GHI 7890",
    amount: 349,
    status: "Cancelled",
    customerName: "Nasser Al-Qahtani",
    customerPhone: "+966 55 *** 4321",
    location: "Exit 15, Riyadh",
    paymentMethod: "Cash",
    date: "Mar 31, 2026",
    subtotal: 304,
    vat: 45,
    total: 349,
    createdAt: "Mar 31, 2026 - 11:00 AM",
    cancelledAt: "Mar 31, 2026 - 11:30 AM",
    cancellationReason: "Customer requested cancellation - No longer needed",
  },
]

const mockCrew: CrewMember[] = [
  { id: "crew-1", name: "Omar Said", vehicle: "Toyota Hiace - White", available: true },
  { id: "crew-2", name: "Ali Hassan", vehicle: "Nissan Urvan - Silver", available: false },
  { id: "crew-3", name: "Yousef Ahmed", vehicle: "Toyota Hiace - White", available: true },
  { id: "crew-4", name: "Saeed Mohammed", vehicle: "Ford Transit - Blue", available: true },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [activeTab, setActiveTab] = useState<OrderStatus | "All">("All")
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const pendingOrders = orders.filter((o) => o.status === "Pending")
  const filteredOrders =
    activeTab === "All" ? orders : orders.filter((o) => o.status === activeTab)

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    active: orders.filter((o) => o.status === "In Progress" || o.status === "Accepted").length,
    completed: orders.filter((o) => o.status === "Completed").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
  }

  const handleAcceptAssign = (order: Order) => {
    setSelectedOrder(order)
    setIsAssignModalOpen(true)
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailModalOpen(true)
  }

  const handleConfirmAssignment = (crewId: string, eta: number) => {
    const crew = mockCrew.find((c) => c.id === crewId)
    if (selectedOrder && crew) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id
            ? {
                ...o,
                status: "Accepted" as OrderStatus,
                crewName: crew.name,
                acceptedAt: new Date().toLocaleString(),
              }
            : o
        )
      )
    }
  }

  const handleExportCSV = () => {
    // Export functionality placeholder
    console.log("Exporting orders to CSV...")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="pt-14 lg:ml-60 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Orders</h1>
            <p className="mt-1 text-muted-foreground">
              Manage and assign incoming orders
            </p>
          </div>
          <Button variant="outline" onClick={handleExportCSV} className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Stats Row */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:mb-8 lg:grid-cols-5">
          <KpiCard icon={ClipboardList} label="Total Orders" value={stats.total} />
          <KpiCard icon={Clock} label="Pending" value={stats.pending} />
          <KpiCard icon={Truck} label="Active" value={stats.active} />
          <KpiCard icon={CheckCircle2} label="Completed" value={stats.completed} />
          <KpiCard icon={XCircle} label="Cancelled" value={stats.cancelled} />
        </div>

        {/* New Orders Section */}
        {pendingOrders.length > 0 && (
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-500" />
              </span>
              <h2 className="text-lg font-semibold text-foreground">
                New Orders Waiting ({pendingOrders.length})
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingOrders.map((order) => (
                <PendingOrderCard
                  key={order.id}
                  order={{
                    id: order.id,
                    service: order.service,
                    vehicleType: order.vehicleType,
                    amount: order.amount,
                    customerName: order.customerName,
                    customerPhone: order.customerPhone,
                    location: order.location,
                    timeAgo: order.timeAgo || "",
                  }}
                  onViewDetails={() => handleViewDetails(order)}
                  onAcceptAssign={() => handleAcceptAssign(order)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Orders Table */}
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          {/* Status Filter Tabs */}
          <div className="flex gap-2 border-b border-border px-6 py-4">
            {statusTabs.map((tab) => (
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
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Crew</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="transition-colors hover:bg-accent/50">
                  <TableCell className="pl-6 font-medium text-foreground">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-foreground">{order.service}</p>
                      <p className="text-xs text-muted-foreground">{order.vehicleType}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.crewName || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    <SARAmount amount={order.amount} />
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                        statusStyles[order.status]
                      )}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  <TableCell className="pr-6">
                    <div className="flex justify-end gap-2">
                      {order.status === "Pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAcceptAssign(order)}
                          className="gap-1.5"
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          Assign
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewDetails(order)}
                        className="gap-1.5"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
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

      {/* Modals */}
      <AssignOrderModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        order={
          selectedOrder
            ? {
                id: selectedOrder.id,
                service: selectedOrder.service,
                vehicleType: selectedOrder.vehicleType,
                amount: selectedOrder.amount,
                customerName: selectedOrder.customerName,
              }
            : null
        }
        crewMembers={mockCrew}
        onConfirm={handleConfirmAssignment}
      />

      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  )
}
