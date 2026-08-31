import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import Service from '@/lib/models/Service'
import { requireAdminApi } from '@/lib/auth/adminApi'
import { deleteUploadByUrl } from '@/lib/uploads/deleteUpload'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: { id: string }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const service = await Service.findById(params.id).lean()
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ service })
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  await connectDB()
  const existing = await Service.findById(params.id).lean()
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (body.imageUrl && existing.imageUrl !== body.imageUrl) {
    await deleteUploadByUrl(existing.imageUrl)
  }
  if (body.heroImageUrl && existing.heroImageUrl !== body.heroImageUrl) {
    await deleteUploadByUrl(existing.heroImageUrl)
  }

  const service = await Service.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json({ success: true, service })
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const existing = await Service.findById(params.id).lean()
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await deleteUploadByUrl(existing.imageUrl)
  await deleteUploadByUrl(existing.heroImageUrl)
  await Service.findByIdAndDelete(params.id)

  return NextResponse.json({ success: true })
}
