# PerfeX CRM Integration Setup

This document outlines the CRM integration with PerfeX CRM for Credsmadhan website form submissions.

## Overview

The website form submissions are securely sent to PerfeX CRM via a dedicated API endpoint. The integration includes:
- Automatic retry logic with exponential backoff
- Request timeout protection
- Lead validation before submission
- Error handling and logging with PII masking
- Production-ready error responses

## PerfeX CRM Details

**CRM Base URL:** https://crm.credsmadhan.com

**Admin Panel:** https://crm.credsmadhan.com/admin

**Credentials:**
- Email: Info@credsmadhan.com
- Password: Welcome@2026

**API Endpoint:** https://crm.credsmadhan.com/api/website-lead

## Environment Variables

Configure these variables in your `.env.local` file:

```env
# PerfeX CRM Configuration (REQUIRED)
CRM_API_URL=https://crm.credsmadhan.com/api/website-lead
CRM_API_KEY=your_crm_api_key_here

# Optional: Rate Limiting Configuration
RATE_LIMIT_ENABLED=true
RATE_LIMIT_PER_HOUR=5
```

### Getting Your CRM API Key

1. Log in to the PerfeX CRM admin panel: https://crm.credsmadhan.com/admin
2. Use credentials: Info@credsmadhan.com / Welcome@2026
3. Navigate to Settings → API Keys or Integration Settings
4. Generate or copy your API key
5. Add it to your `.env.local` file as `CRM_API_KEY`

## Submission Flow

```
User submits service form
       ↓
Form validation with Zod schemas
       ↓
API route: /api/submit-lead
       ↓
Rate limit check (5 submissions per IP per hour)
       ↓
CRM Client: submitLead()
       ↓
PerfeX CRM API: https://crm.credsmadhan.com/api/website-lead
       ↓
Lead created in PerfeX CRM database
       ↓
Response with Lead ID to user
```

## Payload Structure

The following data is sent to PerfeX CRM:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "pan": "ABCDE1234F",
  "service": "credit-cibil-analysis",
  "message": "Detailed problem description...",
  "source": "Website",
  "website": "credsmadhan.com",
  "timestamp": "2026-03-17T10:30:00.000Z"
}
```

## API Response Format

### Success Response (200 OK)
```json
{
  "success": true,
  "leadId": "LEAD-12345",
  "message": "Lead submitted successfully to PerfeX CRM"
}
```

### Error Response (4xx/5xx)
```json
{
  "success": false,
  "error": "Failed to submit lead to PerfeX CRM after maximum retries"
}
```

## Retry Logic & Reliability

- **Max Retries:** 3 automatic attempts
- **Backoff Strategy:** Exponential backoff (1s → 2s → 4s)
- **Request Timeout:** 10 seconds per attempt
- **Total Max Time:** ~7 seconds (1s + 2s + 4s)
- **Auto-retry on:** Network errors, 5xx server errors, timeouts

## Security Features

1. **PII Masking** - Phone, email, PAN masked in logs
2. **Rate Limiting** - 5 submissions per IP per hour
3. **Input Validation** - Zod schema validation on client and server
4. **Authorization** - Bearer token authentication
5. **HTTPS Only** - All requests encrypted in transit
6. **Data Privacy** - Automatic data retention policies (12 months)
7. **DPDP Compliance** - Privacy consent required

## Testing the Integration

### 1. Validate CRM Connection

Run this in your terminal to test CRM connectivity:

```bash
curl -X POST "https://crm.credsmadhan.com/api/website-lead" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CRM_API_KEY" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "service": "Testing",
    "message": "API connection test",
    "source": "Website",
    "website": "credsmadhan.com",
    "timestamp": "'$(date -u +'%Y-%m-%dT%H:%M:%S.000Z')'
  }'
```

### 2. Test Form Submission via Website

1. Navigate to any service page: `http://localhost:3000/services/credit-cibil-analysis`
2. Click "Get Help Now" button
3. Fill out the form with test data
4. Submit the form
5. Verify success response with Lead ID

