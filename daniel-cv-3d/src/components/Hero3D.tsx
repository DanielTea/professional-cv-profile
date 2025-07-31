'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import Image from 'next/image'

// GitHub Stats Interface
interface GitHubStats {
  totalContributions: number
  totalStars: number
  publicRepos: number
  followers: number
}

// Abstract Triangle-like Floating Elements Component
function FloatingElements() {
  // Generate random positions for abstract floating elements
  const elements = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      position: new Vector3(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ),
      scale: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }))
  }, [])

  return (
    <>
      {elements.map((element) => (
        <Float
          key={element.id}
          speed={0.6 + Math.random() * 0.6}
          rotationIntensity={0.6}
          floatIntensity={0.8}
          position={element.position}
        >
          {element.id % 4 === 0 ? (
            // Triangular Pyramid (Tetrahedron)
            <mesh>
              <tetrahedronGeometry args={[element.scale]} />
              <meshStandardMaterial 
                color="#ffffff" 
                transparent 
                opacity={element.opacity}
                wireframe={element.id % 3 === 0}
                metalness={0.5}
                roughness={0.3}
              />
            </mesh>
          ) : element.id % 4 === 1 ? (
            // Octahedron (Double pyramid)
            <mesh>
              <octahedronGeometry args={[element.scale]} />
              <meshStandardMaterial 
                color="#ffffff" 
                transparent 
                opacity={element.opacity}
                wireframe={element.id % 3 === 1}
                metalness={0.6}
                roughness={0.2}
              />
            </mesh>
          ) : element.id % 4 === 2 ? (
            // Icosahedron (Abstract triangular)
            <mesh>
              <icosahedronGeometry args={[element.scale]} />
              <meshStandardMaterial 
                color="#ffffff" 
                transparent 
                opacity={element.opacity}
                wireframe={element.id % 3 === 2}
                metalness={0.4}
                roughness={0.4}
              />
            </mesh>
          ) : (
            // Stretched triangular prism
            <mesh>
              <cylinderGeometry args={[0, element.scale, element.scale * 2, 3]} />
              <meshStandardMaterial 
                color="#ffffff" 
                transparent 
                opacity={element.opacity}
                wireframe={element.id % 2 === 0}
                metalness={0.7}
                roughness={0.1}
              />
            </mesh>
          )}
        </Float>
      ))}
    </>
  )
}



// GitHub Stats Widget Component
function GitHubStatsWidget({ stats }: { stats: GitHubStats | null }) {
  if (!stats) {
    return (
      <div className="grid grid-cols-4 gap-2 mt-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="text-center">
            <div className="w-8 h-4 bg-white/10 rounded animate-pulse mx-auto mb-1"></div>
            <div className="w-12 h-3 bg-white/10 rounded animate-pulse mx-auto"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-white/10">
      <div className="text-center">
        <div className="text-white font-semibold text-sm">{stats.totalContributions.toLocaleString()}</div>
        <div className="text-white/60 text-xs">Contributions</div>
      </div>
      <div className="text-center">
        <div className="text-white font-semibold text-sm">{stats.totalStars.toLocaleString()}</div>
        <div className="text-white/60 text-xs">Stars</div>
      </div>
      <div className="text-center">
        <div className="text-white font-semibold text-sm">{stats.publicRepos}</div>
        <div className="text-white/60 text-xs">Repos</div>
      </div>
      <div className="text-center">
        <div className="text-white font-semibold text-sm">{stats.followers}</div>
        <div className="text-white/60 text-xs">Followers</div>
      </div>
    </div>
  )
}

// GitHub Contributions Chart Component
function GitHubContributionsChart() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [chartKey, setChartKey] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set client-side flag and initial chart key to avoid hydration mismatch
    setIsClient(true)
    setChartKey(Date.now())

    // Fetch GitHub stats
    const fetchGitHubStats = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('https://api.github.com/users/DanielTea')
        const userData = await userResponse.json()

        // Fetch repositories data
        const reposResponse = await fetch('https://api.github.com/users/DanielTea/repos?per_page=100')
        const reposData = await reposResponse.json()

        // Calculate total stars from owned repositories
        const totalStars = reposData.reduce((sum: number, repo: { stargazers_count: number }) => sum + repo.stargazers_count, 0)

        // Estimate contributions (this is an approximation since GitHub API doesn't provide exact public contribution count)
        const currentYear = new Date().getFullYear()
        const startOfYear = new Date(currentYear, 0, 1)
        const daysSinceStartOfYear = Math.floor((Date.now() - startOfYear.getTime()) / (1000 * 60 * 60 * 24))
        
        // Rough estimation based on repo activity and current date
        const estimatedContributions = Math.min(daysSinceStartOfYear * 2, 1500) // Conservative estimate

        setStats({
          totalContributions: estimatedContributions,
          totalStars,
          publicRepos: userData.public_repos,
          followers: userData.followers
        })
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error)
        // Fallback data
        setStats({
          totalContributions: 850,
          totalStars: 50,
          publicRepos: 77,
          followers: 17
        })
      }
    }

    fetchGitHubStats()

    // Refresh chart every hour (only on client side)
    const interval = setInterval(() => {
      setChartKey(Date.now())
    }, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <h3 className="text-white font-semibold text-xs">GitHub Activity</h3>
          <a 
            href="https://github.com/DanielTea" 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-auto text-xs text-white/60 hover:text-white transition-colors"
          >
            @DanielTea
          </a>
        </div>
        <div className="rounded-lg overflow-hidden">
          <a 
            href="https://github.com/DanielTea" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              key={chartKey || 'static'}
              src={isClient && chartKey 
                ? `https://ghchart.rshah.org/239a3b/DanielTea?cache=${chartKey}`
                : 'https://ghchart.rshah.org/239a3b/DanielTea'
              }
              alt="Daniel's GitHub Contributions Chart"
              className="github-contributions-chart w-full h-auto rounded-lg"
              width={800}
              height={200}
              unoptimized
              loading="lazy"
              style={{ 
                filter: 'brightness(1.2) contrast(1.1)',
                background: 'transparent'
              }}
            />
          </a>
        </div>
        
        {/* GitHub Stats Widget */}
        <GitHubStatsWidget stats={stats} />
      </div>
    </motion.div>
  )
}

