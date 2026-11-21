import Link from "next/link"
import { ArrowRight, TrendingDown, CreditCard, ShieldCheck } from "lucide-react"
import { services } from "@/app/services/data"
import SectionHeading from "./section-heading"

const featured = [
  { slug: "loan-emi-stress-guidance", icon: TrendingDown, label: "Loan", text: "EMI stress, repayment clarity and guidance on available resolution processes." },
  { slug: "banking-credit-card-support", icon: CreditCard, label: "Banking", text: "Unauthorised transactions, wrong charges, billing disputes and bank grievances." },
  { slug: "insurance-issue-assistance", icon: ShieldCheck, label: "Insurance", text: "Mis-selling complaints, policy corrections, claim issues and escalation support." },
]

const CIBIL_SLUGS = ["credit-cibil-analysis", "credit-report-rectification"]
const featuredSlugs = featured.map((f) => f.slug)

export default function OtherServicesSection() {
  const more = services.filter((s) => !CIBIL_SLUGS.includes(s.slug) && !featuredSlugs.includes(s.slug))

  return (
    <section id="services" className="py-16 md:py-20 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Beyond CIBIL" title="Loan, banking and insurance support">
          The same process-driven approach for your other financial problems.
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-3">
          {featured.map(({ slug, icon: Icon, label, text }) => {
            const svc = services.find((s) => s.slug === slug)
            return (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="group rounded-2xl bg-white border border-[#E3EAF6] p-6 flex flex-col hover:shadow-lg hover:border-[#F0A500]/50 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FEF3D0] flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#B57D00]" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#9A6B00]">{label}</p>
                <h3 className="mt-1 font-semibold text-lg text-[#0E2454]">{svc?.title ?? label}</h3>
                <p className="text-sm text-[#4A5568] mt-2 leading-relaxed flex-1">{text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3F8B] group-hover:text-[#F0A500]">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 rounded-2xl bg-white border border-[#E3EAF6] p-6">
          <p className="text-sm font-semibold text-[#0E2454] mb-3">More ways we help</p>
          <ul className="flex flex-wrap gap-2">
            {more.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-block rounded-full border border-[#D5DEEE] px-3.5 py-1.5 text-sm text-[#1B3F8B] hover:bg-[#1B3F8B] hover:text-white transition"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/services" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3F8B] hover:text-[#F0A500]">
            Explore all services <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
