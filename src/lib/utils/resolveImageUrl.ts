const PLACEHOLDER = '/hero-bg.png'

export function resolveImageUrl(url?: string | null): string {
  if (!url) return PLACEHOLDER
  if (url.startsWith('/uploads/')) return PLACEHOLDER
  return url
}

export function isApiUploadUrl(url?: string | null): boolean {
  return Boolean(url?.startsWith('/api/uploads/'))
}
