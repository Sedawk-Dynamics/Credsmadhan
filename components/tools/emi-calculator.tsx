"use client"

import { useState } from "react"
import { Disclaimer, EmptyResult, NumberField, ResultPanel, Stat, ToolLayout, inr, parseNum } from "./shared"

export function calculateEmi(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100
  const emi = r === 0 ? principal / months : (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1)
  const total = emi * months
  return { emi, total, interest: total - principal }
}

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState("500000")
  const [rate, setRate] = useState("12")
  const [years, setYears] = useState("3")

  const p = parseNum(principal)
  const r = parseNum(rate)
  const y = parseNum(years)

  const pErr = p === null ? null : p <= 0 ? "Enter a loan amount above zero." : null
  const rErr = r === null ? null : r < 0 || r > 60 ? "Enter an annual rate between 0% and 60%." : null
  const yErr = y === null ? null : y <= 0 || y > 30 ? "Enter a tenure between 1 month and 30 years." : null

  const valid = p !== null && r !== null && y !== null && !pErr && !rErr && !yErr
  const months = valid ? Math.max(1, Math.round(y! * 12)) : 0
  const result = valid ? calculateEmi(p!, r!, months) : null

  return (
    <ToolLayout
      form={
        <>
          <NumberField id="emi-p" label="Loan amount" prefix="₹" value={principal} onChange={setPrincipal} error={pErr} />
          <NumberField id="emi-r" label="Annual interest rate" suffix="%" value={rate} onChange={setRate} error={rErr} />
          <NumberField
            id="emi-y"
            label="Tenure"
            suffix="years"
            value={years}
            onChange={setYears}
            error={yErr}
            hint="Decimals allowed, e.g. 1.5 = 18 months."
          />
        </>
      }
      result={
        <ResultPanel>
          {result ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Stat label="Monthly EMI" value={inr(result.emi)} />
                <Stat label="Total interest" value={inr(result.interest)} tone="gold" />
                <Stat label="Total payment" value={inr(result.total)} />
              </div>
              <p className="text-xs text-[#4A5568]">
                Formula: EMI = P × r × (1 + r)<sup>n</sup> ÷ ((1 + r)<sup>n</sup> − 1), where r is the monthly rate and n = {months} months.
              </p>
            </>
          ) : (
            <EmptyResult>Enter a loan amount, rate and tenure to see your EMI.</EmptyResult>
          )}
          <Disclaimer>
            Indicative only. Processing fees, insurance, GST and the lender&apos;s exact rate and rounding are not included.
          </Disclaimer>
        </ResultPanel>
      }
    />
  )
}
