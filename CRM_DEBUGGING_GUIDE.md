# CRM Debugging Guide

## Quick Start - Check CRM Configuration

### Step 1: Verify Environment Variables are Set

Open your `.env.local` file and ensure you have:

```env
CRM_API_URL=https://crm.credsmadhan.com/api/website-lead
CRM_API_KEY=your_actual_api_key_here
```

If either is missing or empty, that's your problem. You MUST set both variables.

### Step 2: Check Configuration via API

Visit this URL in your browser while dev server is running:

```
http://localhost:3000/api/crm-status
```

You should see a response like:
```json
{
  "crmApiKeyConfigured": true,
  "crmApiUrl": "https://crm.credsmadhan.com/api/website-lead",
  "crmApiKeyLength": 40,
  "crmApiKeyFirst4Chars": "sk_l..."
}
```

If `crmApiKeyConfigured` is `false`, the API key is not set.

### Step 3: Monitor Console Logs During Form Submission

1. Open browser DevTools (F12)
2. Go to Console tab
3. Fill out and submit a form
4. Look for logs starting with `[v0]`, `[LEAD]`, or `[CRM]`

Expected successful flow:
```
[v0] Form submission started with data: {...}
[v0] Processed data: {...}
[v0] API response status: 200
[v0] API response body: {success: true, leadId: "..."}
[LEAD API] Request received
[LEAD API] Service type validated: credit-cibil-analysis
[LEAD API] Validation passed
[LEAD API] Submitting to CRM...
[CRM] Submitting lead to PerfeX (attempt 1/3)
[CRM] API URL: https://crm.credsmadhan.com/api/website-lead
[CRM] API Key present: true
[CRM] Response status: 200 OK
[CRM] Lead submitted successfully to PerfeX: LEAD-xxxxx
Success! Your Lead ID: LEAD-xxxxx
```

## Common Issues & Solutions

### Issue 1: "CRM_API_KEY is not configured!"

**Problem:** You see this log message in the console.

**Solution:**
1. Check your `.env.local` file - make sure `CRM_API_KEY` is set
2. Get your API key from https://crm.credsmadhan.com/admin (Info@credsmadhan.com / Welcome@2026)
3. Restart dev server: `npm run dev`
4. Try submitting form again

### Issue 2: "PerfeX API error: 401"

**Problem:** Form submission fails with 401 Unauthorized error.

**Solution:**
1. Your API key is invalid or expired
2. Log in to PerfeX CRM: https://crm.credsmadhan.com/admin
3. Generate a new API key in Settings → API Keys
4. Update `.env.local` with new key
5. Restart dev server
6. Try again

### Issue 3: "PerfeX API error: 400"

**Problem:** Form validation fails on CRM side.

**Solution:**
1. Check the error message in console logs for details
2. Verify form data matches CRM requirements
3. Check that phone number is 10 digits
4. Check that email format is valid
5. Try with different test data

### Issue 4: "Failed to submit lead... after maximum retries"

**Problem:** CRM connection timeout or network error.

**Solution:**
1. Check internet connectivity
2. Verify CRM endpoint is accessible: `https://crm.credsmadhan.com/api/website-lead`
3. Check if PerfeX CRM is running (ask admin)
4. Try again - might be temporary network issue
5. If persistent, contact support

### Issue 5: "Internal server error. Please try again later."

**Problem:** General server error not caught by specific handlers.

**Solution:**
1. Check server terminal for error logs
2. Check browser console for full error message
3. Review `/api/submit-lead` logs
4. Verify all environment variables are set correctly

## Manual Testing with cURL

Test CRM connection manually from command line:

```bash
curl -X POST "https://crm.credsmadhan.com/api/website-lead" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "service": "Testing",
    "message": "Manual API test",
    "source": "Website",
    "website": "credsmadhan.com",
    "timestamp": "'$(date -u +'%Y-%m-%dT%H:%M:%S.000Z')'
  }'
```

Response should be 200 OK with lead ID:
```json
{
  "success": true,
  "leadId": "LEAD-xxxxx"
}
```

## Vercel Deployment Issues

If form works locally but not on Vercel:

1. **Check Environment Variables in Vercel Project Settings:**
   - Go to vercel.com → Your Project → Settings → Environment Variables
   - Add `CRM_API_KEY` with your actual API key
   - Add `CRM_API_URL` (usually not needed, has default)
   - Redeploy the project

2. **Check Firewall/CORS:**
   - PerfeX CRM must allow requests from your Vercel domain
   - Contact PerfeX admin if you get CORS errors

3. **Check Server Logs:**
   - In Vercel dashboard, go to Deployments → Select deployment → Logs
   - Look for `[LEAD]` or `[CRM]` log messages

## Getting Help

If you're still stuck:

1. Run through all steps in "Check CRM Configuration" section
2. Collect the full error message and console logs
3. Contact PerfeX CRM support: Info@credsmadhan.com
4. Include:
   - Full error message
   - Console logs (redact API key)
   - Test data you used
   - Which environment (local/Vercel)
