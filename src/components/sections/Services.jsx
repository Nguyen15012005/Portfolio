/**
 * Services.jsx
 * Hiển thị các dịch vụ cung cấp: Backend, REST API, Database Design, etc.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Server, Database, Monitor, Layers, Container, Plug, CheckCircle2 } from 'lucide-react'
import { services } from '../../data/portfolioData'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { useTheme } from '../../hooks/useTheme'

const ICON_MAP = {
  Server, Database, Monitor, Layers, Container, Plug
}

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = ICON_MAP[service.icon] || Server
  const { isDark } = useTheme()

  return (
    <motion.div
      ref={ref}
      className="glass-card p-8 group relative overflow-hidden transition-all duration-500"
      style={{ borderColor: 'rgba(37,99,235,0.1)' }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, borderColor: `${service.color}40`, boxShadow: `0 20px 40px ${service.color}15` }}
    >
      {/* Background gradient hint */}
      <div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${service.color}30, transparent 70%)`, filter: 'blur(30px)' }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
        style={{
          background: `${service.color}15`,
          border: `1px solid ${service.color}30`,
          boxShadow: `0 8px 20px ${service.color}20`
        }}
      >
        <Icon size={28} style={{ color: service.color }} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3" style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>
        {service.title}
      </h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)', minHeight: '60px' }}>
        {service.description}
      </p>

      {/* Features list */}
      <ul className="space-y-2">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
            <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: service.color }} />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Services() {
  const { isDark } = useTheme()

  return (
    <SectionWrapper
      id="services"
      className={isDark ? 'bg-[rgba(3,7,18,0.4)]' : 'bg-[rgba(241,245,249,0.3)]'}
      animation="fade-up"
    >
      <SectionHeader
        badge="Services"
        title="What I"
        highlight="Offer"
        subtitle="Giải pháp toàn diện từ thiết kế database đến triển khai hệ thống production"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
