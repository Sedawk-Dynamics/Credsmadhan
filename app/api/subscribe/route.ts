import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    const cleanEmail = String(email || "").trim()

    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      )
    }

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

    // Notify the team about the new subscriber
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: cleanEmail,
      subject: "New Newsletter Subscription - Credsmadhan",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #1B3F8B; border-bottom: 2px solid #F0A500; padding-bottom: 10px;">
            New Newsletter Subscriber
          </h2>
          <p style="color: #4A5568;">
            A new user has subscribed to the newsletter:
          </p>
          <p style="font-size: 16px; color: #1B3F8B;">
            <strong><a href="mailto:${escapeHtml(cleanEmail)}" style="color: #1B3F8B;">${escapeHtml(cleanEmail)}</a></strong>
          </p>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #E2E8F0;">
          <p style="margin-top: 16px; color: #4A5568; font-size: 12px;">
            <strong style="color: #1B3F8B;">Credsmadhan</strong><br>
            India's Trusted Financial Problem Resolution Platform
          </p>
        </div>
      `,
    })

    // Confirmation to the subscriber
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: cleanEmail,
      subject: "You're Subscribed - Credsmadhan",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #1B3F8B;">Thanks for Subscribing!</h2>
          <p style="color: #4A5568; line-height: 1.6;">
            You'll now receive expert financial insights on CIBIL scores, loans,
            banking, and more — straight to your inbox.
          </p>
          <p style="margin-top: 20px; color: #4A5568;">
            For immediate help, call us at <strong style="color: #1B3F8B;">+91 9053903719</strong> (Mon – Sat, 10 AM - 7 PM).
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
      { success: true, message: "You've been subscribed successfully." },
      { status: 200 },
    )
  } catch (error) {
    console.error("Subscribe API error:", error)
    const message = error instanceof Error ? error.message : "An unexpected error occurred"
    return NextResponse.json(
      {
        error: "Failed to subscribe. Please try again later.",
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
