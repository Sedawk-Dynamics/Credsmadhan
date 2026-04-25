'use client'

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export default function PrivacyPolicyPage() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  })

  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, and financial information you provide when requesting our services.",
        "Usage Data: Information about how you interact with our website, including pages visited, time spent, and devices used.",
        "Cookies and Tracking: We use cookies and similar technologies to enhance your experience and analyze site usage.",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "Provide and improve our financial assistance services",
        "Communicate with you about your requests and services",
        "Analyze trends and improve our website performance",
        "Send promotional materials (with your consent)",
        "Comply with legal and regulatory requirements",
      ],
    },
    {
      title: "3. Information Sharing and Disclosure",
      content: [
        "We do NOT sell your personal information to third parties.",
        "We may share information with service providers who assist us in delivering our services under confidentiality agreements.",
        "We may disclose information if required by law or to protect our legal rights.",
        "Business transfers: If Credsmadhan is involved in a merger or acquisition, your data may be transferred as part of that transaction.",
      ],
    },
    {
      title: "4. Data Security",
      content: [
        "We implement industry-standard security measures to protect your personal information, including SSL encryption.",
        "However, no transmission over the internet is 100% secure. We cannot guarantee absolute security.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
      ],
    },
    {
      title: "5. Your Privacy Rights",
      content: [
        "You have the right to access, update, or delete your personal information.",
        "You can opt-out of promotional communications at any time.",
        "You can request a copy of the personal data we hold about you.",
        "Contact us at support@credsmadhan.com to exercise these rights.",
      ],
    },
    {
      title: "6. Retention of Information",
      content: [
        "We retain your personal information only as long as necessary to provide our services and comply with legal obligations.",
        "After completing your consultation or request, we retain information as required by law or for legitimate business purposes.",
      ],
    },
    {
      title: "7. Cookies and Tracking Technologies",
      content: [
        "Our website uses cookies to enhance user experience, remember preferences, and analyze site usage.",
        "You can control cookie settings through your browser; however, some features may not function properly if cookies are disabled.",
      ],
    },
    {
      title: "8. Third-Party Links",
      content: [
        "Our website may contain links to third-party websites.",
        "We are not responsible for the privacy practices of external websites. Please review their privacy policies.",
      ],
    },
    {
      title: "9. Children's Privacy",
      content: [
        "Our services are not directed to individuals under 18 years of age.",
        "We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete it immediately.",
      ],
    },
    {
      title: "10. Policy Changes",
      content: [
        "We may update this Privacy Policy periodically. Changes will be posted on this page with an updated 'Last Updated' date.",
        "Your continued use of our website after changes constitutes acceptance of the updated policy.",
      ],
    },
    {
      title: "11. Contact Us",
      content: [
        "If you have questions about this Privacy Policy or our privacy practices, please contact us:",
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
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Privacy Policy</h1>
            <p className="text-white/80 text-lg">Your privacy matters to us. Learn how we protect your personal information.</p>
            <p className="text-white/60 text-sm mt-4">Last Updated: April 2, 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <motion.div {...fadeUp()} className="bg-[#F9FAFB] rounded-2xl p-8 border border-[#E2E8F0] mb-12">
          <h2 className="text-2xl font-bold text-[#1B3F8B] mb-4">Our Commitment to Privacy</h2>
          <p className="text-[#4A5568] leading-relaxed">
            Credsmadhan (Arthvera LLP) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully. If you do not agree with our policies and practices, please do not use our services.
          </p>
        </motion.div>
      </section>

      {/* Policy Sections */}
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
            <h2 className="text-2xl font-bold mb-4">Questions About Our Privacy Policy?</h2>
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
