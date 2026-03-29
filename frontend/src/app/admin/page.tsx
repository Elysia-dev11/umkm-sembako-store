'use client';

import { Package, ShoppingCart, Users, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Total Produk', value: '156', icon: Package, color: 'bg-blue-500', change: '+12%' },
  { label: 'Pesanan Hari Ini', value: '24', icon: ShoppingCart, color: 'bg-green-500', change: '+8%' },
  { label: 'Pelanggan Baru', value: '8', icon: Users, color: 'bg-purple-500', change: '+15%' },
  { label: 'Pendapatan', value: 'Rp 2.4M', icon: DollarSign, color: 'bg-yellow-500', change: '+22%' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Budi Santoso', total: 150000, status: 'processing', date: '2026-03-29' },
  { id: 'ORD-002', customer: 'Ani Wijaya', total: 85000, status: 'shipped', date: '2026-03-29' },
  { id: 'ORD-003', customer: 'Citra Dewi', total: 200000, status: 'delivered', date: '2026-03-28' },
  { id: 'ORD-004', customer: 'Dedi Pratama', total: 120000, status: 'pending', date: '2026-03-28' },
  { id: 'ORD-005', customer: 'Eka Putri', total: 95000, status: 'delivered', date: '2026-03-28' },
];

const lowStockProducts = [
  { name: 'Beras Premium 5kg', stock: 5, minStock: 20 },
  { name: 'Minyak Goreng 2L', stock: 8, minStock: 30 },
  { name: 'Gula Pasir 1kg', stock: 3, minStock: 25 },
];

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
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
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
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={20} />
            <h2 className="font-semibold">Stok Menipis</h2>
          </div>
          <div className="p-4 space-y-4">
            {lowStockProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-red-500">Stok: {product.stock} (Min: {product.minStock})</p>
                </div>
                <Link 
                  href="/admin/products"
                  className="text-primary text-sm hover:underline"
                >
                  Update
                </Link>
              </div>
            ))}
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
