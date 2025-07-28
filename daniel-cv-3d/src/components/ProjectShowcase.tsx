'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Environment, Text, Box, RoundedBox } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { ExternalLink, Calendar, Zap, Trophy } from 'lucide-react'
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
    color: "#8b5cf6",
    position: [0, 0, 0] as [number, number, number],
    link: "https://controlf.io"
  },

  {
    id: 2,
    title: "Porsche Vehicle Data Pipeline",
    category: "Automotive AI",
    description: "Built comprehensive data analyzing pipeline for vehicle data using PySpark, processing millions of data points.",
    technologies: ["PySpark", "Azure ML", "Python", "Big Data", "Analytics"],
    impact: "Processing 10M+ vehicle data points",
    status: "Completed",
    year: "2021-2024",
    color: "#f59e0b",
    position: [2, -2, 2] as [number, number, number],
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
    color: "#ef4444",
    position: [-2, -2, 2] as [number, number, number],
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
    color: "#8b5cf6",
    position: [0, 2, 4] as [number, number, number],
    link: "#"
  }
]

// 3D Project Card Component
function ProjectCard({ project, isActive, onClick }: { 
  project: typeof projects[0], 
  isActive: boolean, 
  onClick: () => void 
}) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      if (isActive) {
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.05
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.05)
      }
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef} position={project.position} onClick={onClick}>
        <RoundedBox args={[2.5, 3, 0.2]} radius={0.1}>
          <meshStandardMaterial
            color={isActive ? project.color : '#374151'}
            emissive={isActive ? project.color : '#1f2937'}
            emissiveIntensity={isActive ? 0.3 : 0.1}
            roughness={0.2}
            metalness={0.8}
          />
        </RoundedBox>
        
        {/* Project Title */}
        <Text
          position={[0, 1, 0.12]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
        >
          {project.title}
        </Text>
        
        {/* Category */}
        <Text
          position={[0, 0.6, 0.12]}
          fontSize={0.12}
          color={project.color}
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
        >
          {project.category}
        </Text>
        
        {/* Year */}
        <Text
          position={[0, 0.3, 0.12]}
          fontSize={0.1}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
        >
          {project.year}
        </Text>
        
        {/* Status Indicator */}
        <Box args={[0.3, 0.1, 0.05]} position={[0, -0.2, 0.13]}>
          <meshStandardMaterial
            color={project.status === 'Active' ? '#10b981' : project.status === 'Completed' ? '#06b6d4' : '#f59e0b'}
            emissive={project.status === 'Active' ? '#10b981' : project.status === 'Completed' ? '#06b6d4' : '#f59e0b'}
            emissiveIntensity={0.3}
          />
        </Box>
        
        <Text
          position={[0, -0.2, 0.16]}
          fontSize={0.06}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {project.status}
        </Text>
        
        {/* Impact */}
        <Text
          position={[0, -0.6, 0.12]}
          fontSize={0.08}
          color="#e5e7eb"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
        >
          {project.impact}
        </Text>
        
        {/* Hover Effect Ring */}
        {isActive && (
          <mesh rotation={[0, 0, 0]} position={[0, 0, -0.15]}>
            <torusGeometry args={[1.5, 0.05, 8, 32]} />
            <meshStandardMaterial
              color={project.color}
              emissive={project.color}
              emissiveIntensity={0.5}
            />
          </mesh>
        )}
      </group>
    </Float>
  )
}

// 3D Projects Scene
function Projects3D({ activeProject, setActiveProject }: { 
  activeProject: number, 
  setActiveProject: (id: number) => void 
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 0, 10]} intensity={0.3} color="#ffffff" />
      
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isActive={activeProject === project.id}
          onClick={() => setActiveProject(project.id)}
        />
      ))}
      
      <Environment preset="night" />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate={true}
        autoRotateSpeed={0.2}
        maxDistance={20}
        minDistance={5}
      />
    </>
  )
}

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(1)
  
  const currentProject = projects.find(p => p.id === activeProject) || projects[0]

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
                    {' '}Projects
                  </span>
                </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore my key projects and contributions in 3D. Click on the floating cards to learn more.
          </p>
        </motion.div>

                       <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* 3D Projects Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
                          className="h-[700px] lg:h-[800px] xl:h-[900px] relative"
          >
            <Canvas camera={{ position: [8, 5, 8], fov: 75 }}>
              <Projects3D
                activeProject={activeProject}
                setActiveProject={setActiveProject}
              />
            </Canvas>
            

          </motion.div>

          {/* Project Details Panel */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: currentProject.color }}
                  />
                  <h3 className="text-2xl font-bold text-white">{currentProject.title}</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentProject.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                      currentProject.status === 'Completed' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}
                  >
                    {currentProject.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-purple-300 font-medium">{currentProject.category}</span>
                <span className="text-white/50">•</span>
                <div className="flex items-center gap-1 text-white/70">
                  <Calendar size={14} />
                  <span className="text-sm">{currentProject.year}</span>
                </div>
              </div>
              
              <p className="text-white/80 leading-relaxed mb-6">
                {currentProject.description}
              </p>
              
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="text-yellow-400" size={18} />
                <span className="text-white font-medium">{currentProject.impact}</span>
              </div>
              
              <div className="space-y-4">
                <h5 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Zap size={18} />
                  Technologies Used
                </h5>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm border"
                      style={{ 
                        backgroundColor: `${currentProject.color}20`,
                        borderColor: `${currentProject.color}50`,
                        color: currentProject.color
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {currentProject.link !== '#' && (
                <motion.div
                  className="mt-8"
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
          </motion.div>
        </div>

        {/* Project Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {projects.map((project) => (
              <motion.button
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                className={`p-4 rounded-xl text-left transition-all duration-300 ${
                  activeProject === project.id
                    ? 'shadow-lg'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                style={{
                  backgroundColor: activeProject === project.id ? `${project.color}20` : undefined,
                  borderColor: activeProject === project.id ? `${project.color}50` : 'transparent',
                  borderWidth: 1,
                  borderStyle: 'solid'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <h4 className="font-semibold text-white text-sm mb-1">{project.title}</h4>
                <p className="text-xs text-white/70">{project.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-white/50">{project.year}</span>
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Interested in Working Together?</h3>
                         <p className="text-white/70 mb-6">
               I&apos;m always open to discussing new opportunities, innovative projects, and collaborations.
             </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:info@danieltremer.com"
                                       className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/daniel-tremer/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect on LinkedIn
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 