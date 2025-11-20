'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export default function ScrollTechOverlay() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 500])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <div ref={targetRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Vertical Data Lines */}
      <motion.div style={{ y: y1, opacity }} className="absolute left-[5%] top-[-10%] h-[120%] w-[1px] bg-black/5">
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-black/20 to-transparent animate-scan"></div>
      </motion.div>
      <motion.div style={{ y: y2, opacity }} className="absolute right-[5%] top-[-10%] h-[120%] w-[1px] bg-black/5">
         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-transparent via-black/20 to-transparent animate-scan-reverse"></div>
      </motion.div>

      {/* Floating Tech Specs */}
      <motion.div style={{ opacity }} className="absolute top-[40%] left-[2%] text-[10px] font-mono text-gray-400 writing-vertical-rl hidden xl:block">
         SYS_OVR_RIDE // SCROLL_VELOCITY_MONITOR
      </motion.div>
      
      <motion.div style={{ opacity }} className="absolute top-[60%] right-[2%] text-[10px] font-mono text-gray-400 writing-vertical-rl rotate-180 hidden xl:block">
         MEMORY_ALLOCATION_OPTIMIZED // V.2.4.1
      </motion.div>

      {/* Scroll Progress Bar (Right Side) */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-transparent">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-[var(--color-danger)]"
          style={{ height: scrollYProgress, transformOrigin: "top" }} // Use height directly as motion value
        />
      </div>
    </div>
  )
}

