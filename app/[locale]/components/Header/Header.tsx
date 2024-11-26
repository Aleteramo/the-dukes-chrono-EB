"use client";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const t = useTranslations('Navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Funzione per ottenere il percorso nella nuova lingua
  const getPathInNewLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/catalog`, label: t('catalog') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/contact`, label: t('contact') }
  ];

  // Varianti di animazione per il menu mobile
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={`/${locale}`} className="text-gold font-bold text-xl">
              The Duke's Chrono
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    pathname === item.href
                      ? 'text-gold'
                      : 'text-gold/60 hover:text-gold'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="text-gold/60 hover:text-gold text-sm font-medium flex items-center space-x-1"
              >
                <span>{locale.toUpperCase()}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isLangMenuOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 py-2 w-24 bg-black/95 backdrop-blur-sm rounded-lg shadow-xl"
                  >
                    {['it', 'en'].map((lang) => (
                      <Link
                        key={lang}
                        href={getPathInNewLocale(lang)}
                        className={`block px-4 py-2 text-sm ${
                          locale === lang
                            ? 'text-gold'
                            : 'text-gold/60 hover:text-gold'
                        }`}
                        onClick={() => setIsLangMenuOpen(false)}
                      >
                        {lang.toUpperCase()}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center relative"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col items-end justify-center space-y-1.5 relative z-50">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                    width: isMobileMenuOpen ? "24px" : "24px"
                  }}
                  className="block h-0.5 bg-gold origin-center transition-all duration-300"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    width: "16px"
                  }}
                  className="block h-0.5 bg-gold transition-all duration-300"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                    width: isMobileMenuOpen ? "24px" : "20px"
                  }}
                  className="block h-0.5 bg-gold origin-center transition-all duration-300"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 md:hidden"
          >
            <div className="h-full flex flex-col justify-center items-center pt-16">
              <motion.div className="flex flex-col items-center space-y-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={itemVariants}
                    className="relative overflow-hidden"
                  >
                    <Link
                      href={item.href}
                      className={`text-2xl font-medium ${
                        pathname === item.href
                          ? 'text-gold'
                          : 'text-gold/60 hover:text-gold'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
