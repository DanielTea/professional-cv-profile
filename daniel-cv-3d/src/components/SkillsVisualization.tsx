'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useRef, useMemo } from 'react'
import { Code, Database, Cloud, Brain, Wrench, Users } from 'lucide-react'
import * as THREE from 'three'

const skillCategories = [
  {
    id: 1,
    name: "Programming Languages",
    icon: Code,
    skills: [
      { 
        name: "Python", 
        level: 95, 
        position: [0, 2, 0] as [number, number, number],
        description: "Expert in Python for data science, machine learning, and backend development. Proficient with pandas, numpy, and advanced frameworks for building scalable applications and AI models."
      },
      { 
        name: "JavaScript", 
        level: 90, 
        position: [2, 1.5, 1] as [number, number, number],
        description: "Advanced JavaScript developer with expertise in modern ES6+ features, async programming, and building interactive web applications. Strong foundation in both frontend and backend JavaScript development."
      },
      { 
        name: "TypeScript", 
        level: 85, 
        position: [-2, 1.5, 1] as [number, number, number],
        description: "Experienced in TypeScript for building type-safe, scalable applications. Skilled in advanced types, generics, and leveraging TypeScript's powerful tooling for better code quality and maintainability."
      },
      { 
        name: "R", 
        level: 80, 
        position: [1, 2.5, -1] as [number, number, number],
        description: "Proficient in R for statistical analysis, data visualization, and machine learning. Experienced with tidyverse, ggplot2, and advanced statistical modeling for business intelligence and research."
      },
      { 
        name: "SQL", 
        level: 90, 
        position: [-1, 2.5, -1] as [number, number, number],
        description: "Advanced SQL expertise for complex database queries, performance optimization, and data analysis. Skilled in writing efficient queries, stored procedures, and database design across multiple RDBMS platforms."
      },
      { 
        name: "Java", 
        level: 75, 
        position: [0, 1, 2] as [number, number, number],
        description: "Solid Java foundation with experience in object-oriented programming, Spring framework, and enterprise application development. Familiar with Java 8+ features and modern development practices."
      },
    ]
  },
  {
    id: 2,
    name: "AI & Machine Learning",
    icon: Brain,
    skills: [
      { 
        name: "TensorFlow", 
        level: 95, 
        position: [4, 0, 0] as [number, number, number],
        description: "Expert in TensorFlow for building and deploying deep learning models. Experienced with TensorFlow 2.x, Keras integration, model optimization, and production deployment strategies."
      },
      { 
        name: "Keras", 
        level: 90, 
        position: [5, 1, 1] as [number, number, number],
        description: "Advanced proficiency in Keras for rapid prototyping and building neural networks. Skilled in creating custom layers, implementing complex architectures, and transfer learning techniques."
      },
      { 
        name: "scikit-learn", 
        level: 85, 
        position: [3, 1, 1] as [number, number, number],
        description: "Experienced in scikit-learn for traditional machine learning algorithms, feature engineering, and model evaluation. Proficient in classification, regression, clustering, and dimensionality reduction techniques."
      },
      { 
        name: "PySpark", 
        level: 80, 
        position: [4.5, -0.5, -1] as [number, number, number],
        description: "Skilled in PySpark for big data processing and distributed machine learning. Experienced in optimizing Spark jobs, handling large datasets, and implementing scalable ML pipelines."
      },
      { 
        name: "Deep Learning", 
        level: 90, 
        position: [3.5, 0.5, -1] as [number, number, number],
        description: "Comprehensive knowledge of deep learning architectures including CNNs, RNNs, and Transformers. Experienced in training complex models, hyperparameter tuning, and solving real-world AI problems."
      },
      { 
        name: "Computer Vision", 
        level: 85, 
        position: [4, -1, 0] as [number, number, number],
        description: "Proficient in computer vision techniques for image processing, object detection, and image classification. Experienced with OpenCV, image augmentation, and state-of-the-art vision models."
      },
    ]
  },
  {
    id: 3,
    name: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      { 
        name: "Azure", 
        level: 90, 
        position: [-4, 0, 0] as [number, number, number],
        description: "Advanced Azure expertise including Azure ML, Data Factory, and compute services. Experienced in designing scalable cloud architectures, implementing CI/CD pipelines, and managing cloud resources efficiently."
      },
      { 
        name: "AWS", 
        level: 80, 
        position: [-5, 1, 1] as [number, number, number],
        description: "Solid AWS experience with EC2, S3, Lambda, and RDS. Skilled in cloud migration strategies, serverless architectures, and implementing cost-effective solutions for various business requirements."
      },
      { 
        name: "Docker", 
        level: 85, 
        position: [-3, 1, 1] as [number, number, number],
        description: "Proficient in Docker containerization for application deployment and development environments. Experienced in creating efficient Dockerfiles, multi-stage builds, and container orchestration."
      },
      { 
        name: "Kubernetes", 
        level: 80, 
        position: [-4.5, -0.5, -1] as [number, number, number],
        description: "Experienced in Kubernetes for container orchestration and microservices management. Skilled in deploying applications, managing clusters, and implementing scalable, resilient infrastructure."
      },
      { 
        name: "Jenkins", 
        level: 75, 
        position: [-3.5, 0.5, -1] as [number, number, number],
        description: "Proficient in Jenkins for CI/CD pipeline automation. Experienced in setting up build processes, automated testing workflows, and deployment strategies for continuous integration and delivery."
      },
      { 
        name: "Microservices", 
        level: 85, 
        position: [-4, -1, 0] as [number, number, number],
        description: "Skilled in designing and implementing microservices architectures. Experienced in service decomposition, API design, inter-service communication, and managing distributed system complexities."
      },
    ]
  },
  {
    id: 4,
    name: "Data & Analytics",
    icon: Database,
    skills: [
      { 
        name: "PostgreSQL", 
        level: 90, 
        position: [0, -2, 0] as [number, number, number],
        description: "Advanced PostgreSQL expertise including complex query optimization, database design, and performance tuning. Experienced with advanced features like JSON operations, window functions, and database administration."
      },
      { 
        name: "Hadoop", 
        level: 75, 
        position: [2, -1.5, 1] as [number, number, number],
        description: "Experienced in Hadoop ecosystem for big data processing. Familiar with HDFS, MapReduce, and integrating Hadoop with other big data tools for large-scale data analytics and processing."
      },
      { 
        name: "Dataiku", 
        level: 80, 
        position: [-2, -1.5, 1] as [number, number, number],
        description: "Proficient in Dataiku for data science workflows and collaborative analytics. Experienced in building end-to-end data pipelines, automated machine learning, and deploying models to production."
      },
      { 
        name: "Power BI", 
        level: 85, 
        position: [1, -2.5, -1] as [number, number, number],
        description: "Advanced Power BI skills for business intelligence and data visualization. Experienced in creating interactive dashboards, DAX calculations, and connecting to various data sources for business insights."
      },
      { 
        name: "Data Warehousing", 
        level: 85, 
        position: [-1, -2.5, -1] as [number, number, number],
        description: "Skilled in data warehouse design and implementation. Experienced in dimensional modeling, ETL processes, and building scalable data architectures for enterprise analytics and reporting."
      },
      { 
        name: "ETL", 
        level: 80, 
        position: [0, -1, 2] as [number, number, number],
        description: "Proficient in Extract, Transform, Load processes for data integration. Experienced in designing efficient data pipelines, data quality management, and automating data workflows across systems."
      },
    ]
  },
  {
    id: 5,
    name: "Web Development",
    icon: Wrench,
    skills: [
      { 
        name: "React.js", 
        level: 90, 
        position: [0, 0, 4] as [number, number, number],
        description: "Advanced React.js expertise including hooks, context API, and performance optimization. Experienced in building complex, scalable applications with modern React patterns and state management solutions."
      },
      { 
        name: "Next.js", 
        level: 85, 
        position: [1.5, 0.5, 3.5] as [number, number, number],
        description: "Proficient in Next.js for full-stack React applications. Experienced with server-side rendering, static site generation, API routes, and deploying optimized applications with excellent performance."
      },
      { 
        name: "Flask", 
        level: 80, 
        position: [-1.5, 0.5, 3.5] as [number, number, number],
        description: "Skilled in Flask for building lightweight, scalable web applications and APIs. Experienced in creating RESTful services, implementing authentication, and integrating with databases and external services."
      },
      { 
        name: "Node.js", 
        level: 75, 
        position: [0.5, -0.5, 4.5] as [number, number, number],
        description: "Experienced in Node.js for backend development and API creation. Familiar with Express.js, async programming, and building scalable server-side applications with JavaScript."
      },
      { 
        name: "REST APIs", 
        level: 90, 
        position: [-0.5, -0.5, 4.5] as [number, number, number],
        description: "Expert in designing and implementing RESTful APIs. Experienced in API documentation, authentication strategies, rate limiting, and building robust, scalable web services following best practices."
      },
      { 
        name: "GraphQL", 
        level: 70, 
        position: [0, 1, 3] as [number, number, number],
        description: "Familiar with GraphQL for efficient data fetching and API design. Experienced in schema design, resolvers, and integrating GraphQL with various frontend and backend technologies."
      },
    ]
  },
  {
    id: 6,
    name: "Project Management",
    icon: Users,
    skills: [
      { 
        name: "Agile", 
        level: 90, 
        position: [0, 0, -4] as [number, number, number],
        description: "Advanced Agile methodology expertise with extensive experience leading cross-functional teams. Skilled in facilitating agile transformations, sprint planning, and implementing agile best practices for improved delivery."
      },
      { 
        name: "Scrum", 
        level: 85, 
        position: [1.5, 0.5, -3.5] as [number, number, number],
        description: "Experienced Scrum practitioner with hands-on experience as Scrum Master. Proficient in facilitating ceremonies, removing impediments, and coaching teams to achieve high performance and continuous improvement."
      },
      { 
        name: "Kanban", 
        level: 80, 
        position: [-1.5, 0.5, -3.5] as [number, number, number],
        description: "Skilled in Kanban methodology for workflow optimization and continuous delivery. Experienced in visualizing work, limiting work in progress, and improving team efficiency through lean principles."
      },
      { 
        name: "Jira", 
        level: 85, 
        position: [0.5, -0.5, -4.5] as [number, number, number],
        description: "Proficient in Jira for project tracking and agile project management. Experienced in configuring workflows, creating custom dashboards, and using Jira for comprehensive project visibility and reporting."
      },
      { 
        name: "Leadership", 
        level: 90, 
        position: [-0.5, -0.5, -4.5] as [number, number, number],
        description: "Strong leadership skills with experience managing technical teams and driving strategic initiatives. Skilled in mentoring, conflict resolution, and creating environments that foster innovation and collaboration."
      },
      { 
        name: "Team Building", 
        level: 85, 
        position: [0, 1, -3] as [number, number, number],
        description: "Experienced in building and developing high-performing teams. Skilled in identifying team strengths, fostering collaboration, and implementing strategies that enhance team cohesion and productivity."
      },
    ]
  }
]



