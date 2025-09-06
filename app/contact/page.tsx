'use client';

import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            {t('contact.contactUs')}
          </h1>
          <p className="text-base md:text-xl text-gray-400 px-4">
            {t('contact.weAreHere')}
          </p>
        </div>

        {/* Four aligned containers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Phone Number */}
          <div className="bg-gray-800 rounded-lg shadow-md p-5 md:p-8 text-white border border-gray-700 min-h-[220px] flex flex-col">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/20 rounded-full flex items-center justify-center mr-2 md:mr-3 flex-shrink-0">
                <Phone className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white truncate">
                {t('contact.phone')}
              </h3>
            </div>
            <a
              href="tel:+201155482312"
              className="block p-4 md:p-6 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors flex-1"
            >
              <p className="text-lg md:text-xl font-medium text-white whitespace-nowrap">
                +201155482312
              </p>
              <p className="text-xs md:text-sm text-gray-400 mt-1 line-clamp-2">
                {t('contact.clickToCall')}
              </p>
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-gray-800 rounded-lg shadow-md p-5 md:p-8 text-white border border-gray-700 min-h-[220px] flex flex-col">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600/20 rounded-full flex items-center justify-center mr-2 md:mr-3 flex-shrink-0">
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white truncate">
                {t('contact.whatsapp')}
              </h3>
            </div>
            <a
              href="https://wa.me/201155482312"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 md:p-6 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors flex-1"
            >
              <p className="text-lg md:text-xl font-medium text-white whitespace-nowrap">
                +201155482312
              </p>
              <p className="text-xs md:text-sm text-gray-400 mt-1 line-clamp-2">
                {t('contact.clickToWhatsapp')}
              </p>
            </a>
          </div>

          {/* Working Hours */}
          <div className="bg-gray-800 rounded-lg shadow-md p-5 md:p-8 text-white border border-gray-700 min-h-[220px] flex flex-col">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600/20 rounded-full flex items-center justify-center mr-2 md:mr-3 flex-shrink-0">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white truncate">
                {t('contact.workingHours')}
              </h3>
            </div>
            <div className="p-4 md:p-6 bg-gray-700 rounded-lg border border-gray-600 flex-1 flex items-center justify-center">
              <div className="w-full">
                <p className="text-xs md:text-sm text-gray-400 mb-1 text-center">كل أيام الأسبوع</p>
                <p className="text-sm md:text-lg font-semibold text-purple-400 whitespace-nowrap">3:00 PM - 11:00 PM</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-800 rounded-lg shadow-md p-5 md:p-8 text-white border border-gray-700 min-h-[220px] flex flex-col">
            <h3 className="text-base md:text-lg font-semibold mb-3 text-white">لماذا تختارنا؟</h3>
            <ul className="space-y-1 md:space-y-2 text-gray-400 flex-1">
              <li className="flex items-center text-xs md:text-sm">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full mr-2 md:mr-3 flex-shrink-0"></span>
                <span className="truncate">فنيون محترفون</span>
              </li>
              <li className="flex items-center text-xs md:text-sm">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-600 rounded-full mr-2 md:mr-3 flex-shrink-0"></span>
                <span className="truncate">قطع غيار أصلية</span>
              </li>
              <li className="flex items-center text-xs md:text-sm">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-600 rounded-full mr-2 md:mr-3 flex-shrink-0"></span>
                <span className="truncate">خدمة سريعة</span>
              </li>
              <li className="flex items-center text-xs md:text-sm">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-600 rounded-full mr-2 md:mr-3 flex-shrink-0"></span>
                <span className="truncate">أسعار تنافسية</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Location Container - Full Width */}
        <div className="bg-gray-800 rounded-lg shadow-md p-4 md:p-6 text-white border border-gray-700">
          <div className="flex items-center mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600/20 rounded-full flex items-center justify-center mr-2 md:mr-3 flex-shrink-0">
              <MapPin className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white">
              {t('contact.location')}
            </h3>
          </div>
          <div className="p-4 md:p-6 bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-white mb-3 md:mb-4 text-base md:text-lg break-words">
              شارع المستودع قبل مجلس فزارة
            </p>
            <a
              href="https://maps.app.goo.gl/YKDDCteYsfHS8jcm9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
            >
              <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              <span className="truncate">{t('contact.viewOnMap')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
