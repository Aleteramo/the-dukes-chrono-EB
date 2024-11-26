// src/components/sections/contact-cta/index.tsx
"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl';
import ParallaxSection from '../../ui/parallax';

export default function ContactCTA() {
  return (
    <ParallaxSection offset={50}>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="font-serif text-3xl md:text-4xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Interesse per un orologio?
          </motion.h2>

          <motion.p 
            className="text-gray-400 mb-12 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contattami per maggiori informazioni o per fissare un appuntamento.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/contatti"
              className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-200 relative group"
            >
              <span className="relative z-10">Contattaci</span>
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </ParallaxSection>
  )
}