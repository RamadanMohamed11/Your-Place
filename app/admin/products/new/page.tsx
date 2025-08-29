"use client";
import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';



const AddProductPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const staticCategories = [
    'كافر هواتف',
    'جرابات هواتف',
    'شواحن',
    'حماية الشاشة',
    'سماعات',
    'باور بانك',
    'كابلات',
    'أخرى'
  ];
  const [category, setCategory] = useState(staticCategories[0]);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('الرجاء تحديد صورة لتحميلها.');
      return;
    }

    setUploading(true);

    // 1. Upload image to Cloudinary
    const formData = new FormData();
    formData.append('file', imageFile);

    let imageUrl = '';
    try {
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error('فشل تحميل الصورة');
      }

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    } catch (error) {
      console.error('Failed to upload image', error);
      alert('حدث خطأ أثناء تحميل الصورة.');
      setUploading(false);
      return;
    }

    // 2. Create product with the image URL
    const productData = {
      name,
      price: parseFloat(price),
      category,
      description,
      image: imageUrl,
      quantity: parseInt(quantity, 10),
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        alert('تمت إضافة المنتج بنجاح!');
        router.push('/admin/products');
      } else {
        const data = await res.json();
        alert(`خطأ في إضافة المنتج: ${data.message}` || 'خطأ غير معروف');
      }
    } catch (error) {
      console.error('Failed to add product', error);
      alert('حدث خطأ أثناء إضافة المنتج.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">إضافة منتج جديد</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-gray-800 p-6 rounded-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">اسم المنتج</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-300">السعر (بالجنيه المصري)</label>
          <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-300">الكمية</label>
          <input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">الفئة</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500">
              {staticCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">الوصف</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-300">صورة المنتج</label>
          <input id="image" type="file" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 file:ml-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
        </div>
        <button type="submit" disabled={uploading} className="w-full bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-500">
          {uploading ? 'جارٍ التحميل...' : 'إضافة منتج'}
        </button>
      </form>
    </AdminLayout>
  );
};

export default AddProductPage;
