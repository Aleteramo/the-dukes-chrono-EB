"use client"
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ThreeDPhotoCarousel } from '../ui/3d-carousel';

interface CollectionProps {
  showTitle?: boolean;
}

export default function Collection({ showTitle = true }: CollectionProps) {
  const t = useTranslations('Collection');

  return (
    <div className="container mx-auto px-4 py-12">
      {showTitle && (
        <motion.h2 
          className="text-4xl font-bold text-center mb-8 text-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>
      )}
      
      <div className="grid grid-cols-1 gap-8">
        <ThreeDPhotoCarousel />
      </div>
    </div>
  );
}