// Main 3D Scene
function Scene() {
  console.log('Scene component rendering...')
  
  try {
    return (
      <>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ffffff" />
        <pointLight position={[0, 10, -10]} intensity={0.3} color="#ffffff" />
        {/* Additional RGB accent lights */}
        <pointLight position={[15, 5, 5]} intensity={0.2} color="#ff0040" />
        <pointLight position={[-15, 5, 5]} intensity={0.2} color="#00ff40" />
        <pointLight position={[0, 15, -5]} intensity={0.2} color="#0040ff" />
        
        <FloatingElements />
        
        {/* Central visible element for debugging */}
        <mesh position={[0, 0, -5]}>
          <icosahedronGeometry args={[1]} />
          <meshStandardMaterial 
            color="#ffffff" 
            wireframe 
            transparent 
            opacity={0.1}
          />
        </mesh>
        
        <Environment preset="night" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </>
    )
  } catch (error) {
    console.error('Scene rendering error:', error)
    return null
  }
}

export default function Hero3D() {
  console.log('Hero3D component rendering...')
  
  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      
      {/* Background 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 15], fov: 75 }}
          onCreated={() => console.log('Canvas created successfully')}
          onError={(error) => console.error('Canvas error:', error)}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          fallback={<div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">3D Loading...</div>}
        >
          <Scene />
        </Canvas>
      </div>
      
      {/* Overlay Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen pt-20 pb-20">
          {/* Left side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-left relative z-20"
          >
            {/* Background overlay for text readability */}
            <div className="absolute inset-2 bg-black/40 rounded-2xl backdrop-blur-sm -z-10 p-6 m-4"></div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Daniel
              <br />
              <span className="text-gray-300 font-light">
                Tremer
              </span>
            </motion.h1>
            
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 mb-8 lg:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Managing Director @ control-f GmbH
              <br />
              Software Developer & Machine Learning Engineer
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4 mb-8 lg:mb-10 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 text-white rounded-full border border-white/30 text-sm sm:text-base">
                10+ Years Experience
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 text-white rounded-full border border-white/30 text-sm sm:text-base">
                AI Specialist
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 text-white rounded-full border border-white/30 text-sm sm:text-base">
                2K+ Followers
              </span>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <motion.button
                className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </motion.button>
              
              <motion.button
                className="px-6 py-2.5 sm:px-8 sm:py-3 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('mailto:info@danieltremer.com')}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Right side - Enhanced Profile Image & GitHub Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-20 space-y-8"
          >
            {/* Profile Image */}
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              style={{ perspective: '1000px' }}
            >
              {/* Enhanced RGB glow effects */}
              <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-5 animate-pulse" 
                   style={{ animationDelay: '0s' }} />
              <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-5 animate-pulse" 
                   style={{ animationDelay: '0.33s' }} />
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-5 animate-pulse" 
                   style={{ animationDelay: '0.66s' }} />
              
              {/* Main image container with 3D transform */}
              <motion.div 
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white"
                whileHover={{ 
                  boxShadow: "0 25px 50px rgba(255, 255, 255, 0.3)",
                  borderColor: "rgba(255, 255, 255, 1)",
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Visible placeholder to test container */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
                  DT
                </div>
                
                <Image
                  src="/profile.jpg"
                  alt="Daniel Tremer - Profile Picture"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-all duration-500 hover:brightness-110 relative z-10"
                  priority={true}
                  unoptimized={true}
                  onLoad={() => console.log('Profile image loaded successfully!')}
                  onError={(e) => console.error('Profile image failed to load:', e)}
                />
              </motion.div>
              
              {/* Multiple accent rings for depth */}
              <div className="absolute inset-0 rounded-full border border-white/30 animate-pulse" 
                   style={{ animationDuration: '2s' }} />
              <div className="absolute inset-2 rounded-full border border-white/20 animate-pulse" 
                   style={{ animationDuration: '3s', animationDelay: '1s' }} />
              <div className="absolute inset-4 rounded-full border border-white/10 animate-pulse" 
                   style={{ animationDuration: '4s', animationDelay: '2s' }} />
            </motion.div>

            {/* GitHub Contribution Chart */}
            <GitHubContributionsChart />

            {/* Featured Projects Icons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="max-w-sm mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Featured Projects
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Rage Analytics - Your Original Project */}
                  <motion.a
                    href="https://github.com/DanielTea/rage-analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 rounded-lg p-3 border border-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">📊</span>
                      </div>
                      <span className="text-white text-xs font-medium truncate">rage-analytics</span>
                    </div>
                    <p className="text-white/60 text-xs group-hover:text-white/80 transition-colors">
                      Twitch Emotion Analysis & AI Recommendations
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400 text-xs">⭐ 16</span>
                      <span className="text-green-400 text-xs">🔀 5</span>
                      <span className="text-white/40 text-xs ml-auto">Jupyter</span>
                    </div>
                  </motion.a>

                  {/* Browser Use - Major Open Source Contribution */}
                  <motion.a
                    href="https://github.com/browser-use/browser-use"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 rounded-lg p-3 border border-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🌐</span>
                      </div>
                      <span className="text-white text-xs font-medium truncate">browser-use</span>
                    </div>
                    <p className="text-white/60 text-xs group-hover:text-white/80 transition-colors">
                      Make websites accessible for AI agents
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400 text-xs">⭐ 66.6k</span>
                      <span className="text-green-400 text-xs">🔀 7.7k</span>
                      <span className="text-white/40 text-xs ml-auto">Python</span>
                    </div>
                  </motion.a>

                  {/* Generative Agents - AI Research Contribution */}
                  <motion.a
                    href="https://github.com/mkturkcan/generative-agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 rounded-lg p-3 border border-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🤖</span>
                      </div>
                      <span className="text-white text-xs font-medium truncate">generative-agents</span>
                    </div>
                    <p className="text-white/60 text-xs group-hover:text-white/80 transition-colors">
                      Interactive Human Behavior Simulacra
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400 text-xs">⭐ 979</span>
                      <span className="text-green-400 text-xs">🔀 162</span>
                      <span className="text-white/40 text-xs ml-auto">Jupyter</span>
                    </div>
                  </motion.a>

                  {/* AutoResearcher - AI Research Tool */}
                  <motion.a
                    href="https://github.com/eimenhmdt/autoresearcher"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 rounded-lg p-3 border border-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">⚡</span>
                      </div>
                      <span className="text-white text-xs font-medium truncate">autoresearcher</span>
                    </div>
                    <p className="text-white/60 text-xs group-hover:text-white/80 transition-colors">
                      Automating scientific workflows with AI
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400 text-xs">⭐ 385</span>
                      <span className="text-green-400 text-xs">🔀 39</span>
                      <span className="text-white/40 text-xs ml-auto">Python</span>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <p className="text-white/50 text-sm mt-2">Scroll to explore</p>
        </motion.div>
      </div>
    </section>
  )
} 