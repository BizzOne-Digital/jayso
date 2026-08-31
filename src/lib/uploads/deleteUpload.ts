import { connectDB } from '@/lib/db/mongoose'
import StoredUpload from '@/lib/models/StoredUpload'
import type { UploadFolder } from '@/lib/uploads/constants'

const UPLOAD_URL_PREFIX = '/api/uploads/'

export function parseUploadUrl(url: string): { folder: UploadFolder; filename: string } | null {
  if (!url.startsWith(UPLOAD_URL_PREFIX)) return null
  const rest = url.slice(UPLOAD_URL_PREFIX.length)
  const slash = rest.indexOf('/')
  if (slash === -1) return null
  const folder = rest.slice(0, slash) as UploadFolder
  const filename = rest.slice(slash + 1)
  if (!filename || filename.includes('..') || filename.includes('/')) return null
  return { folder, filename }
}

export async function deleteUploadByUrl(url: string | undefined | null): Promise<void> {
  if (!url) return
  const parsed = parseUploadUrl(url)
  if (!parsed) return
  await connectDB()
  await StoredUpload.deleteOne({ folder: parsed.folder, filename: parsed.filename })
}
