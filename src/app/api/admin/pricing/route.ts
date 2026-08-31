import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import Product from '@/lib/models/Product'
import { requireAdminApi } from '@/lib/auth/adminApi'

export const dynamic = 'force-dynamic'

export async function GET() {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const products = await Product.find().sort({ order: 1 }).lean()
  return NextResponse.json({ products })
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  const { id, ...updates } = body

  await connectDB()
  const product = await Product.findByIdAndUpdate(id, updates, { new: true })
  return NextResponse.json({ success: true, product })
}
