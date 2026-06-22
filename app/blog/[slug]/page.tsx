import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MessageCircle,
} from "lucide-react"
import { blogPosts, getBlogPost } from "@/lib/blog-posts"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: "Article Not Found - Credsmadhan",
    }
  }

  return {
    title: `${post.title} - Credsmadhan`,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) notFound()

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-28">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0E224D] via-[#163B82] to-[#09162E]">
          <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] pointer-events-none" />

          <div className="container mx-auto px-4 max-w-7xl py-16 md:py-24">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-[#F0A500] text-sm transition-colors mb-10"
            >
              <ArrowLeft size={16} />
              Back to Articles
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* LEFT */}
              <div>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-[#F0A500] text-black text-sm font-semibold px-4 py-2 rounded-full">
                    {post.category}
                  </span>

                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <CalendarDays size={15} />
                    {post.date}
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                  {post.title}
                </h1>

                <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
                  {post.excerpt}
                </p>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative">
                <div className="absolute -inset-4 bg-[#F0A500]/20 blur-3xl rounded-full" />

                <img
                  src={post.image}
                  alt={post.title}
                  className="relative w-full h-[300px] md:h-[520px] object-cover rounded-[32px] shadow-2xl border border-white/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ARTICLE */}
        <section className="container mx-auto px-4 max-w-7xl py-20">
          <div className="grid lg:grid-cols-[260px_1fr] gap-16">
            {/* SIDEBAR */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 bg-white rounded-[28px] p-7 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-[#0E224D] mb-6 text-lg">
                  Article Info
                </h3>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Category
                    </p>
                    <p className="font-semibold text-[#0E224D]">
                      {post.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Published
                    </p>
                    <p className="font-semibold text-[#0E224D]">
                      {post.date}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <a
                    href="https://wa.me/919053903719"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:scale-[1.02] transition-all text-white py-4 rounded-2xl font-semibold"
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </aside>

            {/* CONTENT */}
            <article className="max-w-4xl">
              <p className="text-2xl leading-relaxed text-[#0E224D] font-medium mb-14">
                {post.intro}
              </p>

              {post.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="mb-16 border-b border-gray-100 pb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0E224D] mb-6 leading-tight">
                    {section.heading}
                  </h2>

                  <div className="space-y-5">
                    {section.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className="text-gray-700 text-lg leading-[2]"
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {section.bullets && (
                    <div className="mt-8 bg-[#f8f9ff] rounded-[28px] p-8 border border-[#1B3F8B]/10">
                      <ul className="space-y-5">
                        {section.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-4 text-gray-700 text-lg"
                          >
                            <span className="mt-2 min-w-[10px] h-[10px] rounded-full bg-[#F0A500]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {/* CTA */}
              <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0E224D] via-[#163B82] to-[#09162E] p-10 md:p-14 text-center shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F0A500]/10 rounded-full blur-3xl" />

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 relative">
                  Need Expert Financial Guidance?
                </h3>

                <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto relative">
                  Get a free consultation and let our experts assess your
                  financial concerns with practical solutions.
                </p>

                <div className="flex flex-wrap justify-center gap-4 relative">
                  <Link
                    href="/contact-us"
                    className="bg-[#F0A500] hover:scale-105 transition-all text-black font-semibold px-8 py-4 rounded-2xl flex items-center gap-2 shadow-xl"
                  >
                    Free Credit Analysis
                    <ArrowRight size={18} />
                  </Link>

                  <a
                    href="https://wa.me/919053903719"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/20 hover:bg-white hover:text-[#0E224D] transition-all text-white px-8 py-4 rounded-2xl flex items-center gap-2"
                  >
                    <MessageCircle size={18} />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <section className="bg-white py-20">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-4xl font-bold text-[#0E224D]">
                  Related Articles
                </h2>

                <Link
                  href="/blog"
                  className="text-[#1B3F8B] font-semibold hover:text-[#F0A500] transition-colors"
                >
                  View All
                </Link>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group bg-[#fafafa] rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-7">
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span>{related.date}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-[#0E224D] mb-3 group-hover:text-[#1B3F8B] transition-colors leading-snug">
                        {related.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                        {related.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-2 text-[#1B3F8B] font-semibold">
                        Read More
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </div>
  )
}