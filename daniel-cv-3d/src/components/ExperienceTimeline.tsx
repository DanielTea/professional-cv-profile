'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Building2, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { 
  PorscheAnimation, 
  MercedesAnimation, 
  ControlFAnimation, 
  RoboWorkAnimation 
} from './CompanyAnimations'

const experiences = [
  {
    id: 1,
    company: "control-f GmbH",
    role: "Managing Director",
    period: "February 2024 - Present",
    location: "Berlin, Germany",
    description: "Leading a dynamic team of entrepreneurs and software engineers. Delivering cutting-edge AI, data science, and data solutions to businesses worldwide.",
    technologies: ["AI", "Data Science", "Proprietary AI Systems"],
    color: "#ffffff",
    position: [0, 6, 0] as [number, number, number],
    logo: "control-f"
  },

  {
    id: 2,
    company: "Porsche AG",
    role: "Specialist, Data Science & AI Projects",
    period: "June 2021 - February 2024",
    location: "Stuttgart, Germany",
    description: "Conducted quality-driven data analysis for decision-making. Built data analyzing pipeline for vehicle data with PySpark.",
    technologies: ["Azure ML", "Cloudera Suite", "SAP Data Warehouse Cloud", "Dataiku", "Python", "TensorFlow", "PySpark"],
    color: "#ffffff",
    position: [6, 0, 4] as [number, number, number],
    logo: "porsche"
  },
  {
    id: 3,
    company: "MBition GmbH",
    role: "Senior Product Owner",
    period: "August 2020 - June 2021",
    location: "Berlin, Germany",
    description: "Led R&D initiatives for automotive technology innovation. Spearheaded next-generation Mercedes Benz Infotainment System.",
    technologies: ["Jira", "Confluence", "Agile", "Scrum", "Kanban"],
    color: "#ffffff",
    position: [-6, 0, 4] as [number, number, number],
    logo: "mbition"
  },
  {
    id: 4,
    company: "Daimler AG",
    role: "Technical Lead & Product Owner AI",
    period: "December 2019 - August 2020",
    location: "Stuttgart, Germany",
    description: "Coordinated software architecture with ML components. Designed microservice architectures using Docker and K8s.",
    technologies: ["R", "Python", "React.js", "JavaScript", "Docker", "Kubernetes", "Jenkins", "Azure"],
    color: "#ffffff",
    position: [0, -3, -4] as [number, number, number],
    logo: "mercedes"
  }
]

// Get the appropriate company logo with enhanced styling
function getCompanyLogo(logoId: string, size: number = 32) {
  const logoMap: { [key: string]: { path: string, needsWhiteBackground: boolean } } = {
    'control-f': { path: '/company_icons/control-f.png', needsWhiteBackground: true },
    'porsche': { path: '/company_icons/Porsche.png', needsWhiteBackground: true },
    'mercedes': { path: '/company_icons/Daimler.png', needsWhiteBackground: true }, // Using Mercedes logo for Daimler as requested
    'mbition': { path: '/company_icons/mbition.webp', needsWhiteBackground: false }, // Black logo needs transparent/dark background
  }

  const logoInfo = logoMap[logoId]
  
  if (logoInfo) {
    const paddingSize = size >= 100 ? 8 : 4;
    const imageSizeReduction = logoInfo.needsWhiteBackground ? paddingSize : 0;
    
    return (
      <div 
        className={`flex items-center justify-center rounded-xl overflow-hidden shadow-lg ${
          logoInfo.needsWhiteBackground ? 'bg-white' : 'bg-gray-100/20 border border-white/30'
        }`}
        style={{ 
          width: size, 
          height: size,
          padding: logoInfo.needsWhiteBackground ? `${paddingSize/2}px` : '2px'
        }}
      >
        <Image
          src={logoInfo.path}
          alt={`${logoId} logo`}
          width={size - imageSizeReduction}
          height={size - imageSizeReduction}
          className="object-contain"
        />
      </div>
    )
  }
  
  // Fallback to building icon if logo not found
  return <Building2 size={size} className="text-white" />
}

// Get the appropriate animation component for each company
function getCompanyAnimation(companyName: string, isActive: boolean) {
  const commonProps = { isActive };
  
  switch (companyName) {
    case "control-f GmbH":
      return <ControlFAnimation {...commonProps} />
    case "Porsche AG":
      return <PorscheAnimation {...commonProps} />
    case "MBition GmbH":
      return <MercedesAnimation {...commonProps} />
    case "Daimler AG":
      return <RoboWorkAnimation {...commonProps} />
    default:
      return <ControlFAnimation {...commonProps} />
  }
}

// Billboard Text Component - Always faces the camera
function BillboardText({ children, position, fontSize, ...props }: { 
  children: React.ReactNode, 
  position: [number, number, number], 
  fontSize: number,
  [key: string]: unknown
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position)
    }
  })
  
  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={fontSize}
      {...props}
    >
      {children}
    </Text>
  )
}

