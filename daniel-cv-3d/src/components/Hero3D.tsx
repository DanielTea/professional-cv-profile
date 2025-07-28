'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { Vector3, Color, Mesh, Material } from 'three'
import { useFrame } from '@react-three/fiber'
import Image from 'next/image'

// Element interface for better typing
interface FloatingElementData {
  id: number
  position: Vector3
  scale: number
  opacity: number
  rotationSpeed: number
  hueShift: number
}

// Abstract Triangle-like Floating Elements Component with Oil Spill Reflections
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
      hueShift: Math.random() * 360,
    }))
  }, [])

  return (
    <>
      {elements.map((element) => (
        <FloatingElement key={element.id} element={element} />
      ))}
    </>
  )
}

// Individual floating element with oil spill reflection
function FloatingElement({ element }: { element: FloatingElementData }) {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<Material>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += element.rotationSpeed
      meshRef.current.rotation.y += element.rotationSpeed * 0.7
      meshRef.current.rotation.z += element.rotationSpeed * 0.3
    }
    
    if (materialRef.current) {
      // Create oil spill iridescent effect
      const time = state.clock.elapsedTime
      const hue = (element.hueShift + time * 30) % 360
      const saturation = 0.8 + Math.sin(time * 2) * 0.2
      const lightness = 0.6 + Math.sin(time * 3 + element.id) * 0.3
      
      // Type assertion for material properties
      const material = materialRef.current as Material & {
        color?: Color
        emissive?: Color
      }
      
      if (material.color) {
        material.color = new Color().setHSL(hue / 360, saturation, lightness)
      }
      if (material.emissive) {
        material.emissive = new Color().setHSL((hue + 60) / 360, 0.5, 0.1)
      }
    }
  })

  const geometry = useMemo(() => {
    if (element.id % 4 === 0) return 'tetrahedron'
    if (element.id % 4 === 1) return 'octahedron'
    if (element.id % 4 === 2) return 'icosahedron'
    return 'pyramid'
  }, [element.id])

  return (
    <Float
      speed={0.6 + Math.random() * 0.6}
      rotationIntensity={0.6}
      floatIntensity={0.8}
      position={element.position}
    >
      <mesh ref={meshRef}>
        {geometry === 'tetrahedron' && <tetrahedronGeometry args={[element.scale]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[element.scale]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[element.scale]} />}
        {geometry === 'pyramid' && <cylinderGeometry args={[0, element.scale, element.scale * 2, 3]} />}
        
        <meshPhysicalMaterial
          ref={materialRef}
          transparent
          opacity={element.opacity}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
          ior={1.5}
          thickness={0.5}
          transmission={element.id % 3 === 0 ? 0.3 : 0}
          wireframe={element.id % 5 === 0}
        />
      </mesh>
    </Float>
  )
}

// Main 3D Scene
function Scene() {
  console.log('Scene component rendering...')
  
  try {
    return (
      <>
        {/* Enhanced lighting for oil spill reflections */}
        <ambientLight intensity={0.2} color="#ffffff" />
        
        {/* Main directional lights */}
        <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" castShadow />
        <directionalLight position={[-10, 10, -10]} intensity={0.8} color="#ffffff" />
        
        {/* Point lights for iridescent effects */}
        <pointLight position={[15, 5, 5]} intensity={0.6} color="#ff0080" />
        <pointLight position={[-15, 5, 5]} intensity={0.6} color="#00ff80" />
        <pointLight position={[0, 15, -5]} intensity={0.6} color="#0080ff" />
        <pointLight position={[5, -10, 10]} intensity={0.4} color="#ff8000" />
        <pointLight position={[-5, -10, 10]} intensity={0.4} color="#8000ff" />
        <pointLight position={[0, 0, 20]} intensity={0.3} color="#ff0040" />
        
        {/* Spot lights for dramatic reflections */}
        <spotLight
          position={[0, 20, 0]}
          angle={0.3}
          penumbra={0.5}
          intensity={0.8}
          color="#ffffff"
          castShadow
        />
        
        <FloatingElements />
        
        {/* Central visible element for debugging with enhanced reflection */}
        <mesh position={[0, 0, -5]}>
          <icosahedronGeometry args={[1]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            wireframe 
            transparent 
            opacity={0.1}
            metalness={1.0}
            roughness={0.0}
            clearcoat={1.0}
            reflectivity={1.0}
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
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-transparent">
      {/* Debug: Ensure section is visible */}
      <div className="absolute top-4 left-4 text-white/50 text-sm z-50">
        Hero3D Section Loaded ✅
      </div>
      
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
            {/* Enhanced background overlay for text readability with oil spill reflection */}
            <div className="absolute inset-2 bg-black/60 rounded-2xl backdrop-blur-sm -z-10 p-6 m-4 border border-white/10 shadow-2xl"></div>
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
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 text-white rounded-full border border-white/30 text-sm sm:text-base backdrop-blur-sm">
                10+ Years Experience
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 text-white rounded-full border border-white/30 text-sm sm:text-base backdrop-blur-sm">
                AI Specialist
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 text-white rounded-full border border-white/30 text-sm sm:text-base backdrop-blur-sm">
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
                className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white/90 text-black rounded-full font-semibold hover:bg-white transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </motion.button>
              
              <motion.button
                className="px-6 py-2.5 sm:px-8 sm:py-3 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
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
              {/* Enhanced RGB glow effects with oil spill colors */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-10 animate-pulse" 
                   style={{ animationDelay: '0s' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-10 animate-pulse" 
                   style={{ animationDelay: '0.33s' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-2xl opacity-10 animate-pulse" 
                   style={{ animationDelay: '0.66s' }} />
              
              {/* Main image container with 3D transform */}
              <motion.div 
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/50 shadow-2xl bg-white backdrop-blur-sm"
                whileHover={{ 
                  boxShadow: "0 25px 50px rgba(255, 255, 255, 0.3)",
                  borderColor: "rgba(255, 255, 255, 0.8)",
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
              
              {/* Multiple accent rings for depth with iridescent effect */}
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
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm"
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