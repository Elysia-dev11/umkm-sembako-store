'use client';

import { useState } from 'react';
import { Search, Mail, Phone, Eye } from 'lucide-react';

const mockCustomers = [
  { id: '1', name: 'Budi Santoso', email: 'budi@email.com', phone: '08123456789', orders: 12, totalSpent: 1500000, joinDate: '2026-01-15' },
  { id: '2', name: 'Ani Wijaya', email: 'ani@email.com', phone: '08234567890', orders: 8, totalSpent: 950000, joinDate: '2026-02-01' },
  { id: '3', name: 'Citra Dewi', email: 'citra@email.com', phone: '08345678901', orders: 15, totalSpent: 2200000, joinDate: '2025-12-01' },
  { id: '4', name: 'Dedi Pratama', email: 'dedi@email.com', phone: '08456789012', orders: 5, totalSpent: 600000, joinDate: '2026-03-01' },
  { id: '5', name: 'Eka Putri', email: 'eka@email.com', phone: '08567890123', orders: 3, totalSpent: 350000, joinDate: '2026-03-15' },
];

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Manajemen Pelanggan</h1>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari pelanggan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Pelanggan</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Kontak</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Total Pesanan</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Total Belanja</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Bergabung</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-gray-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone size={14} className="text-gray-400" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{customer.orders} pesanan</td>
                  <td className="px-6 py-4 font-medium">Rp {customer.totalSpent.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 text-gray-600">{customer.joinDate}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-400 hover:text-primary">
                      <Eye size={18} />
                    </button>
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
