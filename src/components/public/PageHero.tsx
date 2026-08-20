'use client'

import Image from 'next/image'
import { ReactNode } from 'react'
import { FadeIn } from '@/components/public/motion/FadeIn'

interface PageHeroProps {
  image?: string
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  size?: 'large' | 'medium' | 'compact'
  children?: ReactNode
}

export default function PageHero({
  image = '/hero-bg.png',
  eyebrow,
  title,
  subtitle,
  align = 'left',
  size = 'medium',
  children,
}: PageHeroProps) {
  const heightClass =
    size === 'large'
      ? 'h-[220px] sm:h-[260px] lg:h-[300px]'
      : size === 'compact'
        ? 'h-[160px] sm:h-[180px] lg:h-[200px]'
        : 'h-[180px] sm:h-[220px] lg:h-[240px]'

  return (
    <section className="bg-white pt-6 pb-8 sm:pt-8 sm:pb-10">
      <div className="container-custom">
        <FadeIn immediate y={20}>
          <div
            className={`relative ${heightClass} rounded-2xl overflow-hidden bg-soft-ice shadow-sm border border-gray-100`}
          >
          <Image
            src={image}
            alt=""
            fill
            className="object-cover object-center brightness-[1.05] saturate-[0.85]"
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/45 to-white/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={20} className={`mt-6 sm:mt-8 ${align === 'center' ? 'text-center' : 'text-left'}`}>
          <div className={align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-2xl'}>
            {eyebrow && (
              <p className="text-profile-blue font-semibold text-xs sm:text-sm uppercase tracking-[0.12em] mb-3">
                {eyebrow}
              </p>
            )}
            <h1 className="text-graphite font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-graphite/75 text-base sm:text-lg leading-relaxed max-w-xl">
                {subtitle}
              </p>
            )}
            {children && <div className="mt-6">{children}</div>}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
