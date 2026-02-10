import { cookies } from 'next/headers'
import crypto from 'crypto'

const SECRET = process.env.SESSION_SECRET || 'fallback-dev-secret-change-me'

export function generateSessionToken() {
  const payload = {
    authenticated: true,
    timestamp: Date.now(),
    nonce: crypto.randomBytes(16).toString('hex'),
  }
  const data = JSON.stringify(payload)
  const hmac = crypto.createHmac('sha256', SECRET).update(data).digest('hex')
  return Buffer.from(JSON.stringify({ data, hmac })).toString('base64')
}

export function validateSessionToken(token) {
  try {
    const { data, hmac } = JSON.parse(Buffer.from(token, 'base64').toString())
    const expectedHmac = crypto.createHmac('sha256', SECRET).update(data).digest('hex')
    if (hmac !== expectedHmac) return false
    const payload = JSON.parse(data)
    // Sessions expire after 24 hours
    if (Date.now() - payload.timestamp > 24 * 60 * 60 * 1000) return false
    return payload.authenticated === true
  } catch {
    return false
  }
}

export function isAuthenticated() {
  const cookieStore = cookies()
  const token = cookieStore.get('dh_session')?.value
  if (!token) return false
  return validateSessionToken(token)
}
