'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Vector3 } from 'three'
import Image from 'next/image'

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
          
          {/* Right side - Enhanced Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-20"
          >
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