"use client"

import Image from "next/image"
import { CheckCircle2, Target, Eye, Heart } from "lucide-react"
import { motion } from "framer-motion"

const whyUs = [
  "Process-based and transparent approach with no false promises",
  "Deep understanding of credit reports, financial records and grievance processes",
  "Focus on analysis, documentation and correct escalation rather than shortcuts",
  "Confidential handling of client information and cases",
  "Clear communication and practical guidance at every step",
]

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "Simplify complex financial problems and provide clear, structured guidance to individuals and businesses.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "Become a trusted platform where individuals and businesses confidently address financial challenges through informed decisions.",
  },
  {
    icon: Heart,
    title: "Our Values",
    text: "Transparency, process-driven work, client confidentiality, clear communication, and long-term trust over short-term results.",
  },
]

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-16 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4">

        {/* About + Why Us */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/team-consult.jpg"
                alt="Financial advisor consultation"
                width={580}
                height={440}
                className="object-cover w-full h-[440px]"
              />
              <div className="absolute inset-0 bg-[#1B3F8B]/10 rounded-3xl" />
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-6 -right-6 bg-[#1B3F8B] text-white rounded-2xl shadow-xl p-6 w-44">
              <p className="text-4xl font-bold text-[#F0A500]">8+</p>
              <p className="text-sm font-medium mt-1 text-white/80">Core Financial Services</p>
            </div>
            {/* Gold circle */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border-4 border-[#F0A500]" />
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <span className="inline-block px-4 py-1.5 bg-[#FEF3D0] text-[#F0A500] text-xs font-bold uppercase tracking-widest rounded-full self-start">
              Why Choose Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B3F8B] text-balance leading-tight">
              Process-Driven, Honest,
              <br />
              <span className="text-[#F0A500]">Always Transparent</span>
            </h2>
            <p className="text-[#4A5568] leading-relaxed">
              We are a financial assistance and advisory platform focused on resolving common financial and consumer problems.
              Our work is built on structured analysis, documentation support, and process-driven facilitation — without offering
              guarantees or acting as a bank or financial institution.
            </p>

            <ul className="flex flex-col gap-3">
              {whyUs.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="text-[#F0A500] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#4A5568] leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>

            <a
              href="#contact"
              className="self-start mt-2 px-6 py-3 bg-[#F0A500] text-[#1B3F8B] font-bold rounded-xl hover:bg-[#F7C04A] transition-colors shadow-md"
            >
              Start Your Resolution Journey
            </a>
          </motion.div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1B3F8B] flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[#F0A500]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1B3F8B] mb-3">{v.title}</h3>
                <p className="text-sm text-[#4A5568] leading-relaxed">{v.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
