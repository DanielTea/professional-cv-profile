'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, Text, Box } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Trophy } from 'lucide-react'
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
    position: [-6, 0, 0] as [number, number, number],
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
    position: [-2, 0, 0] as [number, number, number],
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
    position: [2, 0, 0] as [number, number, number],
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
    position: [6, 0, 0] as [number, number, number],
    link: "#"
  }
]

// Mouse interaction handler
function MouseController({ setActiveProject }: { setActiveProject: (id: number) => void }) {
  const { mouse, raycaster, camera, scene } = useThree()
  const mouseMarkerRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    // Update raycaster with current mouse position
    raycaster.setFromCamera(mouse, camera)
    
    // Find intersection with ground plane
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const target = new THREE.Vector3()
    raycaster.ray.intersectPlane(groundPlane, target)
    
    if (target && mouseMarkerRef.current) {
      // Smoothly move marker to mouse position on ground
      mouseMarkerRef.current.position.lerp(target, 0.2)
      
      // Check proximity to projects to trigger active state
      projects.forEach(p => {
        const dist = Math.sqrt(Math.pow(target.x - p.position[0], 2) + Math.pow(target.z - p.position[2], 2))
        if (dist < 2.0) {
          setActiveProject(p.id)
        }
      })
    }
  })

  return (
    <mesh ref={mouseMarkerRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
      <ringGeometry args={[0.4, 0.5, 32]} />
      <meshBasicMaterial color="#FF2A2A" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  )
}

function ProjectPlatform({ project, isActive, onClick }: { 
  project: typeof projects[0], 
  isActive: boolean, 
  onClick: () => void 
}) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Hover animation
      meshRef.current.position.y = project.position[1] + Math.sin(state.clock.elapsedTime + project.id) * 0.1
      
      if (isActive) {
         meshRef.current.rotation.y += 0.01
      } else {
         // Reset rotation slowly
         meshRef.current.rotation.y *= 0.95
      }
    }
  })

  return (
    <group ref={meshRef} position={project.position} onClick={onClick}>
      {/* Holographic Base - Dark wireframe */}
      <Box args={[2.5, 0.1, 2.5]}>
        <meshBasicMaterial color={isActive ? "#000" : "#999"} wireframe />
      </Box>
      
      {/* Floating Cube - Concrete/White material */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={isActive ? "#fff" : "#eee"} 
            wireframe={!isActive}
            metalness={0.1}
            roughness={0.8}
          />
          {/* Outline for cube */}
          {isActive && (
             <lineSegments>
               <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
               <lineBasicMaterial color="black" linewidth={2} />
             </lineSegments>
          )}
        </mesh>
      </Float>

      {/* Project Title */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.15}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
      
      {/* Active Indicator Beam */}
      {isActive && (
        <mesh position={[0, 5, 0]} rotation={[0, 0, Math.PI]}>
           <coneGeometry args={[1.2, 10, 32, 1, true]} />
           <meshBasicMaterial color="#FF2A2A" transparent opacity={0.05} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

function Scene({ activeProject, setActiveProject }: any) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#FF2A2A" distance={10} />
      
      {/* Grid Floor - Dark lines */}
      <gridHelper args={[100, 50, "#333", "#ccc"]} position={[0, 0, 0]} />
      
      <MouseController setActiveProject={setActiveProject} />
      
      {projects.map((project) => (
        <ProjectPlatform
          key={project.id}
          project={project}
          isActive={activeProject === project.id}
          onClick={() => setActiveProject(project.id)}
        />
      ))}
      
      <Environment preset="city" />
      {/* Fog to blend floor into background */}
      <fog attach="fog" args={['#E6E6E6', 5, 30]} />
    </>
  )
}

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(1)
  const currentProject = projects.find(p => p.id === activeProject) || projects[0]

  return (
    <section className="min-h-screen bg-[var(--color-background)] py-20 relative" id="projects">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-12 border-b border-black/20 pb-4">
           <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[var(--color-danger)]" />
              <span className="text-[var(--color-danger)] font-mono text-xs tracking-widest">PROJECT_DATABASE</span>
           </div>
           <h2 className="text-5xl font-display font-bold text-black uppercase">Feature<span className="text-gray-500">Set</span></h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive View */}
          <div className="lg:col-span-2 h-[500px] border border-black/20 bg-[var(--color-surface)] relative shadow-inner overflow-hidden">
             <div className="absolute top-4 left-4 text-xs font-mono text-[var(--color-danger)] z-10">
                SYSTEM_VIEW_01 // INTERACTIVE
             </div>
             <Canvas camera={{ position: [0, 4, 12], fov: 45 }}>
               <Scene 
                 activeProject={activeProject} 
                 setActiveProject={setActiveProject}
               />
             </Canvas>
             
             {/* Interaction hint */}
             <div className="absolute bottom-4 left-4 text-xs font-mono text-gray-500">
                HOVER TO SCAN // CLICK TO SELECT
             </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1 bg-[var(--color-surface)] border border-black p-6 relative shadow-xl">
             <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-black" />
             
             {/* Decorative Project Lines */}
             <div className="absolute -left-1 top-10 w-1 h-12 bg-[var(--color-volt)]"></div>
             <div className="absolute right-6 top-6 w-12 h-12 border border-black/10 rounded-full flex items-center justify-center">
                <div className="w-full h-[1px] bg-black/10 -rotate-45"></div>
             </div>
             
             <div className="font-mono text-xs text-gray-500 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-black"></span>
                PROJECT_ID: {currentProject.id.toString().padStart(2, '0')}
             </div>
             
             <h3 className="text-2xl font-display font-bold text-black mb-2 uppercase">{currentProject.title}</h3>
             <div className="text-black font-mono text-sm mb-6 font-bold">{currentProject.category}</div>
             
             <p className="text-gray-600 font-sans mb-6 leading-relaxed border-l border-black/20 pl-4">
               {currentProject.description}
             </p>
             
             <div className="mb-6">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">IMPACT_METRICS</div>
                <div className="text-black font-bold flex items-center gap-2">
                   <Trophy size={16} className="text-[var(--color-danger)]" />
                   {currentProject.impact}
                </div>
             </div>

             <div>
                <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">SYSTEMS</div>
                <div className="flex flex-wrap gap-2">
                   {currentProject.technologies.map((tech, i) => (
                     <span key={i} className="text-xs border border-black/20 px-2 py-1 text-gray-600 bg-white">{tech}</span>
                   ))}
                </div>
             </div>
             
             {currentProject.link !== '#' && (
               <a 
                 href={currentProject.link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="block w-full mt-8 bg-black text-white text-center py-3 font-bold uppercase hover:bg-[var(--color-danger)] transition-colors chamfered"
               >
                 Access Project
               </a>
             )}
          </div>
        </div>
      </div>
    </section>
  )
}
