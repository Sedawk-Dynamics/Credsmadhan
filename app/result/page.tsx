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
        "Loan amount: ₹1.8 Lakh",
        "Score badly impacted",
        "Loan rejection start ho gaye",
      ],
      process: [
        "KYC mismatch detect kiya (DOB error)",
        "CRIF High Mark me dispute raise kiya + documents attach kiye",
        "NBFC ko email + follow-ups, galat tagging prove ki",
      ],
      result: [
        "Loan entry removed ✔️",
        "CIBIL corrected ✔️",
        "Client clean profile recover ✔️",
      ],
    },

    {
      title: "Settled Account Turned Closed – Score Recovery",
      issue: [
        "Old credit card 'Settled' show ho raha tha",
        "Score low (550 range)",
      ],
      problem: [
        "Loan approval block",
        "Negative settlement impact",
      ],
      process: [
        "Settlement history analyze ki",
        "Bank se closure upgrade request",
        "Payment proof + email trail build ki",
      ],
      result: [
        "Status changed to Closed ✔️",
        "Score improved ✔️",
        "Loan eligibility open ✔️",
      ],
    },

    {
      title: "High DPD Cleared – Late Payment Issue",
      issue: [
        "Multiple loans me DPD 60–90 days",
        "Continuous delay reporting",
      ],
      problem: [
        "Score drop ho raha tha",
        "Bank rejection ho raha tha",
      ],
      process: [
        "High-impact account identify kiya",
        "Bank ko payment proof ke sath correction request",
        "Continuous escalation ki",
      ],
      result: [
        "DPD corrected ✔️",
        "Score improve ✔️",
        "Profile stable ✔️",
      ],
    },

    {
      title: "Loan Closure Not Updated – Clean-up Case",
      issue: [
        "Loan paid but still active show ho raha tha",
      ],
      problem: [
        "Score unnecessarily low",
        "New loan reject ho raha tha",
      ],
      process: [
        "NOC + payment proof collect kiya",
        "CIBIL me update request raise ki",
        "Bank se backend update karwaya",
      ],
      result: [
        "Loan status Closed ✔️",
        "Score improved ✔️",
      ],
    },

    {
      title: "Multiple Loans Settled – Burden Reduced",
      issue: [
        "5–6 NBFC loans active",
        "Total ₹3.2 Lakh outstanding",
      ],
      problem: [
        "Financial pressure high",
        "Monthly stress",
      ],
      process: [
        "Loans priority-wise divide kiye",
        "Structured settlement negotiate kiya",
        "Budget-based closure plan banaya",
      ],
      result: [
        "₹1.4 Lakh me settlement ✔️",
        "Stress reduced ✔️",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B3F8B] mb-4">
              Success Stories & Results
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real client cases. Real outcomes. Every result is backed by a structured process.
            </p>
          </div>

          {/* GRID → 3 CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {caseStudies.map((cs, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all"
              >

                {/* TITLE */}
                <div className="bg-[#1B3F8B] p-5">
                  <h3 className="text-white font-semibold text-lg">
                    {cs.title}
                  </h3>
                </div>

                <div className="p-5 space-y-5">

                  {/* ISSUE */}
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                      <AlertTriangle className="text-orange-500" size={18} />
                      Issue
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc ml-5">
                      {cs.issue.map((i, k) => <li key={k}>{i}</li>)}
                    </ul>
                  </div>

                  {/* PROBLEM (ALWAYS SHOW) */}
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-red-600 mb-2">
                      <AlertTriangle size={18} />
                      Problem
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc ml-5">
                      {cs.problem.map((i, k) => <li key={k}>{i}</li>)}
                    </ul>
                  </div>

                  {/* PROCESS (STEP UI) */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="flex items-center gap-2 font-semibold text-[#1B3F8B] mb-3">
                      <Settings className="text-[#F0A500]" size={18} />
                      Process
                    </h4>

                    <div className="space-y-2">
                      {cs.process.map((step, i) => (
                        <div key={i} className="flex gap-2 text-sm text-gray-700">
                          <span className="font-bold text-[#F0A500]">
                            {i + 1}.
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RESULT */}
                  <div className="bg-green-50 p-4 rounded-xl">
                    <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-2">
                      <CheckCircle size={18} />
                      Result
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1 list-disc ml-5">
                      {cs.result.map((i, k) => <li key={k}>{i}</li>)}
                    </ul>
                  </div>

                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}