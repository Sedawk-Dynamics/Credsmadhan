import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import ServicesSection from "@/components/services-section"
import ProcessSection from "@/components/process-section"
import WhyUsSection from "@/components/why-us-section"
import TestimonialsSection from "@/components/testimonials-section"
import CtaSection from "@/components/cta-section"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import FinancialHelpPopup from "@/components/financial-help-popup"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <WhyUsSection />
      <TestimonialsSection />
      {/* <CtaSection /> */}
      <Footer />
      <WhatsAppButton />
      <FinancialHelpPopup />
    </main>
  )
}
