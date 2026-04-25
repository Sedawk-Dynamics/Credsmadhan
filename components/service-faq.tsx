'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface ServiceFAQProps {
  items: FAQItem[]
}

export function ServiceFAQ({ items }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div id="faq" className="w-full max-w-4xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between gap-4 px-8 py-6 bg-white border-2 border-[#E2E8F0] rounded-2xl hover:border-[#F0A500] transition-all duration-300 hover:shadow-lg"
            >
              <span className="font-semibold text-[#1B3F8B] text-left text-lg leading-snug">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="h-6 w-6 text-[#F0A500]" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 py-6 bg-gradient-to-br from-[#F0A500]/5 to-transparent border-b-2 border-l-2 border-r-2 border-[#F0A500]/30 rounded-b-2xl mt-1">
                    <p className="text-[#4A5568] leading-relaxed text-base">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
