"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { KpiCard } from "@/components/kpi-card"
import {
  CrewMemberPanel,
  type CrewMember,
} from "@/components/crew-member-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Plus,
  Search,
  Pencil,
  Trash2,
  Car,
  Bike,
} from "lucide-react"

const availableServices = [
  "Express Wash",
  "Premium Wash",
  "Interior Cleaning",
  "Full Detail",
  "Ceramic Coating",
  "Paint Protection",
  "Engine Cleaning",
]

const mockCrewMembers: CrewMember[] = [
  {
    id: "CREW-001",
    employeeNumber: "EMP-001",
    fullName: "Yusuf Al-Malki",
    phone: "+966 55 123 4567",
    email: "yusuf@shiny.sa",
    nationalId: "1234567890",
    vehicleType: "Car",
    vehiclePlate: "ABC 1234",
    assignedServices: ["Express Wash", "Premium Wash", "Interior Cleaning"],
    status: "Available",
  },
  {
    id: "CREW-002",
    employeeNumber: "EMP-002",
    fullName: "Omar Hassan",
    phone: "+966 50 987 6543",
    email: "omar@shiny.sa",
    nationalId: "0987654321",
    vehicleType: "Motorcycle",
    vehiclePlate: "XYZ 789",
    assignedServices: ["Express Wash", "Interior Cleaning"],
    status: "Busy",
  },
  {
    id: "CREW-003",
    employeeNumber: "EMP-003",
    fullName: "Khaled Ibrahim",
    phone: "+966 54 456 7890",
    email: "khaled@shiny.sa",
    nationalId: "5678901234",
    vehicleType: "Car",
    vehiclePlate: "DEF 5678",
    assignedServices: ["Premium Wash", "Full Detail", "Ceramic Coating", "Paint Protection"],
    status: "Available",
  },
  {
    id: "CREW-004",
    employeeNumber: "EMP-004",
    fullName: "Faisal Al-Dosari",
    phone: "+966 55 321 0987",
    email: "faisal@shiny.sa",
    nationalId: "3210987654",
    vehicleType: "Car",
    vehiclePlate: "GHI 9012",
    assignedServices: ["Express Wash", "Premium Wash", "Engine Cleaning"],
    status: "Offline",
  },
  {
    id: "CREW-005",
    employeeNumber: "EMP-005",
    fullName: "Saad Al-Qahtani",
    phone: "+966 56 654 3210",
    email: "saad@shiny.sa",
    nationalId: "6543210987",
    vehicleType: "Motorcycle",
    vehiclePlate: "JKL 345",
    assignedServices: ["Express Wash"],
    status: "Busy",
  },
  {
    id: "CREW-006",
    employeeNumber: "EMP-006",
    fullName: "Nasser Al-Harbi",
    phone: "+966 50 789 0123",
    email: "nasser@shiny.sa",
    nationalId: "7890123456",
    vehicleType: "Car",
    vehiclePlate: "MNO 6789",
    assignedServices: ["Full Detail", "Ceramic Coating", "Paint Protection", "Engine Cleaning"],
    status: "Available",
  },
]

const statusConfig = {
  Available: {
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
    dotColor: "bg-emerald-500",
  },
  Busy: {
    bgColor: "bg-amber-100",
    textColor: "text-amber-700",
    dotColor: "bg-amber-500",
  },
  Offline: {
    bgColor: "bg-gray-100",
    textColor: "text-gray-600",
    dotColor: "bg-gray-400",
  },
}

export default function CrewPage() {
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>(mockCrewMembers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<CrewMember | null>(null)

  // Filter crew members
  const filteredMembers = crewMembers.filter(
    (member) =>
      member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.employeeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate stats
  const stats = {
    total: crewMembers.length,
    available: crewMembers.filter((m) => m.status === "Available").length,
    busy: crewMembers.filter((m) => m.status === "Busy").length,
    offline: crewMembers.filter((m) => m.status === "Offline").length,
  }

  const handleAddMember = () => {
    setEditingMember(null)
    setIsPanelOpen(true)
  }

  const handleEditMember = (member: CrewMember) => {
    setEditingMember(member)
    setIsPanelOpen(true)
  }

  const handleRemoveMember = (memberId: string) => {
    setCrewMembers((prev) => prev.filter((m) => m.id !== memberId))
  }

  const handleSaveMember = (memberData: Partial<CrewMember>) => {
    if (editingMember) {
      // Update existing member
      setCrewMembers((prev) =>
        prev.map((m) =>
          m.id === editingMember.id ? { ...m, ...memberData } : m
        )
      )
    } else {
      // Add new member
      const newMember: CrewMember = {
        id: `CREW-${String(crewMembers.length + 1).padStart(3, "0")}`,
        employeeNumber: `EMP-${String(crewMembers.length + 1).padStart(3, "0")}`,
        fullName: memberData.fullName || "",
        phone: memberData.phone || "",
        email: memberData.email || "",
        nationalId: memberData.nationalId || "",
        vehicleType: memberData.vehicleType || "Car",
        vehiclePlate: memberData.vehiclePlate || "",
        assignedServices: memberData.assignedServices || [],
        status: "Offline",
      }
      setCrewMembers((prev) => [...prev, newMember])
    }
    setIsPanelOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-60 p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Crew</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your field team
            </p>
          </div>
          <Button onClick={handleAddMember} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>

        {/* Stats Row */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <KpiCard icon={Users} label="Total Crew" value={stats.total} />
          <KpiCard
            icon={UserCheck}
            label="Available Now"
            value={stats.available}
          />
          <KpiCard icon={Clock} label="Busy" value={stats.busy} />
          <KpiCard icon={UserX} label="Offline" value={stats.offline} />
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crew by name, ID, or plate..."
            className="pl-10"
          />
        </div>

        {/* Crew Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => {
              const config = statusConfig[member.status]
              const displayedServices = member.assignedServices.slice(0, 3)
              const remainingServices = member.assignedServices.length - 3

              return (
                <Card
                  key={member.id}
                  className="flex flex-col gap-4 rounded-2xl border border-border p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Header - Name, ID, Status */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {member.fullName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {member.employeeNumber}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "flex items-center gap-1.5",
                        config.bgColor,
                        config.textColor,
                        `hover:${config.bgColor}`
                      )}
                    >
                      <span
                        className={cn("h-1.5 w-1.5 rounded-full", config.dotColor)}
                      />
                      {member.status}
                    </Badge>
                  </div>

                  {/* Vehicle Info */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {member.vehicleType === "Car" ? (
                      <Car className="h-4 w-4" />
                    ) : (
                      <Bike className="h-4 w-4" />
                    )}
                    <span>{member.vehicleType}</span>
                    <span className="text-border">|</span>
                    <span className="font-mono">{member.vehiclePlate}</span>
                  </div>

                  {/* Assigned Services */}
                  <div className="flex flex-wrap gap-1.5">
                    {displayedServices.map((service) => (
                      <Badge
                        key={service}
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/10"
                      >
                        {service}
                      </Badge>
                    ))}
                    {remainingServices > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-muted text-muted-foreground hover:bg-muted"
                      >
                        +{remainingServices} more
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 border-t border-border pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditMember(member)}
                      className="flex-1 gap-1.5"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                      className="flex-1 gap-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border">
            <Users className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              No crew members found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first team member to get started
            </p>
            <Button onClick={handleAddMember} className="mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
          </Card>
        )}
      </main>

      {/* Add/Edit Panel */}
      <CrewMemberPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onSave={handleSaveMember}
        editingMember={editingMember}
        availableServices={availableServices}
      />
    </div>
  )
}
