"use client";

import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const phoneNumber = "+39 328 923 1898";
  const phoneNumberClean = phoneNumber.replace(/\s/g, '');
  const whatsappLink = `https://wa.me/${phoneNumberClean}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-6 h-6"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2.29 22l4.17-1.59c1.57 1.08 3.46 1.71 5.54 1.71 5.52 0 10-4.48 10-10S17.52 2 12 2zm.89 14.14l-2.33-.89-4.11 1.33 1.33-4.11-.89-2.33c-.34-.89-.17-1.89.44-2.58.6-.69 1.51-1 2.41-.78l1.93.58c1.59.48 2.78 1.67 3.26 3.26l.58 1.93c.22.9-.09 1.81-.78 2.41-.69.61-1.69.78-2.58.44z"/>
      </svg>
      <span className="absolute right-full mr-3 bg-white text-green-600 px-3 py-1 rounded-lg text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Scrivici su WhatsApp
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
