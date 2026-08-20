import { Metadata } from 'next'
import Link from 'next/link'
import ProfilePageTop from '@/components/public/ProfilePageTop'
import { PAGE_HEROES } from '@/lib/data/pageHeroes'
import { AnimatedGrid, AnimatedSection } from '@/components/public/motion/FadeIn'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Profile Environmental Support Services — commercial cleaning, infection prevention, and sustainable facility solutions.',
}

const servicesInclude = [
  'Development of Best Practices / Standard Operating Procedures',
  'Deep Cleaning (Weekly, Monthly, Quarterly, Annually)',
  'Cleaning & Disinfection',
  'Eco-Friendly Cleaning / Steam Cleaning Program',
  'Floor Maintenance (Floor Strip & Wax)',
  'Strategic Planning',
  'Identification and Evaluation of Requirements and Cost Saving Strategies',
  'Compliance Inspections and Completion Documentation',
  'Project Execution and Contract Management',
  'Supply Management',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <ProfilePageTop {...PAGE_HEROES.about} />

      <section className="section-padding bg-white">
        <AnimatedSection className="container-custom max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-graphite mb-6">
            Committed to Achieving Excellence in Every Result
          </h2>
          <p className="text-lg text-graphite/80 leading-relaxed mb-6">
            At Profile, our commitment to delivering top-tier results is unwavering. We see ourselves
            as an integral part of your company, striving to understand your business inside and out
            through collaborative efforts. By comprehending the unique cleaning challenges you
            encounter, we craft a tailored program to tackle them head-on. Our approach amalgamates
            people, processes, and cutting-edge technology to enhance productivity and performance,
            giving you a competitive edge. This leaves you free to concentrate on your core business
            activities.
          </p>
          <p className="text-lg text-graphite/80 leading-relaxed mb-6">
            Profile specializes in providing timely and meticulously researched solutions tailored
            to the needs of in-house cleaning management professionals across various sectors,
            including schools/universities, medical facilities, corporate offices, commercial and
            retail establishments, government facilities, hospitality venues, and industrial sites.
            What sets us apart is our management-level focus, which goes beyond mere service
            provision.
          </p>
          <p className="text-lg text-graphite/80 leading-relaxed mb-10">
            Our clients trust us to oversee the facility cleaning process in a manner that not only
            identifies opportunities to optimize costs and asset returns but also mitigates liability
            and ensures regulatory compliance. We prioritize a strategic planning approach, aligning
            with property end-use objectives and business imperatives, while adopting a process
            management methodology to foster a program that is both cost-effective and compliant with
            Infection Prevention and Control and Provincial Infectious Diseases Advisory Committee
            (PIDAC) requirements.
          </p>

          <h3 className="font-display text-2xl font-bold text-graphite mb-5">Our Services Include</h3>
          <AnimatedGrid className="space-y-3 mb-10" stagger={0.05}>
            {servicesInclude.map((item) => (
              <li key={item} className="flex items-start gap-3 list-none">
                <CheckCircle className="w-5 h-5 text-profile-blue flex-shrink-0 mt-0.5" />
                <span className="text-graphite/80">{item}</span>
              </li>
            ))}
          </AnimatedGrid>

          <Link href="/booking" className="btn-primary inline-flex items-center">
            Request for Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </AnimatedSection>
      </section>
    </div>
  )
}
