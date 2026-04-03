import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface KpiCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function KpiCard({ icon: Icon, label, value, trend, className }: KpiCardProps) {
  return (
    <div
      className={cn(
        "min-h-0 rounded-2xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4 md:p-5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent sm:h-10 sm:w-10 sm:rounded-xl">
          <Icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-[10px] font-medium sm:text-xs",
              trend.isPositive ? "text-green-600" : "text-red-500"
            )}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>
      <div className="mt-2 min-w-0 sm:mt-3 md:mt-4">
        <p className="truncate text-base font-bold text-foreground sm:text-lg md:text-xl lg:text-2xl">{value}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground sm:mt-1 sm:text-sm">{label}</p>
      </div>
    </div>
  )
}
