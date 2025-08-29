import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB, { Product, IProduct } from '@/lib/database';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductActionButtons from '@/components/ui/ProductActionButtons';
import { ArrowLeft } from 'lucide-react';

async function getProduct(id: string): Promise<IProduct | null> {
  await connectDB();
  // Check if the id is a valid ObjectId to prevent errors
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return null;
  }
  const product = await Product.findById(id).lean();
  if (!product) {
    return null;
  }
  // lean() returns a plain JS object, but we still need to serialize it for the client component
  return JSON.parse(JSON.stringify(product));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image || '/placeholder.png'} // Fallback image
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="space-y-6">
            <ProductActionButtons product={product} />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}