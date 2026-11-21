// Published client case studies shown on the Result page and the homepage teaser.
// Keep these as the single source so both places always show the same, approved cases.

export type CaseStudy = {
  title: string
  issue: string[]
  problem: string[]
  process: string[]
  result: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    title: "Wrong Loan Entry Removed – Identity Mismatch Case",
    issue: [
      "Client ke CIBIL me unknown loan show ho raha tha",
      "DOB mismatch tha",
      "Client ne kabhi loan liya hi nahi",
    ],
    problem: [
      "Loan amount: ₹1.8 Lakh",
      "Score badly impacted",
      "Loan rejection start ho gaye",
    ],
    process: [
      "KYC mismatch detect kiya (DOB error)",
      "CRIF High Mark me dispute raise kiya + documents attach kiye",
      "NBFC ko email + follow-ups, galat tagging prove ki",
    ],
    result: [
      "Loan entry removed ✔️",
      "CIBIL corrected ✔️",
      "Client clean profile recover ✔️",
    ],
  },

  {
    title: "Settled Account Turned Closed – Score Recovery",
    issue: [
      "Old credit card 'Settled' show ho raha tha",
      "Score low (550 range)",
    ],
    problem: [
      "Loan approval block",
      "Negative settlement impact",
    ],
    process: [
      "Settlement history analyze ki",
      "Bank se closure upgrade request",
      "Payment proof + email trail build ki",
    ],
    result: [
      "Status changed to Closed ✔️",
      "Score improved ✔️",
      "Loan eligibility open ✔️",
    ],
  },

  {
    title: "High DPD Cleared – Late Payment Issue",
    issue: [
      "Multiple loans me DPD 60–90 days",
      "Continuous delay reporting",
    ],
    problem: [
      "Score drop ho raha tha",
      "Bank rejection ho raha tha",
    ],
    process: [
      "High-impact account identify kiya",
      "Bank ko payment proof ke sath correction request",
      "Continuous escalation ki",
    ],
    result: [
      "DPD corrected ✔️",
      "Score improve ✔️",
      "Profile stable ✔️",
    ],
  },

  {
    title: "Loan Closure Not Updated – Clean-up Case",
    issue: [
      "Loan paid but still active show ho raha tha",
    ],
    problem: [
      "Score unnecessarily low",
      "New loan reject ho raha tha",
    ],
    process: [
      "NOC + payment proof collect kiya",
      "CIBIL me update request raise ki",
      "Bank se backend update karwaya",
    ],
    result: [
      "Loan status Closed ✔️",
      "Score improved ✔️",
    ],
  },

  {
    title: "Multiple Loans Settled – Burden Reduced",
    issue: [
      "5–6 NBFC loans active",
      "Total ₹3.2 Lakh outstanding",
    ],
    problem: [
      "Financial pressure high",
      "Monthly stress",
    ],
    process: [
      "Loans priority-wise divide kiye",
      "Structured settlement negotiate kiya",
      "Budget-based closure plan banaya",
    ],
    result: [
      "₹1.4 Lakh me settlement ✔️",
      "Stress reduced ✔️",
    ],
  },
]
