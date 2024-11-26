import React from 'react';
import { useTranslations } from 'next-intl';
import WatchCard from './components/WatchCard/WatchCard';
import Collection from './components/Collection/Collection';
import SoldPieces from './components/SoldPieces/SoldPieces';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="min-h-screen bg-black/95 text-white">
      {/* Interactive Watch Section */}
      <section className="py-16 bg-black/80">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[600px]">
          <WatchCard />
        </div>
      </section>

      {/* Sold Pieces Section */}
      <SoldPieces />

      {/* Available Collection Preview */}
      <Collection />
    </main>
  );
}
