// src/components/sections/watch-detail/index.tsx
"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface WatchDetails {
  name: string;
  brand: string;
  status: string;
  images: string[];
  description: {
    it: string;
    en: string;
  };
  specs: {
    ref: string;
    size: string;
    sku: string;
    movement: string;
    model: string;
    gender: string;
  };
}

interface WatchDetailProps {
  watch: WatchDetails;
}

export default function WatchDetail({ watch }: WatchDetailProps) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galleria immagini */}
        <div className="space-y-4">
          <motion.div 
            className="aspect-square relative rounded-lg overflow-hidden bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Image
              src={watch.images[currentImage]}
              alt={`${watch.name} - Vista ${currentImage + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {watch.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`aspect-square relative rounded-lg overflow-hidden bg-gray-900 ${
                  currentImage === index ? 'ring-2 ring-white' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${watch.name} - Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 10vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Dettagli */}
        <div className="space-y-8">
          <div>
            <motion.span
              className="text-sm text-gray-400 block mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {watch.status}
            </motion.span>
            <motion.h1
              className="text-4xl font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {watch.name}
            </motion.h1>
          </div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-serif">Specifiche</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(watch.specs).map(([key, value]) => (
                <div key={key}>
                  <span className="text-sm text-gray-400 block capitalize">
                    {key}
                  </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-serif">Descrizione</h2>
            <div className="space-y-4">
              <p>{watch.description.it}</p>
              <p className="text-gray-400">{watch.description.en}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}