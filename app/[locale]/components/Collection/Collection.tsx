"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ProductCard } from '../ui/product-card';
import { getAvailableProducts } from '../../../utils/products';

interface CollectionProps {
  showTitle?: boolean;
}

const Collection = ({ showTitle = true }: CollectionProps) => {
  const t = useTranslations('Collection');
  const availableProducts = getAvailableProducts();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (availableProducts.length === 0) {
    return null;
  }

  return (
    <section id="collection" className="py-24 bg-gradient-to-b from-black/95 to-black/90">
      <div className="container mx-auto px-4">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gold mb-4">
              {t('title')}
            </h2>
            <p className="text-gold/80 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {availableProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {availableProducts.length > 3 && showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button className="px-8 py-3 bg-gold/20 hover:bg-gold/30 text-gold border border-gold/50 rounded-full transition-all duration-300 transform hover:scale-105">
              {t('viewAll')}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Collection;
