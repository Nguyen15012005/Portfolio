/**
 * CanvasBackground.jsx
 * Background tương tác với particle network trên Canvas HTML5.
 * Các hạt kết nối với nhau khi ở gần, và phản ứng với chuột.
 * Hiệu năng cao với requestAnimationFrame + canvas offscreen.
 */

import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectIsDark } from '../../store/slices/themeSlice'

const PARTICLE_COUNT = 70
const MAX_DISTANCE = 140
const MOUSE_RADIUS = 120

export default function CanvasBackground() {
  const canvasRef = useRef(null)
  const isDark = useSelector(selectIsDark)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animId
    let width = window.innerWidth
    let height = window.innerHeight
    const mouse = { x: -9999, y: -9999 }

    // Resize handler
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resize()

    // Particle class
    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.radius = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.4 + 0.1
        this.color = Math.random() > 0.6 ? '#38bdf8' : '#2563eb'
      }

      update() {
        // Mouse repulsion
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          this.x += (dx / dist) * force * 1.5
          this.y += (dy / dist) * force * 1.5
        }

        this.x += this.vx
        this.y += this.vy

        // Wrap around edges
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    // Create particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())

    // Draw connections
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MAX_DISTANCE) {
            const alpha = (1 - dist / MAX_DISTANCE) * 0.2
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach(p => {
        p.update()
        p.draw()
      })

      drawConnections()
      animId = requestAnimationFrame(animate)
    }

    // Mouse handler
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: isDark ? 0.6 : 0.25 }}
      aria-hidden="true"
    />
  )
}
