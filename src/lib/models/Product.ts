import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProduct extends Document {
  title: string
  slug: string
  description: string
  excerpt: string
  category: string
  imageUrl?: string
  imageAlt?: string
  images: string[]
  price?: number
  priceLabel?: string
  showPrice: boolean
  specifications?: Record<string, string>
  inStock: boolean
  sku?: string
  relatedServices: mongoose.Types.ObjectId[]
  relatedMarkets: mongoose.Types.ObjectId[]
  relatedProducts: mongoose.Types.ObjectId[]
  featured: boolean
  metaTitle?: string
  metaDescription?: string
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    excerpt: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    imageAlt: { type: String },
    images: [{ type: String }],
    price: { type: Number },
    priceLabel: { type: String, default: 'Contact for pricing' },
    showPrice: { type: Boolean, default: false },
    specifications: { type: Map, of: String },
    inStock: { type: Boolean, default: true },
    sku: { type: String },
    relatedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    relatedMarkets: [{ type: Schema.Types.ObjectId, ref: 'Market' }],
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    featured: { type: Boolean, default: false },
    metaTitle: { type: String },
    metaDescription: { type: String },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  {
    timestamps: true,
  }
)

ProductSchema.index({ slug: 1, status: 1 })
ProductSchema.index({ category: 1, status: 1 })
ProductSchema.index({ featured: 1, status: 1 })
ProductSchema.index({ order: 1 })

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export default Product
