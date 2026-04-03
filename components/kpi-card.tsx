"use client"

import { cn } from "@/lib/utils"
import { SARSymbol } from "@/components/sar-symbol"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

interface KpiCardProps {
  icon: LucideIcon
  label: string
  value: string | number | ReactNode
  /** Raw numeric value for mobile display (without SAR symbol) */
  mobileValue?: number
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function KpiCard({ icon: Icon, label, value, mobileValue, trend, className }: KpiCardProps) {
  // Determine if this is a currency card (has mobileValue)
  const isCurrencyCard = mobileValue !== undefined

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md md:p-5",
        className
      )}
    >
      {/* Mobile Layout (below md) - Stacked vertically, centered */}
      <div className="flex flex-col items-center text-center md:hidden">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <p className="mt-1.5 text-[11px] leading-tight text-muted-foreground">{label}</p>
        <p className="mt-1 text-base font-bold leading-tight text-foreground">
          {isCurrencyCard ? (
            <>
              {mobileValue.toLocaleString()}<SARSymbol />
            </>
          ) : (
            value
          )}
        </p>
        {trend && (
          <span
            className={cn(
              "mt-0.5 text-[10px] font-medium",
              trend.isPositive ? "text-green-600" : "text-red-500"
            )}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>

      {/* Desktop Layout (md and above) - Original horizontal */}
      <div className="hidden md:block">
        <div className="flex items-start justify-between gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {trend && (
            <span
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-500"
              )}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}
