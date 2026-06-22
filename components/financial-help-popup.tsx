"use client"

import { useState, useEffect, useRef, type ChangeEvent } from "react"
import { X, ChevronLeft, ChevronDown, Upload, FileText, Check, Loader2, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Category = { id: string; label: string }

const CATEGORIES: Category[] = [
  { id: "cibil", label: "CIBIL Report & Correction Support" },
  { id: "debt", label: "Debt Stress & Loan Guidance" },
  { id: "banking", label: "Banking & Credit Card Dispute Support" },
  { id: "cyber", label: "Cyber Fraud Complaint Support" },
  { id: "insurance", label: "Insurance Mis-Selling & Policy Issue Support" },
  { id: "unclaimed", label: "Unclaimed Money & Recovery Support" },
  { id: "grievance", label: "Grievance & Complaint Escalation Support" },
  { id: "documentation", label: "Documentation & Case Facilitation Support" },
  { id: "comprehensive", label: "Comprehensive Financial Problem Resolution" },
  { id: "workplace", label: "Workplace & POSH Complaints Support" },
  { id: "sarfaesi", label: "Recovery & SARFAESI Action Support" },
  { id: "other", label: "Any Problem – Share with Us" },
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]

const inputClass =
  "w-full px-4 py-3 rounded-lg border-2 border-[#E2E8F0] focus:border-[#1B3F8B] focus:outline-none transition-colors text-[#4A5568]"
const labelClass = "block text-sm font-semibold text-[#1B3F8B] mb-1.5"

type Details = Record<string, string>
type UploadKey = "pan" | "aadhaar" | "supporting"
type Files = Partial<Record<UploadKey, File>>
type FileErrors = Partial<Record<UploadKey, string>>

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidIndianPhone(phone: string) {
  return /^[6-9]\d{9}$/.test(phone)
}

export default function FinancialHelpPopup({ autoOpen = false }: { autoOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)

  const [user, setUser] = useState({ name: "", email: "", phone: "" })
  const [userErrors, setUserErrors] = useState<{ name?: string; email?: string; phone?: string }>({})

  const [category, setCategory] = useState<Category | null>(null)
  const [details, setDetails] = useState<Details>({})
  const [files, setFiles] = useState<Files>({})
  const [fileErrors, setFileErrors] = useState<FileErrors>({})

  // category dropdown state (opens downward)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // submission state
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (autoOpen) {
      timer = setTimeout(() => setIsOpen(true), 10000)
    }
    const handleOpenEvent = () => setIsOpen(true)
    window.addEventListener("open-financial-popup", handleOpenEvent)
    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener("open-financial-popup", handleOpenEvent)
    }
  }, [autoOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const resetAll = () => {
    setStep(1)
    setUser({ name: "", email: "", phone: "" })
    setUserErrors({})
    setCategory(null)
    setDetails({})
    setFiles({})
    setFileErrors({})
    setDropdownOpen(false)
    setSubmitting(false)
    setSubmitError("")
    setSubmitted(false)
  }

  const close = () => {
    setIsOpen(false)
    resetAll()
  }

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const setDetail = (key: string, value: string) => {
    setDetails((prev) => ({ ...prev, [key]: value }))
  }

  const validateStep1 = () => {
    const errors: typeof userErrors = {}
    if (user.name.trim().length < 2) errors.name = "Please enter your name"
    if (!isValidEmail(user.email)) errors.email = "Enter a valid email address"
    if (!isValidIndianPhone(user.phone)) errors.phone = "Enter a valid 10-digit mobile number"
    setUserErrors(errors)
    return Object.keys(errors).length === 0
  }

  const goToStep2 = () => {
    if (validateStep1()) setStep(2)
  }

  const handleFile = (key: UploadKey, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileErrors((prev) => ({ ...prev, [key]: "Only PDF, JPG, JPEG, PNG allowed" }))
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileErrors((prev) => ({ ...prev, [key]: "File must be under 5MB" }))
      return
    }
    setFileErrors((prev) => ({ ...prev, [key]: undefined }))
    setFiles((prev) => ({ ...prev, [key]: file }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!category) return

    setSubmitting(true)
    setSubmitError("")

    try {
      const body = new FormData()
      body.append("name", user.name)
      body.append("email", user.email)
      body.append("phone", user.phone)
      body.append("category", category.id)
      body.append("categoryLabel", category.label)
      body.append("details", JSON.stringify(details))
      ;(Object.keys(files) as UploadKey[]).forEach((key) => {
        const file = files[key]
        if (file) body.append(key, file)
      })

      const res = await fetch("/api/financial-help", { method: "POST", body })
      const json = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(json.error || "Failed to submit your request. Please try again.")
      }

      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={close}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <button
                onClick={close}
                className="absolute top-4 right-4 z-10 text-[#4A5568] hover:text-[#1B3F8B] transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              <div className="p-8 overflow-y-auto">
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-[#1B3F8B] mb-2">Request Submitted!</h2>
                    <p className="text-[#4A5568] mb-6">
                      Thank you, {user.name.split(" ")[0] || "there"}. Our team will contact you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={close}
                      className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#F0A500] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 text-lg"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                <>
                {/* Header */}
                <div className="mb-6 pr-6">
                  {step === 2 && (
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1 text-sm text-[#1B3F8B] mb-3 hover:underline"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  )}
                  <h2 className="text-3xl font-bold text-[#1B3F8B] mb-2">Need Financial Help?</h2>
                  <p className="text-[#4A5568]">
                    {step === 1
                      ? "Get a free consultation from our experts."
                      : "Tell us about your problem so we can help."}
                  </p>
                  {/* step indicator */}
                  <div className="flex gap-2 mt-4">
                    <span className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-[#F0A500]" : "bg-[#E2E8F0]"}`} />
                    <span className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-[#F0A500]" : "bg-[#E2E8F0]"}`} />
                  </div>
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={user.name}
                        onChange={handleUserChange}
                        className={inputClass}
                      />
                      {userErrors.name && <p className="text-red-500 text-xs mt-1">{userErrors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={user.email}
                        onChange={handleUserChange}
                        className={inputClass}
                      />
                      {userErrors.email && <p className="text-red-500 text-xs mt-1">{userErrors.email}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={user.phone}
                        onChange={handleUserChange}
                        maxLength={10}
                        className={inputClass}
                      />
                      {userErrors.phone && <p className="text-red-500 text-xs mt-1">{userErrors.phone}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={goToStep2}
                      className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#F0A500] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 text-lg"
                    >
                      Next →
                    </button>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Category dropdown (opens downward, in-flow) */}
                    <div ref={dropdownRef}>
                      <label className={labelClass}>Problem Category</label>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen((o) => !o)}
                        className={`${inputClass} bg-white flex items-center justify-between text-left`}
                      >
                        <span className={category ? "text-[#4A5568]" : "text-gray-400"}>
                          {category ? category.label : "Select a Problem Category"}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-[#1B3F8B] shrink-0 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {dropdownOpen && (
                        <div className="mt-2 w-full bg-white border-2 border-[#E2E8F0] rounded-lg shadow-xl max-h-64 overflow-y-auto">
                          {CATEGORIES.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                setCategory(c)
                                setDetails({})
                                setDropdownOpen(false)
                              }}
                              className="w-full text-left px-4 py-2.5 text-sm text-[#4A5568] hover:bg-[#E0EAFF] flex items-center justify-between"
                            >
                              {c.label}
                              {category?.id === c.id && <Check size={16} className="text-[#1B3F8B]" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dynamic per-category fields */}
                    {category && (
                      <div className="space-y-4">
                        <CategoryFields category={category.id} details={details} setDetail={setDetail} />

                        {/* Uploads for every category */}
                        <div className="pt-2 border-t border-[#E2E8F0]">
                          <p className="text-sm font-semibold text-[#1B3F8B] mb-1">Supporting Documents (Optional)</p>
                          <p className="text-xs text-gray-400 mb-3">PDF, JPG, JPEG, PNG · Max 5MB each</p>
                          <div className="space-y-3">
                            <FileField label="PAN Card" fileKey="pan" file={files.pan} error={fileErrors.pan} onChange={handleFile} />
                            <FileField label="Aadhaar Card" fileKey="aadhaar" file={files.aadhaar} error={fileErrors.aadhaar} onChange={handleFile} />
                            <FileField label="Other Documents" fileKey="supporting" file={files.supporting} error={fileErrors.supporting} onChange={handleFile} />
                          </div>
                        </div>

                        {submitError && (
                          <p className="text-red-500 text-sm text-center">{submitError}</p>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#F0A500] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <>
                              <Loader2 size={20} className="animate-spin" /> Submitting...
                            </>
                          ) : (
                            "Get Free Call Back"
                          )}
                        </button>
                      </div>
                    )}
                  </form>
                )}
                </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ---------- Reusable field components ---------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  )
}

function Text({
  label,
  field,
  details,
  setDetail,
  type = "text",
  placeholder,
}: {
  label: string
  field: string
  details: Details
  setDetail: (k: string, v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <Field label={label}>
      <input
        type={type}
        value={details[field] || ""}
        placeholder={placeholder}
        onChange={(e) => setDetail(field, e.target.value)}
        className={inputClass}
      />
    </Field>
  )
}

function TextArea({
  label,
  field,
  details,
  setDetail,
}: {
  label: string
  field: string
  details: Details
  setDetail: (k: string, v: string) => void
}) {
  return (
    <Field label={label}>
      <textarea
        value={details[field] || ""}
        onChange={(e) => setDetail(field, e.target.value)}
        rows={4}
        className={`${inputClass} resize-none`}
      />
    </Field>
  )
}

function SelectField({
  label,
  field,
  options,
  details,
  setDetail,
}: {
  label: string
  field: string
  options: string[]
  details: Details
  setDetail: (k: string, v: string) => void
}) {
  return (
    <Field label={label}>
      <select
        value={details[field] || ""}
        onChange={(e) => setDetail(field, e.target.value)}
        className={`${inputClass} bg-white`}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Field>
  )
}

function YesNo({
  label,
  field,
  details,
  setDetail,
  options = ["Yes", "No"],
}: {
  label: string
  field: string
  details: Details
  setDetail: (k: string, v: string) => void
  options?: string[]
}) {
  return (
    <Field label={label}>
      <div className="flex gap-3">
        {options.map((opt) => {
          const active = details[field] === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setDetail(field, opt)}
              className={`flex-1 py-2.5 rounded-lg border-2 font-medium transition-colors ${
                active
                  ? "border-[#1B3F8B] bg-[#E0EAFF] text-[#1B3F8B]"
                  : "border-[#E2E8F0] text-[#4A5568] hover:border-[#1B3F8B]"
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </Field>
  )
}

function FileField({
  label,
  fileKey,
  file,
  error,
  onChange,
}: {
  label: string
  fileKey: UploadKey
  file?: File
  error?: string
  onChange: (key: UploadKey, e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label className="flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-dashed border-[#E2E8F0] hover:border-[#1B3F8B] cursor-pointer transition-colors">
        {file ? <FileText size={18} className="text-[#1B3F8B] shrink-0" /> : <Upload size={18} className="text-[#1B3F8B] shrink-0" />}
        <span className="text-sm text-[#4A5568] truncate">{file ? file.name : `Upload ${label}`}</span>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => onChange(fileKey, e)}
          className="hidden"
        />
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

/* ---------- Per-category dynamic fields ---------- */

function CategoryFields({
  category,
  details,
  setDetail,
}: {
  category: string
  details: Details
  setDetail: (k: string, v: string) => void
}) {
  switch (category) {
    case "cibil":
      return (
        <>
          <YesNo label="Do you know your current CIBIL score?" field="knowsScore" details={details} setDetail={setDetail} />
          {details.knowsScore === "Yes" && (
            <>
              <Text label="Enter CIBIL Score" field="cibilScore" type="number" details={details} setDetail={setDetail} />
              <SelectField
                label="What issue are you facing?"
                field="issueType"
                options={[
                  "Wrong loan showing",
                  "Incorrect payment status",
                  "Low score issue",
                  "Duplicate account",
                  "Closed loan still active",
                  "Other",
                ]}
                details={details}
                setDetail={setDetail}
              />
            </>
          )}
          {details.knowsScore === "No" && (
            <YesNo label="Would you like help checking your CIBIL report?" field="wantsHelpChecking" details={details} setDetail={setDetail} />
          )}
          <TextArea label="Problem Description" field="problemDescription" details={details} setDetail={setDetail} />
        </>
      )

    case "debt":
      return (
        <>
          <Text label="Total Loan Amount" field="loanAmount" type="number" details={details} setDetail={setDetail} />
          <SelectField label="EMI Difficulty" field="emiDifficulty" options={["Low", "Medium", "High"]} details={details} setDetail={setDetail} />
          <YesNo label="Are recovery agents contacting you?" field="recoveryAgents" details={details} setDetail={setDetail} />
          <TextArea label="Problem Description" field="problemDescription" details={details} setDetail={setDetail} />
        </>
      )

    case "banking":
      return (
        <>
          <SelectField
            label="Issue Type"
            field="issueType"
            options={[
              "Unauthorized transaction",
              "Hidden charges",
              "Credit card settlement",
              "Account freeze",
              "Bank fraud",
              "Other",
            ]}
            details={details}
            setDetail={setDetail}
          />
          <Text label="Bank Name" field="bankName" details={details} setDetail={setDetail} />
          <TextArea label="Problem Description" field="problemDescription" details={details} setDetail={setDetail} />
        </>
      )

    case "cyber":
      return (
        <>
          <Text label="Fraud Amount" field="fraudAmount" type="number" details={details} setDetail={setDetail} />
          <Text label="Fraud Date" field="fraudDate" type="date" details={details} setDetail={setDetail} />
          <YesNo label="Already reported to cyber cell?" field="reportedToCyberCell" details={details} setDetail={setDetail} />
          <TextArea label="Problem Description" field="problemDescription" details={details} setDetail={setDetail} />
        </>
      )

    case "insurance":
      return (
        <>
          <Text label="Insurance Company Name" field="companyName" details={details} setDetail={setDetail} />
          <Text label="Policy Type" field="policyType" details={details} setDetail={setDetail} />
          <SelectField
            label="Issue Type"
            field="issueType"
            options={["Hidden terms", "Wrong selling", "Claim rejection", "Refund issue", "Other"]}
            details={details}
            setDetail={setDetail}
          />
          <TextArea label="Problem Description" field="problemDescription" details={details} setDetail={setDetail} />
        </>
      )

    case "unclaimed":
      return (
        <>
          <Text label="Amount (Optional)" field="amount" type="number" details={details} setDetail={setDetail} />
          <Text label="Institution Name" field="institutionName" details={details} setDetail={setDetail} />
          <TextArea label="Problem Description" field="problemDescription" details={details} setDetail={setDetail} />
        </>
      )

    case "grievance":
      return (
        <>
          <YesNo label="Complaint already filed?" field="complaintFiled" details={details} setDetail={setDetail} />
          <Text label="Authority / Company Name" field="authorityName" details={details} setDetail={setDetail} />
          <TextArea label="Problem Description" field="problemDescription" details={details} setDetail={setDetail} />
        </>
      )

    case "documentation":
      return (
        <>
          <Text label="Documentation Type Needed" field="documentationType" details={details} setDetail={setDetail} />
          <TextArea label="Problem Description" field="problemDescription" details={details} setDetail={setDetail} />
        </>
      )

    case "comprehensive":
      return (
        <>
          <Text label="Brief Issue Category" field="briefIssue" details={details} setDetail={setDetail} />
          <SelectField label="Severity Level" field="severity" options={["Low", "Medium", "High"]} details={details} setDetail={setDetail} />
          <TextArea label="Problem Description" field="problemDescription" details={details} setDetail={setDetail} />
        </>
      )

    case "workplace":
      return (
        <>
          <Text label="Workplace Type" field="workplaceType" details={details} setDetail={setDetail} />
          <Text label="Complaint Type" field="complaintType" details={details} setDetail={setDetail} />
          <YesNo label="Need confidential assistance?" field="confidential" details={details} setDetail={setDetail} />
          <TextArea label="Problem Description" field="problemDescription" details={details} setDetail={setDetail} />
        </>
      )

    case "sarfaesi":
      return (
        <>
          <YesNo label="Have you received notice?" field="receivedNotice" details={details} setDetail={setDetail} />
          <Text label="Loan Type" field="loanType" details={details} setDetail={setDetail} />
          <Text label="Bank Name" field="bankName" details={details} setDetail={setDetail} />
          <TextArea label="Problem Description" field="problemDescription" details={details} setDetail={setDetail} />
        </>
      )

    case "other":
      return <TextArea label="Tell us your issue" field="problemDescription" details={details} setDetail={setDetail} />

    default:
      return null
  }
}
