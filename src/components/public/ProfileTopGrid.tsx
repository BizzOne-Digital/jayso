'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { ProfileCtaLink } from '@/lib/data/profileContent'
import { FadeInItem, FadeInStagger } from '@/components/public/motion/FadeIn'

interface ProfileSidebarProps {
  heading?: string
  body: string
  emphasis?: string
  links?: ProfileCtaLink[]
  className?: string
}

export function ProfileCtaList({ links }: { links: ProfileCtaLink[] }) {
  return (
    <div className="space-y-2 mt-4">
      {links.map((link) => (
        <Link
          key={link.href + link.label}
          href={link.href}
          className="flex items-center gap-2.5 text-sm font-semibold text-graphite hover:text-profile-blue transition-colors group"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-profile-blue text-white group-hover:bg-profile-blue/90">
            <ChevronRight className="h-4 w-4" />
          </span>
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  )
}

export function ProfileSidebar({ heading, body, emphasis, links, className }: ProfileSidebarProps) {
  return (
    <aside className={cn('bg-soft-ice border border-gray-200 rounded-xl p-5 sm:p-6 h-full', className)}>
      {heading && <h2 className="font-display text-lg font-bold text-graphite mb-3">{heading}</h2>}
      <p className="text-sm sm:text-[15px] text-graphite/80 leading-relaxed">{body}</p>
      {emphasis && <p className="mt-3 text-sm sm:text-base font-bold text-graphite">{emphasis}</p>}
      {links && links.length > 0 && <ProfileCtaList links={links} />}
    </aside>
  )
}

function HeroTitle({ title, className }: { title: string; className?: string }) {
  return (
    <h1
      className={cn(
        'font-display font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] leading-tight text-center text-graphite max-w-5xl mx-auto text-balance',
        className
      )}
    >
      {title}
    </h1>
  )
}

interface ProfileTopGridProps {
  image: string
  title: string
  titleClassName?: string
  sidebar: ProfileSidebarProps
  imageClassName?: string
  layout?: 'split' | 'featured'
}

export default function ProfileTopGrid({
  image,
  title,
  titleClassName,
  sidebar,
  imageClassName,
  layout = 'split',
}: ProfileTopGridProps) {
  const imageBlock = (className: string, sizes: string) => (
    <div className={cn('relative rounded-xl overflow-hidden border border-gray-100 shadow-sm', className)}>
      <Image
        src={image}
        alt=""
        fill
        className={cn('object-cover object-center brightness-[1.05] saturate-[0.85]', imageClassName)}
        priority
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
    </div>
  )

  if (layout === 'featured') {
    return (
      <section className="bg-white pt-6 sm:pt-8">
        <div className="container-custom">
          <FadeInStagger immediate stagger={0.1}>
            <FadeInItem className="mb-5 sm:mb-6">
              <HeroTitle title={title} className={titleClassName} />
            </FadeInItem>

            <FadeInItem>
              {imageBlock(
                'min-h-[280px] sm:min-h-[380px] lg:min-h-[460px]',
                '(max-width: 1280px) 100vw, 1200px'
              )}
            </FadeInItem>

            <FadeInItem className="mt-5 sm:mt-6">
              <aside className="bg-soft-ice border border-gray-200 rounded-xl p-5 sm:p-6 lg:p-8 h-auto">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                  <div className="lg:col-span-2">
                    {sidebar.heading && (
                      <h2 className="font-display text-lg font-bold text-graphite mb-3">
                        {sidebar.heading}
                      </h2>
                    )}
                    <p className="text-sm sm:text-base text-graphite/80 leading-relaxed">{sidebar.body}</p>
                    {sidebar.emphasis && (
                      <p className="mt-3 text-sm sm:text-base font-bold text-graphite">{sidebar.emphasis}</p>
                    )}
                  </div>
                  {sidebar.links && sidebar.links.length > 0 && (
                    <div className="mt-5 lg:mt-0">
                      <ProfileCtaList links={sidebar.links} />
                    </div>
                  )}
                </div>
              </aside>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white pt-6 sm:pt-8">
      <div className="container-custom">
        <FadeInStagger immediate stagger={0.1}>
          <FadeInItem className="mb-5 sm:mb-6">
            <HeroTitle title={title} className={titleClassName} />
          </FadeInItem>

          <FadeInItem>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
              {imageBlock(
                'lg:col-span-2 min-h-[260px] sm:min-h-[320px]',
                '(max-width: 1024px) 100vw, 66vw'
              )}

              <ProfileSidebar {...sidebar} />
            </div>
          </FadeInItem>
        </FadeInStagger>
      </div>
    </section>
  )
}
