import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'
import { getPublishedProducts } from '@/lib/services/getPublishedContent'
import { AnimatedGrid } from '@/components/public/motion/FadeIn'
import { ShoppingBag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Professional cleaning products and supplies from Profile Environmental Support Services.',
}

export default async function ShopPage() {
  const products = await getPublishedProducts()

  return (
    <div className="min-h-screen">
      <PageHero
        image="/profile/services-hero.jpg"
        size="compact"
        title="Shop"
        subtitle="Professional-grade cleaning products and supplies for commercial and facility use."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-profile-blue/30 transition-all flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-profile-blue/10 flex items-center justify-center mb-5">
                  <ShoppingBag className="w-7 h-7 text-profile-blue" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-profile-blue mb-2">
                  {product.category}
                </p>
                <h2 className="font-display text-lg font-bold text-graphite mb-3">{product.title}</h2>
                <p className="text-sm text-graphite/70 mb-4 flex-grow">{product.excerpt}</p>
                <p className="text-sm font-semibold text-graphite mb-5">
                  {product.priceLabel || 'Contact for pricing'}
                </p>
                <Link href="/contact" className="btn-primary inline-flex items-center justify-center text-sm">
                  Inquire Now
                </Link>
              </div>
            ))}
          </AnimatedGrid>
        </div>
      </section>
    </div>
  )
}
