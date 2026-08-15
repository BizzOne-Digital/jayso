import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ITestimonial extends Document {
  name: string
  company?: string
  role?: string
  quote: string
  imageUrl?: string
  rating?: number
  featured: boolean
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    role: { type: String, trim: true },
    quote: { type: String, required: true },
    imageUrl: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  {
    timestamps: true,
  }
)

TestimonialSchema.index({ status: 1, order: 1 })
TestimonialSchema.index({ featured: 1 })

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)

export default Testimonial
