'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/lib/supabase';
import type { Product } from '@/types';

const categories = ['Semua', 'beras', 'minyak', 'gula', 'telur', 'tepung', 'bumbu', 'mie', 'toiletries'];
const sortOptions = ['Terbaru', 'Harga Terendah', 'Harga Tertinggi', 'Nama A-Z'];

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('Terbaru');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await products.getAll();
        // Map Supabase data to Product type
        const mappedProducts: Product[] = (data || []).map((p: any) => ({
          id: String(p.id),
          name: p.name,
          description: p.description || '',
          price: Number(p.price),
          stock: p.stock || 0,
          category: p.category,
          imageUrl: p.image || '/images/placeholder.svg',
        }));
        setAllProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Gagal memuat produk. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...allProducts];

    // Filter by category
    if (selectedCategory !== 'Semua') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter(
        p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
  }, [selectedCategory, sortBy, searchQuery, allProducts]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Produk Kami</h1>
          <p className="text-gray-600 mt-2">Temukan kebutuhan sembako harian Anda</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

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
                  {cat === 'Semua' ? cat : cat.charAt(0).toUpperCase() + cat.slice(1)}
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
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && !isLoading && (
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