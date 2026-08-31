import { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'
import TestimonialsSlider from '@/components/public/testimonials/TestimonialsSlider'
import { getManagedPage, getSection } from '@/lib/services/getPageContent'
import { getPublishedTestimonials } from '@/lib/services/getPublishedTestimonials'
import { resolveImageUrl } from '@/lib/utils/resolveImageUrl'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'What our clients say about Profile Environmental Support Services.',
}

export default async function TestimonialsPage() {
  const [page, testimonials] = await Promise.all([
    getManagedPage('testimonials'),
    getPublishedTestimonials(),
  ])

  const hero = getSection(page.sections, 'Hero')

  return (
    <div className="min-h-screen">
      <PageHero
        image={resolveImageUrl(hero?.imageUrl)}
        eyebrow={hero?.eyebrow}
        title={hero?.heading || 'What Our Clients Say'}
        subtitle={hero?.content}
      />

      <section className="section-padding bg-soft-ice">
        <div className="container-custom">
          <TestimonialsSlider testimonials={testimonials} />
        </div>
      </section>
    </div>
  )
}
