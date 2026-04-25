import { ReactNode } from "react"

export const metadata = {
  title: "Our Services | Credsmadhan - Financial Problem Resolution",
  description: "Explore our comprehensive financial solutions for credit, banking, loans, insurance, and grievance escalation.",
}

export default function ServicesLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
