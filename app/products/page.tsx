import Link from 'next/link';
import connectDB, { Product, IProduct } from '@/lib/database';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { Filter } from 'lucide-react';

// Helper function to fetch products from the database
async function getProducts(category?: string, search?: string): Promise<IProduct[]> {
  await connectDB();
  const query: any = {};
  if (category) {
    query.category = category;
  }
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  const products = await Product.find(query).lean();
  return JSON.parse(JSON.stringify(products));
}

const categories = [
  { value: '', label: 'كل الفئات' },
  { value: 'covers', label: 'كفرات وجرابات' },
  { value: 'chargers', label: 'شواحن' },
  { value: 'glass', label: 'حماية الشاشة' },
  { value: 'earphones', label: 'سماعات' },
  { value: 'cables', label: 'وصلات' },
  { value: 'other', label: 'أخرى' },
];

// Main page component (Server Component)
export default async function ProductsPage({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  const selectedCategory = searchParams.category || '';
  const searchQuery = searchParams.search || '';
  const products = await getProducts(selectedCategory, searchQuery);

  return (
    <div className="min-h-screen bg-gray-900 text-white" dir="rtl">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">منتجاتنا</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            تصفح مجموعتنا الواسعة من اكسسوارات الموبايل المتميزة
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64">
            <div className="bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-white mb-4">تصفية حسب الفئة</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.value}
                    href={`/products?category=${category.value}`}
                    className={`flex items-center p-2 rounded-md ${selectedCategory === category.value ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                تم العثور على {products.length} منتج
                {selectedCategory && ` في ${categories.find(c => c.value === selectedCategory)?.label}`}
                {searchQuery && ` لـ "${searchQuery}"`}
              </p>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id as string} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">لم يتم العثور على منتجات</p>
                <Link
                  href="/products"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  مسح الفلاتر
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
