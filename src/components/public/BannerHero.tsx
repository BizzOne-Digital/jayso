'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { BannerHeroContent } from '@/lib/data/pageHeroes'

interface BannerHeroProps extends BannerHeroContent {
  className?: string
}

function renderTitle(title: string, highlights?: string[]) {
  if (!highlights?.length) {
    return title
  }

  let remaining = title
  const parts: ReactNode[] = []

  highlights.forEach((highlight, index) => {
    const splitIndex = remaining.indexOf(highlight)
    if (splitIndex === -1) return

    if (splitIndex > 0) {
      parts.push(remaining.slice(0, splitIndex))
    }

    parts.push(
      <span key={`${highlight}-${index}`} className="text-emerald-700">
        {highlight}
      </span>
    )

    remaining = remaining.slice(splitIndex + highlight.length)
  })

  if (remaining) {
    parts.push(remaining)
  }

  return parts.length ? parts : title
}

export default function BannerHero({
  image,
  title,
  titleHighlights,
  titleVariant = 'light',
  contentBox,
  contentBoxVariant = 'dark',
  links,
  footerNote,
  className,
}: BannerHeroProps) {
  const boxStyles = {
    dark: 'bg-black/55 text-white backdrop-blur-[2px]',
    light: 'bg-white/80 text-graphite backdrop-blur-sm',
    blue: 'bg-profile-blue/75 text-white backdrop-blur-[2px]',
  }

  return (
    <section className={cn('bg-white pt-6 pb-2 sm:pt-8', className)}>
      <div className="container-custom">
        <div className="relative h-[320px] sm:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover object-center brightness-[1.03] saturate-[0.9]"
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

          <div className="absolute inset-0 p-5 sm:p-7 lg:p-8 flex flex-col">
            <h1
              className={cn(
                'max-w-2xl font-display font-bold text-xl sm:text-2xl lg:text-3xl leading-tight drop-shadow-sm',
                titleVariant === 'dark' ? 'text-graphite' : 'text-white'
              )}
            >
              {renderTitle(title, titleHighlights)}
            </h1>

            <div className="mt-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              {footerNote && (
                <p className="hidden lg:block max-w-md text-sm font-medium text-white/95 drop-shadow-sm">
                  {footerNote}
                </p>
              )}

              <div className="w-full lg:w-auto lg:max-w-md xl:max-w-lg ml-auto">
                {contentBox && (
                  <div className={cn('rounded-lg p-4 sm:p-5', boxStyles[contentBoxVariant])}>
                    {contentBox.heading && (
                      <p className="font-semibold text-base sm:text-lg mb-2">{contentBox.heading}</p>
                    )}
                    <p className="text-sm sm:text-[15px] leading-relaxed">{contentBox.body}</p>
                    {contentBox.emphasis && (
                      <p className="mt-3 text-sm sm:text-base font-bold">{contentBox.emphasis}</p>
                    )}
                  </div>
                )}

                {links && links.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {links.map((link) => (
                      <Link
                        key={link.href + link.label}
                        href={link.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white drop-shadow-sm hover:text-white/90 transition-colors group"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-profile-blue text-white group-hover:bg-profile-blue/90">
                          <ChevronRight className="h-4 w-4" />
                        </span>
                        <span className="border-b border-transparent group-hover:border-white/80">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {footerNote && (
              <p className="lg:hidden mt-4 text-sm font-medium text-white/95 drop-shadow-sm">
                {footerNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
