"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

export default function BlogPage() {
  const posts = [
    {
      title: "How to Improve Your CIBIL Score Fast",
      excerpt: "Discover the top 5 proven strategies to quickly boost your credit score and unlock better financial opportunities.",
      date: "Oct 15, 2026",
      category: "Credit Tips"
    },
    {
      title: "Understanding Loan Settlements vs. Closures",
      excerpt: "What is the real difference? Find out how settling a loan impacts your CIBIL score compared to closing it.",
      date: "Oct 10, 2026",
      category: "Loans"
    },
    {
      title: "How to Spot Errors in Your Credit Report",
      excerpt: "Mistakes in your credit report can cost you thousands. Learn how to identify and dispute them effectively.",
      date: "Oct 05, 2026",
      category: "Credit Analysis"
    }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-36 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B3F8B] mb-6 font-serif">
              Our Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Latest insights, tips, and updates on credit scores, loan management, and financial health.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Image Placeholder</span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-[#F0A500] font-semibold mb-2">{post.category} &bull; {post.date}</div>
                  <h3 className="text-xl font-bold text-[#1B3F8B] mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <a href="#" className="text-[#1B3F8B] font-semibold hover:text-[#F0A500] transition-colors">Read More &rarr;</a>
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
