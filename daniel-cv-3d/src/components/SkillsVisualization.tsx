'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Environment, Text, Box } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
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
    // Programming Languages
    case 'Python':
      // Snake-like coiled shape using torus
      return <torusGeometry args={[size * 0.5, size * 0.15, 8, 16]} />
    case 'JavaScript':
      // Dynamic, flexible shape - twisted torus
      return <torusKnotGeometry args={[size * 0.4, size * 0.1, 64, 8, 2, 3]} />
    case 'TypeScript':
      // More structured, angular - octahedron (typed structure)
      return <octahedronGeometry args={[size * 0.7]} />
    case 'R':
      // Statistical bars - box but elongated vertically
      return <boxGeometry args={[size * 0.4, size * 1.2, size * 0.4]} />
    case 'SQL':
      // Database table structure - flat, wide box
      return <boxGeometry args={[size * 1.2, size * 0.3, size * 0.8]} />
    case 'Java':
      // Coffee cup shape - cylinder with wider top
      return <cylinderGeometry args={[size * 0.6, size * 0.4, size * 0.8, 8]} />

    // AI & Machine Learning
    case 'TensorFlow':
      // Neural network nodes - sphere with connections
      return <icosahedronGeometry args={[size * 0.6]} />
    case 'Keras':
      // Layered structure - multiple thin cylinders
      return <cylinderGeometry args={[size * 0.7, size * 0.7, size * 0.4, 16]} />
    case 'scikit-learn':
      // Decision tree structure - cone (tree shape)
      return <coneGeometry args={[size * 0.7, size * 1.1, 8]} />
    case 'PySpark':
      // Spark/lightning - sharp, pointed shape
      return <coneGeometry args={[size * 0.3, size * 1.4, 4]} />
    case 'Deep Learning':
      // Deep layered structure - stacked rings
      return <cylinderGeometry args={[size * 0.6, size * 0.6, size * 1.2, 6]} />
    case 'Computer Vision':
      // Eye/camera lens - sphere (eye shape)
      return <sphereGeometry args={[size * 0.7, 16, 12]} />

    // Cloud & Infrastructure
    case 'Azure':
      // Cloud shape - puffy, organic
      return <dodecahedronGeometry args={[size * 0.6]} />
    case 'AWS':
      // More geometric cloud - icosahedron
      return <icosahedronGeometry args={[size * 0.7]} />
    case 'Docker':
      // Container shape - box (shipping container)
      return <boxGeometry args={[size * 1.2, size * 0.6, size * 0.8]} />
    case 'Kubernetes':
      // Interconnected pods - multiple spheres concept, using compound shape
      return <octahedronGeometry args={[size * 0.6]} />
    case 'Jenkins':
      // Pipeline - long cylinder
      return <cylinderGeometry args={[size * 0.3, size * 0.3, size * 1.4, 8]} />
    case 'Microservices':
      // Small connected services - cluster of small shapes
      return <tetrahedronGeometry args={[size * 0.8]} />

    // Data & Analytics
    case 'PostgreSQL':
      // Elephant shape abstraction - rounded, robust
      return <sphereGeometry args={[size * 0.8, 12, 8]} />
    case 'Hadoop':
      // Another elephant - but more angular
      return <dodecahedronGeometry args={[size * 0.7]} />
    case 'Dataiku':
      // Data flow - twisted shape
      return <torusKnotGeometry args={[size * 0.4, size * 0.1, 32, 8, 3, 2]} />
    case 'Power BI':
      // Chart/graph bars - elongated box
      return <boxGeometry args={[size * 0.3, size * 1.3, size * 0.3]} />
    case 'Data Warehousing':
      // Warehouse building - wide, stable box
      return <boxGeometry args={[size * 1.4, size * 0.8, size * 1.0]} />
    case 'ETL':
      // Transformation funnel - cone
      return <coneGeometry args={[size * 0.8, size * 1.0, 6]} />

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

