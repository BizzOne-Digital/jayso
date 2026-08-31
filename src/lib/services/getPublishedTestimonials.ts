import { connectDB } from '@/lib/db/mongoose'
import Testimonial from '@/lib/models/Testimonial'

export async function getPublishedTestimonials() {
  try {
    await connectDB()
    const testimonials = await Testimonial.find({ status: 'published' })
      .sort({ order: 1 })
      .lean()
    if (testimonials.length) {
      return JSON.parse(JSON.stringify(testimonials))
    }
  } catch (error) {
    console.error('Error loading testimonials:', error)
  }
  return []
}
