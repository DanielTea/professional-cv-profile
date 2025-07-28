'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Environment, Text, Sphere, Torus } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Code, Database, Cloud, Brain, Wrench, Users } from 'lucide-react'
import * as THREE from 'three'

const skillCategories = [
  {
    id: 1,
    name: "Programming Languages",
    icon: Code,
    color: "#8b5cf6",
    skills: [
      { name: "Python", level: 95, position: [0, 2, 0] as [number, number, number] },
      { name: "JavaScript", level: 90, position: [2, 1.5, 1] as [number, number, number] },
      { name: "TypeScript", level: 85, position: [-2, 1.5, 1] as [number, number, number] },
      { name: "R", level: 80, position: [1, 2.5, -1] as [number, number, number] },
      { name: "SQL", level: 90, position: [-1, 2.5, -1] as [number, number, number] },
      { name: "Java", level: 75, position: [0, 1, 2] as [number, number, number] },
    ]
  },
  {
    id: 2,
    name: "AI & Machine Learning",
    icon: Brain,
    color: "#06b6d4",
    skills: [
      { name: "TensorFlow", level: 95, position: [4, 0, 0] as [number, number, number] },
      { name: "Keras", level: 90, position: [5, 1, 1] as [number, number, number] },
      { name: "scikit-learn", level: 85, position: [3, 1, 1] as [number, number, number] },
      { name: "PySpark", level: 80, position: [4.5, -0.5, -1] as [number, number, number] },
      { name: "Deep Learning", level: 90, position: [3.5, 0.5, -1] as [number, number, number] },
      { name: "Computer Vision", level: 85, position: [4, -1, 0] as [number, number, number] },
    ]
  },
  {
    id: 3,
    name: "Cloud & Infrastructure",
    icon: Cloud,
    color: "#10b981",
    skills: [
      { name: "Azure", level: 90, position: [-4, 0, 0] as [number, number, number] },
      { name: "AWS", level: 80, position: [-5, 1, 1] as [number, number, number] },
      { name: "Docker", level: 85, position: [-3, 1, 1] as [number, number, number] },
      { name: "Kubernetes", level: 80, position: [-4.5, -0.5, -1] as [number, number, number] },
      { name: "Jenkins", level: 75, position: [-3.5, 0.5, -1] as [number, number, number] },
      { name: "Microservices", level: 85, position: [-4, -1, 0] as [number, number, number] },
    ]
  },
  {
    id: 4,
    name: "Data & Analytics",
    icon: Database,
    color: "#f59e0b",
    skills: [
      { name: "PostgreSQL", level: 90, position: [0, -2, 0] as [number, number, number] },
      { name: "Hadoop", level: 75, position: [2, -1.5, 1] as [number, number, number] },
      { name: "Dataiku", level: 80, position: [-2, -1.5, 1] as [number, number, number] },
      { name: "Power BI", level: 85, position: [1, -2.5, -1] as [number, number, number] },
      { name: "Data Warehousing", level: 85, position: [-1, -2.5, -1] as [number, number, number] },
      { name: "ETL", level: 80, position: [0, -1, 2] as [number, number, number] },
    ]
  },
  {
    id: 5,
    name: "Web Development",
    icon: Wrench,
    color: "#ef4444",
    skills: [
      { name: "React.js", level: 90, position: [0, 0, 4] as [number, number, number] },
      { name: "Next.js", level: 85, position: [1.5, 0.5, 3.5] as [number, number, number] },
      { name: "Flask", level: 80, position: [-1.5, 0.5, 3.5] as [number, number, number] },
      { name: "Node.js", level: 75, position: [0.5, -0.5, 4.5] as [number, number, number] },
      { name: "REST APIs", level: 90, position: [-0.5, -0.5, 4.5] as [number, number, number] },
      { name: "GraphQL", level: 70, position: [0, 1, 3] as [number, number, number] },
    ]
  },
  {
    id: 6,
    name: "Project Management",
    icon: Users,
    color: "#8b5cf6",
    skills: [
      { name: "Agile", level: 90, position: [0, 0, -4] as [number, number, number] },
      { name: "Scrum", level: 85, position: [1.5, 0.5, -3.5] as [number, number, number] },
      { name: "Kanban", level: 80, position: [-1.5, 0.5, -3.5] as [number, number, number] },
      { name: "Jira", level: 85, position: [0.5, -0.5, -4.5] as [number, number, number] },
      { name: "Leadership", level: 90, position: [-0.5, -0.5, -4.5] as [number, number, number] },
      { name: "Team Building", level: 85, position: [0, 1, -3] as [number, number, number] },
    ]
  }
]