// Function to get unique 3D geometries that abstractly represent each skill
function getSkillGeometry(skillName: string, size: number) {
  switch (skillName) {
    // Programming Languages - Unique intertwined pipe structures
    case 'Python':
      // Snake-like elongated coils - unique serpentine pattern
      return <torusKnotGeometry args={[size * 0.4, size * 0.08, 60, 6, 2, 7]} />
    case 'JavaScript':
      // Dynamic, flexible intertwined pipes - classic twisted pattern
      return <torusKnotGeometry args={[size * 0.4, size * 0.1, 64, 8, 2, 3]} />
    case 'TypeScript':
      // More structured intertwined pipes - complex organized pattern
      return <torusKnotGeometry args={[size * 0.45, size * 0.09, 56, 8, 4, 3]} />
    case 'R':
      // Statistical data flow pipes - dense analytical pattern
      return <torusKnotGeometry args={[size * 0.35, size * 0.12, 48, 10, 3, 4]} />
    case 'SQL':
      // Database connection pipes - figure-eight joins pattern
      return <torusKnotGeometry args={[size * 0.42, size * 0.1, 52, 8, 2, 5]} />
    case 'Java':
      // Coffee bean intertwined pipes - rich complex twisted pattern
      return <torusKnotGeometry args={[size * 0.38, size * 0.11, 44, 8, 5, 2]} />

    // AI & Machine Learning - Gemstone cuts with faceted surfaces
    case 'TensorFlow':
      // Neural network diamond - sharp brilliant cut with flat triangular facets
      return <icosahedronGeometry args={[size * 0.6, 0]} />
    case 'Keras':
      // Layered emerald cut - sharp octagonal shape with flat facets
      return <octahedronGeometry args={[size * 0.8, 0]} />
    case 'scikit-learn':
      // Decision tree ruby - angular dodecahedron with sharp pentagonal/triangular facets
      return <dodecahedronGeometry args={[size * 0.7, 0]} />
    case 'PySpark':
      // Spark crystal - sharp triangular pyramid with flat faces
      return <tetrahedronGeometry args={[size * 0.9, 0]} />
    case 'Deep Learning':
      // Deep faceted sapphire - complex angular icosahedron with flat triangular faces
      return <icosahedronGeometry args={[size * 0.75, 0]} />
    case 'Computer Vision':
      // Vision topaz - angular dodecahedron with sharp flat surfaces
      return <dodecahedronGeometry args={[size * 0.8, 0]} />

    // Cloud & Infrastructure - Liquid glass bubble formations
    case 'Azure':
      // Cloud shape - large central bubble (single sphere)
      return <sphereGeometry args={[size * 0.8, 16, 12]} />
    case 'AWS':
      // Distributed cloud - medium bubble cluster (sphere)
      return <sphereGeometry args={[size * 0.7, 20, 16]} />
    case 'Docker':
      // Container bubbles - elongated bubble (stretched sphere)
      return <sphereGeometry args={[size * 0.6, 12, 8]} />
    case 'Kubernetes':
      // Interconnected pod bubbles - round bubble cluster (sphere)
      return <sphereGeometry args={[size * 0.75, 24, 20]} />
    case 'Jenkins':
      // Pipeline bubble stream - elongated bubble (oval sphere)
      return <sphereGeometry args={[size * 0.5, 8, 16]} />
    case 'Microservices':
      // Small service bubbles - small tight bubble (compact sphere)
      return <sphereGeometry args={[size * 0.65, 16, 12]} />

    // Data & Analytics - Cubic data structures
    case 'PostgreSQL':
      // Database structure - large central cube
      return <boxGeometry args={[size * 0.8, size * 0.8, size * 0.8]} />
    case 'Hadoop':
      // Distributed storage - medium cube
      return <boxGeometry args={[size * 0.7, size * 0.7, size * 0.7]} />
    case 'Dataiku':
      // Data pipeline - elongated cube
      return <boxGeometry args={[size * 1.0, size * 0.5, size * 0.6]} />
    case 'Power BI':
      // Visualization cube - wide flat cube
      return <boxGeometry args={[size * 0.9, size * 0.4, size * 0.9]} />
    case 'Data Warehousing':
      // Warehouse structure - large storage cube
      return <boxGeometry args={[size * 1.0, size * 0.8, size * 1.0]} />
    case 'ETL':
      // Processing cube - medium symmetric cube
      return <boxGeometry args={[size * 0.6, size * 0.6, size * 0.6]} />

    // Web Development
    case 'React.js':
      // Atomic/component structure - icosahedron (many faces like components)
      return <icosahedronGeometry args={[size * 0.6]} />
    case 'Next.js':
      // Forward arrow - pointed shape
      return <coneGeometry args={[size * 0.5, size * 1.2, 3]} />
    case 'Flask':
      // Flask/bottle shape - cylinder with narrow neck
      return <cylinderGeometry args={[size * 0.3, size * 0.6, size * 1.0, 8]} />
    case 'Node.js':
      // Hexagonal node - hexagon-like
      return <cylinderGeometry args={[size * 0.6, size * 0.6, size * 0.4, 6]} />
    case 'REST APIs':
      // Bridge/connection - torus (connecting ring)
      return <torusGeometry args={[size * 0.6, size * 0.2, 12, 16]} />
    case 'GraphQL':
      // Graph network - complex connected shape
      return <torusKnotGeometry args={[size * 0.4, size * 0.1, 48, 8, 4, 3]} />

    // Project Management
    case 'Agile':
      // Iterative spiral - torus knot
      return <torusKnotGeometry args={[size * 0.4, size * 0.1, 32, 8, 2, 3]} />
    case 'Scrum':
      // Rugby ball - stretched sphere
      return <sphereGeometry args={[size * 0.6, 8, 16]} />
    case 'Kanban':
      // Board with cards - flat rectangular
      return <boxGeometry args={[size * 1.3, size * 0.2, size * 0.9]} />
    case 'Jira':
      // Ticket/card - thin box
      return <boxGeometry args={[size * 1.0, size * 0.1, size * 0.7]} />
    case 'Leadership':
      // Arrow pointing up - cone
      return <coneGeometry args={[size * 0.6, size * 1.3, 4]} />
    case 'Team Building':
      // Puzzle piece abstraction - complex shape
      return <dodecahedronGeometry args={[size * 0.6]} />

    default:
      return <boxGeometry args={[size, size, size]} />
  }
}

