import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'
import { getPublishedFAQs } from '@/lib/services/getPublishedContent'
import { AnimatedGrid, AnimatedSection } from '@/components/public/motion/FadeIn'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Profile Environmental Support Services.',
}

export default async function FAQPage() {
  const faqs = await getPublishedFAQs()
  const categories: string[] = Array.from(
    new Set(faqs.map((faq: { category: string }) => faq.category))
  )

  return (
    <div className="min-h-screen">
      <PageHero
        image="/hero-bg.png"
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about our services, scheduling, and quality standards."
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          {categories.map((category) => (
            <AnimatedSection key={category} className="mb-10 last:mb-0">
              <h2 className="font-display text-xl font-bold text-graphite mb-4">{category}</h2>
              <AnimatedGrid className="space-y-3">
                {faqs
                  .filter((faq: any) => faq.category === category)
                  .map((faq: any) => (
                    <details
                      key={faq._id}
                      className="group rounded-2xl border border-gray-200 bg-soft-ice open:bg-white open:shadow-sm"
                    >
                      <summary className="cursor-pointer list-none px-6 py-4 font-semibold text-graphite flex items-center justify-between">
                        {faq.question}
                        <span className="text-profile-blue text-xl group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="px-6 pb-5 text-graphite/75 leading-relaxed">{faq.answer}</div>
                    </details>
                  ))}
              </AnimatedGrid>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="section-padding bg-soft-ice border-t border-gray-100">
        <AnimatedSection className="container-custom text-center">
          <h2 className="font-display text-2xl font-bold mb-4 text-graphite">Still Have Questions?</h2>
          <Link href="/contact" className="btn-primary inline-flex items-center">
            Contact Us
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </AnimatedSection>
      </section>
    </div>
  )
}
