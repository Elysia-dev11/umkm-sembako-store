'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2 } from 'lucide-react';

const mockProduct = {
  id: '1',
  name: 'Beras Premium 5kg',
  description: 'Beras premium kualitas terbaik dari petani lokal. Beras ini dipilih langsung dari padi berkualitas tinggi, ditanam di sawah subur dengan sistem irigasi yang baik. Beras premium ini memiliki tekstur pulen dan wangi yang khas saat dimasak.',
  price: 75000,
  stock: 50,
  category: 'Beras',
  imageUrl: 'https://images.unsplash.com/photo-1586201375761-838e01a08c5a?w=600',
  expiryDate: '2026-06-30',
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const addItem = useCart((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = mockProduct;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem(product as any, quantity);
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft size={20} />
          Kembali ke Produk
        </Link>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {product.stock < 10 && product.stock > 0 && (
                <span className="absolute top-4 left-4 bg-secondary text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Stok Terbatas
                </span>
              )}
              {product.stock === 0 && (
                <span className="absolute top-4 left-4 bg-error text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Habis
                </span>
              )}
            </div>

            <div>
              <span className="text-primary font-medium">{product.category}</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
              
              <div className="mt-4">
                <span className="text-3xl font-bold text-primary">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                <span>Stok: {product.stock} unit</span>
                {product.expiryDate && (
                  <span>Kedaluwarsa: {new Date(product.expiryDate).toLocaleDateString('id-ID')}</span>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-16 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    Total:{' '}
                    <span className="font-bold text-primary">
                      Rp {(product.price * quantity).toLocaleString('id-ID')}
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Tambah ke Keranjang
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'bg-red-50 border-red-300 text-red-500'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
                <button className="p-3 rounded-lg border border-gray-300 text-gray-600 hover:border-gray-400 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
