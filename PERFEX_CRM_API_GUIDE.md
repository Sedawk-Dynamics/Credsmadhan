# PerfeX CRM API Integration Guide

## Quick Start

### 1. Configure Environment Variables

Add to `.env.local`:

```env
CRM_API_URL=https://crm.credsmadhan.com/api/website-lead
CRM_API_KEY=your_api_key_from_perfex_crm
```

### 2. Test Connection

```bash
curl -X POST "https://crm.credsmadhan.com/api/website-lead" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_from_perfex_crm" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "service": "Testing",
    "message": "Connection test",
    "source": "Website",
    "website": "credsmadhan.com",
    "timestamp": "'$(date -u +'%Y-%m-%dT%H:%M:%S.000Z')'
  }'
```

### 3. Expected Response

**Success (201 Created):**
```json
{
  "success": true,
  "leadId": "LEAD-12345",
  "message": "Lead submitted successfully to PerfeX CRM"
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "error": "Authentication failed: Invalid API key"
}
```

## API Endpoint

**URL:** `https://crm.credsmadhan.com/api/website-lead`

**Method:** `POST`

**Authentication:** Bearer Token (API Key)

## Request Headers

```
Content-Type: application/json
Authorization: Bearer YOUR_CRM_API_KEY
X-Source: credsmadhan-website
User-Agent: Credsmadhan/1.0
```

## Request Body

```json
{
  "name": "string (required, 2-100 chars)",
  "email": "string (required, valid email)",
  "phone": "string (required, 10 digits)",
  "pan": "string (optional, format: ABCDE1234F)",
  "service": "string (required, service slug)",
  "message": "string (required, 10-500 chars)",
  "source": "Website",
  "website": "credsmadhan.com",
  "timestamp": "string (ISO 8601 format)"
}
```

## Service Types

Valid `service` values:

- `credit-cibil-analysis` - Credit & CIBIL Analysis
- `credit-report-rectification` - Credit Report Rectification
- `loan-emi-stress-guidance` - Loan & EMI Stress Guidance
- `banking-credit-card-support` - Banking & Credit Card Support
- `insurance-issue-assistance` - Insurance Issue Assistance
- `unclaimed-money-support` - Unclaimed Money Support
- `grievance-complaint-escalation` - Grievance & Complaint Escalation
- `documentation-case-facilitation` - Documentation & Case Facilitation

## Error Codes

| Code | Error | Solution |
|------|-------|----------|
| 400 | Invalid request body | Check payload format and required fields |
| 401 | Unauthorized | Verify API key is correct and not expired |
| 403 | Forbidden | Check API key permissions in PerfeX CRM |
| 404 | Not found | Verify endpoint URL is correct |
| 429 | Too many requests | Rate limited - wait before retrying |
| 500 | Server error | PerfeX CRM error - try again later |
| 503 | Service unavailable | PerfeX CRM maintenance - check status |

## Implementation in Next.js

The CRM client is already implemented at `/lib/crm-client.ts`:

```typescript
import { crmClient } from '@/lib/crm-client'

// In your API route or server action
const response = await crmClient.submitLead({
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '9876543210',
  pan: 'ABCDE1234F',
  service: 'credit-cibil-analysis',
  problemDescription: 'Issue details...',
})

if (response.success) {
  console.log('Lead ID:', response.leadId)
} else {
  console.error('Error:', response.error)
}
```

## Retry Logic

The client automatically retries failed requests:

- **Max Attempts:** 3
- **Backoff Strategy:** Exponential (1s, 2s, 4s)
- **Timeout:** 10 seconds per request
- **Total Max Time:** ~7 seconds

Retries occur on:
- Network connectivity errors
- 5xx server errors
- Request timeouts

Does NOT retry on:
- 4xx client errors (400, 401, 403, 404, etc.)
- Validation errors

## Logging

All submissions are logged with PII masking:

```
[CRM] Submitting lead to PerfeX (attempt 1/3)
[CRM] Lead submitted successfully to PerfeX: LEAD-12345
```

Masked fields in logs:
- Phone: `****1234` (last 4 digits only)
- Email: `j***@example.com` (first letter + domain)
- PAN: `ABCD***1F` (first and last char + domain)

## Rate Limiting

Website-level rate limiting: **5 submissions per IP per hour**

PerfeX CRM may have additional rate limits. Contact support if you hit API rate limits.

## Data Security

- ✅ HTTPS/TLS 1.2+ encryption in transit
- ✅ Bearer token authentication
- ✅ PII masking in logs
- ✅ No sensitive data in URLs or headers
- ✅ Secure cookie handling

## Validation Rules

| Field | Rule | Example |
|-------|------|---------|
| name | 2-100 characters, no special chars | John Doe |
| email | Valid email format | user@example.com |
| phone | Exactly 10 digits | 9876543210 |
| pan | Uppercase, format: ABCDE1234F | ABCDE1234F |
| service | Valid service slug from list | credit-cibil-analysis |
| message | 10-500 characters | Detailed issue description... |

## Successful Integration Checklist

- [ ] API key obtained from PerfeX CRM admin panel
- [ ] `.env.local` configured with `CRM_API_URL` and `CRM_API_KEY`
- [ ] Connection test successful (curl test passes)
- [ ] Form submission from website creates lead in PerfeX CRM
- [ ] Lead ID returned to user on success
- [ ] Error messages displayed on failure
- [ ] Retry logic working (automatic 3 attempts)
- [ ] Logs show [CRM] entries for debugging
- [ ] Rate limiting working (5/hour limit)
- [ ] Production deployment tested in staging first

## Next Steps

1. **Get API Key:** Log in to https://crm.credsmadhan.com/admin (Info@credsmadhan.com / Welcome@2026)
2. **Configure:** Add key to `.env.local`
3. **Test:** Run curl test or submit form
4. **Deploy:** Push to production
5. **Monitor:** Watch for errors in server logs

## Support

For PerfeX CRM API issues:
- Contact: Info@credsmadhan.com
- Admin Panel: https://crm.credsmadhan.com/admin
