export const UPLOAD_FOLDERS = ['products', 'gallery', 'pages', 'misc'] as const
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number]

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024 // 8MB

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
] as const

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number]

export const MIME_TO_EXT: Record<AllowedMimeType, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}
