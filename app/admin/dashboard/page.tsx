'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { Package, Wrench } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    }
  }, [router]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">إجراءات سريعة</h1>
          <p className="text-gray-300">أضف منتجات وخدمات جديدة من هنا.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <button
            onClick={() => router.push('/admin/products/new')}
            className="p-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center justify-center text-center shadow-md"
          >
            <Package className="h-10 w-10 mb-3 text-blue-400" />
            <span className="text-lg font-semibold">إضافة منتج</span>
          </button>
          <button
            onClick={() => router.push('/admin/services/new')}
            className="p-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center justify-center text-center shadow-md"
          >
            <Wrench className="h-10 w-10 mb-3 text-green-400" />
            <span className="text-lg font-semibold">إضافة خدمة</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
