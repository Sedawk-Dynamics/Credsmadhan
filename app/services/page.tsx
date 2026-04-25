"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
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
  ArrowLeft,
  Shield,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"

const iconMap = {
  FileSearch,
  FilePenLine,
  TrendingDown,
  CreditCard,
  ShieldCheck,
  Wallet,
  AlertCircle,
  ClipboardList,
  Zap,
}

const services = [
  {
    slug: "credit-cibil-analysis",
    iconName: "FileSearch",
    title: "CIBIL report and correction report",
    shortDescription: "Understanding Your Credit Health",
    fullDescription:
      "Get a detailed analysis of your credit bureau reports to identify errors, risk factors, and inconsistencies. We provide structured guidance on credit improvement and score enhancement.",
    color: "#1B3F8B",
    bg: "#E0EAFF",
    accent: "#3D6CB9",
    badge: "High Impact",
    benefits: [
      "Comprehensive credit report review",
      "Error and discrepancy identification",
      "Personalized improvement roadmap",
      "Risk factor analysis",
    ],
  },
  // {
  //   slug: "credit-report-rectification",
  //   iconName: "FilePenLine",
  //   title: "Credit Report Rectification",
  //   shortDescription: "Fix Errors In Your Credit Report",
  //   fullDescription:
  //     "We assist in raising and tracking disputes for incorrect loan entries, wrong balances, and outdated records across all credit bureaus with a structured process.",
  //   color: "#2a52a8",
  //   bg: "#E0EAFF",
  //   accent: "#1B3F8B",
  //   badge: "High Impact",
  //   benefits: [
  //     "Dispute filing and tracking",
  //     "Bureau communication handling",
  //     "Documentation support",
  //     "Resolution follow-up",
  //   ],
  // },
  {
    slug: "loan-emi-stress-guidance",
    iconName: "TrendingDown",
    title: "Debt Stress & Loan Guidance",
    shortDescription: "Navigate Loan And EMI Challenges",
    fullDescription:
      "Specialized support for individuals facing loan or EMI stress, including account review, repayment clarity, and guidance on all available resolution options.",
    color: "#1B3F8B",
    bg: "#E0EAFF",
    accent: "#3D6CB9",
    badge: "Act Early",
    benefits: [
      "Stress assessment and planning",
      "Repayment restructuring guidance",
      "Negotiation support",
      "Legal resolution options",
    ],
  },
  {
    slug: "banking-credit-card-support",
    iconName: "CreditCard",
    title: "Banking & Credit Card Dispute Support",
    shortDescription: "Banking Issues? We&apos;ve Got Solutions",
    fullDescription:
      "Assistance with unauthorized transactions, incorrect charges, billing disputes and service-level grievances with banks, credit card companies and NBFCs.",
    color: "#F0A500",
    bg: "#FEF3D0",
    accent: "#FB923C",
    badge: "Resolve Fast",
    benefits: [
      "Fraud claim assistance",
      "Billing dispute resolution",
      "Service complaint filing",
      "NBFC grievance handling",
    ],
  },
  {
    slug: "cyber-fraud-support",
    iconName: "AlertCircle",
    title: "Cyber Fraud Complaint Support",
    shortDescription: "Protect Against Cyber Fraud",
    fullDescription:
      "Comprehensive support for cyber fraud incidents including unauthorized access, digital fraud, online scams and cybercrime complaint filing with authorities.",
    color: "#EF4444",
    bg: "#FEE2E2",
    accent: "#F87171",
    badge: "Immediate Action",
    benefits: [
      "Fraud incident documentation",
      "Cybercrime complaint filing",
      "Evidence collection support",
      "Authority coordination",
    ],
  },
  {
    slug: "insurance-issue-assistance",
    iconName: "ShieldCheck",
    title: "Insurance Mis-Selling & Policy Issue Support",
    shortDescription: "Resolve Insurance Disputes",
    fullDescription:
      "Comprehensive guidance for insurance problems including mis-selling complaints, policy corrections, claim issues and escalation support with insurers.",
    color: "#F0A500",
    bg: "#FEF3D0",
    accent: "#FB923C",
    badge: "Policy Check",
    benefits: [
      "Policy review and analysis",
      "Claim assistance",
      "Complaint filing support",
      "Ombudsman escalation",
    ],
  },
  {
    slug: "unclaimed-money-support",
    iconName: "Wallet",
    title: "Unclaimed Money & Recovery Support",
    shortDescription: "Recover Your Unclaimed Funds",
    fullDescription:
      "Expert assistance in identifying and claiming unclaimed money, dormant deposits, old bank accounts and IEPF-related funds.",
    color: "#10B981",
    bg: "#D1FAE5",
    accent: "#34D399",
    badge: "Claim Now",
    benefits: [
      "Fund identification search",
      "Claim application assistance",
      "Documentation support",
      "Recovery tracking",
    ],
  },
  {
    slug: "grievance-complaint-escalation",
    iconName: "AlertCircle",
    title: "Grievance & Complaint Escalation Support",
    shortDescription: "Get Your Voice Heard",
    fullDescription:
      "Professional support in drafting, filing and following up on complaints with banks, NBFCs, insurers, regulators and ombudsman offices.",
    color: "#F0A500",
    bg: "#FEF3D0",
    accent: "#FB923C",
    badge: "Escalate Smart",
    benefits: [
      "Complaint drafting",
      "Filing assistance",
      "Regulator communication",
      "Ombudsman representation",
    ],
  },
  {
    slug: "documentation-case-facilitation",
    iconName: "ClipboardList",
    title: "Documentation & Case Facilitation Support",
    shortDescription: "Complete Documentation Support",
    fullDescription:
      "End-to-end assistance in preparing documents, representations and explanations for financial issue resolution and formal escalations.",
    color: "#1B3F8B",
    bg: "#E0EAFF",
    accent: "#3D6CB9",
    badge: "Structured Support",
    benefits: [
      "Document preparation",
      "Legal representation drafting",
      "Submission coordination",
      "Follow-up management",
    ],
  },
  {
    slug: "comprehensive-financial-problem-resolution",
    iconName: "Zap",
    title: "Comprehensive Financial Problem Resolution",
    shortDescription: "All-in-One Financial Solutions",
    fullDescription:
      "Our flagship service combining all expertise - from credit analysis to legal escalation. Complete financial problem resolution under one umbrella.",
    color: "#7C3AED",
    bg: "#F3E8FF",
    accent: "#A78BFA",
    badge: "Complete Solution",
    benefits: [
      "Multi-problem analysis",
      "Integrated resolution",
      "Single-point coordination",
      "End-to-end support",
    ],
  },
  {
    slug: "workplace-posh-complaints",
    iconName: "AlertCircle",
    title: "Workplace & POSH Complaints Support",
    shortDescription: "Workplace Rights Protection",
    fullDescription:
      "Expert guidance on workplace disputes, sexual harassment (POSH), labor law violations and employee grievance redressal through proper channels.",
    color: "#EC4899",
    bg: "#FCE7F3",
    accent: "#F472B6",
    badge: "Protect Rights",
    benefits: [
      "POSH complaint guidance",
      "Labor law expertise",
      "Grievance documentation",
      "Authority coordination",
    ],
  },
  {
    slug: "recovery-sarfaesi-action",
    iconName: "TrendingDown",
    title: "Recovery & SARFAESI Action Support",
    shortDescription: "Debt Recovery & Legal Action",
    fullDescription:
      "Strategic guidance on SARFAESI proceedings, debt recovery, asset seizure and legal remedies with expert coordination and negotiation.",
    color: "#F59E0B",
    bg: "#FEF3C7",
    accent: "#FBBF24",
    badge: "Legal Action",
    benefits: [
      "SARFAESI process guidance",
      "Asset protection strategies",
      "Legal representation",
      "Negotiation support",
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function OurServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] bg-gradient-to-br from-[#1B3F8B] via-[#2a52a8] to-[#0F2856] flex items-center overflow-hidden pt-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* <div className="flex items-center gap-2 mb-6">
              <Link href="/" className="flex items-center gap-1 text-[#FEF3D0] hover:text-[#F0A500] transition-colors text-sm font-medium">
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </div> */}

            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Our Solutions
            </h1>
            <p className="text-xl text-[#FEF3D0] leading-relaxed">
              We provide comprehensive, process-driven solutions for all your financial challenges. From credit repair to banking disputes, our expert team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {services.map((service) => {
              const Icon = iconMap[service.iconName]
              if (!Icon) return null
              return (
                <motion.div
                  key={service.slug}
                  variants={itemVariants}
                  className="group relative bg-white rounded-2xl border-2 border-[#E2E8F0] overflow-hidden hover:shadow-2xl hover:border-[#F0A500]/50 transition-all duration-300 h-full flex flex-col"
                >
                  {/* Top gradient bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${service.color}, ${service.accent})`,
                    }}
                  />

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: service.bg }}
                    >
                      <Icon size={28} style={{ color: service.color }} className="stroke-1.5" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-[#1B3F8B] mb-2 group-hover:text-[#F0A500] transition-colors">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm font-semibold text-[#F0A500] mb-4">
                      {service.shortDescription}
                    </p>

                    {/* Full Description */}
                    <p className="text-[#4A5568] leading-relaxed mb-6 flex-1">
                      {service.fullDescription}
                    </p>

                    {/* Key Benefits */}
                    <div className="space-y-2 mb-6 pb-6 border-b border-[#E2E8F0]">
                      {service.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: service.accent }}
                          >
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <span className="text-[#4A5568]">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 group/btn hover:shadow-lg hover:-translate-y-0.5 transform w-full"
                      style={{ backgroundColor: service.color }}
                    >
                      <span>Learn More</span>
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Our Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-[#1B3F8B] mb-4">
              Why Choose Credsmadhan Services?
            </h2>
            <p className="text-[#4A5568] max-w-2xl mx-auto text-lg">
              We stand out through our proven methodology and client-centric approach
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Shield,
                title: "100% Confidential",
                description: "Your financial information is protected with bank-level security and never shared with third parties.",
              },
              {
                icon: Zap,
                title: "48-Hour Response",
                description: "Get expert guidance within 48 hours of submitting your query. No waiting, no delays.",
              },
              {
                icon: ArrowRight,
                title: "Proven Results",
                description: "Thousands of successful resolutions. Our track record speaks for successful financial problem resolution.",
              },
            ].map((item, idx) => {
              const ItemIcon = item.icon
              return (
                <motion.div key={idx} variants={itemVariants} className="bg-gradient-to-br from-[#F9FAFB] to-white p-8 rounded-2xl border border-[#E2E8F0]">
                  <div className="w-12 h-12 rounded-lg bg-[#F0A500]/20 flex items-center justify-center mb-4">
                    <ItemIcon size={24} className="text-[#F0A500]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1B3F8B] mb-2">{item.title}</h3>
                  <p className="text-[#4A5568]">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1B3F8B] to-[#0F2856]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Ready to Resolve Your Financial Issues?
            </h2>
            <p className="text-xl text-[#FEF3D0] mb-8 max-w-2xl mx-auto">
              Take the first step towards financial freedom. Get a free expert consultation tailored to your specific needs.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F0A500] hover:bg-[#F7C04A] text-[#1B3F8B] font-bold rounded-xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1 group"
            >
              <span>Get Free Consultation Now</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
