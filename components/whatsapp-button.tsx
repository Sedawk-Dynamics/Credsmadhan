"use client"

import { Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function WhatsAppButton() {
  const phoneNumber = "919053903719"
  const message = "Hi, I'd like to know more about your financial assistance services."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <>
      {/* Desktop WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-2xl hover:bg-[#20ba58] transition-all duration-300 group"
        aria-label="Contact us on WhatsApp"
      >
        <Phone size={24} className="group-hover:scale-110 transition-transform fill-white" />
        <motion.span 
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: -5 }}
          className="absolute -left-36 bg-[#25D366] text-white text-sm font-medium px-4 py-2 rounded-lg pointer-events-none whitespace-nowrap shadow-lg"
        >
          Chat with us
        </motion.span>
      </motion.a>

      {/* Mobile WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="flex sm:hidden fixed bottom-4 right-4 z-40 items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-xl hover:shadow-2xl hover:bg-[#20ba58] transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <Phone size={20} className="fill-white" />
      </motion.a>
    </>
  )
}
