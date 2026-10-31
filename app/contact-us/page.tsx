"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin } from "lucide-react"
import ContactConsentForm from "@/components/contact-consent-form"

export default function ContactUsPage() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-gradient-to-br from-[#1B3F8B] to-[#2a52a8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">Client Consent &amp; Authorization</h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Please read carefully and provide your consent to proceed with our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h2 className="font-serif text-2xl font-bold text-[#1B3F8B] mb-8">Contact Information</h2>

              {/* Phone */}
              <a
                href="tel:9053903719"
                className="flex items-start gap-4 mb-8 p-4 rounded-xl bg-[#F7F9FC] hover:bg-[#E0EAFF] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1B3F8B] flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1B3F8B] mb-1">Call Us</h3>
                  <p className="text-[#4A5568]">+91 9053903719</p>
                  <p className="text-xs text-[#4A5568]/60 mt-1">Mon-Sun, 9AM - 6PM IST</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:support@credsmadhan.com"
                className="flex items-start gap-4 mb-8 p-4 rounded-xl bg-[#F7F9FC] hover:bg-[#E0EAFF] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F0A500] flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1B3F8B] mb-1">Email</h3>
                  <p className="text-[#4A5568]">support@credsmadhan.com</p>
                  <p className="text-xs text-[#4A5568]/60 mt-1">We&apos;ll respond within 24 hours</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F7F9FC]">
                <div className="w-10 h-10 rounded-lg bg-[#1B3F8B] flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1B3F8B] mb-1">Office</h3>
                  <p className="text-[#4A5568]">Lajpat Nagar</p>
                  <p className="text-[#4A5568]">Gurugram – 122001, Haryana</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <ContactConsentForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="py-16 sm:py-24 bg-[#F7F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B3F8B] mb-6 text-balance">Prefer to Talk Over the Phone?</h2>
          <p className="text-lg text-[#4A5568] mb-8 leading-relaxed">
            Our team is available for immediate consultation. Call us now for a free, personalized financial assessment.
          </p>
          <a
            href="tel:9053903719"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1B3F8B] text-white font-bold rounded-xl hover:bg-[#142f6b] transition-all duration-200 shadow-lg"
          >
            <Phone size={18} />
            Call Now: +91 9053903719
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
