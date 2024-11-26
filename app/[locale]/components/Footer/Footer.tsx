"use client";
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  const phoneNumber = "+39 328 923 1898";
  const phoneNumberClean = phoneNumber.replace(/\s/g, '');

  return (
    <footer className="py-12 border-t border-gold/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-gold font-semibold text-lg mb-4">{t('contact')}</h3>
            <ul className="space-y-3 text-gold/80">
              <li>
                <a href="mailto:info@dukeschrono.com" className="hover:text-gold transition-colors">
                  info@dukeschrono.com
                </a>
              </li>
              <li>
                <a href={`tel:${phoneNumberClean}`} className="hover:text-gold transition-colors">
                  {phoneNumber}
                </a>
              </li>
              <li>Via Roma 123, Milano</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h3 className="text-gold font-semibold text-lg mb-4">{t('followUs')}</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <a href="https://www.instagram.com/thedukes.chrono/" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-gold/80 hover:text-gold transition-colors">
                Instagram
              </a>
              <a href="https://www.vinted.it/member/96984278-ebell96" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gold/80 hover:text-gold transition-colors">
                Vinted
              </a>
              <a href="https://www.tiktok.com/@thedukes.chrono" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gold/80 hover:text-gold transition-colors">
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gold/60 pt-8 border-t border-gold/20">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
