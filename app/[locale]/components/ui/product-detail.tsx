import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ProductDetailProps {
  title: string;
  subtitle: string;
  price: number;
  image: string;
  details: string[];
  specifications: string[];
  description: string;
}

export default function ProductDetail({
  title,
  subtitle,
  price,
  image,
  details,
  specifications,
  description
}: ProductDetailProps) {
  const t = useTranslations('ProductDetail');

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galleria immagini */} 
        <div className="space-y-4">
          <Image 
            src={image}
            alt={title}
            width={500}
            height={300}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Dettagli */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          
          <p className="text-gray-600">{subtitle}</p>
          
          <p className="text-2xl font-bold">€{price.toFixed(2)}</p>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">{t('details')}</h2>
              <ul className="space-y-2">
                {details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">{t('specifications')}</h2>
              <ul className="space-y-2">
                {specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">{t('description')}</h2>
              <p className="text-gray-700">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
