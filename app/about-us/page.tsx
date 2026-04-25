"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { CheckCircle2, Users, Target, Award } from "lucide-react"
import Link from "next/link"

export default function AboutUsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
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
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              About Credsmadhan
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              India&apos;s most trusted platform for resolving financial problems with process-driven solutions and complete transparency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Mission */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#E0EAFF] to-[#F0F6FF] rounded-2xl p-8 border border-[#1B3F8B]/10">
              <div className="w-12 h-12 rounded-lg bg-[#1B3F8B] flex items-center justify-center mb-4">
                <Target size={24} className="text-white" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B3F8B] mb-3">Our Mission</h3>
              <p className="text-[#4A5568] leading-relaxed">
                To empower millions of Indians by providing transparent, process-based assistance for financial problem resolution.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#FEF3D0] to-[#FFF9E6] rounded-2xl p-8 border border-[#F0A500]/20">
              <div className="w-12 h-12 rounded-lg bg-[#F0A500] flex items-center justify-center mb-4">
                <Award size={24} className="text-[#1B3F8B]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B3F8B] mb-3">Our Vision</h3>
              <p className="text-[#4A5568] leading-relaxed">
                To become India&apos;s most trusted financial problem resolution platform by combining data-driven processes with human expertise.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold text-[#1B3F8B] text-center mb-12"
          >
            Why Choose Credsmadhan?
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Users,
                title: "Expert Team",
                description: "Experienced professionals with 10+ years in credit and banking resolution.",
              },
              {
                icon: CheckCircle2,
                title: "Process-Driven",
                description: "Transparent, systematic approach to ensure consistent and reliable results.",
              },
              {
                icon: Target,
                title: "100% Confidential",
                description: "Your financial data is secure with enterprise-grade encryption.",
              },
              {
                icon: Award,
                title: "Proven Track Record",
                description: "Successfully resolved 500+ financial cases with 95% satisfaction.",
              },
              {
                icon: CheckCircle2,
                title: "No Hidden Fees",
                description: "Complete transparency with clear breakdown of all charges.",
              },
              {
                icon: Users,
                title: "24/7 Support",
                description: "Dedicated team available round-the-clock for your queries.",
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#E0EAFF] flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[#1B3F8B]" />
                  </div>
                  <h3 className="font-semibold text-[#1B3F8B] text-lg mb-2">{item.title}</h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold text-[#1B3F8B] text-center mb-12"
          >
            Our Core Values
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { value: "Integrity", desc: "Complete honesty in all dealings" },
              { value: "Transparency", desc: "Clear communication, no hidden agendas" },
              { value: "Excellence", desc: "Highest standards in service delivery" },
              { value: "Client-First", desc: "Your success is our priority" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-[#E0EAFF] to-[#F0F6FF] border border-[#1B3F8B]/10"
              >
                <h3 className="font-semibold text-[#1B3F8B] text-lg mb-2">{item.value}</h3>
                <p className="text-[#4A5568] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#1B3F8B] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready to Resolve Your Financial Issues?</h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Join thousands of satisfied clients who have transformed their financial health.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F0A500] text-[#1B3F8B] font-bold rounded-xl hover:bg-[#F7C04A] transition-all duration-200"
            >
              Get Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Arthvera LLP */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              About <span className="text-[#1B3F8B]">Arthvera LLP</span>
            </h2>
            <p className="text-xl text-[#4A5568] max-w-3xl mx-auto">
              The legal entity behind FinSmadhan - India&apos;s leading financial recovery platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl border-2 border-[#E2E8F0] p-8 md:p-12 shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left - Company Profile */}
              <div>
                <h3 className="text-2xl font-bold text-[#1B3F8B] mb-6 pb-3 border-b-4 border-[#F0A500]">
                  Company Profile
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#4A5568] font-semibold">Legal Name:</p>
                    <p className="text-lg font-bold text-[#1B3F8B]">Arthvera LLP</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#4A5568] font-semibold">LLPIN:</p>
                    <p className="text-lg font-bold text-[#F0A500]">ACU-4028</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#4A5568] font-semibold">PAN:</p>
                    <p className="text-lg font-bold text-[#F0A500]">ACMFA8924H</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#4A5568] font-semibold">TAN:</p>
                    <p className="text-lg font-bold text-[#F0A500]">RTKA33251B</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#4A5568] font-semibold">Incorporated:</p>
                    <p className="text-lg font-bold text-[#1B3F8B]">16 January 2026</p>
                  </div>
                </div>
              </div>

              {/* Right - Registered Address & Brand */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#1B3F8B] mb-6 pb-3 border-b-4 border-[#10B981]">
                    Registered Address
                  </h3>
                  <div className="bg-[#F0FFFE] rounded-xl p-6 border-2 border-[#10B981]">
                    <p className="text-[#1B3F8B] font-semibold mb-2">New House No. 103</p>
                    <p className="text-[#4A5568]">Lajpat Nagar</p>
                    <p className="text-[#4A5568]">Near Community Centre</p>
                    <p className="text-[#1B3F8B] font-semibold mt-3">Gurugram – 122001</p>
                    <p className="text-[#1B3F8B] font-semibold">Haryana, India</p>
                  </div>
                </div>

                {/* Brand Identity */}
                <div className="bg-gradient-to-br from-[#1B3F8B] to-[#2a52a8] rounded-xl p-6 text-white">
                  <div className="flex items-start gap-3 mb-3">
                    <Award size={24} className="text-[#F0A500] flex-shrink-0 mt-1" />
                    <h4 className="text-xl font-bold">Brand Identity</h4>
                  </div>
                  <p className="text-white/90">
                    FinSmadhan is the registered brand name of Arthvera LLP, operating as India&apos;s most trusted platform for financial dispute resolution and recovery services.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Startup India Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-[#1B3F8B]">
              Startup India Recognized
            </h2>
            <p className="text-lg text-[#4A5568] max-w-2xl mx-auto">
              Arthvera LLP is recognized and approved by the Government of India under the Startup India initiative
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-[#F0A500]/10 to-[#10B981]/10 rounded-3xl p-12 border-2 border-[#F0A500] flex items-center justify-center min-h-96"
          >
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full border-4 border-[#F0A500] flex items-center justify-center">
                <Award size={64} className="text-[#F0A500]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1B3F8B] mb-3">Startup India Certificate</h3>
              <p className="text-[#4A5568] max-w-md mx-auto">
                Registered under Government of India&apos;s Startup India initiative, promoting innovation and entrepreneurship in financial services.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
