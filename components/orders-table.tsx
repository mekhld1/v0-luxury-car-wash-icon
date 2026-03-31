import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type OrderStatus = "Pending" | "Active" | "Completed" | "Cancelled"

interface Order {
  id: string
  service: string
  vehicle: string
  status: OrderStatus
  amount: number
  date: string
}

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Active: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
}

const orders: Order[] = [
  {
    id: "ORD-001",
    service: "Premium Wash",
    vehicle: "Mercedes S-Class",
    status: "Completed",
    amount: 299,
    date: "Mar 31, 2026",
  },
  {
    id: "ORD-002",
    service: "Interior Detail",
    vehicle: "BMW X7",
    status: "Active",
    amount: 449,
    date: "Mar 31, 2026",
  },
  {
    id: "ORD-003",
    service: "Full Detail",
    vehicle: "Range Rover",
    status: "Pending",
    amount: 699,
    date: "Mar 31, 2026",
  },
  {
    id: "ORD-004",
    service: "Express Wash",
    vehicle: "Toyota Land Cruiser",
    status: "Completed",
    amount: 149,
    date: "Mar 30, 2026",
  },
  {
    id: "ORD-005",
    service: "Ceramic Coating",
    vehicle: "Porsche Cayenne",
    status: "Cancelled",
    amount: 1299,
    date: "Mar 30, 2026",
  },
  {
    id: "ORD-006",
    service: "Premium Wash",
    vehicle: "Lexus LX",
    status: "Completed",
    amount: 299,
    date: "Mar 30, 2026",
  },
]

export function OrdersTable() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-6">Order ID</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="pr-6">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="cursor-pointer transition-colors hover:bg-accent/50"
            >
              <TableCell className="pl-6 font-medium text-foreground">
                {order.id}
              </TableCell>
              <TableCell>{order.service}</TableCell>
              <TableCell>{order.vehicle}</TableCell>
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
              <TableCell className="font-medium">SAR {order.amount}</TableCell>
              <TableCell className="pr-6 text-muted-foreground">
                {order.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
