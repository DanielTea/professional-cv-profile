'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Box, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Porsche Animation - Car with Data Streams
export function PorscheAnimation({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const dataStreamsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y += 0.01
    }
    if (dataStreamsRef.current && isActive) {
      dataStreamsRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.5
      })
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
        {/* Rectangular Car Visualization */}
        <group>
          {/* Main Car Frame */}
          <Box args={[4, 0.2, 2]} position={[0, 0.5, 0]}>
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#333"} 
              emissive={isActive ? "#ffffff" : "#111"}
              emissiveIntensity={isActive ? 0.3 : 0.1}
              wireframe
            />
          </Box>
          {/* Car Outline */}
          <Box args={[4.2, 0.05, 0.05]} position={[0, 0.5, 1]}>
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#333"} 
              emissive={isActive ? "#ffffff" : "#111"}
              emissiveIntensity={isActive ? 0.4 : 0.1}
            />
          </Box>
          <Box args={[4.2, 0.05, 0.05]} position={[0, 0.5, -1]}>
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#333"} 
              emissive={isActive ? "#ffffff" : "#111"}
              emissiveIntensity={isActive ? 0.4 : 0.1}
            />
          </Box>
          <Box args={[0.05, 0.05, 2]} position={[2.1, 0.5, 0]}>
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#333"} 
              emissive={isActive ? "#ffffff" : "#111"}
              emissiveIntensity={isActive ? 0.4 : 0.1}
            />
          </Box>
          <Box args={[0.05, 0.05, 2]} position={[-2.1, 0.5, 0]}>
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#333"} 
              emissive={isActive ? "#ffffff" : "#111"}
              emissiveIntensity={isActive ? 0.4 : 0.1}
            />
          </Box>
        </group>

        {/* Linear Data Streams */}
        <group ref={dataStreamsRef}>
          {Array.from({ length: 16 }, (_, i) => (
            <group key={i}>
              <Box args={[0.1, 0.1, 0.1]} position={[
                Math.cos(i * Math.PI / 8) * 5,
                Math.sin(i * Math.PI / 8) * 2.5,
                Math.sin(i * Math.PI / 4) * 3
              ]}>
                <meshStandardMaterial 
                  color={isActive ? "#ffffff" : "#444"} 
                  emissive={isActive ? "#ffffff" : "#111"}
                  emissiveIntensity={isActive ? 0.6 : 0.1}
                />
              </Box>
              {/* Data Flow Lines */}
              <Box args={[0.02, 0.02, 2.5]} position={[
                Math.cos(i * Math.PI / 8) * 2.5,
                Math.sin(i * Math.PI / 8) * 1.25,
                Math.sin(i * Math.PI / 4) * 1.5
              ]}>
                <meshStandardMaterial 
                  color={isActive ? "#ffffff" : "#444"} 
                  emissive={isActive ? "#ffffff" : "#111"}
                  emissiveIntensity={isActive ? 0.4 : 0.1}
                />
              </Box>
            </group>
          ))}
        </group>

        {/* Text removed to prevent overlap with main labels */}
      </group>
    </Float>
  )
}

