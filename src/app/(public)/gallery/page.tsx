import { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/public/PageHero'
import { getManagedPage, getSection } from '@/lib/services/getPageContent'
import { getPublishedGallery } from '@/lib/services/getPublishedGallery'
import { resolveImageUrl, isApiUploadUrl } from '@/lib/utils/resolveImageUrl'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'View our facility cleaning projects and results.',
}

export default async function GalleryPage() {
  const [page, categories] = await Promise.all([
    getManagedPage('gallery'),
    getPublishedGallery(),
  ])

  const hero = getSection(page.sections, 'Hero')

  return (
    <div className="min-h-screen">
      <PageHero
        image={resolveImageUrl(hero?.imageUrl)}
        title={hero?.heading || 'Our Work Gallery'}
        subtitle={hero?.content}
      />

      <section className="section-padding bg-white">
        <div className="container-custom space-y-16">
          {categories.length === 0 ? (
            <p className="text-center text-graphite/60">Gallery images coming soon.</p>
          ) : (
            categories.map((category) => (
              <div key={category._id}>
                <h2 className="font-display text-2xl font-bold text-graphite mb-6">{category.name}</h2>
                {category.description && (
                  <p className="text-graphite/70 mb-6 max-w-3xl">{category.description}</p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.images?.map((image: { _id: string; imageUrl: string; title?: string; alt?: string }) => (
                    <div
                      key={image._id}
                      className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 bg-soft-ice"
                    >
                      <Image
                        src={resolveImageUrl(image.imageUrl)}
                        alt={image.alt || image.title || category.name}
                        fill
                        className="object-cover"
                        unoptimized={isApiUploadUrl(image.imageUrl)}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
