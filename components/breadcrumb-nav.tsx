'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export interface BreadcrumbItem {
  label: string
  href?: string
} 

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="hidden md:flex items-center gap-2 text-sm text-muted-foreground mb-4"
    >
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
          {idx < items.length - 1 && (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      ))}
    </motion.div>
  )
}
