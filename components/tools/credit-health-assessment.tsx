"use client"

import { useState } from "react"
import Link from "next/link"
import { Disclaimer, ResultPanel } from "./shared"

type Answer = "yes" | "no" | "unsure"

const QUESTIONS: {
  id: string
  q: string
  good: Answer
  factor: string
  learn: string
  link?: { href: string; label: string }
}[] = [
  {
    id: "review",
    q: "Have you checked your credit report from at least one bureau in the last 12 months?",
    good: "yes",
    factor: "Report awareness",
    learn: "Errors are only fixed once someone spots them. Review your report at least once a year and before any big loan application.",
    link: { href: "/know-your-cibil-score", label: "Get your credit report" },
  },
  {
    id: "full",
    q: "Do you usually pay your full credit card bill (not just the minimum due)?",
    good: "yes",
    factor: "Card repayment habit",
    learn: "Paying only the minimum keeps a balance rolling at very high interest and keeps utilization high. See the Minimum Due Trap tool.",
  },
  {
    id: "negative",
    q: "Does any account show Settled, Written-off, Suit-filed or SMA?",
    good: "no",
    factor: "Negative remarks",
    learn: "These are serious marks. First confirm they're reported correctly; if they are, they need proper resolution with the lender — they won't disappear on their own.",
    link: { href: "/services/credit-cibil-analysis", label: "Get your report reviewed" },
  },
  {
    id: "unknown",
    q: "Is there any loan, card or enquiry on your report that you don't recognise?",
    good: "no",
    factor: "Unrecognised entries",
    learn: "Unknown entries may be reporting errors or identity misuse. They can be disputed with the bureau and lender; possible fraud should also be reported at 1930.",
    link: { href: "/services/credit-report-rectification", label: "Credit report assistance" },
  },
  {
    id: "closed",
    q: "Are all loans you've fully repaid showing as 'Closed'?",
    good: "yes",
    factor: "Closure updates",
    learn: "A repaid loan still showing Active inflates your obligations. Keep the NOC and ask the lender to update the bureau.",
  },
  {
    id: "guarantor",
    q: "Are you a co-applicant or guarantor on someone else's loan?",
    good: "no",
    factor: "Contingent liabilities",
    learn: "That loan appears on your report too. Any missed EMI by the borrower can affect your profile, so keep track of it.",
  },
]

const label: Record<Answer, string> = { yes: "Yes", no: "No", unsure: "Not sure" }

export default function CreditHealthAssessment() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const answered = QUESTIONS.filter((q) => answers[q.id])
  const flags = answered.filter((q) => answers[q.id] !== q.good)
  const good = answered.filter((q) => answers[q.id] === q.good)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        {QUESTIONS.map((q) => (
          <fieldset key={q.id} className="rounded-xl border border-[#D5DEEE] bg-white p-4">
            <legend className="sr-only">{q.q}</legend>
            <p className="text-sm font-medium text-[#0E2454]" aria-hidden>{q.q}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["yes", "no", "unsure"] as Answer[]).map((a) => (
                <label
                  key={a}
                  className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    answers[q.id] === a ? "bg-[#1B3F8B] text-white border-[#1B3F8B]" : "bg-white text-[#0E2454] border-[#D5DEEE] hover:border-[#1B3F8B]"
                  }`}
                >
                  <input
                    type="radio"
                    name={`cha-${q.id}`}
                    value={a}
                    checked={answers[q.id] === a}
                    onChange={() => setAnswers((s) => ({ ...s, [q.id]: a }))}
                    className="sr-only"
                  />
                  {label[a]}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <ResultPanel>
        {answered.length === 0 ? (
          <p className="text-sm text-[#4A5568]">Answer the questions to see which credit health factors to focus on.</p>
        ) : (
          <>
            <p className="text-sm text-[#0E2454]">
              <strong>{good.length}</strong> of {answered.length} answered factors look healthy
              {flags.length > 0 && (
                <>
                  ; <strong>{flags.length}</strong> need attention
                </>
              )}
              .
            </p>
            {flags.length > 0 && (
              <ul className="flex flex-col gap-2">
                {flags.map((q) => (
                  <li key={q.id} className="rounded-lg bg-white border border-[#E3EAF6] px-3 py-2.5">
                    <p className="text-sm font-semibold text-[#0E2454]">
                      {q.factor}
                      {answers[q.id] === "unsure" && <span className="font-normal text-[#4A5568]"> (not sure — worth checking)</span>}
                    </p>
                    <p className="text-sm text-[#4A5568] mt-1">{q.learn}</p>
                    {q.link && (
                      <Link href={q.link.href} className="inline-block mt-1 text-sm font-semibold text-[#1B3F8B] underline">
                        {q.link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {flags.length === 0 && <p className="text-sm text-[#4A5568]">Good habits so far. Keep reviewing your report regularly.</p>}
          </>
        )}
        <Disclaimer>
          Educational self-assessment to help you understand credit factors. It does not calculate a score and is not a promise that any action will increase your score.
        </Disclaimer>
      </ResultPanel>
    </div>
  )
}
