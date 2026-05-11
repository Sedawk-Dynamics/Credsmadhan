'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { motion } from 'framer-motion'
import { BriefcaseIcon, MapPinIcon, IndianRupee, ClockIcon, CheckCircle2 } from 'lucide-react'

export default function HiringPage() {
  const jobs = [
    {
      id: 1,
      title: 'Telecaller cum Tracker',
      department: 'Sales',
      location: 'Gurugram, Haryana',
      salary: 'Based on experience/negotiable',
      type: 'Full-time',
      description: 'Join our sales team to connect with leads, explain our services, and manage daily customer follow-ups efficiently.',
      requirements: [
        'Making calls to leads and potential customers',
        'Daily follow ups based on previous call records',
        'Explaining company services and products',
        'Maintaining daily call records',
        'Submitting daily progress reports',
        'Fluent communication skills in the local language',
        'Basic computer skills'
      ],
    },
    {
      id: 2,
      title: 'Relationship Growth Manager',
      department: 'Sales',
      location: 'Gurugram, Haryana',
      salary: '₹2,00,000 - ₹5,00,000 /year + Incentives',
      type: 'Full-time',
      description: 'Your primary responsibility will be to develop, expand, and strengthen the company’s business network and market presence. This role is growth-oriented and focuses on long-term expansion rather than short-term sales.',
      requirements: [
        'Develop and manage regional business networks',
        'Identify and onboard Market Associates / Local Connectors',
        'Expand company presence across assigned areas',
        'Generate business through relationships and references',
        'Manage associate coordination and engagement',
        'Maintain follow-ups and client relationships',
        'Support overall business growth initiatives',
        'Knowledge of financial services'
      ],
    },
    {
      id: 3,
      title: 'Growth Partners',
      department: 'Sales',
      location: 'India',
      salary: 'Negotiable + Incentives',
      type: 'Full-time/Part-time/Remote',
      description: 'Your role includes self-generated lead generation, client referrals, basic service explanation, and support in paid case initiation.',
      requirements: [
        '2+ years of B2B sales experience',
        'Target-driven mindset',
        'Excellent negotiation skills',
        'Knowledge of financial services',
        'Support overall business growth initiatives'
      ],
    },
    {
      id: 4,
      title: 'Growth Associates',
      department: 'Sales',
      location: 'India',
      salary: '₹ 20 per lead + Incentives',
      type: 'Full-time/Part-time/Remote',
      description: 'Your role includes self-generated lead generation, client referrals, basic service explanation, and support in paid case initiation. Work at your pace, no work pressure, earn as you work.',
      requirements: [
        'Anyone can apply for this role: students, non-working professionals, home makers, freshers, etc.',
        'Target-driven mindset',
        'Excellent communication skills',
        'Basic Knowledge of financial services',
        'Support overall business growth initiatives'
      ],
    }
  ]

  const benefits = [
    'Competitive salary and performance incentives',
    'Health insurance coverage',
    'Professional development opportunities',
    'Flexible work arrangements',
    'Collaborative work environment',
    'Work on meaningful financial inclusion projects',
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-gradient-to-br from-[#1B3F8B] to-[#2a52a8] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Be part of India's leading financial assistance and problem resolution platform. We're looking for talented professionals to help us revolutionize financial inclusion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#1B3F8B] mb-4">Why Work With Us?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#F0A500] mt-1 shrink-0" size={20} />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#F0A500] to-[#FB923C] p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="mb-4 leading-relaxed">
                At Credsmadhan, we're committed to empowering Indians to take control of their financial lives. We provide expert guidance and support across multiple financial challenges—from credit repair to legal assistance.
              </p>
              <p className="leading-relaxed">
                Our team works tirelessly to ensure every client receives personalized, professional support. Join us in making financial inclusion a reality for millions of Indians.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-12 sm:py-16 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B3F8B] mb-2">Open Positions</h2>
            <p className="text-gray-600">We're currently hiring for these roles</p>
          </motion.div>

          <div className="grid gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg border-2 border-[#E2E8F0] p-6 hover:shadow-lg hover:border-[#F0A500] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1B3F8B] mb-2">{job.title}</h3>
                    <p className="text-gray-600 font-medium mb-3">{job.department}</p>
                  </div>
                  <a
                    href={`mailto:hr@credsmadhan.com?subject=Application for ${job.title}`}
                    className="w-full sm:w-auto text-center inline-block px-6 py-2.5 bg-[#F0A500] hover:bg-[#FB923C] text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Apply Now
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4 py-4 border-t border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPinIcon size={16} className="text-[#F0A500]" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <IndianRupee size={16} className="text-[#F0A500]" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ClockIcon size={16} className="text-[#F0A500]" />
                    <span className="text-sm">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BriefcaseIcon size={16} className="text-[#F0A500]" />
                    <span className="text-sm">{job.department}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{job.description}</p>

                <div>
                  <h4 className="font-semibold text-[#1B3F8B] mb-2">Requirements:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <CheckCircle2 size={16} className="text-[#F0A500] mt-0.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#1B3F8B] mb-8 text-center">Application Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Submit Application', desc: 'Send us your resume and cover letter' },
                { step: 2, title: 'Initial Screening', desc: 'We review your qualifications' },
                { step: 3, title: 'Interviews', desc: 'Round of technical and HR interviews' },
                { step: 4, title: 'Join Our Team', desc: 'Get onboarded and start making impact' },
              ].map((process, index) => (
                <div key={index} className="relative">
                  <div className="bg-gradient-to-br from-[#F0A500] to-[#FB923C] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                    {process.step}
                  </div>
                  <h3 className="font-semibold text-[#1B3F8B] mb-2">{process.title}</h3>
                  <p className="text-gray-600 text-sm">{process.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#1B3F8B] to-[#2a52a8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-lg text-white/90 mb-8">
              Send your resume to hr@credsmadhan.com with the subject line "Application for [Position Name]"
            </p>
            <a
              href="mailto:hr@credsmadhan.com"
              className="w-full sm:w-auto inline-block px-8 py-3.5 bg-[#F0A500] hover:bg-[#FB923C] text-white font-semibold rounded-lg transition-colors"
            >
              Send Your Resume
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
