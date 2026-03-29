'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div className="card overflow-hidden group">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={product.imageUrl || '/placeholder-product.png'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.stock < 10 && product.stock > 0 && (
            <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
              Stok Terbatas
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-2 left-2 bg-error text-white text-xs font-semibold px-2 py-1 rounded">
              Habis
            </span>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Eye size={20} />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2 truncate">{product.category}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
