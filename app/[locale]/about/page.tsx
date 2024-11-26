"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function About() {
  const t = useTranslations('About');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/20 to-black" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gold text-center"
          >
            {t('title')}
          </motion.h1>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Heritage Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center"
            >
              <h2 className="text-3xl font-semibold text-gold mb-6">{t('heritage.title')}</h2>
              <p className="text-gold/80 leading-relaxed">
                {t('heritage.description')}
              </p>
            </motion.div>

            {/* Expertise Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center"
            >
              <h2 className="text-3xl font-semibold text-gold mb-6">{t('expertise.title')}</h2>
              <p className="text-gold/80 leading-relaxed">
                {t('expertise.description')}
              </p>
            </motion.div>

            {/* Values Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            >
              {[1, 2, 3].map((index) => (
                <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg">
                  <h3 className="text-xl font-semibold text-gold mb-4">
                    {t(`values.${index}.title`)}
                  </h3>
                  <p className="text-gold/70">
                    {t(`values.${index}.description`)}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
