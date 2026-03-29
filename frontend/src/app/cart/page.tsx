'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();

  const deliveryCost = 10000; // Flat rate for now
  const subtotal = getTotal();
  const total = subtotal + deliveryCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h1>
          <p className="text-gray-600 mb-8">Belum ada produk di keranjang Anda</p>
          <Link
            href="/products"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Belanja Sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Keranjang Belanja</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product?.imageUrl || '/placeholder-product.png'}
                    alt={item.product?.name || 'Product'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.productId}`} className="font-semibold text-gray-900 hover:text-primary">
                    {item.product?.name}
                  </Link>
                  <p className="text-primary font-bold mt-1">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                      disabled={item.quantity >= (item.product?.stock || 99)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </p>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="mt-2 text-gray-400 hover:text-error transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-gray-500 hover:text-error text-sm flex items-center gap-1"
            >
              <Trash2 size={16} />
              Kosongkan Keranjang
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Belanja</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} item)</span>
                  <span className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ongkos Kirim</span>
                  <span className="font-medium">Rp {deliveryCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Lanjut ke Pembayaran
                <ArrowRight size={20} />
              </Link>

              <Link
                href="/products"
                className="mt-3 block text-center text-primary hover:text-primary-dark text-sm"
              >
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
