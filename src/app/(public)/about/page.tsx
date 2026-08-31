import { Metadata } from 'next'
import ProfilePageTop from '@/components/public/ProfilePageTop'
import AboutPageContent from '@/components/public/about/AboutPageContent'
import { getManagedPage, getSection } from '@/lib/services/getPageContent'
import { resolveImageUrl } from '@/lib/utils/resolveImageUrl'
import { PAGE_HEROES } from '@/lib/data/pageHeroes'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Profile Environmental Support Services — commercial cleaning, infection prevention, and sustainable facility solutions.',
}

export default async function AboutPage() {
  const page = await getManagedPage('about')
  const hero = getSection(page.sections, 'Hero')
  const intro = getSection(page.sections, 'Excellence Intro')
  const fallback = PAGE_HEROES.about

  return (
    <div className="min-h-screen bg-white">
      <ProfilePageTop
        image={resolveImageUrl(hero?.imageUrl || fallback.image)}
        title={hero?.heading || fallback.title}
        layout="featured"
        contentBox={{
          heading: intro?.heading,
          body: hero?.content || fallback.contentBox?.body || '',
          emphasis: hero?.ctaLabel || fallback.contentBox?.emphasis,
        }}
        links={fallback.links}
        footerNote={intro?.content}
      />
      <AboutPageContent />
    </div>
  )
}
