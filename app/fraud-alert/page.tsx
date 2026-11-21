import type { Metadata } from "next"
import Link from "next/link"
import { ShieldAlert, Phone, Mail, Globe, AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Fraud Alert – Stay Safe from Financial Scams | Credsmadhan",
  description:
    "How to spot fake loan approvals, upfront fee fraud, fake recovery agents, phishing and OTP theft — and what to do immediately if you've been defrauded in India.",
}

const scams = [
  { title: "Fake loan approvals", text: "Messages or calls saying your loan is 'pre-approved' despite a low score — asking you to pay first or share documents on WhatsApp." },
  { title: "Upfront fee fraud", text: "Demands for 'processing', 'file' or 'insurance' charges before a loan is disbursed. Genuine lenders deduct fees from the loan or bill them transparently." },
  { title: "Fake recovery agents", text: "People threatening you over loans, often without ID or authority letters. Genuine recovery agents must follow RBI's fair practices code and cannot harass or threaten you." },
  { title: "Impersonation", text: "Fraudsters using the names of banks, RBI, police, courier companies — or Credsmadhan — to sound official." },
  { title: "Phishing links", text: "SMS, email or WhatsApp links to fake websites that look like your bank or a credit bureau, built to steal login details." },
  { title: "Suspicious WhatsApp messages", text: "Unknown numbers sending APK files, screen-sharing app links or 'KYC update' requests." },
  { title: "OTP / PIN theft", text: "Anyone asking for an OTP, UPI PIN, CVV or password is a fraudster — no bank or genuine company ever needs them." },
  { title: "Fraudulent credit enquiries", text: "Loans, cards or enquiries on your credit report that you never applied for can mean your identity has been misused." },
]

const neverDo = [
  "Ask for your OTP, UPI PIN, ATM PIN, CVV or internet-banking password",
  "Ask you to install screen-sharing or remote-access apps",
  "Promise a guaranteed loan approval or a guaranteed CIBIL score",
  "Offer to delete genuine negative history from your credit report",
]

export default function FraudAlertPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero */}
        <section className="bg-[#EEF4FF] py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5">
              <ShieldAlert size={32} className="text-[#1B3F8B]" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0E2454]">Stay Alert. Stay Protected.</h1>
            <p className="mt-4 text-[#4A5568] text-lg leading-relaxed">
              Fraudsters often target people facing loan or credit stress. Learn the warning signs, and what to do immediately if something goes wrong.
            </p>
          </div>
        </section>

        {/* Urgent help */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6 md:p-8">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-red-800">
                <AlertTriangle size={24} /> Lost money or shared your details? Act immediately
              </h2>
              <ol className="mt-5 grid gap-4 md:grid-cols-3">
                <li className="rounded-xl bg-white p-5 border border-red-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-red-700">Step 1</p>
                  <p className="mt-1 font-semibold text-[#0E2454]">Call your bank or payment app</p>
                  <p className="mt-1 text-sm text-[#4A5568]">
                    Use the number on your card or the official app to block cards, UPI and net banking. The sooner you report, the better your chances — RBI rules limit your liability when unauthorised transactions are reported quickly.
                  </p>
                </li>
                <li className="rounded-xl bg-white p-5 border border-red-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-red-700">Step 2</p>
                  <p className="mt-1 font-semibold text-[#0E2454]">Call 1930</p>
                  <p className="mt-1 text-sm text-[#4A5568]">
                    The national cyber financial fraud helpline. Calling quickly can help freeze money before it moves.
                  </p>
                  <a href="tel:1930" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700">
                    <Phone size={14} /> Call 1930
                  </a>
                </li>
                <li className="rounded-xl bg-white p-5 border border-red-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-red-700">Step 3</p>
                  <p className="mt-1 font-semibold text-[#0E2454]">File a complaint online</p>
                  <p className="mt-1 text-sm text-[#4A5568]">Register a complaint on the official National Cyber Crime Reporting Portal and keep the acknowledgement number.</p>
                  <a
                    href="https://cybercrime.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                  >
                    cybercrime.gov.in <ExternalLink size={14} />
                  </a>
                </li>
              </ol>
              <p className="mt-5 text-xs text-red-900/80">
                Credsmadhan is not a government or official reporting authority. Always report fraud to your bank, 1930 and cybercrime.gov.in first. We can then help with follow-ups and documentation through our{" "}
                <Link href="/services/cyber-fraud-support" className="underline font-semibold">Cyber Fraud Complaint Support</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Scam types */}
        <section className="py-12 bg-[#F7F9FC]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-3xl font-bold text-[#0E2454] text-center">Common scams to watch for</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {scams.map((s) => (
                <div key={s.title} className="rounded-2xl bg-white border border-[#E3EAF6] p-5">
                  <h3 className="font-semibold text-[#0E2454]">{s.title}</h3>
                  <p className="mt-2 text-sm text-[#4A5568] leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verify Credsmadhan */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#E3EAF6] p-6">
              <h2 className="text-xl font-bold text-[#0E2454]">Our official contact details</h2>
              <p className="mt-2 text-sm text-[#4A5568]">If someone claims to represent Credsmadhan, verify using only these details:</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-[#F0A500]" />
                  <a href="tel:9053903719" className="font-semibold text-[#1B3F8B]">+91 9053903719</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-[#F0A500]" />
                  <a href="mailto:support@credsmadhan.com" className="font-semibold text-[#1B3F8B]">support@credsmadhan.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <Globe size={16} className="text-[#F0A500]" />
                  <span className="font-semibold text-[#1B3F8B]">www.credsmadhan.com</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-[#4A5568]">
                Online credit report purchases are made only on our{" "}
                <Link href="/know-your-cibil-score" className="underline text-[#1B3F8B]">Know Your CIBIL Score</Link> page. Before paying anyone in our name through any other channel, call us on the number above to confirm.
              </p>
            </div>
            <div className="rounded-2xl border border-[#E3EAF6] p-6 bg-[#F7F9FC]">
              <h2 className="text-xl font-bold text-[#0E2454]">Credsmadhan will never</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {neverDo.map((n) => (
                  <li key={n} className="flex items-start gap-3 text-sm text-[#0E2454]">
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Report suspicious activity */}
        <section className="py-12 bg-[#EEF4FF]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-bold text-[#0E2454]">Received a suspicious call or message using our name?</h2>
            <p className="mt-3 text-[#4A5568]">
              Tell us the date, the number or link, and what was said. Please <strong>do not</strong> send OTPs, PINs, passwords or full card numbers — we never need them.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact-us" className="px-6 py-3 rounded-xl bg-[#1B3F8B] text-white font-semibold hover:bg-[#142f6b]">
                Contact us
              </Link>
              <a href="mailto:support@credsmadhan.com?subject=Suspicious%20activity%20report" className="px-6 py-3 rounded-xl border-2 border-[#1B3F8B] text-[#1B3F8B] font-semibold hover:bg-white">
                Email support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
