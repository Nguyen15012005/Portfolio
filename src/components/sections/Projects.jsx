/**
 * Projects.jsx
 * Grid projects với filter, card hover effects, và detail modal.
 * Modal hiển thị: ảnh, mô tả, kiến trúc, database, API, tech stack.
 */

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ChevronRight, Database, Server, Code2, Layers } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../../data/portfolioData'
import { PROJECT_FILTERS } from '../../constants'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { useTheme } from '../../hooks/useTheme'

// Project Card
function ProjectCard({ project, onClick, index }) {
  const { isDark } = useTheme()

  return (
    <motion.article
      className="glass-card overflow-hidden group cursor-pointer"
      style={{ borderColor: 'rgba(37,99,235,0.1)' }}
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, borderColor: 'rgba(37,99,235,0.35)' }}
      aria-label={`View ${project.title} details`}
    >
      {/* Image */}
      <div
        className="relative h-48 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a1628, #1e3a8a)',
        }}
      >
        {/* Placeholder gradient */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className="text-5xl font-black text-white opacity-20 mb-2"
              style={{ fontFamily: 'JetBrains Mono' }}
            >
              {project.title.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-xs text-blue-300 opacity-50 tracking-widest">
              {project.category.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3"
          style={{ background: 'rgba(3,7,18,0.7)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white text-sm font-semibold flex items-center gap-2">
            View Details <ChevronRight size={16} />
          </span>
        </motion.div>

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg"
          style={{
            background: 'rgba(37,99,235,0.9)',
            color: '#fff',
            backdropFilter: 'blur(8px)',
          }}
        >
          {project.category}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-lg"
            style={{ background: 'rgba(34,197,94,0.9)', color: '#fff' }}
          >
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-bold text-base mb-2 group-hover:text-blue-400 transition-colors"
          style={{ color: isDark ? '#f8fafc' : '#0f172a' }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
          {project.shortDesc}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map(tech => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
          {project.techStack.length > 4 && (
            <span className="tech-badge">+{project.techStack.length - 4}</span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            aria-label={`GitHub: ${project.title}`}
          >
            <FaGithub size={13} /> GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: '#38bdf8' }}
            aria-label={`Demo: ${project.title}`}
          >
            <ExternalLink size={13} /> Live Demo
          </a>
        </div>
      </div>
    </motion.article>
  )
}

// Project Modal
function ProjectModal({ project, onClose }) {
  const { isDark } = useTheme()
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0" style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(12px)' }} />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card"
          style={{ borderColor: 'rgba(37,99,235,0.25)' }}
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-start justify-between p-6 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-lg"
                  style={{ background: 'rgba(37,99,235,0.2)', color: '#38bdf8', border: '1px solid rgba(37,99,235,0.3)' }}
                >
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg" style={{ background: 'rgba(34,197,94,0.2)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' }}>
                    ⭐ Featured
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold" style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              aria-label="Close modal"
            >
              <X size={16} className="text-slate-400" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {project.description}
            </p>

            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#38bdf8' }}>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#38bdf8' }}>
                <Code2 size={13} /> Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <ChevronRight size={14} className="text-blue-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture */}
            <div
              className="p-4 rounded-xl"
              style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)' }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#38bdf8' }}>
                <Layers size={13} /> Architecture
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                {project.architecture.description}
              </p>
              <div
                className="text-xs font-mono p-3 rounded-lg text-green-400"
                style={{ background: 'rgba(0,0,0,0.4)' }}
              >
                {project.architecture.diagram}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.architecture.layers.map((layer, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg font-mono"
                    style={{ background: 'rgba(37,99,235,0.12)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.2)' }}
                  >
                    {i + 1}. {layer}
                  </span>
                ))}
              </div>
            </div>

            {/* Database */}
            {project.database.tables.length > 0 && (
              <div
                className="p-4 rounded-xl"
                style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#22c55e' }}>
                  <Database size={13} /> Database
                </h3>
                <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                  {project.database.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.database.tables.map(t => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-1 rounded-md"
                      style={{ background: 'rgba(34,197,94,0.1)', color: '#86efac', border: '1px solid rgba(34,197,94,0.2)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.database.highlights && (
                  <p className="text-xs" style={{ color: 'rgba(134,239,172,0.7)' }}>
                    💡 {project.database.highlights}
                  </p>
                )}
              </div>
            )}

            {/* API */}
            <div
              className="p-4 rounded-xl"
              style={{ background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)' }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#38bdf8' }}>
                <Server size={13} /> API Endpoints
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                {project.api.description}
              </p>
              <div className="space-y-1.5">
                {project.api.endpoints.map((ep, i) => {
                  const [method, ...rest] = ep.split(' ')
                  return (
                    <div key={i} className="flex items-start gap-2 text-xs font-mono">
                      <span
                        className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold mt-0.5"
                        style={{
                          background: method === 'GET' ? 'rgba(34,197,94,0.2)' : method === 'POST' ? 'rgba(37,99,235,0.2)' : method === 'PUT' || method === 'PATCH' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
                          color: method === 'GET' ? '#22c55e' : method === 'POST' ? '#38bdf8' : method === 'PUT' || method === 'PATCH' ? '#f59e0b' : '#ef4444',
                        }}
                      >
                        {method}
                      </span>
                      <span style={{ color: 'rgba(148,163,184,0.8)' }}>{rest.join(' ')}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn btn-outline justify-center gap-2 text-sm py-2.5"
              >
                <FaGithub size={15} /> View Source
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn btn-primary justify-center gap-2 text-sm py-2.5"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const handleClose = useCallback(() => setSelectedProject(null), [])

  return (
    <SectionWrapper id="projects" animation="fade-up">
      <SectionHeader
        badge="My Projects"
        title="Things I've"
        highlight="Built"
        subtitle="Từ REST APIs đến Full Stack applications — mỗi dự án là một câu chuyện về giải quyết vấn đề"
      />

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {PROJECT_FILTERS.map(filter => {
          const isActive = activeFilter === filter.id
          return (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: isActive ? 'rgba(37,99,235,0.15)' : 'rgba(255,255,255,0.03)',
                border: isActive ? '1px solid rgba(37,99,235,0.45)' : '1px solid rgba(255,255,255,0.08)',
                color: isActive ? '#38bdf8' : 'var(--color-text-secondary)',
                boxShadow: isActive ? '0 0 16px rgba(37,99,235,0.15)' : 'none',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {filter.label}
              <span className="ml-1.5 text-[11px] opacity-60">
                ({filter.id === 'all' ? projects.length : projects.filter(p => p.category === filter.id).length})
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
              index={i}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleClose} />
      )}
    </SectionWrapper>
  )
}
