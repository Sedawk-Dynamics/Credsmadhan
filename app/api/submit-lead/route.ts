import { NextRequest, NextResponse } from 'next/server'
import { crmClient } from '@/lib/crm-client'
import { serviceSchemas } from '@/lib/validation'
import { 
  checkRateLimit, 
  getClientIP, 
  maskPhone, 
  maskPAN, 
  maskEmail 
} from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    console.log('[LEAD API] Request received')
    
    // Get client IP for rate limiting
    const clientIP = getClientIP(request.headers)
    console.log('[LEAD API] Client IP:', clientIP)
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      console.warn('[LEAD API] Rate limit exceeded for IP:', clientIP)
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const data = await request.json()
    console.log('[LEAD API] Request data keys:', Object.keys(data))
    const { service, ...formData } = data

    // Validate service exists
    if (!service || !serviceSchemas[service as keyof typeof serviceSchemas]) {
      console.error('[LEAD API] Invalid service type:', service)
      return NextResponse.json(
        { error: 'Invalid service type' },
        { status: 400 }
      )
    }

    console.log('[LEAD API] Service type validated:', service)

    // Get schema and validate
    const schema = serviceSchemas[service as keyof typeof serviceSchemas]
    const validationResult = schema.safeParse({
      service,
      ...formData,
    })

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }))
      console.error('[LEAD API] Validation failed:', errors)
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      )
    }

    console.log('[LEAD API] Validation passed')
    const validatedData = validationResult.data

    // Log submission (with masked PII)
    console.log('[LEAD] New submission from:', {
      service,
      phone: maskPhone(validatedData.phone),
      email: maskEmail(validatedData.email),
      pan: maskPAN(validatedData.pan),
      timestamp: new Date().toISOString(),
      ip: clientIP,
    })

    // Submit to CRM
    console.log('[LEAD API] Submitting to CRM...')
    const crmResponse = await crmClient.submitLead(validatedData)

    if (!crmResponse.success) {
      console.error('[LEAD API] CRM submission failed:', crmResponse.error)
      return NextResponse.json(
        { error: crmResponse.error || 'Failed to process your request. Please try again later.' },
        { status: 500 }
      )
    }

    // Success
    console.log('[LEAD] Successfully submitted to CRM:', crmResponse.leadId)
    return NextResponse.json(
      {
        success: true,
        leadId: crmResponse.leadId,
        message: 'Your request has been submitted successfully. We will contact you soon.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[LEAD] API Error:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
