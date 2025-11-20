'use client'

import { useState, useEffect } from 'react'

export default function MouseCoordinates() {
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinates to -1 to 1 range relative to center of screen
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setCoords({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <span>
      COORDS: {coords.x.toFixed(4)} {coords.x >= 0 ? 'E' : 'W'} / {Math.abs(coords.y).toFixed(4)} {coords.y >= 0 ? 'N' : 'S'}
    </span>
  )
}