// Animated Skill Sphere Component
function SkillSphere({ skill, categoryColor, isActive, onClick }: { 
  skill: { name: string; level: number; position: [number, number, number] }, 
  categoryColor: string, 
  isActive: boolean, 
  onClick: () => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const radius = (skill.level / 100) * 0.5 + 0.2
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      if (isActive) {
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.02
      }
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
      <group position={skill.position} onClick={onClick}>
        <Sphere ref={meshRef} args={[radius, 32, 32]}>
          <meshStandardMaterial
            color={isActive ? categoryColor : '#374151'}
            emissive={isActive ? categoryColor : '#1f2937'}
            emissiveIntensity={isActive ? 0.4 : 0.1}
            roughness={0.3}
            metalness={0.7}
          />
        </Sphere>
        
        {/* Skill Level Ring */}
        <Torus
          args={[radius + 0.1, 0.02, 8, 32]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            color={categoryColor}
            emissive={categoryColor}
            emissiveIntensity={0.3}
          />
        </Torus>
        
        <Text
          position={[0, radius + 0.3, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1}
        >
          {skill.name}
        </Text>
        
        <Text
          position={[0, radius + 0.15, 0]}
          fontSize={0.06}
          color={categoryColor}
          anchorX="center"
          anchorY="middle"
        >
          {skill.level}%
        </Text>
      </group>
    </Float>
  )
}

// 3D Skills Scene
function Skills3D({ activeCategory, activeSkill, setActiveSkill }: { 
  activeCategory: number, 
  activeSkill: string, 
  setActiveSkill: (skill: string) => void 
}) {
  const category = skillCategories.find(cat => cat.id === activeCategory) || skillCategories[0]
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={category.color} />
      <pointLight position={[0, 0, 10]} intensity={0.3} color="#ffffff" />
      
             {category.skills.map((skill) => (
        <SkillSphere
          key={skill.name}
          skill={skill}
          categoryColor={category.color}
          isActive={activeSkill === skill.name}
          onClick={() => setActiveSkill(skill.name)}
        />
      ))}
      
      <Environment preset="night" />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate={true}
        autoRotateSpeed={0.3}
        maxDistance={15}
        minDistance={3}
      />
    </>
  )
}

export default function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState(1)
  const [activeSkill, setActiveSkill] = useState('')
  
  const currentCategory = skillCategories.find(cat => cat.id === activeCategory) || skillCategories[0]
  const currentSkill = currentCategory.skills.find(skill => skill.name === activeSkill)

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
                  Technical
                  <span className="text-gray-300 font-light">
                    {' '}Skills
                  </span>
                </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore my technical expertise in 3D. Each sphere represents a skill, sized by proficiency level.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {skillCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id)
                    setActiveSkill('')
                  }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'text-white shadow-lg'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  style={{
                    backgroundColor: activeCategory === category.id ? category.color : undefined,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={20} />
                  {category.name}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

                       <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* 3D Skills Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
                          className="lg:col-span-2 h-[600px] lg:h-[700px] xl:h-[800px] relative"
          >
            <Canvas camera={{ position: [6, 3, 6], fov: 75 }}>
              <Skills3D
                activeCategory={activeCategory}
                activeSkill={activeSkill}
                setActiveSkill={setActiveSkill}
              />
            </Canvas>
            
            {/* Controls Hint */}
            <div className="absolute bottom-4 left-4 text-white/50 text-sm">
              <p>🖱️ Click spheres • 🔄 Drag to rotate • 📏 Scroll to zoom</p>
            </div>
          </motion.div>

          {/* Skill Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: currentCategory.color }}
                />
                <h3 className="text-xl font-bold text-white">{currentCategory.name}</h3>
              </div>
              
              {currentSkill ? (
                <motion.div
                  key={currentSkill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-2">{currentSkill.name}</h4>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 bg-white/20 rounded-full h-2">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: currentCategory.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${currentSkill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                    <span className="text-white font-medium">{currentSkill.level}%</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Proficiency level based on years of experience and project complexity.
                  </p>
                </motion.div>
              ) : (
                <p className="text-white/70">
                  Click on a sphere to see skill details
                </p>
              )}
            </div>

            {/* Skills List */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-4">Skills in Category</h4>
              <div className="space-y-3">
                {currentCategory.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      activeSkill === skill.name
                        ? 'bg-white/20'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => setActiveSkill(skill.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-white font-medium">{skill.name}</span>
                    <span 
                      className="text-sm font-bold"
                      style={{ color: currentCategory.color }}
                    >
                      {skill.level}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 