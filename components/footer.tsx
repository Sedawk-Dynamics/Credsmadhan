"use client"

import Image from "next/image"
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
  return (
    <footer className="bg-white text-[#0E2454] border-t-4 border-[#1B3F8B]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <Image
              src="/images/credsmadhan-horizontal-logo.png"
              alt="Credsmadhan"
              width={320}
              height={100}
              className="h-28 w-auto object-contain"
            />

            <p className="text-sm text-gray-600">
              India's trusted financial problem resolution platform. Transparent, process-driven support for credit, banking, and insurance issues.
            </p>

            <div className="flex flex-col gap-2 text-sm">
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
                    className="p-2.5 bg-gray-100 rounded-full hover:bg-[#F0A500] text-[#0E2454] hover:text-white transition"
                  >
                    <Icon size={16} />
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
            <h4 className="font-semibold mb-4 border-b border-gray-200 pb-2">Our Solutions</h4>
            <ul className="space-y-2">
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
            <h4 className="font-semibold mb-4 border-b border-gray-200 pb-2">Quick Links</h4>
            <ul className="space-y-2">
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
            <h4 className="font-semibold mb-4 border-b border-gray-200 pb-2">Get Free Guidance</h4>
            <p className="text-sm text-gray-600 mb-4">
              Have a financial issue? Talk to our experts today.
            </p>

            <a href="tel:9053903719" className="block text-center px-4 py-2 bg-[#F0A500] text-[#1B3F8B] font-bold rounded-lg hover:bg-[#F7C04A]">
              Call Now
            </a>

            <a href="mailto:support@credsmadhan.com" className="block text-center px-4 py-2 mt-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#F0A500] hover:text-[#F0A500]">
              Email Us
            </a>

            <div className="mt-2">
              <p className="text-xs text-gray-500">Mon – Sat | 10:00 AM – 7:00 PM</p>
            </div>

            <div className="flex gap-2 mt-2">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-gray-100 px-3 py-2 text-sm rounded-lg w-full outline-none"
              />
              <button className="bg-[#F0A500] px-4 py-2 rounded-lg font-bold text-[#1B3F8B] hover:bg-[#F7C04A]">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-xs text-gray-500 text-center">{disclaimer}</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Credsmadhan</span>
          <span>Cred Ki Baat, Smadhan Ke Saath</span>
        </div>
      </div>
    </footer>
  )
}
