"use client";

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('About');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const updateCardStyle = (event: React.PointerEvent<HTMLDivElement>, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    element.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
  };

  const resetCardStyle = (element: HTMLDivElement) => {
    element.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-black overflow-hidden">
      {/* Hero Section Parallax */}
      <motion.section style={{ y }} className="relative h-[60vh] flex items-center justify-center">
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-black/50 to-black/95"
        />
        <div className="absolute inset-0 mix-blend-overlay opacity-30">
          <Image
            src="/images/texture-pattern.png"
            alt="Texture"
            fill
            className="object-cover"
          />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-bold text-gold text-center px-4 relative"
        >
          {t('title')}
        </motion.h1>
      </motion.section>

      {/* Content Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {['heritage', 'expertise'].map((section, index) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent rounded-xl opacity-0 
                         group-hover:opacity-100 transition-opacity duration-500"
              />
              <div
                className="relative bg-white/5 backdrop-blur-[2px] rounded-xl p-8 border border-gold/10
                         transition-all duration-300 ease-out"
                onPointerMove={(e) => e.currentTarget && updateCardStyle(e, e.currentTarget)}
                onPointerLeave={(e) => e.currentTarget && resetCardStyle(e.currentTarget)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <h2 className="text-3xl font-bold text-gold mb-6">
                  {t(`${section}.title`)}
                </h2>
                <p className="text-gold/80 leading-relaxed">
                  {t(`${section}.description`)}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Values Cards with Enhanced Effects */}
          {[1, 2, 3].map((value, index) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              className="group relative md:col-span-2 lg:col-span-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent rounded-xl opacity-0 
                           group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className="relative bg-white/5 backdrop-blur-[2px] rounded-xl p-8 border border-gold/10
                         transition-all duration-300 ease-out"
                onPointerMove={(e) => e.currentTarget && updateCardStyle(e, e.currentTarget)}
                onPointerLeave={(e) => e.currentTarget && resetCardStyle(e.currentTarget)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <h3 className="text-2xl font-bold text-gold mb-4">
                  {t(`values.${value}.title`)}
                </h3>
                <p className="text-gold/80 leading-relaxed">
                  {t(`values.${value}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}