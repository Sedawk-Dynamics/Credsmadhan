import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, phone, service, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and message are mandatory" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      )
    }

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
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #1B3F8B; border-bottom: 2px solid #F0A500; padding-bottom: 10px;">
            New Contact Form Submission
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
            <h3 style="color: #1B3F8B; margin-top: 0;">Message:</h3>
            <p style="color: #4A5568; line-height: 1.6; white-space: pre-wrap;">${message}</p>
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
      to: email,
      subject: "We Received Your Message - Credsmadhan",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #1B3F8B;">Thank You, ${name}!</h2>
          <p style="color: #4A5568; line-height: 1.6;">
            We have received your message and appreciate you reaching out to Credsmadhan.
          </p>
          
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
    await transporter.sendMail(customerMailOptions)

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We will contact you soon.",
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
