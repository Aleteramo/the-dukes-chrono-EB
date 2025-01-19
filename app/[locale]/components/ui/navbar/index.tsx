"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Archive, User, Contact, LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  isActive: boolean
}

export default function NavBar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const [isMobile, setIsMobile] = useState(false);

  // Funzione per verificare se un URL è attivo
  const isActiveUrl = (url: string) => {
    const currentPath = pathname.split('/').slice(2).join('/');
    const itemPath = url.split('/').slice(2).join('/');
    return currentPath === itemPath;
  };

  const navItems: NavItem[] = [
    { 
      name: t('archive'), 
      url: `/${locale}/archive`, 
      icon: Archive,
      isActive: isActiveUrl(`/${locale}/archive`)
    },
    { 
      name: t('about'),
      url: `/${locale}/about`,
      icon: User,
      isActive: isActiveUrl(`/${locale}/about`)
    },
    { 
      name: t('contact'), 
      url: `/${locale}/contact`,
      icon: Contact,
      isActive: isActiveUrl(`/${locale}/contact`)
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6">
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-amber-600/80 hover:text-amber-500",
                item.isActive && "bg-amber-500/10 text-amber-500",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} className="text-amber-500" />
              </span>
              {item.isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-amber-500/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-amber-500 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-amber-500/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-amber-500/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-amber-500/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}