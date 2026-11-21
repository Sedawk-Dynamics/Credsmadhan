"use client"

import { useState } from "react"
import Link from "next/link"
import { faqCategories, faqs } from "@/lib/faqs"
import { FaqList, FaqSearchBox, useFaqSearch } from "@/components/home/faq-section"

export default function FaqBrowser() {
  const [query, setQuery] = useState("")
  const results = useFaqSearch(faqs, query)
  const searching = query.trim().length > 0

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="mb-10">
        <FaqSearchBox value={query} onChange={setQuery} />
      </div>

      {searching ? (
        <FaqList items={results} emptyText="No questions match your search. Try another word, or contact us." />
      ) : (
        <div className="flex flex-col gap-12">
          {faqCategories.map((cat) => (
            <section key={cat}>
              <h2 className="text-xl font-bold text-[#1B3F8B] mb-4">{cat}</h2>
              <FaqList items={faqs.filter((f) => f.category === cat)} emptyText="" />
            </section>
          ))}
        </div>
      )}

      <div className="mt-14 rounded-2xl bg-white border border-[#E3EAF6] p-6 text-center">
        <p className="font-semibold text-[#0E2454]">Didn&apos;t find your answer?</p>
        <p className="text-sm text-[#4A5568] mt-1">Call +91 9053903719 (Mon–Sat, 10 AM – 7 PM) or send us your question.</p>
        <Link href="/contact-us" className="mt-4 inline-block px-6 py-2.5 rounded-xl bg-[#1B3F8B] text-white text-sm font-semibold hover:bg-[#142f6b]">
          Contact us
        </Link>
      </div>
    </div>
  )
}
