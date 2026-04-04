'use client';

import { ShoppingBag, Truck, Shield, Clock } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { products } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import type { Product } from '@/types';

const categoryIcons: Record<string, string> = {
  beras: '🍚',
  minyak: '🫒',
  gula: '🧂',
  telur: '🥚',
  tepung: '🌾',
  bumbu: '🫚',
  mie: '🍜',
  toiletries: '🧼',
};

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await products.getAll();
        const mappedProducts: Product[] = (data || []).map((p: any) => ({
          id: String(p.id),
          name: p.name,
          description: p.description || '',
          price: Number(p.price),
          stock: p.stock || 0,
          category: p.category,
          imageUrl: p.image || 'https://images.unsplash.com/photo-1586201375761-838e01a08c5a?w=400',
        }));
        setAllProducts(mappedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Calculate category counts from actual data
  const categoryCounts = allProducts.reduce((acc, p) => {
    const cat = p.category?.toLowerCase() || 'other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = [
    { name: 'Beras', slug: 'beras' },
    { name: 'Minyak', slug: 'minyak' },
    { name: 'Gula', slug: 'gula' },
    { name: 'Telur', slug: 'telur' },
    { name: 'Tepung', slug: 'tepung' },
    { name: 'Bumbu', slug: 'bumbu' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Belanja Sembako Mudah & Terpercaya
              </h1>
              <p className="text-lg text-green-100 mb-8">
                Kebutuhan pokok harian Anda dalam satu tempat. Kualitas terjamin, harga terjangkau.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded-full transition-colors">
                  Belanja Sekarang
                </Link>
                <Link href="/about" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full transition-colors">
                  Tentang Kami
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-4">
                {allProducts.slice(0, 6).map((product) => (
                  <div key={product.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">
                      {categoryIcons[product.category?.toLowerCase() || ''] || '📦'}
                    </div>
                    <p className="text-sm font-medium">{product.name.split(' ')[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 rounded-full p-3 mb-3">
                <ShoppingBag className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">Produk Segar</h3>
              <p className="text-sm text-gray-500">Kualitas terjamin</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 rounded-full p-3 mb-3">
                <Truck className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">Pengiriman Cepat</h3>
              <p className="text-sm text-gray-500">Same day delivery</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 rounded-full p-3 mb-3">
                <Shield className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">Transaksi Aman</h3>
              <p className="text-sm text-gray-500">Pembayaran terpercaya</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 rounded-full p-3 mb-3">
                <Clock className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">Buka 24 Jam</h3>
              <p className="text-sm text-gray-500">Layanan non-stop</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Dynamic from DB */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategori Produk</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link 
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{categoryIcons[cat.slug] || '📦'}</div>
                <p className="font-medium text-gray-900">{cat.name}</p>
                <p className="text-sm text-gray-500">{categoryCounts[cat.slug] || 0} produk</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - From DB */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Produk Populer</h2>
            <Link href="/products" className="text-primary hover:text-primary-dark font-medium">
              Lihat Semua
            </Link>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton h-64 rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {allProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Belanja Kebutuhan Harian Anda Sekarang!
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Dapatkan produk sembako berkualitas dengan harga terjangkau. Pengiriman cepat langsung ke rumah Anda.
          </p>
          <Link 
            href="/products"
            className="inline-block bg-white text-secondary hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-colors"
          >
            Mulai Belanja
          </Link>
        </div>
      </section>
    </div>
  );
}