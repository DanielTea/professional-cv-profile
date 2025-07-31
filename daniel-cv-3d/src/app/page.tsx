'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Hero3D from '../components/Hero3D'

// Dynamic imports for Three.js components to avoid SSR issues (except Hero)
const ExperienceTimeline = dynamic(() => import('../components/ExperienceTimeline'), { ssr: false })
const SkillsVisualization = dynamic(() => import('../components/SkillsVisualization'), { ssr: false })
const ProjectShowcase = dynamic(() => import('../components/ProjectShowcase'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <Hero3D />
      
      <section id="experience" className="min-h-screen">
        <Suspense fallback={<Loader />}>
          <ExperienceTimeline />
        </Suspense>
      </section>
      
      <section id="projects" className="py-2">
        <Suspense fallback={<Loader />}>
          <ProjectShowcase />
        </Suspense>
      </section>
      
      <section id="skills" className="py-2">
        <Suspense fallback={<Loader />}>
          <SkillsVisualization />
        </Suspense>
      </section>
      
      <section id="contact" className="bg-black flex items-center justify-center py-2">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Interested in Working Together?</h3>
              <p className="text-white/70 mb-6">
                I&apos;m always open to discussing new opportunities, innovative projects, and collaborations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:info@danieltremer.com"
                  className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/daniel-tremer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect on LinkedIn
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <footer className="bg-black/20 p-8 text-center text-white/70">
        <p>&copy; 2025 Daniel Tremer. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Three.js & Vercel</p>
      </footer>
    </main>
  )
}