// Function to get unique glass material properties for each skill
function getSkillMaterial(skillName: string, isActive: boolean, size: number) {
  const baseProps = {
    transparent: true,
    opacity: isActive ? 0.85 : 0.7,
    transmission: isActive ? 0.95 : 0.8, // Glass-like transmission
    thickness: size * 0.1, // Glass thickness
    roughness: 0.0, // Very smooth for glass
    metalness: 0.0, // Glass is not metallic
    clearcoat: 1.0, // Clear coating
    clearcoatRoughness: 0.0,
    ior: 1.5, // Index of refraction for glass
    reflectivity: 0.9,
  }

  // Different glass tints and properties for each skill category
  switch (skillName) {
    // Programming Languages - Clear glass with subtle blue tint
    case 'Python':
      return { ...baseProps, color: isActive ? "#e6f3ff" : "#b3d9ff", envMapIntensity: 1.5 }
    case 'JavaScript':
      return { ...baseProps, color: isActive ? "#fff5e6" : "#ffeaa3", envMapIntensity: 1.3 }
    case 'TypeScript':
      return { ...baseProps, color: isActive ? "#e6e6ff" : "#b3b3ff", envMapIntensity: 1.4 }
    case 'R':
      return { ...baseProps, color: isActive ? "#ffe6f0" : "#ffb3d6", envMapIntensity: 1.2 }
    case 'SQL':
      return { ...baseProps, color: isActive ? "#f0ffe6" : "#d6ffb3", envMapIntensity: 1.3 }
    case 'Java':
      return { ...baseProps, color: isActive ? "#ffe6e6" : "#ffb3b3", envMapIntensity: 1.4 }

    // AI & Machine Learning - Neural network purple/magenta glass
    case 'TensorFlow':
      return { ...baseProps, color: isActive ? "#f0e6ff" : "#d6b3ff", envMapIntensity: 2.0, transmission: 0.9 }
    case 'Keras':
      return { ...baseProps, color: isActive ? "#ffe6ff" : "#ffb3ff", envMapIntensity: 1.8 }
    case 'scikit-learn':
      return { ...baseProps, color: isActive ? "#f3e6ff" : "#e6b3ff", envMapIntensity: 1.7 }
    case 'PySpark':
      return { ...baseProps, color: isActive ? "#ede6ff" : "#dbb3ff", envMapIntensity: 1.9 }
    case 'Deep Learning':
      return { ...baseProps, color: isActive ? "#f7e6ff" : "#efb3ff", envMapIntensity: 2.1 }
    case 'Computer Vision':
      return { ...baseProps, color: isActive ? "#fae6ff" : "#f5b3ff", envMapIntensity: 1.6 }

    // Cloud & Infrastructure - Sky blue/cyan glass
    case 'Azure':
      return { ...baseProps, color: isActive ? "#e6f7ff" : "#b3efff", envMapIntensity: 1.8, transmission: 0.95 }
    case 'AWS':
      return { ...baseProps, color: isActive ? "#e6faff" : "#b3f0ff", envMapIntensity: 1.7 }
    case 'Docker':
      return { ...baseProps, color: isActive ? "#e6fcff" : "#b3f7ff", envMapIntensity: 1.5 }
    case 'Kubernetes':
      return { ...baseProps, color: isActive ? "#e6ffff" : "#b3ffff", envMapIntensity: 1.6 }
    case 'Jenkins':
      return { ...baseProps, color: isActive ? "#e6fffc" : "#b3fff7", envMapIntensity: 1.4 }
    case 'Microservices':
      return { ...baseProps, color: isActive ? "#e6fff0" : "#b3ffe6", envMapIntensity: 1.5 }

    // Data & Analytics - Emerald/green glass
    case 'PostgreSQL':
      return { ...baseProps, color: isActive ? "#e6ffe6" : "#b3ffb3", envMapIntensity: 1.6, transmission: 0.88 }
    case 'Hadoop':
      return { ...baseProps, color: isActive ? "#f0ffe6" : "#d6ffb3", envMapIntensity: 1.5 }
    case 'Dataiku':
      return { ...baseProps, color: isActive ? "#f3ffe6" : "#e6ffb3", envMapIntensity: 1.7 }
    case 'Power BI':
      return { ...baseProps, color: isActive ? "#f7ffe6" : "#efFFB3", envMapIntensity: 1.4 }
    case 'Data Warehousing':
      return { ...baseProps, color: isActive ? "#faffe6" : "#f5ffb3", envMapIntensity: 1.6 }
    case 'ETL':
      return { ...baseProps, color: isActive ? "#fdffe6" : "#fbffb3", envMapIntensity: 1.5 }

    // Web Development - Orange/amber glass
    case 'React.js':
      return { ...baseProps, color: isActive ? "#fff7e6" : "#ffeeb3", envMapIntensity: 1.8, transmission: 0.92 }
    case 'Next.js':
      return { ...baseProps, color: isActive ? "#fffae6" : "#fff5b3", envMapIntensity: 1.6 }
    case 'Flask':
      return { ...baseProps, color: isActive ? "#fffce6" : "#fff9b3", envMapIntensity: 1.5 }
    case 'Node.js':
      return { ...baseProps, color: isActive ? "#ffffe6" : "#ffffb3", envMapIntensity: 1.7 }
    case 'REST APIs':
      return { ...baseProps, color: isActive ? "#fcffe6" : "#f9ffb3", envMapIntensity: 1.4 }
    case 'GraphQL':
      return { ...baseProps, color: isActive ? "#f9ffe6" : "#f2ffb3", envMapIntensity: 1.6 }

    // Project Management - Rose/pink glass
    case 'Agile':
      return { ...baseProps, color: isActive ? "#ffe6f7" : "#ffb3ef", envMapIntensity: 1.5, transmission: 0.85 }
    case 'Scrum':
      return { ...baseProps, color: isActive ? "#ffe6fa" : "#ffb3f5", envMapIntensity: 1.4 }
    case 'Kanban':
      return { ...baseProps, color: isActive ? "#ffe6fc" : "#ffb3f9", envMapIntensity: 1.6 }
    case 'Jira':
      return { ...baseProps, color: isActive ? "#ffe6ff" : "#ffb3ff", envMapIntensity: 1.3 }
    case 'Leadership':
      return { ...baseProps, color: isActive ? "#fce6ff" : "#f9b3ff", envMapIntensity: 1.7 }
    case 'Team Building':
      return { ...baseProps, color: isActive ? "#f9e6ff" : "#f2b3ff", envMapIntensity: 1.5 }

    default:
      return { ...baseProps, color: isActive ? "#ffffff" : "#cccccc", envMapIntensity: 1.0 }
  }
}

