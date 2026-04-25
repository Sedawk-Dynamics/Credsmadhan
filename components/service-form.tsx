'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import type { ServiceField, Service } from '@/app/services/data'

interface ServiceFormProps {
  service: Service
  schema: z.ZodSchema
}

export function ServiceForm({ service, schema }: ServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [leadId, setLeadId] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          service: service.slug,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed')
      }

      setLeadId(result.leadId)
      setSubmitStatus('success')
      reset()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div id="form" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-serif font-bold text-brand-blue mb-2 text-center"
        >
          Share Your Details
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-8"
        >
          We'll get back to you within 24 hours with personalized guidance
        </motion.p>

        <AnimatePresence mode="wait">
          {submitStatus === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8 text-center"
            >
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">Thank You!</h3>
              <p className="text-green-800 mb-4">
                Your request has been submitted successfully.
              </p>
              <div className="bg-white p-3 rounded border border-green-200 mb-4">
                <p className="text-sm text-gray-600">Your Lead ID:</p>
                <p className="text-lg font-mono font-bold text-brand-blue">{leadId}</p>
              </div>
              <p className="text-sm text-green-700">
                We will contact you shortly at the provided phone number.
              </p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 flex gap-4"
            >
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Submission Failed</h3>
                <p className="text-sm text-red-800 mt-1">{errorMessage}</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700 underline"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

          {submitStatus === 'idle' && (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-lg shadow-lg p-8"
              variants={containerVariants}
            >
              <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-6">
                {service.formFields.map((field: ServiceField) => (
                  <motion.div
                    key={field.name}
                    variants={itemVariants}
                    className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                  >
                    <label htmlFor={field.name} className="block text-sm font-medium mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        {...register(field.name)}
                        placeholder={field.placeholder}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        {...register(field.name)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox' || field.type === 'radio' ? (
                      <div className="space-y-2">
                        {field.options?.map(opt => (
                          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type={field.type}
                              {...register(field.name)}
                              value={opt.value}
                              className="w-4 h-4 rounded cursor-pointer"
                            />
                            <span className="text-sm">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <input
                        {...register(field.name)}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition"
                      />
                    )}

                    {errors[field.name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {(errors[field.name]?.message as string) || 'Invalid field'}
                      </p>
                    )}
                    {field.helpText && (
                      <p className="text-xs text-muted-foreground mt-1">{field.helpText}</p>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex gap-6"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-brand-gold text-brand-blue font-semibold py-3 rounded-lg hover:bg-brand-gold-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-xs text-muted-foreground text-center mt-4"
              >
                By submitting, you agree to our Terms and Privacy Policy. We'll contact you via the phone number provided.
              </motion.p>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 bg-blue-50 rounded-lg p-6 flex gap-4"
        >
          <Phone className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-brand-blue mb-1">Prefer to talk?</p>
            <p className="text-foreground">
              Call us at <span className="font-semibold">+91 XXXXX XXXXX</span> or email{' '}
              <span className="font-semibold">support@credsmadhan.com</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
