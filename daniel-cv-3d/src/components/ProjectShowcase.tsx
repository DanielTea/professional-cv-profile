'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, OrbitControls, Environment, Text, Box, RoundedBox, MeshReflectorMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect, useCallback } from 'react'
import { ExternalLink, Calendar, Zap, Trophy, Gamepad2, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import * as THREE from 'three'

const projects = [
  {
    id: 1,
    title: "control-f GmbH",
    category: "AI Platform",
    description: "Leading AI and data science solutions provider delivering cutting-edge proprietary AI systems to businesses worldwide.",
    technologies: ["AI", "Machine Learning", "Data Science", "Python", "TensorFlow"],
    impact: "Serving 100+ enterprise clients globally",
    status: "Active",
    year: "2024",
    color: "#ffffff",
    position: [-6, 0.5, -1] as [number, number, number],
    link: "https://controlf.io"
  },
  {
    id: 2,
    title: "Porsche Vehicle Data Pipeline",
    category: "Automotive AI",
    description: "Built comprehensive data analyzing pipeline for vehicle data using PySpark, processing millions of data points.",
    technologies: ["PySpark", "Azure ML", "Python", "Big Data", "Analytics"],
    impact: "Processing Millions of vehicle data points",
    status: "Completed",
    year: "2021-2024",
    color: "#ffffff",
    position: [-2, 0.5, -1] as [number, number, number],
    link: "#"
  },
  {
    id: 3,
    title: "Mercedes Infotainment System",
    category: "Automotive Tech",
    description: "Led R&D for next-generation Mercedes Benz Infotainment System with Dynamic Content Platform Integration.",
    technologies: ["Embedded Systems", "Linux", "Agile", "Product Management"],
    impact: "Deployed in 500K+ vehicles",
    status: "Completed",
    year: "2020-2021",
    color: "#ffffff",
    position: [2, 0.5, -1] as [number, number, number],
    link: "#"
  },
  {
    id: 4,
    title: "Deep Learning Maneuver Detection",
    category: "Research",
    description: "Bachelor thesis on automotive maneuver detection using LSTMs and CNNs for driving behavior classification.",
    technologies: ["TensorFlow", "Keras", "Python", "Deep Learning", "Research"],
    impact: "95% accuracy in maneuver detection",
    status: "Research",
    year: "2018",
    color: "#ffffff",
    position: [6, 0.5, -1] as [number, number, number],
    link: "#"
  }
]

// Oil Spill Material System (adapted from SkillsVisualization)
function getProjectMaterial(projectName: string, isActive: boolean, size: number) {
  // Enhanced black glass properties with oil spill effect
  const baseProps = {
    transparent: true,
    opacity: 0.88,
    transmission: 0.07,
    thickness: size * 0.2,
    roughness: 0.0,
    metalness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    ior: 1.6,
    reflectivity: 1.0,
    
    // Deep black base color
    color: "#050505",
    
    // Enhanced oil spill iridescence effect
    envMapIntensity: 4.8,
    
    // Oil spill effect properties
    sheen: 1.0,
    sheenRoughness: 0.0,
    sheenColor: "#3a2a5a",
    
    // Enhanced emissive properties for inner glow
    emissive: "#0f0a20",
    emissiveIntensity: isActive ? 0.8 : 0.5,
    
    // Boosted specular highlights for rainbow reflections
    specularIntensity: 1.0,
    specularColor: "#5a3a7a",
  }

  // Project-specific variations with programming language colors
  const variations = {
    'control-f GmbH': { 
      sheenColor: "#2a2a6a", 
      specularColor: "#4a4a8a", 
      emissive: "#0a0a20",
      emissiveIntensity: isActive ? 0.9 : 0.6
    },
    'Porsche Vehicle Data Pipeline': { 
      sheenColor: "#2a2a4a", 
      specularColor: "#6a6a4a", 
      emissive: "#0a0a10",
      emissiveIntensity: isActive ? 0.8 : 0.5
    },
    'Mercedes Infotainment System': { 
      sheenColor: "#2a4a6a", 
      specularColor: "#4a6a8a", 
      emissive: "#0a1020",
      emissiveIntensity: isActive ? 0.9 : 0.6
    },
    'Deep Learning Maneuver Detection': { 
      sheenColor: "#4a2a4a", 
      specularColor: "#8a4a6a", 
      emissive: "#200a10",
      emissiveIntensity: isActive ? 1.0 : 0.7
    }
  }

  const variation = variations[projectName as keyof typeof variations] || {}
  
  return {
    ...baseProps,
    ...variation,
  }
}

// Game Character Component
function GameCharacter({ position, onCollision, movementDirection }: { 
  position: [number, number, number], 
  onCollision: (projectId: number) => void,
  movementDirection: number // -1 for left, 0 for no movement, 1 for right
}) {
  const meshRef = useRef<THREE.Group>(null)
  const leftLegRef = useRef<THREE.Mesh>(null)
  const rightLegRef = useRef<THREE.Mesh>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)
  const antennaRef = useRef<THREE.Mesh>(null)
  
  // Robot walking animation
  useFrame((state) => {
    const time = state.clock.elapsedTime
    const isMoving = Math.abs(movementDirection) > 0
    
    if (meshRef.current) {
      // Set robot position directly on ground with slight walking bobbing
      const bobbingIntensity = isMoving ? Math.sin(time * 8) * 0.05 : 0
      meshRef.current.position.set(position[0], position[1] + bobbingIntensity, position[2])
      
      // Robot rotation based on movement direction
      let targetRotation = 0
      if (movementDirection < 0) {
        // Moving left - face left (rotate 180 degrees)
        targetRotation = Math.PI / 2 // 90° to face left on screen
      } else if (movementDirection > 0) {
        // Moving right - face right (rotate -90°)
        targetRotation = -Math.PI / 2
      }
      
      // Smooth rotation interpolation
      const currentRotation = meshRef.current.rotation.y
      const rotationDiff = targetRotation - currentRotation
      
      // Handle rotation wrapping (shortest path)
      let adjustedDiff = rotationDiff
      if (adjustedDiff > Math.PI) adjustedDiff -= 2 * Math.PI
      if (adjustedDiff < -Math.PI) adjustedDiff += 2 * Math.PI
      
      meshRef.current.rotation.y += adjustedDiff * 0.1 // Smooth interpolation
      
      // Slight forward lean while walking
      if (isMoving) {
        meshRef.current.rotation.z = Math.sin(time * 4) * 0.05
      } else {
        meshRef.current.rotation.z *= 0.9 // Gradually return to upright when not moving
      }
    }
    
    // Animate robot legs - walking motion (only when moving)
    if (leftLegRef.current && rightLegRef.current) {
      const legSpeed = isMoving ? 8 : 0
      const legIntensity = isMoving ? 0.8 : 0
      leftLegRef.current.rotation.x = Math.sin(time * legSpeed) * legIntensity
      rightLegRef.current.rotation.x = Math.sin(time * legSpeed + Math.PI) * legIntensity
    }
    
    // Animate robot arms - swing while walking, or relax when idle
    if (leftArmRef.current && rightArmRef.current) {
      const armSpeed = isMoving ? 8 : 0
      const armIntensity = isMoving ? 0.5 : 0
      const targetLeft = Math.sin(time * armSpeed + Math.PI) * armIntensity
      const targetRight = Math.sin(time * armSpeed) * armIntensity
      leftArmRef.current.rotation.x += (targetLeft - leftArmRef.current.rotation.x) * 0.2
      rightArmRef.current.rotation.x += (targetRight - rightArmRef.current.rotation.x) * 0.2
    }
    
    // Antenna animation
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(time * 3) * 0.2
    }
  })

  // Check collisions with project cards
  useFrame(() => {
    if (meshRef.current) {
      projects.forEach((project) => {
        const distance = Math.sqrt(
          Math.pow(position[0] - project.position[0], 2) +
          Math.pow(position[1] - project.position[1], 2) +
          Math.pow(position[2] - project.position[2], 2)
        )
        
        // Collision detection (character size + project card size)
        if (distance < 2.5) {
          onCollision(project.id)
        }
      })
    }
  })

  return (
    <group ref={meshRef}>
      {/* Robot Body */}
      <Box args={[0.8, 1.0, 0.5]} castShadow>
        <meshStandardMaterial
          color="#e5e7eb"
          emissive="#9ca3af"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </Box>
      
      {/* Robot Head */}
      <Box args={[0.6, 0.6, 0.6]} position={[0, 0.8, 0]} castShadow>
        <meshStandardMaterial
          color="#f3f4f6"
          emissive="#d1d5db"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={1.5}
        />
      </Box>
      
      {/* Robot Eyes - LED style */}
      <Box args={[0.12, 0.12, 0.12]} position={[-0.15, 0.85, 0.31]}>
        <meshStandardMaterial 
          color="#00ff00" 
          emissive="#00ff00"
          emissiveIntensity={0.8}
        />
      </Box>
      <Box args={[0.12, 0.12, 0.12]} position={[0.15, 0.85, 0.31]}>
        <meshStandardMaterial 
          color="#00ff00" 
          emissive="#00ff00"
          emissiveIntensity={0.8}
        />
      </Box>
      
      {/* Robot Antenna */}
      <mesh ref={antennaRef} position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Antenna Tip */}
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.05, 8, 6]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Robot Shoulder Joints */}
      <mesh position={[-0.5, 0.5, 0]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshStandardMaterial
          color="#6b7280"
          emissive="#374151"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <mesh position={[0.5, 0.5, 0]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshStandardMaterial
          color="#6b7280"
          emissive="#374151"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      
      {/* Robot Arms with proper anchor points */}
      <group ref={leftArmRef} position={[-0.5, 0.5, 0]}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          <meshStandardMaterial
            color="#d1d5db"
            emissive="#9ca3af"
            emissiveIntensity={0.1}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>
      
      <group ref={rightArmRef} position={[0.5, 0.5, 0]}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          <meshStandardMaterial
            color="#d1d5db"
            emissive="#9ca3af"
            emissiveIntensity={0.1}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>
      
      {/* Robot Hip Joints */}
      <mesh position={[-0.3, -0.5, 0]}>
        <sphereGeometry args={[0.16, 8, 6]} />
        <meshStandardMaterial
          color="#6b7280"
          emissive="#374151"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <mesh position={[0.3, -0.5, 0]}>
        <sphereGeometry args={[0.16, 8, 6]} />
        <meshStandardMaterial
          color="#6b7280"
          emissive="#374151"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      
      {/* Robot Legs with proper anchor points and feet */}
      <group ref={leftLegRef} position={[-0.3, -0.5, 0]}>
        {/* Left Leg */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
          <meshStandardMaterial
            color="#9ca3af"
            emissive="#6b7280"
            emissiveIntensity={0.1}
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>
        {/* Left Foot - child of left leg */}
        <mesh position={[0, -0.8, 0.1]} castShadow>
          <boxGeometry args={[0.25, 0.1, 0.4]} />
          <meshStandardMaterial
            color="#374151"
            emissive="#1f2937"
            emissiveIntensity={0.1}
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>
      </group>
      
      <group ref={rightLegRef} position={[0.3, -0.5, 0]}>
        {/* Right Leg */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
          <meshStandardMaterial
            color="#9ca3af"
            emissive="#6b7280"
            emissiveIntensity={0.1}
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>
        {/* Right Foot - child of right leg */}
        <mesh position={[0, -0.8, 0.1]} castShadow>
          <boxGeometry args={[0.25, 0.1, 0.4]} />
          <meshStandardMaterial
            color="#374151"
            emissive="#1f2937"
            emissiveIntensity={0.1}
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>
      </group>

    </group>
  )
}

// 3D Project Card Component
function ProjectCard({ project, isActive, onClick }: { 
  project: typeof projects[0], 
  isActive: boolean, 
  onClick: () => void 
}) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Animate position up when active
      const targetY = isActive ? project.position[1] + 1.2 : project.position[1]
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1
      
      // Subtle scale animation for active panels
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.02)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0} floatIntensity={0.1}>
      <group ref={meshRef} position={project.position} onClick={onClick}>
        <RoundedBox args={[2.5, 3, 0.2]} radius={0.1} castShadow>
          <meshPhysicalMaterial
            {...getProjectMaterial(project.title, isActive, 2.5)}
          />
        </RoundedBox>
        

        
        {/* Project Title */}
        <Text
          position={[0, 0, 0.12]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
        >
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={isActive ? 0.4 : 0.2}
            roughness={0.1}
            metalness={0.8}
          />
          {project.title}
        </Text>
        

      </group>
    </Float>
  )
}

