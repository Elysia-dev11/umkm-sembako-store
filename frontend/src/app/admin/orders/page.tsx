'use client';

import { useState } from 'react';
import { Search, Eye, Truck, CheckCircle, XCircle } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-001', customer: 'Budi Santoso', email: 'budi@email.com', total: 150000, items: 5, status: 'processing', date: '2026-03-29', address: 'Jl. Merdeka No. 123' },
  { id: 'ORD-002', customer: 'Ani Wijaya', email: 'ani@email.com', total: 85000, items: 3, status: 'shipped', date: '2026-03-29', address: 'Jl. Sudirman No. 45' },
  { id: 'ORD-003', customer: 'Citra Dewi', email: 'citra@email.com', total: 200000, items: 8, status: 'delivered', date: '2026-03-28', address: 'Jl. Gatot Subroto No. 67' },
  { id: 'ORD-004', customer: 'Dedi Pratama', email: 'dedi@email.com', total: 120000, items: 4, status: 'pending', date: '2026-03-28', address: 'Jl. Asia Afrika No. 89' },
  { id: 'ORD-005', customer: 'Eka Putri', email: 'eka@email.com', total: 95000, items: 2, status: 'delivered', date: '2026-03-27', address: 'Jl. Diponegoro No. 12' },
  { id: 'ORD-006', customer: 'Fajar Rahman', email: 'fajar@email.com', total: 180000, items: 6, status: 'cancelled', date: '2026-03-27', address: 'Jl. Pahlawan No. 34' },
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

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Semua');

  const statuses = ['Semua', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'Semua' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Manajemen Pesanan</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari pesanan atau pelanggan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'Semua' ? 'Semua Status' : statusLabels[status]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">ID Pesanan</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Pelanggan</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Tanggal</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Items</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Total</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4">{order.items} item</td>
                  <td className="px-6 py-4 font-medium">Rp {order.total.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-gray-400 hover:text-primary" title="Lihat Detail">
                        <Eye size={18} />
                      </button>
                      {order.status === 'processing' && (
                        <button className="p-2 text-gray-400 hover:text-purple-500" title="Kirim">
                          <Truck size={18} />
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button className="p-2 text-gray-400 hover:text-green-500" title="Selesai">
                          <CheckCircle size={18} />
                        </button>
                      )}
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <button className="p-2 text-gray-400 hover:text-red-500" title="Batalkan">
                          <XCircle size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
