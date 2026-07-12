import { motion } from 'framer-motion'
import {
  FaGithub, FaLinkedin, FaFacebook, FaEnvelope,
} from 'react-icons/fa'
import { Download, ChevronDown, ArrowRight } from 'lucide-react'
import { personalInfo } from '../../data/portfolioData'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import { scrollToSection } from '../../utils/helpers'
import { useTheme } from '../../hooks/useTheme'

const SOCIAL = [
  { icon: FaGithub, href: personalInfo.social.github, label: 'GitHub', color: '#fff' },
  { icon: FaLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn', color: '#0a66c2' },
  { icon: FaFacebook, href: personalInfo.social.facebook, label: 'Facebook', color: '#1877f2' },
  { icon: FaEnvelope, href: personalInfo.social.email, label: 'Email', color: '#22c55e' },
]

export default function Hero() {
  const { displayText, isTyping } = useTypingEffect(personalInfo.typingTexts, {
    typeSpeed: 75,
    deleteSpeed: 38,
    pauseDuration: 1800,
  })
  const { isDark } = useTheme()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />

      <div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.12), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[calc(100vh-80px)] py-24">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                Available for work
              </span>
            </motion.div>

            <motion.h1
              className="text-display mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>
                Nguyễn Nam
              </span>
              <br />
              <span className="gradient-text">Trung Nguyên</span>
            </motion.h1>

            <motion.p
              className="text-lg font-medium mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Full Stack Developer · React + Spring Boot
            </motion.p>

            <motion.div
              className="flex items-center gap-3 mb-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
                I&apos;m a
              </span>
              <div className="flex items-center gap-1">
                <span
                  className="text-lg font-bold"
                  style={{ color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', minWidth: 220 }}
                >
                  {displayText}
                </span>
                <motion.span
                  className="inline-block w-[2px] h-6 bg-blue-400 rounded-full"
                  animate={{ opacity: isTyping ? [1, 1, 0] : [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <motion.p
              className="text-hero max-w-lg mb-8 mx-auto lg:mx-0"
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {personalInfo.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {personalInfo.resumeUrl && (
                <motion.a
                  href={personalInfo.resumeUrl}
                  download
                  className="btn btn-outline group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={16} />
                  Download CV
                </motion.a>
              )}
            </motion.div>

            <motion.div
              className="flex gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {SOCIAL.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  whileHover={{
                    scale: 1.12,
                    y: -3,
                    background: `${color}15`,
                    borderColor: `${color}40`,
                    boxShadow: `0 8px 20px ${color}20`,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} style={{ color }} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{
                transform: 'scale(1.15)',
                background: 'radial-gradient(circle, rgba(37,99,235,0.25), transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            <div
              className="absolute inset-0 rounded-full animate-rotate-slow"
              style={{
                border: '2px dashed rgba(37,99,235,0.3)',
                transform: 'scale(1.08)',
              }}
            />

            <div
              className="relative w-60 h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden"
              style={{
                border: '3px solid rgba(37,99,235,0.4)',
                boxShadow: '0 0 60px rgba(37,99,235,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
              }}
            >
              <img
                src={personalInfo.avatar}
                alt={`${personalInfo.nameShort} avatar`}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 38%' }}
              />
              <div className="absolute inset-0 animate-shimmer" />
            </div>

            <motion.div
              className="absolute -bottom-4 -left-6 px-3 py-2 rounded-xl text-xs font-mono font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #166534, #22c55e)',
                boxShadow: '0 4px 20px rgba(34,197,94,0.35)',
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Spring Boot
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-6 px-3 py-2 rounded-xl text-xs font-mono font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
              }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              React
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-12 px-3 py-2 rounded-xl text-xs font-mono font-semibold"
              style={{
                background: 'rgba(10,15,30,0.9)',
                border: '1px solid rgba(56,189,248,0.3)',
                color: '#38bdf8',
              }}
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              PostgreSQL
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to about section"
      >
        <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-blue-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
