'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Clock, CheckCircle, Phone, MessageCircle, Wrench, Shield, Smartphone, Battery, Volume2, Mic, FileSearch, ToggleRight, Terminal } from 'lucide-react';

const repairServices = [
  {
    id: 1,
    name: 'استبدال الشاشة',
    description: 'استبدال شاشات LCD/OLED احترافي لجميع ماركات الهواتف الذكية الرئيسية.',
    icon: Smartphone,
    features: ['قطع غيار بجودة أصلية', 'خدمة في نفس اليوم']
  },
  {
    id: 2,
    name: 'استبدال البطارية',
    description: 'استعد عمر بطارية هاتفك ببطاريات بديلة أصلية.',
    icon: Battery,
    features: ['بطاريات أصلية', 'خدمة سريعة']
  },
  {
    id: 3,
    name: 'إصلاح ضرر الماء',
    description: 'تقييم شامل وخدمة إصلاح لأضرار المياه.',
    icon: Shield,
    features: ['تنظيف عميق', 'استبدال المكونات']
  },
  {
    id: 4,
    name: 'مشاكل البرامج',
    description: 'إصلاح مشاكل البرامج والفيروسات ومشاكل الأداء.',
    icon: Wrench,
    features: ['الحفاظ على البيانات', 'إزالة الفيروسات', 'تحسين الأداء']
  },
  {
    id: 5,
    name: 'إصلاح منفذ الشحن',
    description: 'إصلاح منافذ وموصلات الشحن التالفة أو المكسورة.',
    icon: Smartphone,
    features: ['قطع غيار أصلية', 'تم اختبارها بدقة']
  },
  {
    id: 6,
    name: 'إصلاح الكاميرا',
    description: 'استبدال وإصلاح وحدة الكاميرا باحترافية.',
    icon: Shield,
    features: ['قطع غيار عالية الجودة', 'يشمل المعايرة', 'اختبار الجودة']
  },
  {
    id: 7,
    name: 'إصلاح السماعة',
    description: 'إصلاح أو استبدال سماعة الأذن أو السماعة الرئيسية.',
    icon: Volume2,
    features: ['صوت واضح ونقي', 'فحص شامل', 'قطع غيار موثوقة']
  },
  {
    id: 8,
    name: 'إصلاح الميكروفون',
    description: 'حل مشاكل عدم القدرة على تسجيل الصوت أو إجراء المكالمات.',
    icon: Mic,
    features: ['جودة صوت عالية', 'استبدال سريع']
  },
  {
    id: 9,
    name: 'استبدال الغطاء الخلفي',
    description: 'تغيير الغطاء الخلفي المكسور أو المخدوش ليعود كالجديد.',
    icon: Smartphone,
    features: ['مظهر جديد', 'حماية المكونات الداخلية', 'متوفر بألوان متعددة']
  },
  {
    id: 10,
    name: 'فحص وتشخيص',
    description: 'فحص شامل للجهاز لتحديد المشاكل غير المعروفة وتقديم تقرير.',
    icon: FileSearch,
    features: ['تشخيص دقيق', 'تقرير مفصل', 'توصيات للإصلاح']
  },
  {
    id: 11,
    name: 'إصلاح أزرار الهاتف',
    description: 'إصلاح أزرار الصوت، زر الطاقة، أو زر الرئيسية.',
    icon: ToggleRight,
    features: ['استجابة سريعة للأزرار', 'يعود كالجديد']
  },
  {
    id: 12,
    name: 'خدمات السوفت وير',
    description: 'تحديث نظام التشغيل، إزالة القفل، وحل مشاكل البرامج المعقدة.',
    icon: Terminal,
    features: ['أداء محسن', 'أحدث إصدارات النظام', 'آمن وموثوق']
  }
];

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deviceModel: '',
    problemDescription: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/repair-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          phone: '',
          deviceModel: '',
          problemDescription: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white" dir="rtl">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">خدمات الإصلاح</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            خدمات إصلاح احترافية للأجهزة المحمولة مع فنيين خبراء، وقطع غيار أصلية، وأوقات تسليم سريعة.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {repairServices.map((service) => (
            <div key={service.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-700">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                    <service.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                    
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">احجز خدمة إصلاح</h2>
              <p className="text-gray-300">
                املأ النموذج أدناه وسنعاود الاتصال بك في غضون ساعتين لتحديد موعد الإصلاح.
              </p>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">تم إرسال الطلب بنجاح!</h3>
                <p className="text-gray-300 mb-6">
                  لقد تلقينا طلب الإصلاح الخاص بك. سيتصل بك فريقنا في غضون ساعتين لتحديد موعدك.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  إرسال طلب آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="deviceModel" className="block text-sm font-medium text-gray-300 mb-2">
                      موديل الجهاز *
                    </label>
                  <input
                    type="text"
                    id="deviceModel"
                    name="deviceModel"
                    required
                    value={formData.deviceModel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., iPhone 15 Pro, Samsung Galaxy S24"
                  />
                </div>

                <div>
                  <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-300 mb-2">
                      وصف المشكلة *
                    </label>
                  <textarea
                    id="problemDescription"
                    name="problemDescription"
                    required
                    rows={4}
                    value={formData.problemDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe the issue with your device..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
                </button>
              </form>
            )}

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Prefer to contact us directly?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+201155482312"
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call: (234) 567-890
                </a>
                <a
                  href="https://wa.me/201155482312"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quick Turnaround</h3>
            <p className="text-gray-600">Most repairs completed within hours, not days</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Warranty Included</h3>
            <p className="text-gray-600">All repairs come with our quality guarantee</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expert Technicians</h3>
            <p className="text-gray-600">Certified professionals with years of experience</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}