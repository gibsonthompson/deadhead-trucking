import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { generateSessionToken } from '@/lib/auth'

export async function POST(request) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    const storedHash = process.env.DASHBOARD_PASSWORD_HASH

    // If no hash is set, use a default password (should be changed immediately)
    if (!storedHash) {
      // Default password: "deadhead2026" — set DASHBOARD_PASSWORD_HASH in env to override
      const defaultHash = await bcrypt.hash('deadhead2026', 10)
      const isValid = await bcrypt.compare(password, defaultHash)
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
      }
    } else {
      const isValid = await bcrypt.compare(password, storedHash)
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
      }
    }

    const token = generateSessionToken()

    const response = NextResponse.json({ success: true })
    response.cookies.set('dh_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
