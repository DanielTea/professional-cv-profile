'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Stars, useTexture } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

type Marker = {
  id: string
  label: string
  city: string
  lat: number
  lon: number
  color: string
  accent: string
  subtitle: string
  details?: string[]
}

const MARKERS: Marker[] = [
  {
    id: 'berlin',
    label: 'BERLIN_HQ',
    city: 'Berlin, Germany',
    lat: 52.52,
    lon: 13.405,
    color: '#ff2a2a',
    accent: 'var(--color-danger)',
    subtitle: 'control-f GmbH • Base Ops',
    details: ['Status: Active', 'Focus: Leadership & ML']
  },
  {
    id: 'atlanta',
    label: 'ATLANTA_PCNA',
    city: 'Atlanta, USA',
    lat: 33.6407,
    lon: -84.4277,
    color: '#ccff00',
    accent: 'var(--color-volt)',
    subtitle: 'Porsche Cars North America',
    details: ['Role: Software Engineering', 'Location: Atlanta, USA']
  },
  {
    id: 'stuttgart',
    label: 'STUTTGART_DE',
    city: 'Stuttgart, Germany',
    lat: 48.7758,
    lon: 9.1829,
    color: '#ccff00',
    accent: 'var(--color-volt)',
    subtitle: 'Daimler & Porsche Programs',
    details: ['Role: Engineering Consultant', 'Location: Stuttgart, Germany']
  },
  {
    id: 'bangkok',
    label: 'BANGKOK_TH',
    city: 'Bangkok, Thailand',
    lat: 13.7563,
    lon: 100.5018,
    color: '#ccff00',
    accent: 'var(--color-volt)',
    subtitle: 'Freelance Technology Ops',
    details: ['Mode: Remote/Hybrid', 'Region: Southeast Asia']
  },
  {
    id: 'tokyo',
    label: 'TOKYO_JP',
    city: 'Tokyo, Japan',
    lat: 35.6762,
    lon: 139.6503,
    color: '#ccff00',
    accent: 'var(--color-volt)',
    subtitle: 'Freelance Technology Ops',
    details: ['Mode: Remote/Hybrid', 'Region: APAC']
  }
]

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = (radius * Math.sin(phi) * Math.sin(theta))
  const y = (radius * Math.cos(phi))

  return new THREE.Vector3(x, y, z)
}

