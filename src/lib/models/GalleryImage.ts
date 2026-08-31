import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IGalleryImage extends Document {
  categoryId: mongoose.Types.ObjectId
  title?: string
  alt?: string
  imageUrl: string
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'GalleryCategory', required: true },
    title: { type: String, trim: true },
    alt: { type: String, trim: true },
    imageUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true }
)

GalleryImageSchema.index({ categoryId: 1, order: 1 })

const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema)

export default GalleryImage
