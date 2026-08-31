'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface Testimonial {
  _id: string
  name: string
  company?: string
  role?: string
  quote: string
  rating?: number
}

export default function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (testimonials.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  if (!testimonials.length) {
    return (
      <p className="text-center text-graphite/60 py-12">
        Testimonials coming soon.
      </p>
    )
  }

  const current = testimonials[index]

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center">
        <Quote className="w-10 h-10 text-profile-blue/30 mx-auto mb-6" />
        <p className="text-lg sm:text-xl text-graphite/80 leading-relaxed mb-8">
          &ldquo;{current.quote}&rdquo;
        </p>
        <div>
          <p className="font-display font-bold text-graphite">{current.name}</p>
          {(current.role || current.company) && (
            <p className="text-sm text-graphite/60 mt-1">
              {[current.role, current.company].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
      </div>

      {testimonials.length > 1 && (
        <>
          <button
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:border-profile-blue"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:border-profile-blue"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-colors',
                  i === index ? 'bg-profile-blue' : 'bg-gray-300'
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
