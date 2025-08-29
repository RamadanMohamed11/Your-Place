'use client';

import { useState } from 'react';
import { Heart, Share2, MessageCircle, Phone } from 'lucide-react';
import { IProduct } from '@/lib/database';

interface ProductActionButtonsProps {
  product: IProduct;
}

export default function ProductActionButtons({ product }: ProductActionButtonsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${product.name} priced at $${product.price}. Can you tell me more about it?`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`; // Replace with your number
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+1234567890'; // Replace with your number
  };

  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            {product.name}
          </h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2 rounded-full ${
              isWishlisted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
            } hover:bg-red-100 hover:text-red-600 transition-colors`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="text-3xl font-bold text-blue-600 mb-4">
        ${product.price.toFixed(2)}
      </div>

      <div className="space-y-4 pt-6 border-t mt-6">
        <h3 className="text-lg font-semibold text-gray-900">Interested in this product?</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp Us
          </button>
          <button
            onClick={handleCall}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Now
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center">
          Contact us for availability, bulk orders, or any questions
        </p>
      </div>
    </>
  );
}
