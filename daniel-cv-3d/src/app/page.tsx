'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Hero3D from '../components/Hero3D'
import ScrollTechOverlay from '../components/ScrollTechOverlay'
import RandomNumber from '../components/RandomNumber'

// Dynamic imports for Three.js components to avoid SSR issues (except Hero)
const ExperienceTimeline = dynamic(() => import('../components/ExperienceTimeline'), { ssr: false })
const WorldMap3D = dynamic(() => import('../components/WorldMap3D'), { ssr: false })
const SkillsVisualization = dynamic(() => import('../components/SkillsVisualization'), { ssr: false })
const ProjectShowcase = dynamic(() => import('../components/ProjectShowcase'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] relative overflow-hidden selection:bg-[var(--color-volt)] selection:text-black">
      {/* Global FX */}
      <div className="scanlines" />
      <div className="vignette" />
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10" 
           style={{ 
             backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }} 
      />

      <Navbar />
      
      <Hero3D />

      {/* New Scroll Parallax Overlay */}
      <ScrollTechOverlay />
      
      {/* Decorative Background Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-black/10"></div>
        <div className="absolute top-[80%] left-0 w-full h-[1px] bg-black/10"></div>
        <div className="absolute left-[10%] top-0 h-full w-[1px] bg-black/10"></div>
        <div className="absolute right-[10%] top-0 h-full w-[1px] bg-black/10"></div>
        
        {/* Diagonal warning stripes in corners */}
        <div className="absolute top-0 right-0 w-32 h-32 warning-stripe opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 warning-stripe opacity-20"></div>
        
        {/* Crosshairs */}
        <div className="absolute top-[20%] left-[10%] technical-crosshair translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute top-[80%] right-[10%] technical-crosshair translate-x-[50%] translate-y-[-50%]"></div>
      </div>
      
      <section id="experience" className="min-h-screen relative z-10">
        <Suspense fallback={<Loader />}>
          <ExperienceTimeline />
        </Suspense>
      </section>

      <section id="world-map" className="relative z-10">
        <Suspense fallback={<Loader />}>
          <WorldMap3D />
        </Suspense>
      </section>
      
      <section id="projects" className="py-20 relative z-10">
        <Suspense fallback={<Loader />}>
          <ProjectShowcase />
        </Suspense>
      </section>
      
      <section id="skills" className="py-20 relative z-10">
        <Suspense fallback={<Loader />}>
          <SkillsVisualization />
        </Suspense>
      </section>
      
      <section id="contact" className="flex items-center justify-center py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative max-w-2xl mx-auto bg-[var(--color-surface)] p-8 border border-black chamfered-border shadow-xl">
               {/* Decorative Corner Markers */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-danger)]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color-danger)]" />
              
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 bg-[var(--color-background)] text-black text-xs font-mono tracking-widest border border-black/10">
                // COMMS_OPEN
              </div>

              <h3 className="text-3xl font-display font-bold text-black mb-2 uppercase tracking-wider">
                Initialize <span className="text-[var(--color-danger)]">Handshake</span>
              </h3>
              <p className="text-gray-600 mb-8 font-sans text-lg">
                Open channel for collaboration, project inquiries, or technical discourse.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  href="mailto:info@danieltremer.com"
                  className="relative group px-8 py-3 bg-black text-white font-bold tracking-wide uppercase overflow-hidden hover:bg-[var(--color-volt)] hover:text-black transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                   <span className="relative z-10">Transmit Email</span>
                   <div className="absolute inset-0 bg-[var(--color-volt)] opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/daniel-tremer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group px-8 py-3 border border-black text-black font-bold tracking-wide uppercase hover:bg-black hover:text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Connect Node</span>
                </motion.a>
              </div>
              
              {/* Technical footer data */}
              <div className="mt-8 pt-4 border-t border-black/10 flex justify-between text-[10px] font-mono text-gray-500">
                <span>STATUS: ONLINE</span>
                <span>LATENCY: <RandomNumber min={8} max={24} decimals={0} suffix="ms" interval={1200} /></span>
                <span>SECURE: TRUE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <footer className="border-t border-black/10 bg-[var(--color-background)] p-8 text-center relative z-10">
        <div className="flex justify-center items-center gap-4 text-xs font-mono text-black uppercase tracking-widest mb-4">
           <span>SYS.VER.2025</span>
           <span>//</span>
           <span>THREE.JS CORE</span>
           <span>//</span>
           <span>NEXT.JS FRAMEWORK</span>
        </div>
        <p className="text-gray-500 text-sm font-sans">&copy; 2025 DANIEL TREMER. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  )
}
