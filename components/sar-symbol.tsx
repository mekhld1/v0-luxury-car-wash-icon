"use client"

import { cn } from "@/lib/utils"

interface SARSymbolProps {
  className?: string
}

export function SARSymbol({ className }: SARSymbolProps) {
  return (
    <svg
      viewBox="0 0 1124.14 1256.39"
      className={cn(
        "inline-block h-[0.85em] w-[0.75em] align-middle ml-[3px] fill-current",
        className
      )}
      aria-label="SAR"
    >
      <path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
      <path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.45-95.67,66.32-132.25,110.99v608.07l-358.29,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l396.69-84.29v361.75c47.06-27.02,89.49-62.02,125.04-103.25l7.21-8.5v-378.36l132.25-28.11v452.03c47.06-27.02,89.49-62.02,125.04-103.25l7.21-8.5v-452.95l330.68-70.33v-19.01Z" />
    </svg>
  )
}

interface SARAmountProps {
  amount: number | string
  className?: string
  symbolClassName?: string
}

export function SARAmount({ amount, className, symbolClassName }: SARAmountProps) {
  const formattedAmount = typeof amount === "number" ? amount.toLocaleString() : amount
  return (
    <span className={className}>
      {formattedAmount}
      <SARSymbol className={symbolClassName} />
    </span>
  )
}
