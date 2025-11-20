'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, Text, Box, PerspectiveCamera, useTexture, Stars, Plane } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Trophy, ExternalLink, Terminal, Activity, Crosshair } from 'lucide-react'
import * as THREE from 'three'
import RandomNumber from './RandomNumber'
import Barcode from './Barcode'

// --- Enhanced Data ---
const projects = [
  {
    id: 1,
    title: "control-f GmbH",
    category: "Enterprise AI Architecture",
    description: "Architecting a proprietary AI ecosystem. Delivering scalable machine learning solutions and data infrastructure for global enterprise clients. Leading technical strategy and engineering teams.",
    technologies: ["Python", "TensorFlow", "React", "AWS", "Docker"],
    impact: "Serving 100+ Global Clients",
    status: "ONLINE",
    position: [-6, 0, 0] as [number, number, number],
    link: "https://controlf.io",
    color: "#FF2A2A"
  },
  {
    id: 2,
    title: "Porsche Data Pipeline",
    category: "Big Data Processing",
    description: "Engineered a high-throughput vehicle data analysis pipeline using PySpark on Azure. Optimized for processing millions of telemetry points for predictive maintenance and R&D.",
    technologies: ["PySpark", "Azure Databricks", "Delta Lake", "Scala"],
    impact: "processed 50TB+ Vehicle Data",
    status: "ARCHIVED",
    position: [-2, 0, 0] as [number, number, number],
    link: "#",
    color: "#00A3FF"
  },
  {
    id: 3,
    title: "MBition Infotainment",
    category: "Embedded Systems",
    description: "Spearheaded R&D for the next-generation Mercedes-Benz User Experience (MBUX). Integrated dynamic content platforms into safety-critical automotive systems.",
    technologies: ["C++", "Yocto Linux", "Qt/QML", "System Architecture"],
    impact: "Deployed in 500k+ Vehicles",
    status: "DEPLOYED",
    position: [2, 0, 0] as [number, number, number],
    link: "#",
    color: "#00FF94"
  },
  {
    id: 4,
    title: "Maneuver Detection",
    category: "Deep Learning Research",
    description: "Academic research on autonomous driving behavior classification. Implemented LSTM and CNN architectures to detect complex driving maneuvers with high precision.",
    technologies: ["Keras", "Pandas", "Deep Learning", "Neural Networks"],
    impact: "95% Detection Accuracy",
    status: "PUBLISHED",
    position: [6, 0, 0] as [number, number, number],
    link: "#",
    color: "#DFFF00"
  }
]

// --- 3D Components ---

// Futuristic holographic platform
function HolographicBase({ isActive, color }: { isActive: boolean, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.005
      meshRef.current.rotation.z = isActive 
         ? meshRef.current.rotation.z + 0.02 
         : meshRef.current.rotation.z
    }
  })

  return (
    <group position={[0, -1, 0]}>
       {/* Outer Ring */}
       <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2, 64]} />
          <meshBasicMaterial color={isActive ? color : "#333"} transparent opacity={0.4} side={THREE.DoubleSide} />
       </mesh>
       {/* Inner Rotating Hexagon */}
       <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5, 6]} />
          <meshBasicMaterial color={isActive ? color : "#111"} wireframe transparent opacity={0.1} />
       </mesh>
       {/* Grid Floor Glow */}
       {isActive && (
          <pointLight position={[0, 1, 0]} color={color} intensity={2} distance={5} />
       )}
    </group>
  )
}

// Floating project artifact
function ProjectArtifact({ isActive, color }: { isActive: boolean, color: string }) {
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={1}>
      <group position={[0, 1, 0]}>
         <mesh>
           <octahedronGeometry args={[0.8, 0]} />
           <meshStandardMaterial 
             color={isActive ? "#fff" : "#888"} 
             wireframe
             emissive={isActive ? color : "#000"}
             emissiveIntensity={0.5}
           />
         </mesh>
         {/* Inner Core */}
         <mesh scale={0.5}>
           <octahedronGeometry args={[0.8, 0]} />
           <meshBasicMaterial color={isActive ? color : "#000"} />
         </mesh>
      </group>
    </Float>
  )
}

// Drone-like Camera Controller
function DroneController({ targetPosition, isInitial }: { targetPosition: [number, number, number], isInitial: boolean }) {
  const { camera } = useThree()
  const vec = new THREE.Vector3()
  
  useFrame((state, delta) => {
    // Smoothly interpolate camera position
    // Target x is the project position, y is slightly up, z is back
    const targetX = targetPosition[0]
    
    if (isInitial) {
        // Wide shot to see everything
        vec.set(0, 5, 15)
        camera.lookAt(0, 0, 0)
    } else {
        // Move camera to "look at" the project from a dynamic angle
        vec.set(targetX, 2, 8) 
        camera.lookAt(targetX, 0.5, 0)
    }

    camera.position.lerp(vec, delta * 2)
  })
  
  return null
}

