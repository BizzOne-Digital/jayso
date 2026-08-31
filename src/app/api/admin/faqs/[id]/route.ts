import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import FAQ from '@/lib/models/FAQ'
import { requireAdminApi } from '@/lib/auth/adminApi'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: { id: string }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  await connectDB()
  const faq = await FAQ.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json({ success: true, faq })
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  await FAQ.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
