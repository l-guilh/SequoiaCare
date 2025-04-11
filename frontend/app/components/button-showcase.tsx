"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check, Copy, Download, Heart, Mail, Plus, Trash, User } from "lucide-react"
import { toast } from "sonner"

export function ButtonShowcase() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadingDemo = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Action completed successfully!")
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Code copied to clipboard!")
  }

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight">Button Component</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A versatile button component with multiple variants, sizes, and features.
        </p>
      </motion.div>

      <Tabs defaultValue="showcase" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="showcase">Showcase</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="showcase" className="space-y-8 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>Click the button below to see the loading state in action.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <Button isLoading={isLoading} onClick={handleLoadingDemo} className="w-full">
                  {isLoading ? "Processing..." : "Click Me"}
                </Button>
                <Button variant="gradient" leftIcon={<Heart className="h-4 w-4" />} className="w-full">
                  Like
                </Button>
                <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />} className="w-full">
                  Continue
                </Button>
              </div>

              <div className="bg-muted p-4 rounded-md w-full mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Example Code</span>
                  <button
                    onClick={() =>
                      copyToClipboard(`<Button isLoading={isLoading} onClick={handleLoadingDemo}>
  {isLoading ? "Processing..." : "Click Me"}
</Button>`)
                    }
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <pre className="text-sm overflow-x-auto p-2">
                  {`<Button isLoading={isLoading} onClick={handleLoadingDemo}>
  {isLoading ? "Processing..." : "Click Me"}
</Button>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>With Icons</CardTitle>
                <CardDescription>Buttons can include icons on either side.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button leftIcon={<Mail className="h-4 w-4" />}>Email</Button>
                  <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Next</Button>
                  <Button leftIcon={<Download className="h-4 w-4" />} rightIcon={<Check className="h-4 w-4" />}>
                    Download
                  </Button>
                </div>

                <div className="bg-muted p-4 rounded-md mt-4">
                  <pre className="text-sm overflow-x-auto">
                    {`<Button leftIcon={<Mail className="h-4 w-4" />}>
  Email
</Button>`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sizes</CardTitle>
                <CardDescription>Buttons come in different sizes to fit your design.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                  <Button size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="bg-muted p-4 rounded-md mt-4">
                  <pre className="text-sm overflow-x-auto">
                    {`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon"><Plus /></Button>`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="variants" className="space-y-8 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Different styles for different purposes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Button variant="default" className="w-full">
                    Default
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">Primary actions</p>
                </div>
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full">
                    Secondary
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">Secondary actions</p>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Outline
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">Subtle actions</p>
                </div>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full">
                    Ghost
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">Minimal emphasis</p>
                </div>
                <div className="space-y-2">
                  <Button variant="destructive" className="w-full">
                    Destructive
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">Dangerous actions</p>
                </div>
                <div className="space-y-2">
                  <Button variant="link" className="w-full">
                    Link
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">Navigation</p>
                </div>
                <div className="space-y-2">
                  <Button variant="glass" className="w-full">
                    Glass
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">Modern UI</p>
                </div>
                <div className="space-y-2">
                  <Button variant="gradient" className="w-full">
                    Gradient
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">Emphasis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>States</CardTitle>
                <CardDescription>Buttons in different states.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Button className="w-full">Default</Button>
                  <Button className="w-full" disabled>
                    Disabled
                  </Button>
                  <Button className="w-full" isLoading>
                    Loading
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Styling</CardTitle>
                <CardDescription>Buttons can be customized with additional classes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Custom Gradient
                  </Button>
                  <Button className="w-full rounded-full">Rounded Button</Button>
                  <Button className="w-full shadow-lg hover:shadow-xl transition-shadow">Elevated Button</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Actions</CardTitle>
                <CardDescription>Common button patterns for forms.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 p-6 border rounded-md">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input type="email" className="w-full p-2 border rounded-md" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <input type="password" className="w-full p-2 border rounded-md" placeholder="••••••••" />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Action Groups</CardTitle>
                <CardDescription>Button groups for related actions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-6 border rounded-md">
                    <h3 className="text-lg font-medium mb-4">Document Actions</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button leftIcon={<Download className="h-4 w-4" />}>Download</Button>
                      <Button variant="outline" leftIcon={<Copy className="h-4 w-4" />}>
                        Duplicate
                      </Button>
                      <Button variant="destructive" leftIcon={<Trash className="h-4 w-4" />}>
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 border rounded-md">
                    <h3 className="text-lg font-medium mb-4">User Management</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" leftIcon={<User className="h-4 w-4" />}>
                        View Profile
                      </Button>
                      <Button variant="secondary" leftIcon={<Mail className="h-4 w-4" />}>
                        Message
                      </Button>
                      <Button variant="ghost" leftIcon={<Plus className="h-4 w-4" />}>
                        Add to Group
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-world Examples</CardTitle>
              <CardDescription>Buttons in context of common UI patterns.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 border rounded-md">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Subscription Plan</h3>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold mb-1">Pro Plan</h4>
                    <p className="text-muted-foreground">$29/month</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Unlimited projects</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Advanced analytics</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Priority support</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="w-full">
                      Change Plan
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Cancel
                    </Button>
                  </div>
                </div>

                <div className="p-6 border rounded-md">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                      <Download className="h-8 w-8 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Annual Report.pdf</h3>
                      <p className="text-sm text-muted-foreground">12.5 MB • Updated 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button leftIcon={<Download className="h-4 w-4" />}>Download</Button>
                    <Button variant="outline" leftIcon={<Copy className="h-4 w-4" />}>
                      Share
                    </Button>
                    <Button variant="ghost" leftIcon={<Plus className="h-4 w-4" />}>
                      Add to Collection
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

