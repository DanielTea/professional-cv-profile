'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import * as THREE from 'three'
import Image from 'next/image'
import ScrollHighlight from './ScrollHighlight'
import MouseCoordinates from './MouseCoordinates'
import Barcode from './Barcode'

// GitHub Stats Interface
interface GitHubStats {
  totalContributions: number
  totalStars: number
  publicRepos: number
  followers: number
}

// Technical wireframe floating elements
function FloatingElements() {
  const elements = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: new Vector3(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ),
      scale: Math.random() * 0.5 + 0.2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }))
  }, [])

  return (
    <>
      {/* Decorative 3D Lines in background */}
      <mesh position={[0, 0, -10]}>
        <ringGeometry args={[12, 12.1, 64]} />
        <meshBasicMaterial color="#000" opacity={0.1} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -10]} rotation={[0, 0, Math.PI/4]}>
        <ringGeometry args={[15, 15.05, 4]} />
        <meshBasicMaterial color="#FF2A2A" opacity={0.2} transparent side={THREE.DoubleSide} />
      </mesh>

      {elements.map((element) => (
        <Float
          key={element.id}
          speed={1}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={element.position}
        >
          <mesh>
            {element.id % 2 === 0 ? (
              <icosahedronGeometry args={[element.scale, 0]} />
            ) : (
              <octahedronGeometry args={[element.scale]} />
            )}
            {/* Dark wireframes for light background */}
            <meshBasicMaterial 
              color={element.id % 3 === 0 ? "#FF2A2A" : "#000000"} 
              wireframe 
              transparent 
              opacity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function GitHubStatsWidget({ stats }: { stats: GitHubStats | null }) {
  if (!stats) return null

  return (
    <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-black/10">
      {[
        { label: 'CONTRIB', value: stats.totalContributions },
        { label: 'STARS', value: stats.totalStars },
        { label: 'REPOS', value: stats.publicRepos },
        { label: 'FLLWRS', value: stats.followers }
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div className="text-black font-mono text-xl font-bold">{item.value.toLocaleString()}</div>
          <div className="text-gray-500 text-[10px] tracking-widest">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

function GitHubContributionsChart() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [chartKey, setChartKey] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setChartKey(Date.now())

    const fetchGitHubStats = async () => {
      try {
        const userResponse = await fetch('https://api.github.com/users/DanielTea')
        const userData = await userResponse.json()
        const reposResponse = await fetch('https://api.github.com/users/DanielTea/repos?per_page=100')
        const reposData = await reposResponse.json()
        const totalStars = reposData.reduce((sum: number, repo: { stargazers_count: number }) => sum + repo.stargazers_count, 0)
        
        setStats({
          totalContributions: 1500, // Estimated
          totalStars,
          publicRepos: userData.public_repos,
          followers: userData.followers
        })
      } catch (error) {
        setStats({
           totalContributions: 850,
           totalStars: 50,
           publicRepos: 77,
           followers: 17
         })
      }
    }

    fetchGitHubStats()
  }, [])

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-[var(--color-surface)] border border-black/20 p-4 relative shadow-xl">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color-danger)]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-danger)]" />

      <div className="flex items-center justify-between mb-4 border-b border-black/10 pb-2">
        <h3 className="text-gray-500 font-mono text-xs tracking-widest uppercase">// GITHUB_ACTIVITY_LOG</h3>
        <span className="text-[var(--color-danger)] text-xs animate-pulse">● LIVE</span>
      </div>
      
      <div className="opacity-90 hover:opacity-100 transition-all duration-500 mix-blend-multiply">
         <Image
              key={chartKey || 'static'}
              src={isClient && chartKey 
                ? `https://ghchart.rshah.org/000000/DanielTea?cache=${chartKey}`
                : 'https://ghchart.rshah.org/000000/DanielTea'
              }
              alt="GitHub Contributions"
              width={800}
              height={200}
              className="w-full h-auto"
              unoptimized
            />
      </div>
      
      <GitHubStatsWidget stats={stats} />
    </div>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ccc" />
      {/* Red accent light */}
      <pointLight position={[-10, -5, 5]} intensity={1.5} color="#FF2A2A" distance={20} />
      <FloatingElements />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function Hero3D() {
  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[var(--color-background)] pt-24 md:pt-0">
      
      {/* HUD Overlay Lines - Black lines for light theme */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute left-8 top-24 bottom-24 w-[1px] bg-black/10 hidden md:block"></div>
        <div className="absolute right-8 top-24 bottom-24 w-[1px] bg-black/10 hidden md:block"></div>
        <div className="absolute left-8 top-24 w-4 h-[1px] bg-black hidden md:block"></div>
        <div className="absolute right-8 bottom-24 w-4 h-[1px] bg-[var(--color-danger)] hidden md:block"></div>
        
        {/* New Technical Accents */}
        <div className="absolute left-12 top-32 flex flex-col gap-1">
           <div className="w-2 h-2 bg-black"></div>
           <div className="w-2 h-2 border border-black"></div>
           <div className="w-2 h-2 bg-[var(--color-volt)]"></div>
        </div>
        
        <div className="absolute right-12 bottom-32 text-[10px] font-mono text-black/40 flex flex-col items-end gap-2">
           <div className="flex items-center gap-2">
              <MouseCoordinates />
              <div className="w-4 h-4 border border-black rounded-full flex items-center justify-center">
                 <div className="w-2 h-[1px] bg-black"></div>
              </div>
           </div>
           <div className="w-32 h-[1px] bg-black/20"></div>
           <div className="flex gap-1">
              {[...Array(8)].map((_, i) => (
                 <div key={i} className={`w-1 h-3 ${i > 5 ? 'bg-[var(--color-danger)]' : 'bg-black/20'}`}></div>
              ))}
           </div>
        </div>
      </div>

      {/* Background 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <Scene />
        </Canvas>
      </div>
      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text */}
        <div className="text-left">
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
          >
             <div className="inline-block px-2 py-1 bg-[var(--color-surface)] border border-black text-[var(--color-danger)] font-mono text-xs font-bold mb-4">
                <div className="flex items-center gap-4">
                  <span>ID: 9821-A // SENIOR_ENGINEER</span>
                  <Barcode width="w-16" height="h-3" color="bg-[var(--color-danger)]" />
                </div>
             </div>
             <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-black leading-[0.85] tracking-tighter mb-6">
               DANIEL<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-black">TREMER</span>
             </h1>
             <p className="text-xl text-gray-600 font-mono mb-8 max-w-lg border-l-2 border-black pl-4">
               <ScrollHighlight>Managing Director</ScrollHighlight> @ control-f GmbH<br/>
               <ScrollHighlight>Software Developer</ScrollHighlight> & <ScrollHighlight>Machine Learning Engineer</ScrollHighlight>
             </p>

             <div className="flex gap-4">
               <button 
                 onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                 className="px-8 py-3 bg-black text-white font-bold uppercase hover:bg-[var(--color-volt)] hover:text-black transition-colors chamfered shadow-lg"
               >
                 Initiate
               </button>
               <button 
                 onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                 className="px-8 py-3 border border-black text-black font-bold uppercase hover:border-[var(--color-danger)] hover:text-[var(--color-danger)] transition-colors chamfered"
               >
                 Contact
               </button>
             </div>
          </motion.div>
        </div>

        {/* Right: Profile & Data */}
        <div className="relative">
           {/* Profile Frame */}
           <div className="relative w-full max-w-md mx-auto border border-black bg-white p-2 shadow-2xl">
              <div className="relative aspect-square overflow-hidden border border-black/20 group">
                 <Image 
                   src="/images/profile.webp" 
                   alt="Daniel Tremer" 
                   fill
                   sizes="(max-width: 768px) 100vw, 500px"
                   className="object-cover"
                   priority
                 />
                 {/* Scanline Overlay on Image */}
                 <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50"></div>
                 
                 {/* Corner Accents */}
                 <div className="absolute top-2 right-2 text-black bg-white px-1 font-mono text-xs">[IMG_01]</div>
              </div>
           </div>

           <GitHubContributionsChart />
        </div>

      </div>
    </section>
  )
}

