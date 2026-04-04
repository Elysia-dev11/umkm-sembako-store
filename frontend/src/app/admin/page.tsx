'use client';

import { Package, ShoppingCart, Users, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { products as productsApi } from '@/lib/supabase';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
};

const statusLabels: Record<string, string> = {
  pending: 'Menunggu',
  processing: 'Diproses',
  shipped: 'Dikirim',
  delivered: 'Selesai',
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productsApi.getAll();
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate stats from real data
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < 20);
  const outOfStockProducts = products.filter(p => p.stock === 0);

  const stats = [
    { 
      label: 'Total Produk', 
      value: totalProducts.toString(), 
      icon: Package, 
      color: 'bg-blue-500', 
      change: `${lowStockProducts.length} rendah` 
    },
    { 
      label: 'Stok Menipis', 
      value: lowStockProducts.length.toString(), 
      icon: AlertTriangle, 
      color: 'bg-yellow-500', 
      change: 'Perlu restock' 
    },
    { 
      label: 'Habis Terjual', 
      value: outOfStockProducts.length.toString(), 
      icon: ShoppingCart, 
      color: 'bg-red-500', 
      change: 'Segera tambah' 
    },
    { 
      label: 'Total Nilai Stok', 
      value: `Rp ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString('id-ID', { maximumFractionDigits: 0 })}`, 
      icon: DollarSign, 
      color: 'bg-green-500', 
      change: 'Estimasi' 
    },
  ];

  // Get recent orders from localStorage (in real app, this would be from orders table)
  const recentOrders = [
    { id: 'ORD-001', customer: 'Tamu Pelanggan', total: 75000, status: 'pending' },
  ].slice(0, 5);

  const lowStock = products.filter(p => p.stock < 20).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Selamat datang kembali, Admin!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <TrendingUp size={14} />
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">Pesanan Terbaru</h2>
            <Link href="/admin/orders" className="text-primary text-sm hover:underline">
              Lihat Semua
            </Link>
          </div>
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Memuat...</div>
          ) : recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">ID</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Pelanggan</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Total</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3 text-gray-600">{order.customer}</td>
                      <td className="px-4 py-3">Rp {order.total.toLocaleString('id-ID')}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Belum ada pesanan
            </div>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={20} />
            <h2 className="font-semibold">Stok Menipis</h2>
          </div>
          <div className="p-4 space-y-4">
            {isLoading ? (
              <div className="text-center text-gray-500">Memuat...</div>
            ) : lowStock.length > 0 ? (
              lowStock.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-red-500">Stok: {product.stock}</p>
                  </div>
                  <Link 
                    href="/admin/products"
                    className="text-primary text-sm hover:underline"
                  >
                    Update
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                Stok aman
              </div>
            )}
            <Link 
              href="/admin/products?filter=low_stock"
              className="block text-center text-primary text-sm hover:underline pt-2 border-t"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}