import Link from "next/link"
import { ArrowRight, CalendarX2, FileWarning, IndianRupee, Copy, FileCheck2, Scale } from "lucide-react"
import SectionHeading from "./section-heading"

const issues = [
  { icon: CalendarX2, title: "Wrong DPD", text: "Late-payment days reported for months you paid on time." },
  { icon: FileWarning, title: "Inaccurate account status", text: "Accounts tagged incorrectly, or loans you never took showing on your report." },
  { icon: IndianRupee, title: "Incorrect balances", text: "Outstanding, overdue or sanctioned amounts that don't match your statements." },
  { icon: Copy, title: "Duplicate or wrong enquiries", text: "Repeated entries or hard enquiries you never authorised." },
  { icon: FileCheck2, title: "Closed loan still active", text: "Fully repaid loans not updated to 'Closed' despite an NOC." },
  { icon: Scale, title: "Settled / written-off guidance", text: "Understand what these remarks mean and the proper route to resolve them." },
]

export default function CibilIssuesSection() {
  return (
    <section id="cibil-services" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="CIBIL & Credit Report Services" title="Errors on your credit report? We help you get them reviewed.">
          Credit report review and assistance with inaccuracies across TransUnion CIBIL, Experian and Equifax — with documented disputes and follow-ups. We assist; we never promise to delete genuine history.
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {issues.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-[#E3EAF6] bg-[#F7F9FC] p-6 hover:border-[#1B3F8B]/30 hover:shadow-md transition">
              <div className="w-11 h-11 rounded-xl bg-[#E0EAFF] flex items-center justify-center mb-4">
                <Icon size={20} className="text-[#1B3F8B]" />
              </div>
              <h3 className="font-semibold text-[#0E2454]">{title}</h3>
              <p className="text-sm text-[#4A5568] mt-2 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/services/credit-report-rectification"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1B3F8B] text-white font-semibold rounded-xl hover:bg-[#142f6b] transition"
          >
            Credit Report Rectification <ArrowRight size={16} />
          </Link>
          <Link
            href="/services/credit-cibil-analysis"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#1B3F8B] text-[#1B3F8B] font-semibold rounded-xl hover:bg-[#1B3F8B] hover:text-white transition"
          >
            Credit &amp; CIBIL Analysis
          </Link>
        </div>
      </div>
    </section>
  )
}
