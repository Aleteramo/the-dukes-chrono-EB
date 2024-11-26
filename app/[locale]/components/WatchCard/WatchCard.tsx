"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

const WatchCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsFlipping(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error: unknown) => {
        console.log("Audio play failed:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsFlipping(true);
    controls.start({ opacity: 0 });
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error: unknown) => {
        console.log("Audio play failed:", error);
      });
    }
  };

  const handleFlipComplete = () => {
    setIsFlipping(false);
  };

  const luxuryWatchEffect = {
    background: `
      linear-gradient(
        135deg,
        rgba(218, 165, 32, 0.1) 0%,
        rgba(255, 215, 0, 0.2) 25%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(218, 165, 32, 0.2) 75%,
        rgba(0, 0, 0, 0.1) 100%
      ),
      radial-gradient(
        circle at 50% 50%,
        rgba(255, 215, 0, 0.15) 0%,
        rgba(0, 0, 0, 0.2) 100%
      )
    `,
    boxShadow: `
      0 0 40px rgba(218, 165, 32, 0.2),
      inset 0 0 30px rgba(255, 215, 0, 0.1),
      0 0 20px rgba(255, 255, 255, 0.1)
    `,
    backdropFilter: 'blur(8px)',
  };

  return (
    <div className="relative">
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/tick-tock.wav" type="audio/wav" />
      </audio>
      
      <motion.div 
        className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD700] z-[100]"
        animate={{
          opacity: isHovered ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="absolute top-[20%] left-1/2 origin-bottom w-0.5 h-[150px] bg-gradient-to-b from-[#FFD700] to-[#DAA520]"
        style={{
          transformOrigin: '50% 0%',
          boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
          zIndex: 99
        }}
        animate={{
          opacity: isHovered ? 0 : 1,
          rotate: rotation
        }}
        transition={{ 
          opacity: { duration: 0.3 },
          rotate: { duration: 0.05, ease: "linear" }
        }}
      />
      
      <motion.div
        className="absolute top-[20%] left-1/2 origin-bottom w-1 h-[110px] bg-gradient-to-b from-[#FFD700] to-[#DAA520]"
        style={{
          transformOrigin: '50% 0%',
          boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
          zIndex: 98
        }}
        animate={{
          opacity: isHovered ? 0 : 1,
          rotate: rotation * 0.5
        }}
        transition={{ 
          opacity: { duration: 0.3 },
          rotate: { duration: 0.05, ease: "linear" }
        }}
      />

      <motion.div
        className="relative w-[400px] h-[500px] cursor-pointer select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '2000px' }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            rotateY: isHovered ? 180 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
          onAnimationComplete={handleFlipComplete}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Face - Watch Design */}
          <motion.div
            className="absolute inset-0 rounded-[50%] flex items-center justify-center"
            style={{
              ...luxuryWatchEffect,
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Strati di profondità del quadrante */}
            {[40, 30, 20, 10, 0].map((depth, index) => (
              <motion.div
                key={depth}
                className="absolute inset-0 rounded-full"
                style={{
                  ...luxuryWatchEffect,
                  transform: `translateZ(${depth}px)`,
                  opacity: 1 - (index * 0.15),
                  border: index === 0 ? '2px solid rgba(255, 215, 0, 0.3)' : 'none'
                }}
              />
            ))}

            {/* Quadrante principale */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(30,30,30,0.95))',
                transform: 'translateZ(45px)',
                border: '3px solid rgba(218, 165, 32, 0.5)',
              }}
            >
              {/* Indici delle ore */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: '2px',
                    height: '12px',
                    background: 'linear-gradient(to bottom, #FFD700, #DAA520)',
                    top: '10%',
                    left: '50%',
                    transform: `
                      rotate(${i * 30}deg) 
                      translateY(-120px)
                      translateZ(2px)
                    `,
                    boxShadow: '0 0 5px rgba(255, 215, 0, 0.5)'
                  }}
                />
              ))}
            </motion.div>

            {/* Logo Container con effetto fluttuante */}
            <motion.div
              className="relative z-10"
              style={{ transform: 'translateZ(60px)' }}
              animate={{
                scale: isHovered ? [1, 1.2, 0] : 1,
                opacity: isHovered ? [1, 1, 0] : 1,
              }}
              transition={{
                duration: 1.5,
                times: [0, 0.6, 1],
                ease: "easeInOut"
              }}
            >
              {/* Logo principale "TDC" */}
              <motion.div 
                className="flex flex-col items-center"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(218, 165, 32, 0.3))'
                }}
              >
                <motion.h1 
                  className="text-5xl font-serif tracking-wider"
                  style={{
                    color: '#DAA520',
                    background: `linear-gradient(
                      to bottom,
                      #FFD700 0%,
                      #DAA520 50%,
                      #B8860B 100%
                    )`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: "'Cinzel', 'Trajan Pro', 'Times New Roman', serif",
                    textShadow: '0 0 20px rgba(218, 165, 32, 0.2)'
                  }}
                >
                  TDC
                </motion.h1>
                
                {/* Sottotitolo "THE DUKE'S CHRONO" */}
                <motion.div 
                  className="text-sm tracking-[0.3em] mt-2"
                  style={{
                    color: '#DAA520',
                    fontFamily: "'Cinzel', 'Trajan Pro', 'Times New Roman', serif",
                    letterSpacing: '0.3em',
                    opacity: 0.9,
                    textShadow: '0 0 10px rgba(218, 165, 32, 0.2)'
                  }}
                >
                  THE DUKE'S CHRONO
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Back Face */}
          <motion.div
            className="absolute inset-0 rounded-[50%] overflow-hidden"
            style={{
              ...luxuryWatchEffect,
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              background: 'rgba(0, 0, 0, 0.9)',
              border: '3px solid rgba(218, 165, 32, 0.5)',
            }}
          >
            <div className="relative w-full h-full p-8">
              <Image
                src="/images/watches/eduorologi1.svg"
                alt="Luxury Watch"
                width={400}
                height={400}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WatchCard;