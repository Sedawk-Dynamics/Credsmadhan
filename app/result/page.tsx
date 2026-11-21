"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { CheckCircle, AlertTriangle, Settings } from "lucide-react"
import { caseStudies } from "@/lib/results"

export default function ResultPage() {
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