// Function to get oil spill on water shader material for all skills
function getSkillMaterial(skillName: string, isActive: boolean, size: number) {
  // Enhanced black glass properties with consistent oil spill effect
  const baseProps = {
    transparent: true,
    opacity: 0.88, // Consistent opacity regardless of active state
    transmission: 0.07, // Consistent transmission
    thickness: size * 0.2, // Thicker glass for better oil effect
    roughness: 0.0, // Perfect smoothness for maximum reflections
    metalness: 0.3, // Increased metallic quality for stronger oil effect
    clearcoat: 1.0, // Maximum clear coating
    clearcoatRoughness: 0.0, // Perfect clearcoat smoothness
    ior: 1.6, // Higher index of refraction for more dramatic oil on water effect
    reflectivity: 1.0, // Maximum reflectivity
    
    // Deeper black base color - consistent
    color: "#050505", // Even darker black
    
    // Enhanced oil spill iridescence effect - consistent
    envMapIntensity: 4.8, // Consistent high environment reflection
    
    // Stronger oil spill effect properties - consistent
    sheen: 1.0, // Maximum sheen for oil surface
    sheenRoughness: 0.0, // Perfect sheen smoothness
    sheenColor: "#3a2a5a", // Consistent purple sheen for oil
    
    // Enhanced emissive properties for inner glow - consistent
    emissive: "#0f0a20", // Consistent purple/blue emissive
    emissiveIntensity: 0.5, // Consistent emissive intensity
    
    // Boosted specular highlights for rainbow reflections - consistent
    specularIntensity: 1.0,
    specularColor: "#5a3a7a", // Consistent specular colors
  }

  // Enhanced variations with more pronounced color differences - but consistent regardless of active state
  const variations = {
    // Programming Languages - electric blue tints
    'Python': { sheenColor: "#2a2a6a", specularColor: "#4a4a8a", emissive: "#0a0a20" },
    'JavaScript': { sheenColor: "#2a2a4a", specularColor: "#6a6a4a", emissive: "#0a0a10" },
    'TypeScript': { sheenColor: "#2a4a6a", specularColor: "#4a6a8a", emissive: "#0a1020" },
    'R': { sheenColor: "#4a2a4a", specularColor: "#8a4a6a", emissive: "#200a10" },
    'SQL': { sheenColor: "#2a4a2a", specularColor: "#4a8a4a", emissive: "#0a200a" },
    'Java': { sheenColor: "#4a2a2a", specularColor: "#8a4a4a", emissive: "#200a0a" },

    // AI & Machine Learning - vivid gemstone tints with enhanced brilliance
    'TensorFlow': { sheenColor: "#4a2a6a", specularColor: "#8a4a9a", emissive: "#1a0a30", 
                   transmission: 0.15, ior: 2.4, reflectivity: 1.0, clearcoat: 1.0 }, // Diamond properties
    'Keras': { sheenColor: "#452a6a", specularColor: "#854a9a", emissive: "#180a30",
              transmission: 0.12, ior: 1.8, reflectivity: 0.95, clearcoat: 1.0 }, // Emerald properties
    'scikit-learn': { sheenColor: "#4a2a65", specularColor: "#8a4a95", emissive: "#1a0a2a",
                     transmission: 0.10, ior: 1.7, reflectivity: 0.9, clearcoat: 1.0 }, // Ruby properties
    'PySpark': { sheenColor: "#4a2a70", specularColor: "#8a4aa0", emissive: "#1a0a35",
                transmission: 0.18, ior: 1.6, reflectivity: 0.85, clearcoat: 1.0 }, // Crystal properties
    'Deep Learning': { sheenColor: "#5a2a6a", specularColor: "#9a4a9a", emissive: "#2a0a30",
                      transmission: 0.08, ior: 1.9, reflectivity: 0.98, clearcoat: 1.0 }, // Sapphire properties
    'Computer Vision': { sheenColor: "#4a3a6a", specularColor: "#8a6a9a", emissive: "#1a1530",
                        transmission: 0.14, ior: 1.65, reflectivity: 0.88, clearcoat: 1.0 }, // Topaz properties

    // Cloud & Infrastructure - bright cyan tints
    'Azure': { sheenColor: "#2a4a6a", specularColor: "#4a8a9a", emissive: "#0a1530" },
    'AWS': { sheenColor: "#2a5a6a", specularColor: "#4a9a9a", emissive: "#0a2030" },
    'Docker': { sheenColor: "#2a4a65", specularColor: "#4a8a95", emissive: "#0a152a" },
    'Kubernetes': { sheenColor: "#2a4a70", specularColor: "#4a8aa0", emissive: "#0a1535" },
    'Jenkins': { sheenColor: "#2a454a", specularColor: "#4a858a", emissive: "#0a1815" },
    'Microservices': { sheenColor: "#2a4a5a", specularColor: "#4a8a9a", emissive: "#0a1520" },

    // Data & Analytics - vibrant green tints
    'PostgreSQL': { sheenColor: "#2a6a4a", specularColor: "#4a9a8a", emissive: "#0a300a" },
    'Hadoop': { sheenColor: "#2a6a45", specularColor: "#4a9a85", emissive: "#0a2a0a" },
    'Dataiku': { sheenColor: "#2a652a", specularColor: "#4a954a", emissive: "#0a250a" },
    'Power BI': { sheenColor: "#3a6a2a", specularColor: "#6a9a4a", emissive: "#15300a" },
    'Data Warehousing': { sheenColor: "#2a6a3a", specularColor: "#4a9a6a", emissive: "#0a3015" },
    'ETL': { sheenColor: "#2a602a", specularColor: "#4a904a", emissive: "#0a300a" },

    // Web Development - bright orange/amber tints
    'React.js': { sheenColor: "#6a4a2a", specularColor: "#9a8a4a", emissive: "#30150a" },
    'Next.js': { sheenColor: "#6a452a", specularColor: "#9a854a", emissive: "#301a0a" },
    'Flask': { sheenColor: "#654a2a", specularColor: "#958a4a", emissive: "#25150a" },
    'Node.js': { sheenColor: "#6a5a2a", specularColor: "#9a9a4a", emissive: "#30200a" },
    'REST APIs': { sheenColor: "#602a2a", specularColor: "#904a4a", emissive: "#300a0a" },
    'GraphQL': { sheenColor: "#6a2a3a", specularColor: "#9a4a6a", emissive: "#300a15" },

    // Project Management - bright pink tints
    'Agile': { sheenColor: "#6a2a4a", specularColor: "#9a4a8a", emissive: "#300a20" },
    'Scrum': { sheenColor: "#6a2a45", specularColor: "#9a4a85", emissive: "#300a18" },
    'Kanban': { sheenColor: "#652a4a", specularColor: "#954a8a", emissive: "#250a20" },
    'Jira': { sheenColor: "#6a3a4a", specularColor: "#9a6a8a", emissive: "#301520" },
    'Leadership': { sheenColor: "#6a2a5a", specularColor: "#9a4a9a", emissive: "#300a25" },
    'Team Building': { sheenColor: "#652a5a", specularColor: "#954a9a", emissive: "#250a25" },
  }

  const variation = variations[skillName as keyof typeof variations] || {}
  
  return {
    ...baseProps,
    ...variation,
  }
}

