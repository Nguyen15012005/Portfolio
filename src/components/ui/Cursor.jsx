/**
 * Cursor.jsx
 * Custom cursor với dot + ring.
 * Ring có hiệu ứng lag theo dot, scale khi hover link/button.
 * Ẩn trên thiết bị touch (pointer: coarse).
 */

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const posRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Ẩn trên thiết bị touch
    if (window.matchMedia('(pointer: coarse)').matches) return

    const lerp = (a, b, t) => a + (b - a) * t

    const moveDot = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    // Animation loop cho ring (lag effect)
    const animate = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.12)
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.12)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor="pointer"], input, textarea, select, [role="button"]')
      setIsHovering(!!target)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', moveDot)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', moveDot)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible])

  // Ẩn trên touch device
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Dot - nhanh, theo chuột chính xác */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: isHovering ? 8 : 6,
          height: isHovering ? 8 : 6,
          marginLeft: isHovering ? -4 : -3,
          marginTop: isHovering ? -4 : -3,
          borderRadius: '50%',
          background: isHovering ? '#38bdf8' : '#2563eb',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, background 0.2s, opacity 0.3s',
          willChange: 'transform',
        }}
      />

      {/* Ring - chậm hơn, lag effect */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: isClicking ? 28 : isHovering ? 44 : 36,
          height: isClicking ? 28 : isHovering ? 44 : 36,
          marginLeft: isClicking ? -14 : isHovering ? -22 : -18,
          marginTop: isClicking ? -14 : isHovering ? -22 : -18,
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? 'rgba(56,189,248,0.6)' : 'rgba(37,99,235,0.5)'}`,
          background: isHovering ? 'rgba(56,189,248,0.06)' : 'transparent',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1), margin 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s, background 0.2s, opacity 0.3s',
          willChange: 'transform',
          backdropFilter: isHovering ? 'blur(4px)' : 'none',
        }}
      />
    </>
  )
}
