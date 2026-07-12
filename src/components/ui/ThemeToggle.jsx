/**
 * ThemeToggle.jsx
 * Nút chuyển đổi Dark/Light mode.
 * Sử dụng Redux thông qua useTheme hook.
 */

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${className}`}
      style={{
        background: isDark ? 'rgba(37,99,235,0.12)' : 'rgba(0,0,0,0.06)',
        border: isDark ? '1px solid rgba(37,99,235,0.25)' : '1px solid rgba(0,0,0,0.12)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light Mode' : 'Dark Mode'}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {isDark ? (
          <Sun size={17} className="text-yellow-400" />
        ) : (
          <Moon size={17} className="text-blue-600" />
        )}
      </motion.div>
    </motion.button>
  )
}
