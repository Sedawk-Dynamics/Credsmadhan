"use client"

import Link from "next/link"
import {
  FileSearch,
  FilePenLine,
  TrendingDown,
  CreditCard,
  ShieldCheck,
  Wallet,
  AlertCircle,
  ClipboardList,
  ArrowRight,
  Zap,
  Lock,
  CheckCircle2,
  Briefcase,
  Shield,
} from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    slug: "credit-cibil-analysis",
    icon: FileSearch,
    title: "Credit & CIBIL Analysis & Rectification",
    description:
      "Get detailed analysis of your credit bureau reports to identify errors, risk factors, and inconsistencies. We assist in raising and tracking disputes for incorrect entries, wrong balances, and outdated records — providing comprehensive credit improvement guidance.",
    color: "#1B3F8B",
    bg: "#E0EAFF",
    accent: "#3D6CB9",
    urgencyTag: "High Impact",
    combined: true,
  },
  {
    slug: "loan-emi-stress-guidance",
    icon: TrendingDown,
    title: "Loan & EMI Stress Guidance",
    description:
      "Support for individuals facing loan or EMI stress, including account review, repayment clarity and guidance on available resolution processes.",
    color: "#1B3F8B",
    bg: "#E0EAFF",
    accent: "#3D6CB9",
    urgencyTag: "Act Early",
  },
  {
    slug: "banking-credit-card-support",
    icon: CreditCard,
    title: "Banking & Credit Card Support",
    description:
      "Assistance with unauthorized transactions, incorrect charges, billing disputes and service-level grievances with banks and NBFCs.",
    color: "#F0A500",
    bg: "#FEF3D0",
    accent: "#FB923C",
    urgencyTag: "Resolve Fast",
  },
  {
    slug: "cyber-fraud-support",
    icon: Shield,
    title: "Cyber Fraud Complaint Support",
    description:
      "Comprehensive support for cyber fraud incidents including unauthorized access, digital fraud, online scams and cybercrime complaint filing.",
    color: "#EF4444",
    bg: "#FEE2E2",
    accent: "#F87171",
    urgencyTag: "Immediate Action",
  },
  {
    slug: "insurance-issue-assistance",
    icon: ShieldCheck,
    title: "Insurance Issue Assistance",
    description:
      "Guidance for insurance problems including mis-selling complaints, policy correction, claim-related issues and escalation support.",
    color: "#F0A500",
    bg: "#FEF3D0",
    accent: "#FB923C",
    urgencyTag: "Policy Check",
  },
  {
    slug: "unclaimed-money-support",
    icon: Wallet,
    title: "Unclaimed Money Support",
    description:
      "Assistance in identifying and claiming unclaimed money, dormant deposits, old bank accounts and IEPF-related matters.",
    color: "#10B981",
    bg: "#D1FAE5",
    accent: "#34D399",
    urgencyTag: "Claim Now",
  },
  {
    slug: "grievance-complaint-escalation",
    icon: AlertCircle,
    title: "Grievance & Complaint Escalation",
    description:
      "Support in drafting, filing and following up on complaints with banks, NBFCs, insurers, regulators and ombudsman offices.",
    color: "#F0A500",
    bg: "#FEF3D0",
    accent: "#FB923C",
    urgencyTag: "Escalate Smart",
  },
  {
    slug: "documentation-case-facilitation",
    icon: ClipboardList,
    title: "Documentation & Case Facilitation",
    description:
      "End-to-end assistance in preparing documents, representations and explanations for financial issue resolution and formal escalations.",
    color: "#1B3F8B",
    bg: "#E0EAFF",
    accent: "#3D6CB9",
    urgencyTag: "Structured Support",
  },
  {
    slug: "comprehensive-financial-problem-resolution",
    icon: Zap,
    title: "Comprehensive Financial Problem Resolution",
    description:
      "Our flagship service combining all expertise - from credit analysis to legal escalation. Complete financial problem resolution under one umbrella.",
    color: "#7C3AED",
    bg: "#F3E8FF",
    accent: "#A78BFA",
    urgencyTag: "Complete Solution",
  },
  {
    slug: "workplace-posh-complaints",
    icon: Briefcase,
    title: "Workplace & POSH Complaints Support",
    description:
      "Expert guidance on workplace disputes, sexual harassment (POSH), labor law violations and employee grievance redressal through proper channels.",
    color: "#EC4899",
    bg: "#FCE7F3",
    accent: "#F472B6",
    urgencyTag: "Protect Rights",
  },
  {
    slug: "recovery-sarfaesi-action",
    icon: TrendingDown,
    title: "Recovery & SARFAESI Action Support",
    description:
      "Strategic guidance on SARFAESI proceedings, debt recovery, asset seizure and legal remedies with expert coordination and negotiation.",
    color: "#F59E0B",
    bg: "#FEF3C7",
    accent: "#FBBF24",
    urgencyTag: "Legal Action",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1B3F8B]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section header - Enhanced with urgency messaging */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FEF3D0] to-[#E0EAFF] rounded-full mb-6 border border-[#F0A500]/30">
            <Zap size={14} className="text-[#F0A500]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B3F8B]">
              Immediate Solutions Available
            </span>
            <Zap size={14} className="text-[#F0A500]" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B3F8B] text-balance mb-6 leading-tight">
            Comprehensive Financial
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F0A500] to-[#FB923C]">
              Problem Resolution
            </span>
          </h2>

          <p className="mt-6 text-lg text-[#4A5568] max-w-3xl mx-auto leading-relaxed font-medium">
            Don&apos;t let financial problems compound. We provide immediate, process-based assistance for credit, banking, loans, and insurance issues — with guaranteed clarity and transparent communication.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm font-semibold">
            <div className="flex items-center gap-2 text-[#10B981]">
              <CheckCircle2 size={16} className="fill-[#10B981]" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2 text-[#10B981]">
              <CheckCircle2 size={16} className="fill-[#10B981]" />
              <span>48-Hour Response</span>
            </div>
            <div className="flex items-center gap-2 text-[#10B981]">
              <CheckCircle2 size={16} className="fill-[#10B981]" />
              <span>100% Confidential</span>
            </div>
          </div>
        </motion.div>

        {/* Services grid - Enhanced with card design */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 items-stretch"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.slug}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl border-2 border-[#E2E8F0] overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-[#F0A500]/50 hover:-translate-y-2"
              >
                {/* Top gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${service.color}, ${service.accent})`,
                  }}
                />

                {/* Urgency badge */}
                <div className="absolute top-4 right-4 z-10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: service.accent }}
                  >
                    {service.urgencyTag}
                  </motion.div>
                </div>

                {/* Card content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Icon with gradient background */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: service.bg }}
                  >
                    <Icon
                      size={24}
                      style={{ color: service.color }}
                      className="stroke-2"
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-semibold text-[#1B3F8B] text-base mb-3 leading-snug group-hover:text-[#F0A500] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed flex-1">
                    {service.description}
                  </p>
                </div>

                {/* Learn More Button */}
                <div className="px-6 pb-6 pt-3 border-t border-[#E2E8F0]">
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 group/btn text-white hover:shadow-lg hover:-translate-y-0.5 transform"
                    style={{ backgroundColor: service.color }}
                  >
                    <span>Learn More</span>
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>

                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: service.color }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA to explore all services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-[#4A5568] mb-6 font-medium">
            Not sure which service you need?
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#1B3F8B] to-[#2a52a8] text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group"
          >
            <Lock size={18} />
            <span>Get Free Expert Consultation</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
