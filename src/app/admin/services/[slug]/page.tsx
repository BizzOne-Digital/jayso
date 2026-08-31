import ServiceEditor from '@/components/admin/services/ServiceEditor'
import { SERVICE_CATALOG } from '@/lib/data/services'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return SERVICE_CATALOG.map((s) => ({ slug: s.slug }))
}

export default function AdminServiceEditPage({ params }: Props) {
  const exists = SERVICE_CATALOG.some((s) => s.slug === params.slug)
  if (!exists) notFound()
  return <ServiceEditor slug={params.slug} />
}
