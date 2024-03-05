'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { FloatingNavbar } from '@/components/ui/floating-navbar'
// // import WavyBackground from '@components/ui/wavy-background'
import BackgroundBeams from '@/components/ui/background-beams'
import { HoveredLink, Menu, MenuItem, ProductItem } from '@/components/ui/navbar-menu'
import { TabsDemo } from '@/components/ui/tabs-demo'
import Header from '@/components/ui/header'
import { Providers } from './providers'
const navItems = {
  items: [
    { name: 'Home', link: '/' }
    // { name: 'About', link: '/about' },
    // { name: 'Projects', link: '/projects' }
  ]
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [active, setActive] = useState<string | null>(null)
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <Header />
          <BackgroundBeams />
          {children}
        </Providers>
      </body>
    </html>
  )
}
