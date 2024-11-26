import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { motion } from 'framer-motion';
import Collection from '../components/Collection/Collection';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Collection' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Catalog() {
  const t = await getTranslations('Collection');

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden bg-gradient-to-b from-black/95 to-black/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-black/90 to-black" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4">
              {t('title')}
            </h1>
            <p className="text-gold/80 text-xl max-w-2xl mx-auto px-4">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <Collection showTitle={false} />
    </div>
  );
}
