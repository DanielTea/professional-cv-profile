'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Stars, useTexture } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

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

const INK = '#141518'
const INK_MUTE = '#6E7378'
const PAPER = '#EDEEF0'
const ORANGE = '#FF5A1F'

const MARKERS: Marker[] = [
  {
    id: 'berlin',
    label: 'BERLIN_HQ',
    city: 'Berlin, Germany',
    lat: 52.52,
    lon: 13.405,
    color: ORANGE,
    accent: ORANGE,
    subtitle: 'control-f GmbH · CEO & Managing Partner',
    details: ['Status: Active', 'Focus: Applied AI · Product · Delivery'],
  },
  {
    id: 'atlanta',
    label: 'ATLANTA_PCNA',
    city: 'Atlanta, USA',
    lat: 33.6407,
    lon: -84.4277,
    color: PAPER,
    accent: ORANGE,
    subtitle: 'Porsche Cars North America · IT',
    details: ['Role: Anomaly Detection · Hadoop', 'Year: 2017'],
  },
  {
    id: 'stuttgart',
    label: 'STUTTGART_DE',
    city: 'Stuttgart, Germany',
    lat: 48.7758,
    lon: 9.1829,
    color: PAPER,
    accent: ORANGE,
    subtitle: 'Daimler · Porsche · MBition programs',
    details: ['Role: Tech Lead · Product Owner', 'Stack: Python · K8s · Azure'],
  },
  {
    id: 'bangkok',
    label: 'BANGKOK_TH',
    city: 'Bangkok, Thailand',
    lat: 13.7563,
    lon: 100.5018,
    color: PAPER,
    accent: ORANGE,
    subtitle: 'Freelance · Technology Ops',
    details: ['Mode: Remote / Hybrid', 'Region: Southeast Asia'],
  },
  {
    id: 'tokyo',
    label: 'TOKYO_JP',
    city: 'Tokyo, Japan',
    lat: 35.6762,
    lon: 139.6503,
    color: PAPER,
    accent: ORANGE,
    subtitle: 'Freelance · Technology Ops',
    details: ['Mode: Remote / Hybrid', 'Region: APAC'],
  },
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
  const earthMap = useTexture(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/earth_tech_map.jpg`)

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
      {/* Wireframe shell */}
      <mesh>
        <sphereGeometry args={[R + 0.002, 48, 48]} />
        <meshBasicMaterial color={INK_MUTE} wireframe transparent opacity={0.28} />
      </mesh>

      {/* Continent texture core */}
      <mesh>
        <sphereGeometry args={[R - 0.01, 96, 96]} />
        <meshBasicMaterial
          map={earthMap}
          transparent
          opacity={0.92}
          color="#9aa0a6"
        />
      </mesh>

      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[R + 0.22, 0.004, 8, 128]} />
        <meshBasicMaterial color={INK_MUTE} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, 0, 0.4]}>
        <torusGeometry args={[R + 0.46, 0.003, 8, 128]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[R + 0.06, 0.002, 6, 128]} />
        <meshBasicMaterial color={INK_MUTE} transparent opacity={0.25} />
      </mesh>

      {/* Markers */}
      {markerData.map((marker) => {
        const isActive = activeMarkerId === marker.id
        const dotColor = isActive ? ORANGE : PAPER
        return (
          <group key={marker.id} position={marker.position} scale={isActive ? 1.25 : 1}>
            {/* Pulse halo for active marker */}
            {isActive && (
              <mesh>
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshBasicMaterial color={ORANGE} transparent opacity={0.22} />
              </mesh>
            )}

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
              <sphereGeometry args={[0.065, 16, 16]} />
              <meshBasicMaterial color={dotColor} />
            </mesh>
            <pointLight color={dotColor} distance={1} intensity={isActive ? 3 : 1.2} />

            <Html position={[0.1, 0, 0]} distanceFactor={18}>
              <div
                style={{
                  pointerEvents: 'auto',
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 5,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  padding: '1px 4px 1px 5px',
                  borderLeft: `1px solid ${isActive ? ORANGE : 'rgba(237,238,240,0.5)'}`,
                  color: isActive ? ORANGE : 'rgba(237,238,240,0.65)',
                  transform: isActive ? 'scale(1.15)' : 'scale(0.9)',
                  transition: 'all 300ms ease',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
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

const HUDOverlay = ({ markerCount, activeId }: { markerCount: number; activeId: string }) => {
  const hud = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 10,
    letterSpacing: '0.22em',
    textTransform: 'uppercase' as const,
    color: 'rgba(237,238,240,0.55)',
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Editorial file-tag — top left */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 20,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <span
          style={{
            ...hud,
            padding: '3px 8px',
            border: `1px solid rgba(237,238,240,0.25)`,
            color: PAPER,
          }}
        >
          SIGNAL · LIVE
        </span>
        <span style={hud}>{String(markerCount).padStart(2, '0')} NODES</span>
      </div>

      {/* Tracking line — bottom left, paired with axis info */}
      <div
        style={{
          position: 'absolute',
          bottom: 44,
          left: 20,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <span style={hud}>{`// TRACKING`}</span>
        <span style={{ ...hud, color: ORANGE }}>{`TARGET_${activeId.toUpperCase()}`}</span>
      </div>

      {/* Crosshair tick marks around globe */}
      <svg
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 420,
          height: 420,
          opacity: 0.35,
        }}
        viewBox="0 0 420 420"
        fill="none"
      >
        <circle cx="210" cy="210" r="208" stroke={INK_MUTE} strokeDasharray="2 6" />
        <circle cx="210" cy="210" r="150" stroke={INK_MUTE} strokeWidth="0.5" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          const x1 = 210 + Math.cos(a) * 205
          const y1 = 210 + Math.sin(a) * 205
          const x2 = 210 + Math.cos(a) * 215
          const y2 = 210 + Math.sin(a) * 215
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK_MUTE} />
        })}
      </svg>

      {/* Bottom-left axis label */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 18,
            height: 1,
            background: 'rgba(237,238,240,0.4)',
          }}
        />
        <span style={hud}>AXIS · PRIME MERIDIAN</span>
      </div>

      {/* Bottom-right meta */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          textAlign: 'right',
        }}
      >
        <span style={hud}>PROJECTION · ORTHOGRAPHIC</span>
      </div>
    </div>
  )
}

