import { z } from 'zod'

const baseSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  email: z.string().email('Invalid email address'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format').optional().or(z.literal('')),
  problemDescription: z.string().min(10, 'Please provide more details').max(500, 'Description too long'),
  privacyConsent: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
  source: z.string().optional(),
})

export const cibilAnalysisSchema = baseSchema.extend({
  service: z.literal('credit-cibil-analysis'),
  cibilScore: z.coerce.number().min(300).max(900).optional(),
  lastCheckDate: z.string().optional(),
  knownIssues: z.array(z.string()).optional(),
})

export const creditRectificationSchema = baseSchema.extend({
  service: z.literal('credit-report-rectification'),
  cibilScore: z.coerce.number().min(300).max(900).optional(),
  affectedBureaus: z.array(z.string()).min(1, 'Select at least one bureau'),
  disputeType: z.array(z.string()).min(1, 'Select dispute type'),
  incorrectDetails: z.string(),
})

export const loanEmiStressSchema = baseSchema.extend({
  service: z.literal('loan-emi-stress-guidance'),
  loanType: z.string().min(1, 'Select loan type'),
  loanAmount: z.coerce.number().positive(),
  emiAmount: z.coerce.number().positive(),
  loanStatus: z.enum(['active', 'overdue', 'defaulted']),
  stressReasons: z.array(z.string()).min(1, 'Select stress reason'),
})

export const bankingCreditCardSchema = baseSchema.extend({
  service: z.literal('banking-credit-card-support'),
  institutionName: z.string().min(2),
  issueType: z.array(z.string()).min(1, 'Select issue type'),
  transactionDate: z.string().optional(),
  amountInvolved: z.coerce.number().optional(),
  disputeNature: z.string(),
})

export const insuranceSchema = baseSchema.extend({
  service: z.literal('insurance-issue-assistance'),
  insuranceType: z.string().min(1, 'Select insurance type'),
  policyNumber: z.string(),
  issueType: z.array(z.string()).min(1, 'Select issue type'),
  policyAge: z.string().optional(),
  claimStatus: z.string().optional(),
})

export const unclaimedMoneySchema = baseSchema.extend({
  service: z.literal('unclaimed-money-support'),
  searchKeywords: z.string().min(2),
  institutions: z.array(z.string()).min(1, 'Select institutions'),
  periodSearched: z.string().optional(),
  estimatedAmount: z.string().optional(),
})

export const grievanceSchema = baseSchema.extend({
  service: z.literal('grievance-complaint-escalation'),
  previousComplaintFiled: z.enum(['yes', 'no']),
  complaintRefNumber: z.string().optional(),
  institutionName: z.string().min(2),
  complaintDetails: z.string().min(20),
  expectedTimeline: z.string().optional(),
})

export const documentationSchema = baseSchema.extend({
  service: z.literal('documentation-case-facilitation'),
  documentTypeNeeded: z.array(z.string()).min(1, 'Select document type'),
  caseType: z.string().min(1, 'Select case type'),
  institutionInvolved: z.string(),
  urgencyLevel: z.enum(['low', 'medium', 'high']),
})

export const serviceSchemas = {
  'credit-cibil-analysis': cibilAnalysisSchema,
  'credit-report-rectification': creditRectificationSchema,
  'loan-emi-stress-guidance': loanEmiStressSchema,
  'banking-credit-card-support': bankingCreditCardSchema,
  'insurance-issue-assistance': insuranceSchema,
  'unclaimed-money-support': unclaimedMoneySchema,
  'grievance-complaint-escalation': grievanceSchema,
  'documentation-case-facilitation': documentationSchema,
}

export type ServiceFormData = z.infer<typeof baseSchema> & { service: string; [key: string]: any }
