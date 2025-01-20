import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

const watches = [
  {
    id: 1,
    brand: 'Rolex',
    model: 'Oyster Perpetual 36',
    collection: 'PRIVATE COLLECTION',
    image: '/images/watches/rolex/oyster-perpetual-36.png',
    description: 'Un classico intramontabile della collezione Rolex Oyster Perpetual.'
  },
  {
    id: 2,
    brand: 'Omega',
    model: 'De Ville \'60',
    collection: 'AVAILABLE',
    image: '/images/watches/omega/deville-60.png',
    description: 'Un elegante orologio vintage della linea Omega De Ville degli anni \'60.'
  }
];

type Props = {
  params: { locale: string }
};

export default async function CatalogoPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Collection');

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {watches.map((watch) => (
          <div key={watch.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-full h-64">
              <Image 
                src={watch.image} 
                alt={`${watch.brand} ${watch.model}`} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{watch.brand} {watch.model}</h2>
              <p className="text-gray-600 mb-4">{watch.description}</p>
              <span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-sm">
                {watch.collection}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
