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

interface ProfileTopGridProps {
  image: string
  title: string
  titleClassName?: string
  sidebar: ProfileSidebarProps
  imageClassName?: string
}

export default function ProfileTopGrid({
  image,
  title,
  titleClassName,
  sidebar,
  imageClassName,
}: ProfileTopGridProps) {
  return (
    <section className="bg-white pt-6 sm:pt-8">
      <div className="container-custom">
        <FadeInStagger className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5" immediate stagger={0.12}>
          <FadeInItem className="lg:col-span-2 relative min-h-[260px] sm:min-h-[320px] rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <Image
              src={image}
              alt=""
              fill
              className={cn(
                'object-cover object-center brightness-[1.08] saturate-[0.75] contrast-[0.95]',
                imageClassName
              )}
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
            <div className="absolute inset-0 p-5 sm:p-7 flex items-start">
              <h1
                className={cn(
                  'max-w-lg font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight text-profile-blue drop-shadow-sm',
                  titleClassName
                )}
              >
                {title}
              </h1>
            </div>
          </FadeInItem>

          <FadeInItem>
            <ProfileSidebar {...sidebar} />
          </FadeInItem>
        </FadeInStagger>
      </div>
    </section>
  )
}
