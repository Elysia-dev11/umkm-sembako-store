'use client';

import { ShoppingBag, Truck, Shield, Clock } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';

// Mock products data - will be replaced with API call
const mockProducts = [
  { id: '1', name: 'Beras Premium 5kg', description: 'Beras premium kualitas terbaik', price: 75000, stock: 50, category: 'Beras', imageUrl: 'https://images.unsplash.com/photo-1586201375761-838e01a08c5a?w=400' },
  { id: '2', name: 'Minyak Goreng 2L', description: 'Minyak goreng sawit berkualitas', price: 32000, stock: 100, category: 'Minyak', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
  { id: '3', name: 'Gula Pasir 1kg', description: 'Gula pasir putih bersih', price: 15000, stock: 80, category: 'Gula', imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a8deb7120?w=400' },
  { id: '4', name: 'Telur Ayam 1 Rak', description: 'Telur ayam segar 30 butir', price: 45000, stock: 25, category: 'Telur', imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400' },
  { id: '5', name: 'Tepung Terigu 1kg', description: 'Tepung terigu serbaguna', price: 12000, stock: 60, category: 'Tepung', imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
  { id: '6', name: 'Kecap Manis 500ml', description: 'Kecap manis cap kaki tiga', price: 18000, stock: 45, category: 'Bumbu', imageUrl: 'https://images.unsplash.com/photo-1585672840523-5f0b1a4ee7d3?w=400' },
  { id: '7', name: 'Mie Instan Box', description: 'Mie instan 1 box (40 pcs)', price: 85000, stock: 30, category: 'Mie', imageUrl: 'https://images.unsplash.com/photo-1612929633737-549c6255a8da?w=400' },
  { id: '8', name: 'Sabun Mandi 3pcs', description: 'Sabun mandi keluarga', price: 25000, stock: 55, category: 'Toiletries', imageUrl: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=400' },
];

const categories = [
  { name: 'Beras', icon: '🍚', count: 15 },
  { name: 'Minyak', icon: '🫒', count: 8 },
  { name: 'Gula', icon: '🧂', count: 10 },
  { name: 'Telur', icon: '🥚', count: 5 },
  { name: 'Tepung', icon: '🌾', count: 12 },
  { name: 'Bumbu', icon: '🫚', count: 20 },
];

export default function Home() {
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
                {mockProducts.slice(0, 6).map((product) => (
                  <div key={product.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-4xl mb-2">
                      {product.category === 'Beras' ? '🍚' : 
                       product.category === 'Minyak' ? '🫒' : 
                       product.category === 'Gula' ? '🧂' : 
                       product.category === 'Telur' ? '🥚' : '📦'}
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

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategori Produk</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link 
                key={cat.name}
                href={`/products?category=${cat.name.toLowerCase()}`}
                className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="font-medium text-gray-900">{cat.name}</p>
                <p className="text-sm text-gray-500">{cat.count} produk</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Produk Populer</h2>
            <Link href="/products" className="text-primary hover:text-primary-dark font-medium">
              Lihat Semua
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
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