// Dynamic Lightning Component
function DynamicLightning({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null)
  
  useFrame((state) => {
    if (lightRef.current) {
      // Flickering lightning effect
      lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 10) * 0.5
      lightRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 3) * 2
    }
  })
  
  return (
    <pointLight 
      ref={lightRef}
      position={position}
      color="#ffffff"
      intensity={2}
      distance={15}
    />
  )
}



// Game Scene Component
function GameScene({ activeProject, setActiveProject, characterPosition, onCharacterCollision, movementDirection }: { 
  activeProject: number, 
  setActiveProject: (id: number) => void,
  characterPosition: [number, number, number],
  onCharacterCollision: (projectId: number) => void,
  movementDirection: number
}) {
  return (
    <>
      {/* Enhanced lighting for dramatic oil spill glass reflections */}
      <ambientLight intensity={0.15} color="#0a0a1a" />
      
      {/* Main powerful rim lights for oil spill reflections */}
      <pointLight position={[15, 15, 15]} intensity={4.0} color="#ffffff" />
      <pointLight position={[-15, -15, -15]} intensity={3.0} color="#5555ff" />
      <pointLight position={[0, 0, 25]} intensity={2.5} color="#ffffff" />
      <pointLight position={[0, 20, 0]} intensity={2.2} color="#ffcc44" />
      <pointLight position={[20, 0, 0]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-20, 0, 0]} intensity={2.0} color="#44aaff" />
      
      {/* Rainbow accent lights for vivid oil spill iridescence */}
      <pointLight position={[12, 10, 12]} intensity={1.8} color="#ff2244" />
      <pointLight position={[-12, 10, 12]} intensity={1.8} color="#22ff44" />
      <pointLight position={[0, 15, -15]} intensity={1.5} color="#2244ff" />
      <pointLight position={[10, -10, 10]} intensity={1.4} color="#ff4422" />
      <pointLight position={[-10, -10, 10]} intensity={1.4} color="#22ffaa" />
      <pointLight position={[0, -15, 0]} intensity={1.2} color="#aa22ff" />
      
      {/* Multiple directional lights for oil surface reflections */}
      <directionalLight 
        position={[8, 15, 8]} 
        intensity={1.8} 
        color="#ffffff"
        castShadow
      />
      <directionalLight 
        position={[-8, 15, -8]} 
        intensity={1.2} 
        color="#7744ff"
        castShadow={false}
      />
      
      {/* Dynamic Lightning Effects */}
      <DynamicLightning position={[-8, 3, 0]} />
      <DynamicLightning position={[8, 3, 0]} />
      <DynamicLightning position={[0, 6, -5]} />
      
      {/* Reflective Ground Platform */}
      <Box args={[18, 0.3, 3]} position={[0, -1.5, 0]} receiveShadow>
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#1f2937"
          metalness={0.8}
        />
      </Box>
      

      
      {/* Game Character */}
      <GameCharacter 
        position={characterPosition}
        onCollision={onCharacterCollision}
        movementDirection={movementDirection}
      />
      
      {/* Project Cards as Platforms */}
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isActive={activeProject === project.id}
          onClick={() => setActiveProject(project.id)}
        />
      ))}
      
      {/* Enhanced Environment */}
      <Environment preset="city" />
      
      {/* Fog for Atmosphere */}
      <fog attach="fog" args={['#000000', 15, 35]} />
    </>
  )
}

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(1)
  const [characterPosition, setCharacterPosition] = useState<[number, number, number]>([-6, 0.0, 0])
  const [characterVelocity, setCharacterVelocity] = useState<[number, number, number]>([0, 0, 0])
  const [isGrounded, setIsGrounded] = useState(true)
  const [keys, setKeys] = useState<{[key: string]: boolean}>({})
  const [movementDirection, setMovementDirection] = useState(0) // -1 for left, 0 for no movement, 1 for right
  
  const currentProject = projects.find(p => p.id === activeProject) || projects[0]

  // Game physics constants
  const GRAVITY = -0.02
  const JUMP_FORCE = 0.4
  const MOVE_SPEED = 0.15
  const GROUND_Y = 0.0

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default browser behavior for game keys
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space', 'KeyA', 'KeyD', 'KeyW'].includes(event.code)) {
        event.preventDefault()
      }
      setKeys(prev => ({ ...prev, [event.code]: true }))
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      // Prevent default browser behavior for game keys
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space', 'KeyA', 'KeyD', 'KeyW'].includes(event.code)) {
        event.preventDefault()
      }
      setKeys(prev => ({ ...prev, [event.code]: false }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      setCharacterPosition((prevPos) => {
        let newVel: [number, number, number] = [...characterVelocity]
        
        // Apply gravity
        if (!isGrounded) {
          newVel[1] += GRAVITY
        }
        
        // Handle movement and update movement direction
        if (keys['ArrowLeft'] || keys['KeyA']) {
          newVel[0] = -MOVE_SPEED
          setMovementDirection(-1) // Moving left
        } else if (keys['ArrowRight'] || keys['KeyD']) {
          newVel[0] = MOVE_SPEED
          setMovementDirection(1) // Moving right
        } else {
          newVel[0] *= 0.8 // Friction
          setMovementDirection(0) // Not moving horizontally
        }
        
        // Handle jumping
        if ((keys['ArrowUp'] || keys['Space'] || keys['KeyW']) && isGrounded) {
          newVel[1] = JUMP_FORCE
          setIsGrounded(false)
        }
        
        // Update velocity state
        setCharacterVelocity(newVel)
        
        // Update position using the new velocity
        let newPos: [number, number, number] = [
          prevPos[0] + newVel[0],
          prevPos[1] + newVel[1],
          prevPos[2]
        ]
        
        // Boundary constraints - keep character within visible game area
        newPos[0] = Math.max(-8, Math.min(8, newPos[0]))
        
        // Ground collision
        if (newPos[1] <= GROUND_Y) {
          newPos[1] = GROUND_Y
          setIsGrounded(true)
          setCharacterVelocity(prev => [prev[0], 0, prev[2]])
        }
        
        return newPos
      })
    }, 16) // ~60fps

    return () => clearInterval(gameLoop)
  }, [keys, characterVelocity, isGrounded])

  const handleCharacterCollision = useCallback((projectId: number) => {
    setActiveProject(projectId)
  }, [])

  return (
    <section className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Featured
            <span className="text-gray-300 font-light">
              {' '}Professional Projects
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Play the platformer game! Use left/right arrow keys to move and up arrow to jump. Walk into project panels to explore them.
          </p>
          
          {/* Game Controls */}
          <div className="mt-6 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Gamepad2 size={16} />
                  <span>Controls:</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <ArrowLeft size={16} />
                    <ArrowRight size={16} />
                  </div>
                  <span>Move Left/Right</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUp size={16} />
                  <span>Jump</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game and Project Details - Side by Side */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* 3D Game Scene - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2 h-[600px] lg:h-[700px] xl:h-[800px] relative -mb-1"
          >
            <Canvas 
              camera={{ position: [0, 1, 18], fov: 50 }}
              shadows
              gl={{ antialias: true, alpha: false }}
            >
              <GameScene
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                characterPosition={characterPosition}
                onCharacterCollision={handleCharacterCollision}
                movementDirection={movementDirection}
              />
            </Canvas>
          </motion.div>

          {/* Project Details Panel - Right Side */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 rounded-full bg-white/30 border border-white/50" />
                <h3 className="text-lg font-bold text-white leading-tight">{currentProject.title}</h3>
              </div>
              
              <div className="flex items-center justify-start">
                <span 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentProject.status === 'Active' ? 'bg-white/20 text-white' :
                    currentProject.status === 'Completed' ? 'bg-white/15 text-white/90' :
                    'bg-white/10 text-white/80'
                  }`}
                >
                  {currentProject.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-white/80 font-medium">{currentProject.category}</span>
                <span className="text-white/50">•</span>
                <div className="flex items-center gap-1 text-white/70">
                  <Calendar size={14} />
                  <span className="text-sm">{currentProject.year}</span>
                </div>
              </div>
              
              <p className="text-white/80 leading-relaxed">
                {currentProject.description}
              </p>
              
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-400" size={18} />
                <span className="text-white font-medium">{currentProject.impact}</span>
              </div>
              
              <div>
                <h5 className="text-base font-semibold text-white flex items-center gap-2 mb-3">
                  <Zap size={18} />
                  Technologies Used
                </h5>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/20 text-white/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {currentProject.link !== '#' && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
                  >
                    <ExternalLink size={18} />
                    Visit Project
                  </a>
                </motion.div>
              )}
            </div>
          </div>
          </motion.div>
        </div>


      </div>
    </section>
  )
} 