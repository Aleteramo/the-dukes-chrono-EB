// src/components/providers/smooth-scroll.tsx
"use client"
import { useEffect, type ReactNode } from 'react'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    (async () => {
      const { default: Lenis } = await import('@studio-freight/lenis')
      const lenis = new Lenis()

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => {
        lenis.destroy()
      }
    })()
  }, [])

  return <>{children}</>
}