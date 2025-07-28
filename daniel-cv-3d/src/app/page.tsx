'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'

// Dynamic imports for Three.js components to avoid SSR issues
const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false })
const ExperienceTimeline = dynamic(() => import('@/components/ExperienceTimeline'), { ssr: false })
const SkillsVisualization = dynamic(() => import('@/components/SkillsVisualization'), { ssr: false })
const ProjectShowcase = dynamic(() => import('@/components/ProjectShowcase'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <Suspense fallback={<Loader />}>
        <Hero3D />
      </Suspense>
      
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
      
      <footer className="bg-black/20 p-8 text-center text-white/70">
        <p>&copy; 2025 Daniel Tremer. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Three.js & Vercel</p>
      </footer>
    </main>
  )
}
