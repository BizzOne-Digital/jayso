'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ContentCardProps {
  title: string
  href: string
  excerpt?: string
  imageUrl?: string
  ctaLabel?: string
}

export default function ContentCard({
  title,
  href,
  excerpt,
  imageUrl = '/hero-bg.png',
  ctaLabel = 'Click Here',
}: ContentCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-profile-blue/30">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="font-display text-lg sm:text-xl font-bold text-graphite mb-2 group-hover:text-profile-blue transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm text-graphite/70 leading-relaxed mb-5 line-clamp-2">{excerpt}</p>
          )}
          <span className="inline-flex items-center text-sm font-semibold text-profile-blue group-hover:gap-2 transition-all">
            {ctaLabel}
            <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </article>
    </Link>
  )
}
