"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Instagram } from "lucide-react"

interface Social {
  name: string
  image: string
  link?: string
}

export type SocialLinksProps = React.HTMLAttributes<HTMLDivElement> & {
  socials: Social[]
}

const socialIcons = {
  'Instagram': Instagram,
  'TikTok': () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className="w-8 h-8 fill-current text-gold/80"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  'Vinted': () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className="w-8 h-8"
  >
    <defs>
      <linearGradient id={`vintedGradient-${Math.random()}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6BC5A5"/>
        <stop offset="100%" stopColor="#4A90E2"/>
      </linearGradient>
    </defs>
    <circle fill={`url(#vintedGradient-${Math.random()})`} cx="12" cy="12" r="12"/>
    <path 
      d="M7 6.5c0 0 2.5 7.5 5 11.5 2.5-4 5-11.5 5-11.5 0 0 0.5-1-0.5-1s-1.5 0.5-2 2c-0.5 1.5-2.5 7-2.5 7s-2-5.5-2.5-7c-0.5-1.5-1-2-2-2s-0.5 1-0.5 1z"
      fill="white"
      stroke="white"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
}

export function SocialLinks({ socials, className, ...props }: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null)
  const [clickedSocial, setClickedSocial] = React.useState<string | null>(null)

  const handleSocialClick = (social: Social) => {
    setClickedSocial(social.name)
    setTimeout(() => setClickedSocial(null), 300)
    
    if (social.link) {
      window.open(social.link, '_blank', 'noopener,noreferrer')
    }
  }

  const socialVariants = {
    initial: { 
      scale: 1, 
      rotate: 0,
      filter: "brightness(100%)"
    },
    hover: { 
      scale: 1.1, 
      rotate: [-5, 5, -5],
      filter: "brightness(120%)"
    },
    click: { 
      scale: 0.9, 
      rotate: 0,
      filter: "brightness(80%)"
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 w-full", 
        className
      )}
      {...props}
    >
      {socials.map((social, index) => {
        const IconComponent = socialIcons[social.name as keyof typeof socialIcons] || (() => null)
        
        return (
          <motion.div
            key={index}
            className="relative flex flex-col items-center justify-center"
            initial="initial"
            whileHover="hover"
            animate={
              clickedSocial === social.name 
                ? "click" 
                : hoveredSocial === social.name 
                  ? "hover" 
                  : "initial"
            }
            variants={socialVariants}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 10 
            }}
            onHoverStart={() => setHoveredSocial(social.name)}
            onHoverEnd={() => setHoveredSocial(null)}
            onClick={() => handleSocialClick(social)}
          >
            <div className="cursor-pointer w-10 h-10 flex items-center justify-center">
              {social.image && social.image.includes('.svg') ? (
                <Image
                  src={social.image}
                  alt={social.name}
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                  onError={(e) => console.error(`Image load error for ${social.name}:`, e)}
                />
              ) : (
                <IconComponent 
                  className="w-8 h-8 text-gold/80 hover:text-gold transition-colors"
                />
              )}
            </div>
            <AnimatePresence>
              {hoveredSocial === social.name && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -bottom-5 text-[10px] text-gold/80 font-medium tracking-wider"
                >
                  {social.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}