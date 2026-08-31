import PageEditor from '@/components/admin/pages/PageEditor'
import { MANAGED_PAGE_SLUGS } from '@/lib/data/pageDefaults'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return MANAGED_PAGE_SLUGS.map((slug) => ({ slug }))
}

export default function AdminPageEditPage({ params }: Props) {
  if (!MANAGED_PAGE_SLUGS.includes(params.slug as (typeof MANAGED_PAGE_SLUGS)[number])) {
    notFound()
  }
  return <PageEditor slug={params.slug} />
}
