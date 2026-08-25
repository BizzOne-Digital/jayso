import { Metadata } from 'next'
import ProfilePageTop from '@/components/public/ProfilePageTop'
import AboutPageContent from '@/components/public/about/AboutPageContent'
import { PAGE_HEROES } from '@/lib/data/pageHeroes'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Profile Environmental Support Services — commercial cleaning, infection prevention, and sustainable facility solutions.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProfilePageTop {...PAGE_HEROES.about} layout="featured" />
      <AboutPageContent />
    </div>
  )
}
