export interface Translation {
  [key: string]: string | Translation;
}

export const translations: { [key: string]: Translation } = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      services: 'Repair Services',
      contact: 'Contact'
    },
    hero: {
      title: 'Your Mobile, Our Expertise',
      subtitle: 'Premium mobile accessories and professional repair services. Quality products, expert repairs, unbeatable prices.',
      viewProducts: 'View Products',
      repairServices: 'Repair Services'
    },
    features: {
      qualityTitle: 'Quality Guaranteed',
      qualityDesc: 'All products come with warranty and quality assurance',
      expertTitle: 'Expert Repairs',
      expertDesc: 'Professional technicians with years of experience',
      fastTitle: 'Fast Service',
      fastDesc: 'Quick repairs and same-day service available'
    },
    products: {
      featured: 'Featured Products',
      featuredDesc: 'Discover our best-selling mobile accessories with premium quality and competitive prices',
      viewAll: 'View All Products',
      shopByCategory: 'Shop by Category',
      categoryDesc: 'Find exactly what you\'re looking for'
    },
    services: {
      professional: 'Professional Repair Services',
      professionalDesc: 'Expert technicians ready to fix your mobile devices quickly and affordably',
      bookRepair: 'Book a Repair'
    },
    contact: {
      call: 'Call',
      whatsapp: 'WhatsApp Us',
      phone: 'Phone',
      preferContact: 'Prefer to contact us directly?'
    },
    footer: {
      description: 'Your trusted mobile accessories and repair service provider. Quality products and expert repairs.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contactUs: 'Contact Us',
      visitStore: 'Visit Our Store',
      allRights: 'All rights reserved. Built with passion for mobile technology.'
    },
    categories: {
      phoneCases: 'Phone Cases',
      chargers: 'Chargers',
      screenProtectors: 'Screen Protectors',
      earphones: 'Earphones',
      powerBanks: 'Power Banks',
      cables: 'Cables'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      products: 'المنتجات',
      services: 'خدمات الإصلاح',
      contact: 'اتصل بنا'
    },
    hero: {
      title: 'هاتفك، خبرتنا',
      subtitle: 'إكسسوارات الهاتف المحمول المتميزة وخدمات الإصلاح المهنية. منتجات عالية الجودة، إصلاحات خبيرة، أسعار لا تُقاوم.',
      viewProducts: 'عرض المنتجات',
      repairServices: 'خدمات الإصلاح'
    },
    features: {
      qualityTitle: 'جودة مضمونة',
      qualityDesc: 'جميع المنتجات مضمونة الجودة',
      expertTitle: 'إصلاحات خبيرة',
      expertDesc: 'فنيون محترفون بسنوات من الخبرة',
      fastTitle: 'خدمة سريعة',
      fastDesc: 'إصلاحات سريعة وخدمة في نفس اليوم متاحة'
    },
    products: {
      featured: 'المنتجات المميزة',
      featuredDesc: 'اكتشف إكسسوارات الهاتف المحمول الأكثر مبيعاً بجودة متميزة وأسعار تنافسية',
      viewAll: 'عرض جميع المنتجات',
      shopByCategory: 'تسوق حسب الفئة',
      categoryDesc: 'اعثر على ما تبحث عنه بالضبط'
    },
    services: {
      professional: 'خدمات الإصلاح المهنية',
      professionalDesc: 'فنيون خبراء مستعدون لإصلاح أجهزتك المحمولة بسرعة وبأسعار معقولة',
      bookRepair: 'احجز إصلاح'
    },
    contact: {
      call: 'اتصل',
      whatsapp: 'واتساب',
      phone: 'الهاتف',
      preferContact: 'تفضل التواصل معنا مباشرة؟'
    },
    footer: {
      description: 'مزود إكسسوارات الهاتف المحمول وخدمات الإصلاح الموثوق به. منتجات عالية الجودة وإصلاحات خبيرة.',
      quickLinks: 'روابط سريعة',
      services: 'الخدمات',
      contactUs: 'اتصل بنا',
      visitStore: 'زر متجرنا',
      allRights: 'جميع الحقوق محفوظة. مبني بشغف لتكنولوجيا الهاتف المحمول.'
    },
    categories: {
      phoneCases: 'أغطية الهاتف',
      chargers: 'الشواحن',
      screenProtectors: 'واقيات الشاشة',
      earphones: 'سماعات الأذن',
      powerBanks: 'بنوك الطاقة',
      cables: 'الكابلات'
    }
  }
};

export function getTranslation(key: string, lang: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export function detectLanguage(): string {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ar')) {
      return 'ar';
    }
  }
  return 'en';
}