### 3. Monitor Server Logs

```bash
# Watch for CRM submission logs
tail -f .next/server/logs 2>/dev/null | grep CRM

# Or check Vercel logs in production
vercel logs --follow
```

## Troubleshooting

### Issue: "CRM_API_KEY not configured"

**Symptoms:** Form submission fails immediately with "Internal server error"

**Solution:**
1. Verify `.env.local` has `CRM_API_KEY=your_actual_key`
2. Restart dev server: `npm run dev`
3. Check that the key is not empty

### Issue: 401 Unauthorized / Invalid API Key

**Symptoms:** Forms fail with "PerfeX API error: 401"

**Solution:**
1. Log in to PerfeX CRM admin: https://crm.credsmadhan.com/admin
2. Verify API key in Settings → Integration Settings
3. Generate a new key if expired
4. Update `.env.local` with new key
5. Restart application

### Issue: 429 Too Many Requests

**Symptoms:** Submission rejected with rate limit message after 5 attempts

**Solution:**
1. This is expected behavior - rate limit is 5 submissions per IP per hour
2. Wait 1 hour for the limit to reset
3. Or test from different IP/network if debugging

### Issue: Connection Timeout / 504 Error

**Symptoms:** Forms fail after 10 seconds with timeout error

**Solution:**
1. Check internet connectivity
2. Verify PerfeX CRM endpoint is accessible: `ping crm.credsmadhan.com`
3. Check PerfeX CRM status at admin panel
4. Retry - automatic retry happens 3 times

### Issue: Lead not appearing in PerfeX CRM

**Symptoms:** Form submission succeeds (shows Lead ID) but lead not in CRM

**Solution:**
1. Log in to PerfeX CRM admin panel
2. Check Leads section for the Lead ID from response
3. Verify email address in CRM settings
4. Check CRM's spam/filtering rules
5. Review CRM activity logs for any validation errors

## Monitoring & Observability

Monitor these metrics in production:

1. **Submission Success Rate** - Track `/api/submit-lead` success ratio
2. **Response Time** - Monitor CRM API latency (target: <3s)
3. **Error Rate** - Track failures by error type
4. **Rate Limit Hits** - Monitor rate limit rejections
5. **CRM Connection** - Periodic validation of CRM endpoint

### Enable Debug Logging

To debug CRM submissions, temporarily enable verbose logging:

```typescript
// In lib/crm-client.ts
// All [CRM] logs will appear in console and server logs
```

## Compliance & Data Privacy

### DPDP Act (India) Compliance
- ✅ Explicit consent collected (Privacy Policy checkbox)
- ✅ Privacy policy linked on all forms
- ✅ Transparent data use disclosure
- ✅ Data processing agreement with CRM vendor
- ✅ User rights implemented (access, deletion, rectification)

### Data Retention Policy
- **Lead data:** 12 months from submission
- **Server logs (masked):** 6 months
- **User consent records:** 3 years (legal requirement)
- **Deletion request processing:** Within 30 days

## Production Deployment Checklist

- [ ] CRM_API_KEY configured in production environment variables
- [ ] CRM_API_URL set to correct PerfeX endpoint
- [ ] HTTPS enabled for all endpoints
- [ ] Rate limiting configured appropriately (5/hour recommended)
- [ ] Error logging and monitoring setup (Sentry/LogRocket)
- [ ] CRM connection validated in staging environment
- [ ] Load testing completed (test with 100+ submissions)
- [ ] Backup/fallback procedures documented
- [ ] Data retention policies configured in PerfeX CRM
- [ ] Privacy policy updated and linked on all forms
- [ ] PII masking verified in production logs

## Support & Contact

For PerfeX CRM support:
- **Email:** Info@credsmadhan.com
- **Admin Panel:** https://crm.credsmadhan.com/admin
- **API Documentation:** https://crm.credsmadhan.com/api/docs (if available)

For Credsmadhan website support:
- **Contact:** support@credsmadhan.com
- **Emergency:** +91 XXXXX XXXXX
