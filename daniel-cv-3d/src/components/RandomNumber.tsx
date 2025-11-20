'use client'

import { useState, useEffect } from 'react'

export default function RandomNumber({ 
  min = 0, 
  max = 100, 
  decimals = 1,
  suffix = '',
  prefix = '',
  interval = 2000 
}: { 
  min?: number, 
  max?: number, 
  decimals?: number,
  suffix?: string,
  prefix?: string,
  interval?: number
}) {
  const [value, setValue] = useState(min)

  useEffect(() => {
    const timer = setInterval(() => {
      const random = Math.random() * (max - min) + min
      setValue(random)
    }, interval)

    return () => clearInterval(timer)
  }, [min, max, interval])

  return (
    <span className="tabular-nums">
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  )
}

