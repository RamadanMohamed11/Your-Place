import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = {
  title: 'لوحة التحكم | إضافة خدمة جديدة',
};

export default function NewServicePage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-white">إضافة خدمة جديدة</h1>
      <p className="text-gray-300">سيكون هنا نموذج لإضافة خدمة جديدة.</p>
    </AdminLayout>
  );
}
