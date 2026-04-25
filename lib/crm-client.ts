import { ServiceFormData } from './validation'

export interface CRMResponse {
  success: boolean
  leadId?: string
  message?: string
  error?: string
}

export interface PerfeXLead {
  name: string
  email: string
  phone: string
  pan?: string
  service: string
  message: string
  source: 'Website'
  website: 'credsmadhan.com'
  timestamp: string
}

const MAX_RETRIES = 3
const INITIAL_BACKOFF = 1000 // 1 second
const REQUEST_TIMEOUT = 10000 // 10 seconds

export class CRMClient {
  private apiUrl: string
  private apiKey: string

  constructor() {
    const apiUrl = process.env.CRM_API_URL || 'https://crm.credsmadhan.com/api/website-lead'
    const apiKey = process.env.CRM_API_KEY || ''
    
    if (!apiUrl) {
      console.warn('[CRM] Warning: CRM_API_URL not configured')
    }
    if (!apiKey) {
      console.warn('[CRM] Warning: CRM_API_KEY not configured')
    }
    
    this.apiUrl = apiUrl
    this.apiKey = apiKey
  }

  private getBackoffDelay(attempt: number): number {
    return INITIAL_BACKOFF * Math.pow(2, attempt)
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private buildPayload(data: ServiceFormData): PerfeXLead {
    return {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      pan: data.pan || undefined,
      service: data.service || 'General Inquiry',
      message: data.problemDescription,
      source: 'Website',
      website: 'credsmadhan.com',
      timestamp: new Date().toISOString(),
    }
  }

  async submitLead(data: ServiceFormData): Promise<CRMResponse> {
    // Check if API key is configured
    if (!this.apiKey) {
      console.error('[CRM] ERROR: CRM_API_KEY is not configured!')
      console.error('[CRM] Please set CRM_API_KEY in your environment variables.')
      return {
        success: false,
        error: 'CRM API key is not configured. Please contact support.',
      }
    }

    let lastError: Error | null = null

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        console.log(`[CRM] Submitting lead to PerfeX (attempt ${attempt + 1}/${MAX_RETRIES})`)
        console.log('[CRM] API URL:', this.apiUrl)
        console.log('[CRM] API Key present:', !!this.apiKey)
        
        const payload = this.buildPayload(data)
        console.log('[CRM] Payload:', JSON.stringify(payload, null, 2))
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'X-Source': 'credsmadhan-website',
            'User-Agent': 'Credsmadhan/1.0',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        console.log('[CRM] Response status:', response.status, response.statusText)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error('[CRM] API error response:', errorData)
          throw new Error(`PerfeX API error: ${response.status} ${response.statusText}. ${errorData.message || JSON.stringify(errorData)}`)
        }

        const result = await response.json()
        console.log('[CRM] Response body:', result)
        console.log('[CRM] Lead submitted successfully to PerfeX:', result.leadId || result.id)
        
        return {
          success: true,
          leadId: result.leadId || result.id || `LEAD-${Date.now()}`,
          message: result.message || 'Lead submitted successfully to PerfeX CRM',
        }
      } catch (error) {
        lastError = error as Error
        
        // Don't retry on timeout if it's the last attempt
        if (lastError.name === 'AbortError') {
          console.error(`[CRM] Request timeout on attempt ${attempt + 1}`)
        } else {
          console.error(`[CRM] Attempt ${attempt + 1} failed:`, lastError.message)
        }

        if (attempt < MAX_RETRIES - 1) {
          const backoffMs = this.getBackoffDelay(attempt)
          console.log(`[CRM] Retrying in ${backoffMs}ms...`)
          await this.delay(backoffMs)
        }
      }
    }

    console.error('[CRM] Failed to submit lead after all retries')
    return {
      success: false,
      error: lastError?.message || 'Failed to submit lead to PerfeX CRM after maximum retries',
    }
  }

  async validateConnection(): Promise<boolean> {
    try {
      console.log('[CRM] Validating PerfeX CRM connection...')
      const testPayload = {
        name: 'Connection Test',
        email: 'test@credsmadhan.com',
        phone: '0000000000',
        service: 'Test',
        message: 'Connection validation',
        source: 'Website',
        website: 'credsmadhan.com',
        timestamp: new Date().toISOString(),
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Test': 'true',
        },
        body: JSON.stringify(testPayload),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      
      const isValid = response.ok
      console.log(`[CRM] Connection validation: ${isValid ? 'SUCCESS' : 'FAILED'}`)
      return isValid
    } catch (error) {
      console.error('[CRM] Connection validation error:', error)
      return false
    }
  }
}

export const crmClient = new CRMClient()
