'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300 border border-gray-700"
      title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
}