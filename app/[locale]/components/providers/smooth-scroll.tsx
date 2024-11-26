// src/components/providers/smooth-scroll.tsx
'use client'

import { useEffect, type ReactNode } from 'react'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Add smooth scroll behavior to html element
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth'
    }

    return () => {
      // Reset scroll behavior on cleanup
      if (typeof window !== 'undefined') {
        document.documentElement.style.scrollBehavior = 'auto'
      }
    }
  }, [])

  return <>{children}</>
}