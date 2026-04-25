import crypto from "crypto";
import nodemailer from "nodemailer";

function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(signature, "utf8")
    );
  } catch {
    return false;
  }
}

type FormData = {
  fullName?: string;
  email?: string;
  mobile?: string;
  gender?: string;
  pan?: string;
  reportType?: string;
};

async function sendLeadEmail(opts: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  formData?: FormData;
}) {
  const { razorpay_order_id, razorpay_payment_id, formData = {} } = opts;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: "💰 New Paid Lead - CIBIL Report",
    html: `
        <h2>New Paid Lead Received</h2>

        <h3>👤 User Details</h3>
        <p><strong>Name:</strong> ${formData.fullName ?? "—"}</p>
        <p><strong>Email:</strong> ${formData.email ?? "—"}</p>
        <p><strong>Mobile:</strong> ${formData.mobile ?? "—"}</p>
        <p><strong>Gender:</strong> ${formData.gender ?? "—"}</p>
        <p><strong>PAN:</strong> ${formData.pan ?? "—"}</p>
        <p><strong>Report Type:</strong> ${formData.reportType ?? "—"}</p>

        <hr/>

        <h3>💳 Payment Details</h3>
        <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
        <p><strong>Order ID:</strong> ${razorpay_order_id}</p>

        <p style="color:green;"><strong>Status: PAID ✅</strong></p>
      `,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (
      !secret ||
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return Response.json(
        { success: false, error: "Invalid request" },
        { status: 400 }
      );
    }

    if (
      !verifyRazorpaySignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        secret
      )
    ) {
      return Response.json(
        { success: false, error: "Invalid signature" },
        { status: 400 }
      );
    }

    void sendLeadEmail({
      razorpay_order_id,
      razorpay_payment_id,
      formData,
    }).catch((err) => console.error("VERIFY EMAIL ERROR:", err));

    return Response.json({ success: true });
  } catch (error: unknown) {
    console.error("VERIFY ERROR:", error);
    const message =
      error instanceof Error ? error.message : "Verification failed";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
