import { revalidatePath } from 'next/cache'
import type { ManagedPageSlug } from '@/lib/data/pageDefaults'

const PAGE_PATHS: Record<ManagedPageSlug, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  gallery: '/gallery',
  testimonials: '/testimonials',
  faqs: '/faq',
  contact: '/contact',
}

export function revalidateManagedPage(slug: ManagedPageSlug) {
  revalidatePath(PAGE_PATHS[slug])
  revalidatePath('/', 'layout')
}

export function revalidateSiteLayout() {
  revalidatePath('/', 'layout')
}

export function revalidateServices() {
  revalidatePath('/services')
  revalidatePath('/', 'layout')
}

export function revalidateService(slug: string) {
  revalidatePath('/services')
  revalidatePath(`/services/${slug}`)
  revalidatePath('/')
  revalidatePath('/', 'layout')
}

export function revalidateFaqs() {
  revalidatePath('/faq')
  revalidatePath('/')
}

export function revalidateTestimonials() {
  revalidatePath('/testimonials')
}

export function revalidateGallery() {
  revalidatePath('/gallery')
}
