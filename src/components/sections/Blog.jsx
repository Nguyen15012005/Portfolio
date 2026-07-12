/**
 * Blog.jsx
 * Hiển thị các bài viết blog nổi bật trong dạng grid cards.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogPosts } from '../../data/portfolioData'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { useTheme } from '../../hooks/useTheme'

function BlogCard({ post, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const { isDark } = useTheme()

  return (
    <motion.article
      ref={ref}
      className="glass-card flex flex-col overflow-hidden group cursor-pointer"
      style={{ borderColor: 'rgba(37,99,235,0.1)' }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, borderColor: 'rgba(37,99,235,0.35)' }}
    >
      {/* Image container */}
      <div className="relative h-48 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
        {/* Placeholder if no image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
          <span className="text-4xl mb-2 font-black" style={{ fontFamily: 'JetBrains Mono', color: '#38bdf8' }}>{post.category}</span>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />

        {/* Category tag */}
        <div
          className="absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider z-10"
          style={{ background: 'rgba(37,99,235,0.9)', color: '#fff', backdropFilter: 'blur(4px)' }}
        >
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Meta */}
        <div className="flex items-center gap-4 text-[11px] mb-3" style={{ color: 'var(--color-text-muted)' }}>
          <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-lg mb-3 group-hover:text-blue-400 transition-colors line-clamp-2"
          style={{ color: isDark ? '#f8fafc' : '#0f172a' }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed mb-6 flex-1 line-clamp-3" style={{ color: 'var(--color-text-secondary)' }}>
          {post.excerpt}
        </p>

        {/* Tags & Action */}
        <div className="flex items-end justify-between pt-4 border-t mt-auto" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-1 rounded"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--color-text-secondary)' }}
              >
                #{tag}
              </span>
            ))}
          </div>
          <span
            className="text-xs font-semibold flex items-center gap-1 transition-colors group-hover:text-blue-400"
            style={{ color: '#38bdf8' }}
          >
            Read <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3)

  if (featuredPosts.length === 0) return null

  return (
    <SectionWrapper
      id="blog"
      className="bg-[rgba(10,15,30,0.2)] dark:bg-[rgba(10,15,30,0.3)]"
      animation="fade-up"
    >
      <SectionHeader
        badge="Insights"
        title="Latest"
        highlight="Articles"
        subtitle="Chia sẻ kiến thức, kinh nghiệm và những bài học từ thực tế quá trình làm việc"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredPosts.map((post, i) => (
          <BlogCard key={post.id} post={post} index={i} />
        ))}
      </div>

      {/* View all btn */}
      <div className="mt-12 text-center">
        <motion.button
          className="btn btn-outline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Articles <ArrowRight size={16} />
        </motion.button>
      </div>
    </SectionWrapper>
  )
}
