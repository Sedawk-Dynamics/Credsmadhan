"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { CheckCircle, AlertTriangle, Settings } from "lucide-react"

export default function ResultPage() {
  const caseStudies = [
    {
      title: "Wrong Loan Entry Removed – Identity Mismatch Case",
      issue: [
        "Client ke CIBIL me unknown loan show ho raha tha",
        "DOB mismatch tha",
        "Client ne kabhi loan liya hi nahi",
      ],
      problem: [
        "Loan amount: Rs 1.8 Lakh",
        "Score badly impacted",
        "Loan rejection start ho gaye",
      ],
      process: [
        "KYC mismatch detect kiya (DOB error)",
        "CRIF High Mark me dispute raise kiya + Supporting documents attach kiye",
        "NBFC ko official email + follow-ups, Galat tagging prove ki",
      ],
      result: [
        "Loan entry removed",
        "CIBIL corrected",
        "Client clean profile recover",
      ],
    },
    {
      title: "Settled Account Turned “Closed” – Score Recovery Case",
      issue: [
        "Old credit card “Settled” show ho raha tha",
        "Score low (550 range)",
      ],
      problem: [],
      process: [
        "Settlement history analyze ki",
        "Bank se closure upgrade request",
        "Payment proof + email trail create ki",
      ],
      result: [
        "Status changed to “Closed”",
        "Score improved significantly",
        "Loan eligibility open",
      ],
    },
    {
      title: "High DPD Cleared – Continuous Late Payment Issue Solved",
      issue: [
        "Multiple loans me DPD 60–90 days",
        "Lagaataar delay reporting",
      ],
      problem: [],
      process: [
        "Kaunsa account zyada impact kar raha tha identify kiya",
        "Bank ko payment proof ke sath correction request",
        "Continuous escalation till correction",
      ],
      result: [
        "DPD corrected",
        "Score gradually improve",
        "Profile stable",
      ],
    },
    {
      title: "Loan Closure Not Updated – Report Clean-Up Case",
      issue: [
        "Loan already paid but still “Active” show ho raha tha",
      ],
      problem: [],
      process: [
        "NOC + payment receipt collect ki",
        "TransUnion CIBIL me update request",
        "Bank se backend update karwaya",
      ],
      result: [
        "Loan status “Closed”",
        "CIBIL score improved",
      ],
    },
    {
      title: "Multiple Small Loans Settled – Financial Burden Reduced",
      issue: [
        "5–6 small NBFC loans",
        "Total outstanding: Rs 3.2 Lakh",
      ],
      problem: [],
      process: [
        "Priority-wise loans divide kiye",
        "Har lender se structured settlement",
        "Client ke budget ke hisab se closure",
      ],
      result: [
        "Total settlement ~Rs 1.4 Lakh me",
        "Stress reduced",
        "Future planning possible",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-36 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B3F8B] mb-6 font-serif">
              Our Success Stories & Results
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real cases, real results. We don't just promise, we follow a strict process to deliver outcomes for our clients.
            </p>
          </motion.div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
            {caseStudies.map((cs, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-[#1B3F8B] px-6 py-4">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {cs.title}
                  </h3>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Issue */}
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                      <AlertTriangle className="text-orange-500" size={20} />
                      Client Issue
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                      {cs.issue.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Problem */}
                  {cs.problem.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                        <AlertTriangle className="text-red-500" size={20} />
                        Problem
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                        {cs.problem.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Process */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="flex items-center gap-2 font-semibold text-[#1B3F8B] mb-3">
                      <Settings className="text-[#F0A500]" size={20} />
                      Our Process
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                      {cs.process.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Result */}
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <h4 className="flex items-center gap-2 font-semibold text-green-800 mb-3">
                      <CheckCircle className="text-green-600" size={20} />
                      Result
                    </h4>
                    <ul className="list-disc list-inside text-green-700 space-y-1 ml-2 font-medium">
                      {cs.result.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 bg-[#1B3F8B] rounded-3xl p-8 md:p-12 text-center shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Want similar results for your profile?</h2>
            <p className="text-[#FEF3D0] mb-8 max-w-2xl mx-auto">
              Our proven strategies can help you clear up your CIBIL issues, negotiate settlements, and get back on track.
            </p>
            <a
              href="/contact-us"
              className="inline-block px-8 py-4 bg-[#F0A500] text-[#1B3F8B] font-bold rounded-xl text-lg hover:bg-[#F7C04A] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Get Expert Help Now
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
