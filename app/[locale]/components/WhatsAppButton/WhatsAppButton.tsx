"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const WhatsAppButton = () => {
  const phoneNumber = "+39 328 923 1898";
  const phoneNumberClean = phoneNumber.replace(/\s/g, '');
  const whatsappLink = `https://wa.me/${phoneNumberClean}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300 flex items-center justify-center group w-14 h-14"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/social/whatsapp.svg"
          alt="WhatsApp"
          fill
          className="p-0.5"
          priority
        />
      </div>
      <span className="absolute right-full mr-3 bg-white text-[#128C7E] px-3 py-1 rounded-lg text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Scrivici su WhatsApp
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
