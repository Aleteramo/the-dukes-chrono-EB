// src/components/sections/instagram-feed/index.tsx
"use client"
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl';
import ParallaxSection from '../../ui/parallax';

export default function InstagramFeed() {
  const posts = [
    { id: 1, text: "Rolex Vintage" },
    { id: 2, text: "Patek Philippe" },
    { id: 3, text: "Omega Speedmaster" },
    { id: 4, text: "Cartier Tank" }
  ]

  return (
    <ParallaxSection offset={50}>
      <section className="py-20" id="instagram">
        <motion.h2 
          className="font-serif text-3xl md:text-4xl mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Instagram
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="group aspect-square relative rounded-lg overflow-hidden bg-gray-900"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-800">
                {post.text}
              </div>
              
              {/* Overlay con hover effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <motion.span
                  className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  Vedi su Instagram
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a 
              href="https://instagram.com/thedukes.chrono" 
              target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border border-white text-white relative group overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Seguici su Instagram
            </span>
            <motion.div
              className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            />
          </a>
        </motion.div>
      </section>
    </ParallaxSection>
  )
}