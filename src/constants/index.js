/**
 * constants/index.js
 * Các hằng số dùng chung trong toàn bộ ứng dụng.
 */

// Animation variants dùng chung với Framer Motion
export const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const FADE_LEFT = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const FADE_RIGHT = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const SCALE_UP = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
}

export const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// Breakpoints (px)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// Skill level labels
export const SKILL_LEVELS = {
  beginner: { min: 0, max: 39, label: 'Beginner', color: '#94a3b8' },
  intermediate: { min: 40, max: 69, label: 'Intermediate', color: '#38bdf8' },
  advanced: { min: 70, max: 89, label: 'Advanced', color: '#2563eb' },
  expert: { min: 90, max: 100, label: 'Expert', color: '#22c55e' },
}

// Project filter categories
export const PROJECT_FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
]

// Color map
export const COLOR_MAP = {
  primary: '#2563eb',
  secondary: '#38bdf8',
  accent: '#22c55e',
  warning: '#f59e0b',
  purple: '#a855f7',
  pink: '#ec4899',
}

// EmailJS config (thay bằng credentials thật)
export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
}

// Section IDs
export const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'education',
  'achievements',
  'services',
  'testimonials',
  'blog',
  'contact',
]
