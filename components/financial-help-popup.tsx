"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function FinancialHelpPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", problem: "" })

  useEffect(() => {
    // Check if popup was already shown
    const popupShown = localStorage.getItem("financialHelpPopupShown")
    
    if (!popupShown) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
        // Mark popup as shown
        localStorage.setItem("financialHelpPopupShown", "true")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    setIsOpen(false)
    setFormData({ name: "", phone: "", problem: "" })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-[#4A5568] hover:text-[#1B3F8B] transition-colors"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-[#1B3F8B] mb-3 pr-6">
                  Need Financial Help?
                </h2>
                <p className="text-[#4A5568] mb-6">
                  Get a free consultation from our experts.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#E2E8F0] focus:border-[#1B3F8B] focus:outline-none transition-colors text-[#4A5568]"
                    required
                  />

                  {/* Phone */}
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#E2E8F0] focus:border-[#1B3F8B] focus:outline-none transition-colors text-[#4A5568]"
                    required
                  />

                  {/* Problem Select */}
                  <select
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#E2E8F0] focus:border-[#1B3F8B] focus:outline-none transition-colors text-[#4A5568]"
                    required
                  >
                    <option value="">Select Your Problem</option>
                    <option value="credit-cibil">Credit & CIBIL Issues</option>
                    <option value="loan-emi">Loan & EMI Stress</option>
                    <option value="banking">Banking & Credit Card</option>
                    <option value="insurance">Insurance Issues</option>
                    <option value="unclaimed">Unclaimed Money</option>
                    <option value="grievance">Grievance & Escalation</option>
                    <option value="other">Other</option>
                  </select>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#F0A500] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 text-lg"
                  >
                    Get Free Call Back
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
