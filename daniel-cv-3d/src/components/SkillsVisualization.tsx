'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Code, Database, Cloud, Brain, Wrench, Users } from 'lucide-react'
import * as THREE from 'three'
import ScrollHighlight from './ScrollHighlight'

const skillCategories = [
  {
    id: 1,
    name: "Programming Languages",
    icon: Code,
    skills: [
      { name: "Python", level: 95, description: "Expert in Python for data science, machine learning, and backend development." },
      { name: "JavaScript", level: 90, description: "Advanced JavaScript developer with expertise in modern ES6+ features." },
      { name: "TypeScript", level: 85, description: "Experienced in TypeScript for building type-safe applications." },
      { name: "R", level: 80, description: "Proficient in R for statistical analysis and visualization." },
      { name: "SQL", level: 90, description: "Advanced SQL expertise for complex queries and optimization." },
      { name: "Java", level: 75, description: "Solid Java foundation with enterprise experience." },
    ]
  },
  {
    id: 2,
    name: "AI & Machine Learning",
    icon: Brain,
    skills: [
      { name: "TensorFlow", level: 95, description: "Expert in TensorFlow for deep learning models." },
      { name: "Keras", level: 90, description: "Advanced proficiency in Keras for rapid prototyping." },
      { name: "scikit-learn", level: 85, description: "Experienced in traditional ML algorithms." },
      { name: "PySpark", level: 80, description: "Skilled in PySpark for big data processing." },
      { name: "Deep Learning", level: 90, description: "Comprehensive knowledge of CNNs, RNNs, and Transformers." },
      { name: "Computer Vision", level: 85, description: "Proficient in CV techniques and models." },
    ]
  },
  {
    id: 3,
    name: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      { name: "Azure", level: 90, description: "Advanced Azure expertise including Azure ML." },
      { name: "AWS", level: 80, description: "Solid AWS experience with core services." },
      { name: "Docker", level: 85, description: "Proficient in containerization." },
      { name: "Kubernetes", level: 80, description: "Experienced in K8s orchestration." },
      { name: "Jenkins", level: 75, description: "Proficient in Jenkins CI/CD." },
      { name: "Microservices", level: 85, description: "Skilled in microservices architecture." },
    ]
  },
  {
    id: 4,
    name: "Data & Analytics",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 90, description: "Advanced PostgreSQL expertise." },
      { name: "Hadoop", level: 75, description: "Experienced in Hadoop ecosystem." },
      { name: "Dataiku", level: 80, description: "Proficient in Dataiku workflows." },
      { name: "Power BI", level: 85, description: "Advanced Power BI skills." },
      { name: "Data Warehousing", level: 85, description: "Skilled in DW design." },
      { name: "ETL", level: 80, description: "Proficient in ETL processes." },
    ]
  },
  {
    id: 5,
    name: "Web Development",
    icon: Wrench,
    skills: [
      { name: "React.js", level: 90, description: "Advanced React.js expertise." },
      { name: "Next.js", level: 85, description: "Proficient in Next.js framework." },
      { name: "Flask", level: 80, description: "Skilled in Flask for APIs." },
      { name: "Node.js", level: 75, description: "Experienced in Node.js backend." },
      { name: "REST APIs", level: 90, description: "Expert in RESTful API design." },
      { name: "GraphQL", level: 70, description: "Familiar with GraphQL." },
    ]
  },
  {
    id: 6,
    name: "Project Management",
    icon: Users,
    skills: [
      { name: "Agile", level: 90, description: "Advanced Agile methodology expertise." },
      { name: "Scrum", level: 85, description: "Experienced Scrum practitioner." },
      { name: "Kanban", level: 80, description: "Skilled in Kanban workflow." },
      { name: "Jira", level: 85, description: "Proficient in Jira management." },
      { name: "Leadership", level: 90, description: "Strong technical leadership skills." },
      { name: "Team Building", level: 85, description: "Experienced in team development." },
    ]
  }
]

function SkillNode({ position, skill, isActive, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      
      if (isActive) {
         meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 5) * 0.1)
      } else {
         meshRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group position={position} onClick={onClick}>
       <mesh ref={meshRef}>
         <icosahedronGeometry args={[0.8, 0]} />
         {/* Dark wireframes for light mode */}
         <meshBasicMaterial 
           color={isActive ? "#FF2A2A" : "#000"} 
           wireframe 
           transparent 
           opacity={isActive ? 1 : 0.2} 
         />
       </mesh>
       {isActive && (
         <mesh>
           <icosahedronGeometry args={[0.4, 0]} />
           <meshBasicMaterial color="#FF2A2A" />
         </mesh>
       )}
       <Text
         position={[0, -1.2, 0]}
         fontSize={0.2}
         color={isActive ? "#FF2A2A" : "black"}
         anchorX="center"
         anchorY="top"
       >
         {skill.name}
       </Text>
    </group>
  )
}

