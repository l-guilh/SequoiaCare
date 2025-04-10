"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Bell, Grid, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppHeader() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-sm h-12"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto h-full">
        <div className="flex justify-between items-center h-full px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="https://png.pngtree.com/png-clipart/20240909/original/pngtree-adult-giant-sequoia-tree-png-image_15970000.png"
              alt="SequoiaHealth Logo"
              width={20}
              height={20}
              className="mr-1"
            />
            <span className="text-sm text-black">
              <span className="font-light">Sequoia</span>
              <span className="font-semibold">Health</span>
            </span>
          </Link>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4 text-black/70" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[8px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="sm">
              <Grid className="h-4 w-4 text-black/70" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 text-black/70" />
            </Button>
            <Avatar className="h-6 w-6 border border-black/[0.08]">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-xs">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

