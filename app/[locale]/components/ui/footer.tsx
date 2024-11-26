import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('about.title')}</h3>
          <p className="text-gray-300">{t('about.description')}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('contact.title')}</h3>
          <ul className="space-y-2">
            <li>{t('contact.email')}</li>
            <li>{t('contact.phone')}</li>
            <li>{t('contact.address')}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('links.title')}</h3>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo" className="hover:text-gray-300">
                  {t('links.catalog')}
                </Link>
              </li>
              <li>
                <Link href="/chi-sono" className="hover:text-gray-300">
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="hover:text-gray-300">
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-800 pt-6">
        <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
      </div>
    </footer>
  );
}
