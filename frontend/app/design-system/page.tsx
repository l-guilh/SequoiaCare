"use client"
import { Bell, Calendar, ChevronRight, FileText, Home, MessageSquare, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getBezierCurveClasses } from "@/lib/apply-bezier-curves"

export default function DesignSystemPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">SequoiaHealth Design System</h1>

      <Tabs defaultValue="components">
        <TabsList className="mb-8">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="components">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Apple-inspired button components with Bezier curves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button className="btn-apple">Primary Button</Button>
                  <Button variant="secondary" className="btn-apple">
                    Secondary
                  </Button>
                  <Button variant="outline" className="btn-apple">
                    Outline
                  </Button>
                  <Button variant="ghost" className="btn-apple">
                    Ghost
                  </Button>
                  <Button variant="destructive" className="btn-apple">
                    Destructive
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="sm" className="btn-apple">
                    Small
                  </Button>
                  <Button className="btn-apple">Default</Button>
                  <Button size="lg" className="btn-apple">
                    Large
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="icon" className="rounded-full h-10 w-10">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full h-10 w-10">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dialogs</CardTitle>
                <CardDescription>Modal dialogs with Apple-inspired Bezier curves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="btn-apple">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className="modal-apple">
                    <DialogHeader>
                      <DialogTitle>Apple-Inspired Dialog</DialogTitle>
                      <DialogDescription>
                        This dialog features smooth Bezier curves and transitions inspired by Apple's design language.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">
                        The content of the dialog can include any UI elements, all styled with the same design
                        principles.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button className="btn-apple" variant="outline">
                        Cancel
                      </Button>
                      <Button className="btn-apple">Continue</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>Navigation elements with Apple-inspired design</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`rounded-[var(--radius-panel)] border overflow-hidden ${getBezierCurveClasses({ withShadow: true })}`}
                >
                  <div className="bg-card p-4">
                    <h3 className="text-lg font-medium mb-4">Menu</h3>
                    <nav className="space-y-1">
                      {[
                        { icon: Home, label: "Dashboard" },
                        { icon: Calendar, label: "Appointments" },
                        { icon: MessageSquare, label: "Messages" },
                        { icon: FileText, label: "Records" },
                        { icon: Settings, label: "Settings" },
                      ].map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className={`flex items-center justify-between p-3 rounded-[var(--radius-button)] ${
                            index === 0 ? "bg-primary/10 text-primary" : "hover:bg-muted"
                          }`}
                        >
                          <div className="flex items-center">
                            <item.icon className="h-5 w-5 mr-3" />
                            <span>{item.label}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 opacity-50" />
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avatars & Badges</CardTitle>
                <CardDescription>User avatars and status indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Jane Doe</p>
                      <p className="text-xs text-muted-foreground">Patient</p>
                    </div>
                    <Badge className="ml-auto bg-green-100 text-green-800 rounded-full">Active</Badge>
                  </div>

                  <Separator />

                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Dr. John Smith</p>
                      <p className="text-xs text-muted-foreground">Cardiologist</p>
                    </div>
                    <Badge className="ml-auto bg-blue-100 text-blue-800 rounded-full">Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cards">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="card-apple overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle>Apple-Inspired Card {i}</CardTitle>
                  <CardDescription>Featuring smooth Bezier curves and elegant transitions</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-sm text-muted-foreground">
                    This card demonstrates the Apple-inspired design language with carefully crafted border radius
                    values and subtle shadows.
                  </p>
                </CardContent>
                <CardFooter className="p-6 bg-muted/30 flex justify-between">
                  <Button variant="ghost" className="btn-apple">
                    Cancel
                  </Button>
                  <Button className="btn-apple">Continue</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forms">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Input Elements</CardTitle>
                <CardDescription>Form inputs with Apple-inspired design</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Enter your name" className="input-apple" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" className="input-apple" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    className="w-full min-h-[100px] rounded-[var(--radius-input)] border border-input bg-background px-3 py-2 text-sm transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  />
                </div>

                <Button className="w-full btn-apple">Submit</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Search & Filter</CardTitle>
                <CardDescription>Search components with Apple-inspired design</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Input placeholder="Search..." className="input-apple pl-10" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["All", "Appointments", "Messages", "Records"].map((filter) => (
                    <Button
                      key={filter}
                      variant={filter === "All" ? "default" : "outline"}
                      size="sm"
                      className="rounded-full"
                    >
                      {filter}
                    </Button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="flex gap-2">
                    <Input type="date" className="input-apple flex-1" />
                    <Input type="date" className="input-apple flex-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

