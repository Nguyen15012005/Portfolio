import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Award, ExternalLink, CheckCircle } from 'lucide-react'
import { education } from '../../data/portfolioData'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { getColorFromKey } from '../../utils/helpers'
import { useTheme } from '../../hooks/useTheme'

const TYPE_ICONS = { university: GraduationCap, certificate: Award, course: Award }

function EducationCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const color = getColorFromKey(item.color)
  const Icon = TYPE_ICONS[item.type] || Award
  const { isDark } = useTheme()
  const isCompleted = item.status === 'Completed' || item.status === 'Self-study'

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-5 pb-10 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center z-10 relative"
          style={{
            background: `${color}15`,
            border: `2px solid ${color}40`,
            boxShadow: `0 0 16px ${color}20`,
          }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        {index < education.length - 1 && (
          <div
            className="w-px flex-1 mt-3"
            style={{ background: `linear-gradient(to bottom, ${color}30, transparent)` }}
          />
        )}
      </div>

      <div className="flex-1">
        <div className="glass-card p-5" style={{ borderColor: `${color}20` }}>
          <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                >
                  {item.type}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isCompleted
                      ? 'text-green-400 bg-green-400/10 border border-green-400/20'
                      : 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                  }`}
                >
                  {isCompleted && <CheckCircle size={10} className="inline mr-1" />}
                  {item.status}
                </span>
              </div>
              <h3 className="font-bold text-sm" style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>
                {item.title}
              </h3>
            </div>
            <span className="text-xs font-mono shrink-0" style={{ color: 'var(--color-text-muted)' }}>
              {item.period}
            </span>
          </div>

          <a
            href={item.institutionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold mb-3 transition-colors"
            style={{ color: '#38bdf8' }}
          >
            {item.institution} <ExternalLink size={10} />
          </a>

          {item.gpa && (
            <div
              className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg mb-3 ml-3"
              style={{ background: 'rgba(37,99,235,0.12)', color: '#38bdf8', border: '1px solid rgba(37,99,235,0.2)' }}
            >
              GPA: {item.gpa}
            </div>
          )}

          <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            {item.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {item.highlights.map((highlight) => (
              <span
                key={highlight}
                className="text-xs px-2 py-1 rounded-lg"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                ✓ {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Education() {
  return (
    <SectionWrapper
      id="education"
      className="bg-[rgba(10,15,30,0.2)] dark:bg-[rgba(10,15,30,0.3)]"
      animation="fade-up"
    >
      <SectionHeader
        badge="Education"
        title="Learning"
        highlight="Path"
        subtitle="Nền tảng học thuật và các khóa học giúp tôi xây dựng kỹ năng phát triển phần mềm."
      />

      <div className="max-w-2xl mx-auto">
        {education.map((item, i) => (
          <EducationCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
