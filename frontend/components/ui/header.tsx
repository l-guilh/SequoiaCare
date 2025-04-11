"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      } transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="https://png.pngtree.com/png-clipart/20240909/original/pngtree-adult-giant-sequoia-tree-png-image_15970000.png"
              alt="SequoiaHealth Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className={`text-2xl ${isScrolled ? "text-gray-900" : "text-white"}`}>
              <span className="font-light">Sequoia</span>
              <span className="font-semibold">Health</span>
            </span>
          </Link>
          <div className="space-x-6">
            <Link
              href="/about"
              className={`${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:text-sequoia-accent transition-colors text-sm font-medium`}
            >
              Sobre
            </Link>
            <Link
              href="/provider-directory"
              className={`${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:text-sequoia-accent transition-colors text-sm font-medium`}
            >
              Experts
            </Link>
            <Link
              href="#"
              className={`${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:text-sequoia-accent transition-colors text-sm font-medium`}
            >
              Suporte
            </Link>
            <Link
              href="/auth"
              className={`${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:text-sequoia-accent transition-colors text-sm font-medium`}
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

