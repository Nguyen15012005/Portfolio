/**
 * Experience.jsx
 * Timeline kinh nghiệm làm việc: Internship, Freelance, University Projects.
 * Vertical timeline với animated reveal khi scroll.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Code2, GraduationCap, MapPin, Calendar, ExternalLink } from 'lucide-react'
import { experiences } from '../../data/portfolioData'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { getColorFromKey } from '../../utils/helpers'
import { useTheme } from '../../hooks/useTheme'

const TYPE_ICONS = { Internship: Briefcase, Freelance: Code2, 'Personal Project': Code2, 'University Project': GraduationCap }
const TYPE_COLORS = { Internship: '#2563eb', Freelance: '#38bdf8', 'Personal Project': '#38bdf8', 'University Project': '#22c55e' }

function ExperienceCard({ exp, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const color = getColorFromKey(exp.color)
  const TypeIcon = TYPE_ICONS[exp.type] || Briefcase
  const typeColor = TYPE_COLORS[exp.type] || color
  const { isDark } = useTheme()
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative flex gap-0 md:gap-8 items-start mb-12 last:mb-0">
      {/* Timeline node - center on desktop */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center z-10">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: `${color}15`,
            border: `2px solid ${color}50`,
            boxShadow: `0 0 20px ${color}25`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
        >
          <TypeIcon size={20} style={{ color }} />
        </motion.div>
        {/* Connector line */}
        {index < experiences.length - 1 && (
          <div className="w-px h-32 mt-2" style={{ background: `linear-gradient(to bottom, ${color}40, transparent)` }} />
        )}
      </div>

      {/* Mobile: left-side icon */}
      <div className="flex md:hidden flex-col items-center mr-4 shrink-0">
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: `${color}15`, border: `2px solid ${color}40` }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1, type: 'spring' }}
        >
          <TypeIcon size={16} style={{ color }} />
        </motion.div>
        {index < experiences.length - 1 && (
          <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(to bottom, ${color}30, transparent)`, minHeight: 40 }} />
        )}
      </div>

      {/* Desktop: half-width layout */}
      <div className={`hidden md:block w-[calc(50%-32px)] ${isLeft ? 'mr-auto pr-8' : 'ml-auto pl-8 md:col-start-2'}`}>
        <motion.div
          className="glass-card p-6"
          style={{ borderColor: `${color}20` }}
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <ExperienceContent exp={exp} typeColor={typeColor} isDark={isDark} />
        </motion.div>
      </div>

      {/* Mobile: full-width */}
      <motion.div
        className="flex-1 glass-card p-5 md:hidden"
        style={{ borderColor: `${color}20` }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <ExperienceContent exp={exp} typeColor={typeColor} isDark={isDark} />
      </motion.div>
    </div>
  )
}

function ExperienceContent({ exp, typeColor, isDark }) {
  return (
    <>
      {/* Type badge */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <span
          className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
          style={{ background: `${typeColor}15`, color: typeColor, border: `1px solid ${typeColor}30` }}
        >
          {exp.type}
        </span>
        <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
          {exp.duration}
        </span>
      </div>

      {/* Title & Company */}
      <h3 className="font-bold text-base mb-1" style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>
        {exp.title}
      </h3>
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        {exp.companyUrl ? (
          <a
            href={exp.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold flex items-center gap-1 transition-colors"
            style={{ color: '#38bdf8' }}
          >
            {exp.company} <ExternalLink size={11} />
          </a>
        ) : (
          <span className="text-sm font-semibold" style={{ color: '#38bdf8' }}>{exp.company}</span>
        )}
        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <MapPin size={11} /> {exp.location}
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <Calendar size={11} /> {exp.period}
        </span>
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        {exp.description}
      </p>

      {/* Responsibilities */}
      <ul className="space-y-1.5 mb-4">
        {exp.responsibilities.map((r, i) => (
          <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: typeColor }} />
            {r}
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5">
        {exp.techStack.map(tech => (
          <span key={tech} className="tech-badge">{tech}</span>
        ))}
      </div>
    </>
  )
}

export default function Experience() {
  return (
    <SectionWrapper id="experience" animation="fade-up">
      <SectionHeader
        badge="Experience"
        title="My Work"
        highlight="Journey"
        subtitle="Từ internship đến freelance — những kinh nghiệm thực chiến đã hình thành nên developer tôi hôm nay"
      />

      <div className="relative">
        {/* Desktop center line */}
        <div
          className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(37,99,235,0.25), transparent)' }}
        />

        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
