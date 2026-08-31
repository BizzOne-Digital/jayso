import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import Testimonial from '@/lib/models/Testimonial'
import { requireAdminApi } from '@/lib/auth/adminApi'
import { revalidateTestimonials } from '@/lib/services/revalidatePublic'

export const dynamic = 'force-dynamic'

export async function GET() {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const testimonials = await Testimonial.find().sort({ order: 1 }).lean()
  return NextResponse.json({ testimonials })
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  await connectDB()
  const maxOrder = await Testimonial.findOne().sort({ order: -1 }).select('order').lean()

  const testimonial = await Testimonial.create({
    ...body,
    order: body.order ?? (maxOrder?.order ?? 0) + 1,
    status: body.status || 'published',
  })

  revalidateTestimonials()

  return NextResponse.json({ success: true, testimonial })
}
