import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { contactConsentSchema, consentDeclaration, consentStatements, consentVersion } from "@/lib/contact-consent"

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!)
}

export async function POST(req: Request) {
  try {
    let body: unknown
    try { body = await req.json() } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
    }
    const result = contactConsentSchema.safeParse(body)
    if (!result.success) return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 })
    const submission = result.data
    const { name, email, phone, service } = Object.fromEntries(
      Object.entries(submission).filter((entry): entry is [string, string] => typeof entry[1] === "string").map(([key, value]) => [key, escapeHtml(value)])
    )
    const submittedAt = new Date().toISOString()
    const consentRecord = `<h3>Consent &amp; Authorization</h3><ol>${consentStatements.map(({ text }) => `<li style="margin-bottom: 12px;">Accepted: ${escapeHtml(text)}</li>`).join("")}</ol><p><strong>Declaration:</strong> ${escapeHtml(consentDeclaration)}</p><p>Submitted at (UTC): ${submittedAt}<br>Consent version: ${consentVersion}<br>Source: /contact-us</p>`

    // Create transporter with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // Use TLS instead of SSL for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Verify connection
    await transporter.verify()

    // Email to admin
    const adminMailOptions = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: submission.email,
      subject: `New Client Consent from ${submission.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #1B3F8B; border-bottom: 2px solid #F0A500; padding-bottom: 10px;">
            New Client Consent &amp; Authorization
          </h2>

          <div style="margin-top: 20px;">
            <h3 style="color: #1B3F8B; margin-bottom: 15px;">Customer Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #1B3F8B; width: 30%;">Name:</td>
                <td style="padding: 8px; color: #4A5568;">${name}</td>
              </tr>
              <tr style="background-color: #F7F9FC;">
                <td style="padding: 8px; font-weight: bold; color: #1B3F8B;">Email:</td>
                <td style="padding: 8px; color: #4A5568;">
                  <a href="mailto:${email}" style="color: #1B3F8B; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #1B3F8B;">Phone:</td>
                <td style="padding: 8px; color: #4A5568;">${phone || "Not provided"}</td>
              </tr>
              ${service ? `<tr style="background-color: #F7F9FC;">
                <td style="padding: 8px; font-weight: bold; color: #1B3F8B;">Service Required:</td>
                <td style="padding: 8px; color: #4A5568;">${service}</td>
              </tr>` : ""}
            </table>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #E0EAFF; border-left: 4px solid #1B3F8B; border-radius: 4px;">
            ${consentRecord}
          </div>

          <hr style="margin-top: 30px; border: none; border-top: 1px solid #E2E8F0;">
          <div style="margin-top: 20px; color: #4A5568; font-size: 12px;">
            <p style="margin: 5px 0;">
              <strong style="color: #1B3F8B;">Credsmadhan</strong><br>
              India&apos;s Trusted Financial Problem Resolution Platform<br>
              Email: support@credsmadhan.com<br>
              Phone: +91 9053903719
            </p>
          </div>
        </div>
      `,
    }

    // Send admin email
    await transporter.sendMail(adminMailOptions)

    // Email to customer (confirmation)
    const customerMailOptions = {
      from: process.env.FROM_EMAIL,
      to: submission.email,
      subject: "We Received Your Consent - Credsmadhan",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #1B3F8B;">Thank You, ${name}!</h2>
          <p style="color: #4A5568; line-height: 1.6;">
            We have received your consent and authorization for ${service}. Thank you for reaching out to Credsmadhan.
          </p>
          ${consentRecord}
          
          <div style="margin-top: 20px; padding: 15px; background-color: #E0EAFF; border-radius: 4px;">
            <p style="color: #1B3F8B; margin: 0; font-weight: bold;">
              Our team will review your request and contact you within 24 hours.
            </p>
          </div>

          <div style="margin-top: 20px;">
            <p style="color: #4A5568;">If you have any immediate questions, feel free to call us:</p>
            <p style="color: #1B3F8B; font-weight: bold;">
              Phone: +91 9053903719<br>
              Hours: 9 AM - 6 PM IST (Mon-Sun)
            </p>
          </div>

          <hr style="margin-top: 30px; border: none; border-top: 1px solid #E2E8F0;">
          <div style="margin-top: 20px; color: #4A5568; font-size: 12px;">
            <p style="margin: 0;">
              Best regards,<br>
              <strong style="color: #1B3F8B;">The Credsmadhan Team</strong><br>
              Trusted Financial Problem Resolution Platform
            </p>
          </div>
        </div>
      `,
    }

    // Send customer confirmation email
    let confirmationSent = true
    try {
      await transporter.sendMail(customerMailOptions)
    } catch {
      // The admin already received the consent. Do not invite duplicate submissions.
      confirmationSent = false
      console.error("Contact consent received, but customer confirmation could not be sent.")
    }

    return NextResponse.json(
      {
        success: true,
        confirmationSent,
        message: "Your consent has been submitted successfully. We will contact you soon.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form API error:", error)
    
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"

    return NextResponse.json(
      {
        error: "Failed to send your message. Please try again later or contact us directly at +91 9053903719",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    )
  }
}
