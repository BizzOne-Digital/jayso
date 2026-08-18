'use client'

import Image from 'next/image'
import { ReactNode } from 'react'

interface PageHeroProps {
  image?: string
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  size?: 'large' | 'medium'
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
      ? 'min-h-[480px] sm:min-h-[520px] lg:min-h-[580px]'
      : 'min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]'

  return (
    <section className={`relative ${heightClass} flex items-end overflow-hidden bg-graphite`}>
      <Image
        src={image}
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div
        className={`container-custom relative z-10 w-full pb-10 pt-28 sm:pb-12 sm:pt-32 ${
          align === 'center' ? 'text-center' : 'text-left'
        }`}
      >
        <div className={align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-2xl'}>
          {eyebrow && (
            <p className="text-profile-blue font-semibold text-xs sm:text-sm uppercase tracking-[0.12em] mb-3">
              {eyebrow}
            </p>
          )}
          <h1 className="text-white font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}
