import { connectDB } from '@/lib/db/mongoose'
import GalleryCategory from '@/lib/models/GalleryCategory'
import GalleryImage from '@/lib/models/GalleryImage'

export async function getPublishedGallery() {
  try {
    await connectDB()
    const categories = await GalleryCategory.find({ status: 'published' })
      .sort({ order: 1 })
      .lean()
    const images = await GalleryImage.find({ status: 'published' })
      .sort({ order: 1 })
      .lean()

    return categories.map((cat) => ({
      ...JSON.parse(JSON.stringify(cat)),
      images: images.filter((img) => String(img.categoryId) === String(cat._id)),
    }))
  } catch (error) {
    console.error('Error loading gallery:', error)
    return []
  }
}
