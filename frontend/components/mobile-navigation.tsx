import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import { MainNav } from "./main-nav"

const MobileNavigation = () => {
  const navigationItems = [
    { name: "Início", href: "/" },
    { name: "Serviços", href: "/servicos" },
    { name: "Blog", href: "/blog" },
    { name: "Contato", href: "/contato" },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-64">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navegue pelo site.</SheetDescription>
        </SheetHeader>
        <MainNav className="flex flex-col space-y-4" items={navigationItems} />
        <div className="flex justify-center mt-4">
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavigation

