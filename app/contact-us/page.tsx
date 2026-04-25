"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Send, Loader } from "lucide-react"
import Link from "next/link"

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact-send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })

      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24 bg-gradient-to-br from-[#1B3F8B] to-[#2a52a8] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">Get In Touch</h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Have questions about our services? We&apos;re here to help. Reach out to our team for a free consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
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
              <div className="bg-gradient-to-br from-[#F7F9FC] to-[#F0F6FF] rounded-2xl p-8 border border-[#1B3F8B]/10">
                <h2 className="font-serif text-2xl font-bold text-[#1B3F8B] mb-6">Send Us a Message</h2>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700"
                  >
                    Thank you for your message! We&apos;ll get back to you within 24 hours.
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#1B3F8B] mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-lg border border-[#1B3F8B]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/30 focus:border-[#1B3F8B] transition-all"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#1B3F8B] mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-[#1B3F8B]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/30 focus:border-[#1B3F8B] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#1B3F8B] mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXXXXXXX"
                        className="w-full px-4 py-3 rounded-lg border border-[#1B3F8B]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/30 focus:border-[#1B3F8B] transition-all"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-[#1B3F8B] mb-2">
                      Service Required
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[#1B3F8B]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/30 focus:border-[#1B3F8B] transition-all text-[#4A5568]"
                    >
                      <option value="">Select a service...</option>
                      <option>Credit & CIBIL Analysis & Rectification</option>
                      <option>Loan & EMI Stress Guidance</option>
                      <option>Banking & Credit Card Support</option>
                      <option>Insurance Issue Assistance</option>
                      <option>Unclaimed Money Support</option>
                      <option>Grievance & Complaint Escalation</option>
                      <option>Documentation & Case Facilitation</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#1B3F8B] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe your financial issue or query in detail..."
                      className="w-full px-4 py-3 rounded-lg border border-[#1B3F8B]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/30 focus:border-[#1B3F8B] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-[#1B3F8B] text-white font-bold rounded-lg hover:bg-[#142f6b] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="py-16 md:py-24 bg-[#F7F9FC]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B3F8B] mb-6">Prefer to Talk Over the Phone?</h2>
          <p className="text-lg text-[#4A5568] mb-8 leading-relaxed">
            Our team is available for immediate consultation. Call us now for a free, personalized financial assessment.
          </p>
          <a
            href="tel:9053903719"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1B3F8B] text-white font-bold rounded-xl hover:bg-[#142f6b] transition-all duration-200 shadow-lg"
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
