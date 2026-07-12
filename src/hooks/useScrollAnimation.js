/**
 * useScrollAnimation.js
 * Hook theo dõi scroll position và expose các giá trị hữu ích
 * cho animation dựa trên scroll (parallax, reveal, etc.)
 */

import { useState, useEffect, useRef } from 'react'

/**
 * useScrollY - Theo dõi vị trí scroll hiện tại
 */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return scrollY
}

/**
 * useScrollProgress - % trang đã đọc (0 → 1)
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return progress
}

/**
 * useInView - Detect khi element vào viewport
 * @param {object} options - IntersectionObserver options
 * @param {boolean} options.once - Chỉ trigger một lần
 */
export function useInView(options = {}) {
  const { once = true, threshold = 0.15, rootMargin = '0px' } = options
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return [ref, inView]
}

/**
 * useParallax - Tạo offset parallax dựa trên scroll
 * @param {number} speed - Hệ số parallax (0.1 = nhẹ, 0.5 = mạnh)
 */
export function useParallax(speed = 0.2) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handler = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      setOffset((centerY - viewportCenter) * speed)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [speed])

  return [ref, offset]
}

/**
 * useActiveSection - Detect section nào đang active khi scroll
 * @param {string[]} sectionIds - Danh sách id của các section
 */
export function useActiveSection(sectionIds = []) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handler = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i])
          return
        }
      }
      setActiveSection(sectionIds[0] || '')
    }

    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [sectionIds])

  return activeSection
}
