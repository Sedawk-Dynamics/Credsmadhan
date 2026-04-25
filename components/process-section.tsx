"use client"

import { MessageSquare, Search, FileText, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Share Your Issue",
    description:
      "Contact us via call, email or our form. Describe your credit, CIBIL, banking, loan or insurance problem in brief.",
  },
  {
    step: "02",
    icon: Search,
    title: "We Analyse & Plan",
    description:
      "Our team reviews your case in detail, identifies root causes and maps out a structured resolution approach tailored to your issue.",
  },
  {
    step: "03",
    icon: FileText,
    title: "Documentation & Filing",
    description:
      "We assist you in preparing the required documents, representations or complaints and guide you through submission to the right authority.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Resolution & Follow-up",
    description:
      "We track the progress with you, help manage follow-ups and ensure your case moves toward a fair and structured resolution.",
  },
]

export default function ProcessSection() {
  return (
    <section className="py-16 bg-[#1B3F8B] relative overflow-hidden">
      {/* Background image watermark */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/images/financial-growth.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#F0A500]/10 translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-[#F0A500]/20 text-[#F0A500] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            How It Works
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance">
            Our 4-Step Resolution
            <br />
            <span className="text-[#F0A500]">Process</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto leading-relaxed">
            A transparent, structured approach — from understanding your problem to guiding you toward a clear resolution.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          {/* Connecting dashed line (desktop only) */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-white/20 z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col items-center text-center px-6 py-8"
              >
                {/* Numbered circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#F0A500] flex items-center justify-center shadow-lg shadow-[#F0A500]/30">
                    <Icon size={26} className="text-[#1B3F8B]" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <span className="text-[10px] font-black text-[#1B3F8B]">{step.step}</span>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-white mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F0A500] text-[#1B3F8B] font-bold rounded-xl hover:bg-[#F7C04A] transition-colors shadow-lg shadow-[#F0A500]/20 text-sm"
          >
            Start Your Resolution Now
          </a>
        </motion.div>
      </div>
    </section>
  )
}
