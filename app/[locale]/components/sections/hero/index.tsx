// app/components/sections/hero/index.tsx
"use client"
import { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useSpring, useScroll } from 'framer-motion'

interface MousePosition {
  x: number;
  y: number;
}

// Dati predefiniti per le particelle rimangono gli stessi
const PARTICLES_DATA = [
  // Prima riga
  { x: 10, y: 10, size: 6, delay: 0, color: "#D4AF37" },
  { x: 30, y: 15, size: 7, delay: 0.1, color: "#FFD700" },
  { x: 50, y: 12, size: 5, delay: 0.2, color: "#BDB76B" },
  { x: 70, y: 18, size: 6, delay: 0.3, color: "#D4AF37" },
  { x: 90, y: 14, size: 7, delay: 0.4, color: "#FFD700" },
  // Seconda riga
  { x: 15, y: 30, size: 7, delay: 0.5, color: "#BDB76B" },
  { x: 35, y: 35, size: 6, delay: 0.6, color: "#D4AF37" },
  { x: 55, y: 32, size: 7, delay: 0.7, color: "#FFD700" },
  { x: 75, y: 38, size: 5, delay: 0.8, color: "#BDB76B" },
  { x: 95, y: 34, size: 6, delay: 0.9, color: "#D4AF37" },
  // Terza riga
  { x: 5, y: 50, size: 5, delay: 1.0, color: "#FFD700" },
  { x: 25, y: 55, size: 7, delay: 1.1, color: "#BDB76B" },
  { x: 45, y: 52, size: 6, delay: 1.2, color: "#D4AF37" },
  { x: 65, y: 58, size: 7, delay: 1.3, color: "#FFD700" },
  { x: 85, y: 54, size: 5, delay: 1.4, color: "#BDB76B" },
  // Quarta riga
  { x: 12, y: 70, size: 6, delay: 1.5, color: "#D4AF37" },
  { x: 32, y: 75, size: 7, delay: 1.6, color: "#FFD700" },
  { x: 52, y: 72, size: 5, delay: 1.7, color: "#BDB76B" },
  { x: 72, y: 78, size: 6, delay: 1.8, color: "#D4AF37" },
  { x: 92, y: 74, size: 7, delay: 1.9, color: "#FFD700" },
  // Quinta riga
  { x: 8, y: 90, size: 7, delay: 2.0, color: "#BDB76B" },
  { x: 28, y: 95, size: 6, delay: 2.1, color: "#D4AF37" },
  { x: 48, y: 92, size: 7, delay: 2.2, color: "#FFD700" },
  { x: 68, y: 98, size: 5, delay: 2.3, color: "#BDB76B" },
  { x: 88, y: 94, size: 6, delay: 2.4, color: "#D4AF37" },
  // Particelle centrali
  { x: 40, y: 40, size: 8, delay: 2.5, color: "#FFD700" },
  { x: 60, y: 60, size: 8, delay: 2.6, color: "#D4AF37" },
  { x: 45, y: 65, size: 7, delay: 2.7, color: "#BDB76B" },
  { x: 55, y: 45, size: 7, delay: 2.8, color: "#FFD700" },
  { x: 50, y: 50, size: 8, delay: 2.9, color: "#D4AF37" }
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const springConfig = { stiffness: 100, damping: 30 }
  const mouseXSpring = useSpring(0, springConfig)
  const mouseYSpring = useSpring(0, springConfig)

  // Crea un singolo transform per lo scroll
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 300])

  // Mouse effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    mouseXSpring.set(mousePosition.x * 2 - 1)
    mouseYSpring.set(mousePosition.y * 2 - 1)
  }, [mousePosition, mouseXSpring, mouseYSpring])

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ y: scrollY }}
    >
      <div className="absolute inset-0 bg-black">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, #1a1a1a 0%, #000 100%)",
              "radial-gradient(circle at 100% 100%, #1a1a1a 0%, #000 100%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Connessioni tra particelle */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {PARTICLES_DATA.map((p1, i) => 
            PARTICLES_DATA.slice(i + 1).map((p2, j) => {
              const dist = Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
              if (dist < 30) {
                return (
                  <motion.line
                    key={`${i}-${j}`}
                    x1={`${p1.x}%`}
                    y1={`${p1.y}%`}
                    x2={`${p2.x}%`}
                    y2={`${p2.y}%`}
                    stroke="rgba(212, 175, 55, 0.1)"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: (i + j) * 0.1
                    }}
                  />
                )
              }
              return null;
            })
          )}
        </svg>

        {/* Particelle */}
        {PARTICLES_DATA.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size + 'px',
              height: particle.size + 'px',
              background: particle.color,
              filter: 'blur(0.5px) drop-shadow(0 0 2px rgba(212, 175, 55, 0.5))',
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0, 1.2, 0],
              x: [(i % 5) * 10, 0, (i % 5) * 10],
              y: [(i % 3) * 10, 0, (i % 3) * 10],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-[0.3px] pointer-events-none" />
      </div>

      {/* Contenuto principale */}
      <div className="relative z-10 text-center space-y-6">
        <motion.h1
          className="font-serif text-6xl md:text-8xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            translateX: useTransform(mouseXSpring, [-1, 1], [20, -20]),
            translateY: useTransform(mouseYSpring, [-1, 1], [20, -20])
          }}
        >
          The Dukes Chrono
        </motion.h1>
        
        <motion.p
          className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            translateX: useTransform(mouseXSpring, [-1, 1], [10, -10]),
            translateY: useTransform(mouseYSpring, [-1, 1], [10, -10])
          }}
        >
          Collezione esclusiva di orologi vintage di prestigio
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div 
          className="h-16 w-0.5 bg-white/20"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.section>
  )
}