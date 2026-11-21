import Link from "next/link"
import { ShieldAlert, PhoneOff, KeyRound, Wallet, BadgeX, ArrowRight } from "lucide-react"

const cards = [
  { icon: PhoneOff, title: "Fake Calls", text: "Callers posing as banks, lenders or Credsmadhan staff." },
  { icon: KeyRound, title: "OTP / Password Safety", text: "Never share OTP, PIN, CVV or passwords with anyone." },
  { icon: Wallet, title: "Payment Fraud", text: "Upfront 'processing fees' for loans that never arrive." },
  { icon: BadgeX, title: "Fake CIBIL Guarantees", text: "No one can guarantee a score or delete genuine history." },
]

export default function FraudAlertTeaser() {
  return (
    <section id="fraud-alert" className="py-16 md:py-20 bg-[#EEF4FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4">
            <ShieldAlert size={28} className="text-[#1B3F8B]" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0E2454]">Stay Alert. Stay Protected.</h2>
          <p className="mt-3 text-[#4A5568] max-w-2xl">
            Financial fraud often targets people already under credit stress. Know the warning signs.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white border border-[#D5DEEE] p-5">
              <Icon size={22} className="text-[#1B3F8B]" />
              <h3 className="mt-3 font-semibold text-[#0E2454]">{title}</h3>
              <p className="mt-1.5 text-sm text-[#4A5568] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/fraud-alert" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B3F8B] text-white font-semibold rounded-xl hover:bg-[#142f6b] transition">
            Learn How to Stay Safe <ArrowRight size={16} />
          </Link>
          <p className="text-sm text-[#0E2454]">
            Lost money to fraud? Call <a href="tel:1930" className="font-bold underline">1930</a> immediately.
          </p>
        </div>
      </div>
    </section>
  )
}