function SkillsScene({ activeCategory, activeSkill, setActiveSkill }: any) {
  const category = skillCategories.find(cat => cat.id === activeCategory) || skillCategories[0]
  
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
      <pointLight position={[-10, 10, 10]} intensity={1.5} color="#FF2A2A" distance={20} />
      
      {/* Central Hub */}
      <mesh>
         <sphereGeometry args={[0.2]} />
         <meshBasicMaterial color="black" />
      </mesh>
      
      {/* Skill Nodes */}
      {category.skills.map((skill, i) => {
        const angle = (i / category.skills.length) * Math.PI * 2
        const radius = 3.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <group key={skill.name}>
             {/* Connection Line */}
             <line>
                <bufferGeometry>
                   <bufferAttribute
                      attach="attributes-position"
                      count={2}
                      args={[new Float32Array([0, 0, 0, x, 0, z]), 3]}
                   />
                </bufferGeometry>
                <lineBasicMaterial color="#000" transparent opacity={0.2} />
             </line>
             
             <SkillNode 
               position={[x, 0, z]} 
               skill={skill} 
               isActive={activeSkill === skill.name}
               onClick={() => setActiveSkill(skill.name)}
             />
          </group>
        )
      })}

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState(1)
  const [activeSkill, setActiveSkill] = useState('')
  
  const currentCategory = skillCategories.find(cat => cat.id === activeCategory) || skillCategories[0]
  const currentSkillData = currentCategory.skills.find(s => s.name === activeSkill)

  return (
    <section className="min-h-screen bg-[var(--color-background)] py-20 relative" id="skills">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-[var(--color-danger)] bg-[var(--color-surface)] rounded-full">
            <div className="w-2 h-2 bg-[var(--color-danger)] animate-pulse" />
            <span className="text-[var(--color-danger)] font-mono text-xs uppercase tracking-widest">Neural_Link_Active</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-black uppercase">Core<span className="text-gray-500">Competencies</span></h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
           {skillCategories.map((cat) => (
             <button
               key={cat.id}
               onClick={() => { setActiveCategory(cat.id); setActiveSkill('') }}
               className={`px-4 py-2 text-sm font-mono uppercase tracking-wider border transition-all ${
                 activeCategory === cat.id 
                   ? 'bg-black text-white border-black font-bold' 
                   : 'bg-transparent text-gray-600 border-black/20 hover:border-black hover:text-black'
               }`}
             >
               [{cat.id}] {cat.name}
             </button>
           ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 h-[600px]">
           {/* 3D View */}
           <div className="lg:col-span-2 bg-[var(--color-surface)] border border-black/20 relative shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.05)_100%)] pointer-events-none" />
              <Canvas camera={{ position: [0, 5, 8], fov: 50 }}>
                 <SkillsScene 
                   activeCategory={activeCategory} 
                   activeSkill={activeSkill} 
                   setActiveSkill={setActiveSkill}
                 />
              </Canvas>
           </div>

           {/* Info Panel */}
           <div className="lg:col-span-1 bg-[var(--color-surface)] border border-black/20 p-6 flex flex-col justify-between shadow-xl">
              <div>
                 <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">// SKILL_ANALYSIS</div>
                 
                 {currentSkillData ? (
                   <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     key={currentSkillData.name}
                   >
                      <h3 className="text-3xl font-display font-bold text-black mb-2">
                        <ScrollHighlight>{currentSkillData.name}</ScrollHighlight>
                      </h3>
                      <div className="flex items-center gap-4 mb-6">
                         <div className="flex-1 h-2 bg-black/10">
                            <div 
                              className="h-full bg-[var(--color-danger)]" 
                              style={{ width: `${currentSkillData.level}%` }}
                            />
                         </div>
                         <div className="font-mono text-[var(--color-danger)] font-bold">{currentSkillData.level}%</div>
                      </div>
                      <p className="text-gray-700 leading-relaxed font-sans">
                        {currentSkillData.description}
                      </p>
                   </motion.div>
                 ) : (
                   <div className="text-gray-500 font-mono text-sm text-center py-10">
                      SELECT A NODE TO INITIATE SCAN
                   </div>
                 )}
              </div>

              <div className="border-t border-black/10 pt-4 mt-4">
                 <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">CATEGORY_NODES</div>
                 <div className="flex flex-wrap gap-2">
                    {currentCategory.skills.map(s => (
                      <button 
                        key={s.name}
                        onClick={() => setActiveSkill(s.name)}
                        className={`text-xs px-2 py-1 border ${activeSkill === s.name ? 'border-[var(--color-danger)] text-[var(--color-danger)] font-bold bg-white' : 'border-black/20 text-gray-600 hover:border-black hover:text-black'}`}
                      >
                        {s.name}
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  )
}
