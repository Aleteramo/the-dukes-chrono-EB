// src/components/sections/featured-watches/index.tsx
"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface WatchSpecs {
  size: string;
  sku?: string;
  movement: string;
  model?: string;
  gender: string;
  period?: string;
  material?: string;
  strap?: string;
}

interface Watch {
  id: number;
  name: string;
  brand: string;
  ref?: string;
  specs: WatchSpecs;
  description: string;
  imageUrl: string;
  status: string;
  price?: number | null;
}

const watches: Watch[] = [
  {
    id: 1,
    name: "Rolex Oyster Perpetual 36",
    brand: "Rolex",
    ref: "116000",
    specs: {
      size: "36mm",
      sku: "V18526",
      movement: "Automatico",
      model: "Oyster Perpetual 36",
      gender: "Unisex"
    },
    description: "Questo magnifico esemplare non è in vendita, ma resta una pietra miliare per chi ama gli orologi intramontabili. Perfetto per ogni occasione, grazie alle sue dimensioni e al design unisex, incarna eleganza e precisione.",
    imageUrl: "/images/watches/rolex/oyster-perpetual-36.jpg",
    status: "PRIVATE COLLECTION",
    price: null
  },
  {
    id: 2,
    name: "Omega De Ville '60",
    brand: "Omega",
    specs: {
      size: "30mm",
      period: "1960-1969",
      movement: "Carica manuale",
      material: "Acciaio, Placcato oro",
      strap: "21 cm",
      gender: "Uomo"
    },
    description: "Un classico vintage, con una cassa in acciaio placcata oro arricchita da una patina unica, simbolo del suo fascino intramontabile.",
    imageUrl: "/images/watches/omega/deville-60.jpg",
    status: "AVAILABLE",
  }
]

export default function WatchGallery() {
  return (
    <section className="py-20">
      <motion.h2 
        className="font-serif text-3xl md:text-4xl mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        In Evidenza
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {watches.map((watch) => (
          <motion.div
            key={watch.id}
            className="bg-black rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square relative">
              <Image
                src={watch.imageUrl}
                alt={watch.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={watch.id === 1}
              />
              <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded text-sm">
                {watch.status}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif text-xl">{watch.name}</h3>
                <p className="text-gray-400 text-sm space-y-1">
                  <span className="block">Marca: {watch.brand}</span>
                  {watch.ref && <span className="block">Ref: {watch.ref}</span>}
                  <span className="block">Dimensioni: {watch.specs.size}</span>
                  <span className="block">Movimento: {watch.specs.movement}</span>
                </p>
              </div>
              <p className="text-sm text-gray-300">{watch.description}</p>
              {watch.price && (
                <div className="pt-4">
                  <Link 
                    href="/contatti"
                    className="inline-block px-4 py-2 border border-white text-sm hover:bg-white hover:text-black transition-colors duration-200"
                  >
                    Contattaci
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}