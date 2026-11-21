import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import CibilIssuesSection from "@/components/home/cibil-issues-section"
import OtherServicesSection from "@/components/home/other-services-section"
import SmartToolsSection from "@/components/home/smart-tools-section"
import CreditReportCards from "@/components/home/credit-report-cards"
import ResultsTeaser from "@/components/home/results-teaser"
import TestimonialsSection from "@/components/testimonials-section"
import FraudAlertTeaser from "@/components/home/fraud-alert-teaser"
import PartnersSection from "@/components/home/partners-section"
import WhyUsSection from "@/components/why-us-section"
import FaqSection from "@/components/home/faq-section"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { faqs } from "@/lib/faqs"

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      {/* 1–2. Header + hero */}
      <HeroSection />
      <StatsSection />
      {/* 3. CIBIL services */}
      <CibilIssuesSection />
      {/* 4. Loan, banking, insurance + all other services */}
      <OtherServicesSection />
      {/* 5. Smart credit tools */}
      <SmartToolsSection />
      {/* 6. Online credit report purchase (below tools) */}
      <CreditReportCards />
      {/* 7. Real results */}
      <ResultsTeaser />
      <TestimonialsSection />
      {/* 8. Fraud alert */}
      <FraudAlertTeaser />
      {/* 9. Partners */}
      <PartnersSection />
      <WhyUsSection />
      {/* 10. FAQ + footer */}
      <FaqSection allFaqs={faqs} />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
