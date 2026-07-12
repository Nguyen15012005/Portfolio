/**
 * utils/helpers.js
 * Utility functions dùng chung trong toàn bộ ứng dụng.
 */

/**
 * Scroll mượt đến một section theo id
 * @param {string} sectionId - ID của section (không có #)
 * @param {number} offset - Offset từ top (default 80px cho navbar)
 */
export function scrollToSection(sectionId, offset = 80) {
  const el = document.getElementById(sectionId)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

/**
 * Clamp giá trị trong khoảng [min, max]
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Format số với suffix (ví dụ: 1000 → 1k)
 */
export function formatNumber(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return String(num)
}

/**
 * Tạo delay promise (dùng với async/await)
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Debounce function
 */
export function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Lấy skill level label từ số %
 */
export function getSkillLevel(level) {
  if (level >= 90) return { label: 'Expert', color: '#22c55e' }
  if (level >= 70) return { label: 'Advanced', color: '#2563eb' }
  if (level >= 40) return { label: 'Intermediate', color: '#38bdf8' }
  return { label: 'Beginner', color: '#94a3b8' }
}

/**
 * Tạo class string từ điều kiện (cn utility)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Kiểm tra email hợp lệ
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Copy text vào clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Lấy màu từ color key
 */
export function getColorFromKey(key) {
  const colors = {
    primary: '#2563eb',
    secondary: '#38bdf8',
    accent: '#22c55e',
    warning: '#f59e0b',
    purple: '#a855f7',
    pink: '#ec4899',
  }
  return colors[key] || colors.primary
}