function ProjectNode({ project, isActive, setActiveProject }: any) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      const hoverY = Math.sin(state.clock.elapsedTime * 2 + project.id) * 0.1
      groupRef.current.position.y = project.position[1] + hoverY
    }
  })

  return (
    <group 
      ref={groupRef} 
      position={project.position} 
      onClick={() => setActiveProject(project.id)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <HolographicBase isActive={isActive || hovered} color={project.color} />
      <ProjectArtifact isActive={isActive || hovered} color={project.color} />
      
      {/* Connection Beam */}
      <mesh position={[0, 25, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 50]} />
        <meshBasicMaterial color={isActive ? project.color : "#333"} transparent opacity={0.2} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.25}
        color="black"
        anchorX="center"
        anchorY="middle"
        // removed font prop to use default font and avoid 404
      >
        {project.title.toUpperCase()}
      </Text>
    </group>
  )
}

function Scene({ activeProject, setActiveProject, isInitial }: any) {
  const currentProject = projects.find(p => p.id === activeProject) || projects[0]

  return (
    <>
      <DroneController targetPosition={currentProject.position} isInitial={isInitial} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Atmosphere - Adjusted radius to cover frustum corners */}
      <Stars radius={300} depth={100} count={5000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={['#E6E6E6', 5, 80]} /> 

      {/* Infinite Grid Floor - Massive Scale */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
         <planeGeometry args={[1000, 1000]} />
         <meshBasicMaterial color="#E6E6E6" />
      </mesh>
      <gridHelper args={[1000, 500, "#000000", "#cccccc"]} position={[0, -2, 0]} />

      {projects.map((project) => (
        <ProjectNode
          key={project.id}
          project={project}
          isActive={activeProject === project.id}
          setActiveProject={setActiveProject}
        />
      ))}
    </>
  )
}

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(1)
  const [isInitial, setIsInitial] = useState(true)
  const currentProject = projects.find(p => p.id === activeProject) || projects[0]

  // Auto-select first project and handle interaction state
  useEffect(() => {
      const timer = setTimeout(() => {
          setIsInitial(false)
      }, 2000)
      return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen bg-[var(--color-background)] py-24 relative overflow-hidden" id="projects">
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 border-b border-black/10 pb-6">
           <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-[var(--color-volt)] rounded-full animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-gray-500"> drone_recon_active //</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-black tracking-tighter">
                Project<span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">Index</span>
              </h2>
           </div>
           <div className="hidden md:flex items-center gap-4 font-mono text-xs text-gray-400">
              <span>SYS.STATUS: OPTIMAL</span>
              <span>LATENCY: <RandomNumber min={8} max={24} decimals={0} suffix="ms" interval={800} /></span>
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-0 border border-black/10 bg-white shadow-2xl">
           
           {/* Left: 3D Viewport (Drone Feed) */}
           <div className="lg:col-span-8 min-h-[600px] h-full relative bg-gray-100 overflow-hidden group">
              {/* Moving Scanline */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-volt)]/30 z-20 animate-[scan_3s_linear_infinite] shadow-[0_0_15px_var(--color-volt)]"></div>

              {/* HUD Overlays */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-1">
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[var(--color-danger)] uppercase tracking-widest bg-black/5 px-2 py-1 border border-[var(--color-danger)]/20">
                       LIVE_FEED :: CAM_01
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[var(--color-danger)] animate-pulse"></div>
                 </div>
                 <span className="text-2xl font-display font-bold text-black opacity-20">
                    {currentProject.id.toString().padStart(2, '0')}
                 </span>
              </div>
              
              {/* Top Right Metrics */}
              <div className="absolute top-6 right-6 z-10 flex flex-col items-end gap-1 font-mono text-[10px] text-gray-500">
                  <div className="flex items-center gap-2 mb-1">
                    <Barcode width="w-16" height="h-2" color="bg-black/40" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>BAT</span>
                    <div className="flex gap-[1px]">
                       <div className="w-1 h-2 bg-black"></div>
                       <div className="w-1 h-2 bg-black"></div>
                       <div className="w-1 h-2 bg-black"></div>
                       <div className="w-1 h-2 bg-black/20"></div>
                    </div>
                  </div>
                  <div>SIG: <RandomNumber min={85} max={99} decimals={0} suffix="%" interval={1500} /></div>
                  <div>ENC: AES-256</div>
              </div>

              {/* Tech Borders */}
              <div className="absolute inset-4 border border-black/5 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black/20"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black/20"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black/20"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black/20"></div>
                  
                  {/* Center Crosshair Lines */}
                  <div className="absolute top-1/2 left-0 w-4 h-[1px] bg-black/40"></div>
                  <div className="absolute top-1/2 right-0 w-4 h-[1px] bg-black/40"></div>
                  <div className="absolute top-0 left-1/2 h-4 w-[1px] bg-black/40"></div>
                  <div className="absolute bottom-0 left-1/2 h-4 w-[1px] bg-black/40"></div>
                  
                  {/* Inner Brackets */}
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 border-t border-l border-black/10"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-2 h-2 border-b border-r border-black/10"></div>
              </div>
              
              {/* Crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-30">
                 <Crosshair size={40} strokeWidth={1} />
              </div>

              <div className="absolute bottom-6 right-6 z-10 text-right">
                 <div className="text-[10px] font-mono text-gray-500 mb-1">COORDINATES</div>
                 <div className="font-mono text-xs text-black">
                    X: {currentProject.position[0].toFixed(2)} <span className="text-gray-400">±<RandomNumber min={0} max={0.05} decimals={3} interval={100} /></span><br/>
                    Y: {currentProject.position[1].toFixed(2)} <span className="text-gray-400">±<RandomNumber min={0} max={0.05} decimals={3} interval={120} /></span><br/>
                    Z: {currentProject.position[2].toFixed(2)} <span className="text-gray-400">±<RandomNumber min={0} max={0.05} decimals={3} interval={140} /></span>
                 </div>
              </div>

              {/* Interactive Canvas */}
              <Canvas shadows dpr={[1, 2]}>
                 <Scene activeProject={activeProject} setActiveProject={(id: number) => { setActiveProject(id); setIsInitial(false); }} isInitial={isInitial} />
              </Canvas>
              
              {/* Vignette & Grain for Camera Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]" />
              {/* Removed noise.png background to avoid 404 */}
              <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '4px 4px' }}></div>
           </div>

           {/* Right: Data Terminal */}
           <div className="lg:col-span-4 bg-black text-white p-8 flex flex-col relative overflow-hidden">
              {/* Background Tech Decoration */}
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                 <Terminal size={200} />
              </div>

              <div className="relative z-10 flex-1 flex flex-col">
                 {/* Status Header */}
                 <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-8">
                    <div className="flex items-center gap-2">
                       <Activity size={14} className="text-[var(--color-volt)]" />
                       <span className="font-mono text-xs text-[var(--color-volt)]">DATA_STREAM</span>
                    </div>
                    <span className="font-mono text-xs text-gray-500">SECURE</span>
                 </div>

                 <AnimatePresence mode='wait'>
                    <motion.div
                      key={currentProject.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1"
                    >
                       <div className="inline-block px-2 py-1 bg-[var(--color-surface)] text-black text-[10px] font-bold uppercase mb-4 font-mono">
                          {currentProject.category}
                       </div>
                       
                       <h3 className="text-3xl font-display font-bold mb-6 leading-none tracking-wide text-white">
                          {currentProject.title}
                       </h3>

                       <div className="space-y-6 font-mono text-sm text-gray-400">
                          <div>
                             <span className="text-[10px] uppercase tracking-widest text-gray-600 block mb-2">Description</span>
                             <p className="leading-relaxed text-gray-300 border-l-2 border-[var(--color-volt)] pl-3">
                                {currentProject.description}
                             </p>
                          </div>

                          <div>
                             <span className="text-[10px] uppercase tracking-widest text-gray-600 block mb-2">Stack</span>
                             <div className="flex flex-wrap gap-2">
                                {currentProject.technologies.map((tech, i) => (
                                  <span key={i} className="px-2 py-1 border border-white/20 text-xs text-gray-300">
                                     {tech}
                                  </span>
                                ))}
                             </div>
                          </div>

                          <div>
                             <span className="text-[10px] uppercase tracking-widest text-gray-600 block mb-2">Impact</span>
                             <div className="flex items-center gap-2 text-white font-bold">
                                <Trophy size={14} className="text-[var(--color-volt)]" />
                                {currentProject.impact}
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 </AnimatePresence>

                 {/* Action Button */}
                 <div className="mt-auto pt-8">
                    <a 
                      href={currentProject.link}
                      className={`flex items-center justify-between w-full px-6 py-4 border border-white/20 transition-all group
                        ${currentProject.link !== '#' ? 'hover:bg-[var(--color-volt)] hover:border-[var(--color-volt)] hover:text-black cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                    >
                       <span className="font-bold font-display uppercase tracking-wider">
                          {currentProject.link !== '#' ? 'Execute Protocol' : 'Access Restricted'}
                       </span>
                       <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  )
}
