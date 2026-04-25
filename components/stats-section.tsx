"use client"

import { Users, FileCheck, Award, Clock } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { icon: Users, value: "500+", label: "Clients Assisted", desc: "Across India" },
  { icon: FileCheck, value: "95%", label: "Resolution Rate", desc: "Success across cases" },
  { icon: Award, value: "8+", label: "Core Services", desc: "Financial solutions" },
  { icon: Clock, value: "24h", label: "Response Time", desc: "Quick consultation" },
]

export default function StatsSection() {
  return (
    <section className="py-8 md:py-12 bg-[#1B3F8B]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon size={22} className="text-[#F0A500]" />
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-[#F0A500] font-serif">{stat.value}</p>
                <p className="text-white font-semibold mt-1 text-sm">{stat.label}</p>
                <p className="text-white/60 text-xs mt-0.5">{stat.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
