'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Float, Line, Ring, Sparkles, Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Code, Database, Cloud, Brain, Wrench, Users, Terminal, Cpu, Globe, Activity, Layers, Shield } from 'lucide-react'
import * as THREE from 'three'
import Barcode from './Barcode'

// --- Enhanced Data with "Cyber" flavor texts ---
const skillCategories = [
  {
    id: 1,
    name: "Programming Languages",
    icon: Code,
    description: "Core linguistic protocols for system architecture.",
    skills: [
      { name: "Python", level: 95, description: "Architecting robust data pipelines and scalable backends. Core engine for ML synthesis and algorithmic logic." },
      { name: "JavaScript", level: 90, description: "Driving dynamic client-side interactions. Specialized in ES6+ protocols and asynchronous event orchestration." },
      { name: "TypeScript", level: 85, description: "Enforcing type safety across large-scale codebases. Architecting resilient applications with static analysis." },
      { name: "R", level: 80, description: "Executing statistical modeling and complex data visualization. Optimized for analytical computations." },
      { name: "SQL", level: 90, description: "Optimizing relational data structures. Executing complex queries for high-volume data retrieval and integrity." },
      { name: "Java", level: 75, description: "Building enterprise-grade systems. Strong foundation in object-oriented architecture and JVM optimization." },
    ]
  },
  {
    id: 2,
    name: "AI & Machine Learning",
    icon: Brain,
    description: "Neural networks and predictive modeling engines.",
    skills: [
      { name: "TensorFlow", level: 95, description: "Constructing high-dimensional neural networks. Specialized in deep learning architectures and production deployment." },
      { name: "Keras", level: 90, description: "Rapid prototyping of neural layers. Streamlining model development and experimentation cycles." },
      { name: "scikit-learn", level: 85, description: "Implementing classic ML algorithms for regression, classification, and clustering tasks." },
      { name: "PySpark", level: 80, description: "Processing massive datasets via distributed computing. optimizing data throughput for ML pipelines." },
      { name: "Deep Learning", level: 90, description: "Advanced architecting of CNNs, RNNs, and Transformers for complex pattern recognition." },
      { name: "Computer Vision", level: 85, description: "Analyzing visual data streams. Implementing object detection and image segmentation models." },
    ]
  },
  {
    id: 3,
    name: "Cloud & Infrastructure",
    icon: Cloud,
    description: "Distributed systems and containerization protocols.",
    skills: [
      { name: "Azure", level: 90, description: "Deploying mission-critical cloud infrastructure. Expertise in Azure ML and serverless computing." },
      { name: "AWS", level: 80, description: "Managing scalable cloud resources. Utilizing core services for computation, storage, and networking." },
      { name: "Docker", level: 85, description: "Containerizing applications for consistent deployment. Isolating dependencies and runtime environments." },
      { name: "Kubernetes", level: 80, description: "Orchestrating container fleets. Automating deployment, scaling, and management of microservices." },
      { name: "Jenkins", level: 75, description: "Automating CI/CD pipelines. Ensuring continuous integration and delivery of code artifacts." },
      { name: "Microservices", level: 85, description: "Decoupling monolithic architectures. Designing loosely coupled services for scalability." },
    ]
  },
  {
    id: 4,
    name: "Data & Analytics",
    icon: Database,
    description: "Information processing and storage optimization.",
    skills: [
      { name: "PostgreSQL", level: 90, description: "Managing advanced relational databases. Optimizing schemas and indexing for performance." },
      { name: "Hadoop", level: 75, description: "Navigating the Hadoop ecosystem for big data storage and processing." },
      { name: "Dataiku", level: 80, description: "Streamlining data science workflows from exploration to production deployment." },
      { name: "Power BI", level: 85, description: "Visualizing complex datasets. Creating interactive dashboards for business intelligence." },
      { name: "Data Warehousing", level: 85, description: "Designing central repositories for integrated data. Supporting analytics and reporting." },
      { name: "ETL", level: 80, description: "Extracting, transforming, and loading data. Ensuring data quality and consistency." },
    ]
  },
  {
    id: 5,
    name: "Web Development",
    icon: Wrench,
    description: "Frontend interfaces and API connectivity.",
    skills: [
      { name: "React.js", level: 90, description: "Building component-based UIs. Managing state and lifecycle for responsive applications." },
      { name: "Next.js", level: 85, description: "Leveraging server-side rendering and static site generation for performance optimization." },
      { name: "Flask", level: 80, description: "Developing lightweight backend services. Creating RESTful endpoints with Python." },
      { name: "Node.js", level: 75, description: "Executing JavaScript on the server. Building scalable network applications." },
      { name: "REST APIs", level: 90, description: "Designing standard interface contracts. Enabling seamless communication between systems." },
      { name: "GraphQL", level: 70, description: "Querying data with precision. Reducing over-fetching and optimizing network requests." },
    ]
  },
  {
    id: 6,
    name: "Project Management",
    icon: Users,
    description: "Team leadership and workflow methodologies.",
    skills: [
      { name: "Agile", level: 90, description: "Iterative development methodology. Focusing on flexibility and continuous improvement." },
      { name: "Scrum", level: 85, description: "Facilitating sprint cycles. Managing backlogs and ensuring team velocity." },
      { name: "Kanban", level: 80, description: "Visualizing workflow states. Optimizing work-in-progress to reduce bottlenecks." },
      { name: "Jira", level: 85, description: "Tracking issues and project progress. configuring workflows for team efficiency." },
      { name: "Leadership", level: 90, description: "Guiding technical direction. Mentoring team members and fostering a collaborative culture." },
      { name: "Team Building", level: 85, description: "Cultivating high-performing teams. Bridging gaps between technical and non-technical stakeholders." },
    ]
  }
]

