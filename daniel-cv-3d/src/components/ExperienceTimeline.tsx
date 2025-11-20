'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Building2, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import ScrollHighlight from './ScrollHighlight'

const experiences = [
  {
    id: 1,
    company: "control-f GmbH",
    role: "Managing Director",
    period: "February 2024 - Present",
    location: "Berlin, Germany",
    description: "Leading a dynamic team of entrepreneurs and software engineers. Delivering cutting-edge AI, data science, and data solutions to businesses worldwide.",
    technologies: ["AI", "Data Science", "Proprietary AI Systems"],
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
    logo: "mercedes"
  }
]

function getCompanyLogo(logoId: string, size: number = 32) {
  const logoMap: { [key: string]: { path: string, needsWhiteBackground: boolean } } = {
    'control-f': { path: '/company_icons/control-f.png', needsWhiteBackground: true },
    'porsche': { path: '/company_icons/Porsche.png', needsWhiteBackground: true },
    'mercedes': { path: '/company_icons/Daimler.png', needsWhiteBackground: true },
    'mbition': { path: '/company_icons/mbition.webp', needsWhiteBackground: false },
  }

  const logoInfo = logoMap[logoId]
  
  if (logoInfo) {
    const paddingSize = size >= 100 ? 8 : 4;
    const imageSizeReduction = logoInfo.needsWhiteBackground ? paddingSize : 0;
    
    return (
      <div 
        className={`flex items-center justify-center overflow-hidden ${
          logoInfo.needsWhiteBackground ? 'bg-white shadow-sm' : 'bg-black/5 border border-black/10'
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
  return <Building2 size={size} className="text-gray-400" />
}

export default function ExperienceTimeline() {
  const [activeExperience, setActiveExperience] = useState(1)
  const currentExp = experiences.find(exp => exp.id === activeExperience) || experiences[0]
  
  return (
    <section className="min-h-screen bg-[var(--color-background)] py-20 relative" id="experience">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 border-b border-black/20 pb-4 flex justify-between items-end"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 bg-[var(--color-danger)] animate-pulse" />
               <span className="text-[var(--color-danger)] font-mono text-xs tracking-widest">SYSTEM_LOG_02</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-black uppercase">
              Career<span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-black stroke-black ml-4">History</span>
            </h2>
          </div>
          <div className="hidden md:block text-right font-mono text-gray-500 text-xs">
            <div>// DECRYPTING_CAREER_DATA</div>
            <div>// ACCESS_LEVEL: PUBLIC</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Navigation Rail */}
          <div className="lg:col-span-4">
            <div className="flex flex-col space-y-2 border-l-2 border-black/10 pl-6 relative">
              {/* Active Indicator Line */}
              <motion.div 
                className="absolute left-[-2px] w-[2px] bg-black h-12 transition-all duration-300"
                animate={{ top: `${(activeExperience - 1) * (80 + 8)}px` }}
              />

              {experiences.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveExperience(exp.id)}
                  className={`group text-left p-4 transition-all duration-300 border border-transparent relative overflow-hidden h-20 ${
                    activeExperience === exp.id
                      ? 'bg-white/60 border-black/10 shadow-sm'
                      : 'hover:bg-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                     <div>
                        <div className={`font-mono text-xs mb-1 uppercase ${activeExperience === exp.id ? 'text-[var(--color-danger)]' : 'text-gray-400'}`}>
                          // 0{exp.id}
                        </div>
                        <div className={`font-bold uppercase tracking-wider ${activeExperience === exp.id ? 'text-black' : 'text-gray-500'}`}>
                          {exp.company}
                        </div>
                     </div>
                     {activeExperience === exp.id && <div className="w-2 h-2 bg-black" />}
                  </div>
                  
                  {/* Hover Fill */}
                  <div className="absolute inset-0 bg-white/80 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 -z-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Detail View */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeExperience}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[var(--color-surface)] border border-black/20 p-8 relative min-h-[400px] shadow-xl"
            >
               {/* Decorative HUD Elements */}
               <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-black opacity-50" />
               <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[var(--color-danger)] opacity-50" />
               
               {/* Warning Stripes Top Right */}
               <div className="absolute top-0 right-0 w-24 h-8 overflow-hidden">
                  <div className="w-full h-full warning-stripe opacity-20"></div>
               </div>
               
               {/* Technical Crosshair */}
               <div className="absolute bottom-4 left-4 w-4 h-4 border border-black/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[var(--color-volt)] rounded-full"></div>
               </div>

               <div className="absolute top-4 right-4 font-mono text-[10px] text-gray-400 tracking-widest flex items-center gap-2">
                 <span className="w-2 h-2 bg-[var(--color-danger)] animate-pulse"></span>
                 SECURE_CONNECTION_ESTABLISHED
               </div>

               <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-6">
                     <div className="border border-black/10 p-2 bg-white shadow-sm">
                        {getCompanyLogo(currentExp.logo, 64)}
                     </div>
                     <div>
                        <h3 className="text-3xl font-bold text-black uppercase tracking-wide font-display">
                          <ScrollHighlight>{currentExp.role}</ScrollHighlight>
                        </h3>
                        <div className="text-gray-600 font-mono mt-1 font-bold">@ {currentExp.company}</div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8 border-y border-black/10 py-4 font-mono text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[var(--color-danger)]" />
                    <span>{currentExp.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[var(--color-danger)]" />
                    <span>{currentExp.location}</span>
                  </div>
               </div>

               <div className="mb-8 font-sans text-gray-800 leading-relaxed text-lg border-l-2 border-black/20 pl-4">
                  {currentExp.description}
               </div>

               <div>
                 <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">// TECH_STACK_USED</h4>
                 <div className="flex flex-wrap gap-2">
                    {currentExp.technologies.map((tech, i) => (
                      <div key={i} className="px-3 py-1 bg-white border border-black/20 text-xs font-mono text-gray-600 hover:border-black hover:text-black transition-colors cursor-default shadow-sm">
                        {tech}
                      </div>
                    ))}
                 </div>
               </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
