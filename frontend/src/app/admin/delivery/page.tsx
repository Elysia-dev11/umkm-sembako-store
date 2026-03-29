'use client';

import { useState } from 'react';
import { Search, MapPin, Truck, Phone } from 'lucide-react';

const mockDeliveries = [
  { id: 'DEL-001', orderId: 'ORD-001', customer: 'Budi Santoso', address: 'Jl. Merdeka No. 123', rider: 'Andi', status: 'in_transit', estimatedTime: '30 menit' },
  { id: 'DEL-002', orderId: 'ORD-002', customer: 'Ani Wijaya', address: 'Jl. Sudirman No. 45', rider: 'Benny', status: 'picked_up', estimatedTime: '15 menit' },
  { id: 'DEL-003', orderId: 'ORD-003', customer: 'Citra Dewi', address: 'Jl. Gatot Subroto No. 67', rider: '-', status: 'pending', estimatedTime: '-' },
  { id: 'DEL-004', orderId: 'ORD-005', customer: 'Eka Putri', address: 'Jl. Diponegoro No. 12', rider: 'Deni', status: 'delivered', estimatedTime: 'Selesai' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  assigned: 'bg-blue-100 text-blue-800',
  picked_up: 'bg-purple-100 text-purple-800',
  in_transit: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
};

const statusLabels: Record<string, string> = {
  pending: 'Menunggu Kurir',
  assigned: 'Ditugaskan',
  picked_up: 'Diambil',
  in_transit: 'Dalam Pengiriman',
  delivered: 'Terkirim',
};

const riders = [
  { id: '1', name: 'Andi', phone: '08111111111', status: 'busy' },
  { id: '2', name: 'Benny', phone: '08222222222', status: 'busy' },
  { id: '3', name: 'Charlie', phone: '08333333333', status: 'available' },
  { id: '4', name: 'Deni', phone: '08444444444', status: 'available' },
];

export default function AdminDeliveryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengiriman</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 rounded-xl p-4">
          <p className="text-sm text-yellow-600">Menunggu</p>
          <p className="text-2xl font-bold text-yellow-700">1</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <p className="text-sm text-purple-600">Diambil</p>
          <p className="text-2xl font-bold text-purple-700">1</p>
        </div>
        <div className="bg-indigo-50 rounded-xl p-4">
          <p className="text-sm text-indigo-600">Dalam Pengiriman</p>
          <p className="text-2xl font-bold text-indigo-700">1</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-green-600">Terkirim</p>
          <p className="text-2xl font-bold text-green-700">1</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Deliveries List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari pengiriman..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="divide-y">
            {mockDeliveries.map((delivery) => (
              <div key={delivery.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold">{delivery.id}</span>
                    <span className="text-gray-500 ml-2">({delivery.orderId})</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[delivery.status]}`}>
                    {statusLabels[delivery.status]}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                  <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{delivery.customer}</p>
                    <p>{delivery.address}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Truck size={14} className="text-gray-400" />
                      Kurir: {delivery.rider}
                    </span>
                    {delivery.estimatedTime !== '-' && (
                      <span className="text-primary font-medium">ETA: {delivery.estimatedTime}</span>
                    )}
                  </div>
                  {delivery.status === 'pending' && (
                    <button className="text-primary text-sm hover:underline">
                      Tugaskan Kurir
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Riders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Kurir Tersedia</h2>
          </div>
          <div className="divide-y">
            {riders.map((rider) => (
              <div key={rider.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      rider.status === 'available' ? 'bg-green-500' : 'bg-gray-400'
                    }`}>
                      {rider.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{rider.name}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Phone size={12} />
                        {rider.phone}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    rider.status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {rider.status === 'available' ? 'Tersedia' : 'Sibuk'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
