"use client"

import Image from "next/image"
import { useState } from "react"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  { name: "Credit & CIBIL Analysis", slug: "credit-cibil-analysis" },
  { name: "Loan & EMI Stress Guidance", slug: "loan-emi-stress-guidance" },
  { name: "Banking & Credit Card Support", slug: "banking-credit-card-support" },
  { name: "Cyber Fraud Complaint Support", slug: "cyber-fraud-support" },
  { name: "Insurance Issue Assistance", slug: "insurance-issue-assistance" },
  { name: "Unclaimed Money Support", slug: "unclaimed-money-support" },
  { name: "Grievance & Complaint Escalation", slug: "grievance-complaint-escalation" },
  { name: "Documentation & Case Facilitation", slug: "documentation-case-facilitation" },
]

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Solutions", href: "/services" },
  { label: "Why Choose Us", href: "/#why-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Hiring", href: "/hiring" },
]

const disclaimer = `Credsmadhan (Arthvera LLP) is a financial assistance and facilitation platform. We provide guidance and process-based support — we are not a bank, NBFC, or financial institution. We do not guarantee outcomes. All financial decisions should be made by the individual after independent assessment.`

const socialLinks = [
  { icon: Facebook, label: "Facebook", url: "https://www.facebook.com/credsmadhan/" },
  { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/credsmadhan/" },
  { icon: Twitter, label: "Twitter", url: "https://x.com/credsmadhan" },
  { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/company/credsmadhan/" },
]

export default function Footer() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading") return

    setStatus("loading")
    setMessage("")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus("success")
        setMessage(data.message || "You've been subscribed successfully.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  return (
    <footer className="bg-white text-[#0E2454] border-t-4 border-[#1B3F8B]">

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2 mt-0"
          >
            <Image
              src="/images/credsmadhan-horizontal-logo.png"
              alt="Credsmadhan"
              width={320}
              height={100}
              className="h-20 md:h-24 w-auto object-contain block -mt-3 md:-mt-4"
            />

            <p className="text-sm text-gray-600 leading-relaxed">
              India's trusted financial problem resolution platform. Transparent, process-driven support for credit, banking, and insurance issues.
            </p>

            <div className="flex flex-col gap-1.5 text-sm">
              <a href="tel:9053903719" className="flex items-center gap-2 text-gray-700 hover:text-[#F0A500]">
                <Phone size={14} className="text-[#F0A500]" />
                +91 9053903719
              </a>
              <a href="mailto:support@credsmadhan.com" className="flex items-center gap-2 text-gray-700 hover:text-[#F0A500]">
                <Mail size={14} className="text-[#F0A500]" />
                support@credsmadhan.com
              </a>
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin size={14} className="text-[#F0A500] mt-0.5" />
                Gurugram, Haryana, India
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-[#F0A500] text-[#0E2454] hover:text-white transition"
                  >
                    <Icon size={15} />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-3 border-b border-gray-200 pb-1">
              Our Solutions
            </h4>
            <ul className="space-y-1.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={`/services/${s.slug}`} className="text-sm text-gray-600 hover:text-[#F0A500]">
                    • {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-3 border-b border-gray-200 pb-1">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-gray-600 hover:text-[#F0A500]">
                    • {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-3 border-b border-gray-200 pb-1">
              Get Free Guidance
            </h4>

            <p className="text-sm text-gray-600 mb-3">
              Have a financial issue? Talk to our experts today.
            </p>

            <a href="tel:9053903719" className="block text-center px-4 py-2 bg-[#F0A500] text-[#1B3F8B] font-bold rounded-lg hover:bg-[#F7C04A] text-sm">
              Call Now
            </a>

            <a href="mailto:support@credsmadhan.com" className="block text-center px-4 py-2 mt-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#F0A500] hover:text-[#F0A500] text-sm">
              Email Us
            </a>

            <p className="text-xs text-gray-500 mt-2">
              Mon – Sat | 10:00 AM – 7:00 PM
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                disabled={status === "loading"}
                className="bg-gray-100 px-3 py-2 text-sm rounded-lg w-full outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#F0A500] px-4 py-2 rounded-lg font-bold text-[#1B3F8B] text-sm hover:bg-[#F7C04A] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </form>

            {message && (
              <p
                className={`text-xs mt-2 ${
                  status === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-gray-500 text-center">{disclaimer}</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2">
          <span>© {new Date().getFullYear()} Credsmadhan</span>

          <div className="flex items-center gap-3">
            <a
              href="/terms-and-conditions"
              className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-600 hover:border-[#F0A500] hover:text-[#F0A500] transition"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="/privacy-policy"
              className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-600 hover:border-[#F0A500] hover:text-[#F0A500] transition"
            >
              Privacy Policy
            </a>
          </div>

          <span>Cred Ki Baat, Smadhan Ke Saath</span>
        </div>
      </div>

    </footer>
  )
}