/**
 * ScrollProgress.jsx
 * Thanh progress đọc trang ở top của viewport.
 * Gradient xanh dương → cyan.
 */

import { useScrollProgress } from '../../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9997] h-[2px] origin-left"
      style={{
        background: 'linear-gradient(90deg, #2563eb, #38bdf8, #22c55e)',
        scaleX: progress,
        transformOrigin: '0%',
        boxShadow: '0 0 8px rgba(37,99,235,0.6)',
      }}
    />
  )
}
