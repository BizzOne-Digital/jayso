'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

export default function CinematicIntro() {
  const [show, setShow] = useState(true)
  const [skipRequested, setSkipRequested] = useState(false)
  const hasShownRef = useRef(false)

  useEffect(() => {
    // Check if intro has been shown this session
    const hasShown = sessionStorage.getItem('intro-shown')
    
    if (hasShown) {
      setShow(false)
      return
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setShow(false)
      sessionStorage.setItem('intro-shown', 'true')
      return
    }

    // Auto-hide after 3.5 seconds
    const timer = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('intro-shown', 'true')
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  const handleSkip = () => {
    setSkipRequested(true)
    setShow(false)
    sessionStorage.setItem('intro-shown', 'true')
  }

  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-deep-navy flex items-center justify-center overflow-hidden"
        role="presentation"
        aria-live="polite"
        aria-label="Loading animation"
      >
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Animated Logo Container */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          {/* Logo Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative mb-8 w-64 h-32"
          >
            <img
              src="/logo.png"
              alt="Profile Environmental Support Services"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Kinetic Phrases */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="absolute bottom-32 text-center space-y-2"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 1.5, times: [0, 0.5, 1] }}
              className="text-clean-aqua text-sm font-medium tracking-wider"
            >
              HEALTHIER SPACES
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 2, times: [0, 0.5, 1] }}
              className="text-clean-aqua text-sm font-medium tracking-wider"
            >
              SMARTER SYSTEMS
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 2.5, times: [0, 0.5, 1] }}
              className="text-clean-aqua text-sm font-medium tracking-wider"
            >
              VISIBLE RESULTS
            </motion.p>
          </motion.div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 px-6 py-2 text-sm text-clean-aqua border border-clean-aqua/30 rounded-full hover:bg-clean-aqua/10 transition-colors focus:outline-none focus:ring-2 focus:ring-profile-blue"
          aria-label="Skip intro animation"
        >
          Skip intro
        </button>

        {/* Blue Wave Scan Effect */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 2, delay: 1, ease: 'easeInOut' }}
          className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-profile-blue/20 to-transparent"
          style={{ width: '50%' }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
