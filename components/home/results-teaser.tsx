import Link from "next/link"
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react"
import { caseStudies } from "@/lib/results"
import SectionHeading from "./section-heading"

export default function ResultsTeaser() {
  const cases = caseStudies.slice(0, 3)

  return (
    <section id="results" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Real Results" title="Real client cases, structured process">
          A few cases from our published results. Client identities are kept confidential.
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((cs) => (
            <article key={cs.title} className="rounded-2xl border border-[#E3EAF6] bg-[#F7F9FC] overflow-hidden flex flex-col">
              <div className="bg-[#1B3F8B] px-5 py-4">
                <h3 className="text-white font-semibold leading-snug">{cs.title}</h3>
              </div>
              <div className="p-5 flex flex-col gap-4 flex-1">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#0E2454]">
                    <AlertTriangle size={16} className="text-orange-500" /> Issue
                  </p>
                  <ul className="mt-1.5 ml-5 list-disc text-sm text-[#4A5568] space-y-0.5">
                    {cs.issue.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4 mt-auto">
                  <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                    <CheckCircle size={16} /> Result
                  </p>
                  <ul className="mt-1.5 ml-5 list-disc text-sm text-emerald-800 space-y-0.5">
                    {cs.result.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-xs text-[#4A5568] text-center max-w-2xl">
            Results vary from case to case and depend on the facts, documents and the lender&apos;s and bureau&apos;s response. Past outcomes do not guarantee a similar result.
          </p>
          <Link href="/result" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B3F8B] text-white font-semibold rounded-xl hover:bg-[#142f6b] transition">
            See all results <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
