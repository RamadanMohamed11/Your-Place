"use client";
import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

const categories = [
  'كافر هواتف',
  'جرابات هواتف',
  'شواحن',
  'حماية الشاشة',
  'سماعات',
  'باور بانك',
  'كابلات',
  'أخرى'
];

interface ProductData {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const EditProductPage = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/products/${id}`);
          if (res.ok) {
            const data = await res.json();
            setProduct(data.product);
          } else {
            alert('فشل جلب تفاصيل المنتج.');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
        setLoading(false);
      };
      fetchProduct();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setUploading(true);
    let imageUrl = product.image;

    // 1. If a new image is selected, upload it
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      } catch (error) {
        console.error('Failed to upload new image', error);
        alert('حدث خطأ أثناء تحميل الصورة.');
        setUploading(false);
        return;
      }
    }

    // 2. Update product with new data (and potentially new image URL)
    const updatedProductData = {
      ...product,
      price: parseFloat(String(product.price)),
      image: imageUrl,
    };

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProductData),
      });

      if (res.ok) {
        alert('تم تحديث المنتج بنجاح!');
        router.push('/admin/products');
      } else {
        const data = await res.json();
        alert(`فشل تحديث المنتج: ${data.message}` || 'خطأ غير معروف');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('حدث خطأ أثناء تحديث المنتج.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <AdminLayout><div className="text-white p-6">جار التحميل...</div></AdminLayout>;
  }

  if (!product) {
    return <AdminLayout><div className="text-white p-6">لم يتم العثور على المنتج.</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-white">تعديل المنتج</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-gray-800 p-6 rounded-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">اسم المنتج</label>
          <input
            id="name"
            name="name"
            type="text"
            value={product.name}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-300">السعر</label>
          <input
            id="price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">الفئة</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">الوصف</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">الصورة الحالية</label>
          <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded mt-2 mb-4" />
          <label htmlFor="image" className="block text-sm font-medium text-gray-300">تحميل صورة جديدة (اختياري)</label>
          <input
            id="image"
            type="file"
            onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
            className="w-full text-white bg-gray-700 border border-gray-600 rounded-lg cursor-pointer file:bg-blue-600 file:text-white file:border-0 file:py-2 file:px-4 file:mr-4 hover:file:bg-blue-700"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:bg-gray-500"
        >
          {uploading ? 'جار التحديث...' : 'تحديث المنتج'}
        </button>
      </form>
    </AdminLayout>
  );
};

export default EditProductPage;
