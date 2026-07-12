/**
 * SectionWrapper.jsx
 * HOC wrapper cho mỗi section với animation reveal khi scroll vào viewport.
 * Sử dụng Framer Motion + IntersectionObserver.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../utils/helpers'

/**
 * @param {string} id - ID của section (dùng cho anchor link)
 * @param {string} className - Thêm class vào container
 * @param {string} innerClassName - Thêm class vào inner container
 * @param {'fade-up'|'fade-in'|'fade-left'|'fade-right'} animation - Loại animation
 * @param {number} delay - Delay animation (giây)
 */
export default function SectionWrapper({
  id,
  children,
  className = '',
  innerClassName = '',
  animation = 'fade-up',
  delay = 0,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'fade-left': {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    'fade-right': {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
  }

  return (
    <section
      id={id}
      className={cn('section-padding', className)}
      aria-label={id}
    >
      <motion.div
        ref={ref}
        className={cn('section-container', innerClassName)}
        variants={variants[animation]}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </section>
  )
}

/**
 * SectionHeader - Header chuẩn cho mỗi section
 */
export function SectionHeader({ badge, title, highlight, subtitle, center = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={cn('mb-14', center && 'text-center')}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Badge */}
      {badge && (
        <div className={cn('flex mb-4', center && 'justify-center')}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              background: 'rgba(37,99,235,0.1)',
              border: '1px solid rgba(37,99,235,0.25)',
              color: '#38bdf8',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {badge}
          </span>
        </div>
      )}

      {/* Title */}
      <h2 className="section-title text-white mb-3">
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={cn('section-subtitle', center && 'mx-auto')} style={{ color: 'var(--color-text-secondary)' }}>
          {subtitle}
        </p>
      )}

      {/* Decorative line */}
      <div className={cn('flex mt-5', center && 'justify-center')}>
        <div
          className="h-[2px] w-16 rounded-full"
          style={{ background: 'linear-gradient(90deg, #2563eb, #38bdf8)' }}
        />
      </div>
    </motion.div>
  )
}
