'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { products as productsApi } from '@/lib/supabase';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showModal, setShowModal] = useState(false);

  const categories = ['Semua', 'beras', 'minyak', 'gula', 'telur', 'tepung', 'bumbu', 'mie', 'toiletries'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || product.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const getCategoryEmoji = (cat: string) => {
    const emojis: Record<string, string> = {
      beras: '🍚', minyak: '🫒', gula: '🧂', telur: '🥚', tepung: '🌾', bumbu: '🫚', mie: '🍜', toiletries: '🧼'
    };
    return emojis[cat?.toLowerCase()] || '📦';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Tambah Produk
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === 'Semua' ? cat : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Memuat produk...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Produk</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Kategori</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Harga</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Stok</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                          {getCategoryEmoji(product.category)}
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 capitalize">{product.category}</td>
                    <td className="px-6 py-4">Rp {(Number(product.price) || 0).toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${product.stock < 10 ? 'text-red-500' : 'text-gray-900'}`}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        (product.stock || 0) > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {(product.stock || 0) > 0 ? 'Aktif' : 'Habis'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-primary">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-500">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">Tidak ada produk</div>
        )}
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Tambah Produk Baru</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Produk</label>
                <input type="text" className="input w-full" placeholder="Nama produk" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <select className="input w-full">
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
                  <input type="number" className="input w-full" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stok</label>
                  <input type="number" className="input w-full" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea className="input w-full" rows={3} placeholder="Deskripsi produk" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gambar URL</label>
                <input type="url" className="input w-full" placeholder="https://..." />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}