'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Hero3D from '../components/Hero3D'

// Dynamic imports for Three.js components to avoid SSR issues
const ExperienceTimeline = dynamic(() => import('../components/ExperienceTimeline'), { ssr: false })
const SkillsVisualization = dynamic(() => import('../components/SkillsVisualization'), { ssr: false })
const ProjectShowcase = dynamic(() => import('../components/ProjectShowcase'), { ssr: false })
const Background3D = dynamic(() => import('../components/Background3D'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative">
      {/* Global 3D Background */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        <Navbar />
        
        <Hero3D />
        
        <section id="experience" className="min-h-screen">
          <Suspense fallback={<Loader />}>
            <ExperienceTimeline />
          </Suspense>
        </section>
        
        <section id="skills" className="min-h-screen">
          <Suspense fallback={<Loader />}>
            <SkillsVisualization />
          </Suspense>
        </section>
        
        <section id="projects" className="min-h-screen">
          <Suspense fallback={<Loader />}>
            <ProjectShowcase />
          </Suspense>
        </section>
        
        <footer className="bg-black/20 p-8 text-center text-white/70 backdrop-blur-sm relative z-10">
          <p>&copy; 2025 Daniel Tremer. All rights reserved.</p>
          <p className="mt-2">Built with Next.js, Three.js & Vercel</p>
        </footer>
      </div>
    </main>
  )
}
