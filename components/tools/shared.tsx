"use client"

import { Info } from "lucide-react"
import type { ReactNode } from "react"

export const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN")

export const pct = (n: number, digits = 1) =>
  `${n.toLocaleString("en-IN", { maximumFractionDigits: digits })}%`

/** Parses a text input into a number. Returns null for empty or invalid input. */
export function parseNum(value: string): number | null {
  if (value.trim() === "") return null
  const n = Number(value.replace(/,/g, ""))
  return Number.isFinite(n) ? n : null
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  hint,
  error,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  prefix?: string
  suffix?: string
  placeholder?: string
  hint?: string
  error?: string | null
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#0E2454]">
        {label}
      </label>
      <div
        className={`flex items-center rounded-lg border bg-white focus-within:ring-2 focus-within:ring-[#1B3F8B]/30 ${
          error ? "border-red-400" : "border-[#D5DEEE]"
        }`}
      >
        {prefix && <span className="pl-3 text-sm text-[#4A5568]">{prefix}</span>}
        <input
          id={id}
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className="w-full bg-transparent px-3 py-2.5 text-sm text-[#0E2454] outline-none placeholder:text-gray-400"
        />
        {suffix && <span className="pr-3 text-sm text-[#4A5568]">{suffix}</span>}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-[#4A5568]">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#0E2454]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[#D5DEEE] bg-white px-3 py-2.5 text-sm text-[#0E2454] outline-none focus:ring-2 focus:ring-[#1B3F8B]/30"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function Stat({ label, value, tone = "navy" }: { label: string; value: string; tone?: "navy" | "gold" | "green" | "red" }) {
  const color = {
    navy: "text-[#1B3F8B]",
    gold: "text-[#B57D00]",
    green: "text-emerald-700",
    red: "text-red-600",
  }[tone]
  return (
    <div className="rounded-xl bg-white border border-[#E3EAF6] p-4">
      <p className="text-xs font-medium text-[#4A5568]">{label}</p>
      <p className={`mt-1 text-xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

export function ResultPanel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-[#EEF3FC] border border-[#D5DEEE] p-5 flex flex-col gap-4" aria-live="polite">
      {children}
    </div>
  )
}

export function EmptyResult({ children }: { children: ReactNode }) {
  return <p className="text-sm text-[#4A5568]">{children}</p>
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-xs text-[#4A5568] leading-relaxed">
      <Info size={14} className="mt-0.5 shrink-0 text-[#1B3F8B]" />
      <span>{children}</span>
    </p>
  )
}

export function ToolLayout({ form, result }: { form: ReactNode; result: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-4">{form}</div>
      <div>{result}</div>
    </div>
  )
}
