"use client";
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminLayout from '@/components/admin/AdminLayout';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  image?: string;
}

interface SellHistory {
  _id: string;
  product: { name: string };
  quantitySold: number;
  priceAtSale: number;
  createdAt: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [history, setHistory] = useState<SellHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchHistory = async (date = '') => {
    try {
      let url = '/api/products?fetch=history';
      if (date) {
        url += `&date=${date}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history);
      } else {
        console.error('Failed to fetch sell history');
      }
    } catch (error) {
      console.error('Error fetching sell history:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchHistory(selectedDate)]);
      setLoading(false);
    };
    loadData();
  }, [selectedDate]);

  const handleSell = async (id: string) => {
    const quantityToSellStr = prompt('أدخل الكمية المباعة:', '1');
    if (!quantityToSellStr) return; // User cancelled

    const quantityToSell = parseInt(quantityToSellStr, 10);
    if (isNaN(quantityToSell) || quantityToSell <= 0) {
      alert('الرجاء إدخال كمية صالحة.');
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantityToSell }),
      });

      if (res.ok) {
        alert('تم بيع المنتج بنجاح!');
        fetchProducts(); // Refresh the list
        fetchHistory(); // Refresh the history
      } else {
        const data = await res.json();
        alert(`فشل بيع المنتج: ${data.message}`);
      }
    } catch (error) {
      console.error('Error selling product:', error);
      alert('حدث خطأ أثناء بيع المنتج.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          alert('تم حذف المنتج بنجاح!');
          fetchProducts(); // Refresh the list
        } else {
          alert('فشل حذف المنتج.');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('حدث خطأ أثناء حذف المنتج.');
      }
    }
  };

  const handleDeleteHistory = async (id: string) => {
    if (confirm('هل أنت متأكد أنك تريد حذف سجل المبيعات هذا؟')) {
      try {
        const res = await fetch(`/api/products?historyId=${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          alert('تم حذف سجل المبيعات بنجاح!');
          fetchHistory(); // Refresh the list
        } else {
          alert('فشل حذف سجل المبيعات.');
        }
      } catch (error) {
        console.error('Error deleting history record:', error);
        alert('حدث خطأ أثناء حذف سجل المبيعات.');
      }
    }
  };

  if (loading) {
    return <AdminLayout><div>جار التحميل...</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">المنتجات</h1>
        <div className="flex items-center space-x-4">
          <input type="text" placeholder="البحث عن منتجات..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
          <Link href="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors whitespace-nowrap">
            + إضافة منتج
          </Link>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <table className="w-full text-left text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-4">الصورة</th>
              <th className="p-4">الاسم</th>
              <th className="p-4">الفئة</th>
              <th className="p-4">السعر</th>
              <th className="p-4">الكمية</th>
              <th className="p-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((product) => (
              <tr key={product._id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="p-4">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  )}
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.price.toFixed(2)} EGP</td>
                <td className="p-4">{product.quantity ?? 0}</td>
                <td className="p-4 flex space-x-2">
                  <button onClick={() => handleSell(product._id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-sm">
                    بيع
                  </button>
                  <Link href={`/admin/products/${product._id}/edit`} className="text-yellow-400 hover:text-yellow-300">
                    تعديل
                  </Link>
                  <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-400">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">سجل المبيعات</h2>
        <div className="flex items-center space-x-4">
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <button 
            onClick={() => setSelectedDate('')} 
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            مسح
          </button>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <table className="w-full text-left text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-4">اسم المنتج</th>
              <th className="p-4">الكمية المباعة</th>
              <th className="p-4">السعر عند البيع</th>
              <th className="p-4">التاريخ</th>
              <th className="p-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="p-4">{item.product?.name || 'N/A'}</td>
                <td className="p-4">{item.quantitySold}</td>
                <td className="p-4">{item.priceAtSale.toFixed(2)} EGP</td>
                <td className="p-4">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="p-4">
                  <button onClick={() => handleDeleteHistory(item._id)} className="text-red-500 hover:text-red-400">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};



export default ProductsPage;
