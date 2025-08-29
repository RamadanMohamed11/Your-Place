import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = {
  title: 'لوحة التحكم | الخدمات',
};

export default function ServicesPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-white">الخدمات</h1>
      <p className="text-gray-300">سيتم عرض قائمة بجميع الخدمات هنا.</p>
    </AdminLayout>
  );
}
