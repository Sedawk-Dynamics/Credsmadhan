"use client"

import { ArrowRight, Shield, Star } from "lucide-react"
import { motion } from "framer-motion"
import HeroCarousel from "./hero-carousel"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

// Enhanced text animation - slides in from right with stagger
const slideInRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

// Enhanced image animation - slides in from left with scale
const slideInLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -60, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#F7F9FC] pt-28 pb-16"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#1B3F8B]/5" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#F0A500]/8" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-[#F0A500]/10" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-[#1B3F8B]/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <motion.div {...slideInRight(0.1)} className="inline-flex items-center gap-2 bg-[#FEF3D0] border border-[#F0A500]/30 rounded-full px-3 sm:px-4 py-1.5 self-start max-w-sm">
              <Shield size={14} className="text-[#F0A500] fill-[#F0A500] flex-shrink-0" />
              <span className="text-xs font-semibold text-[#1B3F8B] uppercase tracking-wide">
                Trusted Financial Resolution Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.div {...slideInRight(0.2)}>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B3F8B] leading-tight text-balance">
                Cred Ki Baat,{" "}
                <span className="text-[#F0A500] italic">Smadhan</span>{" "}
                Ke Saath
              </h1>
              <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed max-w-lg">
                India&apos;s process-driven financial assistance platform — resolving your credit, CIBIL,
                loan, banking, and insurance issues with transparency and integrity.
              </p>
            </motion.div>

            {/* Trust badges */}
            <motion.div {...slideInRight(0.3)} className="flex flex-wrap gap-4 text-sm text-[#1B3F8B]">
              {["CIBIL Analysis", "Loan Guidance", "Banking Support", "Insurance Help"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#F0A500]" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div {...slideInRight(0.4)} className="flex flex-col sm:flex-row gap-2 mt-2">
              <a
                href="#contact"
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#1B3F8B] text-white font-medium text-xs sm:text-sm rounded-md hover:bg-[#142f6b] transition-all duration-200 shadow-md hover:shadow-lg group"
              >
                Book Case Review
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#services"
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#F0A500] text-[#1B3F8B] font-medium text-xs sm:text-sm rounded-md hover:bg-[#F7C04A] transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                Start Your Case Today
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div {...slideInRight(0.5)} className="flex items-center gap-5 pt-2">
              <div className="flex -space-x-2">
                {["#1B3F8B", "#2a52a8", "#F0A500", "#142f6b"].map((color, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {["R", "P", "A", "M"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} className="fill-[#F0A500] text-[#F0A500]" />
                  ))}
                </div>
                <p className="text-xs text-[#4A5568] mt-0.5">
                  <span className="font-bold text-[#1B3F8B]">500+</span> clients assisted across India
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Hero Carousel */}
          <motion.div
            {...slideInLeft(0.3)}
            className="relative hidden lg:flex items-center justify-center"
          >
            <HeroCarousel />

            {/* Floating card – CIBIL Score */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -left-10 top-12 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F0A500]/15 flex items-center justify-center">
                <span className="text-xl font-bold text-[#F0A500]">✓</span>
              </div>
              <div>
                <p className="text-xs text-[#4A5568] font-medium">Credit Score</p>
                <p className="text-lg font-bold text-[#1B3F8B]">Improved</p>
                <p className="text-[10px] text-green-600 font-semibold">Guaranteed Steps</p>
              </div>
            </motion.div>

            {/* Floating card – Cases */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -right-6 bottom-20 bg-[#1B3F8B] rounded-2xl shadow-xl p-4 text-white"
            >
              <p className="text-2xl font-bold text-[#F0A500]">500+</p>
              <p className="text-xs mt-0.5 text-white/80">Cases Resolved</p>
            </motion.div>

            {/* Gold ring decoration */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full border-4 border-[#F0A500]/20" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
