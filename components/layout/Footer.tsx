'use client';

import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in-up">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Your Place</span>
            </div>
            <p className="text-gray-300 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="tel:+201155482312"
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105"
              >
                <Phone className="h-4 w-4" />
                <span>+201155482312</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  {t('nav.products')}
                </a>
              </li>
              <li>
                <a href="/products?category=covers" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  {t('categories.phoneCases')}
                </a>
              </li>
              <li>
                <a href="/products?category=chargers" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  {t('categories.chargers')}
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  {t('nav.services')}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">استبدال الشاشة</li>
              <li className="text-gray-300">استبدال البطارية</li>
              <li className="text-gray-300">إصلاح ضرر الماء</li>
              <li className="text-gray-300">مشاكل البرامج</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contactUs')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">شارع المستودع قبل مجلس فزارة</span>
              </div>
              <div className="flex items-center space-x-3">
                {/* <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">info@makanak.com</span> */}
              </div>
              <a
                href="https://wa.me/201155482312"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-green-400 hover:text-green-300 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="h-5 w-5 flex-shrink-0" />
                <span>{t('contact.whatsapp')}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Your Place. {t('footer.allRights')}
          </p>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="bg-gray-900 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-semibold text-white mb-4 text-center">{t('footer.visitStore')}</h3>
          <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                شارع المستودع قبل مجلس فزارة
              </p>
              <a
                href="https://maps.app.goo.gl/YKDDCteYsfHS8jcm9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <MapPin className="h-5 w-5" />
                <span>عرض الموقع على الخريطة</span>
              </a>
            </div>
          </div>
          <p className="text-gray-500 text-sm text-center mt-4">
            Made by Eng. Ramadan Mohamed Kamel
          </p>
        </div>
      </div>
    </footer>
  );
}
