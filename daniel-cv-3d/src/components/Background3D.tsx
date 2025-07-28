'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import { Vector3, Color, Mesh, Material } from 'three'
import { useFrame } from '@react-three/fiber'

// Element interface for better typing
interface FloatingElementData {
  id: number
  position: Vector3
  scale: number
  opacity: number
  rotationSpeed: number
  hueShift: number
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
      speed={0.4 + Math.random() * 0.4}
      rotationIntensity={0.4}
      floatIntensity={0.6}
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

// Background floating elements spread across the entire viewport
function BackgroundElements() {
  const elements = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      position: new Vector3(
        (Math.random() - 0.5) * 60, // Wider spread
        (Math.random() - 0.5) * 40, // Taller spread
        (Math.random() - 0.5) * 50  // Deeper spread
      ),
      scale: Math.random() * 0.6 + 0.2, // Slightly smaller
      opacity: Math.random() * 0.4 + 0.1, // More subtle
      rotationSpeed: (Math.random() - 0.5) * 0.01, // Slower rotation
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

// Main 3D Scene for background
function BackgroundScene() {
  return (
    <>
      {/* Subtle lighting for background effect */}
      <ambientLight intensity={0.15} color="#ffffff" />
      
      {/* Main directional lights */}
      <directionalLight position={[20, 20, 20]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-20, 20, -20]} intensity={0.5} color="#ffffff" />
      
      {/* Point lights for iridescent effects - more spread out */}
      <pointLight position={[30, 10, 10]} intensity={0.4} color="#ff0080" />
      <pointLight position={[-30, 10, 10]} intensity={0.4} color="#00ff80" />
      <pointLight position={[0, 30, -10]} intensity={0.4} color="#0080ff" />
      <pointLight position={[10, -20, 20]} intensity={0.3} color="#ff8000" />
      <pointLight position={[-10, -20, 20]} intensity={0.3} color="#8000ff" />
      <pointLight position={[0, 0, 40]} intensity={0.2} color="#ff0040" />
      
      {/* Spot light for subtle highlights */}
      <spotLight
        position={[0, 40, 0]}
        angle={0.5}
        penumbra={0.8}
        intensity={0.4}
        color="#ffffff"
      />
      
      <BackgroundElements />
      
      <Environment preset="night" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.1}
      />
    </>
  )
}

export default function Background3D() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 30], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <BackgroundScene />
    </Canvas>
  )
}