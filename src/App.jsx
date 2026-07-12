/**
 * App.jsx
 * Main Application Component.
 * Assembles all sections, layout components, and global UI elements.
 * Initializes Lenis smooth scrolling.
 */

import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { motion, AnimatePresence } from 'framer-motion'

// Global UI Components
import LoadingScreen from './components/ui/LoadingScreen'
import Cursor from './components/ui/Cursor'
import ScrollProgress from './components/ui/ScrollProgress'
import ScrollTop from './components/ui/ScrollTop'
import CanvasBackground from './components/ui/CanvasBackground'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Sections
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Achievements from './components/sections/Achievements'
import Services from './components/sections/Services'
import Testimonials from './components/sections/Testimonials'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'

// Theme Hook
import { useTheme } from './hooks/useTheme'

function App() {
  const [loading, setLoading] = useState(true)
  const { isDark } = useTheme()

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className={`relative min-h-screen ${isDark ? 'dark' : 'light'}`}>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* App Content - Only render fully when loading is complete */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Global UI */}
          <Cursor />
          <ScrollProgress />
          <ScrollTop />
          <CanvasBackground />

          {/* Layout */}
          <Navbar />

          {/* Main Sections */}
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Achievements />
            <Services />
            <Testimonials />
            <Blog />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </div>
  )
}

export default App
