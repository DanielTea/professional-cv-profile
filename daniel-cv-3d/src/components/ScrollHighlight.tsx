'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollHighlightProps {
  children: ReactNode
  className?: string
  color?: string
}

export default function ScrollHighlight({ 
  children, 
  className = "", 
  color = "var(--color-volt)" 
}: ScrollHighlightProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <motion.span
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, amount: 0.5 }} 
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ 
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "50%",
          backgroundColor: color,
          zIndex: -1,
          opacity: 0.6
        }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  )
}

