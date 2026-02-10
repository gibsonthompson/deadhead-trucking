export async function sendSmsNotification({ to, message }) {
  const apiKey = process.env.TELNYX_API_KEY
  const from = process.env.TELNYX_FROM_NUMBER

  if (!apiKey || !from) {
    console.warn('Telnyx not configured — skipping SMS notification')
    return { success: false, reason: 'not_configured' }
  }

  try {
    const response = await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        text: message,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Telnyx SMS error:', data)
      return { success: false, reason: 'api_error', error: data }
    }

    return { success: true, messageId: data.data?.id }
  } catch (error) {
    console.error('Telnyx SMS exception:', error)
    return { success: false, reason: 'exception', error: error.message }
  }
}
