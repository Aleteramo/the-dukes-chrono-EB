// src/components/providers/smooth-scroll.tsx
'use client';

import { useEffect, type ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement;
      const originalScrollBehavior = htmlElement.style.scrollBehavior; // Store original value

      htmlElement.style.scrollBehavior = 'smooth';

      return () => {
        htmlElement.style.scrollBehavior = originalScrollBehavior; // Restore original value
      };
    }
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;