"use client"

import { Phone, Mail, MapPin, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function CtaSection() {
  return (
    <section id="contact" className="py-12 md:py-16 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Left: CTA block */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#1B3F8B] rounded-3xl p-6 md:p-10 relative overflow-hidden"
          >
            {/* Decorative rings */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border-[30px] border-white/5" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border-[20px] border-[#F0A500]/10" />

            <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-[#F0A500]/20 text-[#F0A500] text-xs font-bold uppercase tracking-widest rounded-full mb-4 md:mb-6">
              Get Started Today
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight text-balance mb-3 md:mb-4">
              Ready to Resolve Your Financial Issues?
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 md:mb-8">
              Connect with our team for a free, no-obligation consultation. We&apos;ll analyze your situation and provide honest guidance — with no false promises.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
              <a href="tel:9053903719" className="flex items-center gap-2 md:gap-3 text-white/90 hover:text-[#F0A500] transition-colors group">
                <div className="w-8 md:w-9 h-8 md:h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#F0A500]/20 transition-colors flex-shrink-0">
                  <Phone size={16} className="text-[#F0A500]" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Call Us</p>
                  <p className="font-semibold text-sm md:text-base">+91 9053903719</p>
                </div>
              </a>
              <a href="mailto:support@credsmadhan.com" className="flex items-center gap-2 md:gap-3 text-white/90 hover:text-[#F0A500] transition-colors group">
                <div className="w-8 md:w-9 h-8 md:h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#F0A500]/20 transition-colors flex-shrink-0">
                  <Mail size={16} className="text-[#F0A500]" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Email Us</p>
                  <p className="font-semibold text-sm md:text-base">support@credsmadhan.com</p>
                </div>
              </a>
              <div className="flex items-center gap-2 md:gap-3 text-white/90">
                <div className="w-8 md:w-9 h-8 md:h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#F0A500]" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Office</p>
                  <p className="font-semibold text-sm md:text-base">Lajpat Nagar, Gurugram – 122001, Haryana</p>
                </div>
              </div>
            </div>

            <a
              href="tel:9053903719"
              className="inline-flex items-center justify-center gap-2 px-5 md:px-7 py-3 md:py-3.5 bg-[#F0A500] text-[#1B3F8B] font-bold rounded-xl text-sm md:text-base hover:bg-[#F7C04A] transition-colors shadow-lg group w-full md:w-auto"
            >
              Call Now for Free Consultation
              <ArrowRight size={18} className="hidden md:inline group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl border border-border p-6 md:p-10 shadow-sm"
          >
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1B3F8B] mb-2">Send Us a Message</h3>
            <p className="text-xs md:text-sm text-[#4A5568] mb-5 md:mb-7">Fill in your details and we&apos;ll get back to you within 24 hours.</p>

            <form className="flex flex-col gap-3 md:gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-3 md:gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs md:text-sm font-semibold text-[#1B3F8B]">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="px-3 md:px-4 py-2 md:py-3 rounded-xl border border-border text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/30 focus:border-[#1B3F8B] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs md:text-sm font-semibold text-[#1B3F8B]">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="px-3 md:px-4 py-2 md:py-3 rounded-xl border border-border text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/30 focus:border-[#1B3F8B] transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs md:text-sm font-semibold text-[#1B3F8B]">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="px-3 md:px-4 py-2 md:py-3 rounded-xl border border-border text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/30 focus:border-[#1B3F8B] transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="service" className="text-xs md:text-sm font-semibold text-[#1B3F8B]">Service Required</label>
                <select
                  id="service"
                  className="px-3 md:px-4 py-2 md:py-3 rounded-xl border border-border text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/30 focus:border-[#1B3F8B] transition-all text-[#4A5568]"
                >
                  <option value="">Select a service...</option>
                  <option>Credit & CIBIL Analysis</option>
                  <option>Credit Report Rectification</option>
                  <option>Loan & EMI Stress Guidance</option>
                  <option>Banking & Credit Card Support</option>
                  <option>Insurance Issue Assistance</option>
                  <option>Unclaimed Money Support</option>
                  <option>Grievance & Complaint Escalation</option>
                  <option>Documentation & Case Facilitation</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs md:text-sm font-semibold text-[#1B3F8B]">Brief Description</label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Briefly describe your issue or query..."
                  className="px-3 md:px-4 py-2 md:py-3 rounded-xl border border-border text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/30 focus:border-[#1B3F8B] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 md:py-3.5 bg-[#1B3F8B] text-white font-bold rounded-xl text-sm md:text-base hover:bg-[#142f6b] transition-colors shadow-lg flex items-center justify-center gap-2 group"
              >
                Submit Enquiry
                <ArrowRight size={16} className="md:size-18 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
