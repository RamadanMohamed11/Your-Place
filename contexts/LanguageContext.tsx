'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectLanguage, getTranslation } from '@/lib/i18n';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }
  }, [mounted]);

  const t = (key: string) => getTranslation(key, 'ar');
  const isRTL = true;

  // This function now does nothing, as the language is fixed.
  const setLanguage = (lang: string) => {};

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <LanguageContext.Provider value={{ language: 'ar', setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}