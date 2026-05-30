'use client'

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export default function TermsAndConditionsPage() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  })

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using the Credsmadhan (Arthvera LLP) website and services, you agree to be bound by these Terms & Conditions.",
        "If you do not agree with any part of these terms, please do not use our website or services.",
        "We reserve the right to update or modify these terms at any time without prior notice.",
      ],
    },
    {
      title: "2. Nature of Our Services",
      content: [
        "Credsmadhan is a financial assistance and facilitation platform. We provide guidance and process-based support.",
        "We are NOT a bank, NBFC, or financial institution, and we do not lend money or provide financial products.",
        "We do not guarantee any specific outcomes, approvals, or results from our guidance.",
        "All financial decisions should be made by the individual after independent assessment.",
      ],
    },
    {
      title: "3. Eligibility",
      content: [
        "You must be at least 18 years of age to use our services.",
        "You must provide accurate, current, and complete information when requesting our services.",
        "You are responsible for maintaining the confidentiality of any account credentials.",
      ],
    },
    {
      title: "4. User Responsibilities",
      content: [
        "You agree to use our services only for lawful purposes.",
        "You will not provide false, misleading, or fraudulent information.",
        "You will not use our website in any way that could damage, disable, or impair its functionality.",
        "You are solely responsible for verifying any information before acting upon our guidance.",
      ],
    },
    {
      title: "5. Fees and Payments",
      content: [
        "Certain services may be subject to fees, which will be communicated to you before you proceed.",
        "All fees are for facilitation and guidance services only, not for guaranteed outcomes.",
        "Fees once paid are non-refundable unless otherwise stated in writing.",
      ],
    },
    {
      title: "6. Intellectual Property",
      content: [
        "All content on this website, including text, graphics, logos, and images, is the property of Credsmadhan (Arthvera LLP).",
        "You may not reproduce, distribute, or use our content without prior written permission.",
      ],
    },
    {
      title: "7. Limitation of Liability",
      content: [
        "Credsmadhan provides guidance on an 'as-is' basis and makes no warranties regarding outcomes.",
        "We shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our services.",
        "Any financial decisions made based on our guidance are your sole responsibility.",
      ],
    },
    {
      title: "8. Third-Party Links and Services",
      content: [
        "Our website may contain links to third-party websites or services.",
        "We are not responsible for the content, accuracy, or practices of any third-party websites.",
        "Engaging with third parties is at your own risk.",
      ],
    },
    {
      title: "9. Termination",
      content: [
        "We reserve the right to suspend or terminate your access to our services at any time, without notice, for any violation of these terms.",
        "Upon termination, your right to use our services will immediately cease.",
      ],
    },
    {
      title: "10. Governing Law",
      content: [
        "These Terms & Conditions are governed by the laws of India.",
        "Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Gurugram, Haryana.",
      ],
    },
    {
      title: "11. Changes to These Terms",
      content: [
        "We may revise these Terms & Conditions from time to time. Changes will be posted on this page with an updated 'Last Updated' date.",
        "Your continued use of our services after changes constitutes acceptance of the updated terms.",
      ],
    },
    {
      title: "12. Contact Us",
      content: [
        "If you have questions about these Terms & Conditions, please contact us:",
        "Email: support@credsmadhan.com",
        "Phone: +91 9053903719",
        "Address: New House No. 103, Lajpat Nagar, Near Community Centre, Gurugram – 122001, Haryana, India",
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1B3F8B] to-[#2a52a8] text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div {...fadeUp()} className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Terms &amp; Conditions</h1>
            <p className="text-white/80 text-lg">Please read these terms carefully before using our services.</p>
            <p className="text-white/60 text-sm mt-4">Last Updated: May 30, 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <motion.div {...fadeUp()} className="bg-[#F9FAFB] rounded-2xl p-8 border border-[#E2E8F0] mb-12">
          <h2 className="text-2xl font-bold text-[#1B3F8B] mb-4">Agreement to Our Terms</h2>
          <p className="text-[#4A5568] leading-relaxed">
            Welcome to Credsmadhan (Arthvera LLP). These Terms &amp; Conditions govern your use of our website and services. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please refrain from using our services.
          </p>
        </motion.div>
      </section>

      {/* Terms Sections */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-[#1B3F8B] mb-4 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-[#F0A500] text-white text-xs font-bold rounded-full">
                  {index + 1}
                </span>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3 text-[#4A5568] leading-relaxed">
                    <ChevronRight size={16} className="text-[#F0A500] shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1B3F8B] to-[#2a52a8] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
            <p className="text-white/80 mb-6">Contact our support team for any clarifications or concerns.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@credsmadhan.com"
                className="px-8 py-3 bg-[#F0A500] text-[#1B3F8B] font-bold rounded-xl hover:bg-[#F7C04A] transition-colors"
              >
                Email Us
              </a>
              <a
                href="tel:9053903719"
                className="px-8 py-3 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
              >
                Call: +91 9053903719
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