export default function WorldMap3D() {
  const [hovered, setHover] = useState(false)
  const [hoveredMarker, setHoveredMarker] = useState<Marker | null>(null)
  const [activeMarker, setActiveMarker] = useState<Marker>(MARKERS[0])
  const [canvasKey, setCanvasKey] = useState(0)
  const isMobile = useIsMobile()

  const displayMarker = hoveredMarker ?? activeMarker

  useEffect(() => {
    const fire = () => window.dispatchEvent(new Event('resize'))
    const t1 = setTimeout(fire, 0)
    const t2 = setTimeout(fire, 50)
    const t3 = setTimeout(fire, 200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [canvasKey])

  return (
    <section
      className="relative w-full overflow-hidden my-10"
      style={{ background: INK, height: isMobile ? 460 : 600 }}
    >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${INK_MUTE} 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            opacity: 0.18,
          }}
        />

        {/* Diagonal scan line */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '100% 3px',
            opacity: 0.5,
            mixBlendMode: 'overlay',
          }}
        />

        {displayMarker && (
          <div
            className="absolute z-20 pointer-events-auto"
            style={
              isMobile
                ? { left: 12, right: 12, bottom: 12, width: 'auto' }
                : { top: 56, right: 32, width: 340 }
            }
          >
            <motion.article
              key={displayMarker.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                position: 'relative',
                background: PAPER,
                color: INK,
                border: `1.5px solid ${PAPER}`,
                borderRadius: 14,
                padding: '22px 24px 18px',
              }}
            >
              {/* Category pill */}
              <span
                style={{
                  position: 'absolute',
                  top: -10,
                  left: 16,
                  background: PAPER,
                  color: INK,
                  padding: '0 8px',
                  border: `1px solid ${INK}`,
                  borderRadius: 2,
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                NODE · {displayMarker.id.toUpperCase()}
              </span>

              {/* Status pill */}
              <span
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 16,
                  background: ORANGE,
                  color: PAPER,
                  padding: '1px 8px',
                  borderRadius: 2,
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                ACTIVE
              </span>

              <div
                style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: INK_MUTE,
                  marginBottom: 6,
                }}
              >
                {displayMarker.label}
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily:
                    '"Orbitron", "Rajdhani", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 900,
                  fontSize: 34,
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                {displayMarker.city.split(',')[0]}
              </h3>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 11,
                  color: INK_MUTE,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {displayMarker.city.split(',')[1]?.trim()}
              </div>

              <div
                style={{
                  marginTop: 14,
                  paddingTop: 12,
                  borderTop: `1px solid ${INK}`,
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 11,
                  color: INK,
                }}
              >
                {displayMarker.subtitle}
              </div>

              {/* Stats grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  border: `1px solid ${INK}`,
                  marginTop: 16,
                }}
              >
                {[
                  { k: 'LAT', v: `${displayMarker.lat.toFixed(2)}°N` },
                  { k: 'LON', v: `${displayMarker.lon.toFixed(2)}°E` },
                ].map((s, i) => (
                  <div
                    key={s.k}
                    style={{
                      padding: '10px 12px',
                      borderRight: i === 0 ? `1px solid ${INK}` : undefined,
                    }}
                  >
                    <div
                      style={{
                        fontFamily:
                          '"Orbitron", "Rajdhani", Arial, sans-serif',
                        fontWeight: 800,
                        fontSize: 16,
                        lineHeight: 1,
                      }}
                    >
                      {s.v}
                    </div>
                    <div
                      style={{
                        marginTop: 4,
                        fontFamily:
                          '"JetBrains Mono", ui-monospace, monospace',
                        fontSize: 9,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: INK_MUTE,
                      }}
                    >
                      {s.k}
                    </div>
                  </div>
                ))}
              </div>

              {displayMarker.details && (
                <ul
                  style={{
                    margin: '16px 0 0',
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  {displayMarker.details.map((line) => (
                    <li
                      key={line}
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'center',
                        fontFamily:
                          '"JetBrains Mono", ui-monospace, monospace',
                        fontSize: 11,
                        color: INK,
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: 6,
                          height: 6,
                          background: ORANGE,
                        }}
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              )}

              {/* Node selector */}
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 12,
                  borderTop: `1px solid ${INK}`,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                }}
              >
                {MARKERS.map((marker) => {
                  const isSelected = marker.id === activeMarker.id
                  return (
                    <button
                      key={marker.id}
                      onMouseEnter={() => setHoveredMarker(marker)}
                      onMouseLeave={() => setHoveredMarker(null)}
                      onClick={() => setActiveMarker(marker)}
                      style={{
                        padding: '3px 10px',
                        border: `1px solid ${INK}`,
                        background: isSelected ? INK : 'transparent',
                        color: isSelected ? PAPER : INK,
                        fontFamily:
                          '"JetBrains Mono", ui-monospace, monospace',
                        fontSize: 9,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      {marker.id}
                    </button>
                  )
                })}
              </div>
            </motion.article>
          </div>
        )}

        <div className="absolute inset-0 z-0 cursor-move"
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
        >
            <Canvas
              key={canvasKey}
              camera={{ position: [0, 0, 6], fov: 45 }}
              onCreated={({ gl }) => {
                const canvasEl = gl.domElement
                const handleLost = (event: Event) => {
                  event.preventDefault()
                  setCanvasKey((k) => k + 1)
                }
                canvasEl.addEventListener('webglcontextlost', handleLost, false)
              }}
            >
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

        <HUDOverlay markerCount={MARKERS.length} activeId={displayMarker?.id ?? ''} />
    </section>
  )
}

