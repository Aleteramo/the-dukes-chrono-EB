// src/components/ui/header/index.tsx
"use client"
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function Header() {
  const t = useTranslations('Navigation');
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const navLinks = [
    { href: '/catalogo', text: t('catalog') },
    { href: '/chi-sono', text: t('about') },
    { href: '/servizi', text: t('services') },
    { href: '/contatti', text: t('contact') }
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transform-gpu ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-serif text-xl text-[#FFD700] hover:opacity-80 transform-gpu fixed left-4"
            prefetch={true}
          >
            TDC
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, text }) => (
              <Link 
                key={href}
                href={href} 
                className="text-gray-300 hover:text-white transform-gpu"
                prefetch={true}
              >
                {text}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white hover:opacity-80 transform-gpu"
            aria-label="Menu"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-20 left-0 right-0 bg-black/90 backdrop-blur-sm transform-gpu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navLinks.map(({ href, text }) => (
                  <Link 
                    key={href}
                    href={href} 
                    className="text-gray-300 hover:text-white transform-gpu"
                    onClick={toggleMobileMenu}
                    prefetch={true}
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}