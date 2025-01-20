'use server';

import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ProductCard } from '../components/ui/product-card';
import { getSoldProducts } from '../../../utils/products';

type Props = {
  params: { locale: string }
};

export default async function ArchivePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('SoldPieces');

  const pieces = getSoldProducts();

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

      {/* Archive Grid */}
      <div className="container mx-auto px-4 py-12">
        {pieces.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-gold/80 text-2xl">{t('noItemsFound')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pieces.map((piece) => (
              <ProductCard key={piece.id} product={piece} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}