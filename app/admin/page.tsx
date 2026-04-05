"use client"

import { useState } from "react"
import { KpiCard } from "@/components/kpi-card"
import { SARAmount } from "@/components/sar-symbol"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  ArrowRight,
  UserCheck,
  UserX,
  ShieldCheck,
  Store,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

// Mock data for revenue chart
const dailyRevenueData = [
  { date: "Mar 1", revenue: 12500, commission: 1875 },
  { date: "Mar 2", revenue: 15200, commission: 2280 },
  { date: "Mar 3", revenue: 11800, commission: 1770 },
  { date: "Mar 4", revenue: 18900, commission: 2835 },
  { date: "Mar 5", revenue: 22100, commission: 3315 },
  { date: "Mar 6", revenue: 19500, commission: 2925 },
  { date: "Mar 7", revenue: 24800, commission: 3720 },
]

const weeklyRevenueData = [
  { date: "Week 1", revenue: 85000, commission: 12750 },
  { date: "Week 2", revenue: 92000, commission: 13800 },
  { date: "Week 3", revenue: 78000, commission: 11700 },
  { date: "Week 4", revenue: 105000, commission: 15750 },
]

const monthlyRevenueData = [
  { date: "Oct", revenue: 320000, commission: 48000 },
  { date: "Nov", revenue: 380000, commission: 57000 },
  { date: "Dec", revenue: 420000, commission: 63000 },
  { date: "Jan", revenue: 390000, commission: 58500 },
  { date: "Feb", revenue: 450000, commission: 67500 },
  { date: "Mar", revenue: 520000, commission: 78000 },
]

// Mock data for top brands
const topBrands = [
  {
    rank: 1,
    name: "SparkleWash",
    orders: 1245,
    revenue: 186750,
    commission: 28012,
  },
  {
    rank: 2,
    name: "AutoShine Pro",
    orders: 1089,
    revenue: 163350,
    commission: 24502,
  },
  {
    rank: 3,
    name: "Crystal Clean",
    orders: 956,
    revenue: 143400,
    commission: 21510,
  },
  {
    rank: 4,
    name: "Gleam Express",
    orders: 823,
    revenue: 123450,
    commission: 18517,
  },
  {
    rank: 5,
    name: "WashMasters",
    orders: 712,
    revenue: 106800,
    commission: 16020,
  },
]

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    type: "provider_approved",
    message: "Provider 'CleanDrive Riyadh' was approved",
    timestamp: "2 minutes ago",
    icon: ShieldCheck,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    id: 2,
    type: "user_banned",
    message: "User 'ahmed.xyz' was banned for policy violation",
    timestamp: "15 minutes ago",
    icon: UserX,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
  },
  {
    id: 3,
    type: "provider_onboarded",
    message: "New provider 'Premium Auto Spa' registered",
    timestamp: "1 hour ago",
    icon: Store,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    id: 4,
    type: "provider_approved",
    message: "Provider 'QuickWash Jeddah' was approved",
    timestamp: "2 hours ago",
    icon: ShieldCheck,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    id: 5,
    type: "user_verified",
    message: "User 'mohammad.saleh' identity verified",
    timestamp: "3 hours ago",
    icon: UserCheck,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
]

type ChartPeriod = "daily" | "weekly" | "monthly"