// --- 3D Components ---

function SkillNode({ position, skill, isActive, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Idle rotation
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.01
      
      // Active pulse
      if (isActive) {
         const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
         meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
      } else {
         const targetScale = hovered ? 1.2 : 1
         meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
         {/* Core Node */}
         <mesh ref={meshRef}>
           <icosahedronGeometry args={[0.6, 1]} />
           <meshBasicMaterial 
             color={isActive || hovered ? "#FF2A2A" : "#000"} 
             wireframe 
             transparent 
             opacity={isActive ? 0.8 : 0.15} 
           />
         </mesh>

         {/* Active/Hover Glow Effect */}
         {(isActive || hovered) && (
           <mesh>
             <icosahedronGeometry args={[0.3, 0]} />
             <meshBasicMaterial color="#FF2A2A" transparent opacity={0.8} />
           </mesh>
         )}

         {/* Orbiting Ring for Active Node */}
         {isActive && (
            <group rotation={[Math.PI / 2, 0, 0]}>
              <Ring args={[0.9, 0.95, 32]} receiveShadow={false} castShadow={false}>
                 <meshBasicMaterial color="#FF2A2A" transparent opacity={0.5} side={THREE.DoubleSide} />
              </Ring>
            </group>
         )}

         {/* Label */}
         <Html position={[0, -1, 0]} center distanceFactor={10} zIndexRange={[100, 0]}>
            <div 
              className={`text-xs font-mono uppercase tracking-wider transition-all duration-300 pointer-events-none whitespace-nowrap
                ${isActive ? 'text-[var(--color-danger)] font-bold text-sm' : 'text-gray-500'}`}
            >
              {skill.name}
            </div>
         </Html>
      </group>
    </Float>
  )
}

function ConnectionLine({ start, end, isActive }: { start: [number, number, number], end: [number, number, number], isActive: boolean }) {
  return (
    <Line
      points={[start, end]}
      color={isActive ? "#FF2A2A" : "#000"}
      opacity={isActive ? 0.6 : 0.1}
      transparent
      lineWidth={isActive ? 2 : 1}
    />
  )
}

function CentralHub({ isActive }: { isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.01
      meshRef.current.rotation.z += 0.005
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="black" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3]} />
        <meshBasicMaterial color="black" />
      </mesh>
      {/* Inner Pulse */}
      <mesh scale={[0.8, 0.8, 0.8]}>
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color={isActive ? "#FF2A2A" : "#333"} />
      </mesh>
    </group>
  )
}

