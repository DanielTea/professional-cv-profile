'use client'

import { useEffect, useState } from 'react'

interface BarcodeProps {
  className?: string
  color?: string
  width?: string
  height?: string
  bars?: number
}

export default function Barcode({ 
  className = "", 
  color = "bg-black",
  width = "w-full",
  height = "h-8",
  bars = 20
}: BarcodeProps) {
  const [barData, setBarData] = useState<number[]>([])

  useEffect(() => {
    // Generate random bar widths (1-4) for visual variety
    const data = Array.from({ length: bars }, () => Math.random())
    setBarData(data)
  }, [bars])

  return (
    <div className={`flex items-stretch gap-[2px] ${width} ${height} ${className}`}>
      {barData.map((val, i) => {
        // Random opacity for some bars to look like "data"
        const opacity = val > 0.8 ? 0.5 : 1
        
        // Determine width class based on value
        let widthClass = 'flex-1'
        if (val < 0.3) widthClass = 'flex-[0.5]'
        if (val > 0.7) widthClass = 'flex-[2]'

        return (
          <div 
            key={i}
            className={`${color} ${widthClass}`}
            style={{ opacity }}
          />
        )
      })}
    </div>
  )
}