export default function AdminOverviewPage() {
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("daily")

  const chartData = {
    daily: dailyRevenueData,
    weekly: weeklyRevenueData,
    monthly: monthlyRevenueData,
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const pendingApprovals = 7

  return (
    <main className="min-h-screen pt-14 lg:ml-60 lg:pt-0">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-[#1C1C2E] sm:text-2xl">
                Platform Overview
              </h1>
              <Badge className="bg-[#7C3AED] text-white hover:bg-[#7C3AED]">
                Super Admin
              </Badge>
            </div>
            <p className="mt-1 text-sm text-[#6B6B80]">{today}</p>
          </div>
        </div>

        {/* Pending Approvals Banner */}
        {pendingApprovals > 0 && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-yellow-800">
                  {pendingApprovals} providers waiting for approval
                </p>
                <p className="text-sm text-yellow-600">
                  Review and approve new provider applications
                </p>
              </div>
            </div>
            <Button className="w-full gap-2 bg-yellow-600 hover:bg-yellow-700 sm:w-auto">
              Review Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* KPI Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          <KpiCard
            icon="trending-up"
            label="Total Revenue"
            value={<SARAmount amount={1842500} />}
            mobileValue={1842500}
            trend={{ value: 12, isPositive: true }}
          />
          <KpiCard
            icon="dollar-sign"
            label="Shiny Commission"
            value={<SARAmount amount={276375} />}
            mobileValue={276375}
            trend={{ value: 15, isPositive: true }}
          />
          <KpiCard
            icon="shopping-cart"
            label="Orders Today"
            value={847}
            trend={{ value: 8, isPositive: true }}
          />
          <KpiCard
            icon="store"
            label="Active Providers"
            value={156}
            trend={{ value: 5, isPositive: true }}
          />
          <KpiCard
            icon="building"
            label="Active Brands"
            value={42}
            trend={{ value: 2, isPositive: true }}
          />
          <KpiCard
            icon="clock"
            label="Pending Approvals"
            value={pendingApprovals}
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        {/* Revenue Chart */}
        <Card className="mb-6 rounded-2xl border-[#EDE9FE] shadow-[0_2px_12px_rgba(124,58,237,0.08)]">
          <CardHeader className="flex flex-col gap-4 border-b border-[#EDE9FE] pb-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg font-semibold text-[#1C1C2E]">
              Revenue Overview
            </CardTitle>
            <div className="flex gap-2">
              {(["daily", "weekly", "monthly"] as ChartPeriod[]).map(
                (period) => (
                  <Button
                    key={period}
                    variant={chartPeriod === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartPeriod(period)}
                    className={cn(
                      "capitalize",
                      chartPeriod === period
                        ? "bg-[#7C3AED] hover:bg-[#6D28D9]"
                        : "border-[#EDE9FE] text-[#6B6B80] hover:bg-[#EDE9FE]"
                    )}
                  >
                    {period}
                  </Button>
                )
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData[chartPeriod]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EDE9FE" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6B6B80", fontSize: 12 }}
                    axisLine={{ stroke: "#EDE9FE" }}
                  />
                  <YAxis
                    tick={{ fill: "#6B6B80", fontSize: 12 }}
                    axisLine={{ stroke: "#EDE9FE" }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1C1C2E",
                      border: "none",
                      borderRadius: "12px",
                      color: "white",
                    }}
                    formatter={(value: number, name: string) => [
                      `${value.toLocaleString()} SAR`,
                      name === "revenue" ? "Total Revenue" : "Commission",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#7C3AED"
                    strokeWidth={2}
                    dot={{ fill: "#7C3AED", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "#7C3AED" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="commission"
                    stroke="#A78BFA"
                    strokeWidth={2}
                    dot={{ fill: "#A78BFA", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "#A78BFA" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#7C3AED]" />
                <span className="text-sm text-[#6B6B80]">Total Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#A78BFA]" />
                <span className="text-sm text-[#6B6B80]">Commission</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top 5 Brands */}
          <Card className="rounded-2xl border-[#EDE9FE] shadow-[0_2px_12px_rgba(124,58,237,0.08)]">
            <CardHeader className="border-b border-[#EDE9FE] pb-4">
              <CardTitle className="text-lg font-semibold text-[#1C1C2E]">
                Top 5 Brands
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[#6B6B80]">#</TableHead>
                      <TableHead className="text-[#6B6B80]">Brand</TableHead>
                      <TableHead className="text-right text-[#6B6B80]">
                        Orders
                      </TableHead>
                      <TableHead className="text-right text-[#6B6B80]">
                        Revenue
                      </TableHead>
                      <TableHead className="text-right text-[#6B6B80]">
                        Commission
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topBrands.map((brand) => (
                      <TableRow
                        key={brand.rank}
                        className="hover:bg-[#FAFAFF]"
                      >
                        <TableCell>
                          <div
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                              brand.rank === 1
                                ? "bg-yellow-100 text-yellow-700"
                                : brand.rank === 2
                                  ? "bg-gray-100 text-gray-700"
                                  : brand.rank === 3
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-[#EDE9FE] text-[#7C3AED]"
                            )}
                          >
                            {brand.rank}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-[#1C1C2E]">
                          {brand.name}
                        </TableCell>
                        <TableCell className="text-right text-[#6B6B80]">
                          {brand.orders.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-medium text-[#1C1C2E]">
                          <SARAmount amount={brand.revenue} />
                        </TableCell>
                        <TableCell className="text-right text-[#7C3AED]">
                          <SARAmount amount={brand.commission} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="rounded-2xl border-[#EDE9FE] shadow-[0_2px_12px_rgba(124,58,237,0.08)]">
            <CardHeader className="border-b border-[#EDE9FE] pb-4">
              <CardTitle className="text-lg font-semibold text-[#1C1C2E]">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-[#EDE9FE]">
                {recentActivity.map((activity) => (
                  <li
                    key={activity.id}
                    className="flex items-start gap-3 p-4 transition-colors hover:bg-[#FAFAFF]"
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        activity.iconBg
                      )}
                    >
                      <activity.icon
                        className={cn("h-4 w-4", activity.iconColor)}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#1C1C2E]">
                        {activity.message}
                      </p>
                      <p className="mt-0.5 text-xs text-[#6B6B80]">
                        {activity.timestamp}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
