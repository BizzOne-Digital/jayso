import AdminGalleryCategoryPage from '@/components/admin/gallery/AdminGalleryCategoryPage'

interface Props {
  params: { id: string }
}

export default function GalleryCategoryAdminRoute({ params }: Props) {
  return <AdminGalleryCategoryPage categoryId={params.id} />
}
