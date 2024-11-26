// src/components/providers/smooth-scroll.tsx
"use client"
import { useEffect, type ReactNode } from 'react'

interface SmoothScrollProps {
  children: ReactNode
}

type LenisType = {
  destroy: () => void
  raf: (time: number) => void
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    let lenis: LenisType | null = null

    const initLenis = async () => {
      try {
        const lenisModule = await import('@studio-freight/lenis')
        const Lenis = lenisModule.default
        lenis = new Lenis()

        function raf(time: number) {
          lenis?.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
      } catch (error) {
        console.error('Error initializing Lenis:', error)
      }
    }

    initLenis()

    return () => {
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [])

  return <>{children}</>
}