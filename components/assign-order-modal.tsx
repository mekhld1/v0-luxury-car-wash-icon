"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Car, User, CheckCircle2 } from "lucide-react"

interface CrewMember {
  id: string
  name: string
  vehicle: string
  available: boolean
}

interface Order {
  id: string
  service: string
  vehicleType: string
  amount: number
  customerName: string
}

interface AssignOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
  crewMembers: CrewMember[]
  onConfirm: (crewId: string, eta: number) => void
}

const etaOptions = [15, 30, 45, 60]

export function AssignOrderModal({
  isOpen,
  onClose,
  order,
  crewMembers,
  onConfirm,
}: AssignOrderModalProps) {
  const [selectedCrew, setSelectedCrew] = useState<string | null>(null)
  const [selectedEta, setSelectedEta] = useState<number>(30)

  const availableCrew = crewMembers.filter((c) => c.available)

  const handleConfirm = () => {
    if (selectedCrew) {
      onConfirm(selectedCrew, selectedEta)
      setSelectedCrew(null)
      setSelectedEta(30)
      onClose()
    }
  }

  if (!order) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Accept & Assign Order</DialogTitle>
        </DialogHeader>

        {/* Order Summary */}
        <div className="rounded-xl bg-muted/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {order.id}
            </span>
            <span className="font-bold text-primary">SAR {order.amount}</span>
          </div>
          <p className="font-medium text-foreground">{order.service}</p>
          <p className="text-sm text-muted-foreground">
            {order.vehicleType} - {order.customerName}
          </p>
        </div>

        {/* Crew Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Select Available Crew
          </label>
          <div className="max-h-48 space-y-2 overflow-y-auto">
            {availableCrew.length > 0 ? (
              availableCrew.map((crew) => (
                <button
                  key={crew.id}
                  onClick={() => setSelectedCrew(crew.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors",
                    selectedCrew === crew.id
                      ? "border-primary bg-accent"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{crew.name}</p>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Car className="h-3.5 w-3.5" />
                        {crew.vehicle}
                      </div>
                    </div>
                  </div>
                  {selectedCrew === crew.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No available crew members
              </p>
            )}
          </div>
        </div>

        {/* ETA Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Estimated Time of Arrival
          </label>
          <div className="grid grid-cols-4 gap-2">
            {etaOptions.map((eta) => (
              <button
                key={eta}
                onClick={() => setSelectedEta(eta)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                  selectedEta === eta
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:bg-muted"
                )}
              >
                {eta} min
              </button>
            ))}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedCrew}>
            Confirm Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
