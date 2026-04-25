import { NextResponse } from 'next/server'
import { crmClient } from '@/lib/crm-client'

export async function GET() {
  const apiKey = process.env.CRM_API_KEY
  const apiUrl = process.env.CRM_API_URL

  const status = {
    crmApiKeyConfigured: !!apiKey,
    crmApiUrl: apiUrl || 'https://crm.credsmadhan.com/api/website-lead',
    crmApiKeyLength: apiKey ? apiKey.length : 0,
    crmApiKeyFirst4Chars: apiKey ? `${apiKey.substring(0, 4)}...` : 'NOT SET',
  }

  console.log('[CRM-STATUS] Configuration check:', status)

  return NextResponse.json(status)
}
