// src/components/ui/cursor/index.tsx
"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.closest('[data-cursor-hover]')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseover', handleMouseEnter)
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseover', handleMouseEnter)
      }
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <motion.div 
      className={`fixed z-[9999] pointer-events-none hidden md:block ${
        isHovering ? 'w-12 h-12 bg-white/20 backdrop-blur-sm' : 'w-4 h-4 bg-white'
      } rounded-full mix-blend-difference`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ 
        scale: isHovering ? 1.5 : 1, 
        opacity: 1 
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 15 
      }}
    />
  )
}