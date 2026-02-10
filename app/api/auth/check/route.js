import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { validateSessionToken } from '@/lib/auth'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('dh_session')?.value

  if (!token || !validateSessionToken(token)) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true })
}
