"use client"

import { motion } from "framer-motion"

interface CrmFormSectionProps {
  title?: string
  subtitle?: string
  description?: string
  formUrl?: string
  id?: string
}

export default function CrmFormSection({
  title = "Get Help Now",
  subtitle = "Expert Financial Assistance",
  description = "Fill out the form below and our team will get back to you within 24 hours with a customized solution for your financial problem.",
  formUrl = "https://crm.credsmadhan.com/forms/wtl/7e9a121da0019a4716296a5fcbaf7a2c",
  id = "crm-form-section",
}: CrmFormSectionProps) {
  return (
    <section id={id} className="py-12 md:py-16 bg-gradient-to-b from-white to-[#F9FAFB] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#F0A500]/20 text-[#F0A500] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            {subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B3F8B] mb-4">
            {title}
          </h2>
          <p className="text-lg text-[#4A5568] max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl border-2 border-[#E2E8F0] shadow-lg overflow-hidden"
        >
          {/* Responsive iframe container */}
          <div className="relative w-full" style={{ paddingBottom: "85%" }}>
            <iframe
              src={formUrl}
              frameBorder="0"
              sandbox="allow-top-navigation allow-forms allow-scripts allow-same-origin allow-popups"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              title="CRM Contact Form"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Security note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-[#718096] flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414L8.586 5 7.172 3.586a1 1 0 111.414-1.414l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L8.586 8l-3.293 3.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Your information is secure and will be kept confidential
          </p>
        </motion.div>
      </div>
    </section>
  )
}
