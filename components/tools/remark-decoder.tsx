"use client"

import { useState } from "react"
import Link from "next/link"
import { Disclaimer, ResultPanel } from "./shared"

export const REMARKS: {
  id: string
  name: string
  meaning: string
  impact: "Positive" | "Neutral" | "Negative" | "Severe"
  whatToDo: string
}[] = [
  {
    id: "dpd",
    name: "DPD (Days Past Due)",
    meaning:
      "Shows how many days late a payment was in each month. '000' or 'STD' means on time; 030, 060, 090 etc. mean the payment was that many days overdue. 'XXX' means the lender did not report that month.",
    impact: "Negative",
    whatToDo:
      "If the DPD is genuine, clear overdue amounts and pay on time from now on — its effect fades with time. If you have proof you paid on time (bank statement, receipt), the entry can be disputed with the lender and bureau.",
  },
  {
    id: "sma",
    name: "SMA (Special Mention Account)",
    meaning:
      "RBI's early-warning tag for overdue loans: SMA-0 = up to 30 days overdue, SMA-1 = 31–60 days, SMA-2 = 61–90 days. Beyond 90 days the account usually becomes an NPA.",
    impact: "Negative",
    whatToDo: "Pay the overdue amount quickly to stop it moving to NPA. If you were never overdue, ask the lender for the account statement and dispute the tag.",
  },
  {
    id: "settled",
    name: "Settled",
    meaning:
      "The lender agreed to accept less than the full amount due and closed the account. Lenders treat this as a negative mark because the full dues were not repaid.",
    impact: "Severe",
    whatToDo:
      "Some lenders allow you to pay the remaining (waived) amount and then update the status to 'Closed' with a closure letter. This depends on the lender and is not automatic.",
  },
  {
    id: "wo",
    name: "Written-off",
    meaning:
      "The lender has moved the unpaid amount off its books as a loss. You are still legally liable for the dues — a write-off is an accounting entry, not a waiver.",
    impact: "Severe",
    whatToDo:
      "Check the outstanding and written-off amounts are correct. Resolving the dues with the lender (full payment or a documented settlement) is usually the first step. Get guidance before agreeing to any settlement.",
  },
  {
    id: "suit",
    name: "Suit-filed",
    meaning:
      "The lender has filed a legal case to recover dues. 'Wilful default' is a separate, more serious tag for borrowers who can pay but do not.",
    impact: "Severe",
    whatToDo: "Take legal advice and respond to notices on time. If the case was resolved, ask the lender to update the bureau with the outcome.",
  },
  {
    id: "restructured",
    name: "Restructured",
    meaning:
      "Loan terms were changed — for example a longer tenure, lower EMI or moratorium — usually because of repayment difficulty. Lenders may see it as a sign of past stress.",
    impact: "Neutral",
    whatToDo: "Pay the revised EMIs strictly on time. If you never asked for restructuring, ask the lender why it was reported.",
  },
  {
    id: "closed",
    name: "Closed",
    meaning: "The loan or card was fully repaid and closed. This is the status you want for loans you've finished.",
    impact: "Positive",
    whatToDo:
      "If you've repaid a loan but it still shows Active, keep your NOC/closure letter and payment proof — the lender can be asked to update the bureau.",
  },
]

const impactStyle = {
  Positive: "bg-emerald-100 text-emerald-800",
  Neutral: "bg-blue-100 text-[#1B3F8B]",
  Negative: "bg-amber-100 text-amber-800",
  Severe: "bg-red-100 text-red-700",
}

export default function RemarkDecoder() {
  const [selected, setSelected] = useState(REMARKS[0].id)
  const remark = REMARKS.find((r) => r.id === selected)!

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <div className="flex flex-wrap lg:flex-col gap-2" role="radiogroup" aria-label="Choose a credit report remark">
        {REMARKS.map((r) => (
          <button
            key={r.id}
            type="button"
            role="radio"
            aria-checked={selected === r.id}
            onClick={() => setSelected(r.id)}
            className={`text-left rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
              selected === r.id ? "bg-[#1B3F8B] text-white border-[#1B3F8B]" : "bg-white text-[#0E2454] border-[#D5DEEE] hover:border-[#1B3F8B]"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>
      <ResultPanel>
        <div className="flex flex-wrap items-center gap-3">
          <h4 className="text-lg font-bold text-[#1B3F8B]">{remark.name}</h4>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${impactStyle[remark.impact]}`}>{remark.impact}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0E2454]">What it means</p>
          <p className="text-sm text-[#4A5568] mt-1 leading-relaxed">{remark.meaning}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0E2454]">What you can do</p>
          <p className="text-sm text-[#4A5568] mt-1 leading-relaxed">{remark.whatToDo}</p>
        </div>
        <Disclaimer>
          Plain-language explanation for education. Accurate remarks cannot be removed; only incorrect reporting can be disputed. Think a remark is wrong?{" "}
          <Link href="/services/credit-report-rectification" className="underline text-[#1B3F8B]">Get credit report assistance</Link>.
        </Disclaimer>
      </ResultPanel>
    </div>
  )
}
