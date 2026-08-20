'use client'

import Image from 'next/image'
import ProfileTopGrid, { ProfileCtaList } from '@/components/public/ProfileTopGrid'
import {
  HOME_CONTENT,
  HOME_FACTS_LINKS,
  HOME_ASSESSMENT_LINKS,
  PROFILE_IMAGES,
} from '@/lib/data/profileContent'
import { AnimatedSection, FadeInItem, FadeInStagger } from '@/components/public/motion/FadeIn'

export default function HomeTopSection() {
  return (
    <>
      <ProfileTopGrid
        image={PROFILE_IMAGES.homeLobby}
        title={HOME_CONTENT.heroTitle}
        sidebar={{
          heading: HOME_CONTENT.factsHeading,
          body: HOME_CONTENT.factsBody,
          emphasis: HOME_CONTENT.factsEmphasis,
          links: HOME_FACTS_LINKS,
        }}
      />

      <AnimatedSection className="bg-white pt-6 sm:pt-8 pb-4">
        <div className="container-custom">
          <FadeInStagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3" stagger={0.06}>
            {PROFILE_IMAGES.gallery.map((src, index) => (
              <FadeInItem
                key={src}
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 bg-soft-ice"
              >
                <Image
                  src={src}
                  alt=""
                  fill
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
                {HOME_CONTENT.absenteeismHeading}
              </h2>
              <p className="text-sm sm:text-[15px] text-graphite/80 leading-relaxed mb-4">
                {HOME_CONTENT.absenteeismBody}
              </p>
              <p className="text-sm sm:text-base font-bold text-graphite">
                {HOME_CONTENT.absenteeismEmphasis}
              </p>
            </FadeInItem>

            <FadeInItem className="relative min-h-[220px] sm:min-h-[260px] rounded-xl overflow-hidden border border-gray-100">
              <Image
                src={PROFILE_IMAGES.bottomRight}
                alt=""
                fill
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
              <Image
                src={PROFILE_IMAGES.bottomLeft}
                alt=""
                fill
                className="object-cover object-center brightness-[1.05] saturate-[0.8]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </FadeInItem>

            <FadeInItem className="relative min-h-[260px] rounded-xl overflow-hidden border border-gray-100">
              <Image
                src={PROFILE_IMAGES.bottomCenter}
                alt=""
                fill
                className="object-cover object-center brightness-[1.05] saturate-[0.8]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </FadeInItem>

            <FadeInItem className="md:col-span-2 lg:col-span-2 bg-soft-ice border border-gray-200 rounded-xl p-5 sm:p-7 flex flex-col justify-center">
              <h2 className="font-display text-xl font-bold text-graphite mb-3">
                {HOME_CONTENT.assessmentHeading}
              </h2>
              <p className="text-sm sm:text-[15px] text-graphite/80 leading-relaxed mb-2">
                {HOME_CONTENT.assessmentBody}
              </p>
              <p className="text-sm sm:text-base font-bold text-graphite mb-4">
                {HOME_CONTENT.assessmentEmphasis}
              </p>
              <ProfileCtaList links={HOME_ASSESSMENT_LINKS} />
            </FadeInItem>
          </FadeInStagger>
        </div>
      </AnimatedSection>
    </>
  )
}
