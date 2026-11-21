"use client"

import { useState } from "react"
import Link from "next/link"
import { Disclaimer, ResultPanel, SelectField, ToolLayout } from "./shared"

type Option = { value: string; label: string; points: number; tip: string }

const FACTORS: { id: string; label: string; weight: number; options: Option[] }[] = [
  {
    id: "payment",
    label: "Payment history (last 12 months)",
    weight: 35,
    options: [
      { value: "0", label: "All EMIs and card dues paid on time", points: 1, tip: "On-time payments are the strongest positive factor. Keep it up." },
      { value: "1", label: "1–2 payments late by under 30 days", points: 0.6, tip: "Set up auto-debit so small delays don't repeat." },
      { value: "2", label: "3+ late payments, or any 30+ days late", points: 0.3, tip: "Recent DPD weighs heavily. Bring all accounts current first." },
      { value: "3", label: "Settled, written-off or 90+ days overdue", points: 0, tip: "Severe marks. Check if the status is reported correctly, and if it is, get guidance on resolving it properly." },
    ],
  },
  {
    id: "util",
    label: "Credit card utilization",
    weight: 30,
    options: [
      { value: "0", label: "Under 30% of total limit", points: 1, tip: "Healthy utilization." },
      { value: "1", label: "30–50%", points: 0.65, tip: "Paying balances below 30% before the statement date may help." },
      { value: "2", label: "50–75%", points: 0.35, tip: "High usage signals credit stress to lenders." },
      { value: "3", label: "Over 75%, or no credit card", points: 0.15, tip: "Very high usage hurts. If you have no card, a secured card used lightly can help build history." },
    ],
  },
  {
    id: "enq",
    label: "Loan / card applications in last 6 months",
    weight: 15,
    options: [
      { value: "0", label: "0–1", points: 1, tip: "Low enquiry activity." },
      { value: "1", label: "2–3", points: 0.65, tip: "Space out applications." },
      { value: "2", label: "4–6", points: 0.3, tip: "Many hard enquiries in a short time look credit-hungry. Pause new applications." },
      { value: "3", label: "7 or more", points: 0.1, tip: "Stop applying for a few months, and dispute any enquiry you didn't authorise." },
    ],
  },
  {
    id: "age",
    label: "Age of your oldest active account",
    weight: 20,
    options: [
      { value: "0", label: "7+ years", points: 1, tip: "Long history helps. Avoid closing your oldest card." },
      { value: "1", label: "3–7 years", points: 0.75, tip: "Good history length." },
      { value: "2", label: "1–3 years", points: 0.5, tip: "History builds with time and consistent payments." },
      { value: "3", label: "Under 1 year / new to credit", points: 0.25, tip: "Thin file. Start small and pay in full every month." },
    ],
  },
]

function band(score: number) {
  if (score >= 80) return { label: "Strong", color: "bg-emerald-500", text: "Your inputs look like a healthy credit profile." }
  if (score >= 60) return { label: "Fair", color: "bg-[#F0A500]", text: "A reasonable profile with clear areas to improve." }
  if (score >= 40) return { label: "Needs attention", color: "bg-orange-500", text: "Several factors are likely pulling your profile down." }
  return { label: "At risk", color: "bg-red-500", text: "Lenders are likely to see high risk. Start with payment history and a report review." }
}

export default function CreditScoreSimulator() {
  const [answers, setAnswers] = useState<Record<string, string>>({ payment: "0", util: "1", enq: "1", age: "2" })

  const picked = FACTORS.map((f) => ({ factor: f, option: f.options.find((o) => o.value === answers[f.id]) ?? f.options[0] }))
  const health = picked.reduce((s, p) => s + p.factor.weight * p.option.points, 0)
  const view = band(health)
  // Factors losing the most weighted points first; if nothing is weak, show general tips.
  const lost = (p: (typeof picked)[number]) => p.factor.weight * (1 - p.option.points)
  const weak = picked.filter((p) => p.option.points < 1).sort((a, b) => lost(b) - lost(a))
  const weakest = weak.length ? weak : picked

  return (
    <ToolLayout
      form={
        <>
          {FACTORS.map((f) => (
            <SelectField
              key={f.id}
              id={`sim-${f.id}`}
              label={f.label}
              value={answers[f.id]}
              onChange={(v) => setAnswers((a) => ({ ...a, [f.id]: v }))}
              options={f.options.map((o) => ({ value: o.value, label: o.label }))}
            />
          ))}
        </>
      }
      result={
        <ResultPanel>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4A5568]">Estimated credit health</p>
            <p className="text-2xl font-bold text-[#1B3F8B] mt-1">{view.label}</p>
            <div className="mt-3 h-3 w-full rounded-full bg-white border border-[#D5DEEE] overflow-hidden" role="img" aria-label={`Credit health: ${view.label}`}>
              <div className={`h-full ${view.color} transition-all`} style={{ width: `${Math.max(health, 5)}%` }} />
            </div>
            <p className="text-sm text-[#4A5568] mt-3">{view.text}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0E2454] mb-2">{weak.length ? "What to work on first" : "Keep doing this"}</p>
            <ul className="flex flex-col gap-2">
              {weakest.slice(0, 3).map(({ factor, option }) => (
                <li key={factor.id} className="rounded-lg bg-white border border-[#E3EAF6] px-3 py-2 text-sm">
                  <span className="font-medium text-[#0E2454]">{factor.label.split(" (")[0]}:</span>{" "}
                  <span className="text-[#4A5568]">{option.tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <Disclaimer>
            Educational estimate only — this is <strong>not</strong> your CIBIL or any bureau score, and it does not predict one. Actual scores are calculated by each credit bureau from lender-reported data. For your real score,{" "}
            <Link href="/know-your-cibil-score" className="underline text-[#1B3F8B]">get your credit report</Link>.
          </Disclaimer>
        </ResultPanel>
      }
    />
  )
}
