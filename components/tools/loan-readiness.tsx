"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { Disclaimer, ResultPanel } from "./shared"

const CHECKS = [
  { id: "late", label: "I've missed or delayed an EMI / card payment in the last 12 months", reason: "Recent late payments (DPD)", fix: "Bring every account current and keep 6–12 months of clean, on-time payments." },
  { id: "util", label: "My credit card balances are above 50% of the limits", reason: "High credit utilization", fix: "Pay card balances down, ideally below 30% of the limit, before the statement date." },
  { id: "enq", label: "I've applied for 3 or more loans/cards in the last 6 months", reason: "Too many recent hard enquiries", fix: "Pause new applications for a few months; apply to one lender that fits your profile." },
  { id: "foir", label: "My existing EMIs take up more than half my monthly income", reason: "High FOIR (debt-to-income)", fix: "Close or prepay small loans, or apply for a lower amount / longer tenure. Check with the FOIR calculator." },
  { id: "settled", label: "My report shows Settled, Written-off or Suit-filed on any account", reason: "Severe negative remarks", fix: "Check the status is reported correctly. If it is, get guidance on resolving it before applying again." },
  { id: "unknown", label: "I see a loan, card or enquiry I don't recognise", reason: "Possible error or fraud on your report", fix: "Dispute it with the bureau and lender. If it may be fraud, also report it at 1930 / cybercrime.gov.in." },
  { id: "closedactive", label: "A loan I've repaid still shows as Active", reason: "Closure not updated", fix: "Keep your NOC and payment proof and ask the lender to update the bureau." },
  { id: "thin", label: "I have less than 1 year of credit history", reason: "Thin credit file", fix: "Start with a small or secured card and pay in full every month to build history." },
  { id: "kyc", label: "My name, DOB, PAN or address differs between my report and KYC documents", reason: "KYC / identity mismatch", fix: "Mismatched details can cause rejections and mixed-up records. Request a correction with supporting documents." },
] as const

export default function LoanReadiness() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const issues = CHECKS.filter((c) => checked[c.id])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold text-[#0E2454] mb-2">Tick everything that applies to you</legend>
        {CHECKS.map((c) => (
          <label key={c.id} className="flex items-start gap-3 rounded-lg border border-[#D5DEEE] bg-white px-3 py-2.5 text-sm text-[#0E2454] cursor-pointer hover:border-[#1B3F8B]">
            <input
              type="checkbox"
              checked={!!checked[c.id]}
              onChange={(e) => setChecked((s) => ({ ...s, [c.id]: e.target.checked }))}
              className="mt-0.5 h-4 w-4 accent-[#1B3F8B]"
            />
            <span>{c.label}</span>
          </label>
        ))}
      </fieldset>
      <ResultPanel>
        {issues.length === 0 ? (
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#0E2454]">No common red flags selected</p>
              <p className="text-sm text-[#4A5568] mt-1">
                Lenders still check your score, income and documents. Reviewing your credit report before you apply helps you avoid surprises.
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-[#0E2454]">
              {issues.length} possible reason{issues.length > 1 ? "s" : ""} a lender may hesitate:
            </p>
            <ul className="flex flex-col gap-2">
              {issues.map((c) => (
                <li key={c.id} className="rounded-lg bg-white border border-[#E3EAF6] px-3 py-2.5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#0E2454]">
                    <AlertTriangle size={15} className="text-[#F0A500]" /> {c.reason}
                  </p>
                  <p className="text-sm text-[#4A5568] mt-1">{c.fix}</p>
                </li>
              ))}
            </ul>
            <Link href="/services/loan-emi-stress-guidance" className="self-start text-sm font-semibold text-[#1B3F8B] underline">
              Get loan guidance
            </Link>
          </>
        )}
        <Disclaimer>
          A self-check of common rejection reasons — not an underwriting decision. Each lender applies its own policy and may approve or reject for reasons not listed here.
        </Disclaimer>
      </ResultPanel>
    </div>
  )
}
