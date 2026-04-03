"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Lock,
  Info,
  Plus,
  X,
  Trash2,
  Users,
  MapPin,
  Clock,
  Shield,
  Bell,
  Settings as SettingsIcon,
  User,
  Building2,
  Mail,
  Phone,
} from "lucide-react"

type SettingsTab =
  | "profile"
  | "team"
  | "coverage"
  | "hours"
  | "security"
  | "notifications"
  | "preferences"

const tabs: { key: SettingsTab; label: string; icon: typeof User }[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "team", label: "Team Access", icon: Users },
  { key: "coverage", label: "Coverage Areas", icon: MapPin },
  { key: "hours", label: "Working Hours", icon: Clock },
  { key: "security", label: "Security", icon: Shield },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "preferences", label: "Preferences", icon: SettingsIcon },
]

type TeamRole = "Manager" | "Accountant" | "HR" | "Supervisor" | "Custom"

interface TeamMember {
  id: string
  name: string
  email: string
  role: TeamRole
  customPages?: string[]
}

interface CoverageArea {
  id: string
  city: string
  districts: string
  assignedCrew: string[]
}

interface WorkingDay {
  day: string
  isOpen: boolean
  openTime: string
  closeTime: string
}

interface NotificationSetting {
  key: string
  label: string
  description: string
  enabled: boolean
}

const roleColors: Record<TeamRole, string> = {
  Manager: "bg-purple-100 text-purple-700",
  Accountant: "bg-blue-100 text-blue-700",
  HR: "bg-green-100 text-green-700",
  Supervisor: "bg-orange-100 text-orange-700",
  Custom: "bg-gray-100 text-gray-700",
}

const saudiCities = [
  "Riyadh",
  "Jeddah",
  "Makkah",
  "Madinah",
  "Dammam",
  "Khobar",
  "Dhahran",
  "Tabuk",
  "Abha",
  "Taif",
  "Buraidah",
  "Najran",
  "Jubail",
  "Yanbu",
  "Khamis Mushait",
]

const availableCrew = [
  "Yusuf Al-Malki",
  "Omar Hassan",
  "Khaled Ibrahim",
  "Faisal Al-Dosari",
  "Saad Al-Qahtani",
]

const availablePages = [
  "Dashboard",
  "Services",
  "Packages",
  "Orders",
  "Customers",
  "Crew",
  "Earnings",
  "Settings",
]

const mockTeamMembers: TeamMember[] = [
  { id: "1", name: "Ahmed Al-Rashid", email: "ahmed@shiny.sa", role: "Manager" },
  { id: "2", name: "Sara Al-Fahad", email: "sara@shiny.sa", role: "Accountant" },
  { id: "3", name: "Mohammed Khalid", email: "mohammed@shiny.sa", role: "Supervisor" },
]

const mockCoverageAreas: CoverageArea[] = [
  {
    id: "1",
    city: "Riyadh",
    districts: "Al Olaya, Al Malaz, Al Muruj, Al Rawdah",
    assignedCrew: ["Yusuf Al-Malki", "Khaled Ibrahim"],
  },
  {
    id: "2",
    city: "Jeddah",
    districts: "Al Hamra, Al Shati, Al Andalus",
    assignedCrew: ["Omar Hassan"],
  },
]

const initialWorkingHours: WorkingDay[] = [
  { day: "Sunday", isOpen: true, openTime: "08:00", closeTime: "22:00" },
  { day: "Monday", isOpen: true, openTime: "08:00", closeTime: "22:00" },
  { day: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "22:00" },
  { day: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "22:00" },
  { day: "Thursday", isOpen: true, openTime: "08:00", closeTime: "22:00" },
  { day: "Friday", isOpen: false, openTime: "14:00", closeTime: "22:00" },
  { day: "Saturday", isOpen: true, openTime: "08:00", closeTime: "22:00" },
]

