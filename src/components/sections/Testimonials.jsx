/**
 * Testimonials.jsx
 * Slider hiển thị đánh giá từ khách hàng/đồng nghiệp sử dụng Swiper.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectCards } from 'swiper/modules'
import { Quote, Star } from 'lucide-react'
import { testimonials } from '../../data/portfolioData'
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper'
import { useTheme } from '../../hooks/useTheme'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'

function TestimonialCard({ testimonial }) {
  const { isDark } = useTheme()

  return (
    <div
      className="glass-card p-8 h-full flex flex-col relative overflow-hidden"
      style={{ borderColor: 'rgba(37,99,235,0.15)' }}
    >
      {/* Background Quote Icon */}
      <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
        <Quote size={80} style={{ color: '#2563eb' }} />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-6 relative z-10">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed mb-8 flex-1 italic relative z-10" style={{ color: 'var(--color-text-secondary)' }}>
        "{testimonial.content}"
      </p>

      {/* Author info */}
      <div className="flex items-center gap-4 relative z-10 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center font-bold text-white text-lg"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
            boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
          }}
        >
          {testimonial.avatar ? (
            <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
          ) : (
            testimonial.name.charAt(0)
          )}
        </div>
        <div>
          <h4 className="font-bold text-sm" style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>
            {testimonial.name}
          </h4>
          <p className="text-xs" style={{ color: '#38bdf8' }}>
            {testimonial.role} @ {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  if (testimonials.length === 0) return null

  return (
    <SectionWrapper id="testimonials" animation="fade-up">
      <SectionHeader
        badge="Testimonials"
        title="What People"
        highlight="Say"
        subtitle="Những phản hồi và đánh giá từ đồng nghiệp và quản lý"
      />

      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto px-4 sm:px-12 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {/* Glow effect behind swiper */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.4), transparent 60%)', filter: 'blur(40px)' }}
        />

        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Pagination, Autoplay]}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl py-10"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="h-auto">
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </SectionWrapper>
  )
}
