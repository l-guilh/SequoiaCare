import type React from "react"
import type { Metadata } from "next"
import { Merriweather, Roboto } from "next/font/google"
import { headers } from "next/headers"
import { Header } from "@/components/shared/header"
import { AppInitializer } from "@/components/app-initializer"
import { Toaster } from "sonner"
import "./globals.css"

const merriweather = Merriweather({
  weight: ["300", "400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather",
})

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Sequoia Health",
  description: "Soluções inovadoras de saúde para um você mais saudável",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const pathname = headersList.get("x-pathname") || "/"

  // Updated paths to only include our core routes
  const excludedPaths = ["/auth", "/patient", "/physician"]

  const shouldShowHeader = !excludedPaths.some((path) => pathname.startsWith(path))

  return (
    <html lang="pt-BR">
      <body className={`${merriweather.variable} ${roboto.variable} font-sans min-h-screen bg-white`}>
        {shouldShowHeader && <Header />}
        {children}
        <Toaster position="top-right" />
        <AppInitializer />
      </body>
    </html>
  )
}



import './globals.css'