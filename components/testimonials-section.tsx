"use client"

import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Rajesh Kumar",
    designation: "Business Owner, Delhi",
    rating: 5,
    text: "Credsmadhan helped me understand and resolve a major CIBIL error that was blocking my loan. Their process-driven approach and transparency gave me confidence throughout. Highly recommended!",
    initials: "RK",
    color: "#1B3F8B",
  },
  {
    name: "Priya Sharma",
    designation: "Salaried Professional, Gurugram",
    rating: 5,
    text: "I was struggling with an EMI stress situation for months. The team at Credsmadhan analyzed my case thoroughly, provided structured guidance, and helped me navigate through the process with clarity.",
    initials: "PS",
    color: "#2a52a8",
  },
  {
    name: "Anil Mehta",
    designation: "Entrepreneur, Mumbai",
    rating: 5,
    text: "Their grievance escalation support for my banking dispute was exceptional. No false promises — just honest, documented work. They helped me get my issue resolved with the right authority.",
    initials: "AM",
    color: "#F0A500",
  },
]

export default function TestimonialsSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#FEF3D0] text-[#F0A500] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1B3F8B] text-balance">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-[#4A5568] max-w-xl mx-auto leading-relaxed">
            Real experiences from clients who trusted Credsmadhan to resolve their financial challenges.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px -10px rgba(27,63,139,0.12)" }}
              className="relative bg-[#F7F9FC] rounded-2xl p-8 border border-border hover:border-[#F0A500]/30 transition-colors duration-300"
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="text-[#F0A500]/20 absolute top-6 right-6"
                fill="currentColor"
              />
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={14} className="fill-[#F0A500] text-[#F0A500]" />
                ))}
              </div>
              {/* Text */}
              <p className="text-[#4A5568] text-sm leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#1B3F8B] text-sm">{t.name}</p>
                  <p className="text-xs text-[#4A5568]">{t.designation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
