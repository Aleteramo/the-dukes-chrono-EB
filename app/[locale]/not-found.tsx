import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg mb-8">{t('description')}</p>
      <Link href="/" className="text-blue-500 hover:text-blue-700">
        {t('backHome')}
      </Link>
    </div>
  );
}
