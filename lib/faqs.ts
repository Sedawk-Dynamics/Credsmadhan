import { REPORT_PRICES } from "@/lib/credit-report-pricing"

export type FaqCategory =
  | "Credit Reports & Scores"
  | "Disputes & Corrections"
  | "Loans & Settlement"
  | "Pricing & Process"
  | "Privacy & Fraud Safety"

export type Faq = {
  q: string
  a: string
  category: FaqCategory
  /** Shown in the short homepage FAQ as well as the full FAQ page. */
  featured?: boolean
}

export const faqs: Faq[] = [
  // Existing questions (from the Know Your CIBIL Score page)
  {
    category: "Credit Reports & Scores",
    q: "How to Check Credit Score for Free?",
    a: "You can check your credit score for free through various online platforms that provide free credit reports and scores.",
  },
  {
    category: "Credit Reports & Scores",
    q: "Is CIBIL Score of 750 Considered Good?",
    a: "Yes, a CIBIL score of 750 and above is generally considered good by most lenders and increases your chances of quick loan approvals.",
    featured: true,
  },
  {
    category: "Credit Reports & Scores",
    q: "Why does your credit score matter?",
    a: "Your credit score is one of the first things a lender checks when evaluating your loan or credit card application. It determines your creditworthiness.",
  },
  {
    category: "Credit Reports & Scores",
    q: "How should students and young adults establish a credit history?",
    a: "Students can start by applying for a secured credit card against a fixed deposit or becoming an authorized user on their parent's credit card.",
  },
  {
    category: "Loans & Settlement",
    q: "What is the Minimum CIBIL Score to Get Personal Loan?",
    a: "Most banks require a minimum CIBIL score of 750 for an unsecured personal loan, though some NBFCs might lend to scores around 700 with higher interest rates.",
  },
  {
    category: "Privacy & Fraud Safety",
    q: "Can Anyone Check my CIBIL Score?",
    a: "No, only you and authorized entities like banks or NBFCs (with your consent) can check your CIBIL score.",
  },

  // Credit reports & scores
  {
    category: "Credit Reports & Scores",
    q: "What is the difference between a credit score and a credit report?",
    a: "Your credit report is the detailed record — every loan and card, its balance, payment history (DPD), status and the enquiries made on your profile. Your credit score is a 3-digit number calculated from that report. Errors in the report directly affect the score, so the report is where corrections happen.",
    featured: true,
  },
  {
    category: "Credit Reports & Scores",
    q: "Why is my score different on CIBIL, Experian, Equifax and CRIF High Mark?",
    a: "India has four credit bureaus — TransUnion CIBIL, Experian, Equifax and CRIF High Mark. Lenders report to them separately and each bureau uses its own scoring model, so the same person can have different scores and even different entries across bureaus. An error may appear in one bureau and not in another.",
    featured: true,
  },
  {
    category: "Credit Reports & Scores",
    q: "What does DPD mean on my credit report?",
    a: "DPD means Days Past Due — how many days late a payment was in a given month. '000' or 'STD' means paid on time; numbers like 030, 060 or 090 mean the payment was that many days overdue. Repeated or high DPD is one of the strongest negative signals for lenders. Use the Remark Decoder in our Smart Credit Tools for a plain-language explanation.",
    featured: true,
  },
  {
    category: "Credit Reports & Scores",
    q: "Do enquiries reduce my credit score?",
    a: "Checking your own report is a soft enquiry and does not affect your score. When you apply for a loan or card, the lender makes a hard enquiry. Several hard enquiries in a short period can lower your score and make lenders cautious. Enquiries you never authorised should be disputed.",
  },

  // Disputes & corrections
  {
    category: "Disputes & Corrections",
    q: "Can wrong entries in my credit report be corrected?",
    a: "Yes. Inaccurate information — a loan you never took, a closed loan still showing active, a wrong balance, incorrect DPD or a duplicate enquiry — can be disputed with the credit bureau and the lender, supported by documents. Under RBI rules, bureaus and lenders are expected to resolve credit-information complaints within 30 days. We help you review the report, prepare documents and follow up.",
    featured: true,
  },
  {
    category: "Disputes & Corrections",
    q: "Can you remove genuine negative history from my report?",
    a: "No. Accurate information reported by a lender cannot and should not be removed, and anyone promising to 'delete' genuine history is misleading you. What we do is credit report review and assistance with inaccuracies, plus guidance on rebuilding your profile over time.",
    featured: true,
  },
  {
    category: "Disputes & Corrections",
    q: "Do you guarantee a higher credit score?",
    a: "No. Nobody can honestly guarantee a specific score or increase. Scores are calculated by the bureaus from lender data. We follow a transparent, documented process to correct genuine errors and guide you on good credit habits; results vary from case to case.",
  },

  // Loans & settlement
  {
    category: "Loans & Settlement",
    q: "What is the difference between a 'Settled' and a 'Closed' account?",
    a: "'Closed' means the loan was repaid in full. 'Settled' means the lender accepted less than the full amount due, which lenders treat as a negative mark. In some cases, paying the remaining dues and obtaining a closure letter allows the lender to update the status — this depends on the lender.",
    featured: true,
  },
  {
    category: "Loans & Settlement",
    q: "My loan was rejected. How do I find out why?",
    a: "Common reasons include low score, recent DPD, high credit card utilisation, too many recent enquiries, a high FOIR (existing EMIs compared with income), or errors in the report. Try our Loan Readiness checker and FOIR calculator, then get your credit report reviewed.",
  },

  // Pricing & process
  {
    category: "Pricing & Process",
    q: "How much does a credit report cost?",
    a: `A single-bureau report (Equifax, Experian or TransUnion CIBIL) is ₹${REPORT_PRICES.Equifax}. All three bureau reports together are ₹${REPORT_PRICES.All}. You can order from the Know Your CIBIL Score page; payment is taken through Razorpay's secure checkout.`,
    featured: true,
  },
  {
    category: "Pricing & Process",
    q: "What happens after I pay for a credit report?",
    a: "Your request is submitted to our team along with your payment confirmation, and we contact you on the details you provided. Please use your correct registered mobile number and email so we can reach you.",
  },
  {
    category: "Pricing & Process",
    q: "How do I start a case with Credsmadhan?",
    a: "You can book a case review call, submit the form on our Contact page, or call +91 9053903719 (Mon–Sat, 10:00 AM – 7:00 PM). We first understand your issue and documents, then explain the process before any work starts.",
  },

  // Privacy & fraud safety
  {
    category: "Privacy & Fraud Safety",
    q: "Is my personal and financial data safe with you?",
    a: "We use your details only to provide the service you request, with your consent — for example, to obtain your credit report. Read our Privacy Policy for how data is collected, used and protected. We will never ask for your OTP, PIN, CVV or internet-banking password.",
  },
  {
    category: "Privacy & Fraud Safety",
    q: "Someone called claiming to be from Credsmadhan. How do I verify?",
    a: "Our official contact details are +91 9053903719 and support@credsmadhan.com. We never ask for OTPs, PINs or passwords, and we never promise guaranteed loans or guaranteed CIBIL scores. If in doubt, hang up and call us directly. If money has been lost to fraud, call the national cyber fraud helpline 1930 immediately.",
    featured: true,
  },
]

export const faqCategories: FaqCategory[] = [
  "Credit Reports & Scores",
  "Disputes & Corrections",
  "Loans & Settlement",
  "Pricing & Process",
  "Privacy & Fraud Safety",
]
