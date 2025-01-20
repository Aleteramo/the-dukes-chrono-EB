"use client";

import { useTranslations } from 'next-intl';
import { SocialLinks } from '@/components/ui/social-links';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const t = useTranslations('Footer');
  const phoneNumber = "+39 328 923 1898";
  const phoneNumberClean = phoneNumber.replace(/\s/g, '');

  const socialData = [
    {
      name: 'Instagram',
      image: '/images/social/Instagram.svg',
      link: 'https://www.instagram.com/thedukes.chrono/'
    },
    {
      name: 'Vinted',
      image: '',
      link: 'https://www.vinted.it/member/96984278-ebell96'
    },
    {
      name: 'TikTok',
      image: '/images/social/TikTok.svg',
      link: 'https://www.tiktok.com/@thedukes.chrono'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: 'info@dukeschrono.com',
      href: 'mailto:info@dukeschrono.com'
    },
    {
      icon: Phone,
      text: phoneNumber,
      href: `tel:${phoneNumberClean}`
    },
    {
      icon: MapPin,
      text: 'Via Roma 123, Milano',
      href: '#'
    }
  ];

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black/95" />
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: '100% 100%' }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: 'radial-gradient(circle at center, var(--gold) 0.1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mb-12"
        >
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-gold font-semibold text-xl relative inline-block">
              {t('contact')}
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 bg-gold/40"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
              />
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a 
                    href={item.href}
                    className="group flex items-center gap-3 text-gold/80 hover:text-gold transition-colors duration-300"
                  >
                    <div className="p-2 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors duration-300">
                      <item.icon size={18} className="text-gold" />
                    </div>
                    <span>{item.text}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <h3 className="text-gold font-semibold text-xl relative inline-block">
              {t('followUs')}
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 bg-gold/40"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
              />
            </h3>
            <SocialLinks
              socials={socialData}
              className="justify-start gap-6"
            />
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-gold/10 text-center"
        >
          <p className="text-gold/60">{t('copyright')}</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;