'use client'

import { Inter } from 'next/font/google'
import './globals.css'
// // import WavyBackground from '@components/ui/wavy-background'
import BackgroundBeams from '@/components/ui/background-beams'
import Header from '@/components/ui/menu/header'
import { Providers } from './providers'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
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
