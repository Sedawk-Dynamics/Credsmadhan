"use client"

import { useState } from "react"
import { Disclaimer, EmptyResult, NumberField, ResultPanel, Stat, ToolLayout, inr, parseNum } from "./shared"

const MAX_MONTHS = 600

export function simulateMinimumDue(opts: {
  balance: number
  annualRate: number
  minDuePct: number
  minDueFloor: number
  monthlySpend: number
}) {
  const r = opts.annualRate / 12 / 100
  let bal = opts.balance
  let interest = 0
  let paid = 0
  let months = 0

  while (bal > 0.5 && months < MAX_MONTHS) {
    const monthInterest = bal * r
    interest += monthInterest
    bal += monthInterest + opts.monthlySpend
    const payment = Math.min(bal, Math.max(bal * (opts.minDuePct / 100), opts.minDueFloor))
    bal -= payment
    paid += payment
    months++
  }

  return { months, interest, paid, cleared: bal <= 0.5, remaining: Math.max(bal, 0) }
}

const fmtMonths = (m: number) => {
  const y = Math.floor(m / 12)
  const mo = m % 12
  return [y ? `${y} yr` : "", mo ? `${mo} mo` : ""].filter(Boolean).join(" ") || "0 mo"
}

export default function MinimumDueCalculator() {
  const [balance, setBalance] = useState("100000")
  const [rate, setRate] = useState("42")
  const [minPct, setMinPct] = useState("5")
  const [floor, setFloor] = useState("200")
  const [spend, setSpend] = useState("")

  const b = parseNum(balance)
  const r = parseNum(rate)
  const m = parseNum(minPct)
  const f = parseNum(floor)
  const s = parseNum(spend)

  const bErr = b === null ? null : b <= 0 ? "Enter an outstanding balance above zero." : null
  const rErr = r === null ? null : r < 0 || r > 60 ? "Enter an annual rate between 0% and 60%." : null
  const mErr = m === null ? null : m <= 0 || m > 100 ? "Enter a minimum due between 0.1% and 100%." : null
  const fErr = f !== null && f < 0 ? "Cannot be negative." : null
  const sErr = s !== null && s < 0 ? "Cannot be negative." : null

  const valid = b !== null && r !== null && m !== null && !bErr && !rErr && !mErr && !fErr && !sErr
  const result = valid
    ? simulateMinimumDue({ balance: b!, annualRate: r!, minDuePct: m!, minDueFloor: f ?? 0, monthlySpend: s ?? 0 })
    : null
  const firstPayment = valid ? Math.max(b! * (m! / 100), f ?? 0) : 0

  return (
    <ToolLayout
      form={
        <>
          <NumberField id="md-b" label="Outstanding card balance" prefix="₹" value={balance} onChange={setBalance} error={bErr} />
          <NumberField id="md-r" label="Annual interest rate" suffix="%" value={rate} onChange={setRate} error={rErr} hint="Most Indian cards charge about 36–48% a year (3–4% a month)." />
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="md-m" label="Minimum due" suffix="% of bal." value={minPct} onChange={setMinPct} error={mErr} />
            <NumberField id="md-f" label="Minimum floor" prefix="₹" value={floor} onChange={setFloor} error={fErr} />
          </div>
          <NumberField id="md-s" label="New monthly spend (optional)" prefix="₹" value={spend} onChange={setSpend} error={sErr} placeholder="0" />
        </>
      }
      result={
        <ResultPanel>
          {result ? (
            <>
              <p className="text-sm text-[#0E2454]">
                Paying only the minimum due (first payment about <strong>{inr(firstPayment)}</strong>):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Stat label="Time to clear" value={result.cleared ? fmtMonths(result.months) : "50+ years"} tone={result.cleared ? "navy" : "red"} />
                <Stat label="Interest paid" value={inr(result.interest)} tone="red" />
                <Stat label="Total paid" value={inr(result.paid)} />
              </div>
              {!result.cleared && (
                <p className="text-sm text-red-700">
                  At these numbers the balance is not cleared even after 50 years ({inr(result.remaining)} still due) — the minimum payment barely covers interest and new spending.
                </p>
              )}
              <p className="text-xs text-[#4A5568]">
                Assumptions: monthly interest = balance × annual rate ÷ 12, added before each payment; new spend added every month; payment = the higher of the minimum % and the floor.
              </p>
            </>
          ) : (
            <EmptyResult>Enter your balance, interest rate and minimum due to see how long it takes.</EmptyResult>
          )}
          <Disclaimer>
            Simplified model. GST on interest, late fees, over-limit charges and your bank&apos;s exact billing method are excluded, so real costs are usually higher.
          </Disclaimer>
        </ResultPanel>
      }
    />
  )
}
