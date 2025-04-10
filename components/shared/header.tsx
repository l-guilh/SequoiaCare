"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { AuthModal } from "@/components/auth/auth-modal"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
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
            <span className="text-2xl text-black">
              <span className="font-light">Sequoia</span>
              <span className="font-semibold">Health</span>
            </span>
          </Link>
          <div className="space-x-6">
            {["Sobre", "Experts"].map((item) => (
              <Link
                key={item}
                href={item === "Sobre" ? "/about" : "/provider-directory"}
                className="text-black hover:text-sequoia-accent transition-colors text-sm font-medium"
              >
                {item}
              </Link>
            ))}
            <Link href="/auth" className="text-black hover:text-sequoia-accent transition-colors text-sm font-medium">
              Entrar
            </Link>
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}

