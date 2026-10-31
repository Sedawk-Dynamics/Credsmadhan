import { z } from "zod"

export const contactServices = [
  "Credit & CIBIL Analysis & Rectification",
  "Loan & EMI Stress Guidance",
  "Banking & Credit Card Support",
  "Cyber Fraud Complaint Support",
  "Insurance Issue Assistance",
  "Unclaimed Money Support",
  "Grievance & Complaint Escalation",
  "Documentation & Case Facilitation",
  "Other",
] as const

export const consentStatements = [
  { key: "consent1", text: "I authorize Credsmadhan (Arthvera LLP) to collect, process, and use my personal information and documents for the purpose of providing the requested services." },
  { key: "consent2", text: "I authorize Credsmadhan to act as my representative and submit applications, claims, and documents to financial institutions, regulatory authorities, and government bodies on my behalf for the requested services." },
  { key: "consent3", text: "I understand that Credsmadhan provides guidance and assistance services only and does not guarantee specific outcomes. Final decisions rest with respective institutions and authorities." },
  { key: "consent4", text: "I have read and agree to the Terms & Conditions and Privacy Policy of Credsmadhan." },
  { key: "consent5", text: "I consent to receive communications from Credsmadhan via phone, email, WhatsApp, and SMS regarding my case status and updates." },
  { key: "consent6", text: "I acknowledge that Credsmadhan is not a bank, NBFC, or financial institution. I understand that all financial decisions should be made by me after independent assessment, as described in the Terms & Conditions." },
] as const

export const consentDeclaration = "I hereby declare that the information provided is true and correct to the best of my knowledge. I understand that providing false information may result in rejection of my application/claim and legal consequences."
export const consentVersion = "2026-10-31"

const accepted = z.literal(true, { errorMap: () => ({ message: "Please accept all six consent statements to proceed." }) })
export const contactConsentSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100).regex(/^[^\r\n]+$/),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  phone: z.string().trim().max(25).regex(/^\+?[\d\s()-]+$/, "Please enter a valid phone number.").refine(value => {
    const digits = value.replace(/\D/g, "")
    return digits.length >= 10 && digits.length <= 15
  }, "Phone number must contain 10 to 15 digits."),
  service: z.enum(contactServices, { errorMap: () => ({ message: "Please select a service." }) }),
  consent1: accepted,
  consent2: accepted,
  consent3: accepted,
  consent4: accepted,
  consent5: accepted,
  consent6: accepted,
})