// Glitter Effect Component for Active Skills
function GlitterEffect({ position, size, isActive }: { 
  position: [number, number, number], 
  size: number, 
  isActive: boolean 
}) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Generate glitter particles positions and properties
  const glitterParticles = useMemo(() => {
    if (!isActive) return []
    
    const particles = []
    const particleCount = 20 + Math.floor(size * 10) // More particles for larger objects
    
    for (let i = 0; i < particleCount; i++) {
      // Create particles in a sphere around the object
      const radius = size * 1.8 + Math.random() * 0.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      particles.push({
        id: i,
        position: [x, y, z] as [number, number, number],
        scale: 0.02 + Math.random() * 0.04,
        speed: 0.5 + Math.random() * 1.0,
        offset: Math.random() * Math.PI * 2,
        color: `hsl(${Math.random() * 60 + 200}, 80%, ${70 + Math.random() * 30}%)` // Blue to purple sparkles
      })
    }
    
    return particles
  }, [isActive, size])
  
  // Animate the glitter particles
  useFrame((state) => {
    if (!groupRef.current || !isActive) return
    
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.3
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
    
    // Animate individual particles
    groupRef.current.children.forEach((child, index) => {
      if (child && glitterParticles[index]) {
        const particle = glitterParticles[index]
        const scaleOffset = 0.8 + Math.sin(time * particle.speed * 2 + particle.offset) * 0.4
        
        child.scale.setScalar(particle.scale * scaleOffset)
        
        // Add some sparkle by varying opacity
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.opacity = 0.6 + Math.sin(time * particle.speed * 3 + particle.offset) * 0.4
        }
      }
    })
  })
  
  if (!isActive) return null
  
  return (
    <group ref={groupRef} position={position}>
      {glitterParticles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.scale * 20, 4, 4]} />
          <meshStandardMaterial
            color={particle.color}
            transparent
            opacity={0.8}
            emissive={particle.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      {/* Add some larger sparkle effects */}
      {glitterParticles.slice(0, 8).map((particle, index) => (
        <mesh 
          key={`sparkle-${particle.id}`} 
          position={[
            particle.position[0] * 1.2, 
            particle.position[1] * 1.2, 
            particle.position[2] * 1.2
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.15]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
            emissive="#aaffff"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      {/* Cross-shaped sparkles for extra glitter */}
      {glitterParticles.slice(0, 8).map((particle, index) => (
        <mesh 
          key={`cross-${particle.id}`} 
          position={[
            particle.position[0] * 1.2, 
            particle.position[1] * 1.2, 
            particle.position[2] * 1.2
          ]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <boxGeometry args={[0.02, 0.02, 0.15]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
            emissive="#aaffff"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// Function to determine which AI & ML services should have multiple gemstones
function getMultiGemstoneConfig(skillName: string, size: number) {
  switch (skillName) {
    case 'TensorFlow':
      // Neural network diamond cluster - 5 gemstone formation
      return [
        // Central brilliant diamond
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        // Satellite network diamonds
        { position: [size * 0.7, size * 0.2, 0] as [number, number, number], scale: 0.6 },
        { position: [-size * 0.6, size * 0.3, 0] as [number, number, number], scale: 0.5 },
        { position: [size * 0.2, -size * 0.7, 0] as [number, number, number], scale: 0.7 },
        // Separated neural node
        { position: [size * 1.1, -size * 0.4, size * 0.3] as [number, number, number], scale: 0.4 }
      ]
    case 'Deep Learning':
      // Deep sapphire constellation - 7 gemstone formation
      return [
        // Main sapphire
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        // Layer gemstones (symmetric)
        { position: [size * 0.5, 0, size * 0.5] as [number, number, number], scale: 0.7 },
        { position: [-size * 0.5, 0, size * 0.5] as [number, number, number], scale: 0.7 },
        { position: [size * 0.5, 0, -size * 0.5] as [number, number, number], scale: 0.6 },
        { position: [-size * 0.5, 0, -size * 0.5] as [number, number, number], scale: 0.6 },
        // Deep learning satellites
        { position: [size * 0.3, size * 1.0, 0] as [number, number, number], scale: 0.5 },
        { position: [-size * 0.4, -size * 1.1, size * 0.2] as [number, number, number], scale: 0.4 }
      ]
    case 'Computer Vision':
      // Vision topaz array - 6 gemstone eye formation
      return [
        // Central vision gem
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        // Vision processing gems (symmetric pair)
        { position: [size * 0.6, size * 0.1, 0] as [number, number, number], scale: 0.8 },
        { position: [-size * 0.6, size * 0.1, 0] as [number, number, number], scale: 0.8 },
        // Focus adjustment gems
        { position: [size * 0.2, size * 0.7, 0] as [number, number, number], scale: 0.6 },
        { position: [-size * 0.2, -size * 0.7, 0] as [number, number, number], scale: 0.6 },
        // Separated analysis gem
        { position: [size * 1.2, size * 0.5, -size * 0.3] as [number, number, number], scale: 0.5 }
      ]
    default:
      // Single gemstone for other AI/ML skills
      return [{ position: [0, 0, 0] as [number, number, number], scale: 1.0 }]
  }
}

// Function to determine which cloud services should have multiple bubbles
function getMultiBubbleConfig(skillName: string, size: number) {
  switch (skillName) {
    case 'Azure':
      // Symmetric cloud formation with separated satellites - 8 bubbles
      return [
        // Central cluster (symmetric)
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        { position: [size * 0.4, 0, 0] as [number, number, number], scale: 0.7 },
        { position: [-size * 0.4, 0, 0] as [number, number, number], scale: 0.7 },
        { position: [0, size * 0.4, 0] as [number, number, number], scale: 0.6 },
        { position: [0, -size * 0.4, 0] as [number, number, number], scale: 0.6 },
        // Separated satellites
        { position: [size * 1.2, size * 0.3, 0] as [number, number, number], scale: 0.4 },
        { position: [-size * 1.1, -size * 0.2, 0] as [number, number, number], scale: 0.5 },
        { position: [size * 0.2, size * 1.3, 0] as [number, number, number], scale: 0.3 }
      ]
    case 'AWS':
      // Distributed cloud with orbital satellites - 7 bubbles
      return [
        // Main cluster
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        { position: [size * 0.3, size * 0.2, 0] as [number, number, number], scale: 0.8 },
        { position: [-size * 0.2, size * 0.3, 0] as [number, number, number], scale: 0.7 },
        { position: [size * 0.1, -size * 0.3, 0] as [number, number, number], scale: 0.6 },
        // Separated orbital satellites
        { position: [size * 1.0, size * 0.8, size * 0.2] as [number, number, number], scale: 0.4 },
        { position: [-size * 1.1, -size * 0.5, -size * 0.3] as [number, number, number], scale: 0.5 },
        { position: [size * 0.7, -size * 1.2, size * 0.1] as [number, number, number], scale: 0.3 }
      ]
    case 'Docker':
      // Linear symmetric container formation - 6 bubbles
      return [
        // Symmetric main line
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        { position: [size * 0.5, 0, 0] as [number, number, number], scale: 0.8 },
        { position: [-size * 0.5, 0, 0] as [number, number, number], scale: 0.8 },
        { position: [size * 1.0, 0, 0] as [number, number, number], scale: 0.6 },
        // Separated containers
        { position: [size * 0.2, size * 1.0, 0] as [number, number, number], scale: 0.5 },
        { position: [-size * 0.3, -size * 1.1, 0] as [number, number, number], scale: 0.4 }
      ]
    case 'Kubernetes':
      // Hexagonal symmetric pod formation with satellites - 9 bubbles
      return [
        // Central hub
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        // Hexagonal symmetric pods
        { position: [size * 0.4, 0, 0] as [number, number, number], scale: 0.7 },
        { position: [-size * 0.4, 0, 0] as [number, number, number], scale: 0.7 },
        { position: [size * 0.2, size * 0.35, 0] as [number, number, number], scale: 0.6 },
        { position: [-size * 0.2, size * 0.35, 0] as [number, number, number], scale: 0.6 },
        { position: [size * 0.2, -size * 0.35, 0] as [number, number, number], scale: 0.6 },
        { position: [-size * 0.2, -size * 0.35, 0] as [number, number, number], scale: 0.6 },
        // Separated worker nodes
        { position: [size * 1.2, size * 0.4, size * 0.3] as [number, number, number], scale: 0.4 },
        { position: [-size * 1.0, -size * 0.6, -size * 0.2] as [number, number, number], scale: 0.5 }
      ]
    case 'Jenkins':
      // Pipeline with branching satellites - 8 bubbles
      return [
        // Main pipeline (linear)
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        { position: [size * 0.4, 0, 0] as [number, number, number], scale: 0.8 },
        { position: [size * 0.8, 0, 0] as [number, number, number], scale: 0.7 },
        { position: [-size * 0.4, 0, 0] as [number, number, number], scale: 0.8 },
        { position: [-size * 0.8, 0, 0] as [number, number, number], scale: 0.6 },
        // Branching pipelines (separated)
        { position: [size * 0.4, size * 0.8, 0] as [number, number, number], scale: 0.5 },
        { position: [size * 0.8, size * 1.2, 0] as [number, number, number], scale: 0.4 },
        { position: [-size * 0.2, -size * 1.0, 0] as [number, number, number], scale: 0.4 }
      ]
    case 'Microservices':
      // Distributed symmetric clusters with scattered services - 12 bubbles
      return [
        // Central service cluster
        { position: [0, 0, 0] as [number, number, number], scale: 0.8 },
        { position: [size * 0.3, 0, 0] as [number, number, number], scale: 0.6 },
        { position: [-size * 0.3, 0, 0] as [number, number, number], scale: 0.6 },
        { position: [0, size * 0.3, 0] as [number, number, number], scale: 0.5 },
        { position: [0, -size * 0.3, 0] as [number, number, number], scale: 0.5 },
        // Secondary service cluster
        { position: [size * 0.8, size * 0.2, 0] as [number, number, number], scale: 0.6 },
        { position: [size * 1.0, 0, 0] as [number, number, number], scale: 0.5 },
        { position: [size * 0.9, -size * 0.2, 0] as [number, number, number], scale: 0.4 },
        // Scattered independent services
        { position: [-size * 1.1, size * 0.6, size * 0.3] as [number, number, number], scale: 0.4 },
        { position: [size * 0.2, size * 1.3, -size * 0.2] as [number, number, number], scale: 0.3 },
        { position: [-size * 0.7, -size * 1.1, size * 0.1] as [number, number, number], scale: 0.4 },
        { position: [size * 1.3, size * 0.8, size * 0.4] as [number, number, number], scale: 0.3 }
      ]
    default:
      // Fallback single bubble
      return [{ position: [0, 0, 0] as [number, number, number], scale: 1.0 }]
  }
}

// Function to determine which data analytics services should have multiple cubicles
function getMultiCubicleConfig(skillName: string, size: number) {
  switch (skillName) {
    case 'PostgreSQL':
      // Database cluster - 5 cubicle symmetric formation
      return [
        // Central database
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        // Symmetric replica nodes
        { position: [size * 0.6, 0, 0] as [number, number, number], scale: 0.7 },
        { position: [-size * 0.6, 0, 0] as [number, number, number], scale: 0.7 },
        { position: [0, 0, size * 0.6] as [number, number, number], scale: 0.7 },
        { position: [0, 0, -size * 0.6] as [number, number, number], scale: 0.7 }
      ]
    case 'Hadoop':
      // Distributed storage cluster - 8 cubicle formation
      return [
        // Central namenode
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        // Data nodes in symmetric grid
        { position: [size * 0.5, 0, size * 0.5] as [number, number, number], scale: 0.6 },
        { position: [-size * 0.5, 0, size * 0.5] as [number, number, number], scale: 0.6 },
        { position: [size * 0.5, 0, -size * 0.5] as [number, number, number], scale: 0.6 },
        { position: [-size * 0.5, 0, -size * 0.5] as [number, number, number], scale: 0.6 },
        // Separated backup nodes
        { position: [size * 1.2, size * 0.3, 0] as [number, number, number], scale: 0.5 },
        { position: [-size * 1.2, size * 0.3, 0] as [number, number, number], scale: 0.5 },
        { position: [0, size * 1.2, 0] as [number, number, number], scale: 0.4 }
      ]
    case 'Dataiku':
      // Data pipeline flow - 6 cubicle linear formation
      return [
        // Main pipeline stages
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        { position: [size * 0.8, 0, 0] as [number, number, number], scale: 0.8 },
        { position: [size * 1.6, 0, 0] as [number, number, number], scale: 0.7 },
        { position: [-size * 0.8, 0, 0] as [number, number, number], scale: 0.8 },
        // Branching processes
        { position: [size * 0.4, size * 0.8, 0] as [number, number, number], scale: 0.6 },
        { position: [size * 1.2, -size * 0.8, 0] as [number, number, number], scale: 0.5 }
      ]
    case 'Power BI':
      // Dashboard grid - 7 cubicle symmetric layout
      return [
        // Central dashboard
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        // Report cubicles in grid
        { position: [size * 0.7, 0, 0] as [number, number, number], scale: 0.7 },
        { position: [-size * 0.7, 0, 0] as [number, number, number], scale: 0.7 },
        { position: [0, size * 0.7, 0] as [number, number, number], scale: 0.6 },
        { position: [0, -size * 0.7, 0] as [number, number, number], scale: 0.6 },
        // Data source connections
        { position: [size * 1.0, size * 1.0, 0] as [number, number, number], scale: 0.5 },
        { position: [-size * 1.0, -size * 1.0, 0] as [number, number, number], scale: 0.5 }
      ]
    case 'Data Warehousing':
      // Warehouse structure - 9 cubicle storage formation
      return [
        // Main warehouse
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        // Storage sections in symmetric grid
        { position: [size * 0.6, 0, size * 0.6] as [number, number, number], scale: 0.8 },
        { position: [-size * 0.6, 0, size * 0.6] as [number, number, number], scale: 0.8 },
        { position: [size * 0.6, 0, -size * 0.6] as [number, number, number], scale: 0.8 },
        { position: [-size * 0.6, 0, -size * 0.6] as [number, number, number], scale: 0.8 },
        // Archive storage (separated)
        { position: [size * 1.3, 0, 0] as [number, number, number], scale: 0.6 },
        { position: [-size * 1.3, 0, 0] as [number, number, number], scale: 0.6 },
        { position: [0, size * 1.3, 0] as [number, number, number], scale: 0.5 },
        { position: [0, -size * 1.3, 0] as [number, number, number], scale: 0.5 }
      ]
    case 'ETL':
      // ETL process stages - 6 cubicle transformation pipeline
      return [
        // Extract stage
        { position: [0, 0, 0] as [number, number, number], scale: 1.0 },
        // Transform stages (symmetric)
        { position: [size * 0.5, size * 0.4, 0] as [number, number, number], scale: 0.8 },
        { position: [-size * 0.5, size * 0.4, 0] as [number, number, number], scale: 0.8 },
        { position: [0, size * 0.8, 0] as [number, number, number], scale: 0.7 },
        // Load stage
        { position: [size * 0.2, size * 1.2, 0] as [number, number, number], scale: 0.9 },
        // Quality control (separated)
        { position: [size * 1.0, size * 0.2, size * 0.4] as [number, number, number], scale: 0.5 }
      ]
    default:
      // Fallback single cubicle
      return [{ position: [0, 0, 0] as [number, number, number], scale: 1.0 }]
  }
}

// Enhanced Skills Display with Glass Materials and Light Reflection
function SimpleSkillsDisplay({ skills, activeSkill, setActiveSkill }: { 
  skills: Array<{
    name: string;
    level: number;
    position: [number, number, number];
    description: string;
  }>, 
  activeSkill: string, 
  setActiveSkill: (skill: string) => void 
}) {
  const groupRefs = useRef<(THREE.Group | null)[]>([])
  
  // Animate rotation for all skill objects
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    groupRefs.current.forEach((ref, index) => {
      if (ref) {
        // Slow rotation with slight variation per object
        ref.rotation.y = time * 0.2 + index * 0.1
        ref.rotation.x = Math.sin(time * 0.15 + index * 0.2) * 0.1
      }
    })
  })

  return (
    <group>
      {skills.map((skill, i) => {
        const gridCols = 3
        const col = i % gridCols
        const row = Math.floor(i / gridCols)
        const size = 0.8 + skill.level / 200 // Increased base size and scaling factor
        
        return (
          <group 
            key={skill.name}
            position={[
              (col - 1) * 6.0, // Much larger spacing for extensive bubble formations with satellites
              1.5 - row * 5.0, // Increased vertical spacing for separated bubbles
              0
            ]}
            onClick={() => setActiveSkill(skill.name)}
          >
            {/* Rotating skill objects group */}
            <group ref={(el) => { groupRefs.current[i] = el }}>
              {/* Render multiple formations based on category */}
              {skillCategories.find(cat => cat.name === "Cloud & Infrastructure")?.skills.some(s => s.name === skill.name) ? (
                // Multi-bubble cloud formations
                getMultiBubbleConfig(skill.name, size).map((bubble, index) => (
                  <mesh 
                    key={index}
                    position={bubble.position}
                    scale={[bubble.scale, bubble.scale, bubble.scale]}
                  >
                    <sphereGeometry args={[size * 0.6, 16, 12]} />
                    <meshPhysicalMaterial 
                      {...getSkillMaterial(skill.name, activeSkill === skill.name, size)}
                    />
                  </mesh>
                ))
              ) : skillCategories.find(cat => cat.name === "Data & Analytics")?.skills.some(s => s.name === skill.name) ? (
                // Multi-cubicle data formations
                getMultiCubicleConfig(skill.name, size).map((cubicle, index) => (
                  <mesh 
                    key={index}
                    position={cubicle.position}
                    scale={[cubicle.scale, cubicle.scale, cubicle.scale]}
                  >
                    <boxGeometry args={[size * 0.6, size * 0.6, size * 0.6]} />
                    <meshPhysicalMaterial 
                      {...getSkillMaterial(skill.name, activeSkill === skill.name, size)}
                    />
                  </mesh>
                ))
              ) : skillCategories.find(cat => cat.name === "AI & Machine Learning")?.skills.some(s => s.name === skill.name) ? (
                // Multi-gemstone AI formations
                getMultiGemstoneConfig(skill.name, size).map((gemstone, index) => (
                  <mesh 
                    key={index}
                    position={gemstone.position}
                    scale={[gemstone.scale, gemstone.scale, gemstone.scale]}
                  >
                    {getSkillGeometry(skill.name, size * gemstone.scale)}
                    <meshPhysicalMaterial 
                      {...getSkillMaterial(skill.name, activeSkill === skill.name, size)}
                    />
                  </mesh>
                ))
              ) : (
                // Single geometry for other skills
                <mesh>
                  {getSkillGeometry(skill.name, size)}
                  <meshPhysicalMaterial 
                    {...getSkillMaterial(skill.name, activeSkill === skill.name, size)}
                  />
                </mesh>
              )}
              {/* Add glitter effect for active skill */}
              <GlitterEffect 
                position={[0, 0, 0]} 
                size={size} 
                isActive={activeSkill === skill.name} 
              />
            </group>
            
            {/* Fixed text that always faces the user (no rotation) */}
            <Text
              position={[0, size + 1.0, 0]} // Increased distance from object
              fontSize={0.28} // Increased font size significantly
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {skill.name}
            </Text>
            <Text
              position={[0, size + 0.6, 0]} // Increased distance and spacing
              fontSize={0.20} // Increased font size
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {skill.level}%
            </Text>
          </group>
        )
      })}
    </group>
  )
}

// Updated Skills3D Scene
function Skills3D({ activeCategory, activeSkill, setActiveSkill }: { 
  activeCategory: number, 
  activeSkill: string, 
  setActiveSkill: (skill: string) => void 
}) {
  const category = skillCategories.find(cat => cat.id === activeCategory) || skillCategories[0]
  

  
  return (
    <>
      {/* Enhanced lighting for dramatic oil spill glass reflections */}
      <ambientLight intensity={0.15} color="#0a0a1a" />
      
      {/* Main powerful rim lights for oil spill reflections - dramatically enhanced */}
      <pointLight position={[15, 15, 15]} intensity={8.0} color="#ffffff" />
      <pointLight position={[-15, -15, -15]} intensity={6.0} color="#5555ff" />
      <pointLight position={[0, 0, 25]} intensity={5.0} color="#ffffff" />
      <pointLight position={[0, 20, 0]} intensity={4.5} color="#ffcc44" />
      <pointLight position={[20, 0, 0]} intensity={4.0} color="#ffffff" />
      <pointLight position={[-20, 0, 0]} intensity={4.0} color="#44aaff" />
      
      {/* Rainbow accent lights for vivid oil spill iridescence - much stronger */}
      <pointLight position={[12, 10, 12]} intensity={3.5} color="#ff2244" />
      <pointLight position={[-12, 10, 12]} intensity={3.5} color="#22ff44" />
      <pointLight position={[0, 15, -15]} intensity={3.0} color="#2244ff" />
      <pointLight position={[10, -10, 10]} intensity={2.8} color="#ff4422" />
      <pointLight position={[-10, -10, 10]} intensity={2.8} color="#22ffaa" />
      <pointLight position={[0, -15, 0]} intensity={2.5} color="#aa22ff" />
      
      {/* Additional rainbow ring lights for enhanced iridescence */}
      <pointLight position={[8, 8, -8]} intensity={2.2} color="#ffaa22" />
      <pointLight position={[-8, 8, -8]} intensity={2.2} color="#22aaff" />
      <pointLight position={[8, -8, -8]} intensity={2.0} color="#aa22aa" />
      <pointLight position={[-8, -8, -8]} intensity={2.0} color="#22aa22" />
      
      {/* Multiple directional lights for oil surface reflections */}
      <directionalLight 
        position={[8, 15, 8]} 
        intensity={3.5} 
        color="#ffffff"
        castShadow={false}
      />
      <directionalLight 
        position={[-8, 15, -8]} 
        intensity={2.5} 
        color="#7744ff"
        castShadow={false}
      />
      <directionalLight 
        position={[15, 8, 0]} 
        intensity={2.0} 
        color="#ff7744"
        castShadow={false}
      />
      <directionalLight 
        position={[-15, 8, 0]} 
        intensity={2.0} 
        color="#44ff77"
        castShadow={false}
      />
      
      {/* Overhead spotlights for dramatic oil spill highlighting */}
      <spotLight 
        position={[0, 25, 0]} 
        target-position={[0, 0, 0]}
        intensity={6.0} 
        angle={Math.PI / 2.5}
        penumbra={0.2}
        color="#ffffff"
        castShadow={false}
      />
      <spotLight 
        position={[10, 20, 10]} 
        target-position={[0, 0, 0]}
        intensity={4.0} 
        angle={Math.PI / 3}
        penumbra={0.3}
        color="#ff4477"
        castShadow={false}
      />
      <spotLight 
        position={[-10, 20, -10]} 
        target-position={[0, 0, 0]}
        intensity={4.0} 
        angle={Math.PI / 3}
        penumbra={0.3}
        color="#4477ff"
        castShadow={false}
      />
      
      {/* Side spotlights for edge reflections */}
      <spotLight 
        position={[20, 5, 0]} 
        target-position={[0, 0, 0]}
        intensity={3.5} 
        angle={Math.PI / 4}
        penumbra={0.4}
        color="#ffaa44"
        castShadow={false}
      />
      <spotLight 
        position={[-20, 5, 0]} 
        target-position={[0, 0, 0]}
        intensity={3.5} 
        angle={Math.PI / 4}
        penumbra={0.4}
        color="#44aaff"
        castShadow={false}
      />
      
      <SimpleSkillsDisplay
        skills={category.skills}
        activeSkill={activeSkill}
        setActiveSkill={setActiveSkill}
      />
      
      <Environment preset="night" />
      <OrbitControls
        enableZoom={false} // Enable zoom for closer inspection
        enablePan={true}
        autoRotate={false}
        maxDistance={30} // Increased max distance for zoomed out extensive formations
        minDistance={8} // Increased min distance for better navigation
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
    <section className="min-h-screen bg-black pt-4 pb-20">
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
            Explore my technical expertise in 3D. Each object represents a skill with black glass surfaces that shimmer like oil on water, sized by proficiency level.
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
                      ? 'bg-white/20 text-white shadow-lg border border-white/30'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/10'
                  }`}
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
            <Canvas camera={{ position: [12, 8, 12], fov: 60 }}> {/* Zoomed out camera for better view of extensive bubble formations */}
              <Skills3D
                activeCategory={activeCategory}
                activeSkill={activeSkill}
                setActiveSkill={setActiveSkill}
              />
            </Canvas>
            

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
                <div className="w-4 h-4 rounded-full bg-white/30 border border-white/50" />
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
                        className="h-full rounded-full bg-white/70"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentSkill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                    <span className="text-white font-medium">{currentSkill.level}%</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {currentSkill.description}
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
                    <span className="text-sm font-bold text-white/80">
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