import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]
const UPLOAD_FIELDS = ["pan", "aadhaar", "supporting"] as const

const FIELD_LABELS: Record<string, string> = {
  knowsScore: "Knows CIBIL Score",
  cibilScore: "CIBIL Score",
  issueType: "Issue Type",
  wantsHelpChecking: "Wants Help Checking Report",
  loanAmount: "Total Loan Amount",
  emiDifficulty: "EMI Difficulty",
  recoveryAgents: "Recovery Agents Contacting",
  bankName: "Bank Name",
  fraudAmount: "Fraud Amount",
  fraudDate: "Fraud Date",
  reportedToCyberCell: "Reported to Cyber Cell",
  companyName: "Insurance Company",
  policyType: "Policy Type",
  amount: "Amount",
  institutionName: "Institution Name",
  complaintFiled: "Complaint Already Filed",
  authorityName: "Authority / Company",
  documentationType: "Documentation Type Needed",
  briefIssue: "Brief Issue Category",
  severity: "Severity Level",
  workplaceType: "Workplace Type",
  complaintType: "Complaint Type",
  confidential: "Needs Confidential Assistance",
  receivedNotice: "Received Notice",
  loanType: "Loan Type",
  problemDescription: "Problem Description",
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[6-9]\d{9}$/

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    const name = String(form.get("name") || "").trim()
    const email = String(form.get("email") || "").trim()
    const phone = String(form.get("phone") || "").trim()
    const categoryLabel = String(form.get("categoryLabel") || "General Inquiry").trim()

    let details: Record<string, string> = {}
    try {
      details = JSON.parse(String(form.get("details") || "{}"))
    } catch {
      details = {}
    }

    // Server-side validation
    if (name.length < 2 || !emailRegex.test(email) || !phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid name, email, or phone number." },
        { status: 400 },
      )
    }

    // Collect + validate attachments
    const attachments: { filename: string; content: Buffer }[] = []
    for (const key of UPLOAD_FIELDS) {
      const file = form.get(key)
      if (file instanceof File && file.size > 0) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          return NextResponse.json(
            { error: `Invalid file type for ${key}. Allowed: PDF, JPG, JPEG, PNG.` },
            { status: 400 },
          )
        }
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            { error: `File ${key} exceeds the 5MB limit.` },
            { status: 400 },
          )
        }
        attachments.push({
          filename: `${key}-${file.name}`,
          content: Buffer.from(await file.arrayBuffer()),
        })
      }
    }

    const detailRows = Object.entries(details)
      .filter(([, v]) => v !== "" && v != null)
      .map(
        ([k, v], i) => `
          <tr${i % 2 === 1 ? ' style="background-color: #F7F9FC;"' : ""}>
            <td style="padding: 8px; font-weight: bold; color: #1B3F8B; width: 40%;">${FIELD_LABELS[k] || k}:</td>
            <td style="padding: 8px; color: #4A5568;">${escapeHtml(String(v))}</td>
          </tr>`,
      )
      .join("")

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.verify()

    // Admin email
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New Financial Help Request: ${categoryLabel}`,
      attachments,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #1B3F8B; border-bottom: 2px solid #F0A500; padding-bottom: 10px;">
            New Financial Help Request
          </h2>
          <p style="color: #4A5568;"><strong>Category:</strong> ${escapeHtml(categoryLabel)}</p>

          <h3 style="color: #1B3F8B; margin-bottom: 10px;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #1B3F8B; width: 40%;">Name:</td>
              <td style="padding: 8px; color: #4A5568;">${escapeHtml(name)}</td>
            </tr>
            <tr style="background-color: #F7F9FC;">
              <td style="padding: 8px; font-weight: bold; color: #1B3F8B;">Email:</td>
              <td style="padding: 8px; color: #4A5568;"><a href="mailto:${escapeHtml(email)}" style="color: #1B3F8B;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #1B3F8B;">Phone:</td>
              <td style="padding: 8px; color: #4A5568;">${escapeHtml(phone)}</td>
            </tr>
          </table>

          ${
            detailRows
              ? `<h3 style="color: #1B3F8B; margin: 20px 0 10px;">Case Details</h3>
                 <table style="width: 100%; border-collapse: collapse;">${detailRows}</table>`
              : ""
          }

          <p style="margin-top: 16px; color: #4A5568;">
            <strong>Attachments:</strong> ${attachments.length > 0 ? attachments.map((a) => escapeHtml(a.filename)).join(", ") : "None"}
          </p>

          <hr style="margin-top: 30px; border: none; border-top: 1px solid #E2E8F0;">
          <p style="margin-top: 16px; color: #4A5568; font-size: 12px;">
            <strong style="color: #1B3F8B;">Credsmadhan</strong><br>
            India's Trusted Financial Problem Resolution Platform
          </p>
        </div>
      `,
    })

    // Customer confirmation
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "We Received Your Request - Credsmadhan",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #1B3F8B;">Thank You, ${escapeHtml(name)}!</h2>
          <p style="color: #4A5568; line-height: 1.6;">
            We have received your request regarding <strong>${escapeHtml(categoryLabel)}</strong>.
          </p>
          <div style="margin-top: 20px; padding: 15px; background-color: #E0EAFF; border-radius: 4px;">
            <p style="color: #1B3F8B; margin: 0; font-weight: bold;">
              Our team will review your request and contact you within 24 hours.
            </p>
          </div>
          <p style="margin-top: 20px; color: #4A5568;">
            For immediate help, call us at <strong style="color: #1B3F8B;">+91 9053903719</strong> (9 AM - 6 PM IST).
          </p>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #E2E8F0;">
          <p style="margin-top: 16px; color: #4A5568; font-size: 12px;">
            Best regards,<br>
            <strong style="color: #1B3F8B;">The Credsmadhan Team</strong>
          </p>
        </div>
      `,
    })

    return NextResponse.json(
      { success: true, message: "Your request has been submitted successfully." },
      { status: 200 },
    )
  } catch (error) {
    console.error("Financial help API error:", error)
    const message = error instanceof Error ? error.message : "An unexpected error occurred"
    return NextResponse.json(
      {
        error: "Failed to submit your request. Please try again or call +91 9053903719.",
        details: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 },
    )
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}
