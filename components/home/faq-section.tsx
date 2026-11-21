"use client"

import { useId, useMemo, useState } from "react"
import Link from "next/link"
import { ChevronDown, Search, ArrowRight } from "lucide-react"
import type { Faq } from "@/lib/faqs"

export function FaqList({ items, emptyText }: { items: Faq[]; emptyText: string }) {
  const [open, setOpen] = useState<string | null>(null)
  const baseId = useId()

  if (items.length === 0) return <p className="text-sm text-[#4A5568] py-6 text-center">{emptyText}</p>

  return (
    <div className="flex flex-col gap-3">
      {items.map((faq, i) => {
        const isOpen = open === faq.q
        const id = `${baseId}-${i}`
        return (
          <div key={faq.q} className="rounded-xl border border-[#E3EAF6] bg-white overflow-hidden">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                id={`${id}-btn`}
                onClick={() => setOpen(isOpen ? null : faq.q)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-[#0E2454] hover:bg-[#F7F9FC]"
              >
                {faq.q}
                <ChevronDown size={18} className={`shrink-0 text-[#1B3F8B] transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} hidden={!isOpen} className="px-5 pb-5 text-sm text-[#4A5568] leading-relaxed">
              {faq.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function useFaqSearch(items: Faq[], query: string) {
  return useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    const words = q.split(/\s+/)
    return items.filter((f) => {
      const text = `${f.q} ${f.a}`.toLowerCase()
      return words.every((w) => text.includes(w))
    })
  }, [items, query])
}

export function FaqSearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5568]" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search questions — e.g. DPD, settlement, price"
        aria-label="Search frequently asked questions"
        className="w-full rounded-xl border border-[#D5DEEE] bg-white pl-11 pr-4 py-3 text-sm text-[#0E2454] outline-none focus:ring-2 focus:ring-[#1B3F8B]/30"
      />
    </div>
  )
}

export default function FaqSection({ allFaqs }: { allFaqs: Faq[] }) {
  const [query, setQuery] = useState("")
  const featured = useMemo(() => allFaqs.filter((f) => f.featured), [allFaqs])
  // Searching looks through every FAQ, not just the featured ones.
  const results = useFaqSearch(query.trim() ? allFaqs : featured, query)

  return (
    <section id="faq" className="py-16 md:py-20 bg-[#F7F9FC]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-[#FEF3D0] text-[#9A6B00] text-xs font-bold uppercase tracking-widest rounded-full mb-4">FAQ</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0E2454]">Frequently asked questions</h2>
        </div>
        <div className="mb-6">
          <FaqSearchBox value={query} onChange={setQuery} />
        </div>
        <FaqList items={results} emptyText="No questions match your search. Try another word, or contact us." />
        <div className="mt-8 text-center">
          <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B3F8B] hover:text-[#F0A500]">
            View all FAQs <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
