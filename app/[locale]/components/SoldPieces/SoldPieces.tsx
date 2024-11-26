"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ProductCard } from '../ui/product-card';
import { getSoldProducts } from '../../../utils/products';

const SoldPieces = () => {
  const t = useTranslations('SoldPieces');
  const soldProducts = getSoldProducts();

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

  return (
    <section id="sold-pieces" className="py-24 bg-gradient-to-b from-black/90 to-black/95">
      <div className="container mx-auto px-4">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {soldProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
                <span className="text-gold border border-gold/50 px-4 py-2 rounded-full text-sm">
                  {t('soldOn')} {new Date(product.soldDate!).toLocaleDateString()}
                </span>
              </div>
              <div className="opacity-75">
                <ProductCard product={product} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SoldPieces;
