'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import type { Product } from '@/types';

const mockProducts: Product[] = [
  { id: '1', name: 'Beras Premium 5kg', description: 'Beras premium kualitas terbaik', price: 75000, stock: 50, category: 'Beras', imageUrl: 'https://images.unsplash.com/photo-1586201375761-838e01a08c5a?w=400' },
  { id: '2', name: 'Minyak Goreng 2L', description: 'Minyak goreng sawit berkualitas', price: 32000, stock: 100, category: 'Minyak', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
  { id: '3', name: 'Gula Pasir 1kg', description: 'Gula pasir putih bersih', price: 15000, stock: 80, category: 'Gula', imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a8deb7120?w=400' },
  { id: '4', name: 'Telur Ayam 1 Rak', description: 'Telur ayam segar 30 butir', price: 45000, stock: 25, category: 'Telur', imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400' },
  { id: '5', name: 'Tepung Terigu 1kg', description: 'Tepung terigu serbaguna', price: 12000, stock: 60, category: 'Tepung', imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
  { id: '6', name: 'Kecap Manis 500ml', description: 'Kecap manis cap kaki tiga', price: 18000, stock: 45, category: 'Bumbu', imageUrl: 'https://images.unsplash.com/photo-1585672840523-5f0b1a4ee7d3?w=400' },
  { id: '7', name: 'Mie Instan Box', description: 'Mie instan 1 box (40 pcs)', price: 85000, stock: 30, category: 'Mie', imageUrl: 'https://images.unsplash.com/photo-1612929633737-549c6255a8da?w=400' },
  { id: '8', name: 'Sabun Mandi 3pcs', description: 'Sabun mandi keluarga', price: 25000, stock: 55, category: 'Toiletries', imageUrl: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=400' },
  { id: '9', name: 'Beras Medium 10kg', description: 'Beras medium untuk keluarga', price: 120000, stock: 40, category: 'Beras', imageUrl: 'https://images.unsplash.com/photo-1586201375761-838e01a08c5a?w=400' },
  { id: '10', name: 'Gula Merah 500g', description: 'Gula merah asli', price: 12000, stock: 35, category: 'Gula', imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a8deb7120?w=400' },
  { id: '11', name: 'Minyak Kelapa 1L', description: 'Minyak kelapa murni', price: 28000, stock: 20, category: 'Minyak', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
  { id: '12', name: 'Tepung Beras 500g', description: 'Tepung beras untuk kue', price: 8000, stock: 45, category: 'Tepung', imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
];

const categories = ['Semua', 'Beras', 'Minyak', 'Gula', 'Telur', 'Tepung', 'Bumbu', 'Mie', 'Toiletries'];
const sortOptions = ['Terbaru', 'Harga Terendah', 'Harga Tertinggi', 'Nama A-Z'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('Terbaru');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'Semua') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'Harga Terendah':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Harga Tertinggi':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Nama A-Z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, sortBy, searchQuery, products]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Produk Kami</h1>
          <p className="text-gray-600 mt-2">Temukan kebutuhan sembako harian Anda</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort and View Toggle */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Tampilan:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Products Count */}
        <p className="text-sm text-gray-600 mb-4">
          Menampilkan {filteredProducts.length} produk
        </p>

        {/* Products Grid/List */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
            : 'flex flex-col gap-4'
          }>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada produk ditemukan</p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-4 text-primary hover:text-primary-dark"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
