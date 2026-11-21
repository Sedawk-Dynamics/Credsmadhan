import Link from "next/link"
import { CheckCircle2, ShieldCheck, Star } from "lucide-react"
import { REPORT_LABELS, REPORT_PRICES, type ReportType } from "@/lib/credit-report-pricing"
import SectionHeading from "./section-heading"

const single: ReportType[] = ["TransUnion", "Experian", "Equifax"]

export default function CreditReportCards() {
  const allPrice = REPORT_PRICES.All
  const separatePrice = single.reduce((s, t) => s + REPORT_PRICES[t], 0)
  const saving = separatePrice - allPrice

  return (
    <section id="check-cibil" className="py-16 md:py-20 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Online Credit Report" title="Get your credit report online">
          Choose a bureau report and complete the secure form and payment on our Know Your CIBIL Score page.
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {single.map((type) => (
            <div key={type} className="rounded-2xl bg-white border border-[#E3EAF6] p-6 flex flex-col">
              <p className="text-sm font-semibold text-[#4A5568]">Single bureau</p>
              <h3 className="mt-1 text-lg font-bold text-[#0E2454]">{REPORT_LABELS[type]}</h3>
              <p className="mt-4 text-3xl font-bold text-[#1B3F8B]">₹{REPORT_PRICES[type]}</p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-[#4A5568] flex-1">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" /> Credit score &amp; full report</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" /> Checking your own report does not affect your score</li>
              </ul>
              <Link
                href={`/know-your-cibil-score?type=${type}`}
                className="mt-6 text-center px-4 py-2.5 rounded-lg border-2 border-[#1B3F8B] text-[#1B3F8B] text-sm font-semibold hover:bg-[#1B3F8B] hover:text-white transition"
              >
                Get {REPORT_LABELS[type]} report
              </Link>
            </div>
          ))}

          <div className="relative rounded-2xl bg-[#1B3F8B] p-6 flex flex-col text-white shadow-xl">
            <span className="absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full bg-[#F0A500] px-3 py-1 text-xs font-bold text-[#0E2454]">
              <Star size={12} className="fill-[#0E2454]" /> Best value
            </span>
            <p className="text-sm font-semibold text-white/70">Bundle</p>
            <h3 className="mt-1 text-lg font-bold">{REPORT_LABELS.All}</h3>
            <p className="mt-4 text-3xl font-bold text-[#F0A500]">₹{allPrice}</p>
            {saving > 0 && (
              <p className="text-xs text-white/80 mt-1">
                Save ₹{saving} vs. ₹{separatePrice} for three separate reports
              </p>
            )}
            <ul className="mt-4 flex flex-col gap-2 text-sm text-white/85 flex-1">
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#F0A500] shrink-0 mt-0.5" /> TransUnion CIBIL, Experian &amp; Equifax</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#F0A500] shrink-0 mt-0.5" /> Compare entries across bureaus to spot errors</li>
            </ul>
            <Link
              href="/know-your-cibil-score?type=All"
              className="mt-6 text-center px-4 py-2.5 rounded-lg bg-[#F0A500] text-[#0E2454] text-sm font-bold hover:bg-[#F7C04A] transition"
            >
              Get all 3 reports
            </Link>
          </div>
        </div>

        <p className="mt-8 flex items-start justify-center gap-2 text-xs text-[#4A5568] text-center max-w-3xl mx-auto">
          <ShieldCheck size={14} className="text-[#1B3F8B] shrink-0 mt-0.5" />
          Reports are obtained with your consent as your authorised representative. Credsmadhan is an independent assistance platform and is not affiliated with any credit bureau.
        </p>
      </div>
    </section>
  )
}