// Single Active Animation Component - Only shows the selected company
function ActiveCompanyAnimation({ experience }: { experience: typeof experiences[0] }) {
  return (
    <group position={[0, 0, 0]}>
      {getCompanyAnimation(experience.company, true)}
      
      {/* Company Label - Always facing user */}
      <BillboardText
        position={[0, -5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {experience.company}
      </BillboardText>
      
      {/* Role Label - Always facing user */}
      <BillboardText
        position={[0, -6, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {experience.role}
      </BillboardText>
    </group>
  )
}

// 3D Scene Component - Shows only the active company animation
function Timeline3D({ activeExperience }: { activeExperience: number }) {
  const currentExp = experiences.find(exp => exp.id === activeExperience) || experiences[0]
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[8, 8, 8]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-8, -8, -8]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 10, -5]} intensity={0.8} color="#ffffff" />
      
      {/* Only render the active company's animation */}
      <ActiveCompanyAnimation key={activeExperience} experience={currentExp} />
      
      <Environment preset="night" />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate={true}
        autoRotateSpeed={0.3}
        maxDistance={15}
        minDistance={3}
        target={[0, 0, 0]}
      />
    </>
  )
}

export default function ExperienceTimeline() {
  const [activeExperience, setActiveExperience] = useState(1)
  
  const currentExp = experiences.find(exp => exp.id === activeExperience) || experiences[0]
  
  if (!currentExp) {
    console.error('No experience found!')
    return null
  }
  


  return (
    <section className="min-h-screen bg-black py-20" id="professional-journey">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -200px 0px" }}
          className="text-center mb-16"
        >
                          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Professional
                  <span className="text-gray-300 font-light">
                    {' '}Journey
                  </span>
                </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore my career timeline in 3D. Click on the floating cards to learn more about each role.
          </p>
        </motion.div>

                                 {/* Company Selection Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -150px 0px" }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {experiences.map((exp) => (
              <motion.button
                key={exp.id}
                onClick={() => setActiveExperience(exp.id)}
                className={`px-4 py-3 sm:px-6 sm:py-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 sm:gap-3 min-h-[50px] sm:min-h-[60px] ${
                  activeExperience === exp.id
                   ? 'bg-white text-black shadow-xl border-2 border-white/50 transform scale-105 shadow-white/20'
                   : 'bg-black/60 text-white/70 hover:bg-white/10 border border-white/30 hover:border-white/50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex-shrink-0">
                  {getCompanyLogo(exp.logo, 28)}
                </div>
                <span className="font-semibold whitespace-nowrap">{exp.company}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center min-h-[80vh]">
          {/* 3D Timeline Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
            className="h-[600px] lg:h-[700px] xl:h-[800px] relative"
          >
            <Canvas camera={{ position: [5, 3, 8], fov: 75 }}>
              <Timeline3D activeExperience={activeExperience} />
            </Canvas>
            

          </motion.div>

                      {/* Enhanced Experience Details Panel */}
          <motion.div 
            className="relative order-last lg:order-none w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              key={activeExperience}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative"
            >
              {/* RGB glow effects like profile picture */}
              <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-5 animate-pulse" 
                   style={{ animationDelay: '0s' }} />
              <div className="absolute inset-0 bg-gray-300 rounded-2xl blur-lg opacity-3 animate-pulse" 
                   style={{ animationDelay: '0.5s' }} />
              
              <div className="relative bg-black/80 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30 shadow-2xl">
                {currentExp ? (
                  <>
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 mb-6">
                      <div className="flex items-center justify-center flex-shrink-0">
                        {getCompanyLogo(currentExp.logo, 100)}
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-2xl font-bold text-white">{currentExp.company}</h3>
                        <div className="w-full h-0.5 bg-gradient-to-r from-white/50 to-transparent mt-1"></div>
                      </div>
                    </div>
            
                          <h4 className="text-xl text-gray-300 mb-4 font-medium">{currentExp.role}</h4>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-white/70">
                <Calendar size={16} />
                <span className="text-sm">{currentExp.period}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin size={16} />
                <span className="text-sm">{currentExp.location}</span>
              </div>
            </div>
            
            <p className="text-white/80 leading-relaxed mb-6">
              {currentExp.description}
            </p>
            
            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-white flex items-center gap-2">
                <Building2 size={18} />
                Technologies & Tools
              </h5>
                                  <div className="flex flex-wrap gap-2">
                      {currentExp.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/10 text-white rounded-full text-sm border border-white/30 hover:bg-white/20 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                                         </div>
                    </div>
                  </>
                ) : (
                  <div className="text-white text-center">Loading experience details...</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline Navigation */}
        
      </div>
    </section>
  )
} 