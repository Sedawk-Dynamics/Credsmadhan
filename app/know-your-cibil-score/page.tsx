"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { CheckCircle, Shield, Lock } from "lucide-react"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function KnowYourCIBILScorePage() {
  const [formData, setFormData] = useState({
    gender: "",
    fullName: "",
    email: "",
    pan: "",
    mobile: "",
    reportType: "Equifax",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

      if (!res) {
        alert("Payment SDK failed")
        setLoading(false)
        return
      }

      // Create order
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 99 }),
      })

      if (!orderRes.ok) throw new Error("Order creation failed")

      const order = await orderRes.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "CredMadhan",
        description: "CIBIL Report",

        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...response,
                formData,
              }),
            })

            const result = await verifyRes.json()

            if (result.success) {
              setSubmitted(true)
            } else {
              alert(
                typeof result.error === "string"
                  ? result.error
                  : "Payment verification failed"
              )
            }
          } catch (err) {
            alert("Verification error")
          } finally {
            setLoading(false)
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },

        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },

        theme: {
          color: "#F0A500",
        },
      }

      const paymentObject = new window.Razorpay(options)

      paymentObject.on("payment.failed", function (response: any) {
        const msg =
          response?.error?.description ||
          response?.error?.reason ||
          "Payment could not be completed. Try again or use a supported card."
        alert(msg)
        setLoading(false)
      })

      paymentObject.open()
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-24 md:pt-32">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#E8F4F8] to-white py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B3F8B] mb-4">
              Get <span className="text-[#F0A500]">Credit Score</span> & Report
            </h1>
            <p className="text-lg text-[#4A5568] mb-8">
              Understand your financial health with a detailed CIBIL report.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <input name="fullName" placeholder="Full Name" required onChange={handleChange} className="w-full border p-3 rounded"/>
                
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full border p-3 rounded"/>
                
                <input name="pan" placeholder="PAN Card" required onChange={handleChange} className="w-full border p-3 rounded"/>
                
                <input name="mobile" placeholder="Mobile" required onChange={handleChange} className="w-full border p-3 rounded"/>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#F0A500] text-white font-bold rounded-lg"
                >
                  {loading ? "Processing..." : "Pay & Get Report"}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                <h2 className="text-2xl font-bold">Payment Successful</h2>
                <p>We will contact you shortly.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}