"use client"

// Dashboard page for Shiny provider portal
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { KpiCard } from "@/components/kpi-card"
import { OrdersTable } from "@/components/orders-table"
import { SARAmount } from "@/components/sar-symbol"
import {
  ShoppingBag,
  Banknote,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react"

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      {/* Main Content */}
      <main className="pt-14 lg:pl-60 lg:pt-0">
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Welcome back <span className="mx-1">-</span> {today}
            </p>
          </div>

          {/* KPI Cards */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:mb-8 lg:grid-cols-5">
            <KpiCard
              icon={ShoppingBag}
              label="Orders Today"
              value={24}
              trend={{ value: 12, isPositive: true }}
            />
            <KpiCard
              icon={Banknote}
              label="Revenue Today"
              value={<SARAmount amount={8450} />}
              mobileValue={8450}
              trend={{ value: 8, isPositive: true }}
            />
            <KpiCard
              icon={TrendingUp}
              label="Monthly Revenue"
              value={<SARAmount amount={142500} />}
              mobileValue={142500}
              trend={{ value: 15, isPositive: true }}
            />
            <KpiCard
              icon={Users}
              label="Active Crew"
              value={8}
              trend={{ value: 0, isPositive: true }}
            />
            <KpiCard
              icon={Clock}
              label="Pending Orders"
              value={5}
              trend={{ value: 2, isPositive: false }}
            />
          </div>

          {/* Orders Table */}
          <OrdersTable />
        </div>
      </main>
    </div>
  )
}
