'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Box } from '@react-three/drei'
import * as THREE from 'three'

// Porsche Animation - Data Analytics with Geometric Elements
export function PorscheAnimation({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.children.forEach((child, index) => {
        if (child.type === 'Group') {
          child.rotation.y = state.clock.elapsedTime * 0.3 + index * 0.5
          child.position.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.3
        }
      })
    }
  })

  return (
    <group ref={groupRef} scale={[1.2, 1.2, 1.2]}>
      {/* Central Data Core - Icosahedron */}
      <Float speed={0.6} rotationIntensity={0.8} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.2]} />
          <meshStandardMaterial 
            color={isActive ? "#ffffff" : "#444"} 
            transparent 
            opacity={isActive ? 0.8 : 0.3}
            wireframe
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Data Processing Nodes - Octahedrons */}
      {Array.from({ length: 8 }, (_, i) => (
        <Float
          key={i}
          speed={0.8 + i * 0.1}
          rotationIntensity={0.6}
          floatIntensity={0.4}
          position={[
            Math.cos(i * Math.PI / 4) * 3,
            Math.sin(i * Math.PI / 4) * 2,
            Math.sin(i * Math.PI / 2) * 2
          ]}
        >
          <mesh>
            <octahedronGeometry args={[0.4]} />
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              transparent 
              opacity={isActive ? 0.7 : 0.2}
              wireframe={i % 2 === 0}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}

      {/* Data Stream Connectors - Tetrahedrons */}
      {Array.from({ length: 12 }, (_, i) => (
        <Float
          key={`stream-${i}`}
          speed={1.0 + i * 0.05}
          rotationIntensity={0.4}
          floatIntensity={0.6}
          position={[
            Math.cos(i * Math.PI / 6) * 5,
            Math.sin(i * Math.PI / 6) * 3,
            Math.cos(i * Math.PI / 3) * 3
          ]}
        >
          <mesh>
            <tetrahedronGeometry args={[0.2]} />
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              transparent 
              opacity={isActive ? 0.6 : 0.2}
              metalness={0.7}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Mercedes Animation - UI/UX Interface Elements
export function MercedesAnimation({ isActive }: { isActive: boolean }) {
  const interfaceRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (interfaceRef.current && isActive) {
      interfaceRef.current.children.forEach((child, index) => {
        if (child.type === 'Group') {
          child.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1
          child.position.y = Math.sin(state.clock.elapsedTime * 1.5 + index * 0.5) * 0.2
        }
      })
    }
  })

    return (
    <group ref={interfaceRef} scale={[1.2, 1.2, 1.2]}>
      {/* Central Interface Hub - Dodecahedron */}
      <Float speed={0.4} rotationIntensity={0.6} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <dodecahedronGeometry args={[1]} />
          <meshStandardMaterial 
            color={isActive ? "#ffffff" : "#444"} 
            transparent 
            opacity={isActive ? 0.7 : 0.3}
            wireframe
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      </Float>

      {/* Interface Screens - Flat triangular prisms */}
      {Array.from({ length: 3 }, (_, i) => (
        <Float
          key={`screen-${i}`}
          speed={0.6 + i * 0.1}
          rotationIntensity={0.3}
          floatIntensity={0.4}
          position={[
            Math.cos(i * Math.PI * 2 / 3) * 2.5,
            Math.sin(i * Math.PI * 2 / 3) * 1.5,
            0
          ]}
        >
          <mesh rotation={[0, 0, i * Math.PI * 2 / 3]}>
            <cylinderGeometry args={[0, 0.8, 0.1, 3]} />
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              transparent 
              opacity={isActive ? 0.8 : 0.3}
              metalness={0.8}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}

      {/* UI Elements - Small tetrahedrons */}
      {Array.from({ length: 9 }, (_, i) => (
        <Float
          key={`ui-${i}`}
          speed={0.8 + i * 0.05}
          rotationIntensity={0.5}
          floatIntensity={0.6}
          position={[
            Math.cos(i * Math.PI / 4.5) * 4,
            Math.sin(i * Math.PI / 4.5) * 3,
            Math.sin(i * Math.PI / 3) * 2
          ]}
        >
          <mesh>
            <tetrahedronGeometry args={[0.15]} />
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              transparent 
              opacity={isActive ? 0.6 : 0.2}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Data Flow Connectors - Thin icosahedrons */}
      {Array.from({ length: 6 }, (_, i) => (
        <Float
          key={`connector-${i}`}
          speed={1.2 + i * 0.1}
          rotationIntensity={0.8}
          floatIntensity={0.3}
          position={[
            Math.cos(i * Math.PI / 3) * 3.5,
            Math.sin(i * Math.PI / 3) * 2.5,
            1
          ]}
        >
          <mesh>
            <icosahedronGeometry args={[0.2]} />
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              transparent 
              opacity={isActive ? 0.5 : 0.2}
              wireframe={i % 2 === 0}
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Daimler Animation - Technical Architecture with Geometric Elements
export function DaimlerAnimation({ isActive }: { isActive: boolean }) {
  const architectureRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (architectureRef.current && isActive) {
      architectureRef.current.children.forEach((child, index) => {
        if (child.type === 'Group') {
          child.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + index) * 0.2
          child.position.y = Math.sin(state.clock.elapsedTime * 1.5 + index * 0.8) * 0.2
        }
      })
    }
  })

  return (
    <group ref={architectureRef} scale={[1.3, 1.3, 1.3]}>
      {/* Central Architecture Hub - Larger icosahedron */}
      <Float speed={0.5} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.4]} />
          <meshStandardMaterial 
            color={isActive ? "#ffffff" : "#444"} 
            transparent 
            opacity={isActive ? 0.6 : 0.3}
            wireframe
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* Microservice Containers - Octahedrons */}
      {Array.from({ length: 8 }, (_, i) => (
        <Float
          key={`container-${i}`}
          speed={0.7 + i * 0.1}
          rotationIntensity={0.5}
          floatIntensity={0.4}
          position={[
            Math.cos(i * Math.PI / 4) * 3.5,
            Math.sin(i * Math.PI / 4) * 2.5,
            Math.sin(i * Math.PI / 2) * 1.5
          ]}
        >
          <mesh>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              transparent 
              opacity={isActive ? 0.8 : 0.3}
              wireframe={i % 3 === 0}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}

      {/* Connection Nodes - Dodecahedrons */}
      {Array.from({ length: 12 }, (_, i) => (
        <Float
          key={`node-${i}`}
          speed={0.9 + i * 0.05}
          rotationIntensity={0.6}
          floatIntensity={0.5}
          position={[
            Math.cos(i * Math.PI / 6) * 5,
            Math.sin(i * Math.PI / 6) * 3.5,
            Math.cos(i * Math.PI / 4) * 2
          ]}
        >
          <mesh>
            <dodecahedronGeometry args={[0.2]} />
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              transparent 
              opacity={isActive ? 0.7 : 0.2}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Control-F Animation - Managing Director Leadership Hub
export function ControlFAnimation({ isActive }: { isActive: boolean }) {
  const leadershipRef = useRef<THREE.Group>(null)
  const communicationLinesRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (leadershipRef.current && isActive) {
      const time = state.clock.elapsedTime
      
      leadershipRef.current.children.forEach((child, index) => {
        if (child.type === 'Group') {
          // Orchestrated team movements - synchronized but with individual character
          const teamSync = Math.sin(time * 0.8) * 0.2
          const individualMotion = Math.sin(time * 1.2 + index * 0.5) * 0.1
          
          child.rotation.y = time * 0.4 + index * 0.3
          child.position.y = teamSync + individualMotion
          
          // Pulsing effect for leadership influence
          const scale = 1 + Math.sin(time * 2 + index) * 0.1
          child.scale.setScalar(scale)
        }
      })
    }

    // Animate communication pulses
    if (communicationLinesRef.current && isActive) {
      const time = state.clock.elapsedTime
      
      communicationLinesRef.current.children.forEach((lineGroup, _) => {
        // Each lineGroup now contains only the pulse sphere
        if (lineGroup.children.length >= 1) {
          const pulseSphere = lineGroup.children[0] // First (and only) child is the pulse sphere
          const userData = pulseSphere.userData
          
          if (userData && userData.dist && userData.speed) {
            // Calculate pulse position along the line
            const cycleProgress = ((time * userData.speed) % 1)
            const pulsePosition = cycleProgress * userData.dist - userData.dist / 2
            
            // Move pulse along the Z axis (direction of the line)
            pulseSphere.position.z = pulsePosition
            
            // Fade pulse at the ends for smooth cycling
            const material = (pulseSphere as THREE.Mesh).material as THREE.MeshStandardMaterial
            const fadeZone = 0.1
            let opacity = 1.0
            
            if (cycleProgress < fadeZone) {
              opacity = cycleProgress / fadeZone
            } else if (cycleProgress > 1 - fadeZone) {
              opacity = (1 - cycleProgress) / fadeZone
            }
            
            material.opacity = opacity
            material.transparent = true
          }
        }
      })
    }
  })

  return (
    <>
      {/* Leadership Core and surrounding elements */}
      <group ref={leadershipRef} scale={[1.5, 1.5, 1.5]}>
        {/* Central Leadership Command - Brilliant dodecahedron */}
        <Float speed={0.6} rotationIntensity={0.8} floatIntensity={0.5}>
          <mesh position={[0, 0, 0]}>
            <dodecahedronGeometry args={[1.2]} />
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              transparent 
              opacity={isActive ? 0.95 : 0.3}
              wireframe
              metalness={1.0}
              roughness={0.0}
              emissive={isActive ? "#ffffff" : "#000"}
              emissiveIntensity={isActive ? 0.2 : 0.0}
            />
          </mesh>
        </Float>

        {/* Team Members - Dynamic team constellation */}
        {Array.from({ length: 8 }, (_, i) => (
          <Float
            key={`team-${i}`}
            speed={0.8 + i * 0.1}
            rotationIntensity={0.6}
            floatIntensity={0.6}
            position={[
              Math.cos(i * Math.PI / 4) * 3,
              Math.sin(i * Math.PI / 4) * 2,
              Math.sin(i * Math.PI / 2) * 1.5
            ]}
          >
            <mesh>
              <icosahedronGeometry args={[0.4]} />
              <meshStandardMaterial 
                color={isActive ? "#ffffff" : "#444"} 
                transparent 
                opacity={isActive ? 0.8 : 0.3}
                wireframe={i % 3 === 0}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </Float>
        ))}

        {/* AI Solutions Network - Cutting-edge delivery systems */}
        {Array.from({ length: 12 }, (_, i) => (
          <Float
            key={`solution-${i}`}
            speed={1.0 + i * 0.08}
            rotationIntensity={0.7}
            floatIntensity={0.7}
            position={[
              Math.cos(i * Math.PI / 6) * 4.5,
              Math.sin(i * Math.PI / 6) * 3,
              Math.cos(i * Math.PI / 4) * 2.5
            ]}
          >
            <mesh>
              <tetrahedronGeometry args={[0.25]} />
              <meshStandardMaterial 
                color={isActive ? "#ffffff" : "#444"} 
                transparent 
                opacity={isActive ? 0.7 : 0.2}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </Float>
        ))}

        {/* Global Reach - Worldwide delivery network */}
        {Array.from({ length: 16 }, (_, i) => (
          <Float
            key={`global-${i}`}
            speed={1.2 + i * 0.05}
            rotationIntensity={0.9}
            floatIntensity={0.8}
            position={[
              Math.cos(i * Math.PI / 8) * 6,
              Math.sin(i * Math.PI / 8) * 4,
              Math.sin(i * Math.PI / 4) * 3.5
            ]}
          >
            <mesh>
              <octahedronGeometry args={[0.15]} />
              <meshStandardMaterial 
                color={isActive ? "#ffffff" : "#444"} 
                transparent 
                opacity={isActive ? 0.6 : 0.2}
                wireframe={i % 4 === 0}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
          </Float>
        ))}

        {/* Innovation Streams - Proprietary AI systems */}
        {Array.from({ length: 6 }, (_, i) => (
          <Float
            key={`innovation-${i}`}
            speed={1.4 + i * 0.1}
            rotationIntensity={1.0}
            floatIntensity={0.9}
            position={[
              Math.cos(i * Math.PI / 3) * 7.5,
              Math.sin(i * Math.PI / 3) * 5,
              Math.cos(i * Math.PI / 2) * 4
            ]}
          >
            <mesh>
              <dodecahedronGeometry args={[0.2]} />
              <meshStandardMaterial 
                color={isActive ? "#ffffff" : "#444"} 
                transparent 
                opacity={isActive ? 0.9 : 0.2}
                metalness={1.0}
                roughness={0.0}
                emissive={isActive ? "#ffffff" : "#000"}
                emissiveIntensity={isActive ? 0.3 : 0.0}
              />
            </mesh>
          </Float>
        ))}
      </group>


    </>
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
    <Float speed={0.4} rotationIntensity={0} floatIntensity={0.3}>
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
          <Box args={[0.15, 0.15, 0.15]} position={[0.5, 0.3, 0.15]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
          </Box>
        )}

        {/* Text removed to prevent overlap with main labels */}
      </group>
    </Float>
  )
}

// RoboWork Animation - Technical Leadership Network
export function RoboWorkAnimation({ isActive }: { isActive: boolean }) {
  const leadershipRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (leadershipRef.current && isActive) {
      leadershipRef.current.children.forEach((child, index) => {
        if (child.type === 'Group') {
          child.rotation.z = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.15
          child.position.y = Math.sin(state.clock.elapsedTime * 1.2 + index * 0.6) * 0.25
        }
      })
    }
  })

  return (
    <group ref={leadershipRef} scale={[1.3, 1.3, 1.3]}>
      {/* Central Leadership Core - Dodecahedron */}
      <Float speed={0.3} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh position={[0, 0, 0]}>
          <dodecahedronGeometry args={[1.3]} />
          <meshStandardMaterial 
            color={isActive ? "#ffffff" : "#444"} 
            transparent 
            opacity={isActive ? 0.8 : 0.3}
            wireframe
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Strategic Pillars - Tall triangular prisms */}
      {Array.from({ length: 6 }, (_, i) => (
        <Float
          key={`pillar-${i}`}
          speed={0.5 + i * 0.1}
          rotationIntensity={0.3}
          floatIntensity={0.3}
          position={[
            Math.cos(i * Math.PI / 3) * 3,
            0,
            Math.sin(i * Math.PI / 3) * 3
          ]}
        >
          <mesh rotation={[0, i * Math.PI / 3, 0]}>
            <cylinderGeometry args={[0, 0.4, 2, 3]} />
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              transparent 
              opacity={isActive ? 0.7 : 0.3}
              wireframe={i % 2 === 0}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}

      {/* Leadership Connections - Icosahedrons */}
      {Array.from({ length: 10 }, (_, i) => (
        <Float
          key={`connection-${i}`}
          speed={0.8 + i * 0.05}
          rotationIntensity={0.6}
          floatIntensity={0.5}
          position={[
            Math.cos(i * Math.PI / 5) * 4.5,
            Math.sin(i * Math.PI / 5) * 2,
            Math.sin(i * Math.PI / 2.5) * 2.5
          ]}
        >
          <mesh>
            <icosahedronGeometry args={[0.25]} />
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              transparent 
              opacity={isActive ? 0.6 : 0.2}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}

      {/* Innovation Sparks - Small tetrahedrons */}
      {Array.from({ length: 15 }, (_, i) => (
        <Float
          key={`innovation-${i}`}
          speed={1.0 + i * 0.1}
          rotationIntensity={0.8}
          floatIntensity={0.6}
          position={[
            Math.cos(i * Math.PI / 7.5) * 5.5,
            Math.sin(i * Math.PI / 7.5) * 3.5,
            Math.cos(i * Math.PI / 5) * 3
          ]}
        >
          <mesh>
            <tetrahedronGeometry args={[0.15]} />
            <meshStandardMaterial 
              color={isActive ? "#ffffff" : "#444"} 
              transparent 
              opacity={isActive ? 0.5 : 0.2}
              metalness={0.6}
              roughness={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}