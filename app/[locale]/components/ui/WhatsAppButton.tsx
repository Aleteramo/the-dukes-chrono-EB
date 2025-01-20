"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function WhatsAppButton() {
  const t = useTranslations('Contact');
  const phoneNumber = "+39 328 923 1898";
  const phoneNumberClean = phoneNumber.replace(/\s/g, '');
  const whatsappLink = `https://wa.me/${phoneNumberClean}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] isolation">
      <div className="relative group">
        {/* Effetto pulsazione */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative
            bg-gradient-to-br from-[#25D366] to-[#128C7E]
            rounded-full shadow-lg
            transition-all duration-300
            flex items-center justify-center
            group w-14 h-14
            hover:shadow-[#25D366]/20 hover:shadow-xl
          "
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-full h-full p-3">
            <Image
              src="/images/social/whatsapp.svg"
              alt="WhatsApp"
              fill
              className="p-0.5 filter drop-shadow-lg"
              priority
            />
          </div>

          {/* Tooltip migliorato */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="
              absolute right-full mr-4
              bg-white/95 backdrop-blur-sm
              text-[#128C7E]
              px-4 py-2 rounded-xl
              text-sm font-medium
              shadow-lg shadow-black/5
              opacity-0 group-hover:opacity-100
              transition-all duration-300
              whitespace-nowrap
              border border-[#25D366]/10
              flex items-center gap-2
            "
          >
            {t('whatsappMessage')}
            <motion.div
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/95 rotate-45"
              style={{
                boxShadow: '2px -2px 2px rgba(0,0,0,0.02)',
                borderRight: '1px solid rgba(37, 211, 102, 0.1)',
                borderTop: '1px solid rgba(37, 211, 102, 0.1)'
              }}
            />
          </motion.span>
        </motion.a>
      </div>
    </div>
  );
}