"use client";
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');

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
              <li>
                <a href="tel:+39123456789" className="hover:text-gold transition-colors">
                +39 328 923 1898
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
            <div className="flex justify-center md:justify-end space-x-4">
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
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
