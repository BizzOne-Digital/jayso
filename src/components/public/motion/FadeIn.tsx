'use client'

import { Children, ReactNode, isValidElement } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

const ease = [0.22, 1, 0.36, 1] as const

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  immediate?: boolean
}

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
  immediate = false,
}: FadeInProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  const motionProps = immediate
    ? {
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay, ease },
      }
    : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-70px' },
        transition: { duration: 0.55, delay, ease },
      }

  return (
    <motion.div className={cn(className)} {...motionProps}>
      {children}
    </motion.div>
  )
}

interface FadeInStaggerProps {
  children: ReactNode
  className?: string
  stagger?: number
  immediate?: boolean
}

export function FadeInStagger({
  children,
  className,
  stagger = 0.08,
  immediate = false,
}: FadeInStaggerProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  const motionProps = immediate
    ? {
        initial: 'hidden',
        animate: 'visible',
        transition: { staggerChildren: stagger },
      }
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-60px' },
        transition: { staggerChildren: stagger },
      }

  return (
    <motion.div className={cn(className)} {...motionProps}>
      {children}
    </motion.div>
  )
}

export function FadeInItem({
  children,
  className,
  y = 22,
}: {
  children: ReactNode
  className?: string
  y?: number
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <FadeIn delay={delay} className={className}>
      {children}
    </FadeIn>
  )
}

export function AnimatedGrid({
  children,
  className,
  stagger = 0.07,
  immediate = false,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  immediate?: boolean
}) {
  return (
    <FadeInStagger className={className} stagger={stagger} immediate={immediate}>
      {Children.toArray(children).map((child, index) =>
        isValidElement(child) ? (
          <FadeInItem key={child.key ?? index}>{child}</FadeInItem>
        ) : null
      )}
    </FadeInStagger>
  )
}
