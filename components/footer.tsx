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
  // { label: "Privacy Policy", href: "/privacy-policy" },
]

const disclaimer = `Credsmadhan (Arthvera LLP) is a financial assistance and facilitation platform. We provide guidance and process-based support — we are not a bank, NBFC, or financial institution. We do not guarantee outcomes. All financial decisions should be made by the individual after independent assessment.`

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    url: "https://www.facebook.com/credsmadhan/"
  },
  {
    icon: Instagram,
    label: "Instagram",
    url: "https://www.instagram.com/credsmadhan/"
  },
  {
    icon: Twitter,
    label: "Twitter",
    url: "https://x.com/credsmadhan"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/credsmadhan/"
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0E2454] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-1 flex flex-col gap-5"
          >
            <Image
              src="/images/credsmadhan-logo.png"
              alt="Credsmadhan"
              width={220}
              height={100}
              className="h-20 w-auto object-contain brightness-0 invert"
            />
            <p className="text-sm text-white/60 leading-relaxed">
              India&apos;s trusted financial problem resolution platform. Process-driven, transparent, and honest assistance for credit, CIBIL, banking, and insurance issues.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:9053903719" className="flex items-center gap-2 text-white/70 hover:text-[#F0A500] transition-colors">
                <Phone size={14} className="text-[#F0A500]" />
                +91 9053903719
              </a>
              <a href="mailto:support@credsmadhan.com" className="flex items-center gap-2 text-white/70 hover:text-[#F0A500] transition-colors">
                <Mail size={14} className="text-[#F0A500]" />
                support@credsmadhan.com
              </a>
              <div className="flex items-start gap-2 text-white/70">
                <MapPin size={14} className="text-[#F0A500] mt-0.5 shrink-0" />
                <span>New House No. 103, Lajpat Nagar, Near Community Centre, Gurugram – 122001, Haryana, India</span>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/10 rounded-full hover:bg-[#F0A500] text-white hover:text-[#0E2454] transition-all duration-200 group"
                    title={social.label}
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
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="font-semibold text-white text-base mb-5 border-b border-white/10 pb-3">
              Our Solutions
            </h4>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={`/services/${s.slug}`} className="text-sm text-white/60 hover:text-[#F0A500] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#F0A500] shrink-0" />
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="font-semibold text-white text-base mb-5 border-b border-white/10 pb-3">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/60 hover:text-[#F0A500] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#F0A500] shrink-0" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA / Hours */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="font-semibold text-white text-base mb-5 border-b border-white/10 pb-3">
              Get Free Guidance
            </h4>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Have a credit or financial issue? Reach out to us for a free initial consultation.
            </p>
            <a
              href="tel:9053903719"
              className="block text-center px-5 py-3 bg-[#F0A500] text-[#1B3F8B] font-bold rounded-xl hover:bg-[#F7C04A] transition-colors text-sm"
            >
              Call: +91 9053903719
            </a>
            <a
              href="mailto:support@credsmadhan.com"
              className="block text-center px-5 py-3 mt-2 border border-white/20 text-white/70 rounded-xl hover:border-[#F0A500] hover:text-[#F0A500] transition-colors text-sm"
            >
              Email Us
            </a>
            <div className="mt-5">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Working Hours</p>
              <p className="text-sm text-white/70">Monday – Saturday</p>
              <p className="text-sm text-white/70">10:00 AM – 7:00 PM</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10 bg-[#0b1c3e]">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <p className="text-xs text-white/40 leading-relaxed text-center">{disclaimer}</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-[#091628]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Credsmadhan – Arthvera LLP. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Cred Ki Baat, Smadhan Ke Saath
          </p>
        </div>
      </div>
    </footer>
  )
}
