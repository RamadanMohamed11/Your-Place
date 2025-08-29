'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { ArrowRight, Shield, Wrench, Star, Clock, Smartphone, Battery, Volume2, Mic, FileSearch, ToggleRight, Terminal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IProduct } from '@/lib/database';

const categories = [
  { name: 'كافر هواتف', icon: '📱', href: '/products?category=covers' },
  { name: 'جرابات هواتف', icon: '📱', href: '/products?category=cases' },
  { name: 'شواحن', icon: '🔌', href: '/products?category=chargers' },
  { name: 'حماية الشاشة', icon: '🛡️', href: '/products?category=glass' },
  { name: 'سماعات', icon: '🎧', href: '/products?category=earphones' },
  { name: 'باور بانك', icon: '🔋', href: '/products?category=powerbanks' },
  { name: 'كابلات', icon: '🔗', href: '/products?category=cables' },
  { name: 'أخرى', icon: '📦', href: '/products?category=other' }
];

const repairServices = [
  { name: 'استبدال الشاشة', icon: Smartphone },
  { name: 'استبدال البطارية', icon: Battery },
  { name: 'إصلاح ضرر الماء', icon: Shield },
  { name: 'مشاكل البرامج', icon: Wrench },
  { name: 'إصلاح منفذ الشحن', icon: Smartphone },
  { name: 'إصلاح الكاميرا', icon: Shield },
  { name: 'إصلاح السماعة', icon: Volume2 },
  { name: 'إصلاح الميكروفون', icon: Mic },
  { name: 'استبدال الغطاء الخلفي', icon: Smartphone },
  { name: 'فحص وتشخيص', icon: FileSearch },
  { name: 'إصلاح أزرار الهاتف', icon: ToggleRight },
  { name: 'خدمات السوفت وير', icon: Terminal }
];

export default function HomePageClient({ featuredProducts }: { featuredProducts: IProduct[] }) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-fade-in-up">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in-left">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-in-right animate-stagger-1">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-stagger-2">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {t('hero.viewProducts')}
                <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {t('hero.repairServices')}
                <Wrench className="mr-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
            <div className="text-center animate-stagger-1 opacity-0 animate-fade-in-up">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-blue-600/30 transition-all duration-300 hover:scale-110">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{t('features.qualityTitle')}</h3>
              <p className="text-gray-400">{t('features.qualityDesc')}</p>
            </div>
            <div className="text-center animate-stagger-2 opacity-0 animate-fade-in-up">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-green-600/30 transition-all duration-300 hover:scale-110">
                <Wrench className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{t('features.expertTitle')}</h3>
              <p className="text-gray-400">{t('features.expertDesc')}</p>
            </div>
            <div className="text-center animate-stagger-3 opacity-0 animate-fade-in-up">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-purple-600/30 transition-all duration-300 hover:scale-110">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{t('features.fastTitle')}</h3>
              <p className="text-gray-400">{t('features.fastDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-4">{t('products.featured')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('products.featuredDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id as string} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {t('products.viewAll')}
              <ArrowRight className="mr-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-4">{t('products.shopByCategory')}</h2>
            <p className="text-gray-400">{t('products.categoryDesc')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-fade-in-up">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group p-6 bg-gray-700 rounded-lg hover:bg-gray-600 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-600"
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Services */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">{t('services.professional')}</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {t('services.professionalDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up">
            {repairServices.map((service) => (
              <div key={service.name} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700">
                <service.icon className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {t('services.viewAll')}
              <ArrowRight className="mr-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
