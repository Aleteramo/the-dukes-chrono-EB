"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Services() {
  const t = useTranslations('Services');

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const services = [1, 2, 3, 4];

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/20 via-black/90 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-black/90 to-black" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-gold mb-4"
            >
              {t('title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gold/80 text-xl max-w-2xl mx-auto"
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-gold mb-4">
                    {t(`services.${index}.title`)}
                  </h3>
                  <p className="text-gold/70 mb-6 leading-relaxed">
                    {t(`services.${index}.description`)}
                  </p>
                  <span className="text-sm text-gold/60 uppercase tracking-wider">
                    {t(`services.${index}.timeframe`)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-b from-black/90 to-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-gold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-gold/80 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <button className="px-8 py-3 bg-gold/20 hover:bg-gold/30 text-gold border border-gold/50 rounded-full transition-all duration-300 transform hover:scale-105">
              {t('cta.button')}
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
