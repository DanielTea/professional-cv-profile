'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Building2, Calendar, MapPin, Target, TestTube, Bot, Car, Star, Container } from 'lucide-react'
import { 
  PorscheAnimation, 
  MercedesAnimation, 
  DaimlerAnimation, 
  ControlFAnimation, 
  UIPilotAnimation, 
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
    icon: Target
  },
  {
    id: 2,
    company: "uipilot.ai",
    role: "Builder",
    period: "February 2025 - Present",
    location: "Remote",
    description: "Developing a no-code UI testing solution that eliminates repetitive test code.",
    technologies: ["No-code UI Testing", "Web Applications"],
    color: "#ffffff",
    position: [8, 3, -3] as [number, number, number],
    icon: TestTube
  },
  {
    id: 3,
    company: "RoboWork",
    role: "Founder",
    period: "March 2023 - Present",
    location: "Berlin, Germany",
    description: "Founded AI software solutions provider. Designing, developing, and deploying tailor-made AI solutions.",
    technologies: ["Custom AI Solutions"],
    color: "#ffffff",
    position: [-8, 3, -3] as [number, number, number],
    icon: Bot
  },
  {
    id: 4,
    company: "Porsche AG",
    role: "Specialist, Data Science & AI Projects",
    period: "June 2021 - February 2024",
    location: "Stuttgart, Germany",
    description: "Conducted quality-driven data analysis for decision-making. Built data analyzing pipeline for vehicle data with PySpark.",
    technologies: ["Azure ML", "Cloudera Suite", "SAP Data Warehouse Cloud", "Dataiku", "Python", "TensorFlow", "PySpark"],
    color: "#ffffff",
    position: [6, 0, 4] as [number, number, number],
    icon: Car
  },
  {
    id: 5,
    company: "MBition GmbH",
    role: "Senior Product Owner",
    period: "August 2020 - June 2021",
    location: "Berlin, Germany",
    description: "Led R&D initiatives for automotive technology innovation. Spearheaded next-generation Mercedes Benz Infotainment System.",
    technologies: ["Jira", "Confluence", "Agile", "Scrum", "Kanban"],
    color: "#ffffff",
    position: [-6, 0, 4] as [number, number, number],
    icon: Star
  },
  {
    id: 6,
    company: "Daimler AG",
    role: "Technical Lead & Product Owner AI",
    period: "December 2019 - August 2020",
    location: "Stuttgart, Germany",
    description: "Coordinated software architecture with ML components. Designed microservice architectures using Docker and K8s.",
    technologies: ["R", "Python", "React.js", "JavaScript", "Docker", "Kubernetes", "Jenkins", "Azure"],
    color: "#ffffff",
    position: [0, -3, -4] as [number, number, number],
    icon: Container
  }
]

// Get the appropriate animation component for each company
function getCompanyAnimation(companyName: string, isActive: boolean) {
  const commonProps = { isActive };
  
  switch (companyName) {
    case "control-f GmbH":
      return <ControlFAnimation {...commonProps} />
    case "uipilot.ai":
      return <UIPilotAnimation {...commonProps} />
    case "RoboWork":
      return <RoboWorkAnimation {...commonProps} />
    case "Porsche AG":
      return <PorscheAnimation {...commonProps} />
    case "MBition GmbH":
      return <MercedesAnimation {...commonProps} />
    case "Daimler AG":
      return <DaimlerAnimation {...commonProps} />
    default:
      return <ControlFAnimation {...commonProps} />
  }
}

// 3D Experience Animation Component
function ExperienceAnimation({ experience, isActive, onClick }: { 
  experience: typeof experiences[0], 
  isActive: boolean, 
  onClick: () => void 
}) {
  return (
    <group position={experience.position} onClick={onClick}>
      {getCompanyAnimation(experience.company, isActive)}
      
      {/* Company Label */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.2}
        color={isActive ? "#ffffff" : "#888"}
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
      >
{experience.company}
      </Text>
      
      {/* Click Indicator */}
      {!isActive && (
        <Text
          position={[0, -3.5, 0]}
          fontSize={0.1}
          color="#666"
          anchorX="center"
          anchorY="middle"
        >
          Click to explore
        </Text>
      )}
    </group>
  )
}

// 3D Scene Component
function Timeline3D({ activeExperience, setActiveExperience }: { activeExperience: number, setActiveExperience: (id: number) => void }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      {experiences.map((exp) => (
        <ExperienceAnimation
          key={exp.id}
          experience={exp}
          isActive={activeExperience === exp.id}
          onClick={() => setActiveExperience(exp.id)}
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

export default function ExperienceTimeline() {
  const [activeExperience, setActiveExperience] = useState(1)
  
  const currentExp = experiences.find(exp => exp.id === activeExperience) || experiences[0]

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
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {experiences.map((exp) => (
              <motion.button
                key={exp.id}
                onClick={() => setActiveExperience(exp.id)}
                className={`px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeExperience === exp.id
                   ? 'bg-white text-black shadow-lg border-2 border-white/50'
                   : 'bg-black/60 text-white/70 hover:bg-white/10 border border-white/30'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <exp.icon size={18} />
                {exp.company}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* 3D Timeline Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-[600px] lg:h-[700px] xl:h-[800px] relative"
          >
            <Canvas camera={{ position: [8, 5, 8], fov: 75 }}>
              <Timeline3D 
                activeExperience={activeExperience} 
                setActiveExperience={setActiveExperience} 
              />
            </Canvas>
            
            {/* Controls Hint */}
            <div className="absolute bottom-4 left-4 text-white/50 text-sm">
              <p>🖱️ Click cards • 🔄 Drag to rotate • 📏 Scroll to zoom</p>
            </div>
          </motion.div>

                      {/* Enhanced Experience Details Panel */}
            <motion.div
              key={activeExperience}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* RGB glow effects like profile picture */}
              <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-5 animate-pulse" 
                   style={{ animationDelay: '0s' }} />
              <div className="absolute inset-0 bg-gray-300 rounded-2xl blur-lg opacity-3 animate-pulse" 
                   style={{ animationDelay: '0.5s' }} />
              
              <div className="relative bg-black/80 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30 shadow-2xl">
                                 <div className="flex items-center gap-4 mb-6">
                   <div className="p-3 bg-white/10 rounded-full border border-white/30">
                     <currentExp.icon size={24} className="text-white" />
                   </div>
                   <div>
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
              </div>
            </motion.div>
        </div>

        {/* Timeline Navigation */}
        
      </div>
    </section>
  )
} 