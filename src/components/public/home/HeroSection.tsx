'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Shield,
  Leaf,
  Droplets,
  Wind,
  Calculator,
  Star,
  Building2,
  Cross,
} from 'lucide-react'

export default function HeroSection() {
  const services = [
    { icon: Shield, label: 'Infection\nPrevention Control', href: '/services/infection-prevention-control' },
    { icon: Leaf, label: 'Sustainability', href: '/services/sustainability' },
    { icon: Droplets, label: 'Steam Cleaning', href: '/services/steam-cleaning' },
    { icon: Wind, label: 'Green Cleaning', href: '/services/green-cleaning' },
  ]

  return (
    <section className="relative min-h-[calc(100vh-7.5rem)] overflow-hidden bg-[#0a1520] w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full">
        <Image
          src="/hero-bg.png"
          alt="Professional cleaning service"
          fill
          className="object-cover object-[62%_center]"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1520]/95 via-[#0a1520]/70 to-[#0a1520]/35" />
      </div>

      {/* Blue Swirl Effect */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-40 w-full">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 40% 50%, rgba(73, 199, 245, 0.28) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-start min-h-[calc(100vh-7.5rem)] pt-6 sm:pt-8 lg:pt-4 pb-32 sm:pb-36">
          {/* Left Content */}
          <div className="max-w-[560px] w-full">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-electric-cyan text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase mb-4 sm:mb-5"
            >
              ENVIRONMENTAL SUPPORT, REIMAGINED
            </motion.p>

            {/* Main Heading — 3 clean lines */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-white font-black leading-[1.1] mb-4 sm:mb-5"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 3.25rem)',
                letterSpacing: '-0.02em',
              }}
            >
              <span className="block">CLEANER SPACES.</span>
              <span className="block">SMARTER SYSTEMS.</span>
              <span className="block">BETTER OUTCOMES.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-white/90 text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed mb-6 sm:mb-8 max-w-[480px]"
            >
              Commercial cleaning, infection prevention and sustainable facility solutions—designed
              around the way your organization works.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4 sm:mb-5"
            >
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-electric-cyan text-[#0a1520] font-bold text-[11px] sm:text-[12px] rounded-md hover:bg-[#5DD5FF] transition-all shadow-lg shadow-electric-cyan/25 whitespace-nowrap"
              >
                START A CONVERSATION
                <ArrowRight className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-electric-cyan/70 text-white font-bold text-[11px] sm:text-[12px] rounded-md hover:bg-electric-cyan/10 transition-all whitespace-nowrap"
              >
                EXPLORE OUR SERVICES
                <ArrowRight className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </motion.div>

            {/* Calculator Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <Link
                href="/calculator"
                className="inline-flex items-center text-electric-cyan hover:text-white transition-colors text-[12px] sm:text-[13px] font-medium"
              >
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                Calculate Your Cleaning Needs
              </Link>
            </motion.div>
          </div>

          {/* Right Side Cards */}
          <div className="hidden xl:flex flex-col gap-4 translate-y-4">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-[#1a2332]/65 backdrop-blur-xl border border-electric-cyan/30 rounded-2xl px-5 py-4 w-[290px] shadow-xl"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 bg-electric-cyan/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Cross className="w-5 h-5 text-electric-cyan" strokeWidth={2.5} />
                </div>
                <h3 className="text-white font-bold text-[13px] uppercase tracking-wide leading-tight">
                  PATIENT CARE
                  <br />
                  OUR PRIORITY
                </h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-[#1a2332]/65 backdrop-blur-xl border border-electric-cyan/30 rounded-2xl px-5 py-4 w-[290px] shadow-xl"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 bg-electric-cyan/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-electric-cyan" fill="currentColor" strokeWidth={0} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[13px] uppercase tracking-wide">
                    ONE-MONTH TRIAL
                  </h3>
                  <p className="text-white/65 text-[12px] mt-0.5">Experience the difference</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-[#1a2332]/65 backdrop-blur-xl border border-electric-cyan/30 rounded-2xl px-5 py-4 w-[290px] shadow-xl"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 bg-electric-cyan/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-electric-cyan" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[13px] uppercase tracking-wide">
                    BUILT FOR YOUR FACILITY
                  </h3>
                  <p className="text-white/65 text-[12px] mt-0.5">
                    Healthcare • Corporate • Education
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Service Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 w-full px-4"
      >
        <div className="container-custom">
          <div className="bg-[#0f1922]/90 backdrop-blur-xl border border-electric-cyan/20 rounded-2xl px-4 sm:px-5 py-4 sm:py-5 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="group flex items-center gap-2 sm:gap-3 text-white hover:text-electric-cyan transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-electric-cyan/20 transition-colors flex-shrink-0">
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] sm:text-[13px] font-bold leading-tight whitespace-pre-line">
                      {service.label}
                    </p>
                  </div>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 hidden sm:block" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
