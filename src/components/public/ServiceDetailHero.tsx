'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ProfileCtaList } from '@/components/public/ProfileTopGrid'
import type { BannerHeroContent } from '@/lib/data/pageHeroes'
import { FadeIn, FadeInItem, FadeInStagger } from '@/components/public/motion/FadeIn'

interface ServiceDetailHeroProps {
  title: string
  excerpt: string
  image: string
  imageAlt?: string
  banner?: BannerHeroContent
}

export default function ServiceDetailHero({
  title,
  excerpt,
  image,
  imageAlt,
  banner,
}: ServiceDetailHeroProps) {
  const heroTitle = banner?.title || title
  const sidebarBody = banner?.contentBox?.body || excerpt
  const sidebarEmphasis = banner?.contentBox?.emphasis
  const links = banner?.links || [
    { label: 'Request for Quote', href: '/booking' },
    { label: 'Cleaning Evaluation Calculator', href: '/calculator' },
  ]

  return (
    <section className="bg-white pt-6 sm:pt-8 pb-6 sm:pb-8">
      <div className="container-custom">
        <FadeIn immediate y={12}>
          <nav className="mb-4 sm:mb-5" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-graphite/60">
              <li>
                <Link href="/services" className="hover:text-profile-blue transition-colors">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-profile-blue">{title}</li>
            </ol>
          </nav>
        </FadeIn>

        <FadeInStagger immediate stagger={0.1}>
          <FadeInItem className="mb-5 sm:mb-6">
            <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight text-center text-graphite max-w-4xl mx-auto text-balance">
              {heroTitle}
            </h1>
          </FadeInItem>

          <FadeInItem>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
              <div className="lg:col-span-2 relative min-h-[280px] sm:min-h-[320px] rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <Image
                  src={banner?.image || image}
                  alt={imageAlt || title}
                  fill
                  className="object-cover object-center brightness-[1.05] saturate-[0.85]"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
              </div>

              <aside className="bg-soft-ice border border-gray-200 rounded-xl p-5 sm:p-6 flex flex-col h-full">
                <p className="text-sm sm:text-[15px] text-graphite/80 leading-relaxed">{sidebarBody}</p>
                {sidebarEmphasis && (
                  <p className="mt-3 text-sm sm:text-base font-bold text-graphite">{sidebarEmphasis}</p>
                )}
                <div className="mt-auto pt-5">
                  <ProfileCtaList links={links} />
                </div>
              </aside>
            </div>
          </FadeInItem>
        </FadeInStagger>
      </div>
    </section>
  )
}
