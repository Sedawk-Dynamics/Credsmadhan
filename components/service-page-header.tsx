'use client'

import { motion } from 'framer-motion'
import { Navbar } from './navbar'
import { Footer } from './footer'

interface ServicePageHeaderProps {
  children: React.ReactNode
}

export function ServicePageHeader({ children }: ServicePageHeaderProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
