import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import Inquiry from '@/lib/models/Inquiry'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { name, email, phone, company, market, service, facilitySize, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    await connectDB()

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      company,
      market,
      service,
      facilitySize,
      message,
      source: 'booking_form',
      status: 'new',
    })

    return NextResponse.json({ success: true, id: inquiry._id }, { status: 201 })
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}
