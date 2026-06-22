"use client"
import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { blogPosts } from "@/lib/blog-posts"
import {
  ArrowRight,
  TrendingUp,
  BadgeCheck,
  MessageCircle,
} from "lucide-react"

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const featuredPost = {
    slug: "how-to-improve-your-cibil-score-fast",
    title: "How to Improve Your CIBIL Score Fast in 2026",
    excerpt:
      "Learn proven expert-backed strategies to improve your credit score, remove negative remarks, and become loan-ready faster.",
    category: "CIBIL Score",
    date: "May 10, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
  }

  const categories = [
    "All",
    "CIBIL Score",
    "Settlement",
    "Written Off",
    "Credit Cards",
    "Banking Notices",
    "EMI Issues",
  ]

  const posts = blogPosts

  // FILTER LOGIC
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory)

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        {/* HERO SECTION */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E224D] via-[#163B82] to-[#0E224D]" />

          <div className="relative container mx-auto px-4 max-w-7xl py-20">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              {/* LEFT */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm text-white mb-6 backdrop-blur-md">
                  <BadgeCheck size={16} />
                  Trusted Financial Knowledge Hub
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-6">
                  Cred Ki Baat,
                  <span className="text-[#F0A500]"> Smadhaan Ke Saath</span>
                </h1>

                <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
                  Expert insights on CIBIL score improvement, loan settlements,
                  written-off accounts, EMI recovery, and financial dispute
                  solutions.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact-us"
                    className="bg-[#F0A500] hover:bg-[#d89300] text-black font-semibold px-7 py-4 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg w-fit"
                  >
                    Free Credit Analysis
                    <ArrowRight size={18} />
                  </Link>

                  <a
                    href="https://wa.me/919053903719"
                    target="_blank"
                    className="border border-white/30 text-white hover:bg-white hover:text-[#0E224D] px-7 py-4 rounded-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <MessageCircle size={18} />
                    WhatsApp Us
                  </a>
                </div>
              </motion.div>

              {/* FEATURED CARD */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-[300px] object-cover"
                  />

                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="bg-[#F0A500] text-black text-sm font-semibold px-4 py-1 rounded-full">
                        {featuredPost.category}
                      </span>

                      <span className="text-white/70 text-sm">
                        {featuredPost.date}
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4 leading-snug">
                      {featuredPost.title}
                    </h2>

                    <p className="text-white/75 leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-[#F0A500] font-semibold hover:gap-3 transition-all duration-300"
                    >
                      Read Full Article
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-14 bg-[#F8FAFC] border-y border-gray-100">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-sm border
                    ${activeCategory === category
                      ? "bg-[#1B3F8B] text-white border-[#1B3F8B] shadow-lg"
                      : "bg-white border-gray-200 text-[#1B3F8B] hover:bg-[#1B3F8B] hover:text-white"
                    }
                  `}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* BLOG GRID */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
              <div>
                <h2 className="text-4xl font-bold text-[#0E224D] mb-3">
                  {activeCategory === "All"
                    ? "Latest Financial Insights"
                    : `${activeCategory} Articles`}
                </h2>

                <p className="text-gray-600 max-w-2xl">
                  Expert-written articles designed to help you improve your
                  credit profile and resolve banking issues.
                </p>
              </div>

              <div className="hidden md:flex items-center gap-2 text-[#1B3F8B] font-semibold">
                <TrendingUp size={18} />
                {filteredPosts.length} Articles Found
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[#1B3F8B]/20 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute top-4 left-4">
                      <span className="bg-[#F0A500] text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-7">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#0E224D] mb-4 leading-snug group-hover:text-[#1B3F8B] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[#1B3F8B] font-semibold hover:text-[#F0A500] transition-all duration-300"
                    >
                      Read More
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}