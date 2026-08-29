"use client"

import { motion, useScroll, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

export interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={cn(
        "absolute bottom-0 left-0 right-0 h-[2.5px] bg-black dark:bg-white origin-left z-50 pointer-events-none",
        className
      )}
      style={{ scaleX }}
    />
  )
}
