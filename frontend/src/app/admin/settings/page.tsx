'use client';

import { useState } from 'react';
import { Save, Store, Truck, CreditCard, Bell } from 'lucide-react';

export default function AdminSettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    name: 'Sembako Store',
    email: 'info@sembakostore.id',
    phone: '081234567890',
    address: 'Jl. Pasar Baru No. 123, Jakarta',
    description: 'Platform e-commerce untuk UMKM toko sembako.',
  });

  const [deliverySettings, setDeliverySettings] = useState({
    freeShippingMin: 100000,
    baseDeliveryCost: 10000,
    deliveryRadius: 10,
  });

  const handleSave = () => {
    alert('Pengaturan berhasil disimpan!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Store Settings */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b flex items-center gap-2">
            <Store className="text-primary" size={20} />
            <h2 className="font-semibold">Informasi Toko</h2>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Toko</label>
              <input
                type="text"
                value={storeSettings.name}
                onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={storeSettings.email}
                onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
              <input
                type="tel"
                value={storeSettings.phone}
                onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <textarea
                value={storeSettings.address}
                onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                className="input w-full"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea
                value={storeSettings.description}
                onChange={(e) => setStoreSettings({ ...storeSettings, description: e.target.value })}
                className="input w-full"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Delivery Settings */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b flex items-center gap-2">
            <Truck className="text-primary" size={20} />
            <h2 className="font-semibold">Pengaturan Pengiriman</h2>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Order Gratis Ongkir (Rp)
              </label>
              <input
                type="number"
                value={deliverySettings.freeShippingMin}
                onChange={(e) => setDeliverySettings({ ...deliverySettings, freeShippingMin: parseInt(e.target.value) })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biaya Pengiriman Dasar (Rp)
              </label>
              <input
                type="number"
                value={deliverySettings.baseDeliveryCost}
                onChange={(e) => setDeliverySettings({ ...deliverySettings, baseDeliveryCost: parseInt(e.target.value) })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Radius Pengiriman (km)
              </label>
              <input
                type="number"
                value={deliverySettings.deliveryRadius}
                onChange={(e) => setDeliverySettings({ ...deliverySettings, deliveryRadius: parseInt(e.target.value) })}
                className="input w-full"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b flex items-center gap-2">
            <CreditCard className="text-primary" size={20} />
            <h2 className="font-semibold">Metode Pembayaran</h2>
          </div>
          <div className="p-4 space-y-3">
            {['Bayar di Tempat (COD)', 'Transfer Bank', 'E-Wallet', 'Kartu Kredit'].map((method) => (
              <label key={method} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b flex items-center gap-2">
            <Bell className="text-primary" size={20} />
            <h2 className="font-semibold">Notifikasi</h2>
          </div>
          <div className="p-4 space-y-3">
            {[
              { label: 'Pesanan baru', desc: 'Notifikasi saat ada pesanan masuk' },
              { label: 'Stok menipis', desc: 'Peringatan saat stok produk rendah' },
              { label: 'Laporan harian', desc: 'Ringkasan transaksi harian via email' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Save size={20} />
          Simpan Pengaturan
        </button>
      </div>
    </div>
  );
}
