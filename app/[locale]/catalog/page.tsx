// TEMPORARILY HIDDEN FROM NAVBAR - DO NOT REMOVE
// This page will be re-enabled in future updates

import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { motion } from 'framer-motion';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Collection' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

type Props = {
  params: { locale: string }
};

export default async function Catalog({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Collection');

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      {/* Add catalog content here */}
    </main>
  );
}
