"use client"

import { useState } from "react"
import { Disclaimer, EmptyResult, NumberField, ResultPanel, Stat, ToolLayout, inr, parseNum, pct } from "./shared"

function interpret(foir: number) {
  if (foir <= 40)
    return { tone: "green" as const, label: "Comfortable", text: "Your obligations are a moderate share of income. Most lenders view this range positively." }
  if (foir <= 55)
    return { tone: "gold" as const, label: "Stretched", text: "Many lenders cap FOIR around 50–60% depending on income and profile. Approval may need a smaller loan, longer tenure or co-applicant." }
  return { tone: "red" as const, label: "High", text: "Obligations take up most of your income. Lenders may reject or reduce the amount. Consider closing small loans or reducing card dues first." }
}

export default function FoirCalculator() {
  const [income, setIncome] = useState("60000")
  const [existing, setExisting] = useState("12000")
  const [proposed, setProposed] = useState("10000")

  const i = parseNum(income)
  const e = parseNum(existing)
  const p = parseNum(proposed)

  const iErr = i === null ? null : i <= 0 ? "Enter a monthly income above zero." : null
  const eErr = e === null ? null : e < 0 ? "Obligations cannot be negative." : null
  const pErr = p === null ? null : p < 0 ? "EMI cannot be negative." : null

  const valid = i !== null && !iErr && !eErr && !pErr
  const total = (e ?? 0) + (p ?? 0)
  const foir = valid ? (total / i!) * 100 : null
  const view = foir !== null ? interpret(foir) : null

  return (
    <ToolLayout
      form={
        <>
          <NumberField id="foir-i" label="Net monthly income" prefix="₹" value={income} onChange={setIncome} error={iErr} />
          <NumberField
            id="foir-e"
            label="Existing monthly obligations"
            prefix="₹"
            value={existing}
            onChange={setExisting}
            error={eErr}
            hint="All current EMIs plus credit card minimum dues. Use 0 if none."
          />
          <NumberField id="foir-p" label="Proposed new EMI" prefix="₹" value={proposed} onChange={setProposed} error={pErr} hint="Use the EMI calculator if you don't know it." />
        </>
      }
      result={
        <ResultPanel>
          {foir !== null && view ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Stat label="FOIR" value={pct(foir)} tone={view.tone} />
                <Stat label="Total obligations" value={inr(total)} />
                <Stat label="Left after EMIs" value={inr(i! - total)} tone={i! - total < 0 ? "red" : "navy"} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0E2454]">{view.label}</p>
                <p className="text-sm text-[#4A5568] mt-1">{view.text}</p>
              </div>
              <p className="text-xs text-[#4A5568]">FOIR = (existing obligations + proposed EMI) ÷ net monthly income × 100</p>
            </>
          ) : (
            <EmptyResult>Enter your monthly income to see your FOIR.</EmptyResult>
          )}
          <Disclaimer>Educational guide only. Each lender sets its own FOIR limits and also considers score, employment and other factors.</Disclaimer>
        </ResultPanel>
      }
    />
  )
}
