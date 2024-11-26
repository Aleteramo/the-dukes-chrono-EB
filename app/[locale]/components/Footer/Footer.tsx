"use client";
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  const phoneNumber = "+39 328 923 1898";
  const phoneNumberClean = phoneNumber.replace(/\s/g, '');
  const whatsappLink = `https://wa.me/${phoneNumberClean}`;

  return (
    <footer className="py-12 border-t border-gold/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-gold font-semibold text-lg mb-4">{t('contact')}</h3>
            <ul className="space-y-2 text-gold/80">
              <li>
                <a href="mailto:info@dukeschrono.com" className="hover:text-gold transition-colors">
                  info@dukeschrono.com
                </a>
              </li>
              <li className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                <a href={`tel:${phoneNumberClean}`} className="hover:text-gold transition-colors">
                  {phoneNumber}
                </a>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-green-500 hover:text-green-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2.29 22l4.17-1.59c1.57 1.08 3.46 1.71 5.54 1.71 5.52 0 10-4.48 10-10S17.52 2 12 2zm.89 14.14l-2.33-.89-4.11 1.33 1.33-4.11-.89-2.33c-.34-.89-.17-1.89.44-2.58.6-.69 1.51-1 2.41-.78l1.93.58c1.59.48 2.78 1.67 3.26 3.26l.58 1.93c.22.9-.09 1.81-.78 2.41-.69.61-1.69.78-2.58.44z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>Via Roma 123, Milano</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-gold font-semibold text-lg mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-gold/80">
              <li>
                <a href="#about" className="hover:text-gold transition-colors">
                  {t('about')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold transition-colors">
                  {t('services')}
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-gold transition-colors">
                  {t('privacy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h3 className="text-gold font-semibold text-lg mb-4">{t('followUs')}</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <a href="https://www.instagram.com/thedukes.chrono/" target="_blank" rel="noopener noreferrer" 
                 className="text-gold/80 hover:text-gold transition-colors">
                Instagram
              </a>
              <a href="https://www.vinted.it/member/96984278-ebell96?fbclid=PAZXh0bgNhZW0CMTEAAaZJ_-bCTHRxWH_QF-Q70BzG3LE2P4clhzANhmevOvLiX8UBsp32KbDrwko_aem_9MgxqwpbfqjpCJSmKVZuuQ" target="_blank" rel="noopener noreferrer"
                 className="text-gold/80 hover:text-gold transition-colors">
                Vinted
              </a>
              <a href="https://www.tiktok.com/@thedukes.chrono?fbclid=PAZXh0bgNhZW0CMTEAAab8FEc29xHkNgavZKe8pn8UbZoUGrMjFU7gjirDTN5-ZMWmXuZB4FNpbgU_aem_0UViJgEeyWcq7HJXo2s1CA" target="_blank" rel="noopener noreferrer"
                 className="text-gold/80 hover:text-gold transition-colors">
                Tiktok
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gold/60 pt-8 border-t border-gold/20">
          <p>
            {t('copyright')} • <a href={`tel:${phoneNumberClean}`} className="hover:text-gold transition-colors">{phoneNumber}</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
