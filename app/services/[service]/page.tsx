'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { getServiceBySlug } from '../data'
import { serviceSchemas } from '@/lib/validation'
import { ServiceHero } from '@/components/service-hero'
import { ServiceFormModal } from '@/components/service-form-modal'
import { ServiceFAQ } from '@/components/service-faq'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import CrmFormSection from '@/components/crm-form-section'
import { CheckCircle, TrendingUp } from 'lucide-react'
import type { BreadcrumbItem } from '@/components/breadcrumb-nav'

export default function ServicePage() {
  const params = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const serviceSlug = params.service as string
    const serviceData = getServiceBySlug(serviceSlug)
    setService(serviceData)
    setLoading(false)

    // Handle hash-based modal opening
    const handleHashChange = () => {
      if (window.location.hash === '#get-help-modal') {
        setIsModalOpen(true)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold" />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-blue mb-2">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The service you're looking for doesn't exist.
          </p>
          <a href="/#services" className="text-brand-gold font-semibold hover:underline">
            Back to Services
          </a>
        </div>
      </div>
    )
  }

  const schema = serviceSchemas[service.slug as keyof typeof serviceSchemas]
  const handleGetHelpClick = () => {
    window.location.href = 'https://www.credsmadhan.com/contact-us'
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: service.title },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="bg-white">
      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#1B3F8B] via-[#2a52a8] to-[#1B3F8B] pt-20 md:pt-0">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

        <ServiceHero
          title={service.title}
          subtitle={service.shortDescription}
          description={service.problemStatement}
          heroImage={service.heroImage}
          breadcrumbs={breadcrumbs}
          onGetHelpClick={handleGetHelpClick}
        />
      </section>

      {/* Solution Overview - Enhanced Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B3F8B] mb-4 text-balance">
                How We Help You
              </h2>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex-1 h-1 bg-gradient-to-r from-transparent to-[#F0A500]" />
                <div className="w-2 h-2 rounded-full bg-[#F0A500]" />
                <div className="flex-1 h-1 bg-gradient-to-l from-transparent to-[#F0A500]" />
              </div>
              <p className="text-lg text-[#4A5568] leading-relaxed">
                Our proven process is designed to deliver results efficiently and transparently.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {service.solutionPoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group relative bg-gradient-to-br from-white to-[#F9F9F9] rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-lg hover:border-[#F0A500]/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F0A500]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#F0A500]/20">
                        <CheckCircle className="h-5 w-5 text-[#F0A500]" />
                      </div>
                    </div>
                    <p className="text-[#2D3748] leading-relaxed font-medium">{point}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline - Redesigned */}
      <section className="py-12 px-4 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B3F8B] mb-4">
              Our Process
            </h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex-1 h-1 bg-gradient-to-r from-transparent to-[#F0A500]" />
              <div className="w-2 h-2 rounded-full bg-[#F0A500]" />
              <div className="flex-1 h-1 bg-gradient-to-l from-transparent to-[#F0A500]" />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {service.processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative group"
              >
                {/* Process Box */}
                <div className="bg-white rounded-2xl p-8 border-2 border-[#E2E8F0] hover:border-[#F0A500] transition-all duration-300 h-full flex flex-col">
                  {/* Step Number */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F0A500] to-[#F7C04A] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
                      <div className="relative w-16 h-16 rounded-full bg-[#F0A500] text-white font-bold text-xl flex items-center justify-center shadow-lg">
                        {step.step}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-[#1B3F8B] mb-3 text-center text-lg">{step.title}</h3>
                  <p className="text-sm text-[#4A5568] text-center leading-relaxed flex-1">{step.description}</p>
                </div>

                {/* Connector Arrow */}
                {idx < service.processSteps.length - 1 && (
                  <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-1 items-center justify-center">
                    <svg className="w-full h-1 text-[#F0A500]" viewBox="0 0 48 2" preserveAspectRatio="none">
                      <line x1="0" y1="1" x2="48" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" />
                    </svg>
                    <svg className="absolute right-0 w-4 h-4 text-[#F0A500]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Metrics - Premium Cards */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B3F8B] mb-4">
              Why Choose Credsmadhan
            </h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex-1 h-1 bg-gradient-to-r from-transparent to-[#F0A500]" />
              <div className="w-2 h-2 rounded-full bg-[#F0A500]" />
              <div className="flex-1 h-1 bg-gradient-to-l from-transparent to-[#F0A500]" />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {service.successMetrics.map((metric, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative bg-gradient-to-br from-white to-[#F9F9F9] rounded-2xl p-8 border border-[#E2E8F0] hover:shadow-xl hover:border-[#F0A500]/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0A500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F0A500]/5 rounded-full blur-2xl" />

                <div className="relative">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#F0A500]/20 mb-6 group-hover:bg-[#F0A500]/30 transition-colors">
                    <TrendingUp className="h-6 w-6 text-[#F0A500]" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-[#F0A500] mb-2">
                    {metric.value}
                  </h3>
                  <p className="text-[#1B3F8B] font-semibold mb-2">{metric.metric}</p>
                  <p className="text-sm text-[#4A5568]">Proven across our client base</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B3F8B] mb-4">
              Frequently Asked Questions
            </h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex-1 h-1 bg-gradient-to-r from-transparent to-[#F0A500]" />
              <div className="w-2 h-2 rounded-full bg-[#F0A500]" />
              <div className="flex-1 h-1 bg-gradient-to-l from-transparent to-[#F0A500]" />
            </div>
          </motion.div>
          <ServiceFAQ items={service.faqItems} />
        </div>
      </section>

      {/* CRM Form Section */}
      <CrmFormSection
        id="crm-form-section"
        title="Get Help Now"
        subtitle="Expert Financial Assistance"
        description="Fill out the form below and our team will get back to you within 24 hours with a customized solution for your financial problem."
        formUrl={service.crmFormUrl}
      />

      {/* Bottom CTA - Premium */}
      <section className="relative py-12 px-4 overflow-hidden bg-gradient-to-br from-[#1B3F8B] to-[#2a52a8]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Ready to Resolve Your {service.title}?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Our expert team is ready to help you navigate every step of the process with complete transparency and personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-[#F0A500] text-[#1B3F8B] font-bold rounded-xl hover:bg-[#F7C04A] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Free Consultation Today
              </button>
              <a
                href="/#services"
                className="px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30 hover:border-white/50"
              >
                Explore Other Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Modal */}
      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={service}
        schema={schema}
      />
    </main>
  )
}
