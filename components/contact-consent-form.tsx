"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, Loader, ShieldCheck, UserRound } from "lucide-react"
import { contactConsentSchema, contactServices, consentDeclaration, consentStatements } from "@/lib/contact-consent"

export default function ContactConsentForm() {
  const [loading, setLoading] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const [confirmationSent, setConfirmationSent] = useState(false)
  const [error, setError] = useState("")
  const submitting = useRef(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    setError("")
    const fields = new FormData(event.currentTarget)
    const result = contactConsentSchema.safeParse({
      name: fields.get("name"), email: fields.get("email"),
      phone: fields.get("phone"), service: fields.get("service"),
      ...Object.fromEntries(consentStatements.map(({ key }) => [key, fields.get(key) === "on"])),
    })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }
    submitting.current = true
    setLoading(true)
    try {
      const response = await fetch("/api/contact-send", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Unable to submit your consent. Please try again.")
      setConfirmationSent(data.confirmationSent === true)
      setSubmittedEmail(result.data.email)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit your consent. Please try again.")
    } finally {
      submitting.current = false
      setLoading(false)
    }
  }

  if (submittedEmail) return (
    <div role="status" className="rounded-2xl border-2 border-green-200 bg-green-50 p-6 sm:p-10 text-center">
      <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" aria-hidden="true" />
      <h2 className="text-2xl font-bold text-[#1B3F8B] mb-3">Consent Submitted Successfully!</h2>
      <p className="text-gray-700 mb-4">Thank you for providing your consent. We have received your authorization and will contact you within 24 hours.</p>
      <p className="text-sm text-gray-600">{confirmationSent ? <>A confirmation email has been sent to <strong className="break-all">{submittedEmail}</strong>.</> : "Your submission was received, but we could not send the confirmation email. You do not need to submit again."}</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-[#1B3F8B] px-6 py-3 font-semibold text-white">Return to Home</Link>
    </div>
  )

  const inputClass = "w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-[#1B3F8B] focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/20"
  const linkClass = "font-semibold text-[#1B3F8B] underline underline-offset-2"

  return (
    <div>
      <div className="mb-8 flex items-start gap-3 border-l-4 border-amber-500 bg-amber-50 p-5 sm:p-6">
        <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-amber-600" aria-hidden="true" />
        <div className="text-gray-700 leading-relaxed"><p className="mb-2 font-semibold text-gray-900">Important Information:</p><p>By submitting this consent form, you authorize Credsmadhan (Arthvera LLP) to act on your behalf for the services requested. Please read the statements and linked policies before proceeding.</p></div>
      </div>
      <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-8 shadow-xl" aria-busy={loading}>
        <fieldset disabled={loading} className="space-y-6 min-w-0">
          <legend className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#1B3F8B]"><UserRound className="h-7 w-7 shrink-0" aria-hidden="true" />Personal Information</legend>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", autoComplete: "name", maxLength: 100 },
              { name: "email", label: "Email Address", type: "email", placeholder: "your.email@example.com", autoComplete: "email", maxLength: 254 },
              { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 1234567890", autoComplete: "tel", maxLength: 25 },
            ].map(field => <div key={field.name}>
              <label htmlFor={field.name} className="mb-2 block font-semibold text-gray-700">{field.label} <span className="text-red-600">*</span></label>
              <input id={field.name} name={field.name} type={field.type} placeholder={field.placeholder} autoComplete={field.autoComplete} maxLength={field.maxLength} required className={inputClass} />
            </div>)}
            <div><label htmlFor="service" className="mb-2 block font-semibold text-gray-700">Service Type <span className="text-red-600">*</span></label>
              <select id="service" name="service" required defaultValue="" className={inputClass}>
                <option value="" disabled>Select Service</option>
                {contactServices.map(service => <option key={service}>{service}</option>)}
              </select>
            </div>
          </div>
          <div className="border-t-2 border-gray-100 pt-6">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-[#1B3F8B]"><ShieldCheck className="h-7 w-7 shrink-0" aria-hidden="true" />Consent &amp; Authorization</h2>
            <p className="mb-6 text-gray-600">Please read each statement carefully and check all six boxes to provide your consent.</p>
            <div className="space-y-4">
              {consentStatements.map(({ key, text }) => <label key={key} className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-gray-200 bg-gray-50 p-4 transition-colors hover:border-blue-300 focus-within:border-[#1B3F8B]">
                <input type="checkbox" name={key} required className="mt-1 h-5 w-5 shrink-0 accent-[#1B3F8B]" />
                <span className="text-gray-700 leading-relaxed">{key === "consent4" ? <>I have read and agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className={linkClass}>Terms &amp; Conditions</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className={linkClass}>Privacy Policy</a> of Credsmadhan.</> : text}</span>
              </label>)}
            </div>
          </div>
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-5 sm:p-6"><p className="mb-2 font-semibold text-gray-900">Declaration:</p><p className="leading-relaxed text-gray-700">{consentDeclaration}</p></div>
          {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}
          <div className="flex flex-col-reverse justify-end gap-4 sm:flex-row">
            <Link href="/" className="rounded-lg border-2 border-gray-300 px-8 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50">Cancel</Link>
            <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1B3F8B] to-[#2a52a8] px-8 py-3 font-semibold text-white transition-shadow hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50">
              {loading && <Loader className="h-5 w-5 animate-spin" aria-hidden="true" />}{loading ? "Submitting..." : "Submit Consent"}
            </button>
          </div>
        </fieldset>
      </form>
      <p className="mt-8 rounded-lg bg-gray-50 p-6 text-sm leading-relaxed text-gray-700"><strong>Note:</strong> By submitting this form, you provide explicit consent for Credsmadhan (Arthvera LLP) to process your information. This consent is valid until revoked by you in writing. For questions, contact <a href="mailto:support@credsmadhan.com" className={`${linkClass} break-all`}>support@credsmadhan.com</a> or <a href="tel:+919053903719" className={linkClass}>+91 9053903719</a>.</p>
    </div>
  )
}
