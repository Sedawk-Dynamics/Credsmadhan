"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { Gauge, PieChart, AlertOctagon, Calculator, Percent, BookOpen, ClipboardCheck, HeartPulse } from "lucide-react"
import SectionHeading from "./section-heading"
import CreditScoreSimulator from "@/components/tools/credit-score-simulator"
import UtilizationCalculator from "@/components/tools/utilization-calculator"
import MinimumDueCalculator from "@/components/tools/minimum-due-calculator"
import EmiCalculator from "@/components/tools/emi-calculator"
import FoirCalculator from "@/components/tools/foir-calculator"
import RemarkDecoder from "@/components/tools/remark-decoder"
import LoanReadiness from "@/components/tools/loan-readiness"
import CreditHealthAssessment from "@/components/tools/credit-health-assessment"

const TOOLS = [
  { id: "simulator", label: "Credit Score Simulator", icon: Gauge, intro: "See how payment history, card usage, enquiries and credit age shape your credit health.", Component: CreditScoreSimulator },
  { id: "utilization", label: "Credit Utilization", icon: PieChart, intro: "Add your cards to see total and per-card utilization.", Component: UtilizationCalculator },
  { id: "minimum-due", label: "Minimum Due Trap", icon: AlertOctagon, intro: "See how long a card balance takes to clear if you pay only the minimum due.", Component: MinimumDueCalculator },
  { id: "emi", label: "EMI Calculator", icon: Calculator, intro: "Monthly EMI, total interest and total payment for any loan.", Component: EmiCalculator },
  { id: "foir", label: "FOIR Calculator", icon: Percent, intro: "How much of your income goes to EMIs, the ratio lenders check.", Component: FoirCalculator },
  { id: "remarks", label: "Remark Decoder", icon: BookOpen, intro: "Plain-language meaning of DPD, SMA, Settled, Written-off and other remarks.", Component: RemarkDecoder },
  { id: "loan-readiness", label: "Loan Rejection Finder", icon: ClipboardCheck, intro: "Check common reasons a loan application gets rejected.", Component: LoanReadiness },
  { id: "health", label: "Credit Health Check", icon: HeartPulse, intro: "Answer six questions to see which credit factors need attention.", Component: CreditHealthAssessment },
] as const

export default function SmartToolsSection() {
  const [active, setActive] = useState<string>(TOOLS[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const current = TOOLS.find((t) => t.id === active)!
  const Active = current.Component

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!delta) return
    e.preventDefault()
    const next = (idx + delta + TOOLS.length) % TOOLS.length
    setActive(TOOLS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="smart-tools" className="py-16 md:py-20 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Smart Credit Tools" title="Understand your credit before you apply">
          Free educational tools. They don&apos;t fetch your bureau data or show your real CIBIL score.
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div role="tablist" aria-label="Smart credit tools" aria-orientation="vertical" className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {TOOLS.map((t, idx) => {
              const Icon = t.icon
              const selected = t.id === active
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el
                  }}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(t.id)}
                  onKeyDown={(e) => onKeyDown(e, idx)}
                  className={`shrink-0 flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold text-left transition whitespace-nowrap lg:whitespace-normal ${
                    selected ? "bg-[#1B3F8B] text-white shadow-md" : "bg-[#F7F9FC] text-[#0E2454] hover:bg-[#E0EAFF]"
                  }`}
                >
                  <Icon size={18} className={selected ? "text-[#F0A500]" : "text-[#1B3F8B]"} />
                  {t.label}
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            className="rounded-2xl border border-[#E3EAF6] bg-[#F7F9FC] p-5 md:p-7 min-w-0"
          >
            <h3 className="text-xl font-bold text-[#0E2454]">{current.label}</h3>
            <p className="text-sm text-[#4A5568] mt-1 mb-6">{current.intro}</p>
            <Active key={current.id} />
          </div>
        </div>
      </div>
    </section>
  )
}