// Mercedes Animation - Enhanced Infotainment System
export function MercedesAnimation({ isActive }: { isActive: boolean }) {
  const screenRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (screenRef.current && isActive) {
      screenRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
      // Animate display content
      screenRef.current.children.forEach((child, index) => {
        if (child.type === 'Group' && index > 2) {
          child.position.y += Math.sin(state.clock.elapsedTime * 2 + index) * 0.02
        }
      })
    }
  })

  return (
    <Float speed={0.3} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={screenRef} scale={[1.5, 1.5, 1.5]}>
        {/* Enhanced Car Dashboard Base */}
        <Box args={[4, 0.2, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#ffffff" : "#333"} 
            emissive={isActive ? "#ffffff" : "#111"}
            emissiveIntensity={isActive ? 0.2 : 0.1}
            wireframe
          />
        </Box>
        
        {/* Main Central Display - Larger and Clearer */}
        <Box args={[2, 1.2, 0.1]} position={[0, 0.8, 0.9]}>
          <meshStandardMaterial 
            color={isActive ? "#ffffff" : "#333"} 
            emissive={isActive ? "#ffffff" : "#111"}
            emissiveIntensity={isActive ? 0.4 : 0.2}
          />
        </Box>
        
        {/* Enhanced Display Content */}
        {isActive && (
          <group>
            {/* Menu Icons */}
            <Box args={[0.15, 0.15, 0.02]} position={[-0.6, 0.9, 0.92]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
            </Box>
            <Box args={[0.15, 0.15, 0.02]} position={[-0.3, 0.9, 0.92]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
            </Box>
            <Box args={[0.15, 0.15, 0.02]} position={[0, 0.9, 0.92]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
            </Box>
            <Box args={[0.15, 0.15, 0.02]} position={[0.3, 0.9, 0.92]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
            </Box>
            <Box args={[0.15, 0.15, 0.02]} position={[0.6, 0.9, 0.92]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
            </Box>
            
            {/* Content Area */}
            <Box args={[1.5, 0.6, 0.02]} position={[0, 0.6, 0.92]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
            </Box>
          </group>
        )}
        
        {/* Enhanced Side Displays */}
        <Box args={[1, 0.8, 0.05]} position={[-1.5, 0.6, 0.7]}>
          <meshStandardMaterial 
            color={isActive ? "#ffffff" : "#333"} 
            emissive={isActive ? "#ffffff" : "#111"}
            emissiveIntensity={isActive ? 0.3 : 0.1}
          />
        </Box>
        <Box args={[1, 0.8, 0.05]} position={[1.5, 0.6, 0.7]}>
          <meshStandardMaterial 
            color={isActive ? "#ffffff" : "#333"} 
            emissive={isActive ? "#ffffff" : "#111"}
            emissiveIntensity={isActive ? 0.3 : 0.1}
          />
        </Box>
        
        {/* Additional Navigation Elements */}
        {isActive && (
          <group>
            <Box args={[0.3, 0.1, 0.05]} position={[-1.5, 0.2, 0.75]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
            </Box>
            <Box args={[0.3, 0.1, 0.05]} position={[1.5, 0.2, 0.75]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
            </Box>
          </group>
        )}
      </group>
    </Float>
  )
}

// Daimler Animation - Microservices Architecture
export function DaimlerAnimation({ isActive }: { isActive: boolean }) {
  const containersRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (containersRef.current && isActive) {
      containersRef.current.children.forEach((child, index) => {
        child.rotation.y += 0.02 * (index % 2 === 0 ? 1 : -1)
        child.position.y += Math.sin(state.clock.elapsedTime * 2 + index) * 0.05
      })
    }
  })

  return (
    <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={containersRef} scale={[1.5, 1.5, 1.5]}>
        {/* Docker Containers */}
        {Array.from({ length: 6 }, (_, i) => (
          <Box 
            key={i}
            args={[0.8, 0.8, 0.8]} 
            position={[
              (i % 3 - 1) * 1.5,
              Math.floor(i / 3) * 1.5 - 0.75,
              0
            ]}
          >
            <meshStandardMaterial 
              color={isActive ? `hsl(${i * 60}, 70%, 60%)` : "#444"} 
              emissive={isActive ? `hsl(${i * 60}, 70%, 30%)` : "#111"}
              emissiveIntensity={isActive ? 0.3 : 0.1}
            />
          </Box>
        ))}
        
        {/* Connection Lines */}
        {isActive && Array.from({ length: 5 }, (_, i) => (
          <Box
            key={`line-${i}`}
            args={[0.05, 0.05, 1.2]}
            position={[
              (i % 2) * 1.5 - 0.75,
              i * 0.3 - 0.6,
              0
            ]}
            rotation={[0, 0, Math.PI / 4]}
          >
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </Box>
        ))}

        {/* Text removed to prevent overlap with main labels */}
      </group>
    </Float>
  )
}

// Control-F Animation - AI Neural Network
export function ControlFAnimation({ isActive }: { isActive: boolean }) {
  const neuralRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (neuralRef.current && isActive) {
      neuralRef.current.rotation.y += 0.01
      neuralRef.current.children.forEach((child, index) => {
        if (child.type === 'Group') {
          (child as THREE.Group).children.forEach((neuron, i) => {
            const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + index + i) * 0.2
            neuron.scale.setScalar(scale)
          })
        }
      })
    }
  })

  return (
    <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={neuralRef} scale={[1.2, 1.2, 1.2]}>
        {/* Enhanced Neural Network Layers */}
        {Array.from({ length: 4 }, (_, layerIndex) => (
          <group key={layerIndex} position={[(layerIndex - 1.5) * 2.2, 0, 0]}>
            {Array.from({ length: 6 }, (_, neuronIndex) => (
              <Sphere 
                key={neuronIndex}
                args={[0.25]} 
                position={[0, (neuronIndex - 2.5) * 1.2, 0]}
              >
                <meshStandardMaterial 
                  color={isActive ? "#ffffff" : "#444"} 
                  emissive={isActive ? "#ffffff" : "#111"}
                  emissiveIntensity={isActive ? 0.6 : 0.1}
                />
              </Sphere>
            ))}
          </group>
        ))}
        
        {/* Enhanced Neural Connections */}
        {isActive && Array.from({ length: 3 }, (_, connectionLayer) => (
          <group key={`connections-${connectionLayer}`}>
            {Array.from({ length: 36 }, (_, i) => (
              <Box
                key={i}
                args={[2, 0.04, 0.04]}
                position={[
                  (connectionLayer - 1) * 2.2 + 1.1,
                  ((i % 6) - 2.5) * 1.2,
                  0
                ]}
                rotation={[
                  0,
                  0,
                  (Math.floor(i / 6) - 2.5) * 0.25
                ]}
              >
                <meshStandardMaterial 
                  color="#ffffff" 
                  emissive="#ffffff"
                  emissiveIntensity={0.4}
                  transparent
                  opacity={0.8}
                />
              </Box>
            ))}
          </group>
        ))}

        {/* Text removed to prevent overlap with main labels */}
      </group>
    </Float>
  )
}

// UIPilot Animation - UI Testing Elements
export function UIPilotAnimation({ isActive }: { isActive: boolean }) {
  const uiRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (uiRef.current && isActive) {
      uiRef.current.children.forEach((child, index) => {
        if (index > 0) { // Skip the main screen
          child.position.y += Math.sin(state.clock.elapsedTime * 2 + index) * 0.02
        }
      })
    }
  })

  return (
    <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={uiRef} scale={[1.5, 1.5, 1.5]}>
        {/* Main Screen */}
        <Box args={[2, 1.5, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#1a1a2e" : "#333"} 
            emissive={isActive ? "#0f0f2a" : "#111"}
            emissiveIntensity={0.3}
          />
        </Box>
        
        {/* UI Elements being tested */}
        {isActive && (
          <>
            <Box args={[0.5, 0.2, 0.05]} position={[-0.5, 0.4, 0.1]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
            </Box>
            <Box args={[0.3, 0.3, 0.05]} position={[0.3, 0.2, 0.1]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
            </Box>
            <Box args={[0.8, 0.1, 0.05]} position={[0, -0.2, 0.1]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
            </Box>
            <Box args={[0.4, 0.15, 0.05]} position={[-0.3, -0.5, 0.1]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
            </Box>
          </>
        )}
        
        {/* Testing Cursor */}
        {isActive && (
          <Sphere args={[0.08]} position={[0.5, 0.3, 0.15]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
          </Sphere>
        )}

        {/* Text removed to prevent overlap with main labels */}
      </group>
    </Float>
  )
}

// RoboWork Animation - AI Network Visualization
export function RoboWorkAnimation({ isActive }: { isActive: boolean }) {
  const aiRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (aiRef.current && isActive) {
      aiRef.current.rotation.y += 0.008
      // Animate AI nodes
      aiRef.current.children.forEach((child, index) => {
        if (child.type === 'Group') {
          const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + index) * 0.15
          child.scale.setScalar(scale)
        }
      })
    }
  })

  return (
    <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={aiRef} scale={[1.8, 1.8, 1.8]}>
        {/* Central AI Core */}
        <Box args={[1, 1, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#ffffff" : "#444"} 
            emissive={isActive ? "#ffffff" : "#111"}
            emissiveIntensity={isActive ? 0.4 : 0.1}
            wireframe
          />
        </Box>
        
        {/* AI Processing Lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <group key={i}>
            <Box 
              args={[3, 0.05, 0.05]} 
              position={[
                Math.cos(i * Math.PI / 4) * 1.5,
                Math.sin(i * Math.PI / 4) * 1.5,
                0
              ]}
              rotation={[0, 0, i * Math.PI / 4]}
            >
              <meshStandardMaterial 
                color={isActive ? "#ffffff" : "#444"} 
                emissive={isActive ? "#ffffff" : "#111"}
                emissiveIntensity={isActive ? 0.3 : 0.1}
              />
            </Box>
          </group>
        ))}

        {/* AI Data Nodes */}
        {Array.from({ length: 12 }, (_, i) => (
          <Box 
            key={i}
            args={[0.2, 0.2, 0.2]} 
            position={[
              Math.cos(i * Math.PI / 6) * 2.5,
              Math.sin(i * Math.PI / 6) * 2.5,
              Math.sin(i * Math.PI / 3) * 1
            ]}
          >
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              emissive={isActive ? "#ffffff" : "#111"}
              emissiveIntensity={isActive ? 0.5 : 0.1}
            />
          </Box>
        ))}

        {/* Connecting Lines */}
        {isActive && Array.from({ length: 16 }, (_, i) => (
          <Box
            key={`line-${i}`}
            args={[0.02, 0.02, 1.5]}
            position={[
              Math.cos(i * Math.PI / 8) * 1.25,
              Math.sin(i * Math.PI / 8) * 1.25,
              0
            ]}
            rotation={[
              Math.cos(i * Math.PI / 8) * 0.5,
              Math.sin(i * Math.PI / 8) * 0.5,
              0
            ]}
          >
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#ffffff"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </Box>
        ))}

        {/* Text removed to prevent overlap with main labels */}
      </group>
    </Float>
  )
} 