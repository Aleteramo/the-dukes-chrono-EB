"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const t = useTranslations('Contact');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui implementeremo l'invio del form
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gold mb-6">{t('title')}</h1>
            <p className="text-gold/80 text-xl max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gold mb-2">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-gold/30 rounded-lg focus:border-gold/60 focus:outline-none text-gold/90 placeholder-gold/50"
                    placeholder={t('form.namePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gold mb-2">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-gold/30 rounded-lg focus:border-gold/60 focus:outline-none text-gold/90 placeholder-gold/50"
                    placeholder={t('form.emailPlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gold mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-gold/30 rounded-lg focus:border-gold/60 focus:outline-none text-gold/90 placeholder-gold/50 resize-none"
                    placeholder={t('form.messagePlaceholder')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gold/20 hover:bg-gold/30 text-gold border border-gold/50 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {t('form.submit')}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold text-gold mb-4">
                  {t('info.location.title')}
                </h3>
                <p className="text-gold/80">
                  Via Roma 123<br />
                  Milano, Italy
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gold mb-4">
                  {t('info.contact.title')}
                </h3>
                <p className="text-gold/80">
                  Email: info@dukeschrono.com<br />
                  Tel: +39 123 456 789
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gold mb-4">
                  {t('info.hours.title')}
                </h3>
                <p className="text-gold/80">
                  {t('info.hours.weekdays')}<br />
                  {t('info.hours.weekend')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black border border-gold/30 rounded-lg p-8 max-w-md w-full text-center"
          >
            <h3 className="text-2xl font-semibold text-gold mb-4">
              {t('success.title')}
            </h3>
            <p className="text-gold/80 mb-6">
              {t('success.message')}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 bg-gold/20 hover:bg-gold/30 text-gold border border-gold/50 rounded-full transition-all duration-300"
            >
              {t('success.close')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
