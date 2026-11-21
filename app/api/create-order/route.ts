import Razorpay from "razorpay";
import { getReportPrice } from "@/lib/credit-report-pricing";

export async function POST(req: Request) {
  try {
    const { reportType } = await req.json();

    // Price is decided on the server from the report type — never from the client.
    const amount = getReportPrice(reportType);
    if (amount === null) {
      return Response.json({ error: "Invalid report type" }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: { reportType },
    });

    return Response.json(order);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
