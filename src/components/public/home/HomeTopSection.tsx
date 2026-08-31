'use client'

import Image from 'next/image'
import ProfileTopGrid, { ProfileCtaList } from '@/components/public/ProfileTopGrid'
import {
  HOME_CONTENT,
  HOME_FACTS_LINKS,
  HOME_ASSESSMENT_LINKS,
  PROFILE_IMAGES,
} from '@/lib/data/profileContent'
import type { HomeTopContent } from '@/lib/services/getPageContent'
import { isApiUploadUrl, resolveImageUrl } from '@/lib/utils/resolveImageUrl'
import { AnimatedSection, FadeInItem, FadeInStagger } from '@/components/public/motion/FadeIn'

interface HomeTopSectionProps {
  content: HomeTopContent
}

function CmsImage({
  src,
  alt = '',
  className,
  sizes,
  priority,
}: {
  src: string
  alt?: string
  className?: string
  sizes: string
  priority?: boolean
}) {
  const resolved = resolveImageUrl(src)
  return (
    <Image
      src={resolved}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={isApiUploadUrl(src)}
    />
  )
}

export default function HomeTopSection({ content }: HomeTopSectionProps) {
  const galleryImages =
    content.galleryImages.length > 0 ? content.galleryImages : [...PROFILE_IMAGES.gallery]

  return (
    <>
      <ProfileTopGrid
        image={resolveImageUrl(content.heroImage)}
        title={content.heroTitle || HOME_CONTENT.heroTitle}
        sidebar={{
          heading: content.factsHeading || HOME_CONTENT.factsHeading,
          body: content.factsBody || HOME_CONTENT.factsBody,
          emphasis: content.factsEmphasis || HOME_CONTENT.factsEmphasis,
          links: HOME_FACTS_LINKS,
        }}
      />

      <AnimatedSection className="bg-white pt-6 sm:pt-8 pb-4">
        <div className="container-custom">
          <FadeInStagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3" stagger={0.06}>
            {galleryImages.map((src, index) => (
              <FadeInItem
                key={`${src}-${index}`}
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 bg-soft-ice"
              >
                <CmsImage
                  src={src}
                  className="object-cover object-center brightness-[1.05] saturate-[0.8]"
                  sizes="(max-width: 768px) 50vw, 20vw"
                  priority={index < 2}
                />
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-white pb-6 sm:pb-8">
        <div className="container-custom">
          <FadeInStagger className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5" stagger={0.1}>
            <FadeInItem className="lg:col-span-2 bg-soft-ice border border-gray-200 rounded-xl p-5 sm:p-7">
              <h2 className="font-display text-lg sm:text-xl font-bold text-graphite mb-4 text-center sm:text-left">
                {content.absenteeismHeading || HOME_CONTENT.absenteeismHeading}
              </h2>
              <p className="text-sm sm:text-[15px] text-graphite/80 leading-relaxed mb-4">
                {content.absenteeismBody || HOME_CONTENT.absenteeismBody}
              </p>
              <p className="text-sm sm:text-base font-bold text-graphite">
                {content.absenteeismEmphasis || HOME_CONTENT.absenteeismEmphasis}
              </p>
            </FadeInItem>

            <FadeInItem className="relative min-h-[220px] sm:min-h-[260px] rounded-xl overflow-hidden border border-gray-100">
              <CmsImage
                src={content.absenteeismImage}
                className="object-cover object-center brightness-[1.05] saturate-[0.8]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </FadeInItem>
          </FadeInStagger>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-white pb-8 sm:pb-10">
        <div className="container-custom">
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5" stagger={0.1}>
            <FadeInItem className="relative min-h-[260px] rounded-xl overflow-hidden border border-gray-100">
              <CmsImage
                src={content.assessmentLeftImage}
                className="object-cover object-center brightness-[1.05] saturate-[0.8]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </FadeInItem>

            <FadeInItem className="relative min-h-[260px] rounded-xl overflow-hidden border border-gray-100">
              <CmsImage
                src={content.assessmentCenterImage}
                className="object-cover object-center brightness-[1.05] saturate-[0.8]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </FadeInItem>

            <FadeInItem className="md:col-span-2 lg:col-span-2 bg-soft-ice border border-gray-200 rounded-xl p-5 sm:p-7 flex flex-col justify-center">
              <h2 className="font-display text-xl font-bold text-graphite mb-3">
                {content.assessmentHeading || HOME_CONTENT.assessmentHeading}
              </h2>
              <p className="text-sm sm:text-[15px] text-graphite/80 leading-relaxed mb-2">
                {content.assessmentBody || HOME_CONTENT.assessmentBody}
              </p>
              <p className="text-sm sm:text-base font-bold text-graphite mb-4">
                {content.assessmentEmphasis || HOME_CONTENT.assessmentEmphasis}
              </p>
              <ProfileCtaList links={HOME_ASSESSMENT_LINKS} />
            </FadeInItem>
          </FadeInStagger>
        </div>
      </AnimatedSection>
    </>
  )
}
