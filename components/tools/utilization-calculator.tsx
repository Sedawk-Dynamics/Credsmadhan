"use client"

import { useRef, useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Disclaimer, EmptyResult, ResultPanel, Stat, inr, parseNum, pct } from "./shared"

type Card = { id: number; name: string; limit: string; balance: string }

function guidance(u: number) {
  if (u <= 30) return { tone: "green" as const, text: "Healthy — under 30% is generally viewed well." }
  if (u <= 50) return { tone: "gold" as const, text: "Moderate — try to bring it below 30%." }
  return { tone: "red" as const, text: "High — heavy usage can pull your score down. Pay down this card first." }
}

export default function UtilizationCalculator() {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, name: "Card 1", limit: "100000", balance: "45000" },
    { id: 2, name: "Card 2", limit: "50000", balance: "10000" },
  ])
  const nextId = useRef(3)

  const addCard = () => {
    const id = nextId.current++
    setCards((cs) => [...cs, { id, name: `Card ${id}`, limit: "", balance: "" }])
  }

  const update = (id: number, field: keyof Card, value: string) =>
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, [field]: value } : c)))

  const parsed = cards.map((c) => {
    const limit = parseNum(c.limit)
    const balance = parseNum(c.balance)
    const error =
      limit === null || balance === null
        ? null
        : limit <= 0
          ? "Limit must be above zero."
          : balance < 0
            ? "Balance cannot be negative."
            : null
    const ok = limit !== null && balance !== null && !error
    return { ...c, limitN: limit, balanceN: balance, error, ok, util: ok ? (balance! / limit!) * 100 : null }
  })

  const valid = parsed.filter((c) => c.ok)
  const totalLimit = valid.reduce((s, c) => s + c.limitN!, 0)
  const totalBal = valid.reduce((s, c) => s + c.balanceN!, 0)
  const overall = totalLimit > 0 ? (totalBal / totalLimit) * 100 : null
  const view = overall !== null ? guidance(overall) : null

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        {parsed.map((c, idx) => (
          <fieldset key={c.id} className="rounded-xl border border-[#D5DEEE] bg-white p-4">
            <legend className="sr-only">Card {idx + 1}</legend>
            <div className="flex items-center justify-between gap-2 mb-3">
              <input
                aria-label={`Card ${idx + 1} name`}
                value={c.name}
                onChange={(e) => update(c.id, "name", e.target.value)}
                className="text-sm font-semibold text-[#0E2454] bg-transparent outline-none border-b border-transparent focus:border-[#1B3F8B] w-40"
              />
              {cards.length > 1 && (
                <button
                  type="button"
                  onClick={() => setCards((cs) => cs.filter((x) => x.id !== c.id))}
                  className="p-1.5 rounded-md text-[#4A5568] hover:text-red-600 hover:bg-red-50"
                  aria-label={`Remove ${c.name}`}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-xs font-medium text-[#4A5568]">
                Credit limit (₹)
                <input
                  inputMode="decimal"
                  value={c.limit}
                  onChange={(e) => update(c.id, "limit", e.target.value)}
                  className="rounded-lg border border-[#D5DEEE] px-3 py-2 text-sm text-[#0E2454] outline-none focus:ring-2 focus:ring-[#1B3F8B]/30"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-[#4A5568]">
                Current balance (₹)
                <input
                  inputMode="decimal"
                  value={c.balance}
                  onChange={(e) => update(c.id, "balance", e.target.value)}
                  className="rounded-lg border border-[#D5DEEE] px-3 py-2 text-sm text-[#0E2454] outline-none focus:ring-2 focus:ring-[#1B3F8B]/30"
                />
              </label>
            </div>
            {c.error && <p className="text-xs text-red-600 mt-2">{c.error}</p>}
          </fieldset>
        ))}
        {cards.length < 10 && (
          <button
            type="button"
            onClick={addCard}
            className="self-start inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3F8B] hover:text-[#F0A500]"
          >
            <Plus size={16} /> Add another card
          </button>
        )}
      </div>

      <ResultPanel>
        {overall !== null && view ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Stat label="Overall utilization" value={pct(overall)} tone={view.tone} />
              <Stat label="Total balance" value={inr(totalBal)} />
              <Stat label="Total limit" value={inr(totalLimit)} />
            </div>
            <p className="text-sm text-[#0E2454]">{view.text}</p>
            <ul className="flex flex-col gap-2">
              {valid.map((c) => {
                const g = guidance(c.util!)
                return (
                  <li key={c.id} className="flex items-start justify-between gap-3 rounded-lg bg-white border border-[#E3EAF6] px-3 py-2 text-sm">
                    <span className="font-medium text-[#0E2454]">{c.name}</span>
                    <span className="text-right">
                      <span className={g.tone === "green" ? "text-emerald-700 font-semibold" : g.tone === "gold" ? "text-[#B57D00] font-semibold" : "text-red-600 font-semibold"}>
                        {pct(c.util!)}
                      </span>
                      <span className="block text-xs text-[#4A5568]">{g.text}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <p className="text-xs text-[#4A5568]">Utilization = total balances ÷ total credit limits × 100</p>
          </>
        ) : (
          <EmptyResult>Enter the limit and balance for at least one card.</EmptyResult>
        )}
        <Disclaimer>Educational guide. Bureaus use the balance reported by your bank on the statement date, which may differ from today&apos;s balance.</Disclaimer>
      </ResultPanel>
    </div>
  )
}
