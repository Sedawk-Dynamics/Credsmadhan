/**
 * Rate limiting: Simple in-memory IP-based rate limiter
 * In production, use Redis for distributed rate limiting
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const LIMIT_PER_HOUR = 5
const HOUR_IN_MS = 60 * 60 * 1000

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    // Reset or create new entry
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + HOUR_IN_MS,
    })
    return true
  }

  if (entry.count < LIMIT_PER_HOUR) {
    entry.count++
    return true
  }

  return false
}

export function getRateLimitStatus(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    return { allowed: true, remaining: LIMIT_PER_HOUR, resetTime: now + HOUR_IN_MS }
  }

  return {
    allowed: entry.count < LIMIT_PER_HOUR,
    remaining: Math.max(0, LIMIT_PER_HOUR - entry.count),
    resetTime: entry.resetTime,
  }
}

/**
 * Mask sensitive data for logging
 */
export function maskPAN(pan?: string): string {
  if (!pan || pan.length < 4) return '****'
  return `****${pan.slice(-4)}`
}

export function maskPhone(phone?: string): string {
  if (!phone || phone.length < 4) return '****'
  return `****${phone.slice(-4)}`
}

export function maskEmail(email?: string): string {
  if (!email || !email.includes('@')) return '****@****'
  const [local, domain] = email.split('@')
  return `${local.slice(0, 2)}****@${domain}`
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * Validate PAN format
 */
export function isValidPAN(pan: string): boolean {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  return panRegex.test(pan)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generate secure session token (for future auth implementation)
 */
export function generateSessionToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  const charLength = chars.length
  const randomValues = crypto.getRandomValues(new Uint8Array(length))
  for (let i = 0; i < length; i++) {
    token += chars[randomValues[i] % charLength]
  }
  return token
}

/**
 * Get client IP from request
 */
export function getClientIP(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return headers.get('x-real-ip') || 'unknown'
}
