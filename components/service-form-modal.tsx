'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import type { ServiceField, Service } from '@/app/services/data'

interface ServiceFormModalProps {
  isOpen: boolean
  onClose: () => void
  service: Service
  schema: z.ZodSchema
}

export function ServiceFormModal({ isOpen, onClose, service, schema }: ServiceFormModalProps) {
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
    console.log('[v0] Form submission started with data:', data)
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Convert numeric fields to numbers
      const processedData = {
        ...data,
        service: service.slug,
        cibilScore: data.cibilScore ? Number(data.cibilScore) : undefined,
        loanAmount: data.loanAmount ? Number(data.loanAmount) : undefined,
        emiAmount: data.emiAmount ? Number(data.emiAmount) : undefined,
        amountInvolved: data.amountInvolved ? Number(data.amountInvolved) : undefined,
      }

      console.log('[v0] Processed data:', processedData)

      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      })

      console.log('[v0] API response status:', response.status)

      const result = await response.json()
      console.log('[v0] API response body:', result)

      if (!response.ok) {
        const errorMsg = result.error || result.message || 'Submission failed'
        console.error('[v0] API Error:', errorMsg)
        throw new Error(errorMsg)
      }

      console.log('[v0] Success! Lead ID:', result.leadId)
      setLeadId(result.leadId)
      setSubmitStatus('success')
      reset()
      alert(`Success! Your Lead ID: ${result.leadId}\n\nWe'll contact you within 24 hours.`)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'An error occurred'
      console.error('[v0] Submission error:', errorMsg, error)
      setErrorMessage(errorMsg)
      setSubmitStatus('error')
      alert(`Error: ${errorMsg}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    console.log('[v0] Modal close requested, submitStatus:', submitStatus)
    if (submitStatus === 'idle') {
      onClose()
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-brand-blue text-white px-6 py-4 flex items-center justify-between border-b">
              <div>
                <h2 className="text-xl font-semibold">{service.title}</h2>
                <p className="text-sm text-blue-100 mt-1">Share your details with us</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-brand-blue-dark rounded transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-brand-blue mb-2">Thank You!</h3>
                    <p className="text-foreground mb-6">
                      Your request has been submitted successfully. We'll contact you within 24 hours.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                      <p className="text-sm text-gray-600 mb-2">Your Lead ID:</p>
                      <p className="text-xl font-mono font-bold text-brand-blue">{leadId}</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-6 py-2 bg-brand-gold text-brand-blue font-semibold rounded-lg hover:bg-brand-gold-light transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 flex gap-4"
                  >
                    <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                    <div className="flex-1">
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
                  <form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="grid md:grid-cols-2 gap-6 mb-6"
                    >
                      {service.formFields.map((field: ServiceField) => (
                        <motion.div
                          key={field.name}
                          variants={itemVariants}
                          className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                        >
                          <label htmlFor={field.name} className="block text-sm font-medium mb-2 text-foreground">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>

                          {field.type === 'textarea' ? (
                            <textarea
                              {...register(field.name)}
                              placeholder={field.placeholder}
                              rows={3}
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

                    {/* Privacy Consent Checkbox */}
                    <motion.div
                      variants={itemVariants}
                      className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register('privacyConsent')}
                          className="w-4 h-4 rounded mt-0.5 cursor-pointer"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            I accept the privacy policy <span className="text-red-500">*</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            We'll protect your data per DPDP compliance standards.
                          </p>
                        </div>
                      </label>
                      {errors.privacyConsent && (
                        <p className="text-red-500 text-sm mt-2">{errors.privacyConsent.message as string}</p>
                      )}
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                      variants={itemVariants}
                      className="flex gap-4"
                    >
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-4 py-3 border border-gray-300 text-foreground font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-3 bg-brand-gold text-brand-blue font-semibold rounded-lg hover:bg-brand-gold-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
                      By submitting, you agree to our Privacy Policy. We'll contact you at the provided phone number.
                    </motion.p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