function SkillsScene({ activeCategory, activeSkill, setActiveSkill }: any) {
  const category = skillCategories.find(cat => cat.id === activeCategory) || skillCategories[0]
  
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
      
      <Sparkles count={40} scale={10} size={2} speed={0.4} opacity={0.2} color="#000" />

      <CentralHub isActive={!!activeSkill} />
      
      {/* Skill Nodes */}
      {category.skills.map((skill, i) => {
        const angle = (i / category.skills.length) * Math.PI * 2
        const radius = 4
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const isActive = activeSkill === skill.name
        
        return (
          <group key={skill.name}>
             <ConnectionLine start={[0, 0, 0]} end={[x, 0, z]} isActive={isActive} />
             <SkillNode 
               position={[x, 0, z]} 
               skill={skill} 
               isActive={isActive}
               onClick={() => setActiveSkill(skill.name)}
             />
          </group>
        )
      })}

      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        enablePan={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

// --- Main Component ---

export default function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState(1)
  const [activeSkill, setActiveSkill] = useState('')
  
  const currentCategory = skillCategories.find(cat => cat.id === activeCategory) || skillCategories[0]
  const currentSkillData = currentCategory.skills.find(s => s.name === activeSkill)
  
  // Effect to select first skill when category changes (optional, but good for UX)
  useEffect(() => {
    if (currentCategory.skills.length > 0) {
      setActiveSkill(currentCategory.skills[0].name)
    }
  }, [activeCategory])

  const Icon = currentCategory.icon

  return (
    <section className="min-h-screen bg-[var(--color-background)] py-24 relative overflow-hidden" id="skills">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-[var(--color-danger)] bg-[var(--color-surface)] rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-[var(--color-danger)]/5 animate-pulse"></div>
              <div className="w-2 h-2 bg-[var(--color-danger)] animate-[ping_1.5s_infinite]" />
              <span className="relative z-10 text-[var(--color-danger)] font-mono text-xs uppercase tracking-widest">System_Grid_Active</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-black uppercase tracking-tighter">
              Core<span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">Competencies</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <div className="flex flex-col items-end gap-1">
               <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                     <div key={i} className="w-1 h-4 bg-black/20 animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
               </div>
               <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Current Module</div>
               <div className="text-xl font-display font-bold text-black">{currentCategory.name}</div>
               <div className="text-sm text-gray-500 font-mono">{currentCategory.description}</div>
            </div>
          </div>
        </div>

        {/* Main Interface Grid */}
        <div className="grid lg:grid-cols-12 gap-6 h-[750px] relative">
           {/* Background Circuit Lines */}
           <div className="absolute inset-0 pointer-events-none opacity-10 z-0 hidden lg:block">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                 <path d="M 10 10 H 200 V 50" stroke="black" fill="none" strokeWidth="1" />
                 <path d="M 10 740 H 100 V 700" stroke="black" fill="none" strokeWidth="1" />
                 <circle cx="200" cy="50" r="2" fill="black" />
                 <circle cx="100" cy="700" r="2" fill="black" />
              </svg>
           </div>
          
           {/* Left: Category Selection (Tactical Menu) */}
           <div className="lg:col-span-2 flex flex-col gap-2">
             <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2 pl-1">Select_Protocol</div>
             {skillCategories.map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => { setActiveCategory(cat.id); setActiveSkill('') }}
                 className={`group relative w-full text-left px-4 py-3 text-sm font-mono uppercase tracking-wider transition-all border-l-2
                   ${activeCategory === cat.id 
                     ? 'bg-black text-white border-[var(--color-danger)]' 
                     : 'bg-[var(--color-surface)] text-gray-500 border-gray-300 hover:bg-white hover:text-black hover:border-black'
                   }`}
               >
                 <span className="relative z-10 flex items-center justify-between">
                   <span>{cat.name}</span>
                   {activeCategory === cat.id && <Activity size={14} className="text-[var(--color-danger)] animate-pulse" />}
                 </span>
                 {/* Hover Glitch Effect overlay could go here */}
               </button>
             ))}
           </div>

           {/* Center: 3D Visualization */}
           <div className="lg:col-span-7 relative bg-[#f0f0f0] border border-black/10 shadow-inner overflow-hidden group">
              {/* Radar Sweep Animation */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-black rounded-full animate-[spin_10s_linear_infinite] border-dashed"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-black/50 rounded-full"></div>
              </div>

              {/* Decorative Technical Lines - Moved to background (z-0) */}
              <div className="absolute top-4 left-4 w-32 h-[1px] bg-black/20 z-0 pointer-events-none" />
              <div className="absolute top-4 left-4 h-8 w-[1px] bg-black/20 z-0 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-32 h-[1px] bg-black/20 z-0 pointer-events-none" />
              <div className="absolute bottom-4 right-4 h-8 w-[1px] bg-black/20 z-0 pointer-events-none" />
              
              {/* New Tech Accents */}
              <div className="absolute top-4 right-4 flex gap-1 z-0">
                 <div className="w-1 h-1 bg-black/20"></div>
                 <div className="w-1 h-1 bg-black/20"></div>
                 <div className="w-1 h-1 bg-[var(--color-danger)]/40"></div>
              </div>
              <div className="absolute bottom-4 left-24 w-24 h-[1px] bg-black/10 z-0"></div>
              <div className="absolute bottom-4 left-[calc(6rem+6rem)] w-2 h-[1px] bg-black/10 z-0"></div>

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />

              <div className="relative z-10 w-full h-full">
                <Canvas camera={{ position: [0, 6, 8], fov: 45 }}>
                   <SkillsScene 
                     activeCategory={activeCategory} 
                     activeSkill={activeSkill} 
                     setActiveSkill={setActiveSkill}
                   />
                </Canvas>
              </div>
              
              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-gray-400 pointer-events-none z-20">
                ROTATION: ACTIVE<br/>
                ZOOM: LOCKED<br/>
                RENDER: WEBGL
              </div>
           </div>

           {/* Right: Data Analysis Panel (HUD) */}
           <div className="lg:col-span-3 bg-black text-white p-1 flex flex-col">
              <div className="h-full border border-[var(--color-surface)]/20 p-6 flex flex-col relative overflow-hidden">
                {/* HUD Background details */}
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  <Icon size={120} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-8 border-b border-white/20 pb-4">
                     <span className="text-xs font-mono text-[var(--color-danger)] uppercase tracking-widest">Analysis_Stream</span>
                     <span className="text-xs font-mono text-gray-500">{activeSkill ? 'TARGET_LOCKED' : 'IDLE'}</span>
                  </div>

                  <AnimatePresence mode='wait'>
                    {currentSkillData ? (
                      <motion.div
                        key={currentSkillData.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col"
                      >
                         <h3 className="text-4xl font-display font-bold text-white mb-1 tracking-tighter">
                           {currentSkillData.name}
                         </h3>
                         <div className="text-xs font-mono text-[var(--color-danger)] mb-6">// PROFICIENCY_LEVEL: {currentSkillData.level}%</div>

                         {/* Progress Bar */}
                         <div className="w-full h-1 bg-white/10 mb-8 relative overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${currentSkillData.level}%` }}
                              transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
                              className="h-full bg-[var(--color-danger)]"
                            />
                         </div>

                         {/* Typewriter Effect Description */}
                         <div className="flex-1">
                           <p className="text-gray-300 leading-relaxed font-mono text-sm border-l-2 border-[var(--color-danger)] pl-4">
                             {currentSkillData.description}
                           </p>
                         </div>
                         
                         {/* Stats Grid (Flavor) */}
                         <div className="grid grid-cols-2 gap-2 mt-8 pt-8 border-t border-white/10">
                            <div className="bg-white/5 p-2 relative overflow-hidden">
                               <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Projects</div>
                               <div className="text-lg font-display">{Math.floor(currentSkillData.level / 5)}+</div>
                               <div className="absolute bottom-2 right-2 opacity-30">
                                  <Barcode width="w-12" height="h-4" color="bg-white" />
                               </div>
                            </div>
                            <div className="bg-white/5 p-2 relative overflow-hidden">
                               <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Experience</div>
                               <div className="text-lg font-display">{Math.floor(currentSkillData.level / 20)} YRS</div>
                               <div className="absolute bottom-2 right-2 opacity-30">
                                  <Barcode width="w-12" height="h-4" color="bg-white" />
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                         <div className="animate-pulse mb-4">
                            <Terminal size={40} />
                         </div>
                         <div className="font-mono text-xs uppercase tracking-widest">Select a node<br/>to initiate scan</div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  )
}
