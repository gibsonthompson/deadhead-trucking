import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendSmsNotification } from '@/lib/telnyx'

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, company, email, phone, origin, destination, freight_type, details } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    if (!supabase) {
      console.error('Supabase not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Insert into deadhead_quotes table
    const { data, error } = await supabase
      .from('deadhead_quotes')
      .insert([{
        name,
        company: company || null,
        email,
        phone: phone || null,
        origin: origin || null,
        destination: destination || null,
        freight_type: freight_type || null,
        details: details || null,
        status: 'new',
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save quote' }, { status: 500 })
    }

    // Send SMS notification
    const notificationPhone = process.env.NOTIFICATION_PHONE
    if (notificationPhone) {
      const freightLabel = {
        general: 'General Freight',
        auto: 'Motor Vehicle',
        hazmat: 'Hazmat',
        other: 'Other',
      }[freight_type] || 'Not specified'

      const smsMessage = `🚛 New Quote Request\n\nName: ${name}\nCompany: ${company || 'N/A'}\nPhone: ${phone || 'N/A'}\nEmail: ${email}\nType: ${freightLabel}\nRoute: ${origin || '?'} → ${destination || '?'}\n\nView in dashboard.`

      await sendSmsNotification({
        to: notificationPhone,
        message: smsMessage,
      })
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('Quote API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
