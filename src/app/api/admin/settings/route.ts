import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import SiteSettings from '@/lib/models/SiteSettings'
import Integration from '@/lib/models/Integration'
import { requireAdminApi } from '@/lib/auth/adminApi'
import { revalidateSiteLayout } from '@/lib/services/revalidatePublic'

export const dynamic = 'force-dynamic'

export async function GET() {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const [settings, integration] = await Promise.all([
    SiteSettings.findOne().lean(),
    Integration.findOne().lean(),
  ])

  return NextResponse.json({ settings, integration })
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  const { settings, integration } = body

  await connectDB()

  let updatedSettings = null
  let updatedIntegration = null

  if (settings) {
    updatedSettings = await SiteSettings.findOneAndUpdate({}, settings, {
      upsert: true,
      new: true,
    })
  }

  if (integration) {
    updatedIntegration = await Integration.findOneAndUpdate({}, integration, {
      upsert: true,
      new: true,
    })
  }

  revalidateSiteLayout()

  return NextResponse.json({
    success: true,
    settings: updatedSettings,
    integration: updatedIntegration,
  })
}
