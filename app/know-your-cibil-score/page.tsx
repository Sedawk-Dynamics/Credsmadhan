"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { CheckCircle, ShieldCheck, ClipboardCheck, Percent, Gauge, ChevronDown, ChevronUp } from "lucide-react"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function KnowYourCIBILScorePage() {
  const [formData, setFormData] = useState({
    gender: "Male",
    fullName: "",
    email: "",
    pan: "",
    mobile: "",
    reportType: "Equifax",
    agreed: false
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }))
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

    if (!formData.agreed) {
      alert("Please agree to the Terms of Use before proceeding.")
      return
    }

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
          color: "#1B3F8B",
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

  const faqs = [
    { q: "How to Check Credit Score for Free?", a: "You can check your credit score for free through various online platforms that provide free credit reports and scores." },
    { q: "Is CIBIL Score of 750 Considered Good?", a: "Yes, a CIBIL score of 750 and above is generally considered good by most lenders and increases your chances of quick loan approvals." },
    { q: "Why does your credit score matter?", a: "Your credit score is one of the first things a lender checks when evaluating your loan or credit card application. It determines your creditworthiness." },
    { q: "How should students and young adults establish a credit history?", a: "Students can start by applying for a secured credit card against a fixed deposit or becoming an authorized user on their parent's credit card." },
    { q: "What is the Minimum CIBIL Score to Get Personal Loan?", a: "Most banks require a minimum CIBIL score of 750 for an unsecured personal loan, though some NBFCs might lend to scores around 700 with higher interest rates." },
    { q: "Can Anyone Check my CIBIL Score?", a: "No, only you and authorized entities like banks or NBFCs (with your consent) can check your CIBIL score." }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="bg-[#F4F8FB] py-12 md:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <div className="space-y-12">
                <h1 className="text-5xl md:text-6xl font-bold text-[#112A46] leading-tight font-serif tracking-tight">
                  Get <span className="text-[#E31E24]">C</span>redit Score<br />
                  & <span className="text-[#E31E24]">R</span>eport
                  <div className="w-16 h-1 bg-[#E31E24] mt-6"></div>
                </h1>

                <div className="grid grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                      <ClipboardCheck className="w-6 h-6 text-[#E31E24]" />
                    </div>
                    <span className="text-sm font-medium text-[#112A46]">Monthly<br />updates</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                      <Percent className="w-6 h-6 text-[#E31E24]" />
                    </div>
                    <span className="text-sm font-medium text-[#112A46]">Get best Loan<br />& Card offers</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                      <Gauge className="w-6 h-6 text-[#E31E24]" />
                    </div>
                    <span className="text-sm font-medium text-[#112A46]">No impact on<br />Credit Score</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/50 p-4 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-[#1B3F8B] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#112A46]">
                    Your Personal Information is 100% secured with us. We do not share your data with any third party.
                  </p>
                </div>
              </div>

              {/* Right Column: Form Card */}
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 md:p-10 border border-gray-100 relative">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#F4F8FB] rounded-r-2xl border-l border-gray-100"></div>
                
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6 pr-4">
                    {/* Gender */}
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 font-medium">Gender</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} className="w-4 h-4 text-[#1B3F8B] focus:ring-[#1B3F8B]" />
                          <span className="text-sm text-gray-700">Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} className="w-4 h-4 text-[#1B3F8B] focus:ring-[#1B3F8B]" />
                          <span className="text-sm text-gray-700">Female</span>
                        </label>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-[#112A46]">Full Name</label>
                      <input name="fullName" placeholder="As per your bank records" required value={formData.fullName} onChange={handleChange} className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-[#1B3F8B] transition-colors placeholder:text-gray-400" />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-[#112A46]">Email Address</label>
                      <input type="email" name="email" placeholder="As per your bank records" required value={formData.email} onChange={handleChange} className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-[#1B3F8B] transition-colors placeholder:text-gray-400" />
                    </div>

                    {/* PAN Card */}
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-[#112A46]">PAN Card</label>
                      <input name="pan" placeholder="Enter PAN Card Number" required value={formData.pan} onChange={handleChange} className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-[#1B3F8B] transition-colors placeholder:text-gray-400 uppercase" />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-[#112A46]">Mobile Number</label>
                      <input name="mobile" placeholder="Please Enter Your Registered Mobile Number" required value={formData.mobile} onChange={handleChange} className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-[#1B3F8B] transition-colors placeholder:text-gray-400" />
                    </div>

                    {/* Report Type */}
                    <div className="space-y-2 pt-2">
                      <label className="text-xs text-gray-500 font-medium">Report Type</label>
                      <div className="flex flex-wrap gap-4 md:gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="reportType" value="Equifax" checked={formData.reportType === "Equifax"} onChange={handleChange} className="w-4 h-4 text-[#1B3F8B] focus:ring-[#1B3F8B]" />
                          <span className="text-sm text-gray-700">Equifax</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="reportType" value="Experian" checked={formData.reportType === "Experian"} onChange={handleChange} className="w-4 h-4 text-[#1B3F8B] focus:ring-[#1B3F8B]" />
                          <span className="text-sm text-gray-700">Experian</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="reportType" value="TransUnion" checked={formData.reportType === "TransUnion"} onChange={handleChange} className="w-4 h-4 text-[#1B3F8B] focus:ring-[#1B3F8B]" />
                          <span className="text-sm text-gray-700">TransUnion</span>
                        </label>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3 pt-2">
                      <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} className="mt-1 w-4 h-4 text-[#1B3F8B] focus:ring-[#1B3F8B] rounded" />
                      <p className="text-xs text-gray-600 leading-relaxed">
                        I have read and agree to <a href="#" className="text-blue-600 hover:underline">Credit Score Terms of Use</a> and hereby appoint <strong>CredMadhan</strong> as my authorised representative to receive my credit information from TransUnion / Equifax / Experian
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#1B3F8B] hover:bg-[#112A46] text-white font-bold py-3 px-8 rounded flex items-center justify-center transition-colors text-sm"
                    >
                      {loading ? "Processing..." : "Get Credit Report"}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="mx-auto text-green-500 mb-6" size={64} />
                    <h2 className="text-2xl font-bold text-[#112A46] mb-2">Payment Successful!</h2>
                    <p className="text-gray-600">Your credit report request has been submitted. We will contact you shortly.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 space-y-12">
            
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B3F8B]">What is Credit Score?</h2>
              <p className="text-gray-700 leading-relaxed">
                Your credit score is a numerical expression based on a level analysis of a person&apos;s credit files, representing the creditworthiness of that person. It is primarily based on a credit report information typically sourced from credit bureaus.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B3F8B]">Benefits of a Credit Score</h2>
              <p className="text-gray-700 leading-relaxed">
                Your credit score is one of the first things that a lender bank or NBFC will check while evaluating your loan or credit card application. In case your credit score is low, then try to improve it at the earliest or else the lender might reject the application without even considering it further.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If your credit score is high, the lender will look into other details to determine, such as your creditworthiness and repayment capacity. Thus, a good credit score increases the chances of your loan application&apos;s approved and helps in availing funds at ease.
              </p>
              <p className="text-gray-700 leading-relaxed">
                However, your credit score is not the only factor considered for a person&apos;s ability to get a new credit. Lenders also consider your income, repayment capacity, debt-to-income ratio, employment history, profession, etc. before approving or rejecting your loan or credit card application.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A good CIBIL score would not only help you access credit, but it may also help reduce your interest outgo for a loan. Many banks/NBFCs offer preferential low-interest rates to applicants with a good credit score and repayment history.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B3F8B]">What is a Good Credit Score?</h2>
              <p className="text-gray-700 leading-relaxed">
                Today, most lenders consider a credit score of 750 and above from CIBIL as a good credit score. Getting the loan or credit card application approved becomes relatively easier if you have and maintain a CIBIL score of 750 or above and as close to 900. However, it is possible to have a CIBIL score of 750 or above and have a credit score from another bureau below 700 at the same time. Hence, you must keep a tab on credit scores from multiple bureaus.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B3F8B]">How a Credit Score is Calculated?</h2>
              <p className="text-gray-700 leading-relaxed">
                Credit scores are calculated using various factors including payment history, amounts owed, length of credit history, new credit, and types of credit used. Each bureau may have slightly different formulas but generally follow these principles.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B3F8B]">Benefits of High Credit Score</h2>
              <p className="text-gray-700 leading-relaxed">
                A high credit score can help you get better interest rates, higher credit limits, and faster approvals on loans and credit cards. It also reflects positively on your financial responsibility and can open doors to premium financial products.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B3F8B]">How to Improve Credit Score?</h2>
              <p className="text-gray-700 leading-relaxed">
                Improving your credit score involves timely payments, reducing outstanding debt, avoiding multiple credit inquiries, and maintaining a healthy credit mix.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B3F8B]">Understanding Credit Report</h2>
              <p className="text-gray-700 leading-relaxed">
                A credit report is a detailed record of your credit history, including loans, credit cards, payment history, and any defaults or bankruptcies.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B3F8B]">Common Credit Score Myths</h2>
              <p className="text-gray-700 leading-relaxed">
                There are many myths about credit scores such as checking your own score lowers it, or closing old accounts improves your score. Understanding facts helps maintain a good score.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="pt-8 border-t border-gray-100">
              <h2 className="text-3xl font-bold text-[#1B3F8B] mb-8">FAQ</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-[#1B3F8B]/30">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 text-left transition-colors"
                    >
                      <span className="font-semibold text-[#112A46] pr-8">{faq.q}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-[#1B3F8B] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="p-5 bg-gray-50 text-gray-700 border-t border-gray-100 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>

      <Footer />
    </main>
  )
}