const Globe = ({
  onMarkerHover,
  onMarkerSelect,
  activeMarkerId,
}: {
  onMarkerHover: (marker: Marker | null) => void
  onMarkerSelect: (marker: Marker) => void
  activeMarkerId: string | null
}) => {
  const globeRef = useRef<THREE.Group>(null)
  const earthMap = useTexture('/images/earth_tech_map.jpg')

  // Radius of the globe
  const R = 2

  const markerData = useMemo(
    () =>
      MARKERS.map((marker) => ({
        ...marker,
        position: latLonToVector3(marker.lat, marker.lon, R),
      })),
    []
  )

  const berlinMarker = markerData.find((marker) => marker.id === 'berlin')

  useEffect(() => {
    if (globeRef.current && berlinMarker) {
      globeRef.current.rotation.y = -Math.atan2(berlinMarker.position.x, berlinMarker.position.z)
    }
  }, [berlinMarker])

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={globeRef}>
      {/* Main Wireframe Globe */}
      <mesh>
        <sphereGeometry args={[R, 32, 32]} />
        <meshBasicMaterial color="#555" wireframe transparent opacity={0.2} />
      </mesh>
      
      {/* Inner Solid Core with Map */}
      <mesh>
        <sphereGeometry args={[R - 0.01, 64, 64]} />
        <meshBasicMaterial 
          map={earthMap}
          transparent
          opacity={1}
          color="#AAA"
        />
      </mesh>
      
      {/* Globe Rings (Decorations) */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[R + 0.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#666" transparent opacity={0.6} />
      </mesh>
       <mesh rotation={[-Math.PI / 4, 0, 0]}>
        <torusGeometry args={[R + 0.4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#666" transparent opacity={0.5} />
      </mesh>

      {/* Markers */}
      {markerData.map((marker) => {
        const isActive = activeMarkerId === marker.id
        return (
          <group key={marker.id} position={marker.position} scale={isActive ? 1.25 : 1}>
            <mesh
              onPointerOver={(event) => {
                event.stopPropagation()
                onMarkerHover(marker)
              }}
              onPointerOut={(event) => {
                event.stopPropagation()
                onMarkerHover(null)
              }}
              onPointerDown={(event) => {
                event.stopPropagation()
                onMarkerSelect(marker)
              }}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={marker.color} />
            </mesh>
            <pointLight color={marker.color} distance={1} intensity={isActive ? 3 : 1.5} />

            <Html position={[0.08, 0, 0]} distanceFactor={20} occlusion>
              <div
                className={`font-mono text-[5px] tracking-[0.3em] uppercase px-1.5 py-[1px] border-l border-white/40 transition-all duration-300 bg-black/40 backdrop-blur-[1px] select-none`}
                style={{
                  pointerEvents: 'auto',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  borderColor: marker.accent,
                  opacity: isActive ? 1 : 0.5,
                  letterSpacing: '0.3em',
                  transform: isActive ? 'scale(1.1)' : 'scale(0.9)',
                }}
                onMouseEnter={() => onMarkerHover(marker)}
                onMouseLeave={() => onMarkerHover(null)}
                onClick={() => onMarkerSelect(marker)}
              >
                {marker.city.split(',')[0].toUpperCase()}
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

const HUDOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
        {/* Corners */}
        <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-white/20 rounded-tl-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-white/20 rounded-br-3xl" />
        
        {/* Tech lines */}
        <div className="absolute top-[15%] right-[5%] w-[200px] h-[1px] bg-gradient-to-l from-[var(--color-volt)] to-transparent" />
        <div className="absolute bottom-[15%] left-[5%] w-[200px] h-[1px] bg-gradient-to-r from-[var(--color-volt)] to-transparent" />

        {/* Data Blocks */}
        <div className="absolute top-20 right-10 text-right">
            <div className="text-[10px] font-mono text-gray-500 tracking-[0.2em] mb-1">SYSTEM STATUS</div>
            <div className="text-xl font-display font-bold text-white">ONLINE</div>
        </div>

        <div className="absolute bottom-20 left-10">
            <div className="flex items-center gap-4">
                 <div className="w-12 h-12 border border-[var(--color-volt)] rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <div className="w-8 h-8 border border-dashed border-white/50 rounded-full" />
                 </div>
                 <div>
                    <div className="text-[10px] font-mono text-gray-500 tracking-[0.2em]">COORDINATES</div>
                    <div className="text-white font-mono text-sm">52°31'N 13°24'E</div>
                 </div>
            </div>
        </div>
        
        {/* Center Crosshair (faint) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none" />
    </div>
  )
}

export default function WorldMap3D() {
  const [hovered, setHover] = useState(false)
  const [hoveredMarker, setHoveredMarker] = useState<Marker | null>(null)
  const [activeMarker, setActiveMarker] = useState<Marker>(MARKERS[0])

  const displayMarker = hoveredMarker ?? activeMarker

  return (
    <section className="relative w-full h-[600px] bg-black overflow-hidden border-y border-white/10 my-10">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />

        {displayMarker && (
          <div className="absolute top-20 right-8 z-20 w-[320px] pointer-events-auto">
            <motion.div
              key={displayMarker.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="relative bg-black/75 border border-white/10 px-6 py-5 text-white shadow-2xl backdrop-blur-sm rounded-3xl rounded-tr-none"
            >
              {/* Rounded Accent Tab */}
              <div className="absolute -top-[1px] right-0 w-32 h-1 bg-[var(--color-volt)]" />
              
              <div className="flex items-center justify-end gap-3 mb-4">
                 <div className="h-[1px] flex-grow bg-gradient-to-l from-white/20 to-transparent"></div>
                 <div className="text-[10px] font-mono tracking-[0.2em] text-[var(--color-volt)] uppercase">
                    {displayMarker.label}
                 </div>
              </div>

              <div className="text-3xl font-display uppercase leading-none mb-2 text-right tracking-tight">
                {displayMarker.city.split(',')[0]}
                <span className="block text-sm text-gray-400 font-sans tracking-normal mt-1">
                    {displayMarker.city.split(',')[1]}
                </span>
              </div>
              
              <div className="text-xs text-gray-300 font-mono mb-6 text-right border-b border-white/10 pb-4">
                {displayMarker.subtitle}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                 {/* Circular Data Viz placeholder */}
                 <div className="relative w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                    <div className="text-[9px] text-[var(--color-volt)] font-mono">
                        {displayMarker.lat.toFixed(1)}°N
                    </div>
                    <div className="absolute inset-0 border-t-2 border-[var(--color-volt)] rounded-full animate-spin duration-[10s]" />
                 </div>
                 
                 <div className="text-right text-[10px] font-mono text-gray-400 space-y-2">
                    <div>
                        <span className="block text-white">COORDINATES</span>
                        {displayMarker.lat.toFixed(4)} / {displayMarker.lon.toFixed(4)}
                    </div>
                    <div>
                        <span className="block text-white">STATUS</span>
                        <span className="text-[var(--color-volt)] animate-pulse">ACTIVE_NODE</span>
                    </div>
                 </div>
              </div>

              {displayMarker.details && (
                <div className="space-y-2 text-[11px] font-sans text-gray-300 text-right">
                  {displayMarker.details.map((line) => (
                    <div key={line} className="flex items-center justify-end gap-2 group">
                      <span className="group-hover:text-white transition-colors">{line}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--color-volt)] transition-colors" />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-white/10">
                <div className="flex flex-wrap justify-end gap-2">
                  {MARKERS.map((marker) => {
                    const isSelected = marker.id === activeMarker.id
                    return (
                      <button
                        key={marker.id}
                        onMouseEnter={() => setHoveredMarker(marker)}
                        onMouseLeave={() => setHoveredMarker(null)}
                        onClick={() => setActiveMarker(marker)}
                        className={`px-3 py-1 rounded-full border text-[9px] font-mono transition-all duration-300 ${
                          isSelected 
                            ? 'bg-[var(--color-volt)] border-[var(--color-volt)] text-black font-bold' 
                            : 'border-white/20 text-gray-400 hover:border-[var(--color-volt)] hover:text-white'
                        }`}
                      >
                        {marker.id.split('_')[0].toUpperCase()}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
        <div className="absolute inset-0 z-0 cursor-move"
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
        >
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                <Globe
                  onMarkerHover={setHoveredMarker}
                  onMarkerSelect={(marker) => {
                    setActiveMarker(marker)
                    setHoveredMarker(null)
                  }}
                  activeMarkerId={displayMarker?.id ?? null}
                />
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate={!hovered} 
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
        
        <HUDOverlay />
        
        {/* Section Title */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center z-10 bg-black/50 backdrop-blur-sm px-6 py-2 border border-white/10 rounded-full">
             <h2 className="text-[var(--color-volt)] font-mono text-sm tracking-[0.3em] uppercase">Global Presence</h2>
        </div>
    </section>
  )
}

