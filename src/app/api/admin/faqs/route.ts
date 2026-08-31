import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import FAQ from '@/lib/models/FAQ'
import { requireAdminApi } from '@/lib/auth/adminApi'
import { revalidateFaqs } from '@/lib/services/revalidatePublic'

export const dynamic = 'force-dynamic'

export async function GET() {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const faqs = await FAQ.find().sort({ order: 1 }).lean()
  return NextResponse.json({ faqs })
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  await connectDB()
  const maxOrder = await FAQ.findOne().sort({ order: -1 }).select('order').lean()

  const faq = await FAQ.create({
    ...body,
    order: body.order ?? (maxOrder?.order ?? 0) + 1,
    status: body.status || 'published',
  })

  revalidateFaqs()

  return NextResponse.json({ success: true, faq })
}
