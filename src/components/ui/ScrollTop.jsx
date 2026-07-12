/**
 * ScrollTop.jsx
 * Nút scroll về đầu trang với SVG circle progress indicator.
 * Chỉ hiện khi scroll > 300px.
 */

import { useScrollProgress, useScrollY } from '../../hooks/useScrollAnimation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollTop() {
  const scrollY = useScrollY()
  const progress = useScrollProgress()
  const isVisible = scrollY > 300

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // SVG circle progress params
  const size = 48
  const strokeWidth = 2
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - progress * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
          style={{ width: size, height: size }}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* SVG Circle Progress */}
          <svg
            width={size}
            height={size}
            className="absolute top-0 left-0 -rotate-90"
          >
            {/* Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={strokeWidth}
            />
            {/* Progress */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#scrollGrad)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
            <defs>
              <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Button center */}
          <div
            className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(10,15,30,0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(37,99,235,0.3)',
            }}
          >
            <ArrowUp size={16} className="text-blue-400" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