const initialNotifications: NotificationSetting[] = [
  {
    key: "new_order",
    label: "New Order",
    description: "Get notified when a new order is placed",
    enabled: true,
  },
  {
    key: "order_completed",
    label: "Order Completed",
    description: "Get notified when an order is completed",
    enabled: true,
  },
  {
    key: "crew_status",
    label: "Crew Status",
    description: "Get notified when crew members change status",
    enabled: false,
  },
  {
    key: "monthly_report",
    label: "Monthly Report",
    description: "Receive monthly earnings and performance report",
    enabled: true,
  },
  {
    key: "weekly_report",
    label: "Weekly Report",
    description: "Receive weekly summary of orders and revenue",
    enabled: false,
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")

  // Profile state
  const [businessDescription, setBusinessDescription] = useState(
    "Premium mobile car wash services in Saudi Arabia. We bring the shine to your doorstep."
  )
  const [contactPhone, setContactPhone] = useState("+966 55 123 4567")
  const [contactEmail, setContactEmail] = useState("contact@shiny.sa")

  // Team state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [newMemberName, setNewMemberName] = useState("")
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberRole, setNewMemberRole] = useState<TeamRole>("Manager")
  const [customPages, setCustomPages] = useState<string[]>([])

  // Coverage state
  const [coverageAreas, setCoverageAreas] = useState<CoverageArea[]>(mockCoverageAreas)
  const [isAddAreaOpen, setIsAddAreaOpen] = useState(false)
  const [newAreaCity, setNewAreaCity] = useState("")
  const [newAreaDistricts, setNewAreaDistricts] = useState("")
  const [newAreaCrew, setNewAreaCrew] = useState<string[]>([])

  // Working hours state
  const [workingHours, setWorkingHours] = useState<WorkingDay[]>(initialWorkingHours)

  // Security state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationSetting[]>(initialNotifications)

  // Preferences state
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [timezone, setTimezone] = useState("Asia/Riyadh")

  const handleAddMember = () => {
    if (newMemberName && newMemberEmail) {
      const newMember: TeamMember = {
        id: `${Date.now()}`,
        name: newMemberName,
        email: newMemberEmail,
        role: newMemberRole,
        customPages: newMemberRole === "Custom" ? customPages : undefined,
      }
      setTeamMembers([...teamMembers, newMember])
      setNewMemberName("")
      setNewMemberEmail("")
      setNewMemberRole("Manager")
      setCustomPages([])
      setIsAddMemberOpen(false)
    }
  }

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== id))
  }

  const handleAddArea = () => {
    if (newAreaCity && newAreaDistricts) {
      const newArea: CoverageArea = {
        id: `${Date.now()}`,
        city: newAreaCity,
        districts: newAreaDistricts,
        assignedCrew: newAreaCrew,
      }
      setCoverageAreas([...coverageAreas, newArea])
      setNewAreaCity("")
      setNewAreaDistricts("")
      setNewAreaCrew([])
      setIsAddAreaOpen(false)
    }
  }

  const handleRemoveArea = (id: string) => {
    setCoverageAreas(coverageAreas.filter((a) => a.id !== id))
  }

  const handleWorkingHourChange = (
    index: number,
    field: keyof WorkingDay,
    value: string | boolean
  ) => {
    const updated = [...workingHours]
    updated[index] = { ...updated[index], [field]: value }
    setWorkingHours(updated)
  }

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return
    }
    setPasswordError("")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    // API call would go here
  }

  const handleNotificationToggle = (key: string) => {
    setNotifications(
      notifications.map((n) =>
        n.key === key ? { ...n, enabled: !n.enabled } : n
      )
    )
  }

  const toggleCustomPage = (page: string) => {
    setCustomPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    )
  }

  const toggleCrewMember = (crew: string) => {
    setNewAreaCrew((prev) =>
      prev.includes(crew) ? prev.filter((c) => c !== crew) : [...prev, crew]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <main className="pt-14 lg:ml-60 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">Settings</h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Manage your account and preferences
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex min-w-max gap-1 border-b border-border pb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-t-lg px-3 py-2.5 text-sm font-medium transition-colors sm:px-4",
                    activeTab === tab.key
                      ? "border-b-2 border-primary bg-primary/5 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Legal & ZATCA Section */}
              <Card className="rounded-2xl border border-border shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg font-semibold">
                        Legal & ZATCA Information
                      </CardTitle>
                    </div>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground">
                      Read Only
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Info Banner */}
                  <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <p className="text-sm text-blue-800">
                      These details are locked and compliant with ZATCA regulations. Contact
                      Shiny support to update.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="h-3.5 w-3.5" />
                        Legal Business Name
                      </Label>
                      <Input
                        value="Shiny Car Wash LLC"
                        disabled
                        className="bg-muted/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="h-3.5 w-3.5" />
                        Commercial Registration
                      </Label>
                      <Input
                        value="1010123456"
                        disabled
                        className="bg-muted/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="h-3.5 w-3.5" />
                        VAT Number (ZATCA)
                      </Label>
                      <Input
                        value="310123456700003"
                        disabled
                        className="bg-muted/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="h-3.5 w-3.5" />
                        Bank IBAN
                      </Label>
                      <Input
                        value="SA44 2000 0001 2345 6789 1234"
                        disabled
                        className="bg-muted/50"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="h-3.5 w-3.5" />
                        Registered Address
                      </Label>
                      <Input
                        value="King Fahd Road, Al Olaya District, Riyadh 12211, Saudi Arabia"
                        disabled
                        className="bg-muted/50"
                      />
                    </div>
                  </div>

                  <Button variant="outline" className="mt-4 gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>

              {/* Contact & Display Section */}
              <Card className="rounded-2xl border border-border shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-semibold">
                      Contact & Display
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Business Description</Label>
                    <Textarea
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      placeholder="Describe your business..."
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Contact Phone</Label>
                      <Input
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+966 XX XXX XXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Contact Email</Label>
                      <Input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="contact@example.com"
                      />
                    </div>
                  </div>
                  <Button className="mt-4">Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Team Access Tab */}
          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Team Members</h2>
                <Button onClick={() => setIsAddMemberOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Member
                </Button>
              </div>

              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <Card
                    key={member.id}
                    className="rounded-xl border border-border p-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={cn("font-medium", roleColors[member.role])}>
                          {member.role}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveMember(member.id)}
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Add Member Slide Panel */}
              {isAddMemberOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={() => setIsAddMemberOpen(false)}
                  />
                  <div className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md overflow-y-auto bg-card shadow-xl sm:rounded-l-2xl">
                    <div className="flex items-center justify-between border-b border-border p-4">
                      <h3 className="text-lg font-semibold">Add Team Member</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsAddMemberOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="space-y-4 p-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          placeholder="Enter name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={newMemberEmail}
                          onChange={(e) => setNewMemberEmail(e.target.value)}
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Select
                          value={newMemberRole}
                          onValueChange={(v) => setNewMemberRole(v as TeamRole)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Accountant">Accountant</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Supervisor">Supervisor</SelectItem>
                            <SelectItem value="Custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {newMemberRole === "Custom" && (
                        <div className="space-y-2">
                          <Label>Page Access</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {availablePages.map((page) => (
                              <button
                                key={page}
                                onClick={() => toggleCustomPage(page)}
                                className={cn(
                                  "rounded-lg border px-3 py-2 text-sm transition-colors",
                                  customPages.includes(page)
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-muted-foreground hover:border-primary/50"
                                )}
                              >
                                {page}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="border-t border-border p-4">
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setIsAddMemberOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button className="flex-1" onClick={handleAddMember}>
                          Add Member
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Coverage Areas Tab */}
          {activeTab === "coverage" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Coverage Areas</h2>
                <Button onClick={() => setIsAddAreaOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Area
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {coverageAreas.map((area) => (
                  <Card
                    key={area.id}
                    className="rounded-xl border border-border p-4 shadow-sm"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">{area.city}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveArea(area.id)}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{area.districts}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {area.assignedCrew.map((crew) => (
                        <Badge
                          key={crew}
                          variant="secondary"
                          className="bg-accent text-accent-foreground"
                        >
                          {crew}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Add Area Slide Panel */}
              {isAddAreaOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={() => setIsAddAreaOpen(false)}
                  />
                  <div className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md overflow-y-auto bg-card shadow-xl sm:rounded-l-2xl">
                    <div className="flex items-center justify-between border-b border-border p-4">
                      <h3 className="text-lg font-semibold">Add Coverage Area</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsAddAreaOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="space-y-4 p-4">
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Select value={newAreaCity} onValueChange={setNewAreaCity}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {saudiCities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Districts</Label>
                        <Input
                          value={newAreaDistricts}
                          onChange={(e) => setNewAreaDistricts(e.target.value)}
                          placeholder="e.g., Al Olaya, Al Malaz, Al Muruj"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Assigned Crew</Label>
                        <div className="flex flex-wrap gap-2">
                          {availableCrew.map((crew) => (
                            <button
                              key={crew}
                              onClick={() => toggleCrewMember(crew)}
                              className={cn(
                                "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                                newAreaCrew.includes(crew)
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border text-muted-foreground hover:border-primary/50"
                              )}
                            >
                              {crew}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-border p-4">
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setIsAddAreaOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button className="flex-1" onClick={handleAddArea}>
                          Add Area
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Working Hours Tab */}
          {activeTab === "hours" && (
            <div className="space-y-6">
              <Card className="rounded-2xl border border-border shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold">Working Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-b border-border text-left text-sm text-muted-foreground">
                          <th className="pb-3 font-medium">Day</th>
                          <th className="pb-3 font-medium">Status</th>
                          <th className="pb-3 font-medium">Open</th>
                          <th className="pb-3 font-medium">Close</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workingHours.map((day, index) => (
                          <tr key={day.day} className="border-b border-border last:border-0">
                            <td className="py-4 font-medium text-foreground">{day.day}</td>
                            <td className="py-4">
                              <Switch
                                checked={day.isOpen}
                                onCheckedChange={(checked) =>
                                  handleWorkingHourChange(index, "isOpen", checked)
                                }
                              />
                            </td>
                            <td className="py-4">
                              <Input
                                type="time"
                                value={day.openTime}
                                onChange={(e) =>
                                  handleWorkingHourChange(index, "openTime", e.target.value)
                                }
                                disabled={!day.isOpen}
                                className="w-32"
                              />
                            </td>
                            <td className="py-4">
                              <Input
                                type="time"
                                value={day.closeTime}
                                onChange={(e) =>
                                  handleWorkingHourChange(index, "closeTime", e.target.value)
                                }
                                disabled={!day.isOpen}
                                className="w-32"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button className="mt-6">Save Hours</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <Card className="max-w-md rounded-2xl border border-border shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-semibold">Change Password</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                  {passwordError && (
                    <p className="text-sm text-destructive">{passwordError}</p>
                  )}
                  <Button onClick={handleUpdatePassword} className="mt-2">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <Card className="rounded-2xl border border-border shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-semibold">
                      Notification Preferences
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.key}
                      className="flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-muted/50"
                    >
                      <div>
                        <p className="font-medium text-foreground">{notification.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                      <Switch
                        checked={notification.enabled}
                        onCheckedChange={() => handleNotificationToggle(notification.key)}
                      />
                    </div>
                  ))}
                  <div className="pt-4">
                    <Button>Save</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <Card className="max-w-md rounded-2xl border border-border shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold">Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Language</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={language === "en" ? "default" : "outline"}
                        onClick={() => setLanguage("en")}
                        className="flex-1"
                      >
                        English
                      </Button>
                      <Button
                        variant={language === "ar" ? "default" : "outline"}
                        onClick={() => setLanguage("ar")}
                        className="flex-1"
                      >
                        Arabic
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Riyadh">Riyadh (GMT+3)</SelectItem>
                        <SelectItem value="Asia/Dubai">Dubai (GMT+4)</SelectItem>
                        <SelectItem value="Asia/Kuwait">Kuwait (GMT+3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
