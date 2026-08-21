'use client'

import ProfileTopGrid from '@/components/public/ProfileTopGrid'
import type { BannerHeroContent } from '@/lib/data/pageHeroes'
import { AnimatedSection } from '@/components/public/motion/FadeIn'

interface ProfilePageTopProps extends BannerHeroContent {
  footerNote?: string
  layout?: 'split' | 'featured'
}

export default function ProfilePageTop({
  image,
  title,
  titleVariant,
  contentBox,
  links,
  footerNote,
  layout = 'split',
}: ProfilePageTopProps) {
  return (
    <>
      <ProfileTopGrid
        image={image}
        title={title}
        layout={layout}
        titleClassName={titleVariant === 'dark' ? 'text-graphite' : undefined}
        sidebar={{
          heading: contentBox?.heading,
          body: contentBox?.body || '',
          emphasis: contentBox?.emphasis,
          links,
        }}
      />
      {footerNote && (
        <AnimatedSection className="container-custom pt-5 pb-1">
          <p className="text-base sm:text-lg font-semibold text-graphite">{footerNote}</p>
        </AnimatedSection>
      )}
    </>
  )
}
