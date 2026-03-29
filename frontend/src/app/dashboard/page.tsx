'use client';

import { useState } from 'react';
import { Package, User, Settings, LogOut, ShoppingBag, Clock, CheckCircle, Truck } from 'lucide-react';

// Mock order data
const mockOrders = [
  { id: 'ORD-001', date: '2026-03-28', total: 150000, status: 'delivered', items: 5 },
  { id: 'ORD-002', date: '2026-03-25', total: 85000, status: 'shipped', items: 3 },
  { id: 'ORD-003', date: '2026-03-20', total: 200000, status: 'processing', items: 8 },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  pending: 'Menunggu',
  processing: 'Diproses',
  shipped: 'Dikirim',
  delivered: 'Selesai',
  cancelled: 'Dibatalkan',
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-3 mb-6 p-2">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div>
                  <p className="font-semibold">Sharon User</p>
                  <p className="text-sm text-gray-500">sharon@email.com</p>
                </div>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <Package size={20} />
                  Pesanan Saya
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <User size={20} />
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <Settings size={20} />
                  Pengaturan
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={20} />
                  Keluar
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Pesanan Saya</h2>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-primary/10 rounded-lg p-4">
                    <ShoppingBag className="text-primary mb-2" size={24} />
                    <p className="text-2xl font-bold">{mockOrders.length}</p>
                    <p className="text-sm text-gray-600">Total Pesanan</p>
                  </div>
                  <div className="bg-yellow-100 rounded-lg p-4">
                    <Clock className="text-yellow-600 mb-2" size={24} />
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-gray-600">Dalam Proses</p>
                  </div>
                  <div className="bg-green-100 rounded-lg p-4">
                    <CheckCircle className="text-green-600 mb-2" size={24} />
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-gray-600">Selesai</p>
                  </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">{order.items} item</p>
                        <p className="font-bold text-primary">Rp {order.total.toLocaleString('id-ID')}</p>
                      </div>
                      <button className="mt-3 text-primary hover:text-primary-dark text-sm font-medium">
                        Lihat Detail
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Profil Saya</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input type="text" defaultValue="Sharon User" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" defaultValue="sharon@email.com" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                    <input type="tel" defaultValue="08123456789" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                    <textarea className="input" rows={3} defaultValue="Jl. Contoh No. 123, Jakarta" />
                  </div>
                  <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                    Simpan Perubahan
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Pengaturan</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Notifikasi Email</p>
                      <p className="text-sm text-gray-500">Terima update via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Notifikasi WhatsApp</p>
                      <p className="text-sm text-gray-500">Terima update pesanan via WhatsApp</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
