import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
        }

        const API_KEY = process.env.MAILCHIMP_API_KEY
        const LIST_ID = process.env.MAILCHIMP_LIST_ID

        if (!API_KEY || !LIST_ID) {
            console.error('Mailchimp configuration missing')
            return NextResponse.json({ error: 'Newsletter service not configured' }, { status: 500 })
        }

        const DATACENTER = API_KEY.split('-')[1]
        const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `apikey ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email_address: email,
                status: 'subscribed',
            }),
        })

        if (!response.ok) {
            const error = await response.json()
            console.error('Mailchimp error:', error)

            // Handle duplicate email specifically (Mailchimp returns 400 for already existing members)
            if (response.status === 400 && error.title === 'Member Exists') {
                return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 })
            }

            return NextResponse.json({ error: 'Failed to subscribe' }, { status: response.status })
        }

        return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 })
    } catch (error) {
        console.error('Newsletter subscription error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
