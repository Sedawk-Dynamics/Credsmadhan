import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { faqs } from "@/lib/faqs"
import FaqBrowser from "./faq-browser"

export const metadata: Metadata = {
  title: "FAQs – Credit Reports, CIBIL, Disputes & Loans | Credsmadhan",
  description:
    "Answers on credit reports, CIBIL scores, DPD, enquiries, disputes, settlement, report prices, bureau differences, privacy and fraud safety.",
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20 pb-20">
        <section className="py-12 md:py-16 text-center px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0E2454]">Frequently Asked Questions</h1>
          <p className="mt-4 text-[#4A5568] max-w-2xl mx-auto">
            Credit reports, CIBIL scores, disputes, loans, pricing, privacy and fraud safety — explained simply.
          </p>
        </section>
        <FaqBrowser />
      </main>
      <Footer />
    </div>
  )
}
