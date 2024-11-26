import Image from 'next/image';
import { Product } from '@/utils/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden group">
      <div className="relative w-full h-64">
        <Image 
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-semibold text-gold">
            {product.name}
          </h2>
          <span className="text-gold/80">
            {product.price}
          </span>
        </div>
        <p className="text-gold/60 mb-4">
          {product.description}
        </p>
        {product.sold && (
          <div className="flex justify-between items-center">
            <span className="inline-block px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-300">
              Venduto
            </span>
            {product.soldDate && (
              <span className="text-gold/40 text-sm">
                {new Date(product.soldDate).toLocaleDateString('it-IT', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
