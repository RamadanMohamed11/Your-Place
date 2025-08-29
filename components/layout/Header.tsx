'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const { t, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim()) {
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      } else if (pathname === '/products' && !searchQuery.trim()) {
        router.push('/products');
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, router, pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Your Place</span>
          </Link>

          {/* Centered Navigation and Search */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
            <nav className="flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105">
                {t('nav.home')}
              </Link>
              <Link href="/products" className="text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105">
                {t('nav.products')}
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105">
                {t('nav.services')}
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105">
                {t('nav.contact')}
              </Link>
            </nav>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.search') || 'Search...'}
                className={`w-64 px-4 py-2 ${isRTL ? 'pr-10' : 'pl-10'} bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              />
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500`} />
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+1234567890"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Phone className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span>{t('contact.call')}</span>
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <MessageCircle className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span>{t('contact.whatsapp')}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative mb-4 px-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.search') || 'Search...'}
                className={`w-full px-4 py-2 ${isRTL ? 'pr-10' : 'pl-10'} bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500`} />
            </div>
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">{t('nav.home')}</Link>
            <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">{t('nav.products')}</Link>
            <Link href="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">{t('nav.services')}</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">{t('nav.contact')}</Link>
            <div className="flex justify-center space-x-4 pt-4">
              <a
                href="tel:+1234567890"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Phone className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{t('contact.call')}</span>
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <MessageCircle className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{t('contact.whatsapp')}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}