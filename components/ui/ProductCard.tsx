'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';

import { IProduct } from '@/lib/database';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700 group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          )}
          <Image
            src={product.image || '/placeholder.png'}
            alt={product.name}
            fill
            className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <div className="mb-2">
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              {product.category}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description || 'No description available.'}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <Link
              href={`/products/${product._id}`}
              className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              View Details
            </Link>
            <a
              href={`https://wa.me/1234567890?text=Hi! I'm interested in ${encodeURIComponent(product.name)} priced at $${product.price}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}