// Enhanced Skills Display with Glass Materials and Light Reflection
function SimpleSkillsDisplay({ skills, activeSkill, setActiveSkill }: { 
  skills: any[], 
  activeSkill: string, 
  setActiveSkill: (skill: string) => void 
}) {
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
              (col - 1) * 3.5, // Increased spacing to accommodate larger objects
              1.5 - row * 3.0, // Increased vertical spacing
              0
            ]}
            onClick={() => setActiveSkill(skill.name)}
          >
            <mesh>
              {getSkillGeometry(skill.name, size)}
              <meshPhysicalMaterial 
                {...getSkillMaterial(skill.name, activeSkill === skill.name, size)}
              />
            </mesh>
            <Text
              position={[0, size + 0.5, 0]} // Adjusted for varied shapes
              fontSize={0.18} // Increased font size
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {skill.name}
            </Text>
            <Text
              position={[0, size + 0.2, 0]} // Adjusted for varied shapes
              fontSize={0.12} // Increased font size
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
      {/* Enhanced lighting for glass reflections */}
      <ambientLight intensity={0.3} />
      
      {/* Main rim lights for glass reflections */}
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#b3d9ff" />
      <pointLight position={[0, 0, 15]} intensity={1.2} color="#ffffff" />
      
      {/* RGB accent lights that match the pulsing glow colors */}
      <pointLight position={[8, 5, 8]} intensity={0.8} color="#ff6b6b" />
      <pointLight position={[-8, 5, 8]} intensity={0.8} color="#4ecdc4" />
      <pointLight position={[0, 8, -8]} intensity={0.8} color="#45b7d1" />
      <pointLight position={[5, -5, 5]} intensity={0.6} color="#96ceb4" />
      <pointLight position={[-5, -5, 5]} intensity={0.6} color="#feca57" />
      
      {/* Additional fill lights for better glass illumination */}
      <spotLight 
        position={[0, 15, 0]} 
        target-position={[0, 0, 0]}
        intensity={1.0} 
        angle={Math.PI / 4}
        penumbra={0.5}
        color="#ffffff"
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
        maxDistance={20} // Increased max distance for larger scene
        minDistance={5} // Increased min distance to prevent clipping
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
            <Canvas camera={{ position: [8, 5, 8], fov: 60 }}> {/* Adjusted camera for better view of larger visuals */}
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